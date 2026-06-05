/* ═══════════════════════════════════════════════════════
   WISHLIST HUB - Wishlist Page
   ═══════════════════════════════════════════════════════ */

let currentWishlistDetail = null;

function renderWishlistPage() {
    if (currentWishlistDetail) {
        return renderWishlistDetailView(currentWishlistDetail);
    }

    const isLoggedIn = store.state.isLoggedIn;
    const userWishlists = isLoggedIn ? store.getUserWishlists(store.state.currentUser.id) : [];
    const publicWishlists = store.state.wishlists.filter(w => w.privacy === 'public');
    const selectedCategory = store.state.selectedCategory;

    const filteredWishlists = selectedCategory === 'all'
        ? publicWishlists
        : publicWishlists.filter(w => w.category === selectedCategory);

    return `
        <section class="section page-enter">
            <div class="wishlist-page-header">
                <div>
                    <h1 style="font-size: 2rem; font-weight: 800;">
                        <i class="fas fa-heart" style="color: var(--accent-pink);"></i> ${t('wl_title')}
                    </h1>
                    <p style="color: var(--text-secondary); margin-top: var(--space-xs);">
                        ${t('wl_desc')}
                    </p>
                </div>
                <div style="display: flex; gap: var(--space-sm); align-items: center;">
                    ${isLoggedIn ? `
                        <button class="btn btn-primary" onclick="openCreateWishlistModal()">
                            <i class="fas fa-plus"></i> ${t('wl_new_list')}
                        </button>
                    ` : ''}
                    <div class="wishlist-view-toggle">
                        <button class="view-toggle-btn ${store.state.wishlistView === 'grid' ? 'active' : ''}" 
                                onclick="toggleWishlistView('grid')">
                            <i class="fas fa-th-large"></i>
                        </button>
                        <button class="view-toggle-btn ${store.state.wishlistView === 'list' ? 'active' : ''}" 
                                onclick="toggleWishlistView('list')">
                            <i class="fas fa-list"></i>
                        </button>
                    </div>
                </div>
            </div>

            <!-- My Wishlists (if logged in) -->
            ${isLoggedIn && userWishlists.length > 0 ? `
                <div style="margin-bottom: var(--space-2xl);">
                    <h2 class="section-title" style="margin-bottom: var(--space-lg);">${t('wl_my_lists')}</h2>
                    <div class="grid-3">
                        ${userWishlists.map(w => renderWishlistCard(w, { showUser: false })).join('')}
                        <div class="wishlist-card hover-lift" onclick="openCreateWishlistModal()" 
                             style="display:flex; align-items:center; justify-content:center; min-height: 280px; border-style: dashed;">
                            <div style="text-align: center;">
                                <i class="fas fa-plus" style="font-size: 2rem; color: var(--text-muted); margin-bottom: var(--space-md);"></i>
                                <p style="color: var(--text-muted);">${t('wl_new_list_card')}</p>
                            </div>
                        </div>
                    </div>
                </div>
            ` : ''}

            <!-- Category Filter -->
            <div class="filter-tabs" style="margin-bottom: var(--space-xl);">
                <button class="filter-tab ${selectedCategory === 'all' ? 'active' : ''}" 
                        onclick="filterWishlistCategory('all')">${t('wl_filter_all')}</button>
                ${CATEGORIES.map(cat => `
                    <button class="filter-tab ${selectedCategory === cat.id ? 'active' : ''}" 
                            onclick="filterWishlistCategory('${cat.id}')">
                        ${cat.icon} ${t(cat.id)}
                    </button>
                `).join('')}
            </div>

            <!-- Public Wishlists -->
            <h2 class="section-title" style="margin-bottom: var(--space-lg);">${t('wl_discover')}</h2>
            ${filteredWishlists.length > 0 ? `
                <div class="${store.state.wishlistView === 'grid' ? 'grid-3' : ''}">
                    ${filteredWishlists.map(w =>
                        store.state.wishlistView === 'grid'
                            ? renderWishlistCard(w)
                            : renderWishlistListItem(w)
                    ).join('')}
                </div>
            ` : renderEmptyState('inbox', t('wl_empty_state_title'), t('wl_empty_state_desc'), t('wl_empty_state_action'), 'openCreateWishlistModal()')}
        </section>
        ${renderFooter()}
    `;
}

