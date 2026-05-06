/* ═══════════════════════════════════════════════════════
   WISHLIST HUB - Main Application Controller
   ═══════════════════════════════════════════════════════ */

// ── Application Init ─────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    // Show splash screen
    setTimeout(() => {
        document.getElementById('splash-screen').classList.add('hidden');
        initApp();
    }, 2200);
});

function initApp() {
    // Check if user has a session in storage
    if (store.state.isLoggedIn && store.state.currentUser) {
        aiEngine.initialize(store.state.currentUser);
        updateNavForAuth(true);
    } else {
        // Default to not logged in - viewing as guest/site owner perspective
        updateNavForAuth(false);
    }

    // Render initial page
    renderPage('home');

    // Setup scroll reveal observer
    setupScrollReveal();

    // Render notifications
    renderNotifications();

    // Setup keyboard shortcuts
    setupKeyboardShortcuts();
}

// ── Navigation ───────────────────────────────────────
function navigateTo(page) {
    event?.preventDefault();
    store.state.currentPage = page;

    // Reset detail views
    if (page !== 'wishlist') currentWishlistDetail = null;
    if (page !== 'profile') viewingUserId = null;

    renderPage(page);
    updateActiveNav(page);

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Close mobile menu
    closeMobileMenu();
}

function renderPage(page) {
    const content = document.getElementById('app-content');
    let html = '';

    switch (page) {
        case 'home':
            html = renderHomePage();
            break;
        case 'wishlist':
            html = renderWishlistPage();
            break;
        case 'trends':
            html = renderTrendsPage();
            break;
        case 'inspiration':
            html = renderInspirationPage();
            break;
        case 'profile':
            html = renderProfilePage();
            break;
        default:
            html = renderHomePage();
    }

    content.innerHTML = html;

    // Re-setup scroll reveal for new content
    requestAnimationFrame(() => {
        setupScrollReveal();
    });
}

function updateActiveNav(page) {
    // Desktop nav
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.toggle('active', link.dataset.page === page);
    });
    // Mobile nav
    document.querySelectorAll('.mobile-nav-item').forEach(link => {
        link.classList.toggle('active', link.dataset.page === page);
    });
}

// ── Auth ─────────────────────────────────────────────
function openAuthModal() {
    document.getElementById('auth-modal').style.display = 'flex';
}

function closeAuthModal() {
    document.getElementById('auth-modal').style.display = 'none';
}

function switchAuthTab(tab) {
    document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
    document.querySelector(`.auth-tab[data-tab="${tab}"]`).classList.add('active');

    document.getElementById('login-form').style.display = tab === 'login' ? 'block' : 'none';
    document.getElementById('register-form').style.display = tab === 'register' ? 'block' : 'none';
}

function handleLogin() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    if (!email || !password) {
        showToast('Tüm alanları doldurun!', 'error');
        return;
    }

    // Find user by email or use first one as demo
    const user = SAMPLE_USERS.find(u => u.email === email) || SAMPLE_USERS[0];
    store.login(user);
    updateNavForAuth(true);
    closeAuthModal();
    showToast(`Hoş geldin, ${user.name}! 🎉`, 'success');
    renderPage('home');
}

function handleRegister() {
    const name = document.getElementById('reg-name').value;
    const username = document.getElementById('reg-username').value;
    const email = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-password').value;

    if (!name || !username || !email || !password) {
        showToast('Tüm alanları doldurun!', 'error');
        return;
    }

    // Create new user
    const newUser = {
        id: 'u' + Date.now(),
        name,
        username: username.startsWith('@') ? username : '@' + username,
        email,
        avatar: null,
        avatarEmoji: '😊',
        bio: 'Wishlist Hub\'a yeni katıldım!',
        interests: Array.from(document.querySelectorAll('.interest-tag.selected')).map(t => {
            const catName = t.textContent.trim();
            const cat = CATEGORIES.find(c => c.name === catName);
            return cat?.id;
        }).filter(Boolean),
        followers: 0,
        following: 0,
        wishlists: [],
        joinDate: new Date().toISOString().split('T')[0],
        verified: false,
        segment: 'young'
    };

    SAMPLE_USERS.push(newUser);
    store.state.users.push(newUser);
    store.login(newUser);
    updateNavForAuth(true);
    closeAuthModal();
    showToast(`Hesap oluşturuldu! Hoş geldin, ${name}! 🎉`, 'success');
    renderPage('home');
}

