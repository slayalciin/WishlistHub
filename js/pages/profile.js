/* ═══════════════════════════════════════════════════════
   WISHLIST HUB - Profile Page
   ═══════════════════════════════════════════════════════ */

let profileTab = 'wishlists';
let viewingUserId = null;

function renderProfilePage() {
    const isLoggedIn = store.state.isLoggedIn;

    if (!isLoggedIn && !viewingUserId) {
        return `
            <section class="section page-enter">
                ${renderEmptyState('🔒', 'Giriş Yapın', 'Profilinizi görüntülemek için giriş yapmanız gerekiyor.', 'Giriş Yap', 'openAuthModal()')}
            </section>
        `;
    }

    const userId = viewingUserId || store.state.currentUser?.id;
    const user = getUserById(userId) || store.state.currentUser;

    if (!user) {
        return `
            <section class="section page-enter">
                ${renderEmptyState('❌', 'Kullanıcı bulunamadı', 'Bu kullanıcı profili mevcut değil.')}
            </section>
        `;
    }

    const isOwn = store.state.currentUser?.id === userId;
    const wishlists = store.getUserWishlists(userId);
    const isFollowed = store.state.followedUsers.has(userId);
    const giftSuggestions = isOwn ? [] : aiEngine.getGiftRecommendations(userId);

    return `
        <section class="section page-enter">
            ${viewingUserId ? `
                <button class="btn btn-ghost" onclick="viewingUserId = null; navigateTo('profile')" style="margin-bottom: var(--space-lg);">
                    <i class="fas fa-arrow-left"></i> Geri
                </button>
            ` : ''}

            <!-- Profile Header -->
            <div class="profile-header">
                <div class="profile-cover">
                    <div style="width:100%; height:100%; background: var(--bg-tertiary); opacity: 0.7;"></div>
                </div>
                <div class="profile-info">
                    <div class="profile-avatar">
                        <div style="width:100%; height:100%; background: var(--primary); display:flex; align-items:center; justify-content:center; font-size: 3.5rem;">
                            ${user.avatarEmoji}
                        </div>
                    </div>
                    <div class="profile-details">
                        <h1 class="profile-name">
                            ${user.name}
                            ${user.verified ? '<i class="fas fa-check-circle" style="color: var(--primary); font-size: 1rem;"></i>' : ''}
                        </h1>
                        <p class="profile-handle">${user.username}</p>
                        <p class="profile-bio">${user.bio}</p>
                        <div class="profile-stats-row">
                            <div class="profile-stat">
                                <strong>${formatNumber(user.followers)}</strong>
                                <span>Takipçi</span>
                            </div>
                            <div class="profile-stat">
                                <strong>${formatNumber(user.following)}</strong>
                                <span>Takip</span>
                            </div>
                            <div class="profile-stat">
                                <strong>${wishlists.length}</strong>
                                <span>Liste</span>
                            </div>
                        </div>
                    </div>
                    <div class="profile-actions">
                        ${isOwn ? `
                            <button class="btn btn-secondary" onclick="showToast('Profil düzenleme yakında!', 'info')">
                                <i class="fas fa-edit"></i> Düzenle
                            </button>
                            <button class="btn btn-ghost" onclick="handleLogout()">
                                <i class="fas fa-sign-out-alt"></i>
                            </button>
                        ` : `
                            <button class="btn ${isFollowed ? 'btn-secondary' : 'btn-primary'}" onclick="handleFollow('${userId}')">
                                <i class="fas fa-${isFollowed ? 'check' : 'user-plus'}"></i>
                                ${isFollowed ? 'Takip Ediliyor' : 'Takip Et'}
                            </button>
                            <button class="btn btn-secondary" onclick="showToast('Mesaj özelliği yakında!', 'info')">
                                <i class="fas fa-envelope"></i>
                            </button>
                        `}
                    </div>
                </div>
            </div>

            <!-- Interest Tags -->
            <div style="display: flex; gap: var(--space-sm); flex-wrap: wrap; margin-bottom: var(--space-xl);">
                ${(user.interests || []).map(interest => {
        const cat = CATEGORIES.find(c => c.id === interest);
        return cat ? `<span class="tag tag-primary">${cat.icon} ${cat.name}</span>` : '';
    }).join('')}
            </div>

            <!-- Profile Tabs -->
            <div class="profile-tabs">
                <button class="profile-tab ${profileTab === 'wishlists' ? 'active' : ''}" 
                        onclick="switchProfileTab('wishlists')">
                    <i class="fas fa-heart"></i> Wishlistler
                </button>
                <button class="profile-tab ${profileTab === 'activity' ? 'active' : ''}" 
                        onclick="switchProfileTab('activity')">
                    <i class="fas fa-chart-line"></i> Aktivite
                </button>
                ${!isOwn ? `
                    <button class="profile-tab ${profileTab === 'gifts' ? 'active' : ''}" 
                            onclick="switchProfileTab('gifts')">
                        <i class="fas fa-gift"></i> Hediye Önerileri
                    </button>
                ` : ''}
                ${isOwn ? `
                    <button class="profile-tab ${profileTab === 'panel' ? 'active' : ''}" 
                            onclick="switchProfileTab('panel')">
                        <i class="fas fa-cog"></i> Kullanıcı Paneli
                    </button>
                ` : ''}
            </div>

            <!-- Tab Content -->
            <div id="profile-tab-content">
                ${renderProfileTabContent(userId, isOwn, wishlists, giftSuggestions)}
            </div>
        </section>
        ${renderFooter()}
    `;
}

