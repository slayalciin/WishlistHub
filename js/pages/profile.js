/* ═══════════════════════════════════════════════════════
   WISHLIST HUB - Profile Page Redesigned
   ═══════════════════════════════════════════════════════ */

let profileTab = 'wishlists';
let viewingUserId = null;

function renderProfilePage() {
    const isLoggedIn = store.state.isLoggedIn;

    if (!isLoggedIn && !viewingUserId) {
        return `
            <section class="section page-enter">
                ${renderEmptyState('lock', t('pr_login_required'), t('pr_login_required_desc'), t('nav_login'), 'openAuthModal()')}
            </section>
        `;
    }

    const userId = viewingUserId || store.state.currentUser?.id;
    const user = getUserById(userId) || store.state.currentUser;

    if (!user) {
        return `
            <section class="section page-enter">
                ${renderEmptyState('user-slash', t('pr_user_not_found'), t('pr_user_not_found_desc'))}
            </section>
        `;
    }

    const isOwn = store.state.currentUser?.id === userId;
    const wishlists = store.getUserWishlists(userId);
    const isFollowed = store.state.followedUsers.has(userId);
    
    // Filter moodboard posts and collections
    const userMoodboards = store.state.moodboardPosts.filter(p => p.userId === userId && p.items);
    const userPosts = store.state.moodboardPosts.filter(p => p.userId === userId && !p.items);
    const userCollections = store.state.collections.filter(c => c.userId === userId);
    
    // Count total saves
    const totalSaves = wishlists.reduce((sum, w) => sum + (w.saves || 0), 0) + 
                       userMoodboards.reduce((sum, m) => sum + (m.saves || 0), 0) +
                       userPosts.reduce((sum, p) => sum + (p.saves || 0), 0);

    return `
        <section class="section page-enter" style="max-width: 1000px; margin: 0 auto; padding-top: var(--space-xl);">
            ${viewingUserId ? `
                <button class="btn btn-ghost" onclick="viewingUserId = null; navigateTo('profile')" style="margin-bottom: var(--space-lg);">
                    <i class="fas fa-arrow-left"></i> ${t('wl_back')}
                </button>
            ` : ''}

            <!-- Profile Header Redesigned -->
            <div class="profile-header-modern" style="position: relative; margin-bottom: var(--space-2xl);">
                <!-- Cover Card -->
                <div class="profile-cover-modern" style="height: 180px; background: linear-gradient(135deg, var(--primary-100), var(--bg-tertiary)); border-radius: var(--radius-2xl); position: relative; border: 1px solid var(--border-subtle);">
                    <div style="width:100%; height:100%; opacity: 0.85; border-radius: var(--radius-2xl);"></div>
                </div>
                
                <!-- Main Info Section -->
                <div class="profile-info-modern" style="padding: 0 var(--space-xl); display: flex; flex-direction: column; align-items: center; margin-top: -75px; text-align: center; position: relative; z-index: 5;">
                    <!-- Avatar -->
                    <div class="profile-avatar-modern" style="width: 130px; height: 130px; border-radius: 50%; border: 6px solid var(--bg-card); background: var(--bg-card); overflow: hidden; box-shadow: var(--shadow-md); display: flex; align-items: center; justify-content: center; font-size: 3.5rem; margin-bottom: var(--space-md);">
                        <div style="width:100%; height:100%; background: var(--primary); display:flex; align-items:center; justify-content:center; border-radius: 50%;">
                            ${user.avatar ? `<img src="${user.avatar}" alt="${user.name}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">` : user.avatarEmoji || '👤'}
                        </div>
                    </div>
                    
                    <!-- Text Details -->
                    <h1 style="font-size: 2.2rem; font-weight: 800; color: var(--text-primary); margin: var(--space-xs) 0 4px 0; letter-spacing: -1px; display: flex; align-items: center; gap: 6px;">
                        ${user.name}
                        ${user.verified ? '<i class="fas fa-check-circle" style="color: var(--primary); font-size: 1.1rem;"></i>' : ''}
                    </h1>
                    <p style="color: var(--text-muted); font-size: 1rem; font-weight: 500; margin-bottom: var(--space-sm);">${user.username}</p>
                    <p style="color: var(--text-secondary); max-width: 500px; line-height: 1.5; font-size: 0.95rem; margin-bottom: var(--space-lg);">${user.bio || t('pr_bio_default')}</p>
                    
                    <!-- Bio Interest Tags -->
                    <div style="display: flex; gap: 6px; flex-wrap: wrap; justify-content: center; margin-bottom: var(--space-xl);">
                        ${(user.interests || []).map(interest => {
                            const cat = CATEGORIES.find(c => c.id === interest);
                            return cat ? `<span class="tag tag-primary" style="font-size: 0.8rem; padding: 4px 10px; border-radius: var(--radius-full); background: var(--bg-glass); border: 1px solid var(--border-subtle);">${cat.icon} ${t(cat.id)}</span>` : '';
                        }).join('')}
                    </div>

                    <!-- Statistics Cards Row -->
                    <div style="display: flex; gap: var(--space-md); width: 100%; max-width: 500px; margin-bottom: var(--space-xl); justify-content: center;">
                        <div class="profile-stats-card hover-lift" style="background: var(--gradient-card); border: 1px solid var(--border-subtle); border-radius: var(--radius-xl); padding: var(--space-md) var(--space-lg); text-align: center; flex: 1; min-width: 100px;">
                            <strong style="font-size: 1.4rem; font-weight: 800; color: var(--text-primary); display: block;">${formatNumber(user.followers || 0)}</strong>
                            <span style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; font-weight: 600;">${t('pr_followers')}</span>
                        </div>
                        <div class="profile-stats-card hover-lift" style="background: var(--gradient-card); border: 1px solid var(--border-subtle); border-radius: var(--radius-xl); padding: var(--space-md) var(--space-lg); text-align: center; flex: 1; min-width: 100px;">
                            <strong style="font-size: 1.4rem; font-weight: 800; color: var(--text-primary); display: block;">${formatNumber(user.following || 0)}</strong>
                            <span style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; font-weight: 600;">${t('pr_following')}</span>
                        </div>
                        <div class="profile-stats-card hover-lift" style="background: var(--gradient-card); border: 1px solid var(--border-subtle); border-radius: var(--radius-xl); padding: var(--space-md) var(--space-lg); text-align: center; flex: 1; min-width: 100px;">
                            <strong style="font-size: 1.4rem; font-weight: 800; color: var(--text-primary); display: block;">${formatNumber(totalSaves || 0)}</strong>
                            <span style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; font-weight: 600;">${t('pr_stat_saves')}</span>
                        </div>
                    </div>

                    <!-- Action Buttons -->
                    <div style="display: flex; gap: var(--space-sm); margin-bottom: var(--space-xl); flex-wrap: wrap; justify-content: center; align-items: center;">
                        ${isOwn ? `
                            <button class="btn btn-primary" onclick="openCreationHub()" style="padding: 10px 24px; border-radius: var(--radius-full); font-weight: 700;">
                                <i class="fas fa-plus"></i> ${t('nav_create')}
                            </button>
                            <button class="btn btn-secondary" onclick="shareProfile('${userId}')" style="padding: 10px 20px; border-radius: var(--radius-full); font-weight: 600;">
                                <i class="fas fa-share-alt"></i> ${t('pr_btn_share')}
                            </button>
                            <button class="btn btn-ghost" onclick="handleLogout()" style="padding: 10px; border-radius: 50%; min-width: 42px; height: 42px; display: flex; align-items: center; justify-content: center;">
                                <i class="fas fa-sign-out-alt"></i>
                            </button>
                        ` : `
                            <button class="btn ${isFollowed ? 'btn-secondary' : 'btn-primary'}" onclick="handleFollow('${userId}')" style="padding: 10px 24px; border-radius: var(--radius-full); font-weight: 700;">
                                <i class="fas fa-${isFollowed ? 'check' : 'user-plus'}"></i>
                                ${isFollowed ? t('comp_following') : t('comp_follow')}
                            </button>
                            <button class="btn btn-secondary" onclick="showToast(t('pr_message_soon'), 'info')" style="padding: 10px 20px; border-radius: var(--radius-full); font-weight: 600;">
                                <i class="fas fa-envelope"></i> ${t('pr_btn_message')}
                            </button>
                            <button class="btn btn-secondary" onclick="shareProfile('${userId}')" style="padding: 10px; border-radius: 50%; min-width: 42px; height: 42px; display: flex; align-items: center; justify-content: center;">
                                <i class="fas fa-share-alt"></i>
                            </button>
                        `}
                    </div>
                </div>
            </div>

            <!-- Profile Tabs Modern Style -->
            <div class="profile-tabs" style="border-bottom: 1px solid var(--border-subtle); display: flex; justify-content: center; gap: var(--space-md); margin-bottom: var(--space-xl); overflow-x: auto; white-space: nowrap;">
                <button class="profile-tab ${profileTab === 'wishlists' ? 'active' : ''}" onclick="switchProfileTab('wishlists')" style="padding: var(--space-md) var(--space-lg); font-weight: 700; border: none; background: none; border-bottom: 2px solid transparent; cursor: pointer; display: flex; align-items: center; gap: 6px; color: var(--text-secondary); transition: all 0.3s;">
                    <i class="fas fa-heart"></i> Wishlists
                </button>
                <button class="profile-tab ${profileTab === 'moodboards' ? 'active' : ''}" onclick="switchProfileTab('moodboards')" style="padding: var(--space-md) var(--space-lg); font-weight: 700; border: none; background: none; border-bottom: 2px solid transparent; cursor: pointer; display: flex; align-items: center; gap: 6px; color: var(--text-secondary); transition: all 0.3s;">
                    <i class="fas fa-palette"></i> ${t('pr_tab_moodboards')}
                </button>
                <button class="profile-tab ${profileTab === 'posts' ? 'active' : ''}" onclick="switchProfileTab('posts')" style="padding: var(--space-md) var(--space-lg); font-weight: 700; border: none; background: none; border-bottom: 2px solid transparent; cursor: pointer; display: flex; align-items: center; gap: 6px; color: var(--text-secondary); transition: all 0.3s;">
                    <i class="fas fa-lightbulb"></i> ${t('pr_tab_posts')}
                </button>
                <button class="profile-tab ${profileTab === 'collections' ? 'active' : ''}" onclick="switchProfileTab('collections')" style="padding: var(--space-md) var(--space-lg); font-weight: 700; border: none; background: none; border-bottom: 2px solid transparent; cursor: pointer; display: flex; align-items: center; gap: 6px; color: var(--text-secondary); transition: all 0.3s;">
                    <i class="fas fa-folder"></i> ${t('pr_tab_collections')}
                </button>
                <button class="profile-tab ${profileTab === 'saved' ? 'active' : ''}" onclick="switchProfileTab('saved')" style="padding: var(--space-md) var(--space-lg); font-weight: 700; border: none; background: none; border-bottom: 2px solid transparent; cursor: pointer; display: flex; align-items: center; gap: 6px; color: var(--text-secondary); transition: all 0.3s;">
                    <i class="fas fa-bookmark"></i> ${t('pr_tab_saved')}
                </button>
            </div>

            <!-- Tab Content -->
            <div id="profile-tab-content" style="min-height: 300px;">
                ${renderProfileTabContent(userId, isOwn, wishlists, userMoodboards, userPosts, userCollections)}
            </div>
        </section>
        ${renderFooter()}
    `;
}