function renderWishlistListItem(wishlist) {
    const user = getUserById(wishlist.userId);
    const products = wishlist.products.map(pid => getProductById(pid)).filter(Boolean);
    const isLiked = store.state.likedWishlists.has(wishlist.id);

    return `
        <div class="wishlist-card hover-lift" style="display: flex; gap: var(--space-lg); margin-bottom: var(--space-md); border-radius: var(--radius-lg);" onclick="viewWishlistDetail('${wishlist.id}')">
            <div style="display: flex; gap: 4px; flex-shrink: 0; width: 140px; height: 100px; border-radius: var(--radius-md); overflow: hidden;">
                ${products.slice(0, 2).map((p, i) => `
                    <div style="flex: 1; background: ${getProductColor(i)}; display:flex; align-items:center; justify-content:center;">
                        ${p.image ? `<img src="${p.image}" alt="${p.name}" style="width:100%;height:100%;object-fit:cover;">` : `<i class="fas fa-shopping-bag" style="font-size:1.5rem;color:rgba(255,255,255,0.7);"></i>`}
                    </div>
                `).join('')}
            </div>
            <div style="flex: 1; padding: var(--space-md) 0;">
                <h3 style="font-size: 1rem; font-weight: 700; margin-bottom: var(--space-xs);">${wishlist.title}</h3>
                <p style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: var(--space-sm);">${wishlist.description}</p>
                <div style="display: flex; align-items: center; gap: var(--space-lg); font-size: 0.8rem; color: var(--text-muted);">
                    <span><i class="fas fa-heart ${isLiked ? 'liked' : ''}"></i> ${formatNumber(wishlist.likes)}</span>
                    <span><i class="fas fa-box"></i> ${t('comp_total_products', { count: wishlist.products.length })}</span>
                    ${user ? `<span><i class="fas fa-user" style="font-size:0.8rem;"></i> ${user.name}</span>` : ''}
                </div>
            </div>
        </div>
    `;
}

