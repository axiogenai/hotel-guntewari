import { Restaurant, MenuCategory, MenuItem, Table, Reservation, Order, Review, Offer, User } from './types';

export const INITIAL_USERS: User[] = [
  {
    id: 'usr-1',
    name: 'Aditya Sharma',
    email: 'aditya@example.com',
    phone: '+91 98765 43210',
    role: 'customer',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200',
    created_at: '2026-01-15'
  },
  {
    id: 'usr-owner-1',
    name: 'Guntewari Management',
    email: 'contact@hotelguntewari.in',
    phone: '+91 98220 11223',
    role: 'owner',
    created_at: '2026-01-01'
  },
  {
    id: 'usr-admin-1',
    name: 'Axiogen Admin',
    email: 'admin@axiogeneats.in',
    phone: '+91 80000 00000',
    role: 'admin',
    created_at: '2026-01-01'
  }
];

export const INITIAL_RESTAURANTS: Restaurant[] = [
  {
    id: 'rest-1',
    owner_id: 'usr-owner-1',
    name: 'Hotel Guntewari',
    slug: 'guntewari',
    description: 'Authentic Maharashtrian Heritage & Fine Dining, Kolhapuri Thalis, Sizzling Tandoori Delicacies, Royal Sabzis, Crispy Dosas & Traditional Sweets.',
    cuisine: ['Maharashtrian', 'North Indian', 'South Indian', 'Thali', 'Tandoor', 'Sweets'],
    address: 'Peth Vadgaon, Kolhapur, Maharashtra 416112',
    phone: '+91 98220 11223',
    email: 'contact@hotelguntewari.in',
    opening_hours: '08:00 AM - 11:00 PM',
    latitude: 16.8406,
    longitude: 74.3006,
    rating: 4.9,
    reviews_count: 820,
    price_range: '₹₹',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800',
    banner: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=1200',
    status: 'approved',
    is_featured: true,
    is_veg_only: true,
    has_ac: true,
    has_parking: true,
    has_outdoor_seating: true,
    is_family_friendly: true,
    created_at: '2026-01-10'
  }
];

export const INITIAL_CATEGORIES: MenuCategory[] = [
  { id: 'cat-mah-special', restaurant_id: 'rest-1', name: 'Maharashtrian Heritage Specials', sort_order: 1 },
  { id: 'cat-1', restaurant_id: 'rest-1', name: 'Starters & Sizzlers', sort_order: 2 },
  { id: 'cat-2', restaurant_id: 'rest-1', name: 'Royal Indian Main Course', sort_order: 3 },
  { id: 'cat-3', restaurant_id: 'rest-1', name: 'South Indian Delicacies', sort_order: 4 },
  { id: 'cat-4', restaurant_id: 'rest-1', name: 'Bhakri, Naan & Dum Biryani', sort_order: 5 },
  { id: 'cat-5', restaurant_id: 'rest-1', name: 'Maharashtrian Sweets & Coolers', sort_order: 6 }
];

