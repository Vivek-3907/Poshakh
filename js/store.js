/**
 * POSHAKH - Core Data Store & Session Management
 * Handles localStorage persistence, seed data, auth state, and dynamic store actions
 */

const STORAGE_KEYS = {
  CURRENT_USER: 'poshakh_current_user',
  USERS: 'poshakh_users',
  DRESSES: 'poshakh_dresses',
  ORDERS: 'poshakh_orders',
  NOTIFICATIONS: 'poshakh_notifications',
  CHATS: 'poshakh_chats',
  LENDERS: 'poshakh_lenders',
  COMPLAINTS: 'poshakh_complaints',
  CART: 'poshakh_cart'
};

// Seed Diverse Luxury Boutiques
const SEED_LENDERS = [
  {
    id: 'radha',
    email: 'Radh123@gmail.com',
    name: 'Radha Sharma',
    boutiqueName: 'Radha Ethnic House',
    handle: '@radha_poshakh',
    bio: 'Curator of handcrafted Royal Gujarati Patola, Raw Silk Bridal Lehengas & Heritage Sherwanis. Crafting wedding memories since 2018.',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    coverImage: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=80',
    rating: 4.9,
    reviewsCount: 148,
    followers: '1.4k',
    location: 'Manek Chowk, Ahmedabad, Gujarat',
    phone: '+91 98250 12345',
    totalRentals: 342,
    status: 'Verified Boutique'
  },
  {
    id: 'rajputana',
    email: 'rajputana.heritage@gmail.com',
    name: 'Vikram Singh Rathore',
    boutiqueName: 'Royal Rajputana Attire',
    handle: '@royal_rajputana',
    bio: 'Authentic royal poshaaks, regal velvet achkans and brocade sherwanis for grooms.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    coverImage: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=80',
    rating: 4.8,
    reviewsCount: 96,
    followers: '890',
    location: 'Sayajigunj, Vadodara, Gujarat',
    phone: '+91 98240 67890',
    totalRentals: 198,
    status: 'Verified Boutique'
  },
  {
    id: 'surat_silks',
    email: 'surat.heritage.silks@gmail.com',
    name: 'Hiralal Choksi',
    boutiqueName: 'Surat Heritage Silks',
    handle: '@surat_silks',
    bio: 'Pure zari weave Kanjivaram and Banarasi masterpieces directly from master weavers.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    coverImage: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1200&q=80',
    rating: 4.7,
    reviewsCount: 82,
    followers: '720',
    location: 'Ring Road, Surat, Gujarat',
    phone: '+91 98980 43210',
    totalRentals: 145,
    status: 'Verified Boutique'
  },
  {
    id: 'kutch_crafts',
    email: 'kutch.heritage@gmail.com',
    name: 'Deviben Rabari',
    boutiqueName: 'Kutch Heritage Crafts',
    handle: '@kutch_crafts',
    bio: 'Authentic 12-gher Chaniya Cholis adorned with original Abhla mirrorwork, cowrie shells, and Kutchi hand-embroidery.',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    coverImage: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=80',
    rating: 4.9,
    reviewsCount: 112,
    followers: '1.1k',
    location: 'Bhuj, Kutch, Gujarat',
    phone: '+91 97230 55441',
    totalRentals: 210,
    status: 'Verified Boutique'
  }
];

