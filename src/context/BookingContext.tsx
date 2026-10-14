import React, { createContext, useContext, useState, useEffect } from 'react';
import type { 
  Product, 
  DecorPackage, 
  CartItem, 
  Booking, 
  Coupon, 
  UserProfile,
  BookingStatusType
} from '../types';
import { 
  INITIAL_PRODUCTS, 
  PACKAGES, 
  COUPONS, 
  INITIAL_BOOKINGS 
} from '../data/mockData';

interface BookingContextType {
  products: Product[];
  packages: DecorPackage[];
  cart: CartItem[];
  wishlist: string[];
  bookings: Booking[];
  coupons: Coupon[];
  appliedCoupon: Coupon | null;
  selectedDates: { startDate: string; endDate: string };
  rentalDays: number;
  user: UserProfile | null;
  activePage: string;
  selectedProductId: string | null;
  selectedBookingId: string | null;
  activeCategoryFilter: string;
  searchQuery: string;
  toastMessage: string | null;
  
  // Navigation & Filters
  navigateTo: (page: string, params?: { productId?: string; bookingId?: string; category?: string; query?: string }) => void;
  setActiveCategoryFilter: (category: string) => void;
  setSearchQuery: (query: string) => void;
  showToast: (msg: string) => void;

  // Cart operations
  addToCart: (product: Product, quantity?: number, startDate?: string, endDate?: string, withSetup?: boolean) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  toggleCartItemSetup: (productId: string) => void;
  clearCart: () => void;
  getCartTotals: () => {
    subtotal: number;
    deliveryFee: number;
    setupFee: number;
    securityDeposit: number;
    discount: number;
    tax: number;
    grandTotal: number;
    itemCount: number;
  };

  // Wishlist
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Dates & Availability
  setSelectedDates: (dates: { startDate: string; endDate: string }) => void;
  checkAvailability: (productId: string, startDate?: string, endDate?: string, quantity?: number) => {
    available: boolean;
    remainingStock: number;
    message: string;
  };

  // Coupons
  applyCouponCode: (code: string) => { success: boolean; message: string };
  removeCouponCode: () => void;

  // Bookings
  createBooking: (bookingData: Omit<Booking, 'id' | 'createdAt' | 'status' | 'trackingSteps'>) => Booking;
  updateBookingStatus: (bookingId: string, status: BookingStatusType, notes?: string) => void;

  // Admin Management Actions
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, updated: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  addCoupon: (coupon: Omit<Coupon, 'id'>) => void;
  deleteCoupon: (id: string) => void;
  toggleCouponActive: (id: string) => void;

  // Auth
  login: (email: string, role?: 'customer' | 'admin') => void;
  logout: () => void;
  switchRole: () => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load initial states or localStorage
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('utsav_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [packages] = useState<DecorPackage[]>(PACKAGES);

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('utsav_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('utsav_wishlist');
    return saved ? JSON.parse(saved) : ['prod-1', 'prod-2'];
  });

  const [bookings, setBookings] = useState<Booking[]>(() => {
    const saved = localStorage.getItem('utsav_bookings');
    return saved ? JSON.parse(saved) : INITIAL_BOOKINGS;
  });

