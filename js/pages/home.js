/* ═══════════════════════════════════════════════════════
   WISHLIST HUB - Home Page
   ═══════════════════════════════════════════════════════ */

function renderHomePage() {
    let content = '';

    // Main Hero - Landing section for all
    content += renderHeroSection();

    // Platform Features
    content += renderFeaturesSection();

    // AI Showcase removed as requested

    // Featured Wishlists
    content += renderFeaturedWishlists();

    // Popular Users (Community Showcase)
    content += renderPopularUsers();



    // CTA Section
    content += renderCTASection();

    // Footer
    content += renderFooter();

    return content;
}

function renderHeroSection() {
    return `
        <section class="hero-section">
            <div class="hero-bg">
                <div class="hero-orb hero-orb-1"></div>
                <div class="hero-orb hero-orb-2"></div>
                <div class="hero-orb hero-orb-3"></div>
            </div>
            <div class="hero-content">
                <h1 class="hero-title" style="font-size: 3.5rem; letter-spacing: -1px; margin-bottom: var(--space-lg);">
                    ${t('home_hero_title')}
                </h1>
                <p class="hero-description" style="font-size: 1.2rem;">
                    ${t('home_hero_desc')}
                </p>
            </div>
        </section>
    `;
}

function renderAIShowcaseSection() {
    return ''; // Removed as requested
}

function renderHomeSection(section) {
    let itemsHtml = '';

    switch (section.type) {
        case 'products':
            itemsHtml = `
                <div class="ai-carousel">
                    ${section.items.map(p => `
                        <div style="width: 260px;">${renderProductCard(p)}</div>
                    `).join('')}
                </div>
            `;
            break;
        case 'tips':
            itemsHtml = `
                <div class="grid-4">
                    ${section.items.map(tip => `
                        <div class="feature-card reveal">
                            <div style="font-size: 2rem; margin-bottom: var(--space-md);">${tip.emoji}</div>
                            <h3 class="feature-title">${tip.title}</h3>
                            <p class="feature-desc">${tip.desc}</p>
                        </div>
                    `).join('')}
                </div>
            `;
            break;
        case 'combos':
            itemsHtml = `
                <div class="ai-carousel">
                    ${section.items.map(combo => `
                        <div style="width: 200px; background: var(--gradient-card); border: 1px solid var(--border-subtle); border-radius: var(--radius-xl); padding: var(--space-md); cursor: pointer;" class="hover-lift" onclick="navigateTo('combohub')">
                            <div style="display: flex; flex-direction: column; gap: 4px; margin-bottom: var(--space-md);">
                                ${combo.items.map(item => `
                                    <div style="height: 60px; background: ${item.color}20; border-radius: var(--radius-sm); display:flex; align-items:center; justify-content:center;">
                                        <span style="font-size: 1.5rem;">${item.emoji}</span>
                                    </div>
                                `).join('')}
                            </div>
                            <p style="font-size: 0.85rem; font-weight: 600; text-align: center;">${combo.name}</p>
                            <p style="font-size: 0.7rem; color: var(--text-muted); text-align: center;">${combo.style}</p>
                        </div>
                    `).join('')}
                </div>
            `;
            break;
    }

    return `
        <section class="section">
            <div class="section-header">
                <div>
                    <div style="display: flex; align-items: center; gap: var(--space-sm);">
                        <h2 class="section-title">${section.title}</h2>
                        ${section.aiPowered ? '<span class="ai-badge"><i class="fas fa-robot"></i> AI</span>' : ''}
                    </div>
                    <p class="section-subtitle">${section.subtitle}</p>
                </div>
                <button class="btn btn-ghost btn-sm">
                    ${t('comp_see_all')} <i class="fas fa-chevron-right"></i>
                </button>
            </div>
            ${itemsHtml}
        </section>
    `;
}

