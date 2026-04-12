import type { Place, Category } from '@/types/place';

// Real Mumbai places with unique images per place

interface RealPlace {
  name: string;
  category: Category;
  location: string;
  address: string;
  budgetMin: number;
  budgetMax: number;
  lat: number;
  lng: number;
  image: string;
}

const realPlacesData: RealPlace[] = [
  // ===== CAFES =====
  // Bandra
  { name: 'Le Pain Quotidien', category: 'Cafes', location: 'Bandra', address: 'Pali Hill, Bandra West', budgetMin: 300, budgetMax: 800, lat: 19.0596, lng: 72.8295, image: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=600&h=400&fit=crop' },
  { name: 'Birdsong Café', category: 'Cafes', location: 'Bandra', address: 'Hill Road, Bandra West', budgetMin: 200, budgetMax: 600, lat: 19.0580, lng: 72.8310, image: 'https://images.unsplash.com/photo-1525193612562-0ec53b0e5d7c?w=600&h=400&fit=crop' },
  { name: 'Suzette Creperie', category: 'Cafes', location: 'Bandra', address: 'Pali Naka, Bandra West', budgetMin: 250, budgetMax: 700, lat: 19.0590, lng: 72.8300, image: 'https://images.unsplash.com/photo-1559496417-e7f25cb247f3?w=600&h=400&fit=crop' },
  // Andheri
  { name: 'Third Wave Coffee Andheri', category: 'Cafes', location: 'Andheri', address: 'Lokhandwala, Andheri West', budgetMin: 150, budgetMax: 450, lat: 19.1380, lng: 72.8310, image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=600&h=400&fit=crop' },
  { name: 'Prithvi Café', category: 'Cafes', location: 'Andheri', address: 'Prithvi Theatre, Juhu Church Road, Andheri West', budgetMin: 80, budgetMax: 250, lat: 19.1050, lng: 72.8280, image: 'https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=600&h=400&fit=crop' },
  { name: 'Aromas Café Andheri', category: 'Cafes', location: 'Andheri', address: 'DN Nagar, Andheri West', budgetMin: 100, budgetMax: 350, lat: 19.1260, lng: 72.8360, image: 'https://images.unsplash.com/photo-1493857671505-72967e2e2760?w=600&h=400&fit=crop' },
  // Malad
  { name: 'Chaayos Malad', category: 'Cafes', location: 'Malad', address: 'Inorbit Mall, Malad West', budgetMin: 100, budgetMax: 350, lat: 19.1874, lng: 72.8400, image: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=600&h=400&fit=crop' },
  { name: 'Blue Tokai Malad', category: 'Cafes', location: 'Malad', address: 'Evershine Nagar, Malad West', budgetMin: 150, budgetMax: 500, lat: 19.1890, lng: 72.8450, image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&h=400&fit=crop' },
  // Kandivali
  { name: 'Café Coffee Day Kandivali', category: 'Cafes', location: 'Kandivali', address: 'Growel 101 Mall, Kandivali East', budgetMin: 80, budgetMax: 300, lat: 19.2047, lng: 72.8600, image: 'https://images.unsplash.com/photo-1498804103079-a6351b050096?w=600&h=400&fit=crop' },
  { name: 'Starbucks Kandivali', category: 'Cafes', location: 'Kandivali', address: 'Raghuleela Mall, Kandivali West', budgetMin: 200, budgetMax: 600, lat: 19.2060, lng: 72.8490, image: 'https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=600&h=400&fit=crop' },
  // Borivali
  { name: 'Café Basilico Borivali', category: 'Cafes', location: 'Borivali', address: 'LT Road, Borivali West', budgetMin: 200, budgetMax: 600, lat: 19.2307, lng: 72.8530, image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=600&h=400&fit=crop' },
  { name: 'The Café Borivali', category: 'Cafes', location: 'Borivali', address: 'IC Colony, Borivali West', budgetMin: 100, budgetMax: 400, lat: 19.2350, lng: 72.8500, image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&h=400&fit=crop' },
  // Churchgate
  { name: 'Kala Ghoda Café', category: 'Cafes', location: 'Churchgate', address: 'Kala Ghoda, Fort', budgetMin: 200, budgetMax: 600, lat: 18.9322, lng: 72.8320, image: 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=600&h=400&fit=crop' },
  // Marine Drive
  { name: 'Café Mondegar', category: 'Cafes', location: 'Marine Drive', address: 'Metro House, Colaba Causeway', budgetMin: 150, budgetMax: 500, lat: 18.9432, lng: 72.8235, image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=600&h=400&fit=crop' },
  // Colaba
  { name: 'Leopold Café', category: 'Cafes', location: 'Colaba', address: 'Colaba Causeway, Colaba', budgetMin: 150, budgetMax: 500, lat: 18.9067, lng: 72.8155, image: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=600&h=400&fit=crop' },
  { name: 'Theobroma Colaba', category: 'Cafes', location: 'Colaba', address: 'Cusrow Baug, Colaba', budgetMin: 100, budgetMax: 400, lat: 18.9100, lng: 72.8170, image: 'https://images.unsplash.com/photo-1514066558159-fc8c737ef259?w=600&h=400&fit=crop' },
  // Lower Parel
  { name: 'Café Zoe', category: 'Cafes', location: 'Lower Parel', address: 'Mathuradas Mills, Lower Parel', budgetMin: 200, budgetMax: 700, lat: 18.9928, lng: 72.8280, image: 'https://images.unsplash.com/photo-1600093463592-8e36ae95fcff?w=600&h=400&fit=crop' },
  // Juhu
  { name: 'The Rolling Pin Juhu', category: 'Cafes', location: 'Juhu', address: 'Juhu Tara Road, Juhu', budgetMin: 200, budgetMax: 600, lat: 19.0883, lng: 72.8263, image: 'https://images.unsplash.com/photo-1463797221720-6b07e6426c24?w=600&h=400&fit=crop' },
  // Versova
  { name: 'Filter Coffee Versova', category: 'Cafes', location: 'Versova', address: 'Versova Road, Andheri West', budgetMin: 80, budgetMax: 250, lat: 19.1320, lng: 72.8172, image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=400&fit=crop' },
  // Goregaon
  { name: 'Starbucks Goregaon', category: 'Cafes', location: 'Goregaon', address: 'Oberoi Mall, Goregaon East', budgetMin: 200, budgetMax: 600, lat: 19.1663, lng: 72.8600, image: 'https://images.unsplash.com/photo-1600093463592-8e36ae95fcff?w=600&h=400&fit=crop' },
  // Jogeshwari
  { name: 'Tea Villa Café Jogeshwari', category: 'Cafes', location: 'Jogeshwari', address: 'SV Road, Jogeshwari West', budgetMin: 100, budgetMax: 350, lat: 19.1364, lng: 72.8494, image: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=600&h=400&fit=crop' },

  // ===== RESTAURANTS =====
  // Bandra
  { name: 'Bastian', category: 'Restaurants', location: 'Bandra', address: 'Linking Road, Bandra West', budgetMin: 800, budgetMax: 2500, lat: 19.0600, lng: 72.8350, image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=400&fit=crop' },
  { name: 'Pali Village Café', category: 'Restaurants', location: 'Bandra', address: 'Pali Naka, Bandra West', budgetMin: 300, budgetMax: 900, lat: 19.0585, lng: 72.8305, image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=600&h=400&fit=crop' },
  { name: 'Salt Water Café', category: 'Restaurants', location: 'Bandra', address: 'Chapel Road, Bandra West', budgetMin: 400, budgetMax: 1200, lat: 19.0570, lng: 72.8290, image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb51f3a?w=600&h=400&fit=crop' },
  // Andheri
  { name: 'Hitchki Andheri', category: 'Restaurants', location: 'Andheri', address: 'Veera Desai Road, Andheri West', budgetMin: 300, budgetMax: 900, lat: 19.1300, lng: 72.8360, image: 'https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=600&h=400&fit=crop' },
  { name: 'Foo Andheri', category: 'Restaurants', location: 'Andheri', address: 'Lokhandwala, Andheri West', budgetMin: 400, budgetMax: 1200, lat: 19.1370, lng: 72.8310, image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=600&h=400&fit=crop' },
  // Malad
  { name: 'Sigree Global Grill Malad', category: 'Restaurants', location: 'Malad', address: 'Inorbit Mall, Malad West', budgetMin: 500, budgetMax: 1500, lat: 19.1874, lng: 72.8400, image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&h=400&fit=crop' },
  { name: 'Punjab Grill Malad', category: 'Restaurants', location: 'Malad', address: 'Infinity Mall, Malad West', budgetMin: 400, budgetMax: 1200, lat: 19.1860, lng: 72.8420, image: 'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=600&h=400&fit=crop' },
  // Kandivali
  { name: 'Barbeque Nation Kandivali', category: 'Restaurants', location: 'Kandivali', address: 'Growel 101, Kandivali East', budgetMin: 600, budgetMax: 1200, lat: 19.2047, lng: 72.8600, image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&h=400&fit=crop' },
  { name: 'Rajdhani Kandivali', category: 'Restaurants', location: 'Kandivali', address: 'SV Road, Kandivali West', budgetMin: 300, budgetMax: 800, lat: 19.2050, lng: 72.8480, image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600&h=400&fit=crop' },
  // Borivali
  { name: 'Mainland China Borivali', category: 'Restaurants', location: 'Borivali', address: 'LT Road, Borivali West', budgetMin: 400, budgetMax: 1200, lat: 19.2307, lng: 72.8530, image: 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=600&h=400&fit=crop' },
  { name: 'Cream Centre Borivali', category: 'Restaurants', location: 'Borivali', address: 'SV Road, Borivali West', budgetMin: 300, budgetMax: 900, lat: 19.2320, lng: 72.8520, image: 'https://images.unsplash.com/photo-1499028344343-cd173ffc68a9?w=600&h=400&fit=crop' },
  // Churchgate
  { name: 'Trishna', category: 'Restaurants', location: 'Churchgate', address: 'Kala Ghoda, Fort', budgetMin: 400, budgetMax: 1500, lat: 18.9322, lng: 72.8320, image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop' },
  { name: 'Khyber', category: 'Restaurants', location: 'Churchgate', address: 'MG Road, Fort', budgetMin: 500, budgetMax: 1800, lat: 18.9330, lng: 72.8300, image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&h=400&fit=crop' },
  // Marine Drive
  { name: 'Pizza By The Bay', category: 'Restaurants', location: 'Marine Drive', address: 'Marine Drive, Churchgate', budgetMin: 300, budgetMax: 900, lat: 18.9432, lng: 72.8228, image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600&h=400&fit=crop' },
  // Colaba
  { name: 'Bademiya Colaba', category: 'Restaurants', location: 'Colaba', address: 'Tulloch Road, Colaba', budgetMin: 100, budgetMax: 400, lat: 18.9067, lng: 72.8150, image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=400&fit=crop' },
  { name: 'Indigo Deli Colaba', category: 'Restaurants', location: 'Colaba', address: 'Mandlik Road, Colaba', budgetMin: 400, budgetMax: 1200, lat: 18.9080, lng: 72.8165, image: 'https://images.unsplash.com/photo-1529543544282-ea98407407b0?w=600&h=400&fit=crop' },
  // Lower Parel
  { name: 'Masala Library', category: 'Restaurants', location: 'Lower Parel', address: 'First International, Lower Parel', budgetMin: 800, budgetMax: 3000, lat: 18.9928, lng: 72.8280, image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=400&fit=crop' },
  { name: 'Hakkasan Lower Parel', category: 'Restaurants', location: 'Lower Parel', address: 'Palladium Mall, Lower Parel', budgetMin: 1000, budgetMax: 3500, lat: 18.9940, lng: 72.8300, image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600&h=400&fit=crop' },
  // Juhu
  { name: 'JW Marriott Lotus Café', category: 'Restaurants', location: 'Juhu', address: 'Juhu Tara Road', budgetMin: 800, budgetMax: 2500, lat: 19.0900, lng: 72.8270, image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&h=400&fit=crop' },
  // Goregaon
  { name: 'AB Celestial Goregaon', category: 'Restaurants', location: 'Goregaon', address: 'Oberoi Mall, Goregaon East', budgetMin: 300, budgetMax: 900, lat: 19.1663, lng: 72.8600, image: 'https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=600&h=400&fit=crop' },
  // Versova
  { name: 'Dakshinayan Versova', category: 'Restaurants', location: 'Versova', address: 'JP Road, Versova', budgetMin: 150, budgetMax: 500, lat: 19.1320, lng: 72.8172, image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600&h=400&fit=crop' },
  // Jogeshwari
  { name: 'Copper Chimney Jogeshwari', category: 'Restaurants', location: 'Jogeshwari', address: 'Western Express Highway, Jogeshwari East', budgetMin: 300, budgetMax: 900, lat: 19.1364, lng: 72.8550, image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=600&h=400&fit=crop' },

  // ===== McDONALD'S =====
  { name: "McDonald's Bandra", category: "McDonald's", location: 'Bandra', address: 'Hill Road, Bandra West', budgetMin: 50, budgetMax: 300, lat: 19.0580, lng: 72.8310, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&h=400&fit=crop' },
  { name: "McDonald's Andheri", category: "McDonald's", location: 'Andheri', address: 'Lokhandwala Complex, Andheri West', budgetMin: 50, budgetMax: 300, lat: 19.1380, lng: 72.8310, image: 'https://images.unsplash.com/photo-1586816001966-79b736744398?w=600&h=400&fit=crop' },
  { name: "McDonald's Goregaon", category: "McDonald's", location: 'Goregaon', address: 'Oberoi Mall, Goregaon East', budgetMin: 50, budgetMax: 350, lat: 19.1663, lng: 72.8600, image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=600&h=400&fit=crop' },
  { name: "McDonald's Malad", category: "McDonald's", location: 'Malad', address: 'Inorbit Mall, Malad West', budgetMin: 50, budgetMax: 300, lat: 19.1874, lng: 72.8400, image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=600&h=400&fit=crop' },
  { name: "McDonald's Borivali", category: "McDonald's", location: 'Borivali', address: 'LT Road, Borivali West', budgetMin: 50, budgetMax: 300, lat: 19.2307, lng: 72.8530, image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=600&h=400&fit=crop' },
  { name: "McDonald's Churchgate", category: "McDonald's", location: 'Churchgate', address: 'VN Road, Churchgate', budgetMin: 50, budgetMax: 300, lat: 18.9322, lng: 72.8264, image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&h=400&fit=crop' },
  { name: "McDonald's Juhu", category: "McDonald's", location: 'Juhu', address: 'Juhu Tara Road, Juhu', budgetMin: 50, budgetMax: 350, lat: 19.0883, lng: 72.8263, image: 'https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=600&h=400&fit=crop' },
  { name: "McDonald's Lower Parel", category: "McDonald's", location: 'Lower Parel', address: 'Phoenix Mills, Lower Parel', budgetMin: 50, budgetMax: 350, lat: 18.9928, lng: 72.8313, image: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=600&h=400&fit=crop' },
  { name: "McDonald's Colaba", category: "McDonald's", location: 'Colaba', address: 'Colaba Causeway', budgetMin: 50, budgetMax: 300, lat: 18.9067, lng: 72.8147, image: 'https://images.unsplash.com/photo-1551360768-28f2f4e4bc18?w=600&h=400&fit=crop' },
  { name: "McDonald's Kandivali", category: "McDonald's", location: 'Kandivali', address: 'Growel 101, Kandivali East', budgetMin: 50, budgetMax: 300, lat: 19.2047, lng: 72.8600, image: 'https://images.unsplash.com/photo-1603064752734-4c48eff53d05?w=600&h=400&fit=crop' },
  { name: "McDonald's Versova", category: "McDonald's", location: 'Versova', address: 'Yari Road, Versova', budgetMin: 50, budgetMax: 300, lat: 19.1320, lng: 72.8172, image: 'https://images.unsplash.com/photo-1585238341710-4d3ff484184d?w=600&h=400&fit=crop' },
  { name: "McDonald's Marine Lines", category: "McDonald's", location: 'Marine Lines', address: 'Marine Lines Station, Mumbai', budgetMin: 50, budgetMax: 300, lat: 18.9432, lng: 72.8235, image: 'https://images.unsplash.com/photo-1619881589316-11cf0b7e654f?w=600&h=400&fit=crop' },

  // ===== MALLS =====
  { name: 'Infiniti Mall Malad', category: 'Malls', location: 'Malad', address: 'New Link Road, Malad West', budgetMin: 200, budgetMax: 1500, lat: 19.1874, lng: 72.8400, image: 'https://images.unsplash.com/photo-1567449303078-57ad995bd329?w=600&h=400&fit=crop' },
  { name: 'Inorbit Mall Malad', category: 'Malls', location: 'Malad', address: 'Link Road, Malad West', budgetMin: 200, budgetMax: 1500, lat: 19.1860, lng: 72.8430, image: 'https://images.unsplash.com/photo-1555529771-7888783a18d3?w=600&h=400&fit=crop' },
  { name: 'Oberoi Mall Goregaon', category: 'Malls', location: 'Goregaon', address: 'Western Express Highway, Goregaon East', budgetMin: 200, budgetMax: 2000, lat: 19.1663, lng: 72.8600, image: 'https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?w=600&h=400&fit=crop' },
  { name: 'Hub Mall Goregaon', category: 'Malls', location: 'Goregaon', address: 'WE Highway, Goregaon East', budgetMin: 150, budgetMax: 1000, lat: 19.1680, lng: 72.8580, image: 'https://images.unsplash.com/photo-1580793241553-e9f1cce181db?w=600&h=400&fit=crop' },
  { name: 'Growel 101 Mall', category: 'Malls', location: 'Kandivali', address: 'Akurli Road, Kandivali East', budgetMin: 150, budgetMax: 1200, lat: 19.2047, lng: 72.8600, image: 'https://images.unsplash.com/photo-1481437156560-3205f6a55acc?w=600&h=400&fit=crop' },
  { name: 'Raghuleela Mall Kandivali', category: 'Malls', location: 'Kandivali', address: 'Poisar, Kandivali West', budgetMin: 100, budgetMax: 800, lat: 19.2060, lng: 72.8490, image: 'https://images.unsplash.com/photo-1528698827591-e19cef10792e?w=600&h=400&fit=crop' },
  { name: 'Infiniti Mall Andheri', category: 'Malls', location: 'Andheri', address: 'New Link Road, Andheri West', budgetMin: 200, budgetMax: 1500, lat: 19.1300, lng: 72.8360, image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=600&h=400&fit=crop' },
  { name: 'Phoenix Palladium', category: 'Malls', location: 'Lower Parel', address: 'Senapati Bapat Marg, Lower Parel', budgetMin: 500, budgetMax: 5000, lat: 18.9928, lng: 72.8313, image: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=600&h=400&fit=crop' },
  { name: 'High Street Phoenix', category: 'Malls', location: 'Lower Parel', address: 'Senapati Bapat Marg, Lower Parel', budgetMin: 300, budgetMax: 3000, lat: 18.9920, lng: 72.8300, image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=400&fit=crop' },
  { name: 'R City Mall', category: 'Malls', location: 'Bandra', address: 'LBS Marg, Ghatkopar', budgetMin: 200, budgetMax: 2000, lat: 19.0900, lng: 72.9100, image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop' },
  { name: 'Citi Mall Borivali', category: 'Malls', location: 'Borivali', address: 'New Link Road, Borivali West', budgetMin: 100, budgetMax: 800, lat: 19.2320, lng: 72.8510, image: 'https://images.unsplash.com/photo-1534723452862-4c874018d66d?w=600&h=400&fit=crop' },
  { name: 'D-Mart Churchgate', category: 'Malls', location: 'Churchgate', address: 'VN Road, Churchgate', budgetMin: 100, budgetMax: 600, lat: 18.9322, lng: 72.8264, image: 'https://images.unsplash.com/photo-1519566335946-e6f65f0f4fdf?w=600&h=400&fit=crop' },

  // ===== PARKS =====
  { name: 'Joggers Park', category: 'Parks', location: 'Bandra', address: 'Carter Road, Bandra West', budgetMin: 0, budgetMax: 0, lat: 19.0596, lng: 72.8210, image: 'https://images.unsplash.com/photo-1519331379826-f10be5486c6f?w=600&h=400&fit=crop' },
  { name: 'Bandra Fort Garden', category: 'Parks', location: 'Bandra', address: 'Bandstand, Bandra West', budgetMin: 0, budgetMax: 0, lat: 19.0430, lng: 72.8180, image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=600&h=400&fit=crop' },
  { name: 'Shivaji Park', category: 'Parks', location: 'Marine Drive', address: 'Shivaji Park, Dadar West', budgetMin: 0, budgetMax: 0, lat: 19.0280, lng: 72.8380, image: 'https://images.unsplash.com/photo-1588714477688-cf28a50e94f7?w=600&h=400&fit=crop' },
  { name: 'Sanjay Gandhi National Park', category: 'Parks', location: 'Borivali', address: 'Borivali East', budgetMin: 0, budgetMax: 100, lat: 19.2500, lng: 72.8700, image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=600&h=400&fit=crop' },
  { name: 'Hanging Gardens', category: 'Parks', location: 'Churchgate', address: 'Malabar Hill, Mumbai', budgetMin: 0, budgetMax: 0, lat: 18.9560, lng: 72.8050, image: 'https://images.unsplash.com/photo-1586015555751-63bb77f4322a?w=600&h=400&fit=crop' },
  { name: 'Priyadarshini Park', category: 'Parks', location: 'Marine Lines', address: 'Napean Sea Road, Mumbai', budgetMin: 0, budgetMax: 50, lat: 18.9600, lng: 72.8100, image: 'https://images.unsplash.com/photo-1496429862132-5ab36b6ae330?w=600&h=400&fit=crop' },
  { name: 'Five Gardens', category: 'Parks', location: 'Marine Drive', address: 'Matunga East, Mumbai', budgetMin: 0, budgetMax: 0, lat: 19.0200, lng: 72.8550, image: 'https://images.unsplash.com/photo-1580193769210-b8d1c049a7d9?w=600&h=400&fit=crop' },
  { name: 'Juhu Beach Park', category: 'Parks', location: 'Juhu', address: 'Juhu Beach, Juhu', budgetMin: 0, budgetMax: 0, lat: 19.0883, lng: 72.8200, image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&h=400&fit=crop' },
  { name: 'Aarey Colony Green', category: 'Parks', location: 'Goregaon', address: 'Aarey Colony, Goregaon East', budgetMin: 0, budgetMax: 0, lat: 19.1560, lng: 72.8700, image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=400&fit=crop' },
  { name: 'Powai Lake Garden', category: 'Parks', location: 'Andheri', address: 'Hiranandani Gardens, Powai', budgetMin: 0, budgetMax: 0, lat: 19.1200, lng: 72.9050, image: 'https://images.unsplash.com/photo-1518173946687-a82a38b1f73e?w=600&h=400&fit=crop' },
  { name: 'Mahim Nature Park', category: 'Parks', location: 'Bandra', address: 'Mahim, Mumbai', budgetMin: 0, budgetMax: 20, lat: 19.0400, lng: 72.8450, image: 'https://images.unsplash.com/photo-1473773508845-188df298d2d1?w=600&h=400&fit=crop' },
  { name: 'Malad Hill Garden', category: 'Parks', location: 'Malad', address: 'Malad West, Mumbai', budgetMin: 0, budgetMax: 0, lat: 19.1874, lng: 72.8450, image: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=600&h=400&fit=crop' },
  { name: 'Kandivali Garden', category: 'Parks', location: 'Kandivali', address: 'Kandivali West, Mumbai', budgetMin: 0, budgetMax: 0, lat: 19.2050, lng: 72.8480, image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600&h=400&fit=crop' },

  // ===== OTHERS =====
  { name: 'Smaaash Kamala Mills', category: 'Others', location: 'Lower Parel', address: 'Kamala Mills, Lower Parel', budgetMin: 300, budgetMax: 1000, lat: 18.9928, lng: 72.8280, image: 'https://images.unsplash.com/photo-1511882150382-421056c89033?w=600&h=400&fit=crop' },
  { name: 'Snow World Mumbai', category: 'Others', location: 'Lower Parel', address: 'Phoenix Mills, Lower Parel', budgetMin: 400, budgetMax: 1200, lat: 18.9920, lng: 72.8300, image: 'https://images.unsplash.com/photo-1491002052546-bf38f186af56?w=600&h=400&fit=crop' },
  { name: 'Timezone Andheri', category: 'Others', location: 'Andheri', address: 'Infiniti Mall, Andheri West', budgetMin: 200, budgetMax: 800, lat: 19.1300, lng: 72.8360, image: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=600&h=400&fit=crop' },
  { name: 'Escapology Bandra', category: 'Others', location: 'Bandra', address: 'Linking Road, Bandra West', budgetMin: 500, budgetMax: 1500, lat: 19.0600, lng: 72.8350, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=400&fit=crop' },
  { name: 'KidZania R City', category: 'Others', location: 'Bandra', address: 'R City Mall, Ghatkopar West', budgetMin: 800, budgetMax: 1500, lat: 19.0900, lng: 72.9100, image: 'https://images.unsplash.com/photo-1569517282132-25d22f4573e6?w=600&h=400&fit=crop' },
  { name: 'EsselWorld', category: 'Others', location: 'Borivali', address: 'Gorai, Borivali West', budgetMin: 500, budgetMax: 1200, lat: 19.2350, lng: 72.8100, image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=600&h=400&fit=crop' },
  { name: 'Fun City Borivali', category: 'Others', location: 'Borivali', address: 'Citi Mall, Borivali West', budgetMin: 200, budgetMax: 600, lat: 19.2320, lng: 72.8510, image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=600&h=400&fit=crop' },
  { name: 'Go-Karting Malad', category: 'Others', location: 'Malad', address: 'Link Road, Malad West', budgetMin: 300, budgetMax: 800, lat: 19.1874, lng: 72.8420, image: 'https://images.unsplash.com/photo-1528495612343-9ca9f4a4de28?w=600&h=400&fit=crop' },
  { name: 'Trampoline Park Goregaon', category: 'Others', location: 'Goregaon', address: 'Oberoi Mall, Goregaon East', budgetMin: 300, budgetMax: 800, lat: 19.1680, lng: 72.8600, image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=600&h=400&fit=crop' },
  { name: 'VR Gaming Zone Andheri', category: 'Others', location: 'Andheri', address: 'Lokhandwala, Andheri West', budgetMin: 300, budgetMax: 1000, lat: 19.1370, lng: 72.8310, image: 'https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?w=600&h=400&fit=crop' },
  { name: 'Comedy Store Mumbai', category: 'Others', location: 'Lower Parel', address: 'Palladium Mall, Lower Parel', budgetMin: 300, budgetMax: 1000, lat: 18.9940, lng: 72.8300, image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&h=400&fit=crop' },
  { name: 'Bandstand Promenade', category: 'Others', location: 'Bandra', address: 'Bandstand, Bandra West', budgetMin: 0, budgetMax: 0, lat: 19.0450, lng: 72.8180, image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=400&fit=crop' },
  { name: 'Bowling Alley Malad', category: 'Others', location: 'Malad', address: 'Infinity Mall, Malad West', budgetMin: 200, budgetMax: 600, lat: 19.1860, lng: 72.8400, image: 'https://images.unsplash.com/photo-1545334810-088a5e0ceff3?w=600&h=400&fit=crop' },
  { name: 'Hakone Kandivali', category: 'Others', location: 'Kandivali', address: 'Growel 101, Kandivali East', budgetMin: 200, budgetMax: 800, lat: 19.2047, lng: 72.8600, image: 'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=600&h=400&fit=crop' },
  { name: 'Marine Drive Walk', category: 'Others', location: 'Marine Drive', address: "Queen's Necklace, Marine Drive", budgetMin: 0, budgetMax: 0, lat: 18.9432, lng: 72.8228, image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=600&h=400&fit=crop' },
  { name: 'Gateway of India Visit', category: 'Others', location: 'Gateway of India', address: 'Apollo Bandar, Colaba', budgetMin: 0, budgetMax: 200, lat: 18.9220, lng: 72.8347, image: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=600&h=400&fit=crop' },
];

const offers = [
  '20% off on weekdays', 'Buy 1 Get 1 Free', 'Happy Hours 3-6 PM',
  'Student discount 15%', 'Free dessert on ₹500+', 'Couple combo ₹399',
  'Weekend brunch special', 'Flat ₹100 off first visit', 'Group deal: 4 for ₹999',
  'Free coffee with meal', 'Loyalty: 5th visit free', '10% cashback on UPI',
  'Kids eat free Sundays', 'All-you-can-eat ₹449', 'Early bird 25% off before 12 PM',
];

function genPlaces(): Place[] {
  return realPlacesData.map((p, i) => ({
    id: `place-${i + 1}`,
    name: p.name,
    category: p.category,
    location: p.location,
    address: p.address,
    budgetMin: p.budgetMin,
    budgetMax: p.budgetMax,
    offers: [offers[i % offers.length], offers[(i + 5) % offers.length]],
    rating: +(3.6 + (i % 18) * 0.08).toFixed(1),
    reviewCount: 50 + ((i * 31) % 500),
    image: p.image,
    lat: p.lat,
    lng: p.lng,
  }));
}

export const allPlaces: Place[] = genPlaces();

const locations = [
  'Bandra', 'Andheri', 'Jogeshwari', 'Goregaon', 'Malad', 'Kandivali',
  'Borivali', 'Churchgate', 'Marine Lines', 'Marine Drive', 'Gateway of India',
  'Juhu', 'Versova', 'Colaba', 'Lower Parel',
];

export const allLocations = locations;

export const categories: string[] = ['Cafes', 'Malls', 'Restaurants', "McDonald's", 'Parks', 'Others'];

// Nearby area mapping for smart fallback
export const nearbyAreas: Record<string, string[]> = {
  'Malad': ['Goregaon', 'Kandivali', 'Borivali', 'Andheri'],
  'Kandivali': ['Malad', 'Borivali', 'Goregaon'],
  'Borivali': ['Kandivali', 'Malad', 'Goregaon'],
  'Goregaon': ['Malad', 'Andheri', 'Jogeshwari', 'Kandivali'],
  'Andheri': ['Goregaon', 'Jogeshwari', 'Juhu', 'Versova'],
  'Jogeshwari': ['Andheri', 'Goregaon', 'Versova'],
  'Bandra': ['Andheri', 'Juhu', 'Lower Parel'],
  'Juhu': ['Andheri', 'Bandra', 'Versova'],
  'Versova': ['Andheri', 'Jogeshwari', 'Juhu'],
  'Churchgate': ['Marine Lines', 'Marine Drive', 'Colaba', 'Gateway of India'],
  'Marine Lines': ['Churchgate', 'Marine Drive', 'Colaba'],
  'Marine Drive': ['Churchgate', 'Marine Lines', 'Colaba'],
  'Gateway of India': ['Colaba', 'Churchgate', 'Marine Drive'],
  'Colaba': ['Gateway of India', 'Churchgate', 'Marine Lines'],
  'Lower Parel': ['Bandra', 'Marine Drive', 'Churchgate'],
};
