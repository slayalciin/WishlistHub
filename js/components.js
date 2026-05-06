/* ═══════════════════════════════════════════════════════
   WISHLIST HUB - Reusable Component Renderers
   ═══════════════════════════════════════════════════════ */

// Product Card Component
function renderProductCard(product, options = {}) {
    const { showActions = true, showMeta = true, wishlistId = null, compact = false } = options;
    const isLiked = store.state.likedProducts.has(product.id);
    const colorIndex = SAMPLE_PRODUCTS.indexOf(product);
    const bgGradient = getProductColor(colorIndex >= 0 ? colorIndex : Math.floor(Math.random() * 10));

    const isCompleted = wishlistId &&
        store.state.wishlists.find(w => w.id === wishlistId)?.completedProducts?.includes(product.id);

    return `
        <div class="product-card hover-lift" data-product-id="${product.id}" onclick="viewProduct('${product.id}')">
            ${isCompleted ? `
                <div class="product-card-completed">
                    <i class="fas fa-check-circle"></i>
                </div>
            ` : ''}
            <div class="product-card-image" style="${product.image ? '' : `background: ${bgGradient};`} display:flex; align-items:center; justify-content:center; overflow:hidden;">
                ${product.image ? 
                    `<img src="${product.image}" alt="${product.name}" style="width: 100%; height: 100%; object-fit: cover; ${product.imageStyle || ''}">` : 
                    `<span style="font-size: ${compact ? '3rem' : '4rem'}; filter: drop-shadow(0 4px 8px rgba(0,0,0,0.3));">${product.emoji}</span>`
                }
                ${product.trending ? '<span class="product-card-badge">TREND</span>' : ''}
                ${showActions ? `
                    <div class="product-card-actions">
                        <button class="product-card-action ${isLiked ? 'liked' : ''}" 
                                onclick="event.stopPropagation(); toggleLike('${product.id}')">
                            <i class="fas fa-heart"></i>
                        </button>
                        <button class="product-card-action" onclick="event.stopPropagation(); showAddToWishlistModal('${product.id}')">
                            <i class="fas fa-plus"></i>
                        </button>
                        <button class="product-card-action" onclick="event.stopPropagation(); shareProduct('${product.id}')">
                            <i class="fas fa-share-alt"></i>
                        </button>
                    </div>
                ` : ''}
            </div>
            <div class="product-card-body">
                <div class="product-card-brand">${product.brand}</div>
                <div class="product-card-title">${product.name}</div>
                <div class="product-card-price">${formatPrice(product.price)}</div>
                ${product.aiScore ? `
                    <div style="margin-top:6px;">
                        <span class="ai-badge"><i class="fas fa-robot"></i> ${product.reason || 'AI Öneri'}</span>
                    </div>
                ` : ''}
                ${showMeta ? `
                    <div class="product-card-meta">
                        <span><i class="fas fa-heart"></i> ${formatNumber(product.likes)}</span>
                        <span><i class="fas fa-comment"></i> ${product.comments}</span>
                    </div>
                ` : ''}
                ${wishlistId ? `
                    <div style="margin-top: 8px; display: flex; gap: 6px;">
                        <button class="btn btn-sm ${isCompleted ? 'btn-primary' : 'btn-outline'}" 
                                onclick="event.stopPropagation(); toggleComplete('${wishlistId}', '${product.id}')">
                            <i class="fas fa-check"></i> ${isCompleted ? 'Tamamlandı' : 'Tamamla'}
                        </button>
                        <button class="btn btn-sm btn-ghost" 
                                onclick="event.stopPropagation(); removeFromWishlist('${wishlistId}', '${product.id}')">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                ` : ''}
            </div>
        </div>
    `;
}

// Wishlist Card Component
function renderWishlistCard(wishlist, options = {}) {
    const { showUser = true } = options;
    const user = getUserById(wishlist.userId);
    const products = wishlist.products.slice(0, 4).map(pid => getProductById(pid)).filter(Boolean);
    const isLiked = store.state.likedWishlists.has(wishlist.id);
    const completedCount = wishlist.completedProducts?.length || 0;
    const totalCount = wishlist.products.length;

    return `
        <div class="wishlist-card hover-lift" onclick="viewWishlistDetail('${wishlist.id}')">
            <div class="wishlist-card-preview" style="display: grid; grid-template-columns: ${products.length > 1 ? '1fr 1fr' : '1fr'}; grid-template-rows: ${products.length > 2 ? '1fr 1fr' : '1fr'};">
                ${products.map((p, i) => `
                    <div style="${p.image ? '' : `background: ${getProductColor(i)};`} display:flex; align-items:center; justify-content:center; overflow:hidden;">
                        ${p.image ? 
                            `<img src="${p.image}" alt="${p.name}" style="width: 100%; height: 100%; object-fit: cover; ${p.imageStyle || ''}">` : 
                            `<span style="font-size: 2rem;">${p.emoji}</span>`
                        }
                    </div>
                `).join('')}
            </div>
            <div class="wishlist-card-body">
                <div class="wishlist-card-header">
                    <div class="wishlist-card-title">${wishlist.title}</div>
                    <div class="wishlist-card-privacy">
                        <i class="fas fa-${wishlist.privacy === 'public' ? 'globe' : 'lock'}"></i>
                    </div>
                </div>
                <div class="wishlist-card-stats">
                    <span><i class="fas fa-heart ${isLiked ? 'liked' : ''}"></i> ${formatNumber(wishlist.likes)}</span>
                    <span><i class="fas fa-box"></i> ${totalCount} ürün</span>
                    ${completedCount > 0 ? `<span><i class="fas fa-check-circle" style="color: var(--accent-emerald);"></i> ${completedCount}/${totalCount}</span>` : ''}
                </div>
                ${showUser && user ? `
                    <div class="wishlist-card-user">
                        <div style="width:28px; height:28px; border-radius:50%; background: var(--primary); display:flex; align-items:center; justify-content:center; font-size: 0.85rem; overflow:hidden;">
                            ${user.avatar ? 
                                `<img src="${user.avatar}" alt="${user.name}" style="width: 100%; height: 100%; object-fit: cover;">` : 
                                user.avatarEmoji
                            }
                        </div>
                        <span>${user.name}</span>
                        ${user.verified ? '<i class="fas fa-check-circle" style="color: var(--primary); font-size: 0.7rem;"></i>' : ''}
                    </div>
                ` : ''}
            </div>
        </div>
    `;
}

