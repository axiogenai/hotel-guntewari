export type UserRole = 'customer' | 'owner' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatar?: string;
  created_at: string;
}

export interface Restaurant {
  id: string;
  owner_id: string;
  name: string;
  slug: string;
  description: string;
  cuisine: string[];
  address: string;
  phone: string;
  email: string;
  opening_hours: string;
  latitude: number;
  longitude: number;
  rating: number;
  reviews_count: number;
  price_range: '₹' | '₹₹' | '₹₹₹' | '₹₹₹₹';
  image: string;
  banner: string;
  status: 'pending' | 'approved' | 'suspended';
  is_featured: boolean;
  is_veg_only?: boolean;
  has_ac: boolean;
  has_parking: boolean;
  has_outdoor_seating: boolean;
  is_family_friendly: boolean;
  created_at: string;
}

export interface MenuCategory {
  id: string;
  restaurant_id: string;
  name: string;
  sort_order: number;
}

export interface MenuItem {
  id: string;
  restaurant_id: string;
  category_id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  is_veg: boolean;
  is_available: boolean;
  is_bestseller?: boolean;
  spicy_level?: 0 | 1 | 2 | 3;
  calories?: number;
  prep_time_mins?: number;
}

export interface Table {
  id: string;
  restaurant_id: string;
  table_number: string;
  capacity: number;
  section: 'Indoor' | 'Outdoor' | 'VIP' | 'Rooftop' | 'Family VIP';
  status: 'available' | 'reserved' | 'occupied';
}

export type ReservationStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed';

export interface Reservation {
  id: string;
  user_id: string;
  user_name: string;
  user_phone: string;
  user_email: string;
  restaurant_id: string;
  restaurant_name: string;
  table_id: string;
  table_number: string;
  date: string;
  time: string;
  guest_count: number;
  special_request?: string;
  status: ReservationStatus;
  created_at: string;
}

export type OrderStatus = 'received' | 'preparing' | 'ready' | 'delivered' | 'cancelled';
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded';
export type PaymentMethod = 'COD' | 'UPI' | 'Razorpay';

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
  special_instructions?: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  menu_item_id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  restaurant_id: string;
  restaurant_name: string;
  user_id: string;
  user_name: string;
  user_phone: string;
  delivery_address: string;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  discount: number;
  points_redeemed: number;
  total: number;
  status: OrderStatus;
  payment_status: PaymentStatus;
  payment_method: PaymentMethod;
  created_at: string;
  estimated_mins: number;
}

export interface Review {
  id: string;
  restaurant_id: string;
  user_id: string;
  user_name: string;
  user_avatar?: string;
  rating: number;
  review: string;
  sentiment?: 'positive' | 'negative' | 'neutral';
  aspects?: {
    food?: string;
    service?: string;
    ambience?: string;
  };
  created_at: string;
}

export interface LoyaltyAccount {
  user_id: string;
  points: number;
  total_earned: number;
  total_redeemed: number;
}

export interface Offer {
  id: string;
  restaurant_id: string;
  code: string;
  title: string;
  discount_percentage: number;
  max_discount: number;
  min_order_amount: number;
  valid_till: string;
  is_active: boolean;
}

export interface WhatsAppLog {
  id: string;
  to_phone: string;
  to_name: string;
  type: 'booking_confirmation' | 'order_update' | 'promotion' | 'new_order_alert';
  message: string;
  timestamp: string;
  status: 'sent' | 'delivered' | 'read';
}
