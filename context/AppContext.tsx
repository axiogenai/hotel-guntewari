'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User, UserRole, Restaurant, MenuItem, MenuCategory, Table,
  Reservation, Order, Review, LoyaltyAccount, Offer, WhatsAppLog, CartItem, OrderStatus
} from '@/lib/types';
import {
  INITIAL_USERS, INITIAL_RESTAURANTS, INITIAL_CATEGORIES,
  INITIAL_MENU_ITEMS, INITIAL_TABLES, INITIAL_RESERVATIONS,
  INITIAL_ORDERS, INITIAL_REVIEWS, INITIAL_OFFERS
} from '@/lib/mock-data';

interface AppContextType {
  // User & Role
  currentUser: User;
  setRole: (role: UserRole) => void;

  // Active Multi-tenant / Restaurant
  activeRestaurantSlug: string;
  setActiveRestaurantSlug: (slug: string) => void;
  activeRestaurant: Restaurant;

  // Restaurants
  restaurants: Restaurant[];
  addRestaurant: (rest: Partial<Restaurant>) => void;
  toggleRestaurantStatus: (id: string, status: 'approved' | 'suspended') => void;
  toggleFeaturedRestaurant: (id: string) => void;

  // Menu items & Categories
  menuItems: MenuItem[];
  categories: MenuCategory[];
  addDish: (item: Omit<MenuItem, 'id'>) => void;
  toggleDishAvailability: (id: string) => void;
  updateDishPrice: (id: string, newPrice: number) => void;

  // Cart & Loyalty
  cart: CartItem[];
  addToCart: (item: MenuItem, instructions?: string) => void;
  removeFromCart: (itemId: string) => void;
  updateCartQuantity: (itemId: string, delta: number) => void;
  clearCart: () => void;
  pointsRedeemed: number;
  toggleRedeemPoints: (enable: boolean) => void;
  appliedOffer: Offer | null;
  applyCoupon: (code: string) => string | null; // returns error or null
  removeCoupon: () => void;
  userLoyalty: LoyaltyAccount;

  // Modals & Drawers
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isBookingOpen: boolean;
  setIsBookingOpen: (open: boolean) => void;
  selectedRestaurantForBooking: Restaurant | null;
  openBookingModal: (rest?: Restaurant) => void;
  isAIAssistantOpen: boolean;
  setIsAIAssistantOpen: (open: boolean) => void;
  isQRModalOpen: boolean;
  setIsQRModalOpen: (open: boolean) => void;
  qrRestaurant: Restaurant | null;
  openQRModal: (rest: Restaurant) => void;
  isPaymentModalOpen: boolean;
  setIsPaymentModalOpen: (open: boolean) => void;
  isWhatsAppDrawerOpen: boolean;
  setIsWhatsAppDrawerOpen: (open: boolean) => void;

  // Table Reservations
  tables: Table[];
  reservations: Reservation[];
  addReservation: (resData: Omit<Reservation, 'id' | 'created_at' | 'status'>) => Reservation;
  updateReservationStatus: (id: string, status: Reservation['status']) => void;

  // Orders
  orders: Order[];
  activeOrder: Order | null;
  createOrder: (address: string, paymentMethod: 'COD' | 'UPI' | 'Razorpay') => Order;
  updateOrderStatus: (id: string, status: OrderStatus) => void;

  // Reviews
  reviews: Review[];
  addReview: (restaurantId: string, rating: number, text: string) => void;

  // WhatsApp Simulator Logs
  whatsappLogs: WhatsAppLog[];
  sendWhatsAppAlert: (log: Omit<WhatsAppLog, 'id' | 'timestamp' | 'status'>) => void;

