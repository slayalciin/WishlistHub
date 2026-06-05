// Register the Vizon Suede Bag and McQueen Sneakers in the global products list if not already present
if (typeof SAMPLE_PRODUCTS !== 'undefined') {
    if (!SAMPLE_PRODUCTS.find(p => p.id === 'p_suet_canta')) {
        SAMPLE_PRODUCTS.unshift({
            id: 'p_suet_canta',
            name: 'Vizon Çift Askılı Kadın Süet Çanta',
            brand: 'Beymen Club',
            category: 'fashion',
            price: 16950,
            currency: '₺',
            url: 'https://www.beymen.com/tr/p_beymen-club-vizon-cift-askili-kadin-suet-canta_1930201',
            image: 'assets/suet_canta.jpg',
            emoji: '👜',
            likes: 245,
            comments: 1,
            tags: ['çanta', 'süet', 'vizon', 'beymen'],
            trending: true,
            addedBy: 'u6'
        });
    }

    if (!SAMPLE_PRODUCTS.find(p => p.id === 'p_mcqueen_sneaker')) {
        SAMPLE_PRODUCTS.unshift({
            id: 'p_mcqueen_sneaker',
            name: 'McQueen Oversized Siyah Beyaz Kadın Deri Sneaker',
            brand: 'McQueen',
            category: 'fashion',
            price: 38450,
            currency: '₺',
            url: 'https://www.beymen.com/tr/p_mcqueen-oversized-siyah-beyaz-kadin-deri-sneaker_1498299?isfuzzysearch=True',
            image: 'assets/mcqueen_sneaker.png',
            emoji: '👟',
            likes: 312,
            comments: 0,
            tags: ['sneaker', 'mcqueen', 'deri', 'ayakkabı'],
            trending: true,
            addedBy: 'u1'
        });
    }

    if (!SAMPLE_PRODUCTS.find(p => p.id === 'p_mango_ceket')) {
        SAMPLE_PRODUCTS.unshift({
            id: 'p_mango_ceket',
            name: 'Mücevher Düğmeli Triko Ceket',
            brand: 'Mango',
            category: 'fashion',
            price: 2999.99,
            currency: '₺',
            url: 'https://shop.mango.com/tr/tr/p/kad%C4%B1n/kazaklar-ve-h%C4%B1rkalar/h%C4%B1rka/mucevher-dugmeli-triko-ceket_27073344',
            image: 'assets/mango_ceket.jpg',
            emoji: '🧥',
            likes: 189,
            comments: 1,
            tags: ['ceket', 'triko', 'mango', 'hırka'],
            trending: true,
            addedBy: 'u3'
        });
    }

    if (!SAMPLE_PRODUCTS.find(p => p.id === 'p_zara_etek')) {
        SAMPLE_PRODUCTS.unshift({
            id: 'p_zara_etek',
            name: 'ZW Collection Puantiyeli Kalem Etek',
            brand: 'Zara',
            category: 'fashion',
            price: 2290.00,
            currency: '₺',
            url: 'https://www.zara.com/tr/tr/zw-collection-puantiyeli-kalem-etek-p01478048.html',
            image: 'assets/zara_etek.png',
            emoji: '👗',
            likes: 156,
            comments: 0,
            tags: ['etek', 'kalem etek', 'zara', 'puantiyeli'],
            trending: true,
            addedBy: 'u1'
        });
    }
}

// Initialize state in window to persist during user session navigation
// Initialize state in store if empty
if (!store.state.moodboardPosts || store.state.moodboardPosts.length === 0) {
    store.state.moodboardPosts = [
        {
            id: "mb_post_good_girl",
            userId: "u1",
            author: {
                name: "Ayşe Yılmaz",
                handle: "@aysestyle",
                avatar: "assets/aysestyle_avatar.png",
                avatarEmoji: null
            },
            date: "2 saat önce",
            description: "Bu yılın wishlistleri",
            hashtags: ["#carolinaherrera", "#calvinklein", "#airpodsmax", "#styleinspo", "#chic"],
            productIds: ["p_good_girl_blush", "p_ck_convertible", "p_airpods_max_purple"],
            likes: 312,
            commentsCount: 18,
            saves: 95,
            liked: false,
            saved: false,
            isCustomCollage: true
        },
        {
            id: "mb_post_1",
            userId: "u1",
            author: {
                name: "Ayşe Yılmaz",
                handle: "@aysestyle",
                avatar: "assets/aysestyle_avatar.png",
                avatarEmoji: null
            },
            date: "2 saat önce",
            description: "Bahar aylarında soft renklerin uyumunu çok seviyorum. Deri parçalarla keten tonlarını ve modern aksesuarları eşleştirdim. Sizce nasıl olmuş?",
            hashtags: ["#springlook", "#pastels", "#fashionhub", "#styleinspiration"],
            productIds: ["p24", "p18", "p23"], // Zara Jakarlı Ceket, Addax Yağ Yeşili Çanta, Sivri Burun Chelsea Bot
            likes: 142,
            commentsCount: 12,
            saves: 45,
            liked: false,
            saved: false
        },
        {
            id: "mb_post_2",
            userId: "u4",
            author: {
                name: "Emre Aktaş",
                handle: "@emrestyle",
                avatar: "assets/emrestyle_avatar.png",
                avatarEmoji: null
            },
            date: "1 gün önce",
            description: "Koyu tonlar ve minimalist kesimler. Günlük stilinizi ve konforunuzu zahmetsizce yükseltecek triko ve bot kombinasyonu.",
            hashtags: ["#mensstyle", "#minimalism", "#streetwear", "#dailylook"],
            productIds: ["p17", "p21", "p23"], // Mudo Haki Deri Ceket, Siyah Triko Kazak, Chelsea Bot
            likes: 98,
            commentsCount: 6,
            saves: 22,
            liked: false,
            saved: false
        }
    ];
}

