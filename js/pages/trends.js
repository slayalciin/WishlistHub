/* ═══════════════════════════════════════════════════════
   WISHLIST HUB - Trends / Discovery Center Page
   ═══════════════════════════════════════════════════════ */

function renderTrendsPage() {
    // 1. En Çok Kaydedilenler (Most Saved Products)
    // Select popular fashion and design products from SAMPLE_PRODUCTS
    const mostSavedProducts = [
        { product: getProductById('p1'), saves: 432, emoji: '👜' },
        { product: getProductById('p4'), saves: 389, emoji: '⌚' },
        { product: getProductById('p12'), saves: 312, emoji: '👟' },
        { product: getProductById('p24'), saves: 278, emoji: '🧥' }
    ].filter(item => item.product);

    // 2. Popüler Wishlistler (Popular Wishlists)
    const popularWishlists = store.getPopularWishlists(3);

    // 3. Öne Çıkan Moodboardlar (Featured Moodboards)
    const featuredMoodboards = (store.state.moodboardPosts || []).slice(0, 2);

    // 4. Yükselen Kategoriler (Trending Categories)
    const trendingCategories = [
        { name: t('trends_cat_bag'), image: 'assets/siyah_monogram_canta.png', growth: '+54%', saves: 1420 },
        { name: t('trends_cat_sneaker'), image: 'assets/nike_revolution_8.png', growth: '+41%', saves: 2180 },
        { name: t('trends_cat_watch'), image: 'assets/michael_kors_watch.png', growth: '+38%', saves: 980 },
        { name: t('trends_cat_jewelry'), image: 'assets/jewelry_category.png', growth: '+29%', saves: 1150 },
        { name: t('trends_cat_jacket'), image: 'assets/mango_ceket.jpg', growth: '+24%', saves: 890 }
    ];

    // 5. Topluluğun Favorileri (Community Favorites - Tagged Combos)
    // We will render outfits from moodboardPosts with product links
    const communityFavorites = [
        {
            name: store.state.language === 'tr' ? 'Bahar Sokak Stili' : 'Spring Street Style',
            style: store.state.language === 'tr' ? 'Minimalist Kapsül Gardırop' : 'Minimalist Capsule Wardrobe',
            likes: 245,
            products: [
                getProductById('p24'), // Zara Jakarlı Ceket
                getProductById('p18'), // Addax Çanta
                getProductById('p23')  // Chelsea Bot
            ].filter(Boolean)
        },
        {
            name: store.state.language === 'tr' ? 'Koyu Tonlar & Konfor' : 'Dark Tones & Comfort',
            style: store.state.language === 'tr' ? 'Minimal Erkek Giyim' : 'Minimal Menswear',
            likes: 189,
            products: [
                getProductById('p17'), // Mudo Haki Deri Ceket
                getProductById('p21'), // Kığılı Kazak
                getProductById('p23')  // Chelsea Bot
            ].filter(Boolean)
        }
    ];

    // 6. Yeni Keşifler (New Discoveries)
    // Get last added products from database
    const newDiscoveries = SAMPLE_PRODUCTS.slice(SAMPLE_PRODUCTS.length - 8);

    return `
        <section class="section page-enter">
            <!-- Header Banner -->
            <div class="trends-banner">
                <div style="flex: 1; z-index: 1;">
                    <h1>
                        ${t('trends_title')}
                    </h1>
                    <p>
                        ${t('trends_subtitle')}
                    </p>
                </div>
            </div>

            <!-- SECTION 1: En Çok Kaydedilenler -->
            <div style="margin-bottom: var(--space-3xl);">
                <div class="section-header" style="margin-bottom: var(--space-lg);">
                    <div>
                        <h2 class="section-title" style="font-size: 1.5rem; font-weight: 700; display: flex; align-items: center; gap: var(--space-sm);">
                            <i class="fas fa-bookmark" style="color: var(--primary);"></i> ${t('trends_most_saved')}
                        </h2>
                        <p class="section-subtitle">${t('trends_most_saved_desc')}</p>
                    </div>
                </div>
                <div class="grid-4">
                    ${mostSavedProducts.map(item => {
                        const p = item.product;
                        const colorIndex = SAMPLE_PRODUCTS.indexOf(p);
                        const bgGradient = getProductColor(colorIndex >= 0 ? colorIndex : 3);
                        return `
                            <div style="background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: var(--radius-xl); padding: var(--space-md); position: relative; cursor: pointer; transition: transform 0.3s;" class="hover-lift" onclick="viewProduct('${p.id}')">
                                <div style="height: 180px; border-radius: var(--radius-lg); background: ${bgGradient}; display:flex; align-items:center; justify-content:center; margin-bottom: var(--space-md); overflow:hidden; position:relative;">
                                    ${p.image ? 
                                        `<img src="${p.image}" alt="${p.name}" style="width: 100%; height: 100%; object-fit: cover;">` : 
                                        `<span style="font-size: 3.5rem;">${p.emoji}</span>`
                                    }
                                    <span style="position:absolute; top:10px; right:10px; background: rgba(0,0,0,0.65); color: white; padding: 4px 10px; border-radius: var(--radius-full); font-size: 0.75rem; font-weight: 600; display:flex; align-items:center; gap:4px; backdrop-filter: blur(4px);">
                                        <i class="fas fa-heart" style="color: var(--accent-rose);"></i> ${t('trends_saves', { count: item.saves })}
                                    </span>
                                </div>
                                <div style="font-size: 0.75rem; text-transform: uppercase; color: var(--text-muted); font-weight: 700; margin-bottom: 2px;">${p.brand}</div>
                                <h4 style="font-size: 0.95rem; font-weight: 600; margin: 0 0 6px 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${p.name}</h4>
                                <div style="font-size: 0.85rem; font-weight: 700; color: var(--text-primary);">${formatPrice(p.price)}</div>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>

            <!-- SECTION 2: Popüler Wishlistler -->
            <div style="margin-bottom: var(--space-3xl);">
                <div class="section-header" style="margin-bottom: var(--space-lg);">
                    <div>
                        <h2 class="section-title" style="font-size: 1.5rem; font-weight: 700; display: flex; align-items: center; gap: var(--space-sm);">
                            <i class="fas fa-list-ul" style="color: var(--primary);"></i> ${t('trends_popular_wishlists')}
                        </h2>
                        <p class="section-subtitle">${t('trends_popular_wishlists_desc')}</p>
                    </div>
                </div>
                <div class="grid-3">
                    ${popularWishlists.map(w => {
                        const creator = getUserById(w.userId) || { name: "Guest", avatar: null, avatarEmoji: null };
                        const products = w.products.slice(0, 3).map(pid => getProductById(pid)).filter(Boolean);
                        return `
                            <div style="background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: var(--radius-xl); overflow: hidden; cursor: pointer; display: flex; flex-direction: column; transition: transform 0.3s;" class="hover-lift" onclick="viewWishlistDetail('${w.id}')">
                                <div style="height: 140px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px; background: var(--bg-secondary); padding: 2px;">
                                    ${products.map((p, idx) => `
                                        <div style="background: ${getProductColor(idx)}; display:flex; align-items:center; justify-content:center; overflow:hidden;">
                                            ${p.image ? 
                                                `<img src="${p.image}" alt="" style="width:100%; height:100%; object-fit:cover;">` : 
                                                `<i class="fas fa-shopping-bag" style="font-size: 1.8rem; color: rgba(255,255,255,0.7);"></i>`
                                            }
                                        </div>
                                    `).join('')}
                                    ${products.length < 3 ? `
                                        <div style="background: var(--bg-secondary); display:flex; align-items:center; justify-content:center; color: var(--text-muted);">
                                            <i class="fas fa-heart"></i>
                                        </div>
                                    ` : ''}
                                </div>
                                <div style="padding: var(--space-md); flex:1; display:flex; flex-direction:column; justify-content:space-between;">
                                    <div>
                                        <h4 style="font-size: 1.05rem; font-weight: 700; margin: 0 0 var(--space-xs) 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${w.title}</h4>
                                        <div style="display:flex; align-items:center; gap:var(--space-xs); font-size: 0.8rem; color: var(--text-muted); margin-bottom: var(--space-md);">
                                            <span><i class="fas fa-heart" style="color: var(--accent-rose);"></i> ${t('trends_saves', { count: w.likes })}</span>
                                            <span>•</span>
                                            <span><i class="fas fa-eye"></i> ${t('trends_views', { count: w.likes * 14 + 84 })}</span>
                                        </div>
                                    </div>
                                    <div style="display:flex; align-items:center; gap:var(--space-sm); border-top: 1px solid var(--border-subtle); padding-top: var(--space-sm);">
                                        <div style="width:24px; height:24px; border-radius:50%; background: var(--primary); display:flex; align-items:center; justify-content:center; font-size: 0.75rem; overflow:hidden;">
                                            ${creator.avatar ? `<img src="${creator.avatar}" alt="" style="width:100%; height:100%; object-fit:cover;">` : `<i class="fas fa-user" style="color:white; font-size:0.7rem;"></i>`}
                                        </div>
                                        <span style="font-size: 0.85rem; font-weight: 500; color: var(--text-secondary);">${creator.name}</span>
                                    </div>
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>

            <!-- SECTION 3: Yükselen Kategoriler -->
            <div style="margin-bottom: var(--space-3xl);">
                <div class="section-header" style="margin-bottom: var(--space-lg);">
                    <div>
                        <h2 class="section-title" style="font-size: 1.5rem; font-weight: 700; display: flex; align-items: center; gap: var(--space-sm);">
                            ${t('trends_trending_categories')}
                        </h2>
                        <p class="section-subtitle">${t('trends_trending_categories_desc')}</p>
                    </div>
                </div>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: var(--space-md);">
                    ${trendingCategories.map(cat => `
                        <div style="background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: var(--radius-xl); padding: var(--space-xl) var(--space-md); text-align: center; cursor: pointer; transition: all 0.3s;" class="hover-lift" onclick="navigateTo('wishlist')">
                            <div style="width: 80px; height: 80px; border-radius: 50%; overflow: hidden; margin: 0 auto var(--space-sm) auto; border: 2px solid var(--border-subtle); display: flex; align-items: center; justify-content: center; background: var(--bg-secondary); box-shadow: var(--shadow-sm);">
                                <img src="${cat.image}" style="width: 100%; height: 100%; object-fit: cover;">
                            </div>
                            <h4 style="font-size: 1.05rem; font-weight: 700; margin: 0 0 6px 0;">${cat.name}</h4>
                            <div style="display: flex; flex-direction: column; align-items: center; gap: 4px;">
                                <span style="font-size: 0.75rem; color: var(--accent-emerald); font-weight: 600; background: var(--accent-emerald)12; padding: 2px 10px; border-radius: var(--radius-full);">
                                    <i class="fas fa-caret-up"></i> ${cat.growth}
                                </span>
                                <span style="font-size: 0.7rem; color: var(--text-muted);">${t('trends_saves', { count: cat.saves })}</span>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>

            <!-- SECTION 4: Öne Çıkan Moodboardlar -->
            <div style="margin-bottom: var(--space-3xl);">
                <div class="section-header" style="margin-bottom: var(--space-lg);">
                    <div>
                        <h2 class="section-title" style="font-size: 1.5rem; font-weight: 700; display: flex; align-items: center; gap: var(--space-sm);">
                            ${t('trends_featured_moodboards')}
                        </h2>
                        <p class="section-subtitle">${t('trends_featured_moodboards_desc')}</p>
                    </div>
                </div>
                <div class="grid-2">
                    ${featuredMoodboards.map(post => {
                        const products = post.productIds.map(pid => getProductById(pid)).filter(Boolean);
                        return `
                            <div style="background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: var(--radius-xl); overflow:hidden; display:flex; flex-direction:column; cursor:pointer;" class="hover-lift" onclick="navigateTo('inspiration')">
                                <!-- Visual collage of the products -->
                                <div style="height: 200px; display:flex; background: var(--bg-secondary); position:relative; align-items:center; justify-content:center; gap:var(--space-md); padding: var(--space-lg);">
                                    ${products.map((p, idx) => `
                                        <div style="width: 80px; height: 110px; border-radius: var(--radius-md); background: white; box-shadow: var(--shadow-sm); display:flex; flex-direction:column; align-items:center; justify-content:center; border: 1px solid var(--border-subtle); overflow:hidden; position:relative;">
                                            ${p.image ? 
                                                `<img src="${p.image}" alt="" style="width:100%; height:100%; object-fit:cover;">` : 
                                                `<span style="font-size: 2.2rem; margin-bottom: 2px;">${p.emoji}</span>`
                                            }
                                        </div>
                                    `).join('')}
                                    <div style="position:absolute; bottom:12px; left:12px; display:flex; gap:6px;">
                                        ${post.hashtags.slice(0, 2).map(tag => `
                                            <span style="font-size:0.7rem; background:rgba(0,0,0,0.65); color:white; padding:3px 8px; border-radius:var(--radius-full); font-weight:500; backdrop-filter:blur(2px);">${tag}</span>
                                        `).join('')}
                                    </div>
                                </div>
                                <!-- Body -->
                                <div style="padding: var(--space-lg); flex:1; display:flex; flex-direction:column; justify-content:space-between;">
                                    <div>
                                        <div style="display:flex; align-items:center; gap:var(--space-sm); margin-bottom: var(--space-md);">
                                            <div style="width:32px; height:32px; border-radius:50%; background: var(--primary); display:flex; align-items:center; justify-content:center; font-size:0.95rem; overflow:hidden;">
                                                ${post.author.avatar ? `<img src="${post.author.avatar}" alt="" style="width:100%; height:100%; object-fit:cover;">` : `<i class="fas fa-user" style="color:white; font-size:0.85rem;"></i>`}
                                            </div>
                                            <div>
                                                <div style="font-size:0.9rem; font-weight:600; color:var(--text-primary);">${post.author.name}</div>
                                                <div style="font-size:0.75rem; color:var(--text-muted);">${post.author.handle} • ${post.date}</div>
                                            </div>
                                        </div>
                                        <p style="font-size: 0.9rem; color: var(--text-secondary); margin: 0 0 var(--space-md) 0; line-height: 1.5; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
                                            ${post.description}
                                        </p>
                                    </div>
                                    <div style="display:flex; gap:var(--space-md); font-size:0.8rem; color: var(--text-muted); border-top: 1px solid var(--border-subtle); padding-top: var(--space-sm); margin-top: auto;">
                                        <span><i class="fas fa-heart" style="color:var(--accent-rose);"></i> ${post.likes}</span>
                                        <span><i class="fas fa-bookmark" style="color:var(--primary);"></i> ${post.saves}</span>
                                    </div>
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>

            <!-- SECTION 5: Topluluğun Favorileri (Tagged Outfits) -->
            <div style="margin-bottom: var(--space-3xl);">
                <div class="section-header" style="margin-bottom: var(--space-lg);">
                    <div>
                        <h2 class="section-title" style="font-size: 1.5rem; font-weight: 700; display: flex; align-items: center; gap: var(--space-sm);">
                            ${t('trends_community_favorites')}
                        </h2>
                        <p class="section-subtitle">${t('trends_community_favorites_desc')}</p>
                    </div>
                </div>
                <div class="grid-2">
                    ${communityFavorites.map(combo => `
                        <div style="background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: var(--radius-xl); overflow: hidden; display: flex; flex-direction: column; transition: transform 0.3s;" class="hover-lift">
                            <!-- Combo Preview Header -->
                            <div style="background: var(--bg-secondary); padding: var(--space-xl); display: flex; justify-content: center; gap: var(--space-md); height: 180px; align-items: center; position: relative;">
                                ${combo.products.map((p, idx) => `
                                    <div style="width: 80px; height: 105px; background: white; border: 1px solid var(--border-subtle); border-radius: var(--radius-md); box-shadow: var(--shadow-sm); display: flex; flex-direction: column; align-items: center; justify-content: center; position: relative; cursor:pointer; overflow:hidden;" onclick="viewProduct('${p.id}')">
                                        ${p.image ? 
                                            `<img src="${p.image}" alt="" style="width:100%; height:100%; object-fit:cover;">` : 
                                            `<span style="font-size: 2.2rem; margin-bottom: 2px;">${p.emoji}</span>`
                                        }
                                        <div style="position: absolute; bottom: 0; left: 0; right: 0; background: rgba(255,255,255,0.9); font-size: 0.55rem; color: var(--text-secondary); font-weight: 700; text-align: center; padding: 2px 4px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; border-top:1px solid var(--border-subtle);">${p.brand}</div>
                                    </div>
                                `).join('')}
                                <div style="position: absolute; top: 12px; left: 12px; background: var(--primary); color: white; padding: 2px 10px; border-radius: var(--radius-full); font-size: 0.7rem; font-weight: 700; display:flex; align-items:center; gap:4px;">
                                    <i class="fas fa-heart"></i> ${combo.likes} ${t('wl_likes')}
                                </div>
                            </div>
                            <!-- Combo Info & Tagged Products -->
                            <div style="padding: var(--space-lg); flex:1; display:flex; flex-direction:column; justify-content:space-between;">
                                <div>
                                    <h3 style="font-size: 1.15rem; font-weight: 700; margin: 0 0 4px 0;">${combo.name}</h3>
                                    <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: var(--space-lg);">${combo.style}</p>
                                    
                                    <!-- Labeled/Tagged Items list -->
                                    <div style="display: flex; flex-direction: column; gap: var(--space-xs);">
                                        ${combo.products.map(p => `
                                            <div style="display: flex; align-items: center; justify-content: space-between; padding: 6px var(--space-sm); background: var(--bg-secondary); border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
                                                <div style="display: flex; align-items: center; gap: var(--space-sm); cursor: pointer;" onclick="viewProduct('${p.id}')">
                                                    ${p.image ? 
                                                        `<div style="width: 32px; height: 32px; border-radius: var(--radius-sm); overflow: hidden; border: 1px solid var(--border-subtle); display: flex; align-items: center; justify-content: center; background: white; flex-shrink: 0;">
                                                            <img src="${p.image}" style="width: 100%; height: 100%; object-fit: cover;">
                                                        </div>` : 
                                                        `<span style="font-size: 1.2rem; min-width:32px; display:inline-block; text-align:center;">${p.emoji}</span>`
                                                    }
                                                    <div>
                                                        <span style="font-size: 0.8rem; font-weight: 600; color: var(--text-primary);">${p.name}</span>
                                                        <span style="font-size: 0.7rem; color: var(--text-muted); margin-left: 6px;">${p.brand}</span>
                                                    </div>
                                                </div>
                                                <button class="btn btn-ghost btn-sm" onclick="showAddToWishlistModal('${p.id}')" style="padding: 2px 8px;">
                                                    <i class="fas fa-plus" style="font-size: 0.75rem;"></i>
                                                </button>
                                            </div>
                                        `).join('')}
                                    </div>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>

            <!-- SECTION 6: Yeni Keşifler -->
            <div style="margin-bottom: var(--space-3xl);">
                <div class="section-header" style="margin-bottom: var(--space-lg);">
                    <div>
                        <h2 class="section-title" style="font-size: 1.5rem; font-weight: 700; display: flex; align-items: center; gap: var(--space-sm);">
                            <i class="fas fa-sparkles" style="color: var(--accent-yellow);"></i> ${t('trends_new_discoveries')}
                        </h2>
                        <p class="section-subtitle">${t('trends_new_discoveries_desc')}</p>
                    </div>
                </div>
                <div class="grid-4">
                    ${newDiscoveries.map(p => renderProductCard(p)).join('')}
                </div>
            </div>
        </section>
        ${renderFooter()}
    `;
}