// Seed Outfits Distributed Across Different Boutiques
const SEED_DRESSES = [
  {
    id: 'd1',
    name: 'Rajputi Crimson Bridal Velvet Lehenga',
    category: 'Lehenga',
    subCategory: 'Bridal Wear',
    occasion: 'Wedding',
    rentPrice: 3800,
    deposit: 6000,
    retailValue: 65000,
    sizes: ['S', 'M', 'L'],
    colors: ['Maroon Crimson', 'Antique Gold'],
    fabric: 'Micro Velvet with Hand Zardozi & Dabka Work',
    description: 'Exquisite royal crimson bridal lehenga designed with heavy metallic gold zardozi, resham floral jaal and double organza dupatta with scalloped borders.',
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&w=900&q=80'
    ],
    lenderId: 'radha',
    lenderName: 'Radha Ethnic House',
    lenderEmail: 'Radh123@gmail.com',
    rating: 4.9,
    reviewsCount: 42,
    timesRented: 38,
    isBridal: true,
    isFeatured: true,
    isTrending: true,
    createdAt: '2026-09-01'
  },
  {
    id: 'd2',
    name: 'Patan Patola Double Ikkat Heritage Saree',
    category: 'Saree',
    subCategory: 'Heritage Gujarati',
    occasion: 'Festive',
    rentPrice: 2400,
    deposit: 4000,
    retailValue: 45000,
    sizes: ['Free Size'],
    colors: ['Ruby Red', 'Mustard Yellow', 'Forest Green'],
    fabric: 'Pure Mulberry Silk with Natural Dyes',
    description: 'Authentic 8-ply pure silk Patan Patola handwoven with traditional elephant and parrot motifs. A priceless Gujarati heirloom piece for weddings and special rituals.',
    images: [
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=900&q=80'
    ],
    lenderId: 'radha',
    lenderName: 'Radha Ethnic House',
    lenderEmail: 'Radh123@gmail.com',
    rating: 5.0,
    reviewsCount: 31,
    timesRented: 29,
    isBridal: false,
    isFeatured: true,
    isTrending: true,
    createdAt: '2026-09-10'
  },
  {
    id: 'd3',
    name: 'Royal Emerald Green Raw Silk Sherwani',
    category: 'Sherwani',
    subCategory: 'Groom Wear',
    occasion: 'Wedding',
    rentPrice: 3200,
    deposit: 5000,
    retailValue: 48000,
    sizes: ['M', 'L', 'XL'],
    colors: ['Emerald Green', 'Heritage Gold'],
    fabric: 'Banarasi Raw Silk with Thread & Cutdana Embroidery',
    description: 'Regal groom sherwani tailored in rich bottle-green raw silk, accented with subtle antique gold threadwork, paired with churidar and a matching brocade stole.',
    images: [
      'https://images.unsplash.com/photo-1597983073493-88cd35cf93b0?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=900&q=80'
    ],
    lenderId: 'rajputana',
    lenderName: 'Royal Rajputana Attire',
    lenderEmail: 'rajputana.heritage@gmail.com',
    rating: 4.8,
    reviewsCount: 26,
    timesRented: 34,
    isBridal: true,
    isFeatured: true,
    isTrending: false,
    createdAt: '2026-09-15'
  },
  {
    id: 'd4',
    name: 'Navratri Peacock Blue Mirror Work Chaniya Choli',
    category: 'Chaniya Choli',
    subCategory: 'Garba Festive',
    occasion: 'Garba / Navratri',
    rentPrice: 1800,
    deposit: 3000,
    retailValue: 24000,
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Peacock Blue', 'Rani Pink'],
    fabric: 'Cotton Gamthi with Real Abhla (Mirror) & Kutch Embroidery',
    description: 'Flared 12-meter gher Chaniya Choli featuring traditional Kutch hand-embroidery, real mirrors, cowrie tassels, and pure bandhej dupatta for energetic Garba nights.',
    images: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80'
    ],
    lenderId: 'kutch_crafts',
    lenderName: 'Kutch Heritage Crafts',
    lenderEmail: 'kutch.heritage@gmail.com',
    rating: 4.9,
    reviewsCount: 54,
    timesRented: 62,
    isBridal: false,
    isFeatured: true,
    isTrending: true,
    createdAt: '2026-09-20'
  },
  {
    id: 'd5',
    name: 'Noorani Blush Pink Organza Sangeet Lehenga',
    category: 'Lehenga',
    subCategory: 'Sangeet & Reception',
    occasion: 'Sangeet',
    rentPrice: 2900,
    deposit: 4500,
    retailValue: 52000,
    sizes: ['S', 'M', 'XL'],
    colors: ['Blush Pink', 'Champagne Gold'],
    fabric: 'Pure French Organza with Sequin Sheen & Moti Jaal',
    description: 'Dreamy blush pastel lehenga with lightweight volume, delicate tonal sequins that shimmer under chandeliers, and a sheer bustier blouse.',
    images: [
      'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=80'
    ],
    lenderId: 'rajputana',
    lenderName: 'Royal Rajputana Attire',
    lenderEmail: 'rajputana.heritage@gmail.com',
    rating: 4.8,
    reviewsCount: 22,
    timesRented: 27,
    isBridal: true,
    isFeatured: false,
    isTrending: true,
    createdAt: '2026-10-01'
  },
  {
    id: 'd6',
    name: 'Banarasi Katan Pure Gold Zari Brocade Saree',
    category: 'Saree',
    subCategory: 'Bridal Traditional',
    occasion: 'Wedding',
    rentPrice: 2200,
    deposit: 3500,
    retailValue: 38000,
    sizes: ['Free Size'],
    colors: ['Vermillion Red', 'Antique Gold'],
    fabric: 'Katan Silk with Kadwa Weave Gold Brocade',
    description: 'Handwoven in Varanasi with antique gold kadwa boota and a grand pallu. A timeless masterpiece worn by royal Indian brides for generations.',
    images: [
      'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=900&q=80'
    ],
    lenderId: 'surat_silks',
    lenderName: 'Surat Heritage Silks',
    lenderEmail: 'surat.heritage.silks@gmail.com',
    rating: 5.0,
    reviewsCount: 19,
    timesRented: 24,
    isBridal: true,
    isFeatured: true,
    isTrending: false,
    createdAt: '2026-10-05'
  },
  {
    id: 'd7',
    name: 'Maharaja Ivory & Gold Jodhpuri Achkan Set',
    category: 'Sherwani',
    subCategory: 'Groom & Royal Guests',
    occasion: 'Reception',
    rentPrice: 3400,
    deposit: 5000,
    retailValue: 56000,
    sizes: ['M', 'L', 'XXL'],
    colors: ['Royal Ivory', 'Muted Gold'],
    fabric: 'Italian Jacquard Silk with Handcrafted Meenakari Buttons',
    description: 'Bespoke Jodhpuri bandhgala achkan crafted in Italian jacquard silk, complemented with hand-painted gold enamelled buttons and tapered trousers.',
    images: [
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1597983073493-88cd35cf93b0?auto=format&fit=crop&w=900&q=80'
    ],
    lenderId: 'rajputana',
    lenderName: 'Royal Rajputana Attire',
    lenderEmail: 'rajputana.heritage@gmail.com',
    rating: 4.9,
    reviewsCount: 18,
    timesRented: 21,
    isBridal: true,
    isFeatured: false,
    isTrending: true,
    createdAt: '2026-10-08'
  },
  {
    id: 'd8',
    name: 'Regal Midnight Blue Embroidered Indo-Western Gown',
    category: 'Indo-Western',
    subCategory: 'Cocktail & Reception',
    occasion: 'Reception',
    rentPrice: 2600,
    deposit: 4000,
    retailValue: 42000,
    sizes: ['S', 'M', 'L'],
    colors: ['Midnight Navy Blue', 'Silver Zari'],
    fabric: 'Georgette Silk with 3D Floral Cut-Work',
    description: 'Floor-length contemporary silhouette combining royal Mughal floral embroidery with a modern draped dupatta cape. Ideal for receptions and cocktail evenings.',
    images: [
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80'
    ],
    lenderId: 'surat_silks',
    lenderName: 'Surat Heritage Silks',
    lenderEmail: 'surat.heritage.silks@gmail.com',
    rating: 4.7,
    reviewsCount: 14,
    timesRented: 19,
    isBridal: false,
    isFeatured: true,
    isTrending: false,
    createdAt: '2026-10-12'
  }
];