window.stylingRequests = window.stylingRequests || [
    {
        id: "sr_post_mango_ceket",
        author: {
            name: "Zeynep Demir",
            handle: "@zeynepexplores",
            avatar: "assets/zeynepexplores_avatar.png",
            avatarEmoji: null
        },
        date: "Yeni",
        title: "Bu triko ceketi nasıl kombinlemeliyim?",
        question: "Mango'dan aldığım bu mücevher düğmeli triko ceketi sizce nasıl kombinlemeliyim, etekle mi pantolonla mı?",
        targetProductId: "p_mango_ceket",
        comments: [
            {
                id: "c_mango_zara",
                author: {
                    name: "Ayşe Yılmaz",
                    handle: "@aysestyle",
                    avatarEmoji: null
                },
                text: "Bu etekle ceketin yakışacağını düşünüyorum.",
                productId: "p_zara_etek",
                date: "Şimdi"
            }
        ]
    },
    {
        id: "sr_post_suet_canta",
        author: {
            name: "Duygu Alas",
            handle: "@duygualas",
            avatar: "https://i.pravatar.cc/300?u=u6",
            avatarEmoji: null
        },
        date: "Yeni",
        title: "Bu süet çantayı nasıl kombinlerim?",
        question: "Beymen Club'dan aldığım bu vizon çift askılı süet çantayı çok beğendim. Günlük kullanımda altına nasıl bir ayakkabı veya kombin tercih etmeliyim?",
        targetProductId: "p_suet_canta",
        comments: [
            {
                id: "c_suet_mcqueen",
                author: {
                    name: "Ayşe Yılmaz",
                    handle: "@aysestyle",
                    avatarEmoji: null
                },
                text: "Günlük kullanım için çantanın altına bu ayakkabı olabilir.",
                productId: "p_mcqueen_sneaker",
                date: "Şimdi"
            }
        ]
    },
    {
        id: "sr_post_1",
        author: {
            name: "Zeynep Demir",
            handle: "@zeynepexplores",
            avatar: "assets/zeynepexplores_avatar.png",
            avatarEmoji: null
        },
        date: "3 saat önce",
        title: "Bu parçayı nasıl kombinlerim?",
        question: "Yeni aldığım bu Zara jakarlı krop ceketi çok beğendim ama altına ne tür bir etek veya ayakkabı uydurabilirim? Özellikle kahve ve pastel tonlarda kombin önerilerine açığım! 🌸",
        targetProductId: "p24", // Zara Jakarlı Ceket
        comments: [
            {
                id: "c_1_1",
                author: {
                    name: "Ayşe Yılmaz",
                    handle: "@aysestyle"
                },
                text: "Bu ceketin altına kesinlikle LCW Modest büzgülü etek çok yakışır! Renk uyumu harika olur.",
                productId: "p20", // LCW Etek
                date: "2 saat önce"
            },
            {
                id: "c_1_2",
                author: {
                    name: "Kamer Abanoz",
                    handle: "@kamerabanoz"
                },
                text: "Bot olarak Chelsea tarzı siyah bir bot veya sivri burunlu şık bir ayakkabı kombini tamamlayacaktır.",
                productId: "p19", // Siyah Topuklu
                date: "1 saat önce"
            }
        ]
    },
    {
        id: "sr_post_2",
        author: {
            name: "Can Özkan",
            handle: "@cangamer",
            avatar: "https://i.pravatar.cc/300?u=u5",
            avatarEmoji: null
        },
        date: "5 saat önce",
        title: "Setup tasarımı için öneri",
        question: "Yeni RGB oyuncu masamı aldım. Arka plana oda ambiyansını artıracak ne tür bir aydınlatma ekleyebilirim?",
        targetProductId: "p9", // Neo Oyuncu Masası
        comments: [
            {
                id: "c_2_1",
                author: {
                    name: "Duygu Alas",
                    handle: "@duygualas"
                },
                text: "Govee TV arkası led şerit harika bir senkronizasyon sağlıyor, odana bambaşka bir hava katar!",
                productId: "p46", // Govee Led
                date: "4 saat önce"
            }
        ]
    }
];