function renderProfileTabContent(userId, isOwn, wishlists, userMoodboards, userPosts, userCollections) {
    switch (profileTab) {
        case 'wishlists':
            return wishlists.length > 0 ? `
                <div class="grid-3">
                    ${wishlists.map(w => renderWishlistCard(w, { showUser: false })).join('')}
                </div>
            ` : renderEmptyState('🖤', t('wl_empty_state_title'), isOwn ? t('pr_empty_own_desc') : t('pr_empty_other_desc'), isOwn ? t('wl_new_list_card') : null, isOwn ? 'openCreationHub()' : null);

        case 'moodboards':
            return userMoodboards.length > 0 ? `
                <div class="grid-3">
                    ${userMoodboards.map(mb => renderProfileMoodboardCard(mb)).join('')}
                </div>
            ` : renderEmptyState('✨', t('pr_tab_moodboards'), isOwn ? t('pr_empty_own_desc') : t('pr_empty_other_desc'), isOwn ? t('ch_card_moodboard_title') : null, isOwn ? 'openCreationHub()' : null);

        case 'posts':
            return userPosts.length > 0 ? `
                <div class="grid-3">
                    ${userPosts.map(post => renderProfilePostCard(post)).join('')}
                </div>
            ` : renderEmptyState('💡', t('pr_tab_posts'), isOwn ? t('pr_empty_own_desc') : t('pr_empty_other_desc'), isOwn ? t('ch_card_post_title') : null, isOwn ? 'openCreationHub()' : null);

        case 'collections':
            return userCollections.length > 0 ? `
                <div class="grid-3">
                    ${userCollections.map(col => renderProfileCollectionCard(col)).join('')}
                </div>
            ` : renderEmptyState('📂', t('pr_tab_collections'), isOwn ? t('pr_empty_own_desc') : t('pr_empty_other_desc'), isOwn ? t('ch_card_collection_title') : null, isOwn ? 'openCreationHub()' : null);

        case 'saved':
            return renderSavedTabContent(userId, isOwn);

        default:
            return '';
    }
}