// Seed Initial Registered Users
const SEED_USERS = [
  {
    name: 'Radha Sharma',
    email: 'radh123@gmail.com',
    password: 'Radha1234',
    role: 'lender',
    boutiqueName: 'Radha Ethnic House',
    lenderId: 'radha',
    phone: '+91 98250 12345',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80'
  },
  {
    name: 'Manoj Patel',
    email: 'manoj34@gmail.com',
    password: 'Manoj@#345',
    role: 'renter',
    phone: '+91 98791 22334',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'
  }
];

// Seed Orders
const SEED_ORDERS = [
  {
    id: 'ORD-POSH-8821',
    dressId: 'd1',
    dressName: 'Rajputi Crimson Bridal Velvet Lehenga',
    dressImage: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=400&q=80',
    renterEmail: 'Manoj34@gmail.com',
    renterName: 'Manoj Patel',
    renterPhone: '+91 98791 22334',
    lenderId: 'radha',
    lenderName: 'Radha Ethnic House',
    startDate: '2026-10-15',
    endDate: '2026-10-20',
    durationDays: 5,
    dailyRent: 3800,
    totalRent: 19000,
    deposit: 6000,
    totalPaid: 25000,
    status: 'Active (With Renter)',
    deliveryAddress: {
      fullName: 'Manoj Patel',
      phone: '+91 98791 22334',
      street: '402, Shivalik High Street, Near SG Highway',
      landmark: 'Opposite Iscon Mall',
      city: 'Ahmedabad',
      state: 'Gujarat',
      pincode: '380054'
    },
    paymentMethod: 'UPI (Google Pay)',
    createdAt: '2026-10-14'
  }
];