function renderInspirationPage() {
    return `
        <div class="inspiration-container page-enter">
            <!-- Header section with creation trigger -->
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: var(--space-2xl); flex-wrap: wrap; gap: var(--space-md);">
                <div>
                    <h1 style="font-size: 2.2rem; font-weight: 800; color: var(--text-primary); margin-bottom: var(--space-xs);">
                        ${t('ins_title')}
                    </h1>
                    <p style="color: var(--text-secondary);">
                        ${t('ins_desc')}
                    </p>
                </div>
                <button class="btn btn-primary" onclick="openShareInspirationModal()" style="display: flex; align-items: center; gap: var(--space-sm); border-radius: var(--radius-full);">
                    <i class="fas fa-plus"></i> ${t('ins_create_post')}
                </button>
            </div>

            <!-- Main Two Column Layout -->
            <div class="inspiration-feed-layout">
                <!-- Left Column: Moodboards & Outfits -->
                <div class="feed-column">
                    <h2 style="font-size: 1.25rem; font-weight: 700; margin-bottom: var(--space-lg); display: flex; align-items: center; gap: 8px;">
                        <i class="fas fa-images"></i> ${t('ins_moodboards')} 
                        <span style="font-size: 0.8rem; font-weight: 500; color: var(--text-muted); background: var(--bg-secondary); padding: 4px 10px; border-radius: 12px; margin-left: 6px;">${t('ins_collections')}</span>
                    </h2>
                    
                    <div id="moodboards-feed-container">
                        ${store.state.moodboardPosts.map(post => renderMoodboardPostCard(post)).join('')}
                    </div>
                </div>

                <!-- Right Column: Q&A Combos & Advice -->
                <div class="feed-column">
                    <h2 style="font-size: 1.25rem; font-weight: 700; margin-bottom: var(--space-lg); display: flex; align-items: center; gap: 8px;">
                        <i class="fas fa-question-circle"></i> ${t('ins_how_to_style')}
                        <span style="font-size: 0.8rem; font-weight: 500; color: var(--text-muted); background: var(--bg-secondary); padding: 4px 10px; border-radius: 12px; margin-left: 6px;">${t('ins_community_help')}</span>
                    </h2>
                    
                    <div id="styling-requests-feed-container">
                        ${window.stylingRequests.map(post => renderStylingRequestCard(post)).join('')}
                    </div>
                </div>
            </div>
        </div>
    `;
}

/* ── RENDER HELPERS FOR MOODBOARDS (LEFT COLUMN) ── */

