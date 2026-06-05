/* ═══════════════════════════════════════════════════════
   WISHLIST HUB - AI Engine
   Netflix/Instagram style recommendation system
   ═══════════════════════════════════════════════════════ */

class AIEngine {
    constructor() {
        this.userProfile = null;
        this.behaviorLog = [];
        this.interactionWeights = {
            view: 1,
            like: 3,
            addToWishlist: 5,
            comment: 4,
            share: 6,
            follow: 4,
            purchase: 10
        };
        this.categoryScores = {};
        this.brandPreferences = {};
        this.priceRange = { min: 0, max: Infinity };
        this.styleProfile = {};
        this.trendMultiplier = 1.5;
        this.socialInfluence = 1.2;
    }

    // Initialize AI with user data
    initialize(user) {
        this.userProfile = user;
        this.initializeCategoryScores(user);
        this.analyzeUserBehavior();
        this.buildStyleProfile(user);
        console.log('🤖 AI Engine initialized for:', user.name);
    }

    // Initialize category scores based on user interests
    initializeCategoryScores(user) {
        CATEGORIES.forEach(cat => {
            this.categoryScores[cat.id] = user.interests.includes(cat.id) ? 5 : 1;
        });
    }

    // Build style profile from user data
    buildStyleProfile(user) {
        const userProducts = SAMPLE_PRODUCTS.filter(p =>
            SAMPLE_WISHLISTS.filter(w => w.userId === user.id)
                .some(w => w.products.includes(p.id))
        );

        const avgPrice = userProducts.length > 0
            ? userProducts.reduce((sum, p) => sum + p.price, 0) / userProducts.length
            : 2000;

        this.priceRange = {
            min: avgPrice * 0.3,
            max: avgPrice * 3
        };

        // Analyze brand preferences
        userProducts.forEach(p => {
            this.brandPreferences[p.brand] = (this.brandPreferences[p.brand] || 0) + 2;
        });

        // Segment-based style profile
        switch (user.segment) {
            case 'female':
                this.styleProfile = {
                    aesthetic: 'elegant',
                    colorPreference: ['pastel', 'neutral', 'warm'],
                    priceWeight: 0.7,
                    trendWeight: 0.9,
                    socialWeight: 0.8
                };
                break;
            case 'male':
                this.styleProfile = {
                    aesthetic: 'minimal',
                    colorPreference: ['dark', 'neutral', 'cool'],
                    priceWeight: 0.9,
                    trendWeight: 0.6,
                    socialWeight: 0.5
                };
                break;
            case 'young':
                this.styleProfile = {
                    aesthetic: 'streetwear',
                    colorPreference: ['vibrant', 'neon', 'mixed'],
                    priceWeight: 0.5,
                    trendWeight: 1.0,
                    socialWeight: 1.0
                };
                break;
            default:
                this.styleProfile = {
                    aesthetic: 'classic',
                    colorPreference: ['neutral'],
                    priceWeight: 0.7,
                    trendWeight: 0.7,
                    socialWeight: 0.7
                };
        }
    }

    // Log user behavior
    logBehavior(action, itemId, metadata = {}) {
        this.behaviorLog.push({
            action,
            itemId,
            metadata,
            timestamp: Date.now(),
            weight: this.interactionWeights[action] || 1
        });

        // Update category scores dynamically
        const item = getProductById(itemId);
        if (item) {
            this.categoryScores[item.category] =
                (this.categoryScores[item.category] || 0) + (this.interactionWeights[action] || 1);
        }

        this.analyzeUserBehavior();
    }

    // Analyze accumulated behavior
    analyzeUserBehavior() {
        // Decay old interactions
        const now = Date.now();
        const decayFactor = 0.95;

        this.behaviorLog.forEach(log => {
            const ageInHours = (now - log.timestamp) / 3600000;
            log.effectiveWeight = log.weight * Math.pow(decayFactor, ageInHours);
        });
    }