// User Card Component
function renderUserCard(user) {
    const isFollowed = store.state.followedUsers.has(user.id);
    const wishlists = store.state.wishlists.filter(w => w.userId === user.id);

    return `
        <div class="user-card hover-lift" onclick="viewUserProfile('${user.id}')">
            <div class="user-card-avatar">
                <div style="width:100%; height:100%; background: var(--primary); display:flex; align-items:center; justify-content:center; font-size: 2.2rem; overflow:hidden;">
                    ${user.avatar ? 
                        `<img src="${user.avatar}" alt="${user.name}" style="width: 100%; height: 100%; object-fit: cover;">` : 
                        user.avatarEmoji
                    }
                </div>
            </div>
            <div class="user-card-name">${user.name} ${user.verified ? '<i class="fas fa-check-circle" style="color: var(--primary); font-size: 0.8rem;"></i>' : ''}</div>
            <div class="user-card-handle">${user.username}</div>
            <div class="user-card-stats">
                <div class="user-card-stat">
                    <strong>${formatNumber(user.followers)}</strong>
                    <span>Takipçi</span>
                </div>
                <div class="user-card-stat">
                    <strong>${wishlists.length}</strong>
                    <span>Liste</span>
                </div>
                <div class="user-card-stat">
                    <strong>${formatNumber(user.following)}</strong>
                    <span>Takip</span>
                </div>
            </div>
            <button class="btn ${isFollowed ? 'btn-secondary' : 'btn-primary'} btn-full btn-sm" 
                    onclick="event.stopPropagation(); handleFollow('${user.id}')">
                <i class="fas fa-${isFollowed ? 'check' : 'user-plus'}"></i>
                ${isFollowed ? 'Takip Ediliyor' : 'Takip Et'}
            </button>
        </div>
    `;
}