function renderMoodboardPostCard(post) {
    const products = post.productIds.map(id => getProductById(id)).filter(Boolean);
    
    // Collage layouts based on product count
    let collageHtml = '';
    if (products.length > 0) {
        if (post.id === 'mb_post_good_girl' || post.isCustomCollage) {
            collageHtml = `
                <div style="background: #ffffff; border-radius: var(--radius-lg); padding: var(--space-md); display: flex; flex-direction: column; gap: var(--space-md); margin-bottom: var(--space-md); border: 1px solid var(--border-subtle); position: relative; overflow: hidden; align-items: center; justify-content: center; min-height: 380px;">
                    <!-- Grid Collage resembling Pinterest style -->
                    <div style="display: grid; grid-template-columns: repeat(12, 1fr); grid-template-rows: repeat(12, 1fr); width: 100%; height: 350px; position: relative; background: #ffffff;">
                        <!-- Perfume - Left Side -->
                        <div style="grid-column: 1 / span 5; grid-row: 1 / span 12; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.3s; padding: var(--space-sm); position: relative;" 
                             class="hover-lift"
                             onclick="event.stopPropagation(); window.open('${products[0].url}', '_blank')">
                            <img src="${products[0].image}" alt="${products[0].name}" style="max-height: 100%; max-width: 100%; object-fit: contain; filter: drop-shadow(0px 8px 16px rgba(0,0,0,0.06));">
                            <span style="position: absolute; bottom: 8px; left: 8px; font-size: 0.65rem; color: var(--text-muted); font-weight: 700; background: var(--bg-secondary); padding: 2px 6px; border-radius: 4px; border: 1px solid var(--border-subtle);">${products[0].brand}</span>
                        </div>
                        
                        <!-- Bag - Top Right -->
                        <div style="grid-column: 6 / span 7; grid-row: 1 / span 6; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.3s; padding: var(--space-sm); border-left: 1px dashed var(--border-subtle); border-bottom: 1px dashed var(--border-subtle); position: relative;" 
                             class="hover-lift"
                             onclick="event.stopPropagation(); window.open('${products[1].url}', '_blank')">
                            <img src="${products[1].image}" alt="${products[1].name}" style="max-height: 100%; max-width: 100%; object-fit: contain; filter: drop-shadow(0px 8px 16px rgba(0,0,0,0.06));">
                            <span style="position: absolute; bottom: 8px; left: 8px; font-size: 0.65rem; color: var(--text-muted); font-weight: 700; background: var(--bg-secondary); padding: 2px 6px; border-radius: 4px; border: 1px solid var(--border-subtle);">${products[1].brand}</span>
                        </div>
                        
                        <!-- Headphones - Bottom Right -->
                        <div style="grid-column: 6 / span 7; grid-row: 7 / span 6; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.3s; padding: var(--space-sm); border-left: 1px dashed var(--border-subtle); position: relative;" 
                             class="hover-lift"
                             onclick="event.stopPropagation(); window.open('${products[2].url}', '_blank')">
                            <img src="${products[2].image}" alt="${products[2].name}" style="max-height: 100%; max-width: 100%; object-fit: contain; filter: drop-shadow(0px 8px 16px rgba(0,0,0,0.06));">
                            <span style="position: absolute; bottom: 8px; left: 8px; font-size: 0.65rem; color: var(--text-muted); font-weight: 700; background: var(--bg-secondary); padding: 2px 6px; border-radius: 4px; border: 1px solid var(--border-subtle);">${products[2].brand}</span>
                        </div>
                    </div>
                    
                    <!-- Helper overlay tooltip hint -->
                    <div style="position: absolute; bottom: var(--space-sm); right: var(--space-sm); background: rgba(0,0,0,0.6); color: white; padding: 4px 10px; border-radius: var(--radius-full); font-size: 0.7rem; pointer-events: none; backdrop-filter: blur(4px); display:flex; align-items:center; gap:4px; z-index: 5;">
                        <i class="fas fa-hand-pointer"></i> Ürünlere tıklayarak satın alabilirsiniz
                    </div>
                </div>
            `;
        } else {
            collageHtml = `
                <div class="moodboard-collage">
                    ${products.map((p, index) => {
                        let layoutClass = 'collage-item-square';
                        if (index === 0) layoutClass = 'collage-item-large';
                        else if (index === 1 && products.length > 2) layoutClass = 'collage-item-tall';
                        else if (index === 2) layoutClass = 'collage-item-wide';
                        
                        return `
                            <div class="collage-item ${layoutClass}" onclick="event.stopPropagation(); window.open('${p.url}', '_blank')">
                                <img src="${p.image || 'assets/logo.png'}" alt="${p.name}">
                            </div>
                        `;
                    }).join('')}
                </div>
            `;
        }
    }

    return `
        <div class="social-post-card" id="post-${post.id}">
            <!-- Header -->
            <div class="post-header">
                <div class="post-user-avatar">
                    ${post.author.avatar ? `<img src="${post.author.avatar}" alt="Avatar">` : `<i class="fas fa-user"></i>`}
                </div>
                <div class="post-header-info">
                    <span class="post-author-name">${post.author.name}</span>
                    <span class="post-author-handle">${post.author.handle}</span>
                </div>
                <span class="post-date">${t(post.date)}</span>
            </div>

            <!-- Moodboard Collage -->
            ${collageHtml}

            <!-- Tagged Products Mini Cards -->
            <div style="font-size: 0.8rem; font-weight: 700; color: var(--text-muted); margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px;">${t('ins_combo_items')}</div>
            <div class="post-products-container">
                ${products.map(p => `
                    <div class="social-mini-card" onclick="window.open('${p.url}', '_blank')">
                        <img src="${p.image || 'assets/logo.png'}" alt="${p.name}">
                        <div class="social-mini-info">
                            <span class="social-mini-brand">${p.brand}</span>
                            <span class="social-mini-title">${p.name}</span>
                            <span class="social-mini-price">${formatPrice(p.price)}</span>
                        </div>
                        <i class="fas fa-heart social-mini-save ${store.state.likedProducts.has(p.id) ? 'saved' : ''}" 
                           onclick="event.stopPropagation(); toggleProductSaveInPost('${p.id}', this)"
                           title="${t('ins_save_wishlist')}"></i>
                           
                        <!-- Hover Detail Preview -->
                        <div class="hover-preview-card">
                            <strong style="display:block; font-size:0.85rem; margin-bottom:4px;">${p.brand}</strong>
                            <p style="font-size:0.75rem; color:var(--text-secondary); line-height:1.3; margin-bottom:6px;">${p.name}</p>
                            <span style="color:var(--primary); font-weight:700; font-size:0.85rem;">${formatPrice(p.price)}</span>
                        </div>
                    </div>
                `).join('')}
            </div>

            <!-- Description & Hashtags -->
            <p style="font-size: 0.9rem; line-height: 1.5; color: var(--text-secondary); margin-bottom: var(--space-sm);">
                ${post.description}
            </p>
            <div style="display: flex; gap: var(--space-xs); flex-wrap: wrap; margin-bottom: var(--space-md);">
                ${post.hashtags.map(tag => `<span style="font-size: 0.8rem; font-weight: 600; color: var(--primary); cursor: pointer;">${tag}</span>`).join('')}
            </div>

            <!-- Interaction Bar -->
            <div class="post-actions-bar">
                <button class="post-action-btn ${post.liked ? 'liked' : ''}" onclick="toggleLikePost('${post.id}', this)">
                    <i class="fa${post.liked ? 's' : 'r'} fa-heart"></i>
                    <span>${post.likes} ${t('ins_like_btn')}</span>
                </button>
                <button class="post-action-btn" onclick="focusCommentBox('${post.id}')">
                    <i class="far fa-comment"></i>
                    <span>${t('ins_comment_btn')}</span>
                </button>
                <button class="post-action-btn ${post.saved ? 'saved' : ''}" onclick="toggleSavePost('${post.id}', this)">
                    <i class="fa${post.saved ? 's' : 'r'} fa-bookmark"></i>
                    <span>${t('ins_save_btn')}</span>
                </button>
                
                <!-- Create Combo CTA Button -->
                <button class="btn btn-outline btn-sm" onclick="addAllPostProductsToWishlist('${post.id}')" style="margin-left: auto; border-radius: var(--radius-full); font-size: 0.75rem; padding: 6px 14px;">
                    <i class="fas fa-layer-group"></i> ${t('ins_add_combo')}
                </button>
            </div>
        </div>
    `;
}

/* ── RENDER HELPERS FOR Q&A STYLING REQUESTS (RIGHT COLUMN) ── */