    // Calculate recommendation score for a product
    calculateProductScore(product) {
        let score = 0;

        // Category relevance
        score += (this.categoryScores[product.category] || 0) * 2;

        // Trend bonus
        if (product.trending) {
            score += 3 * this.trendMultiplier * (this.styleProfile.trendWeight || 0.7);
        }

        // Social proof (likes + comments)
        const socialScore = (product.likes * 0.01 + product.comments * 0.05);
        score += socialScore * (this.styleProfile.socialWeight || 0.7);

        // Brand preference
        if (this.brandPreferences[product.brand]) {
            score += this.brandPreferences[product.brand] * 1.5;
        }

        // Price range match
        if (product.price >= this.priceRange.min && product.price <= this.priceRange.max) {
            score += 2;
        }

        // Social influence: products from followed users' wishlists
        const followedUserProducts = SAMPLE_WISHLISTS
            .filter(w => this.userProfile && w.userId !== this.userProfile.id)
            .some(w => w.products.includes(product.id));

        if (followedUserProducts) {
            score += 3 * this.socialInfluence;
        }

        // Diversity bonus - items from less-viewed categories
        const minCategoryScore = Math.min(...Object.values(this.categoryScores));
        if (this.categoryScores[product.category] === minCategoryScore) {
            score += 1; // Encourage exploration
        }

        // Recency bonus for newer items
        score += Math.random() * 0.5; // Slight randomization for variety

        return score;
    }

    // Get personalized product recommendations
    getRecommendations(count = 8, excludeIds = []) {
        const availableProducts = SAMPLE_PRODUCTS.filter(p => !excludeIds.includes(p.id));

        const scored = availableProducts.map(product => ({
            product,
            score: this.calculateProductScore(product)
        }));

        scored.sort((a, b) => b.score - a.score);

        return scored.slice(0, count).map(s => ({
            ...s.product,
            aiScore: Math.round(s.score * 10) / 10,
            reason: this.getRecommendationReason(s.product, s.score)
        }));
    }

    // Generate human-readable recommendation reason
    getRecommendationReason(product, score) {
        const reasons = [];

        if (product.trending) {
            reasons.push(t('ai_reason_trend', '🔥 Trend'));
        }

        if (this.categoryScores[product.category] > 3) {
            const catName = t(product.category) || CATEGORIES.find(c => c.id === product.category)?.name || '';
            reasons.push(t('ai_reason_interest', { category: catName }));
        }

        if (this.brandPreferences[product.brand]) {
            reasons.push(t('ai_reason_brand', { brand: product.brand }));
        }

        if (product.likes > 500) {
            reasons.push(t('ai_reason_likes', { likes: formatNumber(product.likes) }));
        }

        return reasons.slice(0, 2).join(' • ') || t('ai_reason_special', '⭐ Sana özel öneri');
    }

    // Get trending products
    getTrendingProducts(count = 6) {
        return SAMPLE_PRODUCTS
            .filter(p => p.trending)
            .sort((a, b) => (b.likes + b.comments * 5) - (a.likes + a.comments * 5))
            .slice(0, count);
    }

    // Get combo/outfit recommendations
    getComboRecommendations(selectedItems = []) {
        const combos = [];

        const tops = SAMPLE_WARDROBE_ITEMS.filter(i => i.type === 'top');
        const bottoms = SAMPLE_WARDROBE_ITEMS.filter(i => i.type === 'bottom');
        const shoes = SAMPLE_WARDROBE_ITEMS.filter(i => i.type === 'shoes');

        // Color harmony scoring
        const colorHarmonies = {
            '#FFFFFF': ['#1E3A5F', '#2D2D2D', '#EC4899'],
            '#1A1A1A': ['#F5F5F5', '#1E3A5F', '#EC4899'],
            '#4A7AB5': ['#F5F5F5', '#2D2D2D', '#3B2507'],
            '#8B5CF6': ['#2D2D2D', '#F5F5F5', '#1A1A1A'],
            '#D4956B': ['#1E3A5F', '#2D2D2D', '#3B2507'],
            '#EC4899': ['#1A1A1A', '#F5F5F5', '#2D2D2D'],
        };

        // Generate smart combos
        for (let i = 0; i < 4; i++) {
            const top = tops[Math.floor(Math.random() * tops.length)];
            const bottom = bottoms[Math.floor(Math.random() * bottoms.length)];
            const shoe = shoes[Math.floor(Math.random() * shoes.length)];

            const harmonyScore = this.calculateColorHarmony(top.color, bottom.color, shoe.color);

            combos.push({
                id: `combo_${i}`,
                items: [top, bottom, shoe],
                score: harmonyScore,
                name: this.generateComboName(top, bottom, shoe),
                style: this.categorizeComboStyle(top, bottom, shoe)
            });
        }

        return combos.sort((a, b) => b.score - a.score);
    }

