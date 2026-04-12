import { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Send, Trash2, Bot, User, ImagePlus, X } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { toast } from 'sonner';

type MessageContent = string | Array<{ type: 'text'; text: string } | { type: 'image_url'; image_url: { url: string } }>;

type Msg = { role: 'user' | 'assistant'; content: string; id?: string; images?: string[] };

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;
const MAX_IMAGE_SIZE = 4 * 1024 * 1024; // 4MB

const Chat = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [historyLoaded, setHistoryLoaded] = useState(false);
  const [pendingImages, setPendingImages] = useState<string[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!user) { navigate('/login'); return; }
    loadHistory();
  }, [user]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const loadHistory = async () => {
    if (!user) return;
    const { data } = await supabase
      .from('chat_messages')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: true });
    if (data) setMessages(data.map(m => ({ role: m.role as 'user' | 'assistant', content: m.content, id: m.id })));
    setHistoryLoaded(true);
  };

  const saveMessage = async (role: string, content: string) => {
    if (!user) return;
    await supabase.from('chat_messages').insert({ user_id: user.id, role, content });
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newImages: string[] = [];
    for (const file of Array.from(files)) {
      if (!file.type.startsWith('image/')) {
        toast.error(`${file.name} is not an image`);
        continue;
      }
      if (file.size > MAX_IMAGE_SIZE) {
        toast.error(`${file.name} is too large (max 4MB)`);
        continue;
      }
      const base64 = await fileToBase64(file);
      newImages.push(base64);
    }
    setPendingImages(prev => [...prev, ...newImages].slice(0, 4));
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const removePendingImage = (index: number) => {
    setPendingImages(prev => prev.filter((_, i) => i !== index));
  };

  const buildApiMessages = (msgs: Msg[]): Array<{ role: string; content: MessageContent }> => {
    return msgs.map(m => {
      if (m.images && m.images.length > 0) {
        const content: Array<{ type: 'text'; text: string } | { type: 'image_url'; image_url: { url: string } }> = [];
        if (m.content) content.push({ type: 'text', text: m.content });
        m.images.forEach(img => {
          content.push({ type: 'image_url', image_url: { url: img } });
        });
        return { role: m.role, content };
      }
      return { role: m.role, content: m.content };
    });
  };

  const handleSend = async () => {
    if ((!input.trim() && pendingImages.length === 0) || isLoading) return;
    const userMsg: Msg = {
      role: 'user',
      content: input.trim() || (pendingImages.length > 0 ? 'What do you see in this image?' : ''),
      images: pendingImages.length > 0 ? [...pendingImages] : undefined,
    };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setPendingImages([]);
    setIsLoading(true);
    await saveMessage('user', userMsg.content);

    let assistantContent = '';
    const allMsgs = [...messages, userMsg];
    const apiMsgs = buildApiMessages(allMsgs);

    try {
      const resp = await fetch(CHAT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ messages: apiMsgs }),
      });

      if (!resp.ok) {
        const errData = await resp.json().catch(() => ({}));
        throw new Error(errData.error || `Error ${resp.status}`);
      }

      const reader = resp.body?.getReader();
      if (!reader) throw new Error('No stream');
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        let newlineIdx: number;
        while ((newlineIdx = buffer.indexOf('\n')) !== -1) {
          let line = buffer.slice(0, newlineIdx);
          buffer = buffer.slice(newlineIdx + 1);
          if (line.endsWith('\r')) line = line.slice(0, -1);
          if (!line.startsWith('data: ')) continue;
          const jsonStr = line.slice(6).trim();
          if (jsonStr === '[DONE]') break;
          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              assistantContent += content;
              setMessages(prev => {
                const last = prev[prev.length - 1];
                if (last?.role === 'assistant') {
                  return prev.map((m, i) => i === prev.length - 1 ? { ...m, content: assistantContent } : m);
                }
                return [...prev, { role: 'assistant', content: assistantContent }];
              });
            }
          } catch {}
        }
      }
    } catch (e: any) {
      assistantContent = "Sorry, I couldn't respond right now. Please try again.";
      setMessages(prev => [...prev, { role: 'assistant', content: assistantContent }]);
      toast.error(e.message || 'Chat error');
    }

    if (assistantContent) await saveMessage('assistant', assistantContent);
    setIsLoading(false);
  };

  const clearHistory = async () => {
    if (!user) return;
    await supabase.from('chat_messages').delete().eq('user_id', user.id);
    setMessages([]);
    toast.success('Chat cleared');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-50 glass-surface border-b border-border/50 px-4 h-14 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-accent transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back
        </Link>
        <span className="font-bold text-foreground flex items-center gap-2"><Bot className="w-5 h-5 text-accent" /> Hangout Assistant</span>
        <button onClick={clearHistory} className="text-muted-foreground hover:text-destructive transition-colors" title="Clear chat">
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4 max-w-3xl mx-auto w-full">
        {!historyLoaded && <p className="text-center text-muted-foreground">Loading chat...</p>}
        {historyLoaded && messages.length === 0 && (
          <div className="text-center py-16 space-y-3">
            <Bot className="w-12 h-12 text-accent mx-auto" />
            <h2 className="text-lg font-bold text-foreground">Hi there! 😊</h2>
            <p className="text-muted-foreground text-sm max-w-sm mx-auto">
              I'm your Hangout Assistant — a powerful AI that can help with <strong>anything</strong>! Ask about Mumbai spots, upload images for analysis, or chat about any topic.
            </p>
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              {['☕ Best cafes in Bandra?', '🖼️ Analyze an image', '🧠 Explain quantum physics', '🍕 Budget food near me'].map(s => (
                <button key={s} onClick={() => { setInput(s.replace(/^[^\s]+ /, '')); }} className="text-xs px-3 py-1.5 rounded-full bg-secondary text-foreground hover:bg-accent/20 transition-colors">
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}
        {messages.map((m, i) => (
          <div key={i} className={`flex gap-3 ${m.role === 'user' ? 'justify-end' : ''}`}>
            {m.role === 'assistant' && (
              <div className="w-8 h-8 rounded-lg card-gradient flex items-center justify-center shrink-0 mt-1">
                <Bot className="w-4 h-4 text-emerald-400" />
              </div>
            )}
            <div className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm ${
              m.role === 'user'
                ? 'bg-primary text-primary-foreground rounded-br-md'
                : 'bg-secondary text-foreground rounded-bl-md'
            }`}>
              {/* Show uploaded images in user messages */}
              {m.images && m.images.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-2">
                  {m.images.map((img, idx) => (
                    <img key={idx} src={img} alt="Uploaded" className="w-20 h-20 rounded-lg object-cover" />
                  ))}
                </div>
              )}
              {m.role === 'assistant' ? (
                <div className="prose prose-sm max-w-none dark:prose-invert [&>p]:m-0 [&>ul]:mt-1 [&>ol]:mt-1">
                  <ReactMarkdown>{m.content}</ReactMarkdown>
                </div>
              ) : m.content}
            </div>
            {m.role === 'user' && (
              <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center shrink-0 mt-1">
                <User className="w-4 h-4 text-accent" />
              </div>
            )}
          </div>
        ))}
        {isLoading && messages[messages.length - 1]?.role !== 'assistant' && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-lg card-gradient flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="bg-secondary rounded-2xl rounded-bl-md px-4 py-3">
              <div className="flex gap-1">
                <span className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Pending images preview */}
      {pendingImages.length > 0 && (
        <div className="px-4 py-2 max-w-3xl mx-auto w-full">
          <div className="flex gap-2 flex-wrap">
            {pendingImages.map((img, i) => (
              <div key={i} className="relative">
                <img src={img} alt="Preview" className="w-16 h-16 rounded-lg object-cover border border-border" />
                <button
                  onClick={() => removePendingImage(i)}
                  className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-destructive text-white flex items-center justify-center"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="sticky bottom-0 glass-surface border-t border-border/50 px-4 py-3">
        <div className="max-w-3xl mx-auto flex gap-2 items-end">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            accept="image/*"
            multiple
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-3 py-3 rounded-xl border border-border bg-background text-muted-foreground hover:text-accent hover:border-accent/40 transition-colors"
            title="Upload image"
          >
            <ImagePlus className="w-4 h-4" />
          </button>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && !e.shiftKey && handleSend()}
            placeholder="Ask anything — places, images, general knowledge..."
            className="flex-1 rounded-xl border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/40"
          />
          <button
            onClick={handleSend}
            disabled={isLoading || (!input.trim() && pendingImages.length === 0)}
            className="px-4 py-3 rounded-xl bg-primary text-primary-foreground hover:opacity-90 transition-opacity active:scale-[0.97] disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