function renderStylingRequestCard(post) {
    const targetProduct = getProductById(post.targetProductId);
    if (!targetProduct) return '';

    return `
        <div class="social-post-card" id="post-${post.id}">
            <!-- Header -->
            <div class="post-header">
                <div class="post-user-avatar">
                    ${post.author.avatar ? `<img src="${post.author.avatar}" alt="Avatar">` : `<i class="fas fa-user"></i>`}
                </div>
                <div class="post-header-info">
                    <span class="post-author-name">${post.author.name}</span>
                    <span class="post-author-handle">${post.author.handle}</span>
                </div>
                <span class="post-date">${t(post.date)}</span>
            </div>

            <!-- Post Core Question -->
            <h3 style="font-size: 1.1rem; font-weight: 700; margin-bottom: 8px; color: var(--text-primary);">${post.title}</h3>
            <p style="font-size: 0.9rem; line-height: 1.5; color: var(--text-secondary); margin-bottom: var(--space-md);">
                ${post.question}
            </p>

            <!-- Target Product Card -->
            <div style="font-size: 0.8rem; font-weight: 700; color: var(--text-muted); margin-bottom: 8px; text-transform: uppercase;">${t('ins_select_target_prod')}</div>
            <div class="social-mini-card" style="margin-bottom: var(--space-md); border-color: var(--primary-100); background: rgba(139, 105, 20, 0.02);" onclick="window.open('${targetProduct.url}', '_blank')">
                <img src="${targetProduct.image || 'assets/logo.png'}" alt="${targetProduct.name}">
                <div class="social-mini-info">
                    <span class="social-mini-brand" style="color:var(--primary);">${targetProduct.brand}</span>
                    <span class="social-mini-title" style="font-weight:700;">${targetProduct.name}</span>
                    <span class="social-mini-price">${formatPrice(targetProduct.price)}</span>
                </div>
                <i class="fas fa-heart social-mini-save ${store.state.likedProducts.has(targetProduct.id) ? 'saved' : ''}" 
                   onclick="event.stopPropagation(); toggleProductSaveInPost('${targetProduct.id}', this)"
                   title="${t('ins_save_wishlist')}"></i>
                   
                <!-- Hover Preview -->
                <div class="hover-preview-card">
                    <strong style="display:block; font-size:0.85rem; margin-bottom:4px;">${targetProduct.brand}</strong>
                    <p style="font-size:0.75rem; color:var(--text-secondary); line-height:1.3; margin-bottom:6px;">${targetProduct.name}</p>
                    <span style="color:var(--primary); font-weight:700; font-size:0.85rem;">${formatPrice(targetProduct.price)}</span>
                </div>
            </div>

            <!-- Comments/Suggestions Stream -->
            <div style="font-size: 0.8rem; font-weight: 700; color: var(--text-muted); margin-bottom: 8px; text-transform: uppercase;">${t('ins_qa_suggestions_header', { count: post.comments.length })}</div>
            <div class="qa-comments-wrapper" id="comments-container-${post.id}">
                ${post.comments.map(comment => renderCommentItem(comment)).join('')}
            </div>

            <!-- Comment Composer with product recommendation tagging -->
            <div class="comment-composer">
                <div class="comment-input-row">
                    <textarea class="comment-textarea" id="comment-text-${post.id}" placeholder="${t('ins_comment_input_placeholder')}"></textarea>
                </div>
                <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 6px; flex-wrap:wrap; gap:6px;">
                    <!-- Dropdown for tagging product -->
                    <div style="display:flex; align-items:center; gap:6px;">
                        <i class="fas fa-tag" style="font-size: 0.8rem; color: var(--primary);"></i>
                        <select class="comment-select-product" id="comment-prod-${post.id}">
                            <option value="">${t('ins_comment_suggest_placeholder')}</option>
                            ${SAMPLE_PRODUCTS.map(p => `<option value="${p.id}">${p.brand} - ${p.name.substring(0, 30)}...</option>`).join('')}
                        </select>
                    </div>
                    
                    <button class="comment-send-btn" onclick="submitStylingRecommendation('${post.id}')">${t('wl_send_comment')}</button>
                </div>
            </div>
        </div>
    `;
}

// Render individual comments in the Q&A thread
function renderCommentItem(comment) {
    let recommendedProductHtml = '';
    
    if (comment.productId) {
        const product = getProductById(comment.productId);
        if (product) {
            recommendedProductHtml = `
                <div class="social-mini-card" style="margin-top: 8px; padding: 6px; border-radius: 6px;" onclick="window.open('${product.url}', '_blank')">
                    <img src="${product.image || 'assets/logo.png'}" alt="${product.name}" style="width: 38px; height: 38px; border-radius: 4px;">
                    <div class="social-mini-info" style="gap:0;">
                        <span style="font-size: 0.6rem; font-weight:700; color:var(--text-muted); text-transform:uppercase;">${product.brand}</span>
                        <span style="font-size: 0.75rem; font-weight: 600; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${product.name}</span>
                        <span style="font-size: 0.7rem; font-weight:700; color:var(--primary);">${formatPrice(product.price)}</span>
                    </div>
                    <i class="fas fa-heart social-mini-save ${store.state.likedProducts.has(product.id) ? 'saved' : ''}" 
                       onclick="event.stopPropagation(); toggleProductSaveInPost('${product.id}', this)"
                       title="${t('ins_save_wishlist')}"></i>
                       
                    <!-- Hover Preview -->
                    <div class="hover-preview-card">
                        <strong style="display:block; font-size:0.85rem; margin-bottom:4px;">${product.brand}</strong>
                        <p style="font-size:0.75rem; color:var(--text-secondary); line-height:1.3; margin-bottom:6px;">${product.name}</p>
                        <span style="color:var(--primary); font-weight:700; font-size:0.85rem;">${formatPrice(product.price)}</span>
                    </div>
                </div>
            `;
        }
    }

    return `
        <div class="qa-comment-item">
            <div style="width: 32px; height: 32px; border-radius: 50%; background: var(--primary); color: white; display: flex; align-items: center; justify-content: center; font-size: 0.85rem; font-weight:700; flex-shrink: 0; overflow:hidden;">
                ${comment.author.avatar ? `<img src="${comment.author.avatar}" alt="" style="width:100%;height:100%;object-fit:cover;">` : `<i class="fas fa-user" style="color:white; font-size:0.8rem;"></i>`}
            </div>
            <div class="comment-content">
                <div class="comment-user-info">
                    <span class="comment-username">${comment.author.name}</span>
                    <span class="comment-time">${comment.date ? t(comment.date) : t('comp_time_ago_just_now')}</span>
                </div>
                <p class="comment-text">${comment.text}</p>
                ${recommendedProductHtml}
            </div>
        </div>
    `;
}