export const INITIAL_MENU_ITEMS: MenuItem[] = [
  // === MAHARASHTRIAN HERITAGE SPECIALS ===
  {
    id: 'item-mah-1',
    restaurant_id: 'rest-1',
    category_id: 'cat-mah-special',
    name: 'Royal Guntewari Maharashtrian Thali',
    description: 'Grand Maharashtrian feast featuring Pithla, Bharli Vangi, Katachi Amti, Kothimbir Vadi, Sol Kadhi, 2 Jowar Bhakri, Indrayani Rice, and Gulab Jamun.',
    price: 360,
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&q=80&w=600',
    is_veg: true,
    is_available: true,
    is_bestseller: true,
    spicy_level: 2,
    calories: 680,
    prep_time_mins: 20
  },
  {
    id: 'item-mah-2',
    restaurant_id: 'rest-1',
    category_id: 'cat-mah-special',
    name: 'Kolhapuri Misal Pav Special',
    description: 'Fiery sprouted moth bean gravy served with spicy rassa, crispy farsan, fresh onions, lemon wedge, and 2 butter toasted pavs.',
    price: 160,
    image: '/images/misal-pav.png',
    is_veg: true,
    is_available: true,
    is_bestseller: true,
    spicy_level: 3,
    calories: 420,
    prep_time_mins: 12
  },
  {
    id: 'item-mah-3',
    restaurant_id: 'rest-1',
    category_id: 'cat-mah-special',
    name: 'Pithla Bhakri Combo',
    description: 'Traditional chickpea flour curry tempered with garlic, green chilies, and mustard, served with 2 hot Jowar Bhakris and crushed Thecha.',
    price: 210,
    image: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&q=80&w=600',
    is_veg: true,
    is_available: true,
    is_bestseller: true,
    spicy_level: 2,
    calories: 450,
    prep_time_mins: 15
  },
  {
    id: 'item-mah-4',
    restaurant_id: 'rest-1',
    category_id: 'cat-mah-special',
    name: 'Bharli Vangi (Stuffed Eggplant Curry)',
    description: 'Small tender baby eggplants stuffed with roasted peanut, coconut, and sesame spice paste cooked in a rich Maharashtrian gravy.',
    price: 240,
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&q=80&w=600',
    is_veg: true,
    is_available: true,
    is_bestseller: false,
    spicy_level: 2,
    calories: 380,
    prep_time_mins: 18
  },
  {
    id: 'item-mah-5',
    restaurant_id: 'rest-1',
    category_id: 'cat-mah-special',
    name: 'Crispy Sabudana Vada (2 Pcs)',
    description: 'Golden fried sago tapioca patties blended with roasted peanuts and green chilies, served with sweet curd chutney.',
    price: 140,
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=600',
    is_veg: true,
    is_available: true,
    is_bestseller: true,
    spicy_level: 1,
    calories: 310,
    prep_time_mins: 10
  },
  {
    id: 'item-mah-6',
    restaurant_id: 'rest-1',
    category_id: 'cat-mah-special',
    name: 'Kothimbir Vadi (6 Pcs)',
    description: 'Steamed & shallow-fried cilantro and gram flour cakes tempered with sesame seeds and green chilies.',
    price: 180,
    image: '/images/kothimbir-vadi.png',
    is_veg: true,
    is_available: true,
    is_bestseller: false,
    spicy_level: 1,
    calories: 240,
    prep_time_mins: 12
  },

  // === STARTERS & SIZZLERS ===
  {
    id: 'item-1',
    restaurant_id: 'rest-1',
    category_id: 'cat-1',
    name: 'Guntewari Special Paneer Sizzler',
    description: 'Clay oven marinated cottage cheese in Kashmiri chili yogurt, hung curd, and roasted spices served sizzler style.',
    price: 340,
    image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&q=80&w=600',
    is_veg: true,
    is_available: true,
    is_bestseller: true,
    spicy_level: 2,
    calories: 340,
    prep_time_mins: 15
  },
  {
    id: 'item-str-2',
    restaurant_id: 'rest-1',
    category_id: 'cat-1',
    name: 'Tandoori Malai Paneer Tikka',
    description: 'Succulent paneer cubes marinated in rich cashew paste, cardamom, and fresh cream grilled in tandoor.',
    price: 310,
    image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&q=80&w=600',
    is_veg: true,
    is_available: true,
    is_bestseller: true,
    spicy_level: 0,
    calories: 390,
    prep_time_mins: 15
  },
  {
    id: 'item-str-3',
    restaurant_id: 'rest-1',
    category_id: 'cat-1',
    name: 'Hara Bhara Kebab (6 Pcs)',
    description: 'Crispy pan-fried spinach, green pea, and potato kebabs infused with crushed cashew nuts.',
    price: 220,
    image: '/images/hara-bhara-kebab.png',
    is_veg: true,
    is_available: true,
    is_bestseller: false,
    spicy_level: 1,
    calories: 220,
    prep_time_mins: 12
  },

  // === ROYAL INDIAN MAIN COURSE ===
  {
    id: 'item-3',
    restaurant_id: 'rest-1',
    category_id: 'cat-2',
    name: 'Paneer Butter Masala',
    description: 'Rich tomato, fresh Amul butter, and cashew gravy infused with Kasuri Methi and aromatic Indian spices.',
    price: 320,
    image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&q=80&w=600',
    is_veg: true,
    is_available: true,
    is_bestseller: true,
    spicy_level: 1,
    calories: 450,
    prep_time_mins: 20
  },
  {
    id: 'item-mc-2',
    restaurant_id: 'rest-1',
    category_id: 'cat-2',
    name: 'Veg Kolhapuri Special',
    description: 'Assorted seasonal vegetables cooked in spicy red Kolhapuri chili gravy with roasted dry coconut and sesame.',
    price: 290,
    image: '/images/veg-kolhapuri.jpg',
    is_veg: true,
    is_available: true,
    is_bestseller: true,
    spicy_level: 3,
    calories: 370,
    prep_time_mins: 18
  },
  {
    id: 'item-mc-3',
    restaurant_id: 'rest-1',
    category_id: 'cat-2',
    name: 'Kaju Curry Royal',
    description: 'Whole roasted cashew nuts simmered in rich creamy golden onion and melon seed gravy.',
    price: 350,
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&q=80&w=600',
    is_veg: true,
    is_available: true,
    is_bestseller: false,
    spicy_level: 1,
    calories: 520,
    prep_time_mins: 20
  },
  {
    id: 'item-4',
    restaurant_id: 'rest-1',
    category_id: 'cat-2',
    name: 'Dal Tadka Special',
    description: 'Yellow arhar lentils tempered with cow ghee, cumin seeds, garlic, and whole red chillies.',
    price: 210,
    image: '/images/dal-tadka.png',
    is_veg: true,
    is_available: true,
    is_bestseller: false,
    spicy_level: 1,
    calories: 280,
    prep_time_mins: 15
  },
  {
    id: 'item-mc-5',
    restaurant_id: 'rest-1',
    category_id: 'cat-2',
    name: 'Dal Makhani Royal',
    description: 'Slow-cooked whole black lentils overnight over charcoal, finished with fresh butter and cream.',
    price: 260,
    image: '/images/dal-makhani.png',
    is_veg: true,
    is_available: true,
    is_bestseller: true,
    spicy_level: 1,
    calories: 410,
    prep_time_mins: 20
  },

  // === SOUTH INDIAN DELICACIES ===
  {
    id: 'item-5',
    restaurant_id: 'rest-1',
    category_id: 'cat-3',
    name: 'Butter Masala Dosa',
    description: 'Crispy golden rice crepe filled with spiced potato onion masala, served with piping hot sambar and 3 coconut chutneys.',
    price: 180,
    image: '/images/butter-dosa.png',
    is_veg: true,
    is_available: true,
    is_bestseller: true,
    spicy_level: 1,
    calories: 310,
    prep_time_mins: 10
  },
  {
    id: 'item-si-2',
    restaurant_id: 'rest-1',
    category_id: 'cat-3',
    name: 'Mysore Cheese Masala Dosa',
    description: 'Crispy dosa coated with spicy red chili garlic paste, potato filling, and melted Amul cheese.',
    price: 220,
    image: '/images/mysore-cheese-dosa.png',
    is_veg: true,
    is_available: true,
    is_bestseller: true,
    spicy_level: 2,
    calories: 420,
    prep_time_mins: 12
  },
  {
    id: 'item-si-3',
    restaurant_id: 'rest-1',
    category_id: 'cat-3',
    name: 'Steam Idli Sambar (2 Pcs)',
    description: 'Soft pillowy steamed rice cakes served with aromatic drumstick sambar and fresh coconut chutney.',
    price: 110,
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=600',
    is_veg: true,
    is_available: true,
    is_bestseller: false,
    spicy_level: 0,
    calories: 190,
    prep_time_mins: 8
  },

  // === BHAKRI, NAAN & BIRYANI ===
  {
    id: 'item-brd-1',
    restaurant_id: 'rest-1',
    category_id: 'cat-4',
    name: 'Fresh Jowar / Bajra Bhakri',
    description: 'Hand-patted healthy flatbread made from organic jowar or bajra millet flour, baked on clay tawa.',
    price: 35,
    image: '/images/jowar-bhakri.png',
    is_veg: true,
    is_available: true,
    is_bestseller: true,
    spicy_level: 0,
    calories: 120,
    prep_time_mins: 5
  },
  {
    id: 'item-6',
    restaurant_id: 'rest-1',
    category_id: 'cat-4',
    name: 'Garlic Butter Naan',
    description: 'Clay oven tandoor baked flatbread brushed with garlic butter and fresh coriander.',
    price: 65,
    image: '/images/garlic-naan.png',
    is_veg: true,
    is_available: true,
    is_bestseller: false,
    spicy_level: 0,
    calories: 180,
    prep_time_mins: 5
  },
  {
    id: 'item-brd-3',
    restaurant_id: 'rest-1',
    category_id: 'cat-4',
    name: 'Hyderabadi Veg Dum Biryani',
    description: 'Long grain basmati rice dum-cooked with marinated vegetables, saffron, mint, and whole spices in a sealed handi.',
    price: 290,
    image: '/images/veg-biryani.png',
    is_veg: true,
    is_available: true,
    is_bestseller: true,
    spicy_level: 2,
    calories: 490,
    prep_time_mins: 22
  },

  // === MAHARASHTRIAN SWEETS & COOLERS ===
  {
    id: 'item-sw-1',
    restaurant_id: 'rest-1',
    category_id: 'cat-5',
    name: 'Ukadiche Modak (2 Pcs)',
    description: 'Traditional steamed rice flour dumplings stuffed with fresh grated coconut, jaggery, nutmeg, and cardamom, drizzled with pure ghee.',
    price: 160,
    image: '/images/ukadiche-modak.png',
    is_veg: true,
    is_available: true,
    is_bestseller: true,
    spicy_level: 0,
    calories: 290,
    prep_time_mins: 15
  },
  {
    id: 'item-sw-2',
    restaurant_id: 'rest-1',
    category_id: 'cat-5',
    name: 'Puran Poli with Pure Ghee (2 Pcs)',
    description: 'Sweet flatbread stuffed with cooked chana dal, jaggery, cardamom, and nutmeg, served hot with warm ghee.',
    price: 180,
    image: '/images/puran-poli.png',
    is_veg: true,
    is_available: true,
    is_bestseller: true,
    spicy_level: 0,
    calories: 360,
    prep_time_mins: 12
  },
  {
    id: 'item-sw-3',
    restaurant_id: 'rest-1',
    category_id: 'cat-5',
    name: 'Authentic Sol Kadhi',
    description: 'Refreshing coastal Maharashtrian drink made from kokum extract and fresh coconut milk infused with garlic and green chili.',
    price: 80,
    image: '/images/sol-kadhi.png',
    is_veg: true,
    is_available: true,
    is_bestseller: true,
    spicy_level: 1,
    calories: 90,
    prep_time_mins: 5
  },
  {
    id: 'item-7',
    restaurant_id: 'rest-1',
    category_id: 'cat-5',
    name: 'Alphonso Mango Lassi',
    description: 'Thick creamy churned yogurt blended with authentic Ratnagiri Alphonso mango pulp and saffron.',
    price: 130,
    image: '/images/mango-lassi.png',
    is_veg: true,
    is_available: true,
    is_bestseller: true,
    spicy_level: 0,
    calories: 210,
    prep_time_mins: 5
  }
];

