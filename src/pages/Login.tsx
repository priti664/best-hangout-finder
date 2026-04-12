import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { MapPin } from 'lucide-react';
import { toast } from 'sonner';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [forgotMode, setForgotMode] = useState(false);
  const { signIn, resetPassword } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await signIn(email, password);
    setLoading(false);
    if (error) {
      toast.error(error);
    } else {
      toast.success('Welcome back! 🎉');
      navigate('/');
    }
  };

  const handleForgot = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await resetPassword(email);
    setLoading(false);
    if (error) {
      toast.error(error);
    } else {
      toast.success('Check your email for a reset link');
      setForgotMode(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-xl card-gradient flex items-center justify-center">
              <MapPin className="w-5 h-5 text-emerald-400" />
            </div>
            <span className="text-xl font-bold text-foreground">Smart Hangout Finder</span>
          </Link>
          <h1 className="text-2xl font-bold text-foreground" style={{ lineHeight: '1.1' }}>
            {forgotMode ? 'Reset Password' : 'Welcome Back'}
          </h1>
          <p className="text-muted-foreground text-sm mt-2">
            {forgotMode ? 'Enter your email to receive a reset link' : 'Sign in to your account'}
          </p>
        </div>

        <form onSubmit={forgotMode ? handleForgot : handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/40"
              placeholder="you@example.com"
            />
          </div>
          {!forgotMode && (
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/40"
                placeholder="••••••••"
              />
            </div>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity active:scale-[0.97] disabled:opacity-50"
          >
            {loading ? 'Please wait...' : forgotMode ? 'Send Reset Link' : 'Sign In'}
          </button>
        </form>

        <div className="text-center text-sm space-y-2">
          <button
            onClick={() => setForgotMode(!forgotMode)}
            className="text-accent hover:underline"
          >
            {forgotMode ? 'Back to Login' : 'Forgot password?'}
          </button>
          {!forgotMode && (
            <p className="text-muted-foreground">
              Don't have an account?{' '}
              <Link to="/signup" className="text-accent hover:underline font-medium">Sign Up</Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