/* ── INTERACTION SCRIPTS ── */

// Like moodboard post
function toggleLikePost(postId, button) {
    const post = store.state.moodboardPosts.find(p => p.id === postId);
    if (!post) return;
    
    post.liked = !post.liked;
    if (post.liked) {
        post.likes++;
        button.classList.add('liked');
        button.querySelector('i').className = 'fas fa-heart';
    } else {
        post.likes--;
        button.classList.remove('liked');
        button.querySelector('i').className = 'far fa-heart';
    }
    
    button.querySelector('span').textContent = `${post.likes} ${t('ins_like_btn')}`;
    store.saveToStorage();
    showToast(post.liked ? t('ins_post_liked') : t('ins_post_unliked'), 'success');
}

// Save moodboard post
function toggleSavePost(postId, button) {
    const post = store.state.moodboardPosts.find(p => p.id === postId);
    if (!post) return;
    
    post.saved = !post.saved;
    if (post.saved) {
        button.classList.add('saved');
        button.querySelector('i').className = 'fas fa-bookmark';
        store.toggleSaveItem('posts', postId);
        showToast(t('ins_post_saved'), 'success');
    } else {
        button.classList.remove('saved');
        button.querySelector('i').className = 'far fa-bookmark';
        store.toggleSaveItem('posts', postId);
        showToast(t('ins_post_unsaved'), 'info');
    }
}

// Save product inside card/mini-card to wishlist
function toggleProductSaveInPost(productId, element) {
    if (!store.state.isLoggedIn) {
        openAuthModal();
        return;
    }
    
    store.toggleLikeProduct(productId);
    const isLiked = store.state.likedProducts.has(productId);
    
    if (isLiked) {
        element.classList.add('saved');
        showToast(t('ins_prod_fav'), 'success');
    } else {
        element.classList.remove('saved');
        showToast(t('ins_prod_unfav'), 'info');
    }
}

// Add all products of a post to wishlist
function addAllPostProductsToWishlist(postId) {
    if (!store.state.isLoggedIn) {
        openAuthModal();
        return;
    }

    const post = store.state.moodboardPosts.find(p => p.id === postId);
    if (!post) return;

    const userWishlists = store.getUserWishlists(store.state.currentUser.id);

    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.id = 'add-combo-wishlist-modal';
    modal.innerHTML = `
        <div class="modal-container" style="max-width: 400px;">
            <button class="modal-close" onclick="document.getElementById('add-combo-wishlist-modal').remove()">
                <i class="fas fa-times"></i>
            </button>
            <h3 style="font-size: 1.15rem; font-weight: 700; margin-bottom: var(--space-md); display:flex; align-items:center; gap:6px;">
                <i class="fas fa-layer-group" style="color:var(--primary);"></i> ${t('ins_add_combo_title')}
            </h3>
            <p style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: var(--space-lg);">
                ${t('ins_add_combo_desc', { count: post.productIds.length })}
            </p>
            ${userWishlists.length > 0 ? userWishlists.map(w => `
                <div style="display: flex; align-items: center; justify-content: space-between; padding: var(--space-md); background: var(--bg-glass); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); margin-bottom: var(--space-sm); cursor: pointer; transition: all 0.2s;"
                     onmouseover="this.style.borderColor='var(--primary)'"
                     onmouseout="this.style.borderColor='var(--border-subtle)'"
                     onclick="addAllProductsToWishlistAction('${w.id}', [${post.productIds.map(id => `'${id}'`).join(',')}]); document.getElementById('add-combo-wishlist-modal').remove();">
                    <div>
                        <p style="font-weight: 600; font-size: 0.9rem;">${w.title}</p>
                        <p style="font-size: 0.75rem; color: var(--text-muted);">${w.products.length} ${t('pr_act_products').toLowerCase()}</p>
                    </div>
                    <i class="fas fa-plus" style="color: var(--primary);"></i>
                </div>
            `).join('') : `<p style="color: var(--text-muted); text-align: center; padding: var(--space-lg);">${t('comp_empty_wishlists')}</p>`}
            <button class="btn btn-secondary btn-full" onclick="document.getElementById('add-combo-wishlist-modal').remove(); openCreateWishlistModal();" style="margin-top: var(--space-md);">
                <i class="fas fa-plus"></i> ${t('wl_new_list_card')}
            </button>
        </div>
    `;
    document.body.appendChild(modal);
}