export const INITIAL_TABLES: Table[] = [
  { id: 'tbl-1', restaurant_id: 'rest-1', table_number: 'G-01', capacity: 2, section: 'Indoor', status: 'available' },
  { id: 'tbl-2', restaurant_id: 'rest-1', table_number: 'G-02', capacity: 4, section: 'Indoor', status: 'available' },
  { id: 'tbl-3', restaurant_id: 'rest-1', table_number: 'G-03', capacity: 6, section: 'Family VIP', status: 'reserved' },
  { id: 'tbl-4', restaurant_id: 'rest-1', table_number: 'G-04', capacity: 4, section: 'Outdoor', status: 'available' },
  { id: 'tbl-5', restaurant_id: 'rest-1', table_number: 'G-05', capacity: 8, section: 'Outdoor', status: 'available' }
];

export const INITIAL_RESERVATIONS: Reservation[] = [
  {
    id: 'res-101',
    user_id: 'usr-1',
    user_name: 'Aditya Sharma',
    user_phone: '+91 98765 43210',
    user_email: 'aditya@example.com',
    restaurant_id: 'rest-1',
    restaurant_name: 'Hotel Guntewari',
    table_id: 'tbl-3',
    table_number: 'G-03',
    date: '2026-08-10',
    time: '08:00 PM',
    guest_count: 4,
    special_request: 'Window family table preferred.',
    status: 'confirmed',
    created_at: '2026-08-09T18:00:00Z'
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-901',
    restaurant_id: 'rest-1',
    restaurant_name: 'Hotel Guntewari',
    user_id: 'usr-1',
    user_name: 'Aditya Sharma',
    user_phone: '+91 98765 43210',
    delivery_address: 'Peth Vadgaon, Kolhapur',
    items: [
      { id: 'oi-1', order_id: 'ord-901', menu_item_id: 'item-mah-1', name: 'Royal Guntewari Maharashtrian Thali', price: 360, quantity: 1 },
      { id: 'oi-2', order_id: 'ord-901', menu_item_id: 'item-mah-2', name: 'Kolhapuri Misal Pav Special', price: 160, quantity: 1 },
      { id: 'oi-3', order_id: 'ord-901', menu_item_id: 'item-sw-3', name: 'Authentic Sol Kadhi', price: 80, quantity: 2 }
    ],
    subtotal: 680,
    tax: 34,
    discount: 50,
    points_redeemed: 0,
    total: 664,
    status: 'preparing',
    payment_status: 'paid',
    payment_method: 'UPI',
    created_at: '2026-08-09T21:45:00Z',
    estimated_mins: 25
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    restaurant_id: 'rest-1',
    user_id: 'usr-10',
    user_name: 'Priya Deshmukh',
    rating: 5,
    review: 'Hotel Guntewari serves the best Maharashtrian Thali and Ukadiche Modak in Kolhapur region! Outstanding taste and family environment.',
    sentiment: 'positive',
    aspects: { food: 'Excellent', service: 'Fast', ambience: 'Clean' },
    created_at: '2026-08-05'
  },
  {
    id: 'rev-2',
    restaurant_id: 'rest-1',
    user_id: 'usr-11',
    user_name: 'Rahul Kulkarni',
    rating: 5,
    review: 'Loved the Pithla Bhakri and Sol Kadhi! Authentic Maharashtrian taste.',
    sentiment: 'positive',
    aspects: { food: 'Delicious', service: 'Courteous' },
    created_at: '2026-08-07'
  }
];

export const INITIAL_OFFERS: Offer[] = [
  {
    id: 'off-1',
    restaurant_id: 'rest-1',
    code: 'GUNTEWARI50',
    title: 'Get 50% OFF on Hotel Guntewari First Order',
    discount_percentage: 50,
    max_discount: 100,
    min_order_amount: 300,
    valid_till: '2026-12-31',
    is_active: true
  }
];
