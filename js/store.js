/* ═══════════════════════════════════════════════════════
   WISHLIST HUB - State Management Store
   ═══════════════════════════════════════════════════════ */

class Store {
    constructor() {
        this.state = {
            currentUser: null,
            isLoggedIn: false,
            currentPage: 'home',
            wishlists: [...SAMPLE_WISHLISTS],
            products: [...SAMPLE_PRODUCTS],
            users: [...SAMPLE_USERS],
            likedProducts: new Set(),
            likedWishlists: new Set(),
            followedUsers: new Set(),
            notifications: [...NOTIFICATIONS_DATA],
            wardrobeItems: [...SAMPLE_WARDROBE_ITEMS],
            comboSlots: { top: null, bottom: null, shoes: null },
            savedCombos: [],
            searchQuery: '',
            wishlistView: 'grid',
            theme: 'light',
            language: 'tr',
            moodboardPosts: [],
            collections: [],
            savedItems: { products: [], wishlists: [], posts: [] }
        };

        this.listeners = {};
        this.loadFromStorage();
    }

    // Subscribe to state changes
    on(event, callback) {
        if (!this.listeners[event]) this.listeners[event] = [];
        this.listeners[event].push(callback);
    }

    // Emit events
    emit(event, data) {
        if (this.listeners[event]) {
            this.listeners[event].forEach(cb => cb(data));
        }
    }

    // Save to localStorage
    saveToStorage() {
        try {
            const saveData = {
                currentUser: this.state.currentUser,
                isLoggedIn: this.state.isLoggedIn,
                likedProducts: [...this.state.likedProducts],
                likedWishlists: [...this.state.likedWishlists],
                followedUsers: [...this.state.followedUsers],
                savedCombos: this.state.savedCombos,
                wardrobeItems: this.state.wardrobeItems,
                wishlists: this.state.wishlists,
                theme: this.state.theme,
                language: this.state.language,
                moodboardPosts: this.state.moodboardPosts,
                collections: this.state.collections,
                savedItems: this.state.savedItems
            };
            localStorage.setItem('wishlisthub_state_v37', JSON.stringify(saveData));
        } catch (e) {
            console.warn('Storage save failed:', e);
        }
    }