// Action helper to add array of products to wishlist
function addAllProductsToWishlistAction(wishlistId, productIds) {
    const wishlist = store.state.wishlists.find(w => w.id === wishlistId);
    if (!wishlist) return;

    let addedCount = 0;
    productIds.forEach(pid => {
        if (!wishlist.products.includes(pid)) {
            wishlist.products.push(pid);
            addedCount++;
        }
    });

    store.saveState();
    showToast(t('ins_combo_added_success', { count: addedCount, title: wishlist.title }), 'success');
}

// Submit Styling Recommendation comment
function submitStylingRecommendation(requestId) {
    if (!store.state.isLoggedIn) {
        openAuthModal();
        return;
    }

    const textEl = document.getElementById(`comment-text-${requestId}`);
    const selectEl = document.getElementById(`comment-prod-${requestId}`);
    
    const text = textEl.value.trim();
    const productId = selectEl.value;

    if (!text) {
        showToast(t('ins_comment_empty_error'), 'error');
        return;
    }

    const request = window.stylingRequests.find(r => r.id === requestId);
    if (!request) return;

    // Build new comment
    const newComment = {
        id: `c_${requestId}_${Date.now()}`,
        author: {
            name: store.state.currentUser.name,
            handle: store.state.currentUser.username,
            avatarEmoji: null
        },
        text: text,
        productId: productId || null,
        date: "Şimdi"
    };

    // Push comment
    request.comments.push(newComment);
    
    // Clear composer fields
    textEl.value = '';
    selectEl.value = '';

    // Append to UI
    const container = document.getElementById(`comments-container-${requestId}`);
    if (container) {
        container.innerHTML += renderCommentItem(newComment);
        // Scroll to bottom
        container.scrollTop = container.scrollHeight;
    }

    showToast(t('ins_recommendation_shared'), 'success');
}

/* ── MODAL CREATE / SHARING NEW INSPIRATION ── */

