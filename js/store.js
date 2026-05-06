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
            selectedCategory: 'all',
            wishlistView: 'grid',
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
            };
            localStorage.setItem('wishlisthub_state_v11', JSON.stringify(saveData));
        } catch (e) {
            console.warn('Storage save failed:', e);
        }
    }

    // Load from localStorage
    loadFromStorage() {
        try {
            const saved = localStorage.getItem('wishlisthub_state_v11');
            if (saved) {
                const data = JSON.parse(saved);
                if (data.currentUser) {
                    this.state.currentUser = data.currentUser;
                    this.state.isLoggedIn = true;
                }
                if (data.likedProducts) this.state.likedProducts = new Set(data.likedProducts);
                if (data.likedWishlists) this.state.likedWishlists = new Set(data.likedWishlists);
                if (data.followedUsers) this.state.followedUsers = new Set(data.followedUsers);
                if (data.savedCombos) this.state.savedCombos = data.savedCombos;
                if (data.wishlists) this.state.wishlists = data.wishlists;
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
        localStorage.removeItem('wishlisthub_state_v11');
        this.emit('auth', { loggedIn: false });
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