  const [coupons, setCoupons] = useState<Coupon[]>(() => {
    const saved = localStorage.getItem('utsav_coupons');
    return saved ? JSON.parse(saved) : COUPONS;
  });

  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);

  // Global default rental dates (default to next weekend)
  const [selectedDates, setSelectedDatesState] = useState<{ startDate: string; endDate: string }>(() => {
    const today = new Date();
    const start = new Date(today);
    start.setDate(today.getDate() + 7);
    const end = new Date(start);
    end.setDate(start.getDate() + 1);
    return {
      startDate: start.toISOString().split('T')[0],
      endDate: end.toISOString().split('T')[0],
    };
  });

  // Calculate rental days
  const calculateDays = (startStr: string, endStr: string): number => {
    const start = new Date(startStr);
    const end = new Date(endStr);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(1, diffDays);
  };

  const rentalDays = calculateDays(selectedDates.startDate, selectedDates.endDate);

  // User state
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('utsav_user');
    return saved ? JSON.parse(saved) : {
      id: 'usr-1',
      name: 'Rohit Khandelwal',
      email: 'rohit.khandelwal@gmail.com',
      phone: '+91 98290 41122',
      role: 'customer',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      savedAddresses: [
        {
          id: 'addr-1',
          label: 'The Leela Palace Ballroom',
          venueName: 'The Leela Palace Bengaluru',
          address: 'Old Airport Road, Kodihalli',
          city: 'Bengaluru',
          pincode: '560008',
          isDefault: true,
        },
        {
          id: 'addr-2',
          label: 'Family Ancestral Farmhouse',
          venueName: 'Rathore Farmhouses',
          address: 'Ajmer Road, Near Toll Plaza',
          city: 'Jaipur',
          pincode: '302026',
        }
      ],
    };
  });

  // Navigation states
  const [activePage, setActivePage] = useState<string>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(null);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('utsav_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('utsav_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('utsav_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('utsav_bookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem('utsav_coupons', JSON.stringify(coupons));
  }, [coupons]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('utsav_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('utsav_user');
    }
  }, [user]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const navigateTo = (page: string, params?: { productId?: string; bookingId?: string; category?: string; query?: string }) => {
    if (params?.productId) setSelectedProductId(params.productId);
    if (params?.bookingId) setSelectedBookingId(params.bookingId);
    if (params?.category) setActiveCategoryFilter(params.category);
    if (params?.query !== undefined) setSearchQuery(params.query);
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const setSelectedDates = (dates: { startDate: string; endDate: string }) => {
    setSelectedDatesState(dates);
  };

  // Availability Checker Logic
  const checkAvailability = (productId: string, startDate?: string, endDate?: string, quantity: number = 1) => {
    const prod = products.find(p => p.id === productId);
    if (!prod) return { available: false, remainingStock: 0, message: 'Item not found' };

    const start = startDate || selectedDates.startDate;
    const end = endDate || selectedDates.endDate;

    // Calculate booked stock for this item in overlapping dates
    let overlappingBookedQty = 0;
    bookings.forEach(b => {
      if (b.status !== 'Cancelled' && b.status !== 'Picked Up' && b.status !== 'Deposit Refunded') {
        const bStart = new Date(b.startDate);
        const bEnd = new Date(b.endDate);
        const qStart = new Date(start);
        const qEnd = new Date(end);

        // Check if date ranges overlap
        if (qStart <= bEnd && qEnd >= bStart) {
          const item = b.items.find(i => i.productId === productId);
          if (item) {
            overlappingBookedQty += item.quantity;
          }
        }
      }
    });

    const currentInCart = cart.find(c => c.product.id === productId)?.quantity || 0;
    const remainingStock = Math.max(0, prod.totalStock - overlappingBookedQty);
    const available = remainingStock >= (quantity + (cart.some(c => c.product.id === productId) ? 0 : 0));

    let message = `Available for chosen dates (${remainingStock} units in stock)`;
    if (remainingStock === 0) {
      message = 'Booked out for selected dates. Try other dates or similar items.';
    } else if (remainingStock < quantity) {
      message = `Only ${remainingStock} unit(s) remaining for these dates.`;
    }

    return {
      available: remainingStock >= quantity,
      remainingStock,
      message,
    };
  };

  // Cart Management
  const addToCart = (product: Product, quantity: number = 1, startDate?: string, endDate?: string, withSetup: boolean = true) => {
    const start = startDate || selectedDates.startDate;
    const end = endDate || selectedDates.endDate;
    const days = calculateDays(start, end);

    const check = checkAvailability(product.id, start, end, quantity);
    if (!check.available && check.remainingStock === 0) {
      showToast(`⚠️ Sorry, ${product.name} is fully booked for those dates!`);
      return;
    }

    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        const newQty = existing.quantity + quantity;
        if (newQty > check.remainingStock) {
          showToast(`⚠️ Only ${check.remainingStock} available in inventory.`);
          return prev;
        }
        showToast(`Updated quantity of "${product.name}" in your cart.`);
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: newQty, startDate: start, endDate: end, rentalDays: days }
            : item
        );
      } else {
        showToast(`Added "${product.name}" to rental cart! 🛒`);
        return [...prev, {
          product,
          quantity: Math.min(quantity, Math.max(1, check.remainingStock)),
          startDate: start,
          endDate: end,
          rentalDays: days,
          withSetupCrew: withSetup,
        }];
      }
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
    showToast('Removed item from cart.');
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    const item = cart.find(c => c.product.id === productId);
    if (!item) return;

    const check = checkAvailability(productId, item.startDate, item.endDate, quantity);
    if (quantity > check.remainingStock) {
      showToast(`Cannot exceed ${check.remainingStock} units for selected dates.`);
      return;
    }

    setCart(prev =>
      prev.map(i => (i.product.id === productId ? { ...i, quantity } : i))
    );
  };

  const toggleCartItemSetup = (productId: string) => {
    setCart(prev =>
      prev.map(i =>
        i.product.id === productId ? { ...i, withSetupCrew: !i.withSetupCrew } : i
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  // Cart financial calculations
  const getCartTotals = () => {
    let subtotal = 0;
    let setupFee = 0;
    let securityDeposit = 0;
    let itemCount = 0;

    cart.forEach(item => {
      const itemRent = item.product.pricePerDay * item.rentalDays * item.quantity;
      subtotal += itemRent;
      if (item.withSetupCrew) {
        setupFee += item.product.setupFee * item.quantity;
      }
      securityDeposit += item.product.securityDeposit * item.quantity;
      itemCount += item.quantity;
    });

    // Base delivery logistics (free if subtotal > 30,000)
    const deliveryFee = subtotal === 0 ? 0 : subtotal > 30000 ? 0 : 2500;

    // Apply Coupon discount
    let discount = 0;
    if (appliedCoupon && subtotal >= appliedCoupon.minBookingAmount) {
      if (appliedCoupon.flatDiscount) {
        discount = appliedCoupon.flatDiscount;
      } else if (appliedCoupon.discountPercentage) {
        discount = Math.round((subtotal * appliedCoupon.discountPercentage) / 100);
        if (appliedCoupon.maxDiscount && discount > appliedCoupon.maxDiscount) {
          discount = appliedCoupon.maxDiscount;
        }
      }
    }

    const taxableAmount = Math.max(0, subtotal + deliveryFee + setupFee - discount);
    const tax = Math.round(taxableAmount * 0.18); // 18% GST for event equipment rental
    const grandTotal = taxableAmount + tax + securityDeposit;

    return {
      subtotal,
      deliveryFee,
      setupFee,
      securityDeposit,
      discount,
      tax,
      grandTotal,
      itemCount,
    };
  };

  // Wishlist
  const toggleWishlist = (productId: string) => {
    setWishlist(prev => {
      if (prev.includes(productId)) {
        showToast('Removed from wishlist');
        return prev.filter(id => id !== productId);
      } else {
        showToast('Added to your wishlist ❤️');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Coupons
  const applyCouponCode = (code: string) => {
    const found = coupons.find(c => c.code.toUpperCase() === code.trim().toUpperCase() && c.isActive);
    if (!found) {
      return { success: false, message: 'Invalid or expired coupon code.' };
    }
    const { subtotal } = getCartTotals();
    if (subtotal < found.minBookingAmount) {
      return { 
        success: false, 
        message: `Coupon requires a minimum rental booking of ₹${found.minBookingAmount.toLocaleString('en-IN')}` 
      };
    }
    setAppliedCoupon(found);
    return { success: true, message: `Coupon ${found.code} applied successfully!` };
  };

  const removeCouponCode = () => {
    setAppliedCoupon(null);
    showToast('Coupon removed.');
  };

  // Booking Creation
  const createBooking = (bookingData: Omit<Booking, 'id' | 'createdAt' | 'status' | 'trackingSteps'>): Booking => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newBooking: Booking = {
      ...bookingData,
      id: `UTSAV-2026-${randomSuffix}`,
      createdAt: new Date().toISOString().split('T')[0],
      status: 'Confirmed',
      assignedCrewLeader: 'Rajesh Sharma (Senior Decor Lead)',
      crewContact: '+91 98210 99881',
      trackingSteps: [
        { step: 'Booking Placed & Confirmed', date: new Date().toLocaleString(), completed: true, notes: 'Reserved from main inventory' },
        { step: 'Payment & Deposit Verified', date: new Date().toLocaleString(), completed: true, notes: 'Payment acknowledged via instant gateway' },
        { step: 'Master Crew & Van Assigned', date: 'Expected 24h before event', completed: false, notes: 'Lead Master Rajesh Sharma' },
        { step: 'Dispatch & Venue Setup', date: `${bookingData.startDate} 08:00 AM`, completed: false },
        { step: 'Grand Celebration Active', date: bookingData.startDate, completed: false },
        { step: 'Post-Event Dismantle & Pickup', date: `${bookingData.endDate} 11:00 PM`, completed: false },
        { step: 'Security Deposit Refund', date: 'Within 24h of pickup', completed: false },
      ],
    };

    setBookings(prev => [newBooking, ...prev]);
    clearCart();
    return newBooking;
  };

  const updateBookingStatus = (bookingId: string, status: BookingStatusType, notes?: string) => {
    setBookings(prev =>
      prev.map(b => {
        if (b.id === bookingId) {
          const updatedSteps = b.trackingSteps.map(step => {
            if (
              (status === 'Crew Assigned' && step.step.includes('Crew')) ||
              (status === 'In Transit' && step.step.includes('Dispatch')) ||
              (status === 'Setup Completed' && step.step.includes('Setup')) ||
              (status === 'Picked Up' && step.step.includes('Dismantle')) ||
              (status === 'Deposit Refunded' && step.step.includes('Refund'))
            ) {
              return { ...step, completed: true, notes: notes || step.notes };
            }
            return step;
          });
          return { ...b, status, trackingSteps: updatedSteps };
        }
        return b;
      })
    );
    showToast(`Updated booking ${bookingId} to: ${status}`);
  };

  // Admin CRUD for Products
  const addProduct = (prodData: Omit<Product, 'id'>) => {
    const newProd: Product = {
      ...prodData,
      id: `prod-${Date.now()}`,
    };
    setProducts(prev => [newProd, ...prev]);
    showToast(`Successfully added product: "${newProd.name}"`);
  };

  const updateProduct = (id: string, updated: Partial<Product>) => {
    setProducts(prev => prev.map(p => (p.id === id ? { ...p, ...updated } : p)));
    showToast('Product updated successfully.');
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    showToast('Product removed from catalog.');
  };

  // Admin CRUD for Coupons
  const addCoupon = (couponData: Omit<Coupon, 'id'>) => {
    const newCoupon: Coupon = {
      ...couponData,
      id: `cp-${Date.now()}`,
    };
    setCoupons(prev => [newCoupon, ...prev]);
    showToast(`Coupon "${newCoupon.code}" created!`);
  };

  const deleteCoupon = (id: string) => {
    setCoupons(prev => prev.filter(c => c.id !== id));
    showToast('Coupon deleted.');
  };

  const toggleCouponActive = (id: string) => {
    setCoupons(prev => prev.map(c => c.id === id ? { ...c, isActive: !c.isActive } : c));
  };

  // Auth Simulation
  const login = (email: string, role: 'customer' | 'admin' = 'customer') => {
    const isCustomer = role === 'customer';
    setUser({
      id: isCustomer ? 'usr-rohit' : 'usr-admin-vikram',
      name: isCustomer ? 'Rohit Khandelwal' : 'Vikram Singh Rathore (Admin)',
      email: email || (isCustomer ? 'rohit.khandelwal@gmail.com' : 'admin@utsavdecor.in'),
      phone: '+91 98290 41122',
      role,
      avatar: isCustomer
        ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
        : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      savedAddresses: [
        {
          id: 'addr-1',
          label: 'The Leela Palace Ballroom',
          venueName: 'The Leela Palace Bengaluru',
          address: 'Old Airport Road, Kodihalli',
          city: 'Bengaluru',
          pincode: '560008',
          isDefault: true,
        },
      ],
    });
    showToast(`Welcome back, ${isCustomer ? 'Rohit' : 'Admin Vikram'}!`);
  };

  const logout = () => {
    setUser(null);
    showToast('You have been logged out.');
  };

  const switchRole = () => {
    if (!user) return;
    const nextRole = user.role === 'customer' ? 'admin' : 'customer';
    login(user.email, nextRole);
  };

  return (
    <BookingContext.Provider
      value={{
        products,
        packages,
        cart,
        wishlist,
        bookings,
        coupons,
        appliedCoupon,
        selectedDates,
        rentalDays,
        user,
        activePage,
        selectedProductId,
        selectedBookingId,
        activeCategoryFilter,
        searchQuery,
        toastMessage,
        navigateTo,
        setActiveCategoryFilter,
        setSearchQuery,
        showToast,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        toggleCartItemSetup,
        clearCart,
        getCartTotals,
        toggleWishlist,
        isInWishlist,
        setSelectedDates,
        checkAvailability,
        applyCouponCode,
        removeCouponCode,
        createBooking,
        updateBookingStatus,
        addProduct,
        updateProduct,
        deleteProduct,
        addCoupon,
        deleteCoupon,
        toggleCouponActive,
        login,
        logout,
        switchRole,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = (): BookingContextType => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};
