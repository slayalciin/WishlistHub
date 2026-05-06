/* ═══════════════════════════════════════════════════════
   WISHLIST HUB - Data Models & Sample Data
   ═══════════════════════════════════════════════════════ */

const CATEGORIES = [
    { id: 'fashion', name: 'Moda', icon: '👗', color: '#EC4899' },
    { id: 'tech', name: 'Teknoloji', icon: '💻', color: '#3B82F6' },
    { id: 'beauty', name: 'Güzellik', icon: '💄', color: '#F43F5E' },
    { id: 'home', name: 'Ev & Yaşam', icon: '🏠', color: '#10B981' },
    { id: 'sports', name: 'Spor', icon: '⚽', color: '#F97316' },
    { id: 'books', name: 'Kitap', icon: '📚', color: '#8B5CF6' },
    { id: 'electronics', name: 'Elektronik', icon: '📱', color: '#06B6D4' },
    { id: 'gaming', name: 'Oyun', icon: '🎮', color: '#F59E0B' },
];

const SAMPLE_USERS = [
    {
        id: 'u1',
        name: 'Ayşe Yılmaz',
        username: '@aysestyle',
        email: 'ayse@example.com',
        avatar: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?q=80&w=200&auto=format&fit=crop',
        avatarEmoji: '👩',
        bio: 'Moda tutkunu | Stil danışmanı | Kombin önerileri ✨',
        interests: ['fashion', 'beauty'],
        followers: 12400,
        following: 890,
        wishlists: ['w1', 'w2'],
        joinDate: '2024-01-15',
        verified: true,
        segment: 'female'
    },
    {
        id: 'u2',
        name: 'Mehmet Kaya',
        username: '@techmemet',
        email: 'mehmet@example.com',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop',
        avatarEmoji: '👨',
        bio: 'Tech enthusiast 🚀 | Gadget reviewer | Software engineer',
        interests: ['tech', 'electronics', 'gaming'],
        followers: 8200,
        following: 450,
        wishlists: ['w3', 'w4'],
        joinDate: '2024-02-20',
        verified: true,
        segment: 'male'
    },
    {
        id: 'u3',
        name: 'Zeynep Demir',
        username: '@zeynepexplores',
        email: 'zeynep@example.com',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop',
        avatarEmoji: '👧',
        bio: 'Keşfetmeyi seviyorum 🌟 | Lifestyle | İlham peşinde',
        interests: ['fashion', 'beauty', 'home'],
        followers: 5600,
        following: 1200,
        wishlists: ['w5'],
        joinDate: '2024-03-10',
        verified: false,
        segment: 'young'
    },
    {
        id: 'u4',
        name: 'Emre Aktaş',
        username: '@emrestyle',
        email: 'emre@example.com',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
        avatarEmoji: '🤵',
        bio: 'Stil danışmanı | Men\'s Fashion | Minimalist yaşam',
        interests: ['fashion', 'tech'],
        followers: 25300,
        following: 620,
        wishlists: ['w6'],
        joinDate: '2023-11-05',
        verified: true,
        segment: 'male'
    },
    {
        id: 'u5',
        name: 'Can Özkan',
        username: '@cangamer',
        email: 'can@example.com',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop',
        avatarEmoji: '🧑',
        bio: 'Gamer | Streamer | Teknoloji bağımlısı 🎮',
        interests: ['gaming', 'tech', 'electronics'],
        followers: 15800,
        following: 340,
        wishlists: ['w7'],
        joinDate: '2024-01-28',
        verified: true,
        segment: 'young'
    }
];