function renderProfileMoodboardCard(mb) {
    const images = (mb.items || []).map(item => item.type === 'product' ? getProductById(item.id)?.image : item.src).filter(Boolean);
    
    let collageHtml = '';
    if (images.length > 0) {
        collageHtml = `
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 4px; height: 160px; overflow: hidden; border-radius: var(--radius-lg); margin-bottom: var(--space-sm); background: var(--bg-secondary);">
                ${images.slice(0, 4).map(img => `<img src="${img}" style="width:100%; height:100%; object-fit: cover; aspect-ratio: 1;">`).join('')}
            </div>
        `;
    } else {
        collageHtml = `
            <div style="height: 160px; background: var(--bg-secondary); border-radius: var(--radius-lg); display: flex; align-items: center; justify-content: center; margin-bottom: var(--space-sm); color: var(--text-muted);">
                <i class="fas fa-palette" style="font-size: 2.5rem;"></i>
            </div>
        `;
    }

    return `
        <div class="card hover-lift" style="padding: var(--space-md); display: flex; flex-direction: column; cursor: pointer; background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: var(--radius-xl);" onclick="viewMoodboardDetail('${mb.id}')">
            ${collageHtml}
            <div style="flex: 1; display: flex; flex-direction: column; gap: var(--space-xs);">
                <h4 style="font-weight: 700; font-size: 1rem; color: var(--text-primary); margin: 0;">${mb.title}</h4>
                <p style="font-size: 0.8rem; color: var(--text-secondary); line-height: 1.4; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; margin: 0;">${mb.description}</p>
                <div style="display: flex; gap: var(--space-xs); flex-wrap: wrap; margin-top: auto; padding-top: 4px;">
                    ${(mb.hashtags || []).slice(0, 3).map(tag => `<span style="font-size: 0.7rem; font-weight: 600; color: var(--primary);">${tag}</span>`).join('')}
                </div>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-subtle); margin-top: var(--space-sm); padding-top: var(--space-xs); font-size: 0.75rem; color: var(--text-muted);">
                <span style="display: flex; align-items: center; gap: 4px;"><i class="fas fa-heart"></i> ${mb.likes || 0}</span>
                <span style="display: flex; align-items: center; gap: 4px;"><i class="fas fa-bookmark"></i> ${mb.saves || 0}</span>
            </div>
        </div>
    `;
}

