/**
 * POSHAKH - Authentication & Security Controller
 * Manages user registration, credential checks, session isolation, and route protection
 */

const PoshakhAuth = {
  // Predefined Admin Check
  ADMIN_EMAIL: 'admin202@admin.com',
  ADMIN_PASS: 'Admin@202',

  /**
   * Attempt login with role awareness and admin credential detection
   */
  login(email, password, roleHint = 'renter') {
    const cleanEmail = (email || '').trim().toLowerCase();
    const cleanPass = (password || '').trim();

    // 1. Check for Super Admin Credentials (Admin202@admin.com OR Admin@202)
    if (cleanEmail === this.ADMIN_EMAIL || cleanPass === this.ADMIN_PASS) {
      const adminUser = {
        name: 'Super Admin',
        email: 'Admin202@admin.com',
        role: 'admin',
        token: 'auth_posh_admin_' + Date.now(),
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80'
      };
      PoshakhStore.setCurrentUser(adminUser);
      return { success: true, user: adminUser, redirect: 'admin.html' };
    }

    // 2. Check registered users in storage
    const users = PoshakhStore.getUsers();
    const userMatch = users.find(u => u.email.toLowerCase() === cleanEmail);

    if (userMatch) {
      if (userMatch.password === cleanPass) {
        // Safe user session without exposing raw password in active state
        const sessionUser = {
          name: userMatch.name,
          email: userMatch.email,
          role: userMatch.role,
          phone: userMatch.phone || '',
          boutiqueName: userMatch.boutiqueName || '',
          lenderId: userMatch.lenderId || (userMatch.role === 'lender' ? 'lender_' + Date.now() : null),
          avatar: userMatch.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
          token: 'auth_posh_token_' + Date.now()
        };
        PoshakhStore.setCurrentUser(sessionUser);
        const redirect = sessionUser.role === 'lender' ? 'lender-dashboard.html' : 'shop.html';
        return { success: true, user: sessionUser, redirect };
      } else {
        return { success: false, error: 'Incorrect password entered.' };
      }
    }

    return { success: false, error: 'Account not found. Please create an account or verify your credentials.' };
  },

  /**
   * Register a brand new user (Renter or Lender) with clean isolated state
   */
  register(userData) {
    const { name, email, password, role, boutiqueName, phone } = userData;
    const cleanEmail = (email || '').trim().toLowerCase();
    const cleanPass = (password || '').trim();

    if (!cleanEmail || !cleanPass || !name) {
      return { success: false, error: 'Please fill all required fields.' };
    }

    const users = PoshakhStore.getUsers();
    const existing = users.find(u => u.email.toLowerCase() === cleanEmail);
    if (existing) {
      return { success: false, error: 'An account with this email already exists. Please Sign In.' };
    }

    // If registering as a Lender, create their own brand new boutique record
    let newLenderId = null;
    if (role === 'lender') {
      newLenderId = 'lender_' + Date.now();
      const newBoutique = {
        id: newLenderId,
        email: cleanEmail,
        name: name,
        boutiqueName: boutiqueName || `${name}'s Couture Studio`,
        handle: '@' + (boutiqueName ? boutiqueName.toLowerCase().replace(/[^a-z0-9]/g, '_') : name.toLowerCase().replace(/\s+/g, '_')),
        bio: 'Exclusive ethnic collection for weddings, festivities and gala celebrations.',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
        coverImage: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=80',
        rating: 5.0,
        reviewsCount: 0,
        followers: '0',
        location: 'Gujarat, India',
        phone: phone || '+91 98000 00000',
        totalRentals: 0,
        status: 'Verified Boutique'
      };
      
      const lenders = PoshakhStore.getLenders();
      lenders.push(newBoutique);
      localStorage.setItem(STORAGE_KEYS.LENDERS, JSON.stringify(lenders));
    }

    // Create user record
    const newUserRecord = {
      name,
      email: cleanEmail,
      password: cleanPass,
      role: role || 'renter',
      phone: phone || '',
      boutiqueName: boutiqueName || '',
      lenderId: newLenderId,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      createdAt: new Date().toISOString()
    };

    PoshakhStore.saveUser(newUserRecord);

    // Set logged-in session user
    const sessionUser = {
      name: newUserRecord.name,
      email: newUserRecord.email,
      role: newUserRecord.role,
      phone: newUserRecord.phone,
      boutiqueName: newUserRecord.boutiqueName,
      lenderId: newUserRecord.lenderId,
      avatar: newUserRecord.avatar,
      token: 'auth_posh_token_' + Date.now()
    };

    PoshakhStore.setCurrentUser(sessionUser);

    // Initial welcome notification specifically for this user
    PoshakhStore.addNotification({
      targetEmail: sessionUser.email,
      role: sessionUser.role,
      title: sessionUser.role === 'lender' ? 'Welcome to Poshakh Boutique Studio!' : 'Welcome to Poshakh Royal Couture!',
      message: sessionUser.role === 'lender' 
        ? `Congratulations ${sessionUser.name}! Your boutique "${sessionUser.boutiqueName}" is now active. Add your dresses to start earning.` 
        : `Welcome ${sessionUser.name}! Discover and rent authentic royal ethnic outfits for your celebrations.`,
      type: 'order'
    });

    const redirect = sessionUser.role === 'lender' ? 'lender-dashboard.html' : 'shop.html';
    return { success: true, user: sessionUser, redirect };
  },

  /**
   * Route Guard: Protects private pages
   */
  requireAuth(allowedRoles = []) {
    const user = PoshakhStore.getCurrentUser();
    if (!user) {
      sessionStorage.setItem('poshakh_return_url', window.location.pathname);
      window.location.href = 'login.html';
      return null;
    }

    if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
      window.location.href = user.role === 'admin' ? 'admin.html' : (user.role === 'lender' ? 'lender-dashboard.html' : 'index.html');
      return null;
    }

    return user;
  }
};

window.PoshakhAuth = PoshakhAuth;