function handleLogout() {
    store.logout();
    updateNavForAuth(false);
    showToast('Çıkış yapıldı', 'info');
    renderPage('home');
}

function updateNavForAuth(loggedIn) {
    const navUser = document.getElementById('nav-user');
    const navAuthBtn = document.getElementById('nav-auth-btn');
    const navAvatar = document.getElementById('nav-avatar');

    if (loggedIn && store.state.currentUser) {
        navUser.style.display = 'block';
        navAuthBtn.style.display = 'none';
        
        const user = store.state.currentUser;
        navUser.innerHTML = `
            <div class="user-avatar-small" style="overflow:hidden;">
                <div style="width:100%; height:100%; background: var(--primary); display:flex; align-items:center; justify-content:center; font-size: 1.1rem;">
                    ${user.avatar ? 
                        `<img src="${user.avatar}" alt="${user.name}" style="width: 100%; height: 100%; object-fit: cover;">` : 
                        user.avatarEmoji
                    }
                </div>
            </div>
        `;
    } else {
        navUser.style.display = 'none';
        navAuthBtn.style.display = 'flex';
    }
}

function toggleInterest(el) {
    el.classList.toggle('selected');
}

// ── Search ───────────────────────────────────────────
function toggleSearch() {
    const overlay = document.getElementById('search-overlay');
    const visible = overlay.style.display !== 'none';
    overlay.style.display = visible ? 'none' : 'block';

    if (!visible) {
        document.getElementById('global-search').focus();
    }
}

function handleGlobalSearch(query) {
    const resultsContainer = document.getElementById('search-results');

    if (!query.trim()) {
        resultsContainer.innerHTML = '';
        return;
    }

    const results = store.search(query);
    let html = '';

    if (results.products.length > 0) {
        html += `<p style="font-size: 0.75rem; color: var(--text-muted); padding: var(--space-sm) 0; text-transform: uppercase;">Ürünler</p>`;
        results.products.slice(0, 4).forEach(p => {
            html += `
                <div style="display: flex; align-items: center; gap: var(--space-md); padding: var(--space-sm); cursor: pointer; border-radius: var(--radius-md); transition: background 0.2s;" 
                     onmouseover="this.style.background='var(--bg-glass-hover)'" 
                     onmouseout="this.style.background='none'" 
                     onclick="toggleSearch(); viewProduct('${p.id}')">
                    <span style="font-size: 1.5rem;">${p.emoji}</span>
                    <div>
                        <p style="font-size: 0.85rem; font-weight: 600;">${p.name}</p>
                        <p style="font-size: 0.75rem; color: var(--text-muted);">${p.brand} • ${formatPrice(p.price)}</p>
                    </div>
                </div>
            `;
        });
    }

    if (results.wishlists.length > 0) {
        html += `<p style="font-size: 0.75rem; color: var(--text-muted); padding: var(--space-sm) 0; text-transform: uppercase; margin-top: var(--space-sm);">Wishlistler</p>`;
        results.wishlists.slice(0, 3).forEach(w => {
            html += `
                <div style="display: flex; align-items: center; gap: var(--space-md); padding: var(--space-sm); cursor: pointer; border-radius: var(--radius-md); transition: background 0.2s;"
                     onmouseover="this.style.background='var(--bg-glass-hover)'" 
                     onmouseout="this.style.background='none'"
                     onclick="toggleSearch(); viewWishlistDetail('${w.id}')">
                    <i class="fas fa-heart" style="color: var(--accent-pink); font-size: 1.2rem;"></i>
                    <div>
                        <p style="font-size: 0.85rem; font-weight: 600;">${w.title}</p>
                        <p style="font-size: 0.75rem; color: var(--text-muted);">${w.products.length} ürün</p>
                    </div>
                </div>
            `;
        });
    }

    if (results.users.length > 0) {
        html += `<p style="font-size: 0.75rem; color: var(--text-muted); padding: var(--space-sm) 0; text-transform: uppercase; margin-top: var(--space-sm);">Kullanıcılar</p>`;
        results.users.slice(0, 3).forEach(u => {
            html += `
                <div style="display: flex; align-items: center; gap: var(--space-md); padding: var(--space-sm); cursor: pointer; border-radius: var(--radius-md); transition: background 0.2s;"
                     onmouseover="this.style.background='var(--bg-glass-hover)'" 
                     onmouseout="this.style.background='none'"
                     onclick="toggleSearch(); viewUserProfile('${u.id}')">
                    <span style="font-size: 1.5rem;">${u.avatarEmoji}</span>
                    <div>
                        <p style="font-size: 0.85rem; font-weight: 600;">${u.name}</p>
                        <p style="font-size: 0.75rem; color: var(--text-muted);">${u.username}</p>
                    </div>
                </div>
            `;
        });
    }

    if (!html) {
        html = `<p style="text-align: center; color: var(--text-muted); padding: var(--space-lg);">Sonuç bulunamadı</p>`;
    }

    resultsContainer.innerHTML = html;
}