const SAMPLE_PRODUCTS = [
    {
        id: 'p1', name: 'Premium Deri Çanta', brand: 'Prada', category: 'fashion',
        price: 45000, currency: '₺', url: 'https://www.beymen.com/p_prada-siyah-kadin-deri-canta_1123456',
        image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=600&auto=format&fit=crop',
        emoji: '👜', likes: 342, comments: 28,
        tags: ['deri', 'çanta', 'premium'], trending: true, addedBy: 'u1'
    },
    {
        id: 'p2', name: 'iPhone 16 Pro Max', brand: 'Apple', category: 'tech',
        price: 94999, currency: '₺', url: 'https://www.mediamarkt.com.tr/tr/product/_iphone-16-pro-max-256-gb-ak%C4%B1ll%C4%B1-telefon-çöl-titanyum-myww3tu-a-1238474.html',
        image: 'https://images.unsplash.com/photo-1616348436168-de43ad0db179?q=80&w=600&auto=format&fit=crop',
        emoji: '📱', likes: 1205, comments: 156,
        tags: ['telefon', 'apple', 'premium'], trending: true, addedBy: 'u2'
    },
    {
        id: 'p3', name: 'Retinol Serum Set', brand: 'SkinGlow', category: 'beauty',
        price: 890, currency: '₺', url: 'https://example.com/serum',
        image: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=600&auto=format&fit=crop',
        emoji: '✨', likes: 567, comments: 45,
        tags: ['cilt bakım', 'serum', 'retinol'], trending: true, addedBy: 'u3'
    },
    {
        id: 'p4', name: 'Minimalist Saat', brand: 'TimeArt', category: 'fashion',
        price: 3200, currency: '₺', url: 'https://example.com/watch',
        image: 'https://images.unsplash.com/photo-1508685096489-7aac29145fe4?q=80&w=600&auto=format&fit=crop',
        emoji: '⌚', likes: 289, comments: 19,
        tags: ['saat', 'minimal', 'aksesuar'], trending: false, addedBy: 'u1'
    },
    {
        id: 'p5', name: 'Kablosuz Kulaklık Pro', brand: 'SoundMax', category: 'electronics',
        price: 4500, currency: '₺', url: 'https://example.com/headphones',
        image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=600&auto=format&fit=crop',
        emoji: '🎧', likes: 890, comments: 67,
        tags: ['kulaklık', 'kablosuz', 'müzik'], trending: true, addedBy: 'u2'
    },
    {
        id: 'p6', name: 'Yoga Matı Premium', brand: 'FlexFit', category: 'sports',
        price: 650, currency: '₺', url: 'https://example.com/yoga',
        image: null, emoji: '🧘', likes: 234, comments: 12,
        tags: ['yoga', 'spor', 'sağlık'], trending: false, addedBy: 'u3'
    },
    {
        id: 'p7', name: 'Akıllı Ev Aydınlatma', brand: 'LightHub', category: 'home',
        price: 1200, currency: '₺', url: 'https://example.com/light',
        image: null, emoji: '💡', likes: 456, comments: 34,
        tags: ['akıllı ev', 'led', 'dekorasyon'], trending: true, addedBy: 'u2'
    },
    {
        id: 'p8', name: 'Oversize Trençkot', brand: 'StyleCo', category: 'fashion',
        price: 5800, currency: '₺', url: 'https://example.com/trenchcoat',
        image: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?q=80&w=600&auto=format&fit=crop',
        emoji: '🧥', likes: 678, comments: 52,
        tags: ['trençkot', 'oversize', 'kış'], trending: true, addedBy: 'u4'
    },
    {
        id: 'p9', name: 'Gaming Laptop RTX 4070', brand: 'GameForce', category: 'gaming',
        price: 62000, currency: '₺', url: 'https://example.com/laptop',
        image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?q=80&w=400&auto=format&fit=crop',
        emoji: '💻', likes: 1456, comments: 189,
        tags: ['laptop', 'gaming', 'rtx'], trending: true, addedBy: 'u5'
    },
    {
        id: 'p10', name: 'Parfüm Koleksiyonu', brand: 'ScentArt', category: 'beauty',
        price: 2100, currency: '₺', url: 'https://example.com/perfume',
        image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=400&auto=format&fit=crop',
        emoji: '🌸', likes: 445, comments: 38,
        tags: ['parfüm', 'hediye', 'lüks'], trending: false, addedBy: 'u1'
    },
    {
        id: 'p11', name: 'Mekanik Klavye RGB', brand: 'KeyMaster', category: 'gaming',
        price: 3800, currency: '₺', url: 'https://example.com/keyboard',
        image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?q=80&w=400&auto=format&fit=crop',
        emoji: '⌨️', likes: 723, comments: 91,
        tags: ['klavye', 'mekanik', 'rgb'], trending: true, addedBy: 'u5'
    },
    {
        id: 'p12', name: 'Nike Dunk Low Retro', brand: 'Nike', category: 'fashion',
        price: 4599, currency: '₺', url: 'https://www.nike.com/tr/t/dunk-low-retro-ayakkab%C4%B1s%C4%B1-hCqL7z',
        image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=600&auto=format&fit=crop',
        emoji: '👟', likes: 934, comments: 76,
        tags: ['sneaker', 'limited', 'ayakkabı'], trending: true, addedBy: 'u4'
    },
    {
        id: 'p13', name: 'Akıllı Fitness Bileklik', brand: 'FitTrack', category: 'sports',
        price: 1800, currency: '₺', url: 'https://example.com/fitband',
        image: null, emoji: '⌚', likes: 389, comments: 29,
        tags: ['fitness', 'bileklik', 'akıllı'], trending: false, addedBy: 'u3'
    },
    {
        id: 'p14', name: 'Cam Vazo Seti', brand: 'HomeArt', category: 'home',
        price: 780, currency: '₺', url: 'https://example.com/vase',
        image: null, emoji: '🏺', likes: 167, comments: 14,
        tags: ['vazo', 'dekorasyon', 'cam'], trending: false, addedBy: 'u3'
    },
    {
        id: 'p15', name: 'Güneş Gözlüğü Polarize', brand: 'SunStyle', category: 'fashion',
        price: 1500, currency: '₺', url: 'https://example.com/sunglasses',
        image: 'https://images.unsplash.com/photo-1511499767390-90342f16b117?q=80&w=400&auto=format&fit=crop',
        emoji: '🕶️', likes: 512, comments: 41,
        tags: ['güneş gözlüğü', 'aksesuar', 'yaz'], trending: true, addedBy: 'u4'
    },
    {
        id: 'p16', name: 'Tablet Çizim Kalemi', brand: 'DrawPro', category: 'tech',
        price: 2800, currency: '₺', url: 'https://example.com/stylus',
        image: null, emoji: '✏️', likes: 234, comments: 18,
        tags: ['tablet', 'çizim', 'dijital'], trending: false, addedBy: 'u2'
    },
    {
        id: 'p17', name: 'Kadın Haki Deri Oversize Trucker Ceket', brand: 'Mudo', category: 'fashion',
        price: 17999, currency: '₺', url: 'https://www.mudo.com.tr/kadin-haki-deri-oversize-trucker-ceket-haki/',
        image: 'https://ce1999-mudo.akinoncloudcdn.com/products/2025/11/12/601898/822c2895-b6cb-4050-b29b-db8833593360.jpg',
        emoji: '🧥', likes: 125, comments: 12,
        tags: ['deri', 'ceket', 'haki', 'oversize'], trending: true, addedBy: 'u1'
    },
    {
        id: 'p18', name: 'Yağ Yeşili - Zincir Askılı El ve Omuz Çantası', brand: 'Addax', category: 'fashion',
        price: 413.55, currency: '₺', url: 'https://www.addax.com.tr/yag-yesili-zincir-askili-el-ve-omuz-cantasi-c39_500093',
        image: 'assets/feature_bag_green.jpg',
        emoji: '👜', likes: 89, comments: 5,
        tags: ['çanta', 'yeşil', 'addax'], trending: true, addedBy: 'u1'
    },
    {
        id: 'p19', name: 'Kadın Topuklu SİYAH', brand: 'Mupa Shoes', category: 'fashion',
        price: 1399.90, currency: '₺', url: 'https://www.mupashoes.com/kadin-topuklu-siyah-2767',
        image: 'assets/feature_shoes_black.jpg',
        emoji: '👠', likes: 67, comments: 4,
        tags: ['topuklu', 'ayakkabı', 'siyah'], trending: true, addedBy: 'u1'
    },
    {
        id: 'p20', name: 'LCW Modest Kahverengi Beli Fermuarlı Büzgülü Etek', brand: 'LCW Modest', category: 'fashion',
        price: 1299.99, currency: '₺', url: 'https://www.lcw.com/beli-fermuarli-buzgulu-etek-kahverengi-o-5227615?gad_source=4',
        image: 'assets/feature_skirt_brown.jpg',
        emoji: '👗', likes: 42, comments: 3,
        tags: ['etek', 'kahverengi', 'lcw'], trending: true, addedBy: 'u1'
    },
    {
        id: 'p21', name: 'Siyah Regular Fit Düğmeli Polo Yaka Triko Kazak', brand: 'Kığılı', category: 'fashion',
        price: 1799.00, currency: '₺', url: 'https://www.kigili.com/products/siyah-regular-fit-polo-yaka-duz-triko-kazak-kkbsd170dz001110',
        image: 'assets/feature_sweater_black.jpg',
        emoji: '👕', likes: 112, comments: 8,
        tags: ['kazak', 'siyah', 'kığılı', 'triko'], trending: true, addedBy: 'u4'
    },
    {
        id: 'p22', name: 'Orta Bej Techno-Line 7 Drop Super Slim Fit Likralı Pantolon', brand: 'Kığılı', category: 'fashion',
        price: 1999.00, currency: '₺', url: 'https://www.kigili.com/products/orta-bej-techno-line-super-slim-fit-ekstra-dar-kesim-likrali-beli-lastikli-ipli-klasik-kumas-pantolon-kssz3h79dz003810-e',
        image: 'assets/feature_pants_beige.jpg',
        emoji: '👖', likes: 85, comments: 4,
        tags: ['pantolon', 'bej', 'kığılı', 'slim-fit'], trending: true, addedBy: 'u4'
    },
    {
        id: 'p23', name: 'Sivri Burun Chelsea Bot', brand: 'Zara', category: 'fashion',
        price: 2490.00, currency: '₺', url: 'https://www.zara.com/tr/tr/sivri-burun-chelsea-bot-p12060720.html',
        image: 'assets/feature_boots_chelsea.jpg',
        imageStyle: 'object-position: center bottom;',
        emoji: '🥾', likes: 142, comments: 12,
        tags: ['bot', 'ayakkabı', 'zara', 'chelsea'], trending: true, addedBy: 'u4'
    },
    {
        id: 'p24', name: 'Düzensiz Çiçek Jakarlı Ceket', brand: 'Zara', category: 'fashion',
        price: 4490.00, currency: '₺', url: 'https://www.zara.com/tr/tr/jakarli-krop-ceket-p00624400.html',
        image: 'assets/feature_jacket_jacquard.jpg',
        emoji: '🧥', likes: 98, comments: 6,
        tags: ['ceket', 'zara', 'jakar', 'çiçek'], trending: true, addedBy: 'u4'
    }
];