function renderWishlistDetailView(wishlistId) {
    const wishlist = store.state.wishlists.find(w => w.id === wishlistId);
    if (!wishlist) return renderEmptyState('exclamation-circle', t('wl_not_found_title'), t('wl_not_found_desc'));

    const user = getUserById(wishlist.userId);
    const products = wishlist.products.map(pid => getProductById(pid)).filter(Boolean);
    const comments = SAMPLE_COMMENTS.filter(c => c.targetId === wishlistId);
    const isOwner = store.state.currentUser?.id === wishlist.userId;
    const completedCount = wishlist.completedProducts?.length || 0;
    const totalCount = products.length;
    const progress = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

    return `
        <section class="section page-enter">
            <button class="btn btn-ghost" onclick="backToWishlists()" style="margin-bottom: var(--space-lg);">
                <i class="fas fa-arrow-left"></i> ${t('wl_back')}
            </button>

            <div class="wishlist-detail-header">
                <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: var(--space-md);">
                    <div>
                        <h1 class="wishlist-detail-title">${wishlist.title}</h1>
                        <p style="color: var(--text-secondary); margin-bottom: var(--space-md);">${wishlist.description}</p>
                        <div class="wishlist-detail-meta">
                            <span><i class="fas fa-${wishlist.privacy === 'public' ? 'globe' : 'lock'}"></i> ${wishlist.privacy === 'public' ? t('wl_public') : t('wl_private')}</span>
                            <span><i class="fas fa-calendar"></i> ${wishlist.createdAt}</span>
                            <span><i class="fas fa-box"></i> ${t('comp_total_products', { count: totalCount })}</span>
                            <span><i class="fas fa-heart"></i> ${formatNumber(wishlist.likes)} ${t('wl_likes')}</span>
                        </div>
                    </div>
                    ${user ? `
                        <div style="display: flex; align-items: center; gap: var(--space-sm); cursor: pointer;" onclick="viewUserProfile('${user.id}')">
                            <div style="width:40px; height:40px; border-radius:50%; background: var(--primary); display:flex; align-items:center; justify-content:center; font-size: 1.2rem; overflow:hidden;">
                                ${user.avatar ? `<img src="${user.avatar}" alt="${user.name}" style="width:100%;height:100%;object-fit:cover;">` : `<i class="fas fa-user" style="color:white;"></i>`}
                            </div>
                            <div>
                                <div style="font-weight: 600; font-size: 0.9rem;">${user.name}</div>
                                <div style="font-size: 0.75rem; color: var(--text-muted);">${user.username}</div>
                            </div>
                        </div>
                    ` : ''}
                </div>

                <!-- Progress -->
                ${totalCount > 0 ? `
                    <div class="wishlist-progress">
                        <div class="wishlist-progress-bar">
                            <div class="wishlist-progress-fill" style="width: ${progress}%"></div>
                        </div>
                        <div class="wishlist-progress-text">
                            <i class="fas fa-check-circle" style="color: var(--accent-emerald);"></i>
                            ${completedCount}/${totalCount} ${t('comp_completed')} (${progress}%)
                        </div>
                    </div>
                ` : ''}

                <!-- Actions -->
                <div class="wishlist-detail-actions" style="margin-top: var(--space-md);">
                    <button class="btn btn-primary btn-sm" onclick="toggleLikeWishlistAction('${wishlist.id}')">
                        <i class="fas fa-heart"></i> ${store.state.likedWishlists.has(wishlist.id) ? t('wl_liked_btn') : t('wl_like_btn')}
                    </button>
                    <button class="btn btn-secondary btn-sm" onclick="shareWishlist('${wishlist.id}')">
                        <i class="fas fa-share-alt"></i> ${t('wl_share_btn')}
                    </button>
                    ${isOwner ? `
                        <button class="btn btn-secondary btn-sm" onclick="openAddProductModal('${wishlist.id}')">
                            <i class="fas fa-plus"></i> ${t('wl_add_product_btn')}
                        </button>
                        <button class="btn btn-ghost btn-sm" style="color: var(--accent-rose);" onclick="deleteWishlistAction('${wishlist.id}')">
                            <i class="fas fa-trash"></i> ${t('comp_delete')}
                        </button>
                    ` : ''}
                </div>
            </div>

            <!-- Products -->
            <h2 class="section-title" style="margin-bottom: var(--space-lg);">${t('vt_panel_products')}</h2>
            ${products.length > 0 ? `
                <div class="grid-4">
                    ${products.map(p => renderProductCard(p, { wishlistId: isOwner ? wishlist.id : null })).join('')}
                </div>
            ` : renderEmptyState('box-open', t('wl_empty_products_title'), t('wl_empty_products_desc'), isOwner ? t('wl_add_product_btn') : null, `openAddProductModal('${wishlist.id}')`)}

            <!-- Comments -->
            <div style="margin-top: var(--space-2xl);">
                <h2 class="section-title" style="margin-bottom: var(--space-lg);">
                    <i class="fas fa-comments"></i> ${t('wl_comments')} (${comments.length})
                </h2>
                
                ${store.state.isLoggedIn ? `
                    <div style="display: flex; gap: var(--space-md); margin-bottom: var(--space-lg);">
                        <div style="width:40px; height:40px; border-radius:50%; background: var(--primary); display:flex; align-items:center; justify-content:center; flex-shrink: 0; overflow:hidden;">
                            ${store.state.currentUser.avatar ? `<img src="${store.state.currentUser.avatar}" alt="" style="width:100%;height:100%;object-fit:cover;">` : `<i class="fas fa-user" style="color:white;"></i>`}
                        </div>
                        <div style="flex: 1;">
                            <input type="text" class="form-input" placeholder="${t('wl_write_comment')}" id="comment-input-${wishlist.id}" style="margin-bottom: var(--space-sm);">
                            <button class="btn btn-primary btn-sm" onclick="addComment('${wishlist.id}')">
                                <i class="fas fa-paper-plane"></i> ${t('wl_send_comment')}
                            </button>
                        </div>
                    </div>
                ` : ''}

                ${comments.map(c => renderComment(c)).join('')}
                ${comments.length === 0 ? `<p style="color: var(--text-muted); text-align: center; padding: var(--space-xl);">${t('wl_comments_empty')}</p>` : ''}
            </div>
        </section>
        ${renderFooter()}
    `;
}