// ── Notifications ────────────────────────────────────
function toggleNotifications() {
    const panel = document.getElementById('notif-panel');
    const visible = panel.style.display !== 'none';
    panel.style.display = visible ? 'none' : 'block';
}

function renderNotifications() {
    const list = document.getElementById('notif-list');
    const badge = document.querySelector('.notif-badge');

    let html = '';
    store.state.notifications.forEach(n => {
        const user = n.userId ? getUserById(n.userId) : null;
        html += `
            <div class="notif-item ${!n.read ? 'unread' : ''}" onclick="handleNotifClick('${n.id}')">
                <div class="notif-icon" style="background: var(--primary-100); color: var(--primary);">
                    <span>${n.icon}</span>
                </div>
                <div class="notif-content">
                    <p><strong>${user?.name || 'Sistem'}</strong> ${n.text}</p>
                    <span class="notif-time">${n.time}</span>
                </div>
            </div>
        `;
    });

    if (list) list.innerHTML = html;

    const unreadCount = store.getUnreadCount();
    if (badge) {
        badge.textContent = unreadCount;
        badge.style.display = unreadCount > 0 ? 'flex' : 'none';
    }
}

function handleNotifClick(notifId) {
    store.markNotificationRead(notifId);
    renderNotifications();
}

function clearNotifications() {
    store.state.notifications.forEach(n => n.read = true);
    renderNotifications();
    showToast('Tüm bildirimler okundu', 'info');
}

// ── Product Actions ──────────────────────────────────
function viewProduct(productId) {
    const product = getProductById(productId);
    if (!product) return;
    aiEngine.logBehavior('view', productId);
    
    if (product.url) {
        window.open(product.url, '_blank');
    } else {
        showToast(`${product.name} - ${product.brand}`, 'info');
    }
}

function toggleLike(productId) {
    store.toggleLikeProduct(productId);
    const isLiked = store.state.likedProducts.has(productId);

    // Animate
    const btn = document.querySelector(`[data-product-id="${productId}"] .product-card-action`);
    if (btn) {
        btn.classList.add('like-anim');
        setTimeout(() => btn.classList.remove('like-anim'), 600);
    }

    showToast(isLiked ? 'Beğenildi! ❤️' : 'Beğeni kaldırıldı', isLiked ? 'success' : 'info');
    renderPage(store.state.currentPage);
}

function shareProduct(productId) {
    const product = getProductById(productId);
    if (product) {
        navigator.clipboard?.writeText(`Wishlist Hub'da ${product.name} - ${product.brand}`);
        showToast('Link kopyalandı! 📋', 'success');
    }
}

