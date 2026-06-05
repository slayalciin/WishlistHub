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

function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    const btn = document.getElementById('theme-toggle-btn');
    if (btn) {
        btn.innerHTML = theme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    }
}

function applyLanguage(lang) {
    applyTranslations();
    const btnText = document.getElementById('lang-toggle-text');
    if (btnText) {
        btnText.textContent = lang === 'tr' ? 'EN' : 'TR';
    }
    const navAuthBtn = document.getElementById('nav-auth-btn');
    if (navAuthBtn) {
        navAuthBtn.innerHTML = `<i class="fas fa-sign-in-alt"></i> <span data-i18n="nav_login">${t('nav_login')}</span>`;
    }
}

function toggleTheme() {
    const newTheme = store.state.theme === 'dark' ? 'light' : 'dark';
    store.setTheme(newTheme);
}
window.toggleTheme = toggleTheme;

function toggleLanguage() {
    const newLang = store.state.language === 'tr' ? 'en' : 'tr';
    store.setLanguage(newLang);
}
window.toggleLanguage = toggleLanguage;

function initApp() {
    // Apply loaded theme and language
    applyTheme(store.state.theme);
    applyLanguage(store.state.language);

    // Subscribe to theme/language changes
    store.on('themeChanged', (theme) => {
        applyTheme(theme);
    });

    store.on('languageChanged', (lang) => {
        applyLanguage(lang);
        renderPage(store.state.currentPage);
    });

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
        case 'combohub':
            html = renderComboHubPage();
            break;
        case 'virtual-tryout':
            html = renderVirtualTryoutPage();
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
        showToast(t('comp_toast_all_fields'), 'error');
        return;
    }

    // Find user by email or use first one as demo
    const user = SAMPLE_USERS.find(u => u.email === email) || SAMPLE_USERS[0];
    store.login(user);
    updateNavForAuth(true);
    closeAuthModal();
    showToast(t('comp_toast_welcome', { name: user.name }), 'success');
    renderPage('home');
}