function renderFeaturedWishlists() {
    const wishlists = store.getPopularWishlists(6);
    return `
        <section class="section">
            <div class="section-header">
                <div>
                    <h2 class="section-title">${t('home_featured_wishlists')}</h2>
                    <p class="section-subtitle">${t('tr_popular_wishlists_desc')}</p>
                </div>
                <button class="btn btn-ghost btn-sm" onclick="navigateTo('wishlist')">
                    ${t('comp_see_all')} <i class="fas fa-chevron-right"></i>
                </button>
            </div>
            <div class="grid-3">
                ${wishlists.map(w => renderWishlistCard(w)).join('')}
            </div>
        </section>
    `;
}

function renderPopularUsers() {
    return `
        <section class="section" style="background: var(--bg-secondary); border-radius: var(--radius-xl); padding: var(--space-3xl) var(--space-xl);">
            <div class="section-header" style="text-align: center; justify-content: center; margin-bottom: var(--space-2xl);">
                <div style="max-width: 600px; margin: 0 auto;">
                    <h2 class="section-title" style="font-size: 2.5rem; margin-bottom: var(--space-sm);">${t('home_icons_title')}</h2>
                    <p class="section-subtitle" style="font-size: 1.1rem;">${t('home_icons_desc')}</p>
                </div>
            </div>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: var(--space-xl); justify-items: center;">
                ${SAMPLE_USERS.slice(0, 4).map(u => `
                    <div style="display: flex; flex-direction: column; align-items: center; text-align: center; cursor: pointer;" onclick="viewUserProfile('${u.id}')">
                        <div style="width: 120px; height: 120px; border-radius: 50%; background: var(--bg-card); box-shadow: var(--shadow-md); overflow: hidden; display: flex; align-items: center; justify-content: center; margin-bottom: var(--space-md); transition: transform 0.3s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                            ${u.avatar ? 
                                `<img src="${u.avatar}" alt="${u.name}" style="width: 100%; height: 100%; object-fit: cover;">` : 
                                `<i class="fas fa-user" style="font-size: 3rem; color: var(--text-muted);"></i>`
                            }
                        </div>
                        <h4 style="font-size: 1.1rem; font-weight: 600; color: var(--text-primary); margin-bottom: 4px;">${u.name}</h4>
                        <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: var(--space-sm);">${u.username}</p>
                        <button class="btn btn-secondary btn-sm" style="border-radius: var(--radius-full); padding: 6px 20px;">${t('home_follow')}</button>
                    </div>
                `).join('')}
            </div>
        </section>
    `;
}



function renderFeaturesSection() {
    return `
        <section class="section">
            <!-- Feature 1: Wishlist Sistemi -->
            <div class="feature-block" onclick="navigateTo('wishlist')" style="display: flex; align-items: center; gap: var(--space-xl); margin-bottom: 100px; flex-wrap: wrap;">
                <div style="flex: 1.2; min-width: 300px;">
                    <h2 style="font-size: 2.8rem; line-height: 1.2; margin: 0; color: var(--text-primary);">${t('home_feature_1_title')}</h2>
                </div>
                <div class="feature-image-container" style="flex: 1; min-width: 300px; overflow: hidden; border-radius: 30px; box-shadow: var(--shadow-lg); height: 500px;">
                    <img src="assets/feature_wishlist.jpg" alt="Wishlist" style="width: 100%; height: 100%; object-fit: cover; object-position: center;">
                </div>
            </div>

            <!-- Feature 2: Sosyal Paylaşım & Hediyeleşme -->
            <div class="feature-block" onclick="navigateTo('inspiration')" style="display: flex; align-items: center; gap: var(--space-xl); margin-bottom: 100px; flex-wrap: wrap-reverse;">
                <div class="feature-image-container" style="flex: 1; min-width: 300px; overflow: hidden; border-radius: 30px; box-shadow: var(--shadow-lg); height: 500px;">
                    <img src="assets/feature_inspiration.jpg" alt="Inspiration" style="width: 100%; height: 100%; object-fit: cover; object-position: center top;">
                </div>
                <div style="flex: 1.2; min-width: 300px;">
                    <h2 style="font-size: 2.8rem; line-height: 1.2; margin: 0; color: var(--text-primary);">${t('home_feature_2_title')}</h2>
                </div>
            </div>

            <!-- Feature 3: Kişiselleştirme & İlham -->
            <div class="feature-block" onclick="navigateTo('trends')" style="display: flex; align-items: center; gap: var(--space-xl); flex-wrap: wrap;">
                <div style="flex: 1.2; min-width: 300px;">
                    <h2 style="font-size: 2.8rem; line-height: 1.2; margin: 0; color: var(--text-primary);">${t('home_feature_3_title')}</h2>
                </div>
                <div class="feature-image-container" style="flex: 1; min-width: 300px; overflow: hidden; border-radius: 30px; box-shadow: var(--shadow-lg); height: 500px;">
                    <img src="assets/feature_style.jpg" alt="Style" style="width: 100%; height: 100%; object-fit: cover; object-position: center;">
                </div>
            </div>
        </section>
    `;
}