    calculateColorHarmony(color1, color2, color3) {
        // Simple color harmony calculation
        let score = 5;

        // Neutral + Color combo = good
        const neutrals = ['#FFFFFF', '#F5F5F5', '#1A1A1A', '#2D2D2D', '#4A4A4A', '#5C5C5C'];
        const neutralCount = [color1, color2, color3].filter(c => neutrals.includes(c)).length;

        if (neutralCount === 1 || neutralCount === 2) score += 3;
        if (neutralCount === 0) score -= 1;
        if (neutralCount === 3) score += 1;

        return score + Math.random() * 2;
    }

    generateComboName(top, bottom, shoe) {
        const styles = [
            t('combo_style_1'), t('combo_style_2'), t('combo_style_3'),
            t('combo_style_4'), t('combo_style_5'), t('combo_style_6'),
            t('combo_style_7'), t('combo_style_8'), t('combo_style_9')
        ];
        return styles[Math.floor(Math.random() * styles.length)];
    }

    categorizeComboStyle(top, bottom, shoe) {
        if (bottom.name.includes('Jean') && shoe.name.includes('Sneaker')) return 'casual';
        if (top.name.includes('Gömlek') && bottom.name.includes('Kumaş')) return 'formal';
        return 'smart-casual';
    }

    // Get style tips based on user profile
    getStyleTips() {
        const tips = {
            female: [
                { title: t('tip_female_title_1'), desc: t('tip_female_desc_1'), emoji: '👗' },
                { title: t('tip_female_title_2'), desc: t('tip_female_desc_2'), emoji: '🎨' },
                { title: t('tip_female_title_3'), desc: t('tip_female_desc_3'), emoji: '💎' },
                { title: t('tip_female_title_4'), desc: t('tip_female_desc_4'), emoji: '🌸' },
            ],
            male: [
                { title: t('tip_male_title_1'), desc: t('tip_male_desc_1'), emoji: '👔' },
                { title: t('tip_male_title_2'), desc: t('tip_male_desc_2'), emoji: '📐' },
                { title: t('tip_male_title_3'), desc: t('tip_male_desc_3'), emoji: '🧥' },
                { title: t('tip_male_title_4'), desc: t('tip_male_desc_4'), emoji: '🖤' },
            ],
            young: [
                { title: t('tip_young_title_1'), desc: t('tip_young_desc_1'), emoji: '🔄' },
                { title: t('tip_young_title_2'), desc: t('tip_young_desc_2'), emoji: '⚡' },
                { title: t('tip_young_title_3'), desc: t('tip_young_desc_3'), emoji: '👟' },
                { title: t('tip_young_title_4'), desc: t('tip_young_desc_4'), emoji: '♻️' },
            ]
        };

        const segment = this.userProfile?.segment || 'young';
        return tips[segment] || tips.young;
    }