const SAMPLE_WISHLISTS = [
    {
        id: 'w1', userId: 'u1', title: 'İlkbahar Gardırobu', 
        description: 'Bu bahar için hayalini kurduğum parçalar',
        privacy: 'public', products: ['p17', 'p18', 'p19', 'p20'],
        likes: 245, comments: 32, shares: 18, completedProducts: ['p19', 'p20'],
        createdAt: '2024-03-15', category: 'fashion'
    },
    {
        id: 'w2', userId: 'u1', title: 'Güzellik Rutini ✨',
        description: 'Günlük cilt bakım ürünleri',
        privacy: 'public', products: ['p3', 'p10'],
        likes: 189, comments: 24, shares: 12, completedProducts: [],
        createdAt: '2024-03-20', category: 'beauty'
    },
    {
        id: 'w3', userId: 'u2', title: 'Tech Setup 2025 🖥️',
        description: 'Hayalimdeki çalışma masası kurulumu',
        privacy: 'public', products: ['p2', 'p5', 'p7', 'p16'],
        likes: 567, comments: 89, shares: 45, completedProducts: ['p5'],
        createdAt: '2024-02-28', category: 'tech'
    },
    {
        id: 'w4', userId: 'u2', title: 'Gaming Arsenal 🎮',
        description: 'Ultimate gaming setup',
        privacy: 'public', products: ['p9', 'p11'],
        likes: 890, comments: 134, shares: 67, completedProducts: [],
        createdAt: '2024-03-05', category: 'gaming'
    },
    {
        id: 'w5', userId: 'u3', title: 'Ev Dekorasyon Fikirleri 🏠',
        description: 'Yeni evim için dekorasyon önerileri',
        privacy: 'public', products: ['p7', 'p14', 'p6'],
        likes: 134, comments: 18, shares: 8, completedProducts: ['p14'],
        createdAt: '2024-03-12', category: 'home'
    },
    {
        id: 'w6', userId: 'u4', title: 'Sonbahar Kombini', 
        description: 'Sezon trendlerine uygun kombinler',
        privacy: 'public', products: ['p21', 'p22', 'p23', 'p24'],
        likes: 1023, comments: 156, shares: 89, completedProducts: ['p22', 'p23', 'p24'],
        createdAt: '2024-03-08', category: 'fashion'
    },
    {
        id: 'w7', userId: 'u5', title: 'Pro Gamer Kit 🎮',
        description: 'Profesyonel gaming ekipmanları',
        privacy: 'public', products: ['p9', 'p11', 'p5', 'p2'],
        likes: 734, comments: 98, shares: 52, completedProducts: ['p11'],
        createdAt: '2024-03-01', category: 'gaming'
    }
];