// Seed Notifications
const SEED_NOTIFICATIONS = [
  {
    id: 'notif-1',
    targetEmail: 'manoj34@gmail.com',
    role: 'renter',
    title: 'Rental Confirmed & Dispatched',
    message: 'Your Rajputi Crimson Bridal Velvet Lehenga has been packed in a luxury garment case and dispatched via premium courier.',
    timestamp: '2 hours ago',
    type: 'order_status',
    read: false
  },
  {
    id: 'notif-2',
    targetEmail: 'manoj34@gmail.com',
    role: 'renter',
    title: 'Special Note from Lender Radha',
    message: '"Namaste Manoj ji, we included complementary handcrafted latkans and a velvet jewelry pouch with your order. Wishing you a wonderful family celebration!"',
    timestamp: '5 hours ago',
    type: 'message',
    read: false
  },
  {
    id: 'notif-3',
    targetEmail: 'manoj34@gmail.com',
    role: 'renter',
    title: 'Return Schedule & Live Timer',
    message: 'Rental active until 20th Oct, 6:00 PM. Pickup executive will arrive at your doorstep with safe tamper packaging.',
    timestamp: '1 day ago',
    type: 'timer',
    read: true
  },
  {
    id: 'notif-4',
    targetEmail: 'radh123@gmail.com',
    role: 'lender',
    title: 'New Booking Received!',
    message: 'Manoj Patel booked "Rajputi Crimson Bridal Velvet Lehenga" for 5 days. Total rent: ₹19,000.',
    timestamp: '1 day ago',
    type: 'order',
    read: false
  },
  {
    id: 'notif-7',
    targetEmail: 'admin202@admin.com',
    role: 'admin',
    title: 'Platform Milestone',
    message: 'Gross rental volume across Gujarat exceeded ₹5,00,000 this festive week.',
    timestamp: '30 mins ago',
    type: 'admin',
    read: false
  }
];

// Seed Complaints
const SEED_COMPLAINTS = [
  {
    id: 'CMP-101',
    fromUser: 'Pooja Dave (Renter)',
    againstLender: 'Surat Heritage Silks',
    subject: 'Minor delay in dry-cleaning tag verification',
    details: 'Order delivered 3 hours late due to heavy festive rain in Surat. Requested delivery fee refund.',
    status: 'Resolved',
    date: '2026-10-12',
    actionTaken: 'Delivery fee of ₹250 refunded to renter.'
  }
];

// Seed Chats (Initially Empty for clean user privacy)
const SEED_CHATS = [];

/**
 * Poshakh Store Controller
 */