  // Offers
  offers: Offer[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User>(INITIAL_USERS[0]);
  const [restaurants, setRestaurants] = useState<Restaurant[]>(INITIAL_RESTAURANTS);
  const [activeRestaurantSlug, setActiveRestaurantSlug] = useState<string>('malak');
  const [categories, setCategories] = useState<MenuCategory[]>(INITIAL_CATEGORIES);
  const [menuItems, setMenuItems] = useState<MenuItem[]>(INITIAL_MENU_ITEMS);
  const [tables, setTables] = useState<Table[]>(INITIAL_TABLES);
  const [reservations, setReservations] = useState<Reservation[]>(INITIAL_RESERVATIONS);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [offers] = useState<Offer[]>(INITIAL_OFFERS);
  const [whatsappLogs, setWhatsappLogs] = useState<WhatsAppLog[]>([]);

  // Cart & Loyalty State
  const [cart, setCart] = useState<CartItem[]>([]);
  const [userLoyalty, setUserLoyalty] = useState<LoyaltyAccount>({
    user_id: 'usr-1',
    points: 150, // Starts with 150 bonus points
    total_earned: 250,
    total_redeemed: 100
  });
  const [pointsRedeemed, setPointsRedeemed] = useState<number>(0);
  const [appliedOffer, setAppliedOffer] = useState<Offer | null>(null);
  const [activeOrder, setActiveOrder] = useState<Order | null>(INITIAL_ORDERS[0] || null);

  // Modals state
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isBookingOpen, setIsBookingOpen] = useState<boolean>(false);
  const [selectedRestaurantForBooking, setSelectedRestaurantForBooking] = useState<Restaurant | null>(null);
  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState<boolean>(false);
  const [isQRModalOpen, setIsQRModalOpen] = useState<boolean>(false);
  const [qrRestaurant, setQrRestaurant] = useState<Restaurant | null>(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState<boolean>(false);
  const [isWhatsAppDrawerOpen, setIsWhatsAppDrawerOpen] = useState<boolean>(false);

  const activeRestaurant = restaurants.find(r => r.slug === activeRestaurantSlug) || restaurants[0];

  const setRole = (role: UserRole) => {
    setCurrentUser(prev => ({ ...prev, role }));
  };

  const addRestaurant = (rest: Partial<Restaurant>) => {
    const newRest: Restaurant = {
      id: `rest-${Date.now()}`,
      owner_id: currentUser.id,
      name: rest.name || 'New Restaurant',
      slug: rest.slug || rest.name?.toLowerCase().replace(/\s+/g, '-') || `rest-${Date.now()}`,
      description: rest.description || '',
      cuisine: rest.cuisine || ['Multicuisine'],
      address: rest.address || 'Central Street',
      phone: rest.phone || '+91 99999 88888',
      email: rest.email || 'contact@restaurant.com',
      opening_hours: rest.opening_hours || '10:00 AM - 11:00 PM',
      latitude: rest.latitude || 18.5204,
      longitude: rest.longitude || 73.8567,
      rating: 4.5,
      reviews_count: 0,
      price_range: rest.price_range || '₹₹',
      image: rest.image || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800',
      banner: rest.banner || 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=1200',
      status: 'approved',
      is_featured: false,
      is_veg_only: rest.is_veg_only || false,
      has_ac: rest.has_ac ?? true,
      has_parking: rest.has_parking ?? true,
      has_outdoor_seating: rest.has_outdoor_seating ?? false,
      is_family_friendly: rest.is_family_friendly ?? true,
      created_at: new Date().toISOString()
    };
    setRestaurants(prev => [newRest, ...prev]);
  };

  const toggleRestaurantStatus = (id: string, status: 'approved' | 'suspended') => {
    setRestaurants(prev => prev.map(r => r.id === id ? { ...r, status } : r));
  };

  const toggleFeaturedRestaurant = (id: string) => {
    setRestaurants(prev => prev.map(r => r.id === id ? { ...r, is_featured: !r.is_featured } : r));
  };

  // Cart operations
  const addToCart = (item: MenuItem, instructions?: string) => {
    setCart(prev => {
      const existing = prev.find(i => i.menuItem.id === item.id);
      if (existing) {
        return prev.map(i => i.menuItem.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { menuItem: item, quantity: 1, special_instructions: instructions }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (itemId: string) => {
    setCart(prev => prev.filter(i => i.menuItem.id !== itemId));
  };

  const updateCartQuantity = (itemId: string, delta: number) => {
    setCart(prev => prev.map(i => {
      if (i.menuItem.id === itemId) {
        const newQty = i.quantity + delta;
        return newQty > 0 ? { ...i, quantity: newQty } : null;
      }
      return i;
    }).filter(Boolean) as CartItem[]);
  };

  const clearCart = () => {
    setCart([]);
    setPointsRedeemed(0);
    setAppliedOffer(null);
  };

  const toggleRedeemPoints = (enable: boolean) => {
    if (enable) {
      // 100 points = ₹10
      const redeemablePoints = Math.min(userLoyalty.points, 500); // max 500 points = ₹50
      setPointsRedeemed(redeemablePoints);
    } else {
      setPointsRedeemed(0);
    }
  };

  const applyCoupon = (code: string): string | null => {
    const offer = offers.find(o => o.code.toUpperCase() === code.toUpperCase() && o.is_active);
    if (!offer) return 'Invalid coupon code or expired offer.';
    setAppliedOffer(offer);
    return null;
  };

  const removeCoupon = () => setAppliedOffer(null);

  // Menu items actions
  const addDish = (itemData: Omit<MenuItem, 'id'>) => {
    const newItem: MenuItem = {
      ...itemData,
      id: `item-${Date.now()}`
    };
    setMenuItems(prev => [newItem, ...prev]);
  };

  const toggleDishAvailability = (id: string) => {
    setMenuItems(prev => prev.map(i => i.id === id ? { ...i, is_available: !i.is_available } : i));
  };

  const updateDishPrice = (id: string, newPrice: number) => {
    setMenuItems(prev => prev.map(i => i.id === id ? { ...i, price: newPrice } : i));
  };

  // Booking actions
  const openBookingModal = (rest?: Restaurant) => {
    setSelectedRestaurantForBooking(rest || activeRestaurant);
    setIsBookingOpen(true);
  };

  const openQRModal = (rest: Restaurant) => {
    setQrRestaurant(rest);
    setIsQRModalOpen(true);
  };

  const sendWhatsAppAlert = (logData: Omit<WhatsAppLog, 'id' | 'timestamp' | 'status'>) => {
    const newLog: WhatsAppLog = {
      ...logData,
      id: `wa-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'delivered'
    };
    setWhatsappLogs(prev => [newLog, ...prev]);
  };

  const addReservation = (resData: Omit<Reservation, 'id' | 'created_at' | 'status'>): Reservation => {
    const newRes: Reservation = {
      ...resData,
      id: `res-${Date.now()}`,
      status: 'confirmed',
      created_at: new Date().toISOString()
    };
    setReservations(prev => [newRes, ...prev]);

    // Send instant WhatsApp alert simulation
    sendWhatsAppAlert({
      to_phone: resData.user_phone,
      to_name: resData.user_name,
      type: 'booking_confirmation',
      message: `🎉 Table Booking Confirmed at ${resData.restaurant_name}! Date: ${resData.date} @ ${resData.time}. Guests: ${resData.guest_count}. Table: ${resData.table_number}. Show this message at entry.`
    });

    return newRes;
  };

  const updateReservationStatus = (id: string, status: Reservation['status']) => {
    setReservations(prev => prev.map(r => r.id === id ? { ...r, status } : r));
  };

  // Order actions
  const createOrder = (address: string, paymentMethod: 'COD' | 'UPI' | 'Razorpay'): Order => {
    const subtotal = cart.reduce((acc, i) => acc + (i.menuItem.price * i.quantity), 0);
    const tax = Math.round(subtotal * 0.05);
    
    let discount = 0;
    if (appliedOffer) {
      discount = Math.min((subtotal * appliedOffer.discount_percentage) / 100, appliedOffer.max_discount);
    }
    const pointsDiscount = Math.floor(pointsRedeemed / 10); // 10 points = 1 rupee discount
    const total = Math.max(0, subtotal + tax - discount - pointsDiscount);

    // Calculate loyalty points earned (₹100 = 10 points)
    const earnedPoints = Math.floor(total / 10);

    const newOrder: Order = {
      id: `ord-${Math.floor(100 + Math.random() * 900)}`,
      restaurant_id: activeRestaurant.id,
      restaurant_name: activeRestaurant.name,
      user_id: currentUser.id,
      user_name: currentUser.name,
      user_phone: currentUser.phone,
      delivery_address: address,
      items: cart.map(c => ({
        id: `oi-${Date.now()}-${c.menuItem.id}`,
        order_id: '',
        menu_item_id: c.menuItem.id,
        name: c.menuItem.name,
        price: c.menuItem.price,
        quantity: c.quantity
      })),
      subtotal,
      tax,
      discount: discount + pointsDiscount,
      points_redeemed: pointsRedeemed,
      total,
      status: 'received',
      payment_status: paymentMethod === 'COD' ? 'pending' : 'paid',
      payment_method: paymentMethod,
      created_at: new Date().toISOString(),
      estimated_mins: 30
    };

    setOrders(prev => [newOrder, ...prev]);
    setActiveOrder(newOrder);

    // Update user loyalty account
    setUserLoyalty(prev => ({
      ...prev,
      points: prev.points - pointsRedeemed + earnedPoints,
      total_earned: prev.total_earned + earnedPoints,
      total_redeemed: prev.total_redeemed + pointsRedeemed
    }));

    // Trigger WhatsApp Cloud API alert simulation
    sendWhatsAppAlert({
      to_phone: currentUser.phone,
      to_name: currentUser.name,
      type: 'order_update',
      message: `🛵 Order #${newOrder.id} Placed at ${activeRestaurant.name}! Total: ₹${total.toFixed(2)}. Status: Order Received. Track live in Axiogen Eats app!`
    });

    clearCart();
    return newOrder;
  };

  const updateOrderStatus = (id: string, status: OrderStatus) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
    if (activeOrder?.id === id) {
      setActiveOrder(prev => prev ? { ...prev, status } : null);
    }
  };

  const addReview = (restaurantId: string, rating: number, reviewText: string) => {
    const newRev: Review = {
      id: `rev-${Date.now()}`,
      restaurant_id: restaurantId,
      user_id: currentUser.id,
      user_name: currentUser.name,
      user_avatar: currentUser.avatar,
      rating,
      review: reviewText,
      sentiment: rating >= 4 ? 'positive' : rating === 3 ? 'neutral' : 'negative',
      created_at: new Date().toISOString().split('T')[0]
    };
    setReviews(prev => [newRev, ...prev]);
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        setRole,
        activeRestaurantSlug,
        setActiveRestaurantSlug,
        activeRestaurant,
        restaurants,
        addRestaurant,
        toggleRestaurantStatus,
        toggleFeaturedRestaurant,
        menuItems,
        categories,
        addDish,
        toggleDishAvailability,
        updateDishPrice,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        pointsRedeemed,
        toggleRedeemPoints,
        appliedOffer,
        applyCoupon,
        removeCoupon,
        userLoyalty,
        isCartOpen,
        setIsCartOpen,
        isBookingOpen,
        setIsBookingOpen,
        selectedRestaurantForBooking,
        openBookingModal,
        isAIAssistantOpen,
        setIsAIAssistantOpen,
        isQRModalOpen,
        setIsQRModalOpen,
        qrRestaurant,
        openQRModal,
        isPaymentModalOpen,
        setIsPaymentModalOpen,
        isWhatsAppDrawerOpen,
        setIsWhatsAppDrawerOpen,
        tables,
        reservations,
        addReservation,
        updateReservationStatus,
        orders,
        activeOrder,
        createOrder,
        updateOrderStatus,
        reviews,
        addReview,
        whatsappLogs,
        sendWhatsAppAlert,
        offers
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