const SAMPLE_COMMENTS = [
    { id: 'c1', userId: 'u3', targetId: 'w1', text: 'Çok güzel seçimler! O çanta harika 😍', createdAt: '2024-03-16', likes: 12 },
    { id: 'c2', userId: 'u4', targetId: 'w1', text: 'Trençkotu ben de aldım, kesinlikle tavsiye ederim!', createdAt: '2024-03-16', likes: 8 },
    { id: 'c3', userId: 'u1', targetId: 'w3', text: 'Bu setup çok havalı olacak 🔥', createdAt: '2024-03-01', likes: 15 },
    { id: 'c4', userId: 'u5', targetId: 'w4', text: 'Aynı laptop bende var, performansı mükemmel!', createdAt: '2024-03-06', likes: 23 },
    { id: 'c5', userId: 'u2', targetId: 'w6', text: 'Stil danışmanlığı yaptırabilir miyiz? 😄', createdAt: '2024-03-09', likes: 18 },
];

const SAMPLE_BLOG_POSTS = [
    {
        id: 'b1', userId: 'u4', title: '2025 İlkbahar Moda Trendleri',
        excerpt: 'Bu ilkbaharda öne çıkan renkler, kumaşlar ve silüetler. Gardırobunuzu yenilemeye hazır olun!',
        content: 'İlkbahar sezonu yaklaşırken moda dünyası yeni trendlerle hareketleniyor...',
        category: 'Moda', emoji: '🌸', likes: 456, comments: 67,
        createdAt: '2024-03-20'
    },
    {
        id: 'b2', userId: 'u2', title: 'Evden Çalışma Setup Rehberi',
        excerpt: 'Verimli ve konforlu bir ev ofisi kurmak için gereken tüm ekipmanlar ve ipuçları.',
        content: 'Evden çalışma artık hayatımızın vazgeçilmez bir parçası...',
        category: 'Teknoloji', emoji: '🖥️', likes: 789, comments: 134,
        createdAt: '2024-03-18'
    },
    {
        id: 'b3', userId: 'u1', title: 'Minimalist Gardırop Oluşturma',
        excerpt: 'Az parça, çok kombin: Kapsül gardırop rehberiniz. Her mevsim şık olun!',
        content: 'Minimalizm sadece bir trend değil, bir yaşam tarzı...',
        category: 'Stil', emoji: '👗', likes: 345, comments: 45,
        createdAt: '2024-03-15'
    },
    {
        id: 'b4', userId: 'u3', title: 'Evde Spa Deneyimi',
        excerpt: 'Profesyonel cilt bakımını evinize getirin. Uygun fiyatlı ürünlerle lüks spa deneyimi.',
        content: 'Herkesin yoğun tempoya ihtiyaç duyduğu anlar var...',
        category: 'Güzellik', emoji: '🧖', likes: 234, comments: 28,
        createdAt: '2024-03-12'
    },
    {
        id: 'b5', userId: 'u5', title: 'En İyi Gaming Aksesuarları 2025',
        excerpt: 'Oyun deneyiminizi üst seviyeye taşıyacak aksesuarlar ve donanım önerileri.',
        content: 'Gaming dünyası her geçen gün gelişiyor...',
        category: 'Gaming', emoji: '🎮', likes: 567, comments: 89,
        createdAt: '2024-03-10'
    },
    {
        id: 'b6', userId: 'u4', title: 'Hediye Seçme Rehberi',
        excerpt: 'Sevdiklerinize en güzel hediyeleri seçmek için ipuçları ve öneriler.',
        content: 'Hediye seçmek bazen zor olabilir, ama imkansız değil...',
        category: 'Lifestyle', emoji: '🎁', likes: 890, comments: 156,
        createdAt: '2024-03-08'
    }
];