function renderCTASection() {
    return `
        <section class="section" style="padding-top: 0;">
            <div style="text-align: center; background: var(--bg-card); border-radius: 40px; padding: 80px 40px; box-shadow: var(--shadow-xl); margin-top: var(--space-xl);">
                <h2 style="font-size: 3.5rem; margin-bottom: var(--space-md); color: var(--text-primary);">${t('home_cta_title')}</h2>
                <p style="font-size: 1.2rem; color: var(--text-secondary); max-width: 600px; margin: 0 auto var(--space-xl) auto;">
                    ${t('home_cta_desc')}
                </p>
                <button class="btn btn-primary btn-lg" style="font-size: 1.2rem; padding: 15px 50px; border-radius: var(--radius-full);" onclick="openAuthModal()">
                    ${t('home_cta_btn')}
                </button>
            </div>
        </section>
    `;
}

function renderFooter() {
    return `
        <footer class="app-footer">
            <div class="footer-content">
                <div class="footer-brand">
                    <div class="logo-text">
                        <img src="assets/logo.png" alt="Logo" style="height: 24px; margin-right: 8px;">
                        Wishlist<span class="logo-highlight">Hub</span>
                    </div>
                    <p>${t('footer_desc')}</p>
                    <div class="footer-social">
                        <a href="https://www.instagram.com/wiishlisthub?igsh=MWppZmxwYWp2d216MQ==" target="_blank" rel="noopener noreferrer"><i class="fab fa-instagram"></i></a>
                        <a href="#"><i class="fab fa-twitter"></i></a>
                        <a href="https://www.tiktok.com/@wiishlisthub?_r=1&_t=ZS-96W4OYA3pb8" target="_blank" rel="noopener noreferrer"><i class="fab fa-tiktok"></i></a>
                        <a href="#"><i class="fab fa-youtube"></i></a>
                    </div>
                </div>
                <div class="footer-col">
                    <h4>${t('footer_platform')}</h4>
                    <a href="#" onclick="navigateTo('wishlist')">${t('nav_wishlist')}</a>
                    <a href="#" onclick="navigateTo('trends')">${t('nav_trends')}</a>
                    <a href="#" onclick="navigateTo('inspiration')">${t('nav_inspiration')}</a>
                </div>
                <div class="footer-col">
                    <h4>${t('footer_company')}</h4>
                    <a href="#">${t('footer_about')}</a>
                    <a href="#">${t('footer_careers')}</a>
                    <a href="#">${t('footer_blog')}</a>
                    <a href="#" onclick="event.preventDefault(); openContactModal();">${t('footer_contact')}</a>
                </div>
                <div class="footer-col">
                    <h4>${t('footer_support')}</h4>
                    <a href="#">${t('footer_faq')}</a>
                    <a href="#">${t('footer_privacy')}</a>
                    <a href="#">${t('footer_terms')}</a>
                    <a href="#">${t('footer_security')}</a>
                </div>
            </div>
            <div class="footer-bottom">
                <span>${t('footer_rights')}</span>
                <span>Made with ❤️ in Turkey</span>
            </div>
        </footer>
    `;
}