function renderProfilePostCard(post) {
    const images = post.images || [];
    let coverHtml = '';
    if (images.length > 0) {
        coverHtml = `<img src="${images[0]}" style="width:100%; height:160px; object-fit: cover; border-radius: var(--radius-lg); margin-bottom: var(--space-sm);">`;
    } else {
        coverHtml = `
            <div style="height: 160px; background: var(--bg-secondary); border-radius: var(--radius-lg); display: flex; align-items: center; justify-content: center; margin-bottom: var(--space-sm); color: var(--text-muted);">
                <i class="fas fa-paragraph" style="font-size: 2.5rem;"></i>
            </div>
        `;
    }

    return `
        <div class="card hover-lift" style="padding: var(--space-md); display: flex; flex-direction: column; cursor: pointer; background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: var(--radius-xl);" onclick="navigateTo('inspiration')">
            ${coverHtml}
            <div style="flex: 1; display: flex; flex-direction: column; gap: var(--space-xs);">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span style="font-size: 0.7rem; font-weight: 700; color: var(--primary); text-transform: uppercase; background: var(--primary-100); padding: 2px 8px; border-radius: var(--radius-full);">${post.topic}</span>
                </div>
                <h4 style="font-weight: 700; font-size: 1rem; color: var(--text-primary); margin: 4px 0 0 0;">${post.title || ''}</h4>
                <p style="font-size: 0.8rem; color: var(--text-secondary); line-height: 1.4; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; margin: 0;">${post.description}</p>
                <div style="display: flex; gap: var(--space-xs); flex-wrap: wrap; margin-top: auto; padding-top: 4px;">
                    ${(post.hashtags || []).slice(0, 3).map(tag => `<span style="font-size: 0.7rem; font-weight: 600; color: var(--primary);">${tag}</span>`).join('')}
                </div>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-subtle); margin-top: var(--space-sm); padding-top: var(--space-xs); font-size: 0.75rem; color: var(--text-muted);">
                <span style="display: flex; align-items: center; gap: 4px;"><i class="fas fa-heart"></i> ${post.likes || 0}</span>
                <span style="display: flex; align-items: center; gap: 4px;"><i class="fas fa-bookmark"></i> ${post.saves || 0}</span>
            </div>
        </div>
    `;
}