    // Get personalized homepage content
    getPersonalizedHomepage() {
        const recommendations = this.getRecommendations(8);
        const trendingProducts = this.getTrendingProducts(6);
        const styleTips = this.getStyleTips();
        const comboSuggestions = this.getComboRecommendations();

        // Personalized sections based on user behavior
        const sections = [
            {
                id: 'for-you',
                title: 'Senin İçin Seçtik ✨',
                subtitle: 'Kişisel öneriler',
                type: 'products',
                items: recommendations,
                aiPowered: true
            },
            {
                id: 'trending',
                title: 'Trend Olan 🔥',
                subtitle: 'Şu an en popüler ürünler',
                type: 'products',
                items: trendingProducts,
                aiPowered: false
            },
            {
                id: 'style-tips',
                title: 'Stil Önerileri 💡',
                subtitle: 'Kişisel stil tavsiyeleri',
                type: 'tips',
                items: styleTips,
                aiPowered: true
            }
        ];

        // Add segment-specific section
        if (this.userProfile?.segment === 'female') {
            sections.splice(2, 0, {
                id: 'combos',
                title: 'Kombin İlhamı 👗',
                subtitle: 'Gardırobundan kombinler',
                type: 'combos',
                items: comboSuggestions,
                aiPowered: true
            });
        }

        if (this.userProfile?.segment === 'male' || this.userProfile?.segment === 'young') {
            sections.splice(2, 0, {
                id: 'tech-picks',
                title: 'Tech Seçimler 🚀',
                subtitle: 'Teknoloji tutkunları için',
                type: 'products',
                items: SAMPLE_PRODUCTS.filter(p => ['tech', 'electronics', 'gaming'].includes(p.category)).slice(0, 6),
                aiPowered: true
            });
        }

        return sections;
    }

    // Get trend analysis
    getTrendAnalysis() {
        return {
            topCategories: TREND_DATA.categories.sort((a, b) => b.change - a.change),
            weeklyTrends: TREND_DATA.weeklyTrends,
            predictions: [
                { category: 'Moda', prediction: 'Oversize silüetler yükselişte', confidence: 92 },
                { category: 'Teknoloji', prediction: 'AI gadgetlar\'a ilgi artıyor', confidence: 87 },
                { category: 'Güzellik', prediction: 'Clean beauty trendleri güçleniyor', confidence: 85 },
                { category: 'Oyun', prediction: 'Mobile gaming aksesuarları popülerleşecek', confidence: 78 },
            ],
            insights: this.generateInsights()
        };
    }

    generateInsights() {
        const insights = [];

        if (this.userProfile) {
            const topCategory = Object.entries(this.categoryScores)
                .sort((a, b) => b[1] - a[1])[0];

            const catName = t(topCategory[0]) || CATEGORIES.find(c => c.id === topCategory[0])?.name || '';
            insights.push({
                type: 'personal',
                text: t('ai_insight_personal', { category: catName }),
                emoji: '📊'
            });
        }

        insights.push(
            { type: 'trend', text: t('ai_insight_trend'), emoji: '📈' },
            { type: 'social', text: t('ai_insight_social'), emoji: '👥' },
            { type: 'tip', text: t('ai_insight_tip'), emoji: '👀' }
        );

        return insights;
    }

    // Gift recommendations for a user profile
    getGiftRecommendations(targetUserId) {
        const targetUser = getUserById(targetUserId);
        if (!targetUser) return [];

        const targetWishlists = SAMPLE_WISHLISTS.filter(w => w.userId === targetUserId);
        const targetProducts = targetWishlists.flatMap(w => w.products);

        // Find products similar to what they like but haven't added
        return SAMPLE_PRODUCTS
            .filter(p => !targetProducts.includes(p.id))
            .filter(p => targetUser.interests.includes(p.category))
            .sort((a, b) => b.likes - a.likes)
            .slice(0, 4)
            .map(p => {
                const catName = t(p.category) || CATEGORIES.find(c => c.id === p.category)?.name || '';
                return {
                    ...p,
                    giftReason: t('ai_gift_reason', { name: targetUser.name, category: catName })
                };
            });
    }
}

// Singleton instance
const aiEngine = new AIEngine();