const SAMPLE_CHALLENGES = [
    {
        id: 'ch1', title: '30 Gün Minimalizm Challenge',
        description: 'Her gün bir ürün eleyelim, minimal bir gardırop oluşturalım!',
        participants: 2340, progress: 67, endDate: '2024-04-15',
        emoji: '🧹', category: 'lifestyle'
    },
    {
        id: 'ch2', title: 'Doğum Günü Hediye Maratonu 🎂',
        description: 'Arkadaşlarınız için en yaratıcı hediyeleri bulun!',
        participants: 1890, progress: 45, endDate: '2024-04-30',
        emoji: '🎁', category: 'social'
    },
    {
        id: 'ch3', title: 'İlkbahar Kombin Yarışması',
        description: 'En iyi ilkbahar kombinini oluştur, ödül kazan!',
        participants: 3450, progress: 82, endDate: '2024-04-10',
        emoji: '🌷', category: 'fashion'
    }
];

const SAMPLE_WARDROBE_ITEMS = [
    { id: 'wr1', type: 'top', name: 'Beyaz Gömlek', emoji: '👔', color: '#FFFFFF' },
    { id: 'wr2', type: 'top', name: 'Siyah Tişört', emoji: '👕', color: '#1A1A1A' },
    { id: 'wr3', type: 'top', name: 'Denim Ceket', emoji: '🧥', color: '#4A7AB5' },
    { id: 'wr4', type: 'top', name: 'Oversize Hoodie', emoji: '🧥', color: '#8B5CF6' },
    { id: 'wr5', type: 'top', name: 'Kazak Triko', emoji: '🧶', color: '#D4956B' },
    { id: 'wr6', type: 'top', name: 'Crop Top', emoji: '👚', color: '#EC4899' },
    { id: 'wr7', type: 'bottom', name: 'Slim Fit Jean', emoji: '👖', color: '#1E3A5F' },
    { id: 'wr8', type: 'bottom', name: 'Wide Leg Pantolon', emoji: '👖', color: '#2D2D2D' },
    { id: 'wr9', type: 'bottom', name: 'Mini Etek', emoji: '👗', color: '#EC4899' },
    { id: 'wr10', type: 'bottom', name: 'Kumaş Pantolon', emoji: '👖', color: '#5C5C5C' },
    { id: 'wr11', type: 'bottom', name: 'Jogger', emoji: '👖', color: '#4A4A4A' },
    { id: 'wr12', type: 'shoes', name: 'Beyaz Sneaker', emoji: '👟', color: '#F5F5F5' },
    { id: 'wr13', type: 'shoes', name: 'Deri Bot', emoji: '👢', color: '#3B2507' },
    { id: 'wr14', type: 'shoes', name: 'Topuklu Ayakkabı', emoji: '👠', color: '#B91C1C' },
    { id: 'wr15', type: 'shoes', name: 'Loafer', emoji: '👞', color: '#5B3E1F' },
    { id: 'wr16', type: 'shoes', name: 'Platform Sneaker', emoji: '👟', color: '#1A1A1A' },
];

