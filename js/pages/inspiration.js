/* ═══════════════════════════════════════════════════════
   WISHLIST HUB - Inspiration Corner Page
   ═══════════════════════════════════════════════════════ */

function renderInspirationPage() {
    const selectedFilter = 'all';

    return `
        <section class="section page-enter">
            <!-- Header -->
            <div style="text-align: center; margin-bottom: var(--space-2xl);">
                <h1 style="font-size: 2.2rem; font-weight: 800; margin-bottom: var(--space-sm);">
                    💡 İlham Köşesi
                </h1>
                <p style="color: var(--text-secondary); max-width: 500px; margin: 0 auto;">
                    Stil önerileri, trend kombinler, kullanıcı paylaşımları ve hediye fikirleri
                </p>
            </div>

            <!-- Filter Tabs -->
            <div class="filter-tabs" style="justify-content: center; margin-bottom: var(--space-2xl);">
                <button class="filter-tab active" onclick="filterInspiration('all', this)">Tümü</button>
                <button class="filter-tab" onclick="filterInspiration('Moda', this)">👗 Moda</button>
                <button class="filter-tab" onclick="filterInspiration('Teknoloji', this)">💻 Teknoloji</button>
                <button class="filter-tab" onclick="filterInspiration('Güzellik', this)">💄 Güzellik</button>
                <button class="filter-tab" onclick="filterInspiration('Stil', this)">✨ Stil</button>
                <button class="filter-tab" onclick="filterInspiration('Gaming', this)">🎮 Gaming</button>
                <button class="filter-tab" onclick="filterInspiration('Lifestyle', this)">🏠 Lifestyle</button>
            </div>

            <!-- Featured Post -->
            <div style="margin-bottom: var(--space-2xl);">
                <div class="blog-card hover-lift" style="display: grid; grid-template-columns: 1fr 1fr; overflow: hidden;" onclick="viewBlogPost('b6')">
                    <div style="background: ${getProductColor(5)}; display:flex; align-items:center; justify-content:center; min-height: 300px;">
                        <span style="font-size: 6rem; filter: drop-shadow(0 4px 12px rgba(0,0,0,0.3));">🎁</span>
                    </div>
                    <div class="blog-card-body" style="display: flex; flex-direction: column; justify-content: center; padding: var(--space-2xl);">
                        <span class="blog-card-tag" style="align-self: flex-start; margin-bottom: var(--space-md);">ÖNE ÇIKAN</span>
                        <h2 style="font-size: 1.8rem; font-weight: 800; margin-bottom: var(--space-md);">Hediye Seçme Rehberi</h2>
                        <p style="font-size: 1rem; color: var(--text-secondary); line-height: 1.7; margin-bottom: var(--space-lg);">
                            Sevdiklerinize en güzel hediyeleri seçmek için ipuçları ve öneriler. 
                            AI destekli kişisel hediye önerilerimizle herkes için mükemmel hediyeyi bulun.
                        </p>
                        <div class="blog-card-footer">
                            <div class="blog-card-author">
                                <div style="width:36px; height:36px; border-radius:50%; background: var(--primary); display:flex; align-items:center; justify-content:center;">💃</div>
                                <span>Elif Aktaş</span>
                            </div>
                            <div class="blog-card-stats">
                                <span><i class="fas fa-heart"></i> 890</span>
                                <span><i class="fas fa-comment"></i> 156</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Blog Grid (Masonry) -->
            <div id="inspiration-grid" class="inspiration-masonry">
                ${SAMPLE_BLOG_POSTS.map(post => renderBlogCard(post)).join('')}
            </div>

            <!-- Style Tips from AI -->
            ${store.state.isLoggedIn ? `
                <div style="margin-top: var(--space-2xl);">
                    <div class="section-header">
                        <div style="display: flex; align-items: center; gap: var(--space-sm);">
                            <h2 class="section-title">🤖 AI Stil Önerileri</h2>
                            <span class="ai-badge"><i class="fas fa-robot"></i> Sana Özel</span>
                        </div>
                    </div>
                    <div class="grid-4">
                        ${aiEngine.getStyleTips().map(tip => `
                            <div class="feature-card reveal">
                                <div style="font-size: 2.5rem; margin-bottom: var(--space-md);">${tip.emoji}</div>
                                <h3 class="feature-title">${tip.title}</h3>
                                <p class="feature-desc">${tip.desc}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>
            ` : ''}

            <!-- Popular Collections -->
            <div style="margin-top: var(--space-2xl);">
                <div class="section-header">
                    <div>
                        <h2 class="section-title">⭐ Popüler Koleksiyonlar</h2>
                        <p class="section-subtitle">En beğenilen kullanıcı koleksiyonları</p>
                    </div>
                    <button class="btn btn-ghost btn-sm" onclick="navigateTo('wishlist')">
                        Tümünü Gör <i class="fas fa-chevron-right"></i>
                    </button>
                </div>
                <div class="grid-3">
                    ${store.getPopularWishlists(3).map(w => renderWishlistCard(w)).join('')}
                </div>
            </div>

            <!-- Challenges -->
            <div style="margin-top: var(--space-2xl);">
                <div class="section-header">
                    <div>
                        <h2 class="section-title">🏆 Aktif Challenge'lar</h2>
                        <p class="section-subtitle">Katıl, yarış, kazan!</p>
                    </div>
                </div>
                <div class="grid-3">
                    ${SAMPLE_CHALLENGES.map(ch => renderChallengeCard(ch)).join('')}
                </div>
            </div>
        </section>
        ${renderFooter()}
    `;
}

function filterInspiration(category, btn) {
    // Update active tab
    document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
    btn.classList.add('active');

    // Filter grid
    const grid = document.getElementById('inspiration-grid');
    if (grid) {
        const filteredPosts = category === 'all'
            ? SAMPLE_BLOG_POSTS
            : SAMPLE_BLOG_POSTS.filter(p => p.category === category);

        grid.innerHTML = filteredPosts.map(post => renderBlogCard(post)).join('');
    }
}

function viewBlogPost(postId) {
    const post = SAMPLE_BLOG_POSTS.find(p => p.id === postId);
    if (post) {
        showToast(`"${post.title}" yazısı açılıyor...`, 'info');
    }
}