function renderProfileTabContent(userId, isOwn, wishlists, giftSuggestions) {
    switch (profileTab) {
        case 'wishlists':
            return wishlists.length > 0 ? `
                <div class="grid-3">
                    ${wishlists.map(w => renderWishlistCard(w, { showUser: false })).join('')}
                </div>
            ` : renderEmptyState('📭', 'Henüz wishlist yok', isOwn ? 'İlk istek listeni oluştur!' : 'Bu kullanıcı henüz liste oluşturmamış.', isOwn ? 'Liste Oluştur' : null, 'openCreateWishlistModal()');

        case 'activity':
            return renderActivityTab(userId);

        case 'gifts':
            return renderGiftTab(userId, giftSuggestions);

        case 'panel':
            return renderUserPanel();

        default:
            return '';
    }
}

function renderActivityTab(userId) {
    const user = getUserById(userId);
    const wishlists = store.getUserWishlists(userId);
    const totalProducts = wishlists.reduce((sum, w) => sum + w.products.length, 0);
    const totalLikes = wishlists.reduce((sum, w) => sum + w.likes, 0);
    const totalCompleted = wishlists.reduce((sum, w) => sum + (w.completedProducts?.length || 0), 0);

    return `
        <!-- Stats -->
        <div class="grid-4" style="margin-bottom: var(--space-2xl);">
            ${renderStatCard('heart', 'var(--primary-100)', formatNumber(totalLikes), 'Toplam Beğeni')}
            ${renderStatCard('box', 'rgba(236, 72, 153, 0.15)', totalProducts, 'Ürün')}
            ${renderStatCard('check-circle', 'rgba(16, 185, 129, 0.15)', totalCompleted, 'Tamamlanan')}
            ${renderStatCard('list', 'rgba(59, 130, 246, 0.15)', wishlists.length, 'Wishlist')}
        </div>

        <!-- Recent Activity -->
        <h3 style="font-size: 1.1rem; font-weight: 700; margin-bottom: var(--space-lg);">
            <i class="fas fa-clock"></i> Son Aktiviteler
        </h3>
        <div style="display: flex; flex-direction: column; gap: var(--space-sm);">
            ${[
            { icon: '❤️', text: `${user?.name || 'Kullanıcı'} "İlkbahar Gardırobu" listesine ürün ekledi`, time: '2 saat önce' },
            { icon: '✅', text: `${user?.name || 'Kullanıcı'} bir ürünü tamamlandı olarak işaretledi`, time: '5 saat önce' },
            { icon: '📝', text: `${user?.name || 'Kullanıcı'} yeni bir wishlist oluşturdu`, time: '1 gün önce' },
            { icon: '💬', text: `${user?.name || 'Kullanıcı'} bir listeye yorum yaptı`, time: '2 gün önce' },
            { icon: '👤', text: `${user?.name || 'Kullanıcı'} yeni bir kullanıcıyı takip etti`, time: '3 gün önce' },
        ].map(activity => `
                <div style="display: flex; align-items: center; gap: var(--space-md); padding: var(--space-md); background: var(--bg-glass); border: 1px solid var(--border-subtle); border-radius: var(--radius-md);">
                    <span style="font-size: 1.2rem;">${activity.icon}</span>
                    <div style="flex: 1;">
                        <p style="font-size: 0.85rem;">${activity.text}</p>
                        <p style="font-size: 0.75rem; color: var(--text-muted);">${activity.time}</p>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

function renderGiftTab(userId, giftSuggestions) {
    const user = getUserById(userId);

    return `
        <div class="gift-suggestion-section">
            <div class="gift-section-header">
                <span style="font-size: 2rem;">🎁</span>
                <div>
                    <h3>${user?.name || 'Bu kullanıcı'} için Hediye Önerileri</h3>
                    <p style="font-size: 0.85rem; color: var(--text-secondary);">
                        AI destekli kişisel hediye önerileri
                    </p>
                </div>
                <span class="ai-badge" style="margin-left: auto;"><i class="fas fa-robot"></i> AI</span>
            </div>

            ${giftSuggestions.length > 0 ? `
                <div class="gift-grid">
                    ${giftSuggestions.map(gift => `
                        <div class="gift-card hover-lift">
                            <div class="gift-card-emoji">${gift.emoji}</div>
                            <div class="gift-card-title">${gift.name}</div>
                            <div class="gift-card-price">${formatPrice(gift.price)}</div>
                            <p style="font-size: 0.7rem; color: var(--text-muted); margin-top: var(--space-xs);">${gift.giftReason}</p>
                        </div>
                    `).join('')}
                </div>
            ` : `
                <p style="text-align: center; color: var(--text-muted); padding: var(--space-xl);">
                    Hediye önerileri yükleniyor...
                </p>
            `}
        </div>
    `;
}

function renderUserPanel() {
    const user = store.state.currentUser;
    const wishlists = store.getUserWishlists(user.id);
    const totalProducts = wishlists.reduce((sum, w) => sum + w.products.length, 0);

    return `
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-xl);">
            <!-- Wishlist Management -->
            <div style="background: var(--gradient-card); border: 1px solid var(--border-subtle); border-radius: var(--radius-xl); padding: var(--space-xl);">
                <h3 style="font-size: 1.1rem; font-weight: 700; margin-bottom: var(--space-lg);">
                    <i class="fas fa-list"></i> Wishlist Yönetimi
                </h3>
                <p style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: var(--space-lg);">
                    ${wishlists.length} liste • ${totalProducts} ürün
                </p>
                ${wishlists.map(w => `
                    <div style="display: flex; align-items: center; justify-content: space-between; padding: var(--space-sm) 0; border-bottom: 1px solid var(--border-subtle);">
                        <div>
                            <p style="font-weight: 600; font-size: 0.9rem;">${w.title}</p>
                            <p style="font-size: 0.75rem; color: var(--text-muted);">${w.products.length} ürün</p>
                        </div>
                        <div style="display: flex; gap: var(--space-xs);">
                            <button class="btn btn-ghost btn-sm" onclick="viewWishlistDetail('${w.id}')">
                                <i class="fas fa-eye"></i>
                            </button>
                            <button class="btn btn-ghost btn-sm" style="color: var(--accent-rose);" onclick="deleteWishlistAction('${w.id}')">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                `).join('')}
                <button class="btn btn-primary btn-full" style="margin-top: var(--space-lg);" onclick="openCreateWishlistModal()">
                    <i class="fas fa-plus"></i> Yeni Liste
                </button>
            </div>

            <!-- Quick Actions -->
            <div>
                <div style="background: var(--gradient-card); border: 1px solid var(--border-subtle); border-radius: var(--radius-xl); padding: var(--space-xl); margin-bottom: var(--space-lg);">
                    <h3 style="font-size: 1.1rem; font-weight: 700; margin-bottom: var(--space-lg);">
                        <i class="fas fa-bolt"></i> Hızlı İşlemler
                    </h3>
                    <div style="display: flex; flex-direction: column; gap: var(--space-sm);">
                        <button class="btn btn-secondary btn-full" onclick="openCreateWishlistModal()" style="justify-content: flex-start;">
                            <i class="fas fa-plus-circle"></i> Yeni Wishlist Oluştur
                        </button>
                        <button class="btn btn-secondary btn-full" onclick="navigateTo('trends')" style="justify-content: flex-start;">
                            <i class="fas fa-fire"></i> Trendleri Keşfet
                        </button>
                        <button class="btn btn-secondary btn-full" onclick="navigateTo('inspiration')" style="justify-content: flex-start;">
                            <i class="fas fa-lightbulb"></i> İlham Köşesi
                        </button>
                    </div>
                </div>

                <!-- Tamamlanan Ürünler Stats -->
                <div style="background: var(--gradient-card); border: 1px solid var(--border-subtle); border-radius: var(--radius-xl); padding: var(--space-xl);">
                    <h3 style="font-size: 1.1rem; font-weight: 700; margin-bottom: var(--space-lg);">
                        <i class="fas fa-check-circle" style="color: var(--accent-emerald);"></i> Tamamlanan Ürünler
                    </h3>
                    ${wishlists.filter(w => w.completedProducts?.length > 0).map(w => `
                        <div style="margin-bottom: var(--space-md);">
                            <div style="display: flex; justify-content: space-between; font-size: 0.85rem; margin-bottom: var(--space-xs);">
                                <span>${w.title}</span>
                                <span style="color: var(--accent-emerald);">${w.completedProducts.length}/${w.products.length}</span>
                            </div>
                            <div class="wishlist-progress-bar">
                                <div class="wishlist-progress-fill" style="width: ${(w.completedProducts.length / w.products.length) * 100}%"></div>
                            </div>
                        </div>
                    `).join('')}
                    ${wishlists.every(w => !w.completedProducts?.length) ? '<p style="font-size: 0.85rem; color: var(--text-muted);">Henüz tamamlanan ürün yok.</p>' : ''}
                </div>
            </div>
        </div>
    `;
}

// Profile Actions
function switchProfileTab(tab) {
    profileTab = tab;
    renderPage('profile');
}

function viewUserProfile(userId) {
    viewingUserId = userId;
    profileTab = 'wishlists';
    navigateTo('profile');
}

function handleFollow(userId) {
    store.toggleFollow(userId);
    const isFollowed = store.state.followedUsers.has(userId);
    showToast(isFollowed ? 'Takip edildi! 👤' : 'Takipten çıkıldı', isFollowed ? 'success' : 'info');
    renderPage(store.state.currentPage);
}