    // Load from localStorage
    loadFromStorage() {
        try {
            // Default to system preferences
            const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
            this.state.theme = systemPrefersDark ? 'dark' : 'light';
            
            const browserLang = navigator.language || navigator.userLanguage;
            this.state.language = (browserLang && browserLang.startsWith('tr')) ? 'tr' : 'en';

            // Set up default/initial data that gets overridden by saved store
            this.state.moodboardPosts = [
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
                    productIds: ["p24", "p18", "p23"],
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
                    productIds: ["p17", "p21", "p23"],
                    likes: 98,
                    commentsCount: 6,
                    saves: 22,
                    liked: false,
                    saved: false
                }
            ];

            this.state.collections = [
                {
                    id: "col_1",
                    userId: "u1",
                    name: "Summer Essentials",
                    description: "Yaz ayları için vazgeçilmez parçalar.",
                    coverImage: "assets/feature_style.jpg",
                    wishlistIds: ["w1"],
                    moodboardIds: ["mb_post_1"],
                    postIds: []
                },
                {
                    id: "col_2",
                    userId: "u1",
                    name: "Capsule Wardrobe",
                    description: "Zamansız ve minimal bir dolap oluşturma rehberi.",
                    coverImage: "assets/feature_wishlist.jpg",
                    wishlistIds: ["w2"],
                    moodboardIds: ["mb_post_2"],
                    postIds: []
                }
            ];

            this.state.savedItems = { products: [], wishlists: [], posts: [] };

            const saved = localStorage.getItem('wishlisthub_state_v37');
            if (saved) {
                const data = JSON.parse(saved);
                if (data.currentUser) {
                    this.state.currentUser = data.currentUser;
                    this.state.isLoggedIn = true;
                    // Update current user's avatar if it was a placeholder
                    const updatedUser = this.state.users.find(u => u.id === data.currentUser.id);
                    if (updatedUser) {
                        this.state.currentUser.avatar = updatedUser.avatar;
                    }
                }
                if (data.likedProducts) this.state.likedProducts = new Set(data.likedProducts);
                if (data.likedWishlists) this.state.likedWishlists = new Set(data.likedWishlists);
                if (data.followedUsers) this.state.followedUsers = new Set(data.followedUsers);
                if (data.savedCombos) this.state.savedCombos = data.savedCombos;
                if (data.wishlists) this.state.wishlists = data.wishlists;
                if (data.theme) this.state.theme = data.theme;
                if (data.language) this.state.language = data.language;
                if (data.moodboardPosts) this.state.moodboardPosts = data.moodboardPosts;
                if (data.collections) this.state.collections = data.collections;
                if (data.savedItems) this.state.savedItems = data.savedItems;
            }

            // Sync all user avatars in loaded moodboard posts with the latest SAMPLE_USERS avatars
            this.state.moodboardPosts.forEach(post => {
                const user = this.state.users.find(u => u.id === post.userId);
                if (user) {
                    post.author.avatar = user.avatar;
                }
            });

            // Ensure the special Carolina Herrera moodboard post is present and up to date
            const goodGirlPost = {
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
            };
            const goodGirlPostIndex = this.state.moodboardPosts.findIndex(p => p.id === 'mb_post_good_girl');
            if (goodGirlPostIndex >= 0) {
                this.state.moodboardPosts[goodGirlPostIndex] = goodGirlPost;
            } else {
                this.state.moodboardPosts.unshift(goodGirlPost);
            }
        } catch (e) {
            console.warn('Storage load failed:', e);
        }
    }

    // Auth
    login(user) {
        this.state.currentUser = user;
        this.state.isLoggedIn = true;
        aiEngine.initialize(user);
        this.saveToStorage();
        this.emit('auth', { loggedIn: true, user });
    }

    logout() {
        this.state.currentUser = null;
        this.state.isLoggedIn = false;
        localStorage.removeItem('wishlisthub_state_v37');
        this.emit('auth', { loggedIn: false });
    }

    setTheme(theme) {
        this.state.theme = theme;
        this.saveToStorage();
        this.emit('themeChanged', theme);
    }

    setLanguage(language) {
        this.state.language = language;
        this.saveToStorage();
        this.emit('languageChanged', language);
    }

    createWishlistExtended(title, description, coverImage = '', privacy = 'public', category = 'fashion', products = []) {
        const newWishlist = {
            id: 'w' + Date.now(),
            userId: this.state.currentUser?.id || 'guest',
            title,
            description,
            coverImage,
            privacy,
            category,
            products: products, // array of product IDs
            likes: 0,
            comments: [],
            shares: 0,
            completedProducts: [],
            created_at: new Date().toISOString()
        };
        this.state.wishlists.unshift(newWishlist);
        this.saveToStorage();
        this.emit('wishlistsChanged', this.state.wishlists);
        return newWishlist;
    }

    createMoodboard(title, description, items, hashtags = []) {
        const author = this.state.currentUser ? {
            name: this.state.currentUser.name,
            handle: '@' + this.state.currentUser.username,
            avatar: this.state.currentUser.avatar || '',
            avatarEmoji: null
        } : {
            name: "Guest",
            handle: "@guest",
            avatarEmoji: null
        };
        const productIds = items.filter(it => it.type === 'product').map(it => it.id);

        const newMoodboard = {
            id: 'mb_' + Date.now(),
            userId: this.state.currentUser?.id || 'guest',
            author,
            date: this.state.language === 'tr' ? 'Şimdi' : 'Just now',
            title,
            description,
            items, // layout items
            productIds,
            hashtags: hashtags.map(t => t.startsWith('#') ? t : '#' + t),
            likes: 0,
            commentsCount: 0,
            saves: 0,
            liked: false,
            saved: false,
            created_at: new Date().toISOString()
        };
        this.state.moodboardPosts.unshift(newMoodboard);
        this.saveToStorage();
        this.emit('moodboardsChanged', this.state.moodboardPosts);
        return newMoodboard;
    }

    createInspirationPost(title, description, images = [], wishlistIds = [], moodboardIds = [], productIds = [], hashtags = [], topic = 'Kombin Önerisi') {
        const author = this.state.currentUser ? {
            name: this.state.currentUser.name,
            handle: '@' + this.state.currentUser.username,
            avatar: this.state.currentUser.avatar || '',
            avatarEmoji: null
        } : {
            name: "Guest",
            handle: "@guest",
            avatarEmoji: null
        };

        const newPost = {
            id: 'post_' + Date.now(),
            userId: this.state.currentUser?.id || 'guest',
            author,
            date: this.state.language === 'tr' ? 'Şimdi' : 'Just now',
            title,
            description,
            images,
            wishlistIds,
            moodboardIds,
            productIds,
            hashtags: hashtags.map(t => t.startsWith('#') ? t : '#' + t),
            topic,
            likes: 0,
            comments: [],
            saves: 0,
            liked: false,
            saved: false,
            created_at: new Date().toISOString()
        };
        this.state.moodboardPosts.unshift(newPost); // Render in same feed
        this.saveToStorage();
        this.emit('postsChanged', this.state.moodboardPosts);
        return newPost;
    }

    createCollection(name, description, coverImage = '', wishlistIds = [], moodboardIds = [], postIds = []) {
        const newCollection = {
            id: 'col_' + Date.now(),
            userId: this.state.currentUser?.id || 'guest',
            name,
            description,
            coverImage: coverImage || 'assets/feature_wishlist.jpg',
            wishlistIds,
            moodboardIds,
            postIds,
            created_at: new Date().toISOString()
        };
        this.state.collections.unshift(newCollection);
        this.saveToStorage();
        this.emit('collectionsChanged', this.state.collections);
        return newCollection;
    }

    toggleSaveItem(type, itemId) {
        if (!this.state.savedItems) {
            this.state.savedItems = { products: [], wishlists: [], posts: [] };
        }
        if (!this.state.savedItems[type]) {
            this.state.savedItems[type] = [];
        }
        const index = this.state.savedItems[type].indexOf(itemId);
        let saved = false;
        if (index >= 0) {
            this.state.savedItems[type].splice(index, 1);
            saved = false;
        } else {
            this.state.savedItems[type].push(itemId);
            saved = true;
        }
        this.saveToStorage();
        this.emit('savedItemsChanged', this.state.savedItems);
        return saved;
    }

    // Wishlist operations
    createWishlist(title, description, privacy = 'public', category = 'fashion') {
        const newWishlist = {
            id: 'w' + Date.now(),
            userId: this.state.currentUser?.id || 'guest',
            title,
            description,
            privacy,
            products: [],
            likes: 0,
            comments: 0,
            shares: 0,
            completedProducts: [],
            createdAt: new Date().toISOString().split('T')[0],
            category
        };
        this.state.wishlists.push(newWishlist);
        this.saveToStorage();
        this.emit('wishlistCreated', newWishlist);
        return newWishlist;
    }

    deleteWishlist(wishlistId) {
        this.state.wishlists = this.state.wishlists.filter(w => w.id !== wishlistId);
        this.saveToStorage();
        this.emit('wishlistDeleted', wishlistId);
    }

    addProductToWishlist(wishlistId, productId) {
        const wishlist = this.state.wishlists.find(w => w.id === wishlistId);
        if (wishlist && !wishlist.products.includes(productId)) {
            wishlist.products.push(productId);
            this.saveToStorage();
            this.emit('productAdded', { wishlistId, productId });
            aiEngine.logBehavior('addToWishlist', productId);
        }
    }

    removeProductFromWishlist(wishlistId, productId) {
        const wishlist = this.state.wishlists.find(w => w.id === wishlistId);
        if (wishlist) {
            wishlist.products = wishlist.products.filter(id => id !== productId);
            wishlist.completedProducts = wishlist.completedProducts.filter(id => id !== productId);
            this.saveToStorage();
            this.emit('productRemoved', { wishlistId, productId });
        }
    }

    toggleProductComplete(wishlistId, productId) {
        const wishlist = this.state.wishlists.find(w => w.id === wishlistId);
        if (wishlist) {
            if (wishlist.completedProducts.includes(productId)) {
                wishlist.completedProducts = wishlist.completedProducts.filter(id => id !== productId);
            } else {
                wishlist.completedProducts.push(productId);
            }
            this.saveToStorage();
            this.emit('productCompleted', { wishlistId, productId });
        }
    }

    // Social operations
    toggleLikeProduct(productId) {
        if (this.state.likedProducts.has(productId)) {
            this.state.likedProducts.delete(productId);
            const product = this.state.products.find(p => p.id === productId);
            if (product) product.likes--;
        } else {
            this.state.likedProducts.add(productId);
            const product = this.state.products.find(p => p.id === productId);
            if (product) product.likes++;
            aiEngine.logBehavior('like', productId);
        }
        this.saveToStorage();
        this.emit('likeToggled', productId);
    }

    toggleLikeWishlist(wishlistId) {
        if (this.state.likedWishlists.has(wishlistId)) {
            this.state.likedWishlists.delete(wishlistId);
            const wishlist = this.state.wishlists.find(w => w.id === wishlistId);
            if (wishlist) wishlist.likes--;
        } else {
            this.state.likedWishlists.add(wishlistId);
            const wishlist = this.state.wishlists.find(w => w.id === wishlistId);
            if (wishlist) wishlist.likes++;
        }
        this.saveToStorage();
        this.emit('wishlistLikeToggled', wishlistId);
    }

    toggleFollow(userId) {
        if (this.state.followedUsers.has(userId)) {
            this.state.followedUsers.delete(userId);
        } else {
            this.state.followedUsers.add(userId);
            aiEngine.logBehavior('follow', userId);
        }
        this.saveToStorage();
        this.emit('followToggled', userId);
    }

    // Combo operations
    setComboSlot(type, item) {
        this.state.comboSlots[type] = item;
        this.emit('comboSlotChanged', { type, item });
    }

    clearComboSlots() {
        this.state.comboSlots = { top: null, bottom: null, shoes: null };
        this.emit('comboSlotsCleared');
    }

    saveCombo(name) {
        const combo = {
            id: 'combo_' + Date.now(),
            name,
            items: { ...this.state.comboSlots },
            createdAt: new Date().toISOString()
        };
        this.state.savedCombos.push(combo);
        this.saveToStorage();
        this.emit('comboSaved', combo);
        return combo;
    }

    // Search
    search(query) {
        this.state.searchQuery = query;
        const q = query.toLowerCase();

        const results = {
            products: this.state.products.filter(p =>
                p.name.toLowerCase().includes(q) ||
                p.brand.toLowerCase().includes(q) ||
                p.tags.some(t => t.includes(q))
            ),
            wishlists: this.state.wishlists.filter(w =>
                w.title.toLowerCase().includes(q) ||
                w.description.toLowerCase().includes(q)
            ),
            users: this.state.users.filter(u =>
                u.name.toLowerCase().includes(q) ||
                u.username.toLowerCase().includes(q)
            )
        };

        return results;
    }

    // Get user wishlists
    getUserWishlists(userId) {
        return this.state.wishlists.filter(w => w.userId === userId);
    }

    // Get popular wishlists
    getPopularWishlists(count = 6) {
        return [...this.state.wishlists]
            .sort((a, b) => b.likes - a.likes)
            .slice(0, count);
    }

    // Mark notification as read
    markNotificationRead(notifId) {
        const notif = this.state.notifications.find(n => n.id === notifId);
        if (notif) notif.read = true;
        this.emit('notificationRead', notifId);
    }

    getUnreadCount() {
        return this.state.notifications.filter(n => !n.read).length;
    }
}

const store = new Store();
window.store = store;