// Wishlist Actions
function viewWishlistDetail(wishlistId) {
    currentWishlistDetail = wishlistId;
    navigateTo('wishlist');
}

function backToWishlists() {
    currentWishlistDetail = null;
    navigateTo('wishlist');
}

function toggleWishlistView(view) {
    store.state.wishlistView = view;
    renderPage('wishlist');
}

function filterWishlistCategory(category) {
    store.state.selectedCategory = category;
    renderPage('wishlist');
}

function toggleLikeWishlistAction(wishlistId) {
    store.toggleLikeWishlist(wishlistId);
    showToast(store.state.likedWishlists.has(wishlistId) ? t('wl_liked_toast') : t('wl_unliked_toast'), 'success');
    renderPage('wishlist');
}

function shareWishlist(wishlistId) {
    const wishlist = store.state.wishlists.find(w => w.id === wishlistId);
    if (navigator.share) {
        navigator.share({ title: wishlist.title, text: wishlist.description, url: window.location.href });
    } else {
        navigator.clipboard?.writeText(window.location.href);
        showToast(t('wl_link_copied'), 'success');
    }
}

function deleteWishlistAction(wishlistId) {
    if (confirm(t('wl_delete_confirm'))) {
        store.deleteWishlist(wishlistId);
        showToast(t('wl_deleted'), 'info');
        backToWishlists();
    }
}

function addComment(wishlistId) {
    const input = document.getElementById(`comment-input-${wishlistId}`);
    if (input && input.value.trim()) {
        SAMPLE_COMMENTS.push({
            id: 'c' + Date.now(),
            userId: store.state.currentUser.id,
            targetId: wishlistId,
            text: input.value.trim(),
            createdAt: new Date().toISOString(),
            likes: 0
        });
        showToast(t('wl_comment_added'), 'success');
        renderPage('wishlist');
    }
}

function toggleComplete(wishlistId, productId) {
    store.toggleProductComplete(wishlistId, productId);
    const wishlist = store.state.wishlists.find(w => w.id === wishlistId);
    const isCompleted = wishlist?.completedProducts?.includes(productId);
    showToast(isCompleted ? t('wl_completed_toast') : t('wl_uncompleted_toast'), 'success');
    renderPage('wishlist');
}

function removeFromWishlist(wishlistId, productId) {
    store.removeProductFromWishlist(wishlistId, productId);
    showToast(t('wl_product_removed'), 'info');
    renderPage('wishlist');
}

// Create Wishlist Modal
function openCreateWishlistModal() {
    if (!store.state.isLoggedIn) {
        openAuthModal();
        return;
    }

    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.id = 'create-wishlist-modal';
    modal.innerHTML = `
        <div class="modal-container">
            <button class="modal-close" onclick="document.getElementById('create-wishlist-modal').remove()">
                <i class="fas fa-times"></i>
            </button>
            <h2 style="font-size: 1.3rem; font-weight: 700; margin-bottom: var(--space-xl);">
                <i class="fas fa-plus-circle" style="color: var(--primary);"></i> ${t('wl_create_title')}
            </h2>
            <div class="form-group">
                <label>${t('wl_create_name_label')}</label>
                <input type="text" class="form-input" id="new-wishlist-title" placeholder="${t('wl_create_name_placeholder')}">
            </div>
            <div class="form-group">
                <label>${t('wl_create_desc_label')}</label>
                <textarea class="form-input" id="new-wishlist-desc" placeholder="${t('wl_create_desc_placeholder')}"></textarea>
            </div>
            <div class="form-group">
                <label>${t('wl_create_category_label')}</label>
                <div class="filter-tabs" style="padding-bottom: 0;">
                    ${CATEGORIES.map(cat => `
                        <button class="filter-tab" data-cat="${cat.id}" onclick="selectNewWishlistCategory(this, '${cat.id}')">
                            ${cat.icon} ${t(cat.id)}
                        </button>
                    `).join('')}
                </div>
            </div>
            <div class="form-group">
                <label>${t('wl_create_privacy_label')}</label>
                <div style="display: flex; gap: var(--space-md);">
                    <label style="display: flex; align-items: center; gap: var(--space-sm); cursor: pointer; font-size: 0.85rem; color: var(--text-secondary);">
                        <input type="radio" name="privacy" value="public" checked> <i class="fas fa-globe"></i> ${t('wl_public')}
                    </label>
                    <label style="display: flex; align-items: center; gap: var(--space-sm); cursor: pointer; font-size: 0.85rem; color: var(--text-secondary);">
                        <input type="radio" name="privacy" value="private"> <i class="fas fa-lock"></i> ${t('wl_private')}
                    </label>
                </div>
            </div>
            <button class="btn btn-primary btn-full" onclick="createWishlistAction()">
                <i class="fas fa-check"></i> ${t('wl_create_btn')}
            </button>
        </div>
    `;
    document.body.appendChild(modal);
}