const PoshakhStore = {
  init() {
    if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(SEED_USERS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.LENDERS)) {
      localStorage.setItem(STORAGE_KEYS.LENDERS, JSON.stringify(SEED_LENDERS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.DRESSES)) {
      localStorage.setItem(STORAGE_KEYS.DRESSES, JSON.stringify(SEED_DRESSES));
    }
    if (!localStorage.getItem(STORAGE_KEYS.ORDERS)) {
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(SEED_ORDERS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS)) {
      localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(SEED_NOTIFICATIONS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.CHATS)) {
      localStorage.setItem(STORAGE_KEYS.CHATS, JSON.stringify(SEED_CHATS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.COMPLAINTS)) {
      localStorage.setItem(STORAGE_KEYS.COMPLAINTS, JSON.stringify(SEED_COMPLAINTS));
    }
    // Clean any legacy global user session to enforce tab isolation
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  },

  // Auth & Session (Per-Tab Isolated Session via sessionStorage)
  getCurrentUser() {
    // Read from tab-isolated sessionStorage so different tabs can run different user roles concurrently
    const raw = sessionStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch (e) {
      return null;
    }
  },

  setCurrentUser(user) {
    if (!user) {
      sessionStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
      localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    } else {
      sessionStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
      // Clean legacy shared storage to prevent leaking login to other tabs
      localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);

      // Synchronize with registered users directory
      if (user.email) {
        let users = this.getUsers();
        const idx = users.findIndex(u => u.email.toLowerCase() === user.email.toLowerCase());
        if (idx >= 0) {
          users[idx] = { ...users[idx], ...user };
        } else {
          users.push(user);
        }
        localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));

        // If user is a lender, also synchronize their boutique profile
        if (user.role === 'lender' || user.lenderId) {
          let lenders = this.getLenders();
          const lIdx = lenders.findIndex(l => 
            (user.lenderId && l.id === user.lenderId) || 
            (l.email && l.email.toLowerCase() === user.email.toLowerCase())
          );
          if (lIdx >= 0) {
            lenders[lIdx] = {
              ...lenders[lIdx],
              name: user.name || lenders[lIdx].name,
              avatar: user.avatar || lenders[lIdx].avatar,
              boutiqueName: user.boutiqueName || lenders[lIdx].boutiqueName
            };
            localStorage.setItem(STORAGE_KEYS.LENDERS, JSON.stringify(lenders));
          }
        }
      }
    }
  },

  logout() {
    sessionStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    window.location.href = 'login.html';
  },

  // Users Directory
  getUsers() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
  },

  saveUser(user) {
    const users = this.getUsers();
    const idx = users.findIndex(u => u.email.toLowerCase() === user.email.toLowerCase());
    if (idx >= 0) {
      users[idx] = { ...users[idx], ...user };
    } else {
      users.push(user);
    }
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  },

  // Dresses
  getDresses() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.DRESSES) || '[]');
  },

  getDressById(id) {
    const dresses = this.getDresses();
    return dresses.find(d => d.id === id);
  },

  saveDress(dress) {
    const dresses = this.getDresses();
    const existingIndex = dresses.findIndex(d => d.id === dress.id);
    if (existingIndex >= 0) {
      dresses[existingIndex] = dress;
    } else {
      dress.id = 'd_' + Date.now();
      dress.createdAt = new Date().toISOString().split('T')[0];
      dress.timesRented = 0;
      dress.rating = 5.0;
      dress.reviewsCount = 0;
      dresses.unshift(dress);
    }
    localStorage.setItem(STORAGE_KEYS.DRESSES, JSON.stringify(dresses));
    return dress;
  },

  deleteDress(id) {
    let dresses = this.getDresses();
    dresses = dresses.filter(d => d.id !== id);
    localStorage.setItem(STORAGE_KEYS.DRESSES, JSON.stringify(dresses));
  },

  // Lenders
  getLenders() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.LENDERS) || '[]');
  },

  getLenderById(id) {
    const lenders = this.getLenders();
    if (!id) return lenders[0];
    return lenders.find(l => l.id.toLowerCase() === id.toLowerCase() || l.email.toLowerCase() === id.toLowerCase()) || lenders[0];
  },

  removeLender(lenderId) {
    let lenders = this.getLenders();
    lenders = lenders.filter(l => l.id !== lenderId);
    localStorage.setItem(STORAGE_KEYS.LENDERS, JSON.stringify(lenders));
  },

  // Orders
  getOrders() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.ORDERS) || '[]');
  },

  getUserOrders(email) {
    const orders = this.getOrders();
    return orders.filter(o => o.renterEmail.toLowerCase() === (email || '').toLowerCase());
  },

  getLenderOrders(lenderId, lenderEmail) {
    const orders = this.getOrders();
    return orders.filter(o => o.lenderId === lenderId || (lenderEmail && o.lenderEmail === lenderEmail));
  },

  createOrder(orderData) {
    const orders = this.getOrders();
    const newOrder = {
      id: 'ORD-POSH-' + Math.floor(1000 + Math.random() * 9000),
      createdAt: new Date().toISOString().split('T')[0],
      status: 'Active (With Renter)',
      ...orderData
    };
    orders.unshift(newOrder);
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));

    // Send notification specifically to this renter
    this.addNotification({
      targetEmail: newOrder.renterEmail,
      role: 'renter',
      title: 'Rental Booking Confirmed!',
      message: `Your booking for ${newOrder.dressName} from ${newOrder.startDate} to ${newOrder.endDate} has been confirmed. Total ₹${newOrder.totalPaid}.`,
      type: 'order'
    });

    // Send notification specifically to this lender
    this.addNotification({
      targetEmail: newOrder.lenderEmail || 'Radh123@gmail.com',
      role: 'lender',
      title: 'New Dress Rental Booking!',
      message: `${newOrder.renterName} rented "${newOrder.dressName}" for ${newOrder.durationDays} days. Earned: ₹${newOrder.totalRent}.`,
      type: 'order'
    });

    return newOrder;
  },

  // Notifications - Strictly user-filtered
  getNotifications(userEmail, role) {
    const all = JSON.parse(localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS) || '[]');
    if (!userEmail) return [];
    
    // Super admin can see admin alerts
    if (role === 'admin') {
      return all.filter(n => n.role === 'admin' || n.targetEmail.toLowerCase() === userEmail.toLowerCase());
    }

    // Normal users ONLY see notifications targeted to their own email
    return all.filter(n => n.targetEmail && n.targetEmail.toLowerCase() === userEmail.toLowerCase());
  },

  addNotification(notif) {
    const all = JSON.parse(localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS) || '[]');
    const newNotif = {
      id: 'notif_' + Date.now(),
      timestamp: 'Just now',
      read: false,
      ...notif
    };
    all.unshift(newNotif);
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(all));
  },

  // Chats
  getChats() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.CHATS) || '[]');
  },

  getUserChats(email) {
    if (!email) return [];
    const clean = email.toLowerCase();
    const chats = this.getChats();
    return chats.filter(c => c.participants && c.participants.map(p => p.toLowerCase()).includes(clean));
  },

  getOrCreateChat(userEmail, targetEmail, targetName, targetAvatar, outfitName) {
    const chats = this.getChats();
    const cleanUser = (userEmail || '').toLowerCase();
    const cleanTarget = (targetEmail || '').toLowerCase();
    
    let chat = chats.find(c => 
      c.participants &&
      c.participants.map(p => p.toLowerCase()).includes(cleanUser) &&
      c.participants.map(p => p.toLowerCase()).includes(cleanTarget)
    );

    if (!chat) {
      chat = {
        id: 'chat_' + Date.now(),
        participants: [cleanUser, cleanTarget],
        targetName: targetName || 'Royal Boutique',
        targetAvatar: targetAvatar || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
        outfitName: outfitName || 'Festive Couture Collection',
        lastUpdated: 'Just now',
        messages: []
      };
      chats.unshift(chat);
      localStorage.setItem(STORAGE_KEYS.CHATS, JSON.stringify(chats));
    }
    return chat;
  },

  sendMessage(chatId, messageObj) {
    const chats = this.getChats();
    const chat = chats.find(c => c.id === chatId);
    if (chat) {
      chat.messages.push(messageObj);
      chat.lastUpdated = messageObj.time || 'Just now';
      localStorage.setItem(STORAGE_KEYS.CHATS, JSON.stringify(chats));
    }
  },

  // Complaints
  getComplaints() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.COMPLAINTS) || '[]');
  },

  resolveComplaint(id, actionText) {
    const complaints = this.getComplaints();
    const c = complaints.find(item => item.id === id);
    if (c) {
      c.status = 'Resolved';
      c.actionTaken = actionText || 'Issue examined and closed by Admin.';
      localStorage.setItem(STORAGE_KEYS.COMPLAINTS, JSON.stringify(complaints));
    }
  }
};

// Initialize store immediately
PoshakhStore.init();
window.PoshakhStore = PoshakhStore;
