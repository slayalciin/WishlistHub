/* ═══════════════════════════════════════════════════════
   WISHLIST HUB - Trends / Discover Page
   ═══════════════════════════════════════════════════════ */

function renderTrendsPage() {
    const trendAnalysis = aiEngine.getTrendAnalysis();
    const trendingProducts = aiEngine.getTrendingProducts(8);

    return `
        <section class="section page-enter">
            <!-- Header -->
            <div class="trends-hero">
                <div class="trends-hero-icon">🔥</div>
                <div class="trends-hero-content">
                    <h2>Trendler & Keşfet</h2>
                    <p>AI destekli trend analizleri ve popüler ürünler</p>
                </div>
                <span class="ai-badge" style="margin-left: auto;"><i class="fas fa-robot"></i> AI Analiz</span>
            </div>

            <!-- Category Trends Chart -->
            <div class="trends-chart reveal">
                <h3 style="font-size: 1.1rem; font-weight: 700; margin-bottom: var(--space-lg);">
                    📊 Kategori Trendleri
                </h3>
                <div class="chart-bars">
                    ${trendAnalysis.topCategories.map(cat => {
        const maxCount = Math.max(...trendAnalysis.topCategories.map(c => c.count));
        const height = (cat.count / maxCount) * 100;
        return `
                            <div class="chart-bar-wrapper">
                                <div class="chart-bar" style="height: ${height}%;">
                                    <span class="chart-bar-value">${formatNumber(cat.count)}</span>
                                </div>
                                <span class="chart-bar-label">${cat.name}</span>
                            </div>
                        `;
    }).join('')}
                </div>
            </div>

            <!-- Weekly Trends -->
            <div style="margin-bottom: var(--space-2xl);">
                <div class="section-header">
                    <div>
                        <h2 class="section-title">📈 Haftalık Trend Listesi</h2>
                        <p class="section-subtitle">Bu hafta en çok yükselen ürünler</p>
                    </div>
                </div>
                <div class="grid-2">
                    ${trendAnalysis.weeklyTrends.map(trend => renderTrendCard(trend)).join('')}
                </div>
            </div>



            <!-- Trending Products -->
            <div style="margin-bottom: var(--space-2xl);">
                <div class="section-header">
                    <div>
                        <h2 class="section-title">🛍️ Trend Ürünler</h2>
                        <p class="section-subtitle">En çok eklenen ve beğenilen ürünler</p>
                    </div>
                </div>
                <div class="grid-4">
                    ${trendingProducts.map(p => renderProductCard(p)).join('')}
                </div>
            </div>

            <!-- Popular Wishlists -->
            <div style="margin-bottom: var(--space-2xl);">
                <div class="section-header">
                    <div>
                        <h2 class="section-title">⭐ Popüler Wishlistler</h2>
                        <p class="section-subtitle">En çok beğenilen istek listeleri</p>
                    </div>
                </div>
                <div class="grid-3">
                    ${store.getPopularWishlists(6).map(w => renderWishlistCard(w)).join('')}
                </div>
            </div>

            <!-- Insights -->
            ${store.state.isLoggedIn ? `
                <div style="margin-bottom: var(--space-2xl);">
                    <div class="section-header">
                        <div style="display: flex; align-items: center; gap: var(--space-sm);">
                            <h2 class="section-title">💡 Kişisel İçgörüler</h2>
                            <span class="ai-badge"><i class="fas fa-robot"></i> AI</span>
                        </div>
                    </div>
                    <div class="grid-4">
                        ${trendAnalysis.insights.map(insight => `
                            <div class="feature-card reveal">
                                <div style="font-size: 2rem; margin-bottom: var(--space-md);">${insight.emoji}</div>
                                <p style="font-size: 0.9rem; color: var(--text-secondary);">${insight.text}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>
            ` : ''}

            <!-- Popular Users -->
            <div>
                <div class="section-header">
                    <div>
                        <h2 class="section-title">👥 Popüler Kullanıcılar</h2>
                        <p class="section-subtitle">En çok takip edilen kullanıcılar</p>
                    </div>
                </div>
                <div class="grid-4">
                    ${SAMPLE_USERS.slice(0, 4).map(u => renderUserCard(u)).join('')}
                </div>
            </div>
        </section>
        ${renderFooter()}
    `;
}
