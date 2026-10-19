/**
 * POSHAKH - Universal Navigation, Global UI Components & State Sync
 */

const PoshakhUI = {
  init() {
    this.renderNavbar();
    this.renderFloatingChatButton();
    this.setupScrollEffects();
    this.setupMobileMenu();
    this.updateNotificationBadge();
    this.setupGlobalModals();
  },

  /**
   * Render dynamic responsive luxury navbar with clean Home and Shop menu
   */
  renderNavbar() {
    const navPlaceholder = document.getElementById('poshakh-nav-header');
    if (!navPlaceholder) return;

    const user = PoshakhStore.getCurrentUser();
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';

    let userActionHtml = '';

    if (user) {
      const isLender = user.role === 'lender';
      const isAdmin = user.role === 'admin';

      userActionHtml = `
        <div class="user-profile-pill" onclick="PoshakhUI.toggleUserDropdown(event)">
          <img src="${user.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'}" alt="${user.name}" class="user-avatar-sm">
          <div style="display: flex; flex-direction: column; text-align: left;">
            <span style="font-size: 0.8rem; font-weight: 600; line-height: 1;">${user.name}</span>
            <span class="user-role-tag">${user.role}</span>
          </div>
          <span style="font-size: 0.7rem; color: var(--gold-antique); margin-left: 2px;">▼</span>
        </div>
        
        <!-- User Dropdown Menu -->
        <div id="nav-user-dropdown" style="display: none; position: absolute; top: 60px; right: 2rem; background: #fff; border: 1px solid var(--border-gold); border-radius: var(--radius-sm); box-shadow: var(--shadow-md); min-width: 210px; z-index: 10001; overflow: hidden;">
          ${isLender ? `
            <a href="lender-dashboard.html" style="display: block; padding: 0.75rem 1.2rem; font-size: 0.85rem; border-bottom: 1px solid #f0e8d8;">👑 Lender Dashboard</a>
            <a href="manage-dresses.html" style="display: block; padding: 0.75rem 1.2rem; font-size: 0.85rem; border-bottom: 1px solid #f0e8d8;">👗 Manage Outfits</a>
            <a href="lender-profile.html?lender=${user.lenderId || 'radha'}" style="display: block; padding: 0.75rem 1.2rem; font-size: 0.85rem; border-bottom: 1px solid #f0e8d8;">📸 Boutique Profile</a>
          ` : ''}
          ${isAdmin ? `
            <a href="admin.html" style="display: block; padding: 0.75rem 1.2rem; font-size: 0.85rem; border-bottom: 1px solid #f0e8d8;">🛡️ Admin Portal</a>
          ` : `
            <a href="rentals.html" style="display: block; padding: 0.75rem 1.2rem; font-size: 0.85rem; border-bottom: 1px solid #f0e8d8;">📦 My Rentals & History</a>
          `}
          <a href="notifications.html" style="display: block; padding: 0.75rem 1.2rem; font-size: 0.85rem; border-bottom: 1px solid #f0e8d8;">🔔 Notifications</a>
          <a href="account.html" style="display: block; padding: 0.75rem 1.2rem; font-size: 0.85rem; border-bottom: 1px solid #f0e8d8;">⚙️ Manage Account</a>
          <button onclick="PoshakhStore.logout()" style="display: block; width: 100%; text-align: left; padding: 0.75rem 1.2rem; font-size: 0.85rem; color: var(--crimson-cta); font-weight: 600; background: #fff5f5;">🚪 Sign Out</button>
        </div>
      `;
    } else {
      userActionHtml = `
        <a href="login.html" class="btn btn-gold" style="padding: 0.55rem 1.4rem; font-size: 0.78rem;">Sign In</a>
      `;
    }

    const isDarkNavPage = ['product.html', 'lender-dashboard.html', 'manage-dresses.html', 'admin.html', 'checkout.html'].includes(currentPath);

    navPlaceholder.innerHTML = `
      <nav class="poshakh-nav ${isDarkNavPage ? 'scrolled' : ''}" id="main-nav">
        <div class="nav-container">
          <a href="index.html" class="nav-brand">
            POSHAKH <span class="brand-accent">royal wear</span>
          </a>

          <!-- Clean Menu: ONLY Home and Shop Outfits -->
          <ul class="nav-menu">
            <li><a href="index.html" class="nav-link ${currentPath === 'index.html' ? 'active' : ''}">Home</a></li>
            <li><a href="shop.html" class="nav-link ${currentPath === 'shop.html' ? 'active' : ''}">Shop Outfits</a></li>
          </ul>

          <div class="nav-actions">
            <!-- Notifications Link -->
            <a href="notifications.html" class="nav-action-btn" title="Notifications">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
              </svg>
              <span class="nav-badge-pill" id="nav-notif-count" style="display:none;">0</span>
            </a>

            <!-- Cart / Orders Link (Admin has no personal rentals) -->
            ${user && user.role === 'admin' ? `
              <a href="admin.html" class="nav-action-btn" title="Super Admin Portal">
                <span style="font-size: 1.15rem;">🛡️</span>
              </a>
            ` : `
              <a href="rentals.html" class="nav-action-btn" title="My Rentals">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <path d="M16 10a4 4 0 0 1-8 0"></path>
                </svg>
              </a>
            `}

            ${userActionHtml}

            <!-- Mobile Hamburger Button -->
            <button class="mobile-nav-toggle" id="mobile-toggle-btn" aria-label="Toggle Navigation">
              ☰
            </button>
          </div>
        </div>
      </nav>

      <!-- Mobile Navigation Drawer -->
      <div class="mobile-nav-drawer" id="mobile-drawer">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-gold); padding-bottom: 1rem;">
          <span style="font-family: var(--font-serif); font-size: 1.4rem; font-weight: 700; color: var(--wine-deep);">POSHAKH</span>
          <button id="close-mobile-drawer" style="font-size: 1.6rem; color: #555;">&times;</button>
        </div>
        <a href="index.html" class="nav-link">Home</a>
        <a href="shop.html" class="nav-link">Shop Outfits</a>
        ${!user || user.role !== 'admin' ? `<a href="rentals.html" class="nav-link">My Rentals</a>` : ''}
        <a href="notifications.html" class="nav-link">Notifications</a>
        <a href="chat.html" class="nav-link">Messages & Bargain</a>
        <a href="account.html" class="nav-link">Manage Account</a>
        ${user && user.role === 'lender' ? `<a href="lender-dashboard.html" class="nav-link" style="color: var(--wine-deep); font-weight: 700;">Lender Dashboard</a>` : ''}
        ${user && user.role === 'admin' ? `<a href="admin.html" class="nav-link" style="color: var(--wine-deep); font-weight: 700;">Admin Portal</a>` : ''}
        ${user ? `<button onclick="PoshakhStore.logout()" class="btn btn-crimson" style="margin-top: 1rem;">Sign Out</button>` : `<a href="login.html" class="btn btn-gold" style="margin-top: 1rem;">Sign In</a>`}
      </div>
    `;
  },

  /**
   * Render Sleek Hoverable Floating Message/Chat Action Button
   */
  renderFloatingChatButton() {
    const existing = document.getElementById('poshakh-floating-chat');
    if (existing) existing.remove();

    const fab = document.createElement('a');
    fab.id = 'poshakh-floating-chat';
    fab.href = 'chat.html';
    fab.className = 'floating-chat-btn';
    fab.innerHTML = `
      <div class="chat-fab-inner">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
        </svg>
        <span class="chat-fab-label">Message &amp; Bargain</span>
      </div>
    `;

    fab.onclick = function(e) {
      const currentUser = PoshakhStore.getCurrentUser();
      if (!currentUser) {
        e.preventDefault();
        alert('Please sign in to message or negotiate with royal boutiques.');
        window.location.href = 'login.html?redirect=chat.html';
      }
    };

    document.body.appendChild(fab);
  },

  toggleUserDropdown(event) {
    event.stopPropagation();
    const dropdown = document.getElementById('nav-user-dropdown');
    if (dropdown) {
      dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
    }
  },

  setupScrollEffects() {
    const nav = document.getElementById('main-nav');
    if (!nav) return;
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        nav.classList.add('scrolled');
      } else {
        const currentPath = window.location.pathname.split('/').pop() || 'index.html';
        const isDarkNavPage = ['product.html', 'lender-dashboard.html', 'manage-dresses.html', 'admin.html', 'checkout.html'].includes(currentPath);
        if (!isDarkNavPage) {
          nav.classList.remove('scrolled');
        }
      }
    });

    // Close dropdown on outside click
    document.addEventListener('click', () => {
      const dropdown = document.getElementById('nav-user-dropdown');
      if (dropdown) dropdown.style.display = 'none';
    });
  },

  setupMobileMenu() {
    document.addEventListener('click', (e) => {
      if (e.target && e.target.id === 'mobile-toggle-btn') {
        const drawer = document.getElementById('mobile-drawer');
        if (drawer) drawer.classList.add('open');
      }
      if (e.target && e.target.id === 'close-mobile-drawer') {
        const drawer = document.getElementById('mobile-drawer');
        if (drawer) drawer.classList.remove('open');
      }
    });
  },

  updateNotificationBadge() {
    const badge = document.getElementById('nav-notif-count');
    if (!badge) return;
    const user = PoshakhStore.getCurrentUser();
    if (!user) {
      badge.style.display = 'none';
      return;
    }
    const notifs = PoshakhStore.getNotifications(user.email, user.role);
    const unreadCount = notifs.filter(n => !n.read).length;
    if (unreadCount > 0) {
      badge.textContent = unreadCount;
      badge.style.display = 'inline-block';
    } else {
      badge.style.display = 'none';
    }
  },

  setupGlobalModals() {
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('poshakh-modal-backdrop') || e.target.classList.contains('modal-close-btn')) {
        document.querySelectorAll('.poshakh-modal-backdrop').forEach(modal => {
          modal.classList.remove('show');
        });
      }
    });
  },

  toast(message, type = 'gold') {
    const toast = document.createElement('div');
    toast.className = 'poshakh-toast';
    toast.innerHTML = `
      <span style="font-size: 1.2rem;">${type === 'success' ? '✨' : (type === 'error' ? '⚠️' : '👑')}</span>
      <div>${message}</div>
    `;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(20px)';
      toast.style.transition = 'all 0.4s ease';
      setTimeout(() => toast.remove(), 400);
    }, 3800);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  PoshakhUI.init();
});

window.PoshakhUI = PoshakhUI;