// Blog Card Component
function renderBlogCard(post) {
    const author = getUserById(post.userId);
    const colorIdx = SAMPLE_BLOG_POSTS.indexOf(post);

    return `
        <div class="blog-card hover-lift">
            <div class="blog-card-image" style="background: ${getProductColor(colorIdx)}; display:flex; align-items:center; justify-content:center;">
                <span style="font-size: 4rem; filter: drop-shadow(0 4px 12px rgba(0,0,0,0.3));">${post.emoji}</span>
            </div>
            <div class="blog-card-body">
                <span class="blog-card-tag">${post.category}</span>
                <h3 class="blog-card-title">${post.title}</h3>
                <p class="blog-card-excerpt">${post.excerpt}</p>
                <div class="blog-card-footer">
                    <div class="blog-card-author">
                        <div style="width:28px; height:28px; border-radius:50%; background: var(--primary); display:flex; align-items:center; justify-content:center; font-size: 0.8rem; overflow:hidden;">
                            ${author?.avatar ? 
                                `<img src="${author.avatar}" alt="${author.name}" style="width: 100%; height: 100%; object-fit: cover;">` : 
                                (author?.avatarEmoji || '👤')
                            }
                        </div>
                        <span>${author?.name || 'Anonim'}</span>
                    </div>
                    <div class="blog-card-stats">
                        <span><i class="fas fa-heart"></i> ${formatNumber(post.likes)}</span>
                        <span><i class="fas fa-comment"></i> ${post.comments}</span>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Comment Component
function renderComment(comment) {
    const user = getUserById(comment.userId);
    return `
        <div class="comment-item">
            <div class="comment-avatar">
                <div style="width:100%; height:100%; background: var(--primary); display:flex; align-items:center; justify-content:center; font-size: 1rem; overflow:hidden;">
                    ${user?.avatar ? 
                        `<img src="${user.avatar}" alt="${user.name}" style="width: 100%; height: 100%; object-fit: cover;">` : 
                        (user?.avatarEmoji || '👤')
                    }
                </div>
            </div>
            <div class="comment-body">
                <div class="comment-header">
                    <span class="comment-username">${user?.name || 'Anonim'}</span>
                    <span class="comment-time">${timeAgo(comment.createdAt)}</span>
                </div>
                <p class="comment-text">${comment.text}</p>
                <div class="comment-actions">
                    <span class="comment-action"><i class="fas fa-heart"></i> ${comment.likes}</span>
                    <span class="comment-action"><i class="fas fa-reply"></i> Yanıtla</span>
                </div>
            </div>
        </div>
    `;
}

// Trend Card Component
function renderTrendCard(trend) {
    return `
        <div class="trend-card hover-lift">
            <div class="trend-card-header">
                <span class="trend-rank">#${trend.rank}</span>
                <div class="trend-info">
                    <div class="trend-title">${trend.name}</div>
                    <div class="trend-category">${trend.category}</div>
                </div>
                <div class="trend-change ${trend.change > 0 ? 'up' : 'down'}">
                    <i class="fas fa-arrow-${trend.change > 0 ? 'up' : 'down'}"></i>
                    ${Math.abs(trend.change)}%
                </div>
            </div>
        </div>
    `;
}

// Challenge Card Component
function renderChallengeCard(challenge) {
    return `
        <div class="challenge-card hover-lift">
            <div class="challenge-card-bg" style="background: ${getProductColor(SAMPLE_CHALLENGES.indexOf(challenge))}; display:flex; align-items:center; justify-content:center;">
                <span style="font-size: 3rem;">${challenge.emoji}</span>
            </div>
            <div class="challenge-card-body">
                <h3 class="challenge-card-title">${challenge.title}</h3>
                <p class="challenge-card-desc">${challenge.description}</p>
                <div class="challenge-progress">
                    <div class="challenge-progress-bar" style="width: ${challenge.progress}%"></div>
                </div>
                <div class="challenge-stats">
                    <span>${formatNumber(challenge.participants)} katılımcı</span>
                    <span>${challenge.progress}% tamamlandı</span>
                </div>
            </div>
        </div>
    `;
}

// Feature Card Component
function renderFeatureCard(icon, iconClass, title, desc) {
    return `
        <div class="feature-card reveal">
            <div class="feature-icon ${iconClass}">
                <i class="fas fa-${icon}"></i>
            </div>
            <h3 class="feature-title">${title}</h3>
            <p class="feature-desc">${desc}</p>
        </div>
    `;
}

// Toast Notification
function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    const icons = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        info: 'fa-info-circle'
    };

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <span class="toast-icon"><i class="fas ${icons[type]}"></i></span>
        <span class="toast-message">${message}</span>
        <span class="toast-close" onclick="this.parentElement.remove()"><i class="fas fa-times"></i></span>
    `;

    container.appendChild(toast);
    setTimeout(() => toast.remove(), 4000);
}

// Wardrobe Item Component
function renderWardrobeItem(item, isSelected = false) {
    return `
        <div class="wardrobe-item ${isSelected ? 'selected' : ''}" 
             data-item-id="${item.id}" data-item-type="${item.type}"
             onclick="selectWardrobeItem('${item.id}', '${item.type}')"
             style="background: ${item.color}20; display:flex; align-items:center; justify-content:center;">
            <span style="font-size: 2.5rem;">${item.emoji}</span>
            ${isSelected ? '<div style="position:absolute; top:4px; right:4px; width:20px; height:20px; background:var(--primary); border-radius:50%; display:flex; align-items:center; justify-content:center;"><i class="fas fa-check" style="font-size:0.6rem; color:white;"></i></div>' : ''}
        </div>
    `;
}

// Skeleton Loader
function renderSkeleton(type = 'card') {
    if (type === 'card') {
        return `
            <div class="product-card">
                <div class="skeleton skeleton-image"></div>
                <div style="padding: var(--space-md);">
                    <div class="skeleton skeleton-text" style="width: 40%;"></div>
                    <div class="skeleton skeleton-title"></div>
                    <div class="skeleton skeleton-text" style="width: 30%;"></div>
                </div>
            </div>
        `;
    }
    return '';
}

// Stat Card Component
function renderStatCard(icon, iconBg, value, label) {
    return `
        <div class="stat-card reveal-scale">
            <div class="stat-card-icon" style="background: ${iconBg};">
                <i class="fas fa-${icon}" style="color: inherit;"></i>
            </div>
            <div class="stat-card-value">${value}</div>
            <div class="stat-card-label">${label}</div>
        </div>
    `;
}

// Empty State Component
function renderEmptyState(emoji, title, desc, actionText, actionFn) {
    return `
        <div class="empty-state">
            <div class="empty-state-icon">${emoji}</div>
            <h3 class="empty-state-title">${title}</h3>
            <p class="empty-state-desc">${desc}</p>
            ${actionText ? `<button class="btn btn-primary" onclick="${actionFn}">${actionText}</button>` : ''}
        </div>
    `;
}