function renderProfileCollectionCard(col) {
    const coverImg = col.coverImage || 'assets/feature_wishlist.jpg';
    
    return `
        <div class="card hover-lift" style="padding: var(--space-md); display: flex; flex-direction: column; cursor: pointer; background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: var(--radius-xl);" onclick="viewCollectionDetail('${col.id}')">
            <img src="${coverImg}" style="width:100%; height:160px; object-fit: cover; border-radius: var(--radius-lg); margin-bottom: var(--space-sm);">
            <div style="flex: 1; display: flex; flex-direction: column; gap: var(--space-xs);">
                <h4 style="font-weight: 700; font-size: 1rem; color: var(--text-primary); margin: 0;">${col.name}</h4>
                <p style="font-size: 0.8rem; color: var(--text-secondary); line-height: 1.4; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; margin: 0;">${col.description}</p>
                <div style="display: flex; gap: var(--space-sm); margin-top: auto; padding-top: var(--space-sm); font-size: 0.75rem; color: var(--text-muted); font-weight: 500;">
                    <span><i class="fas fa-heart"></i> ${col.wishlistIds?.length || 0} Wishlist</span>
                    <span><i class="fas fa-palette"></i> ${col.moodboardIds?.length || 0} Moodboard</span>
                </div>
            </div>
        </div>
    `;
}

function renderSavedTabContent(userId, isOwn) {
    const saved = store.state.savedItems || { products: [], wishlists: [], posts: [] };
    
    // Saved wishlists
    const savedWishlists = store.state.wishlists.filter(w => (saved.wishlists || []).includes(w.id));
    // Saved posts/moodboards
    const savedPosts = store.state.moodboardPosts.filter(p => (saved.posts || []).includes(p.id));
    // Saved products from liked products set
    const savedProductIds = Array.from(store.state.likedProducts);
    const savedProducts = store.state.products.filter(p => savedProductIds.includes(p.id) || (saved.products || []).includes(p.id));

    const totalSavedCount = savedWishlists.length + savedPosts.length + savedProducts.length;

    if (totalSavedCount === 0) {
        return renderEmptyState('bookmark', t('pr_tab_saved'), isOwn ? t('pr_empty_own_desc') : t('pr_empty_other_desc'));
    }

    let html = '';

    if (savedWishlists.length > 0) {
        html += `
            <div style="margin-bottom: var(--space-2xl);">
                <h3 style="font-size: 1.2rem; font-weight: 700; margin-bottom: var(--space-md); color: var(--text-primary); display: flex; align-items: center; gap: 8px;">
                    <i class="fas fa-heart"></i> ${t('wl_my_lists') || 'Wishlists'}
                </h3>
                <div class="grid-3" style="margin-bottom: var(--space-lg);">
                    ${savedWishlists.map(w => renderWishlistCard(w, { showUser: true })).join('')}
                </div>
            </div>
        `;
    }

    if (savedPosts.length > 0) {
        html += `
            <div style="margin-bottom: var(--space-2xl);">
                <h3 style="font-size: 1.2rem; font-weight: 700; margin-bottom: var(--space-md); color: var(--text-primary); display: flex; align-items: center; gap: 8px;">
                    <i class="fas fa-images"></i> ${t('pr_tab_moodboards') || 'Moodboards'} & ${t('pr_tab_posts') || 'Posts'}
                </h3>
                <div class="grid-3" style="margin-bottom: var(--space-lg);">
                    ${savedPosts.map(p => p.items ? renderProfileMoodboardCard(p) : renderProfilePostCard(p)).join('')}
                </div>
            </div>
        `;
    }

    if (savedProducts.length > 0) {
        html += `
            <div style="margin-bottom: var(--space-2xl);">
                <h3 style="font-size: 1.2rem; font-weight: 700; margin-bottom: var(--space-md); color: var(--text-primary); display: flex; align-items: center; gap: 8px;">
                    <i class="fas fa-star"></i> ${t('tr_trending_products') || 'Products'}
                </h3>
                <div class="grid-3">
                    ${savedProducts.map(p => renderProductCard(p)).join('')}
                </div>
            </div>
        `;
    }

    return html;
}