const NOTIFICATIONS_DATA = [
    { id: 'n1', type: 'like', userId: 'u4', text: 'listeni beğendi', targetId: 'w1', time: '2 dk önce', read: false, icon: '❤️' },
    { id: 'n2', type: 'follow', userId: 'u5', text: 'seni takip etmeye başladı', targetId: null, time: '15 dk önce', read: false, icon: '👤' },
    { id: 'n3', type: 'comment', userId: 'u3', text: 'listene yorum yaptı', targetId: 'w1', time: '1 saat önce', read: false, icon: '💬' },
    { id: 'n4', type: 'ai', userId: null, text: 'Yeni trend önerilerin hazır!', targetId: null, time: '3 saat önce', read: true, icon: '🤖' },
    { id: 'n5', type: 'achievement', userId: null, text: '100 beğeni rozeti kazandın! 🏆', targetId: null, time: '1 gün önce', read: true, icon: '🏆' },
];

const TREND_DATA = {
    categories: [
        { name: 'Moda', count: 45600, change: 12 },
        { name: 'Teknoloji', count: 38900, change: 8 },
        { name: 'Güzellik', count: 29800, change: 15 },
        { name: 'Ev & Yaşam', count: 18500, change: -3 },
        { name: 'Oyun', count: 34200, change: 22 },
        { name: 'Spor', count: 15600, change: 5 },
    ],
    weeklyTrends: [
        { name: 'Oversize Trençkot', category: 'Moda', change: 45, rank: 1 },
        { name: 'iPhone 16 Pro', category: 'Teknoloji', change: 38, rank: 2 },
        { name: 'Retinol Serum', category: 'Güzellik', change: 32, rank: 3 },
        { name: 'Gaming Laptop', category: 'Oyun', change: 28, rank: 4 },
        { name: 'Sneaker LE', category: 'Moda', change: 25, rank: 5 },
        { name: 'Akıllı Saat', category: 'Teknoloji', change: 22, rank: 6 },
        { name: 'RGB Klavye', category: 'Oyun', change: 18, rank: 7 },
        { name: 'Kapsül Gardırop', category: 'Moda', change: 15, rank: 8 },
    ]
};

// Color palette for generating product card backgrounds
const PRODUCT_COLORS = [
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
    'linear-gradient(135deg, #fccb90 0%, #d57eeb 100%)',
    'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)',
    'linear-gradient(135deg, #f5576c 0%, #ff9190 50%, #ffd1c1 100%)',
    'linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)',
];

function getProductColor(index) {
    return PRODUCT_COLORS[index % PRODUCT_COLORS.length];
}

function getUserById(id) {
    return SAMPLE_USERS.find(u => u.id === id);
}

function getProductById(id) {
    return SAMPLE_PRODUCTS.find(p => p.id === id);
}

function getWishlistById(id) {
    return SAMPLE_WISHLISTS.find(w => w.id === id);
}

function formatNumber(num) {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
}

function formatPrice(price) {
    return new Intl.NumberFormat('tr-TR').format(price) + ' ₺';
}

function timeAgo(dateStr) {
    const now = new Date();
    const date = new Date(dateStr);
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    if (minutes < 60) return `${minutes} dk önce`;
    if (hours < 24) return `${hours} saat önce`;
    if (days < 7) return `${days} gün önce`;
    return date.toLocaleDateString('tr-TR');
}