function handleRegister() {
    const name = document.getElementById('reg-name').value;
    const username = document.getElementById('reg-username') ? document.getElementById('reg-username').value : '@user';
    const email = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-password').value;

    if (!name || !email || !password) {
        showToast(t('comp_toast_all_fields'), 'error');
        return;
    }

    // Create new user
    const newUser = {
        id: 'u' + Date.now(),
        name,
        username: username.startsWith('@') ? username : '@' + username,
        email,
        avatar: null,
        avatarEmoji: null,
        bio: t('auth_default_bio', 'Wishlist Hub\'a yeni katıldım!'),
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
    showToast(t('comp_toast_reg_welcome', { name }), 'success');
    renderPage('home');
}

function handleLogout() {
    store.logout();
    updateNavForAuth(false);
    showToast(t('comp_toast_logout'), 'info');
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
                        `<i class="fas fa-user" style="color:white; font-size:1rem;"></i>`
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
                    <div style="width:32px; height:32px; border-radius:50%; background:var(--primary); display:flex; align-items:center; justify-content:center; flex-shrink:0; overflow:hidden;">
                        ${u.avatar ? `<img src="${u.avatar}" alt="${u.name}" style="width:100%;height:100%;object-fit:cover;">` : `<i class="fas fa-user" style="color:white; font-size:0.85rem;"></i>`}
                    </div>
                    <div>
                        <p style="font-size: 0.85rem; font-weight: 600;">${u.name}</p>
                        <p style="font-size: 0.75rem; color: var(--text-muted);">${u.username}</p>
                    </div>
                </div>
            `;
        });
    }

    if (!html) {
        html = `<p style="text-align: center; color: var(--text-muted); padding: var(--space-lg);">${t('search_no_results', 'Sonuç bulunamadı')}</p>`;
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
    showToast(t('notif_all_read_toast', 'Tüm bildirimler okundu'), 'info');
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

    showToast(isLiked ? t('wl_liked_toast', 'Beğenildi! ❤️') : t('wl_unliked_toast', 'Beğeni kaldırıldı'), isLiked ? 'success' : 'info');
    renderPage(store.state.currentPage);
}

function shareProduct(productId) {
    const product = getProductById(productId);
    if (product) {
        navigator.clipboard?.writeText(`Wishlist Hub'da ${product.name} - ${product.brand}`);
        showToast(t('wl_link_copied', 'Link kopyalandı! 📋'), 'success');
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
                ${t('wl_add_to_wishlist')}
            </h3>
            ${userWishlists.length > 0 ? userWishlists.map(w => `
                <div style="display: flex; align-items: center; justify-content: space-between; padding: var(--space-md); background: var(--bg-glass); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); margin-bottom: var(--space-sm); cursor: pointer; transition: all 0.2s;"
                     onmouseover="this.style.borderColor='var(--primary)'"
                     onmouseout="this.style.borderColor='var(--border-subtle)'"
                     onclick="addProductToWishlistAction('${w.id}', '${productId}'); document.getElementById('atw-modal').remove();">
                     <div>
                         <p style="font-weight: 600; font-size: 0.9rem;">${w.title}</p>
                         <p style="font-size: 0.75rem; color: var(--text-muted);">${t('wl_product_count', { count: w.products.length })}</p>
                     </div>
                     <i class="fas fa-plus" style="color: var(--primary);"></i>
                </div>
            `).join('') : `<p style="color: var(--text-muted); text-align: center; padding: var(--space-lg);">${t('wl_no_lists')}</p>`}
            <button class="btn btn-secondary btn-full" onclick="document.getElementById('atw-modal').remove(); openCreateWishlistModal();" style="margin-top: var(--space-md);">
                <i class="fas fa-plus"></i> ${t('wl_new_list_card')}
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
    links.style.background = 'var(--bg-mobile-menu)';
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

// ── Contact Modal & Map Integration ──────────────────
function openContactModal() {
    // Remove existing modal if any
    const existing = document.getElementById('contact-modal');
    if (existing) existing.remove();

    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.id = 'contact-modal';
    modal.style.zIndex = '9999';
    modal.innerHTML = `
        <div class="modal-container" style="max-width: 850px; width: 92%; padding: var(--space-xl); border-radius: var(--radius-2xl); background: var(--bg-card); border: 1px solid var(--border-medium); box-shadow: var(--shadow-xl);">
            <button class="modal-close" onclick="document.getElementById('contact-modal').remove()" style="background: none; border: none; font-size: 1.25rem; color: var(--text-muted); cursor: pointer; position: absolute; top: var(--space-md); right: var(--space-md);">
                <i class="fas fa-times"></i>
            </button>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-xl); margin-top: var(--space-sm); align-items: start;">
                <!-- Left: Form and Info -->
                <div style="display: flex; flex-direction: column; gap: var(--space-md);">
                    <div>
                        <h3 style="font-size: 1.5rem; font-weight: 800; color: var(--text-primary); margin-bottom: 4px;">
                            ${t('contact_title')}
                        </h3>
                        <p style="font-size: 0.85rem; color: var(--text-secondary); margin: 0;">
                            ${t('contact_desc')}
                        </p>
                    </div>
                    
                    <!-- Address & Phone Info -->
                    <div style="display: flex; flex-direction: column; gap: 10px; font-size: 0.85rem; background: var(--bg-secondary); padding: var(--space-md); border-radius: var(--radius-lg); border: 1px solid var(--border-subtle); line-height: 1.4;">
                        <div style="display: flex; gap: 10px; align-items: flex-start;">
                            <i class="fas fa-map-marker-alt" style="color: var(--primary); margin-top: 3px; font-size: 1rem;"></i>
                            <div>
                                <strong style="color: var(--text-primary);">${t('contact_hq')}</strong>
                                <p style="margin: 3px 0 0 0; color: var(--text-secondary);">${t('contact_hq_address')}</p>
                            </div>
                        </div>
                        <div style="display: flex; gap: 10px; align-items: center;">
                            <i class="fas fa-phone-alt" style="color: var(--primary); font-size: 0.95rem;"></i>
                            <div>
                                <strong style="color: var(--text-primary);">${t('contact_relations')}</strong> <span style="color: var(--text-secondary);">+90 (216) 555 48 48</span>
                            </div>
                        </div>
                        <div style="display: flex; gap: 10px; align-items: center;">
                            <i class="fas fa-envelope" style="color: var(--primary); font-size: 0.95rem;"></i>
                            <div>
                                <strong style="color: var(--text-primary);">${t('contact_email_label')}</strong> <span style="color: var(--text-secondary);">destek@wishlisthub.com</span>
                            </div>
                        </div>
                    </div>

                    <!-- Contact Form -->
                    <div style="display: flex; flex-direction: column; gap: var(--space-sm);">
                        <input type="text" id="contact-name" placeholder="${t('contact_name_placeholder')}" class="input-minimal" style="padding: 10px; border-radius: var(--radius-md);">
                        <input type="email" id="contact-email" placeholder="${t('contact_email_placeholder')}" class="input-minimal" style="padding: 10px; border-radius: var(--radius-md);">
                        <textarea id="contact-message" placeholder="${t('contact_message_placeholder')}" class="input-minimal" style="height: 90px; resize: none; padding: 10px; border-radius: var(--radius-md);"></textarea>
                        <button class="btn btn-primary btn-full" onclick="submitContactForm()" style="height: 42px; font-weight: 700; border-radius: var(--radius-md); margin-top: 4px;">
                            ${t('contact_send')}
                        </button>
                    </div>
                </div>

                <!-- Right: Map -->
                <div style="display: flex; flex-direction: column; height: 100%;">
                    <h4 style="font-size: 0.95rem; font-weight: 700; margin: 0 0 var(--space-sm) 0; display: flex; align-items: center; gap: 6px; color: var(--text-primary);">
                        <i class="fas fa-map" style="color: var(--primary);"></i> ${t('contact_map_label')}
                    </h4>
                    <div style="border-radius: var(--radius-lg); overflow: hidden; border: 1px solid var(--border-subtle); box-shadow: var(--shadow-sm); height: 350px; background: var(--bg-secondary);">
                        <iframe 
                            src="https://maps.google.com/maps?q=Altunizade,%20K%C4%B1s%C4%B1kl%C4%B1%20Cd.%2016-1,%2034662%20%C3%9Csk%C3%BCdar/%C4%B0stanbul&t=&z=15&ie=UTF8&iwloc=&output=embed" 
                            width="100%" 
                            height="100%" 
                            style="border:0;" 
                            allowfullscreen="" 
                            loading="lazy">
                        </iframe>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

function submitContactForm() {
    const name = document.getElementById('contact-name').value.trim();
    const email = document.getElementById('contact-email').value.trim();
    const msg = document.getElementById('contact-message').value.trim();

    if (!name || !email || !msg) {
        showToast(t('contact_error'), 'error');
        return;
    }

    showToast(t('contact_success'), 'success');
    document.getElementById('contact-modal').remove();
}

console.log('🚀 Wishlist Hub initialized successfully!');
console.log('❤️ Built with personal recommendation engine');

/* ── CREATION HUB FLOW & CONTROLLERS ── */

let tempWishlistProducts = [];
let tempMoodboardItems = [];

function openCreationHub() {
    if (!store.state.isLoggedIn) {
        openAuthModal();
        return;
    }
    const modal = document.getElementById('creation-hub-modal');
    if (modal) {
        modal.style.display = 'flex';
        showCreationChoiceScreen();
    }
}
window.openCreationHub = openCreationHub;

function closeCreationHub() {
    const modal = document.getElementById('creation-hub-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}
window.closeCreationHub = closeCreationHub;

function showCreationChoiceScreen() {
    document.getElementById('ch-choice-screen').style.display = 'block';
    document.getElementById('ch-form-screen').style.display = 'none';
    document.getElementById('ch-form-content').innerHTML = '';
    tempWishlistProducts = [];
    tempMoodboardItems = [];
}
window.showCreationChoiceScreen = showCreationChoiceScreen;

function showCreationForm(type) {
    document.getElementById('ch-choice-screen').style.display = 'none';
    document.getElementById('ch-form-screen').style.display = 'block';
    
    let html = '';
    if (type === 'wishlist') {
        html = getWishlistFormHTML();
    } else if (type === 'moodboard') {
        html = getMoodboardFormHTML();
    } else if (type === 'post') {
        html = getInspirationPostFormHTML();
    } else if (type === 'collection') {
        html = getCollectionFormHTML();
    }
    
    const content = document.getElementById('ch-form-content');
    content.innerHTML = html;
    
    // Apply dynamic i18n
    applyTranslations();

    // Trigger post-rendering initializers
    if (type === 'wishlist') {
        renderTempWishlistProducts();
    } else if (type === 'moodboard') {
        renderMoodboardCanvasItems();
    }
}
window.showCreationForm = showCreationForm;

/* ── WISHLIST CREATION BUILDERS ── */

function getWishlistFormHTML() {
    return `
        <h3 style="font-size: 1.5rem; font-weight: 800; color: var(--text-primary); margin-bottom: var(--space-md); text-align: center;" data-i18n="ch_card_wishlist_title">${t('ch_card_wishlist_title')}</h3>
        
        <div style="display: flex; flex-direction: column; gap: var(--space-md);">
            <div class="form-group-minimal">
                <label style="font-size:0.85rem; font-weight:700; color:var(--text-muted); display:block; margin-bottom:4px;" data-i18n="ch_form_wishlist_name">${t('ch_form_wishlist_name')}</label>
                <input type="text" id="ch-wl-name" placeholder="${t('wl_create_name_placeholder')}" class="input-minimal" style="border-radius: var(--radius-md); padding: 10px;">
            </div>

            <div class="form-group-minimal">
                <label style="font-size:0.85rem; font-weight:700; color:var(--text-muted); display:block; margin-bottom:4px;" data-i18n="ch_form_desc">${t('ch_form_desc')}</label>
                <textarea id="ch-wl-desc" placeholder="${t('wl_create_desc_placeholder')}" class="input-minimal" style="height: 70px; resize:none; border-radius: var(--radius-md); padding: 10px;"></textarea>
            </div>

            <div class="form-group-minimal">
                <label style="font-size:0.85rem; font-weight:700; color:var(--text-muted); display:block; margin-bottom:4px;" data-i18n="ch_form_cover">${t('ch_form_cover')}</label>
                <input type="text" id="ch-wl-cover" placeholder="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500" class="input-minimal" style="border-radius: var(--radius-md); padding: 10px;">
            </div>

            <div class="grid-2" style="gap: var(--space-md);">
                <div class="form-group-minimal">
                    <label style="font-size:0.85rem; font-weight:700; color:var(--text-muted); display:block; margin-bottom:4px;" data-i18n="ch_form_category">${t('ch_form_category')}</label>
                    <select id="ch-wl-category" class="input-minimal" style="border-radius: var(--radius-md); padding: 10px; height: 42px; width:100%;">
                        <option value="fashion">${t('fashion')}</option>
                        <option value="tech">${t('tech')}</option>
                        <option value="beauty">${t('beauty')}</option>
                        <option value="home">${t('home')}</option>
                        <option value="sports">${t('sports')}</option>
                        <option value="books">${t('books')}</option>
                        <option value="pets">${t('pets')}</option>
                        <option value="gaming">${t('gaming')}</option>
                    </select>
                </div>
                <div class="form-group-minimal">
                    <label style="font-size:0.85rem; font-weight:700; color:var(--text-muted); display:block; margin-bottom:4px;" data-i18n="ch_form_privacy">${t('ch_form_privacy')}</label>
                    <select id="ch-wl-privacy" class="input-minimal" style="border-radius: var(--radius-md); padding: 10px; height: 42px; width:100%;">
                        <option value="public">${t('wl_public')}</option>
                        <option value="private">${t('wl_private')}</option>
                    </select>
                </div>
            </div>

            <div class="form-group-minimal" style="border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); padding: var(--space-md); background: var(--bg-secondary);">
                <label style="font-size:0.85rem; font-weight:700; color:var(--text-primary); display:block; margin-bottom: var(--space-sm);" data-i18n="wl_add_product_btn">${t('wl_add_product_btn')}</label>
                
                <div style="display:flex; flex-direction:column; gap: var(--space-xs); margin-bottom: var(--space-md);">
                    <input type="text" id="ch-wl-prod-url" placeholder="${t('wl_url_placeholder')}" class="input-minimal" style="padding: 8px;">
                    <div style="display:flex; gap: 6px;">
                        <input type="text" id="ch-wl-prod-img" placeholder="${t('ch_form_add_product_image')}" class="input-minimal" style="padding: 8px; flex: 1;">
                        <button class="btn btn-secondary btn-sm" onclick="addCustomProductToTempWishlist()" style="border-radius: var(--radius-md); padding: 0 16px;">
                            <i class="fas fa-plus"></i> Ekle
                        </button>
                    </div>
                </div>

                <div style="margin-bottom: var(--space-md);">
                    <label style="font-size:0.75rem; font-weight:700; color:var(--text-muted); display:block; margin-bottom: 4px;" data-i18n="wl_or_select_existing">${t('wl_or_select_existing')}</label>
                    <select id="ch-wl-existing-prod" class="input-minimal" onchange="addExistingProductToTempWishlist(this.value); this.value='';" style="padding: 8px; height: 38px; width:100%;">
                        <option value="">${t('wl_add_to_wishlist')}...</option>
                        ${store.state.products.map(p => `<option value="${p.id}">${p.brand} - ${p.name.substring(0, 30)}...</option>`).join('')}
                    </select>
                </div>

                <div>
                    <label style="font-size:0.75rem; font-weight:700; color:var(--text-muted); display:block; margin-bottom: 6px;">
                        <i class="fas fa-sort" style="color:var(--primary);"></i> <span data-i18n="ch_form_drag_hint">${t('ch_form_drag_hint')}</span>
                    </label>
                    <div id="ch-wishlist-sortable-list" style="max-height: 150px; overflow-y:auto; display:flex; flex-direction:column; gap: 4px; padding: 4px;">
                        <!-- Temp products list -->
                    </div>
                </div>
            </div>

            <div style="display:flex; gap: var(--space-sm); margin-top: var(--space-md);">
                <button class="btn btn-secondary" onclick="showCreationChoiceScreen()" style="flex:1;">Geri</button>
                <button class="btn btn-primary" onclick="submitExtendedWishlist()" style="flex:2;" data-i18n="ch_form_btn_create">${t('ch_form_btn_create')}</button>
            </div>
        </div>
    `;
}

function addCustomProductToTempWishlist() {
    const urlEl = document.getElementById('ch-wl-prod-url');
    const imgEl = document.getElementById('ch-wl-prod-img');
    const url = urlEl.value.trim();
    const image = imgEl.value.trim();

    if (!url) {
        showToast(t('wl_invalid_url'), 'error');
        return;
    }

    const id = 'p_custom_' + Date.now();
    const mockProduct = {
        id: id,
        name: url.split('/').pop().split('?')[0].replace(/[-_]/g, ' ').substring(0, 30) || 'Custom Product',
        brand: 'Web Store',
        category: 'fashion',
        price: 1250,
        currency: '₺',
        url: url,
        image: image || 'assets/logo.png',
        emoji: '🏷️',
        likes: 0,
        comments: 0,
        tags: ['custom'],
        trending: false
    };

    store.state.products.unshift(mockProduct);
    tempWishlistProducts.push(mockProduct);
    
    urlEl.value = '';
    imgEl.value = '';
    
    renderTempWishlistProducts();
    showToast(t('wl_product_parse_success'), 'success');
}
window.addCustomProductToTempWishlist = addCustomProductToTempWishlist;

function addExistingProductToTempWishlist(productId) {
    if (!productId) return;
    const product = getProductById(productId);
    if (product) {
        if (!tempWishlistProducts.some(p => p.id === product.id)) {
            tempWishlistProducts.push(product);
            renderTempWishlistProducts();
        }
    }
}
window.addExistingProductToTempWishlist = addExistingProductToTempWishlist;

function renderTempWishlistProducts() {
    const list = document.getElementById('ch-wishlist-sortable-list');
    if (!list) return;

    list.innerHTML = tempWishlistProducts.map(p => `
        <div class="drag-list-item" draggable="true" data-id="${p.id}" style="display: flex; align-items: center; gap: var(--space-md); padding: var(--space-sm) var(--space-md); background: var(--bg-secondary); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); margin-bottom: var(--space-xs); cursor: grab;">
            <span style="font-size:1.2rem;">${p.emoji || '🏷️'}</span>
            <div style="flex:1; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; font-size:0.85rem;">
                <strong>${p.brand}</strong> - ${p.name}
            </div>
            <button onclick="event.stopPropagation(); removeTempWishlistProduct('${p.id}')" style="background:none; border:none; color:var(--accent-rose); cursor:pointer;"><i class="fas fa-trash"></i></button>
        </div>
    `).join('');

    setupDragAndDropSort();
}

function removeTempWishlistProduct(id) {
    tempWishlistProducts = tempWishlistProducts.filter(p => p.id !== id);
    renderTempWishlistProducts();
}
window.removeTempWishlistProduct = removeTempWishlistProduct;

function setupDragAndDropSort() {
    const list = document.getElementById('ch-wishlist-sortable-list');
    if (!list) return;
    
    let draggedItem = null;
    
    list.querySelectorAll('.drag-list-item').forEach(item => {
        item.addEventListener('dragstart', (e) => {
            draggedItem = item;
            item.classList.add('dragging');
        });
        
        item.addEventListener('dragend', (e) => {
            draggedItem = null;
            item.classList.remove('dragging');
            const newOrderIds = Array.from(list.querySelectorAll('.drag-list-item')).map(el => el.dataset.id);
            tempWishlistProducts = newOrderIds.map(id => tempWishlistProducts.find(p => p.id === id)).filter(Boolean);
        });
        
        item.addEventListener('dragover', (e) => {
            e.preventDefault();
            const afterElement = getDragAfterElement(list, e.clientY);
            if (afterElement == null) {
                list.appendChild(draggedItem);
            } else {
                list.insertBefore(draggedItem, afterElement);
            }
        });
    });
}

function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.drag-list-item:not(.dragging)')];
    
    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}

function submitExtendedWishlist() {
    const name = document.getElementById('ch-wl-name').value.trim();
    const desc = document.getElementById('ch-wl-desc').value.trim();
    const cover = document.getElementById('ch-wl-cover').value.trim();
    const cat = document.getElementById('ch-wl-category').value;
    const privacy = document.getElementById('ch-wl-privacy').value;

    if (!name) {
        showToast(t('wl_title_required'), 'error');
        return;
    }

    const productIds = tempWishlistProducts.map(p => p.id);
    store.createWishlistExtended(name, desc, cover, privacy, cat, productIds);

    closeCreationHub();
    showToast(t('toast_wishlist_created'), 'success');
    
    if (store.state.currentPage === 'profile' || store.state.currentPage === 'wishlist') {
        renderPage(store.state.currentPage);
    }
}
window.submitExtendedWishlist = submitExtendedWishlist;

/* ── MOODBOARD CREATION CANVAS BUILDERS ── */

function getMoodboardFormHTML() {
    return `
        <h3 style="font-size: 1.5rem; font-weight: 800; color: var(--text-primary); margin-bottom: var(--space-md); text-align: center;" data-i18n="ch_card_moodboard_title">${t('ch_card_moodboard_title')}</h3>
        
        <div style="display: flex; flex-direction: column; gap: var(--space-md);">
            <div class="form-group-minimal">
                <input type="text" id="ch-mb-title" placeholder="${t('ch_mb_title_placeholder')}" class="input-minimal" style="font-size:1.15rem; font-weight:700; border-radius: var(--radius-md); padding: 10px;">
            </div>

            <div class="form-group-minimal">
                <textarea id="ch-mb-desc" placeholder="${t('ch_mb_desc_placeholder')}" class="input-minimal" style="height: 60px; resize:none; border-radius: var(--radius-md); padding: 10px;"></textarea>
            </div>

            <div style="position:relative;">
                <div class="moodboard-canvas" id="ch-mb-canvas" style="height: 350px; background: var(--bg-secondary); border-radius: var(--radius-xl); border: 2px dashed var(--border-medium); overflow: hidden; position: relative;">
                    <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); color: var(--text-muted); text-align: center; pointer-events: none;" id="ch-mb-canvas-hint">
                        <i class="fas fa-palette" style="font-size: 2.5rem; margin-bottom: 8px; display: block;"></i>
                        <span data-i18n="ch_mb_canvas_hint">${t('ch_mb_canvas_hint')}</span>
                    </div>
                </div>
            </div>

            <div style="display: flex; gap: 6px; flex-wrap: wrap;">
                <select class="input-minimal" onchange="addExistingProductToMoodboard(this.value); this.value='';" style="flex:1; min-width: 150px; height: 38px; font-size: 0.8rem; padding: 6px; border-radius: var(--radius-md);">
                    <option value="">➕ ${t('ch_mb_btn_add_item')}</option>
                    ${store.state.products.map(p => `<option value="${p.id}">${p.brand} - ${p.name.substring(0, 25)}...</option>`).join('')}
                </select>
                <button class="btn btn-secondary btn-sm" onclick="promptExternalImageToMoodboard()" style="flex: 1; min-width: 150px; border-radius: var(--radius-md); font-size:0.8rem;">
                    🖼️ ${t('ch_mb_btn_add_image')}
                </button>
            </div>

            <div class="form-group-minimal">
                <input type="text" id="ch-mb-tags" placeholder="${t('ch_mb_tags_placeholder')}" class="input-minimal" style="border-radius: var(--radius-md); padding: 10px;">
            </div>

            <div style="display:flex; gap: var(--space-sm); margin-top: var(--space-md);">
                <button class="btn btn-secondary" onclick="showCreationChoiceScreen()" style="flex:1;">Geri</button>
                <button class="btn btn-primary" onclick="submitCreatedMoodboard()" style="flex:2;" data-i18n="ch_mb_btn_publish">${t('ch_mb_btn_publish')}</button>
            </div>
        </div>
    `;
}

function addMoodboardItem(item) {
    const hint = document.getElementById('ch-mb-canvas-hint');
    if (hint) hint.style.display = 'none';

    const canvas = document.getElementById('ch-mb-canvas');
    if (!canvas) return;

    const newItem = {
        id: 'item_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
        type: item.type,
        productId: item.productId || null,
        src: item.src || '',
        left: 50 + (tempMoodboardItems.length * 30) % 200,
        top: 50 + (tempMoodboardItems.length * 30) % 150,
        width: 120,
        zIndex: tempMoodboardItems.length + 1,
        rotation: 0
    };

    tempMoodboardItems.push(newItem);
    renderMoodboardCanvasItems();
}

function renderMoodboardCanvasItems() {
    const canvas = document.getElementById('ch-mb-canvas');
    if (!canvas) return;

    const hint = document.getElementById('ch-mb-canvas-hint');
    if (tempMoodboardItems.length === 0) {
        if (hint) hint.style.display = 'block';
    } else {
        if (hint) hint.style.display = 'none';
    }

    const oldItems = canvas.querySelectorAll('.moodboard-canvas-item');
    oldItems.forEach(el => el.remove());

    tempMoodboardItems.forEach(item => {
        const el = document.createElement('div');
        el.className = 'moodboard-canvas-item';
        el.style.left = item.left + 'px';
        el.style.top = item.top + 'px';
        el.style.width = item.width + 'px';
        el.style.zIndex = item.zIndex;
        el.style.transform = `rotate(${item.rotation}deg)`;
        el.dataset.id = item.id;

        const imgSrc = item.type === 'product' ? getProductById(item.productId)?.image : item.src;

        el.innerHTML = `
            <img src="${imgSrc || 'assets/logo.png'}" style="width: 100%; height: auto; border-radius: var(--radius-md); pointer-events: none; display: block;">
            <button class="delete-handle" onclick="event.stopPropagation(); deleteMoodboardItem('${item.id}')" style="position: absolute; top: -8px; right: -8px; width: 20px; height: 20px; border-radius: 50%; background: var(--accent-rose); color: white; display: flex; align-items: center; justify-content: center; font-size: 0.6rem; cursor: pointer; border: none;">
                <i class="fas fa-times"></i>
            </button>
            <div class="resize-handle" style="position: absolute; bottom: -5px; right: -5px; width: 12px; height: 12px; background: var(--primary); border-radius: 50%; cursor: se-resize; z-index: 10;"></div>
        `;

        setupItemInteractivity(el, item);
        canvas.appendChild(el);
    });
}

function deleteMoodboardItem(id) {
    tempMoodboardItems = tempMoodboardItems.filter(it => it.id !== id);
    renderMoodboardCanvasItems();
}
window.deleteMoodboardItem = deleteMoodboardItem;

function setupItemInteractivity(el, item) {
    let isDragging = false;
    let isResizing = false;
    let startX, startY;
    let startLeft, startTop, startWidth;

    const resizeHandle = el.querySelector('.resize-handle');

    el.addEventListener('mousedown', (e) => {
        if (e.target === resizeHandle || e.target.closest('.delete-handle')) {
            return;
        }
        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;
        startLeft = item.left;
        startTop = item.top;
        
        tempMoodboardItems.forEach(it => {
            if (it.id === item.id) {
                it.zIndex = tempMoodboardItems.length + 5;
            } else if (it.zIndex > item.zIndex) {
                it.zIndex--;
            }
        });
        el.style.zIndex = item.zIndex;
        
        e.preventDefault();
    });

    resizeHandle.addEventListener('mousedown', (e) => {
        isResizing = true;
        startX = e.clientX;
        startWidth = item.width;
        e.preventDefault();
        e.stopPropagation();
    });

    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            const dx = e.clientX - startX;
            const dy = e.clientY - startY;
            item.left = Math.max(0, startLeft + dx);
            item.top = Math.max(0, startTop + dy);
            el.style.left = item.left + 'px';
            el.style.top = item.top + 'px';
        } else if (isResizing) {
            const dx = e.clientX - startX;
            item.width = Math.max(40, startWidth + dx);
            el.style.width = item.width + 'px';
        }
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
        isResizing = false;
    });
}

function addExistingProductToMoodboard(productId) {
    if (!productId) return;
    addMoodboardItem({ type: 'product', productId: productId });
}
window.addExistingProductToMoodboard = addExistingProductToMoodboard;

function promptExternalImageToMoodboard() {
    const src = prompt(t('ch_form_add_product_image') || "Görsel URL girin:", "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=500");
    if (src && src.startsWith('http')) {
        addMoodboardItem({ type: 'image', src: src });
    }
}
window.promptExternalImageToMoodboard = promptExternalImageToMoodboard;

function submitCreatedMoodboard() {
    const title = document.getElementById('ch-mb-title').value.trim();
    const desc = document.getElementById('ch-mb-desc').value.trim();
    const tagsText = document.getElementById('ch-mb-tags').value.trim();

    if (!title) {
        showToast(t('wl_title_required'), 'error');
        return;
    }

    const hashtags = tagsText ? tagsText.split(' ').map(tag => tag.startsWith('#') ? tag : '#' + tag) : [];
    
    // Convert canvas coordinate mappings to products
    const cleanItems = tempMoodboardItems.map(it => ({
        id: it.productId || it.id,
        type: it.type,
        src: it.src,
        left: it.left,
        top: it.top,
        width: it.width,
        zIndex: it.zIndex
    }));

    store.createMoodboard(title, desc, cleanItems, hashtags);

    closeCreationHub();
    showToast(t('toast_moodboard_created'), 'success');

    if (store.state.currentPage === 'profile' || store.state.currentPage === 'inspiration') {
        renderPage(store.state.currentPage);
    }
}
window.submitCreatedMoodboard = submitCreatedMoodboard;

/* ── INSPIRATION POST BUILDERS ── */

function getInspirationPostFormHTML() {
    return `
        <h3 style="font-size: 1.5rem; font-weight: 800; color: var(--text-primary); margin-bottom: var(--space-md); text-align: center;" data-i18n="ch_card_post_title">${t('ch_card_post_title')}</h3>
        
        <div style="display: flex; flex-direction: column; gap: var(--space-md);">
            <div class="form-group-minimal">
                <input type="text" id="ch-post-title" placeholder="${t('ch_mb_title_placeholder')}" class="input-minimal" style="font-size:1.15rem; font-weight:700; border-radius: var(--radius-md); padding: 10px;">
            </div>

            <div class="form-group-minimal">
                <textarea id="ch-post-desc" placeholder="${t('ch_mb_desc_placeholder')}" class="input-minimal" style="height: 60px; resize:none; border-radius: var(--radius-md); padding: 10px;"></textarea>
            </div>

            <div class="form-group-minimal">
                <label style="font-size:0.85rem; font-weight:700; color:var(--text-muted); display:block; margin-bottom:4px;" data-i18n="ch_post_image">${t('ch_post_image')}</label>
                <input type="text" id="ch-post-images" placeholder="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=500" class="input-minimal" style="border-radius: var(--radius-md); padding: 10px;">
            </div>

            <div class="form-group-minimal">
                <label style="font-size:0.85rem; font-weight:700; color:var(--text-muted); display:block; margin-bottom:4px;" data-i18n="ch_post_topic">${t('ch_post_topic')}</label>
                <select id="ch-post-topic" class="input-minimal" style="border-radius: var(--radius-md); padding: 10px; height: 42px; width:100%;">
                    <option value="combo">${t('ch_post_topic_combo')}</option>
                    <option value="discovery">${t('ch_post_topic_discovery')}</option>
                    <option value="share">${t('ch_post_topic_share')}</option>
                    <option value="street">${t('ch_post_topic_street')}</option>
                    <option value="minimal">${t('ch_post_topic_minimal')}</option>
                    <option value="favs">${t('ch_post_topic_favs')}</option>
                </select>
            </div>

            <div class="grid-3" style="gap: var(--space-sm);">
                <div class="form-group-minimal">
                    <label style="font-size:0.75rem; font-weight:700; color:var(--text-muted); display:block; margin-bottom:4px;" data-i18n="ch_post_wishlist_tag">${t('ch_post_wishlist_tag')}</label>
                    <select id="ch-post-wl-tag" class="input-minimal" style="font-size: 0.8rem; padding: 8px; width:100%; height:36px;">
                        <option value="">-</option>
                        ${store.getUserWishlists(store.state.currentUser?.id || 'guest').map(w => `<option value="${w.id}">${w.title}</option>`).join('')}
                    </select>
                </div>
                <div class="form-group-minimal">
                    <label style="font-size:0.75rem; font-weight:700; color:var(--text-muted); display:block; margin-bottom:4px;" data-i18n="ch_post_moodboard_tag">${t('ch_post_moodboard_tag')}</label>
                    <select id="ch-post-mb-tag" class="input-minimal" style="font-size: 0.8rem; padding: 8px; width:100%; height:36px;">
                        <option value="">-</option>
                        ${store.state.moodboardPosts.filter(p => p.userId === (store.state.currentUser?.id || 'guest') && p.items).map(m => `<option value="${m.id}">${m.title}</option>`).join('')}
                    </select>
                </div>
                <div class="form-group-minimal">
                    <label style="font-size:0.75rem; font-weight:700; color:var(--text-muted); display:block; margin-bottom:4px;" data-i18n="ch_post_product_tag">${t('ch_post_product_tag')}</label>
                    <select id="ch-post-prod-tag" class="input-minimal" style="font-size: 0.8rem; padding: 8px; width:100%; height:36px;">
                        <option value="">-</option>
                        ${store.state.products.map(p => `<option value="${p.id}">${p.brand} - ${p.name.substring(0, 15)}...</option>`).join('')}
                    </select>
                </div>
            </div>

            <div class="form-group-minimal">
                <input type="text" id="ch-post-tags" placeholder="${t('ch_mb_tags_placeholder')}" class="input-minimal" style="border-radius: var(--radius-md); padding: 10px;">
            </div>

            <div style="display:flex; gap: var(--space-sm); margin-top: var(--space-md);">
                <button class="btn btn-secondary" onclick="showCreationChoiceScreen()" style="flex:1;">Geri</button>
                <button class="btn btn-primary" onclick="submitInspirationPost()" style="flex:2;" data-i18n="ch_mb_btn_publish">${t('ch_mb_btn_publish')}</button>
            </div>
        </div>
    `;
}

function submitInspirationPost() {
    const title = document.getElementById('ch-post-title').value.trim();
    const desc = document.getElementById('ch-post-desc').value.trim();
    const imagesText = document.getElementById('ch-post-images').value.trim();
    const topicVal = document.getElementById('ch-post-topic').value;
    const wlTag = document.getElementById('ch-post-wl-tag').value;
    const mbTag = document.getElementById('ch-post-mb-tag').value;
    const prodTag = document.getElementById('ch-post-prod-tag').value;
    const tagsText = document.getElementById('ch-post-tags').value.trim();

    if (!title) {
        showToast(t('wl_title_required'), 'error');
        return;
    }

    const images = imagesText ? imagesText.split(',').map(s => s.trim()).filter(Boolean) : [];
    const wishlistIds = wlTag ? [wlTag] : [];
    const moodboardIds = mbTag ? [mbTag] : [];
    const productIds = prodTag ? [prodTag] : [];
    const hashtags = tagsText ? tagsText.split(' ').map(tag => tag.startsWith('#') ? tag : '#' + tag) : [];

    const topicLabel = t('ch_post_topic_' + topicVal);

    store.createInspirationPost(title, desc, images, wishlistIds, moodboardIds, productIds, hashtags, topicLabel);

    closeCreationHub();
    showToast(t('toast_post_created'), 'success');

    if (store.state.currentPage === 'profile' || store.state.currentPage === 'inspiration') {
        renderPage(store.state.currentPage);
    }
}
window.submitInspirationPost = submitInspirationPost;

/* ── COLLECTION BUILDERS ── */

function getCollectionFormHTML() {
    const userWishlists = store.getUserWishlists(store.state.currentUser?.id || 'guest');
    const userMoodboards = store.state.moodboardPosts.filter(p => p.userId === (store.state.currentUser?.id || 'guest') && p.items);

    return `
        <h3 style="font-size: 1.5rem; font-weight: 800; color: var(--text-primary); margin-bottom: var(--space-md); text-align: center;" data-i18n="ch_card_collection_title">${t('ch_card_collection_title')}</h3>
        
        <div style="display: flex; flex-direction: column; gap: var(--space-md);">
            <div class="form-group-minimal">
                <label style="font-size:0.85rem; font-weight:700; color:var(--text-muted); display:block; margin-bottom:4px;" data-i18n="ch_col_name">${t('ch_col_name')}</label>
                <input type="text" id="ch-col-name" placeholder="Paris Trip Capsule ✈️" class="input-minimal" style="border-radius: var(--radius-md); padding: 10px;">
            </div>

            <div class="form-group-minimal">
                <label style="font-size:0.85rem; font-weight:700; color:var(--text-muted); display:block; margin-bottom:4px;" data-i18n="ch_form_desc">${t('ch_form_desc')}</label>
                <textarea id="ch-col-desc" placeholder="${t('wl_create_desc_placeholder')}" class="input-minimal" style="height: 60px; resize:none; border-radius: var(--radius-md); padding: 10px;"></textarea>
            </div>

            <div class="form-group-minimal">
                <label style="font-size:0.85rem; font-weight:700; color:var(--text-muted); display:block; margin-bottom:4px;" data-i18n="ch_form_cover">${t('ch_form_cover')}</label>
                <input type="text" id="ch-col-cover" placeholder="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=500" class="input-minimal" style="border-radius: var(--radius-md); padding: 10px;">
            </div>

            <div class="form-group-minimal" style="max-height: 250px; overflow-y: auto; border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); padding: var(--space-md); background: var(--bg-secondary); display:flex; flex-direction:column; gap: var(--space-md);">
                <div>
                    <label style="font-size:0.8rem; font-weight:700; color:var(--text-primary); display:block; margin-bottom:6px;" data-i18n="ch_col_select_w">${t('ch_col_select_w')}</label>
                    ${userWishlists.length > 0 ? userWishlists.map(w => `
                        <label style="display:flex; align-items:center; gap:8px; font-size:0.85rem; cursor:pointer; margin-bottom:4px;">
                            <input type="checkbox" name="ch-col-wishlists" value="${w.id}">
                            <span><i class="fas fa-heart" style="color:var(--primary);"></i> ${w.title}</span>
                        </label>
                    `).join('') : `<p style="font-size:0.75rem; color:var(--text-muted);">-</p>`}
                </div>

                <div>
                    <label style="font-size:0.8rem; font-weight:700; color:var(--text-primary); display:block; margin-bottom:6px;" data-i18n="ch_col_select_m">${t('ch_col_select_m')}</label>
                    ${userMoodboards.length > 0 ? userMoodboards.map(m => `
                        <label style="display:flex; align-items:center; gap:8px; font-size:0.85rem; cursor:pointer; margin-bottom:4px;">
                            <input type="checkbox" name="ch-col-moodboards" value="${m.id}">
                            <span><i class="fas fa-images" style="color:var(--primary);"></i> ${m.title}</span>
                        </label>
                    `).join('') : `<p style="font-size:0.75rem; color:var(--text-muted);">-</p>`}
                </div>
            </div>

            <div style="display:flex; gap: var(--space-sm); margin-top: var(--space-md);">
                <button class="btn btn-secondary" onclick="showCreationChoiceScreen()" style="flex:1;">Geri</button>
                <button class="btn btn-primary" onclick="submitCreatedCollection()" style="flex:2;" data-i18n="ch_form_btn_create">${t('ch_form_btn_create')}</button>
            </div>
        </div>
    `;
}

function submitCreatedCollection() {
    const name = document.getElementById('ch-col-name').value.trim();
    const desc = document.getElementById('ch-col-desc').value.trim();
    const cover = document.getElementById('ch-col-cover').value.trim();

    if (!name) {
        showToast(t('wl_title_required'), 'error');
        return;
    }

    const wlCheckboxes = Array.from(document.querySelectorAll('input[name="ch-col-wishlists"]:checked'));
    const mbCheckboxes = Array.from(document.querySelectorAll('input[name="ch-col-moodboards"]:checked'));
    
    const wishlistIds = wlCheckboxes.map(box => box.value);
    const moodboardIds = mbCheckboxes.map(box => box.value);

    store.createCollection(name, desc, cover, wishlistIds, moodboardIds, []);

    closeCreationHub();
    showToast(t('toast_collection_created'), 'success');

    if (store.state.currentPage === 'profile') {
        renderPage('profile');
    }
}
window.submitCreatedCollection = submitCreatedCollection;