// Preview Modals for Collections & Moodboards
function viewCollectionDetail(colId) {
    const col = store.state.collections.find(c => c.id === colId);
    if (!col) return;

    // Fetch grouped wishlists and moodboards
    const colWishlists = store.state.wishlists.filter(w => (col.wishlistIds || []).includes(w.id));
    const colMoodboards = store.state.moodboardPosts.filter(m => (col.moodboardIds || []).includes(m.id));

    // Remove existing modal if any
    const existing = document.getElementById('collection-detail-modal');
    if (existing) existing.remove();

    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.id = 'collection-detail-modal';
    modal.style.zIndex = '9999';
    modal.style.display = 'flex';
    modal.style.alignItems = 'center';
    modal.style.justifyContent = 'center';
    modal.innerHTML = `
        <div class="modal-container" style="max-width: 800px; width: 92%; padding: var(--space-xl); border-radius: var(--radius-2xl); background: var(--bg-card); border: 1px solid var(--border-medium); box-shadow: var(--shadow-xl); max-height: 85vh; overflow-y: auto; position: relative;">
            <button class="modal-close" onclick="document.getElementById('collection-detail-modal').remove()" style="background: none; border: none; font-size: 1.25rem; color: var(--text-muted); cursor: pointer; position: absolute; top: var(--space-md); right: var(--space-md);">
                <i class="fas fa-times"></i>
            </button>
            <div style="margin-bottom: var(--space-lg);">
                <span class="badge" style="background: var(--primary-100); color: var(--primary-light); padding: 4px 12px; border-radius: var(--radius-full); font-size: 0.8rem; font-weight: 700; text-transform: uppercase;"><i class="fas fa-folder-open"></i> Collection</span>
                <h3 style="font-size: 1.8rem; font-weight: 800; color: var(--text-primary); margin: var(--space-xs) 0 4px 0;">${col.name}</h3>
                <p style="font-size: 0.95rem; color: var(--text-secondary); line-height: 1.5; margin: 0;">${col.description}</p>
            </div>
            
            <div style="display: flex; flex-direction: column; gap: var(--space-xl);">
                ${colWishlists.length > 0 ? `
                    <div>
                        <h4 style="font-size: 1.1rem; font-weight: 700; margin-bottom: var(--space-md); color: var(--text-primary);"><i class="fas fa-heart"></i> Wishlists</h4>
                        <div class="grid-2">
                            ${colWishlists.map(w => renderWishlistCard(w, { showUser: false })).join('')}
                        </div>
                    </div>
                ` : ''}

                ${colMoodboards.length > 0 ? `
                    <div>
                        <h4 style="font-size: 1.1rem; font-weight: 700; margin-bottom: var(--space-md); color: var(--text-primary);"><i class="fas fa-images"></i> Moodboards</h4>
                        <div class="grid-2">
                            ${colMoodboards.map(mb => renderProfileMoodboardCard(mb)).join('')}
                        </div>
                    </div>
                ` : ''}
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

function viewMoodboardDetail(mbId) {
    const mb = store.state.moodboardPosts.find(p => p.id === mbId);
    if (!mb) return;

    // Remove existing modal if any
    const existing = document.getElementById('moodboard-detail-modal');
    if (existing) existing.remove();

    const canvasItemsHtml = (mb.items || []).map(item => {
        const style = `position: absolute; left: ${item.left}px; top: ${item.top}px; width: ${item.width || 120}px; z-index: ${item.zIndex || 1}; transform: rotate(${item.rotation || 0}deg);`;
        if (item.type === 'product') {
            const p = getProductById(item.id);
            if (!p) return '';
            return `
                <div class="moodboard-item-preview" style="${style}" onclick="window.open('${p.url}', '_blank')">
                    <img src="${p.image}" style="width: 100%; height: auto; border-radius: var(--radius-md); box-shadow: var(--shadow-sm); border: 1px solid var(--border-subtle); display: block;">
                </div>
            `;
        } else {
            return `
                <div class="moodboard-item-preview" style="${style}">
                    <img src="${item.src}" style="width: 100%; height: auto; border-radius: var(--radius-md); box-shadow: var(--shadow-sm); border: 1px solid var(--border-subtle); display: block;">
                </div>
            `;
        }
    }).join('');

    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.id = 'moodboard-detail-modal';
    modal.style.zIndex = '9999';
    modal.style.display = 'flex';
    modal.style.alignItems = 'center';
    modal.style.justifyContent = 'center';
    
    modal.innerHTML = `
        <div class="modal-container" style="max-width: 650px; width: 92%; padding: var(--space-xl); border-radius: var(--radius-2xl); background: var(--bg-card); border: 1px solid var(--border-medium); box-shadow: var(--shadow-xl); position: relative;">
            <button class="modal-close" onclick="document.getElementById('moodboard-detail-modal').remove()" style="background: none; border: none; font-size: 1.25rem; color: var(--text-muted); cursor: pointer; position: absolute; top: var(--space-md); right: var(--space-md);">
                <i class="fas fa-times"></i>
            </button>
            <div style="margin-bottom: var(--space-md);">
                <span class="badge" style="background: var(--primary-100); color: var(--primary-light); padding: 4px 12px; border-radius: var(--radius-full); font-size: 0.8rem; font-weight: 700; text-transform: uppercase;"><i class="fas fa-border-all"></i> Moodboard</span>
                <h3 style="font-size: 1.5rem; font-weight: 800; color: var(--text-primary); margin: var(--space-xs) 0 4px 0;">${mb.title}</h3>
                <p style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.4; margin: 0;">${mb.description}</p>
            </div>
            
            <!-- Canvas -->
            <div class="moodboard-canvas" style="height: 380px; position: relative; background: var(--bg-secondary); border-radius: var(--radius-xl); border: 1px solid var(--border-subtle); overflow: hidden; margin-bottom: var(--space-md);">
                ${canvasItemsHtml}
            </div>

            <!-- Meta & Tags -->
            <div style="display: flex; gap: var(--space-xs); flex-wrap: wrap; margin-bottom: var(--space-md);">
                ${(mb.hashtags || []).map(tag => `<span style="font-size: 0.8rem; font-weight: 600; color: var(--primary);">${tag}</span>`).join('')}
            </div>

            <!-- Footer Stats -->
            <div style="display: flex; gap: var(--space-md); align-items: center; border-top: 1px solid var(--border-subtle); padding-top: var(--space-md); font-size: 0.85rem; color: var(--text-muted);">
                <span style="display: flex; align-items: center; gap: 4px;"><i class="fas fa-heart"></i> ${mb.likes || 0} beğeni</span>
                <span style="display: flex; align-items: center; gap: 4px;"><i class="fas fa-bookmark"></i> ${mb.saves || 0} kaydetme</span>
                <span style="margin-left: auto;">${mb.date || 'Şimdi'}</span>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

// Share Profile Copy Link
function shareProfile(userId) {
    const url = window.location.origin + '?user=' + userId;
    navigator.clipboard.writeText(url).then(() => {
        showToast(t('pr_link_copied'), 'success');
    }).catch(() => {
        showToast('Link copying failed', 'error');
    });
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
    showToast(isFollowed ? t('pr_followed_toast') : t('pr_unfollowed_toast'), isFollowed ? 'success' : 'info');
    renderPage(store.state.currentPage);
}