let newWishlistCategory = 'fashion';
function selectNewWishlistCategory(el, cat) {
    el.parentElement.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
    el.classList.add('active');
    newWishlistCategory = cat;
}

function createWishlistAction() {
    const title = document.getElementById('new-wishlist-title').value.trim();
    const desc = document.getElementById('new-wishlist-desc').value.trim();
    const privacy = document.querySelector('input[name="privacy"]:checked')?.value || 'public';

    if (!title) {
        showToast(t('wl_title_required'), 'error');
        return;
    }

    store.createWishlist(title, desc, privacy, newWishlistCategory);
    document.getElementById('create-wishlist-modal').remove();
    showToast(t('wl_created_success'), 'success');
    renderPage('wishlist');
}

// Add Product Modal
function openAddProductModal(wishlistId) {
    const availableProducts = SAMPLE_PRODUCTS.filter(p => {
        const wishlist = store.state.wishlists.find(w => w.id === wishlistId);
        return !wishlist?.products.includes(p.id);
    });

    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.id = 'add-product-modal';
    modal.innerHTML = `
        <div class="modal-container" style="max-width: 560px;">
            <button class="modal-close" onclick="document.getElementById('add-product-modal').remove()">
                <i class="fas fa-times"></i>
            </button>
            <h2 style="font-size: 1.3rem; font-weight: 700; margin-bottom: var(--space-xl);">
                <i class="fas fa-plus" style="color: var(--primary);"></i> ${t('wl_add_product_btn')}
            </h2>
            
            <div class="add-product-url">
                <input type="text" class="form-input" placeholder="${t('wl_url_placeholder')}" id="product-url-input">
                <button class="btn btn-primary" onclick="parseProductUrl()">
                    <i class="fas fa-link"></i>
                </button>
            </div>

            <p style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: var(--space-md);">
                ${t('wl_or_select_existing')}
            </p>

            <div style="max-height: 400px; overflow-y: auto;">
                ${availableProducts.map(p => `
                    <div class="product-preview-card" onclick="addProductToWishlistAction('${wishlistId}', '${p.id}')" style="cursor: pointer; transition: all 0.2s;">
                        <div class="product-preview-img" style="background: ${getProductColor(SAMPLE_PRODUCTS.indexOf(p))}; display:flex; align-items:center; justify-content:center;">
                            <span style="font-size: 2rem;">${p.emoji}</span>
                        </div>
                        <div class="product-preview-info">
                            <h4>${p.name}</h4>
                            <p>${p.brand} • ${formatPrice(p.price)}</p>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

function addProductToWishlistAction(wishlistId, productId) {
    store.addProductToWishlist(wishlistId, productId);
    document.getElementById('add-product-modal')?.remove();
    showToast(t('wl_product_added'), 'success');
    renderPage('wishlist');
}

function parseProductUrl() {
    const url = document.getElementById('product-url-input')?.value;
    if (url) {
        showToast(t('wl_fetching_info'), 'info');
        setTimeout(() => {
            showToast(t('wl_product_parse_success'), 'success');
        }, 1500);
    } else {
        showToast(t('wl_invalid_url'), 'error');
    }
}