function showAddToWishlistModal(productId) {
    if (!store.state.isLoggedIn) {
        openAuthModal();
        return;
    }

    const userWishlists = store.getUserWishlists(store.state.currentUser.id);

    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.id = 'atw-modal';
    modal.innerHTML = `
        <div class="modal-container" style="max-width: 400px;">
            <button class="modal-close" onclick="document.getElementById('atw-modal').remove()">
                <i class="fas fa-times"></i>
            </button>
            <h3 style="font-size: 1.1rem; font-weight: 700; margin-bottom: var(--space-lg);">
                Wishlist'e Ekle
            </h3>
            ${userWishlists.length > 0 ? userWishlists.map(w => `
                <div style="display: flex; align-items: center; justify-content: space-between; padding: var(--space-md); background: var(--bg-glass); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); margin-bottom: var(--space-sm); cursor: pointer; transition: all 0.2s;"
                     onmouseover="this.style.borderColor='var(--primary)'"
                     onmouseout="this.style.borderColor='var(--border-subtle)'"
                     onclick="addProductToWishlistAction('${w.id}', '${productId}'); document.getElementById('atw-modal').remove();">
                    <div>
                        <p style="font-weight: 600; font-size: 0.9rem;">${w.title}</p>
                        <p style="font-size: 0.75rem; color: var(--text-muted);">${w.products.length} ürün</p>
                    </div>
                    <i class="fas fa-plus" style="color: var(--primary);"></i>
                </div>
            `).join('') : '<p style="color: var(--text-muted); text-align: center; padding: var(--space-lg);">Henüz listeniz yok.</p>'}
            <button class="btn btn-secondary btn-full" onclick="document.getElementById('atw-modal').remove(); openCreateWishlistModal();" style="margin-top: var(--space-md);">
                <i class="fas fa-plus"></i> Yeni Liste Oluştur
            </button>
        </div>
    `;
    document.body.appendChild(modal);
}

// ── Mobile Menu ──────────────────────────────────────
function toggleMobileMenu() {
    const links = document.getElementById('nav-links');
    links.style.display = links.style.display === 'flex' ? 'none' : 'flex';
    links.style.position = 'absolute';
    links.style.top = '64px';
    links.style.left = '0';
    links.style.right = '0';
    links.style.flexDirection = 'column';
    links.style.background = 'rgba(250, 246, 240, 0.98)';
    links.style.backdropFilter = 'blur(20px)';
    links.style.padding = 'var(--space-md)';
    links.style.borderBottom = '1px solid var(--border-subtle)';
}

function closeMobileMenu() {
    const links = document.getElementById('nav-links');
    if (window.innerWidth <= 1024) {
        links.style.display = 'none';
    }
}

// ── UI Helpers ────────────────────────────────────────
function setupScrollReveal() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('.app-nav');
        if (nav) {
            if (window.scrollY > 20) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        }
    });
}

// ── Keyboard Shortcuts ───────────────────────────────
function setupKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        // Escape to close modals
        if (e.key === 'Escape') {
            closeAuthModal();
            document.getElementById('search-overlay').style.display = 'none';
            document.getElementById('notif-panel').style.display = 'none';
            document.querySelectorAll('.modal-overlay:not(#auth-modal)').forEach(m => m.remove());
        }

        // Ctrl+K for search
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            toggleSearch();
        }
    });
}

// ── Close dropdowns on outside click ─────────────────
document.addEventListener('click', (e) => {
    const notifPanel = document.getElementById('notif-panel');
    const notifBtn = document.getElementById('notif-btn');

    if (notifPanel && notifPanel.style.display !== 'none'
        && !notifPanel.contains(e.target)
        && !notifBtn.contains(e.target)) {
        notifPanel.style.display = 'none';
    }
});

// ── Window resize handler ────────────────────────────
window.addEventListener('resize', () => {
    const links = document.getElementById('nav-links');
    if (window.innerWidth > 1024) {
        links.style.display = 'flex';
        links.style.position = '';
        links.style.top = '';
        links.style.left = '';
        links.style.right = '';
        links.style.flexDirection = '';
        links.style.background = '';
        links.style.backdropFilter = '';
        links.style.padding = '';
        links.style.borderBottom = '';
    }
});

// ── Nav scroll behavior ──────────────────────────────
let lastScrollY = 0;
window.addEventListener('scroll', () => {
    const nav = document.getElementById('main-nav');
    const scrollY = window.scrollY;

    if (scrollY > lastScrollY && scrollY > 100) {
        nav.classList.add('hidden');
    } else {
        nav.classList.remove('hidden');
    }

    lastScrollY = scrollY;
});

console.log('🚀 Wishlist Hub initialized successfully!');
console.log('❤️ Built with AI-powered recommendation engine');