function openShareInspirationModal() {
    if (!store.state.isLoggedIn) {
        openAuthModal();
        return;
    }

    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.id = 'share-inspiration-modal';
    modal.innerHTML = `
        <div class="modal-container" style="max-width: 500px; padding: var(--space-xl);">
            <button class="modal-close" onclick="document.getElementById('share-inspiration-modal').remove()">
                <i class="fas fa-times"></i>
            </button>
            
            <h3 style="font-size: 1.25rem; font-weight: 800; margin-bottom: var(--space-lg); text-align: center; color: var(--text-primary);">
                ${t('ins_new_post_title')}
            </h3>

            <!-- Minimal tab options -->
            <div style="display:flex; border-bottom: 1px solid var(--border-subtle); margin-bottom: var(--space-lg);">
                <button id="modal-tab-mb" class="profile-tab active" onclick="switchModalShareTab('moodboard')" style="flex:1; text-align:center;">
                    <i class="fas fa-images"></i> ${t('ins_share_mb_tab')}
                </button>
                <button id="modal-tab-qa" class="profile-tab" onclick="switchModalShareTab('qa')" style="flex:1; text-align:center;">
                    <i class="fas fa-question-circle"></i> ${t('ins_ask_style_tab')}
                </button>
            </div>

            <!-- Form: Share Moodboard -->
            <div id="modal-form-moodboard" style="display:block;">
                <div class="form-group-minimal" style="margin-bottom: var(--space-md);">
                    <label style="font-size:0.8rem; font-weight:700; color:var(--text-muted); display:block; margin-bottom:4px;">${t('ins_desc_label')}</label>
                    <textarea id="mb-desc" placeholder="${t('ins_desc_placeholder')}" class="input-minimal" style="height: 70px; resize:none;"></textarea>
                </div>
                
                <div class="form-group-minimal" style="margin-bottom: var(--space-md);">
                    <label style="font-size:0.8rem; font-weight:700; color:var(--text-muted); display:block; margin-bottom:4px;">${t('ins_tags_label')}</label>
                    <input type="text" id="mb-tags" placeholder="${t('ins_tags_placeholder')}" class="input-minimal">
                </div>

                <div class="form-group-minimal" style="margin-bottom: var(--space-lg);">
                    <label style="font-size:0.8rem; font-weight:700; color:var(--text-muted); display:block; margin-bottom:6px;">${t('ins_select_prod_label')}</label>
                    <div style="max-height: 150px; overflow-y:auto; border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: var(--space-sm); display:flex; flex-direction:column; gap:6px;">
                        ${SAMPLE_PRODUCTS.map(p => `
                            <label style="display:flex; align-items:center; gap:8px; font-size:0.85rem; cursor:pointer;">
                                <input type="checkbox" name="mb-products" value="${p.id}">
                                <span>${p.brand} - ${p.name.substring(0, 40)}...</span>
                            </label>
                        `).join('')}
                    </div>
                </div>

                <button class="btn btn-primary btn-full" onclick="publishMoodboardPost()">${t('ins_publish')}</button>
            </div>

            <!-- Form: Ask Combo Question -->
            <div id="modal-form-qa" style="display:none;">
                <div class="form-group-minimal" style="margin-bottom: var(--space-md);">
                    <label style="font-size:0.8rem; font-weight:700; color:var(--text-muted); display:block; margin-bottom:4px;">${t('ins_q_title_label')}</label>
                    <input type="text" id="qa-title" placeholder="${t('ins_q_title_placeholder')}" class="input-minimal">
                </div>

                <div class="form-group-minimal" style="margin-bottom: var(--space-md);">
                    <label style="font-size:0.8rem; font-weight:700; color:var(--text-muted); display:block; margin-bottom:4px;">${t('ins_q_desc_label')}</label>
                    <textarea id="qa-question" placeholder="${t('ins_q_desc_placeholder')}" class="input-minimal" style="height: 70px; resize:none;"></textarea>
                </div>

                <div class="form-group-minimal" style="margin-bottom: var(--space-lg);">
                    <label style="font-size:0.8rem; font-weight:700; color:var(--text-muted); display:block; margin-bottom:6px;">${t('ins_select_target_prod')}</label>
                    <select id="qa-product" class="comment-select-product" style="width:100%; height:38px; font-size:0.85rem;">
                        <option value="">${t('ins_select_target_prod_placeholder')}</option>
                        ${SAMPLE_PRODUCTS.map(p => `<option value="${p.id}">${p.brand} - ${p.name.substring(0, 45)}...</option>`).join('')}
                    </select>
                </div>

                <button class="btn btn-primary btn-full" onclick="publishStylingRequestPost()">${t('ins_publish_q')}</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

// Switch between creation forms in Modal
function switchModalShareTab(tab) {
    const mbTab = document.getElementById('modal-tab-mb');
    const qaTab = document.getElementById('modal-tab-qa');
    const mbForm = document.getElementById('modal-form-moodboard');
    const qaForm = document.getElementById('modal-form-qa');

    if (tab === 'moodboard') {
        mbTab.classList.add('active');
        qaTab.classList.remove('active');
        mbForm.style.display = 'block';
        qaForm.style.display = 'none';
    } else {
        mbTab.classList.remove('active');
        qaTab.classList.add('active');
        mbForm.style.display = 'none';
        qaForm.style.display = 'block';
    }
}

// Publish new Moodboard Post (Left Column)
function publishMoodboardPost() {
    const desc = document.getElementById('mb-desc').value.trim();
    const tagsText = document.getElementById('mb-tags').value.trim();
    
    // Extract selected product checkboxes
    const checkedBoxes = Array.from(document.querySelectorAll('input[name="mb-products"]:checked'));
    const productIds = checkedBoxes.map(box => box.value);

    if (!desc) {
        showToast(t('ins_desc_required'), 'error');
        return;
    }
    if (productIds.length === 0) {
        showToast(t('ins_select_min_prod'), 'error');
        return;
    }
    if (productIds.length > 3) {
        showToast(t('ins_select_max_prod'), 'error');
        return;
    }

    // Split tags
    const hashtags = tagsText ? tagsText.split(' ').filter(tag => tag.startsWith('#')) : ['#moda', '#kombin'];

    const newMbPost = {
        id: `mb_post_user_${Date.now()}`,
        author: {
            name: store.state.currentUser.name,
            handle: store.state.currentUser.username,
            avatarEmoji: null
        },
        date: "Şimdi",
        description: desc,
        hashtags: hashtags,
        productIds: productIds,
        likes: 0,
        commentsCount: 0,
        saves: 0,
        liked: false,
        saved: false
    };

    // Prepend to feed list
    store.state.moodboardPosts.unshift(newMbPost);
    store.saveToStorage();
    
    // Close modal
    document.getElementById('share-inspiration-modal').remove();

    // Re-render feed column
    const container = document.getElementById('moodboards-feed-container');
    if (container) {
        container.innerHTML = store.state.moodboardPosts.map(post => renderMoodboardPostCard(post)).join('');
    }

    showToast(t('ins_mb_published'), 'success');
}

// Publish new Styling advice request (Right Column)
function publishStylingRequestPost() {
    const title = document.getElementById('qa-title').value.trim();
    const question = document.getElementById('qa-question').value.trim();
    const productId = document.getElementById('qa-product').value;

    if (!title) {
        showToast(t('ins_q_title_required'), 'error');
        return;
    }
    if (!question) {
        showToast(t('ins_q_desc_required'), 'error');
        return;
    }
    if (!productId) {
        showToast(t('ins_q_prod_required'), 'error');
        return;
    }

    const newQaPost = {
        id: `sr_post_user_${Date.now()}`,
        author: {
            name: store.state.currentUser.name,
            handle: store.state.currentUser.username,
            avatarEmoji: null
        },
        date: "Şimdi",
        title: title,
        question: question,
        targetProductId: productId,
        comments: []
    };

    // Prepend to requests list
    window.stylingRequests.unshift(newQaPost);

    // Close modal
    document.getElementById('share-inspiration-modal').remove();

    // Re-render requests column
    const container = document.getElementById('styling-requests-feed-container');
    if (container) {
        container.innerHTML = window.stylingRequests.map(post => renderStylingRequestCard(post)).join('');
    }

    showToast(t('ins_q_published'), 'success');
}

// Focus on comment textarea
function focusCommentBox(postId) {
    const el = document.getElementById(`comment-text-${postId}`);
    if (el) {
        el.focus();
    } else {
        showToast(t('ins_focus_comment_info'), 'info');
    }
}
