/* ═══════════════════════════════════════════════════════
   WISHLIST HUB - Data Models & Sample Data
   ═══════════════════════════════════════════════════════ */

const CATEGORIES = [
    { id: 'fashion', name: 'Moda', icon: '<i class="fas fa-tshirt"></i>', color: '#EC4899' },
    { id: 'tech', name: 'Teknoloji', icon: '<i class="fas fa-microchip"></i>', color: '#3B82F6' },
    { id: 'beauty', name: 'Güzellik', icon: '<i class="fas fa-spa"></i>', color: '#F43F5E' },
    { id: 'home', name: 'Ev & Yaşam', icon: '<i class="fas fa-home"></i>', color: '#10B981' },
    { id: 'sports', name: 'Spor', icon: '<i class="fas fa-dumbbell"></i>', color: '#F97316' },
    { id: 'books', name: 'Kitap', icon: '<i class="fas fa-book"></i>', color: '#8B5CF6' },
    { id: 'pets', name: 'Evcil Hayvan', icon: '<i class="fas fa-paw"></i>', color: '#10B981' },
    { id: 'gaming', name: 'Oyun', icon: '<i class="fas fa-gamepad"></i>', color: '#F59E0B' },
];

const SAMPLE_USERS = [
    {
        id: 'u1',
        name: 'Ayşe Yılmaz',
        username: '@aysestyle',
        email: 'ayse@example.com',
        avatar: 'assets/aysestyle_avatar.png',
        avatarEmoji: null,
        bio: 'Moda, tasarım ve minimal yaşam tutkunu. İstanbul. Gardırobumdan ilham verici kombinler ve stil ipuçları paylaşıyorum. Collabs: info@aysestyle.com',
        interests: ['fashion', 'beauty'],
        followers: 12400,
        following: 890,
        wishlists: ['w1', 'w2'],
        joinDate: '2026-01-15',
        verified: true,
        segment: 'female'
    },
    {
        id: 'u2',
        name: 'Mehmet Kaya',
        username: '@techmemet',
        email: 'mehmet@example.com',
        avatar: 'assets/techmemet_avatar.png',
        avatarEmoji: null,
        bio: 'Tech enthusiast | Gadget reviewer | Software engineer',
        interests: ['tech', 'electronics', 'gaming'],
        followers: 8200,
        following: 450,
        wishlists: ['w3', 'w4'],
        joinDate: '2026-02-20',
        verified: true,
        segment: 'male'
    },
    {
        id: 'u3',
        name: 'Zeynep Demir',
        username: '@zeynepexplores',
        email: 'zeynep@example.com',
        avatar: 'assets/zeynepexplores_avatar.png',
        avatarEmoji: null,
        bio: 'Keşfetmeyi seviyorum. Lifestyle | İlham peşinde',
        interests: ['fashion', 'beauty', 'home'],
        followers: 5600,
        following: 1200,
        wishlists: ['w5'],
        joinDate: '2026-03-10',
        verified: false,
        segment: 'young'
    },
    {
        id: 'u4',
        name: 'Emre Aktaş',
        username: '@emrestyle',
        email: 'emre@example.com',
        avatar: 'assets/emrestyle_avatar.png',
        avatarEmoji: null,
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
        avatar: 'https://i.pravatar.cc/300?u=u5',
        avatarEmoji: null,
        bio: 'Gamer | Streamer | Teknoloji bağımlısı',
        interests: ['gaming', 'tech', 'electronics'],
        followers: 15800,
        following: 340,
        wishlists: ['w7'],
        joinDate: '2026-01-28',
        verified: true,
        segment: 'young'
    },
    {
        id: 'u6',
        name: 'Duygu Alas',
        username: '@duygualas',
        email: 'duygu@example.com',
        avatar: 'https://i.pravatar.cc/300?u=u6',
        avatarEmoji: null,
        bio: 'Tech enthusiast | Digital nomad | Lifestyle & Gadgets',
        interests: ['tech', 'electronics', 'fashion'],
        followers: 1500,
        following: 320,
        wishlists: ['w8'],
        joinDate: '2026-05-11',
        verified: true,
        segment: 'female'
    },
    {
        id: 'u7',
        name: 'Kamer Abanoz',
        username: '@kamerabanoz',
        email: 'kamer@example.com',
        avatar: 'https://i.pravatar.cc/300?u=u7',
        avatarEmoji: null,
        bio: 'Güzellik, bakım ve yaşam stili.',
        interests: ['beauty', 'lifestyle'],
        followers: 1200,
        following: 150,
        wishlists: ['w9'],
        joinDate: '2026-05-11',
        verified: true,
        segment: 'male'
    },
    {
        id: 'u8',
        name: 'Tuna Yılmaz',
        username: '@tunayilmaz',
        email: 'tuna@example.com',
        avatar: 'https://i.pravatar.cc/300?u=u8',
        avatarEmoji: null,
        bio: 'Ev & Yaşam tutkunu | Minimalist detaylar.',
        interests: ['home', 'lifestyle'],
        followers: 850,
        following: 120,
        wishlists: ['w10'],
        joinDate: '2026-05-11',
        verified: true,
        segment: 'male'
    },
    {
        id: 'u9',
        name: 'Deniz Yıldırım',
        username: '@denizfitness',
        email: 'deniz@example.com',
        avatar: 'https://i.pravatar.cc/300?u=u9',
        avatarEmoji: null,
        bio: 'Sağlıklı yaşam | Fitness & Pilates tutkunu',
        interests: ['sports', 'health'],
        followers: 2100,
        following: 450,
        wishlists: ['w11'],
        joinDate: '2026-05-11',
        verified: true,
        segment: 'female'
    },
    {
        id: 'u10',
        name: 'Burak Tozlu',
        username: '@buraktozlu',
        email: 'burak@example.com',
        avatar: 'https://i.pravatar.cc/300?u=u10',
        avatarEmoji: null,
        bio: 'Evde fitness | Disiplin ve güç.',
        interests: ['sports', 'fitness'],
        followers: 1450,
        following: 210,
        wishlists: ['w12'],
        joinDate: '2026-05-11',
        verified: true,
        segment: 'male'
    },
    {
        id: 'u11',
        name: 'Parla Tekin',
        username: '@parlakitap',
        email: 'parla@example.com',
        avatar: 'https://i.pravatar.cc/300?u=u11',
        avatarEmoji: null,
        bio: 'Kitap kurdu | Fantastik dünyalar gezgini.',
        interests: ['books', 'art'],
        followers: 3200,
        following: 150,
        wishlists: ['w13'],
        joinDate: '2026-05-11',
        verified: true,
        segment: 'female'
    },
    {
        id: 'u12',
        name: 'Yaman Uraz',
        username: '@yamanuraz',
        email: 'yaman@example.com',
        avatar: 'https://i.pravatar.cc/300?u=yaman',
        avatarEmoji: null,
        bio: 'Dijital dünya | Sosyoloji & İletişim tutkunu.',
        interests: ['books', 'technology'],
        followers: 1850,
        following: 320,
        wishlists: ['w14'],
        joinDate: '2026-05-11',
        verified: true,
        segment: 'male'
    },
    {
        id: 'u13',
        name: 'Rana Türk',
        username: '@ranaturk',
        email: 'rana@example.com',
        avatar: 'https://i.pravatar.cc/300?u=rana',
        avatarEmoji: null,
        bio: 'Hayvan dostu | Modern yaşam | Stil & Tasarım',
        interests: ['pets', 'fashion', 'home'],
        followers: 2800,
        following: 420,
        wishlists: ['w15'],
        joinDate: '2026-05-11',
        verified: true,
        segment: 'female'
    },
    {
        id: 'u14',
        name: 'Emre Baysel',
        username: '@emrebaysel',
        email: 'emre.baysel@example.com',
        avatar: 'https://i.pravatar.cc/300?u=emre',
        avatarEmoji: null,
        bio: 'Teknoloji & Evcil Hayvan Bakımı | Minimalist',
        interests: ['pets', 'tech'],
        followers: 1450,
        following: 180,
        wishlists: ['w16'],
        joinDate: '2026-05-11',
        verified: true,
        segment: 'male'
    }
];

const SAMPLE_PRODUCTS = [
    {
        id: 'p_good_girl_blush',
        name: 'Good Girl Blush - Eau de Parfum',
        brand: 'Carolina Herrera',
        category: 'beauty',
        price: 9485.00,
        currency: '₺',
        url: 'https://www.sephora.com.tr/p/good-girl-blush---eau-de-parfum-657446.html',
        image: 'assets/carolina_herrera_good_girl.png',
        emoji: '🧴',
        likes: 184,
        comments: 0,
        tags: ['parfüm', 'beauty', 'carolina herrera', 'blush'],
        trending: true,
        addedBy: 'u1'
    },
    {
        id: 'p_ck_convertible',
        name: 'Kadın CK Convertible Chain Çapraz Çanta',
        brand: 'Calvin Klein',
        category: 'fashion',
        price: 8249.00,
        currency: '₺',
        url: 'https://tr.calvinklein.com/kadin-ck-convertible-chain-capraz-canta-p_203933',
        image: 'assets/ck_convertible_bag.png',
        emoji: '👜',
        likes: 120,
        comments: 0,
        tags: ['çanta', 'calvin klein', 'convertible', 'deri'],
        trending: true,
        addedBy: 'u1'
    },
    {
        id: 'p_airpods_max_purple',
        name: 'AirPods Max 2 - Mor',
        brand: 'Apple',
        category: 'tech',
        price: 36999.00,
        currency: '₺',
        url: 'https://www.apple.com/tr/shop/buy-airpods/airpods-max-2/mor?cid=aos-tr-seo-pla-airpods',
        image: 'assets/airpods_max_purple.png',
        emoji: '🎧',
        likes: 275,
        comments: 0,
        tags: ['kulaklık', 'airpods max', 'apple', 'mor'],
        trending: true,
        addedBy: 'u1'
    },
    {
        id: 'p1', name: 'SİYAH MONOGRAM ÇANTA', brand: 'Vakko', category: 'fashion',
        price: 9990, currency: '₺', url: 'https://www.vakko.com/canta/siyah-monogram-canta-p-M403956711-0002',
        image: 'assets/siyah_monogram_canta.png',
        emoji: '👜', likes: 342, comments: 28,
        tags: ['deri', 'çanta', 'monogram', 'vakko'], trending: true, addedBy: 'u1'
    },
    {
        id: 'p2', name: 'Mini Taşınabilir Projektör 4K 1080P Full HD Android 11 ve Netflix ile uyumlu, WiFi 6, BT 5.0, 180° Dönme, Otomatik Trapez Düzeltmeli Küçük Ev Sineması Projektörü', brand: 'Amazon', category: 'tech',
        price: 1639.00, currency: '₺', url: 'https://www.amazon.com.tr/Ta%C5%9F%C4%B1nabilir-Projekt%C3%B6r-Otomatik-D%C3%BCzeltmeli-Projekt%C3%B6r%C3%BC/dp/B0DG5LSJ3X?ref_=Oct_d_obs_d_13709924031_0&pd_rd_w=If981&content-id=amzn1.sym.3d1902e7-cf73-457c-b1cb-c20adb8bd591&pf_rd_p=3d1902e7-cf73-457c-b1cb-c20adb8bd591&pf_rd_r=3K2H2MSV764W5DPCG2ZK&pd_rd_wg=5EPtM&pd_rd_r=ae9848de-9bc8-4bad-9215-b4b65649454a&pd_rd_i=B0DG5LSJ3X',
        image: 'assets/projector.png',
        emoji: '📽️', likes: 1205, comments: 156,
        tags: ['projektör', 'sinema', 'taşınabilir'], trending: true, addedBy: 'u2'
    },
    {
        id: 'p3', name: 'FENTY BEAUTY Duo Contour & Highlighter Set - İkili Kontür ve Aydınlatıcı Seti', brand: 'Fenty Beauty', category: 'beauty',
        price: 2229.00, currency: '₺', url: 'https://www.sephora.com.tr/p/duo-contour-et-highlighter-set---i%CC%87kili-cubuk-kontur-ve-aydinlatici-P10060514.html',
        image: 'assets/fenty_beauty.png',
        emoji: '💄', likes: 567, comments: 45,
        tags: ['makyaj', 'fenty', 'contour', 'highlighter'], trending: true, addedBy: 'u3'
    },
    {
        id: 'p4', name: 'Michael Kors MK4882 Kadın Kol Saati', brand: 'Michael Kors', category: 'fashion',
        price: 15168.00, currency: '₺', url: 'https://www.vanlilarsaat.com.tr/michael-kors-mk4882-kadin-kol-saati-14431?srsltid=AfmBOopf_cKJwiaEbmWNb9wGf6IXLYRj9TwYSMFYDWLIgbHmf0dx48nhPeA',
        image: 'assets/michael_kors_watch.png',
        emoji: '⌚', likes: 289, comments: 19,
        tags: ['saat', 'michael kors', 'aksesuar', 'kadın saat'], trending: true, addedBy: 'u1'
    },
    {
        id: 'p5', name: 'Alphatheta XDJ-AZ All-in-One DJ Setup', brand: 'AlphaTheta', category: 'tech',
        price: 175990.00, currency: '₺', url: 'https://www.amazon.com.tr/Alphatheta-XDJ-AZ-All-in-One-DJ-Setup/dp/B0DJTYHWM1/ref=sr_1_1?dib=eyJ2IjoiMSJ9.nXk5ALOAwnfgblFyiAmMsV3o35YBtEbYvM6zomUJcZGiYK9wGQpGSlJt8K6cG1bYL-WzgWvP5ld8cqu0_cw6L9d-Gyl68_fS6-qmeA7alU0sg_g3m1Rg0Yiz9luvJSgMvynjR81X_DChp3hfA0q57MiUEXUwJTgIHdktK_6_N3FdEOh2P1OBfwUu-Ewt_XNcCMVs4dMmObp5iNIIhnRWoUS1cMNvrz897YmGpYBjwB4YFJlQLhXNjd0RmYVA_Ds1q66rrCHXgDU3ciNL70iNsSyWb0xMUNa9NttzDN_9zPs.gcwcGnOxdHLoYEMOMyVRMcQGEj1V4xwqHqHY3QF2va8&dib_tag=se&keywords=setup&qid=1778503125&sr=8-1',
        image: 'assets/dj_setup.png',
        emoji: '🎛️', likes: 890, comments: 67,
        tags: ['dj', 'setup', 'music', 'pro'], trending: true, addedBy: 'u2'
    },
    {
        id: 'p6', name: 'Yoga Matı Premium', brand: 'FlexFit', category: 'sports',
        price: 650, currency: '₺', url: 'https://example.com/yoga',
        image: null, emoji: '🧘', likes: 234, comments: 12,
        tags: ['yoga', 'spor', 'sağlık'], trending: false, addedBy: 'u3'
    },
    {
        id: 'p7', name: 'Apple AirPods Max 2 Kablosuz Kulak Üstü Kulaklık, Aktif Gürültü Engelleme, Uyarlanabilir Ses, Kişiselleştirilmiş Uzamsal Ses, iPhone için Bluetooth Kulaklık – Gece Yarısı', brand: 'Apple', category: 'tech',
        price: 24849.00, currency: '₺', url: 'https://www.amazon.com.tr/Apple-Engelleme-Uyarlanabilir-Ki%C5%9Fiselle%C5%9Ftirilmi%C5%9F-Bluetooth/dp/B0GSRXMJH4/ref=sr_1_6?crid=2S5B7OGO8M0ZA&dib=eyJ2IjoiMSJ9.0IvCoPAB6cD3NiHcSEnstkRPg9AKHvxiAeUHn6QJAqir-Gxap_4Ckv25ijBNAHmK1dn2gLepG2FwNt4nWLLC8NqRWUab6A52bfKWSq3OqrW77CaUSt1dkpY5J9ql5prJJCtlq__F_HwR3Q3HS_FdalGb-bkU3-k-SqvWAbvkniHpOfE7O5EriERau1M3S2o-lkWgKaxK1PLbTmw64ETsTAYReN-XIq0Y_FsbiQG9l3YR4N8b-47m_Y0ob1YJSKLbbc1mFFfhrFT_UaOebQyt5_3iP6_o1ws94JL-2W79p1Q.FengsBr1Ld4PyAhkKoCe9rqoLZrp2sOFkPLk875CTMw&dib_tag=se&keywords=apple%2Bkulakl%C4%B1k&qid=1778504804&sprefix=apple%2Bk%2Caps%2C161&sr=8-6&th=1',
        image: 'assets/airpods_max.png',
        emoji: '🎧', likes: 456, comments: 34,
        tags: ['kulaklık', 'apple', 'airpods', 'premium'], trending: true, addedBy: 'u2'
    },
    {
        id: 'p8', name: 'Oversize Trençkot', brand: 'StyleCo', category: 'fashion',
        price: 5800, currency: '₺', url: 'https://example.com/trenchcoat',
        image: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?q=80&w=600&auto=format&fit=crop',
        emoji: '🧥', likes: 678, comments: 52,
        tags: ['trençkot', 'oversize', 'kış'], trending: true, addedBy: 'u4'
    },
    {
        id: 'p9', name: 'Neo Manuel Yükseklik Ayarlı Rgb Oyuncu Masası', brand: 'EXVEGA', category: 'gaming',
        price: 9490, currency: '₺', url: 'https://exvega.com/products/exvega-neo-rgb-oyuncu-masasi?variant=45417002205363&country=TR&currency=TRY&utm_medium=product_sync&utm_source=google&utm_content=sag_organic&utm_campaign=sag_organic&srsltid=AfmBOophjmRZK6u7OiMu3d1BMn7vbEs8aBC890eX2D_IMgzyfqcl6AMq23U',
        image: 'assets/exvega_neo.png',
        emoji: '🎮', likes: 1456, comments: 189,
        tags: ['masa', 'oyuncu masası', 'rgb', 'exvega'], trending: true, addedBy: 'u5'
    },
    {
        id: 'p10', name: 'RARE BEAUTY Rare Eau De Parfum Vanilla And Caramel - Kadın Parfüm Seti', brand: 'Rare Beauty', category: 'beauty',
        price: 5199.00, currency: '₺', url: 'https://www.sephora.com.tr/p/rare-eau-de-parfum-vanilla-and-caramel---kadin-parfum-seti-803519.html',
        image: 'assets/rare_beauty_perfume.png',
        emoji: '🌸', likes: 445, comments: 38,
        tags: ['parfüm', 'rare beauty', 'hediye', 'lüks'], trending: true, addedBy: 'u1'
    },
    {
        id: 'p11', name: 'Twısted Minds Easepod Pro RGB Elektrikli Deri Döşeme Çelik Profesyonel Gaming Simülator', brand: 'Twisted Minds', category: 'gaming',
        price: 114999, currency: '₺', url: 'https://www.teknosa.com/twisted-minds-easepod-pro-rgb-elektrikli-deri-doseme-celik-profesyonel-gaming-simulator-p-788130488',
        image: 'assets/simulator.png',
        emoji: '🎮', likes: 723, comments: 91,
        tags: ['gaming', 'simulator', 'rgb', 'koltuk'], trending: true, addedBy: 'u5'
    },
    {
        id: 'p12', name: 'Nike Revolution 8', brand: 'Nike', category: 'fashion',
        price: 2719.15, currency: '₺', url: 'https://sportime.com.tr/products/nike-revolution-8-hj9198-003-erkek-sneaker?srsltid=AfmBOoqIAZhsQZiyHxscogARBgophnwmgGXCQ7yJTIP__Hj8FBAvGabsUWI',
        image: 'assets/nike_revolution_8.png',
        emoji: '👟', likes: 934, comments: 76,
        tags: ['sneaker', 'nike', 'ayakkabı', 'koşu'], trending: true, addedBy: 'u4'
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
        id: 'p16', name: 'Sony PlayStation 5 Slim Digital, Oyun Konsolu, 825 GB Depolama İthalatçı Yeni Seri - CFI-2116 & CFI-2118', brand: 'Sony', category: 'tech',
        price: 31444.00, currency: '₺', url: 'https://www.amazon.com.tr/PlayStation-Digital-Konsolu-Depolama-%C4%B0thalat%C3%A7%C4%B1/dp/B0FX5C8YHK/ref=sr_1_1?__mk_tr_TR=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=67T1OHE834BS&dib=eyJ2IjoiMSJ9.3Vc73zG_Oy4QwSqAt81qJvAM9le4ePCSt4gGCrtMi4bY5TrLUIHG9KuJhRbU_5KrgNsqDTpli2rL-wLSaapI55nTRFFGwIBcZkeipyrYDbB4ZFRX5FJm0_bl2I2lCYlb1w4QjsyBvMrPt9ltCihYfU7Yl4IpbnNRsgLxd3yppN5TRHJPrz0cp6-Rh2UiUlu5NyMCEimjmjKns2oZDgGODNSAVPkajt_aFRQu9ZGn6wWJx6N89CTfUS9QICU8gU6M4DMO_uFP05oUL7OBnPDwmff_SkNP0_EV9dWlShssRgQ.QlefgRtbR5SaoifqcVmqL8tXB9NOOue8s4qQ_9jwSg0&dib_tag=se&keywords=ps5&qid=1778505030&sprefix=ps5%2Caps%2C312&sr=8-1',
        image: 'assets/ps5_slim.png',
        emoji: '🎮', likes: 234, comments: 18,
        tags: ['ps5', 'sony', 'gaming', 'console'], trending: true, addedBy: 'u2'
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
    },
    {
        id: 'p25', name: 'Osmo Pocket 4 Creator Combo', brand: 'DJI', category: 'tech',
        price: 37299.00, currency: '₺', url: 'https://www.amazon.com.tr/Osmo-Pocket-4-Creator-Combo/dp/B0FKT9K6CB/ref=sr_1_1?crid=150DODVAX52QV&dib=eyJ2IjoiMSJ9.0KggtZhumn5ABXT268KE-LfzU5sAO8j4Q8T_v_vvd2mV_0uSndeyqfT-aLhzPzbG2x2XkEyI4gjo7lroZnb8aRxS5vIkhgMmNbKRV9iQ98mubSSM7JeTIqbXwe0A8OtHrunGMeo1Z1OuWEtzUAbv6yQjg7Cc94_6UpTZ2bTAsGzQb85B5UL-GfO0rkqIQQNfreriUYnww-9rA-n-25Q3Wj9LRPMdvPMw6YNPHPIT5vcv5wcZMZH4XYPOmxPZFReJFXSSiMfLDuJ1Nm1kqLz0NA8L67l-ipXYZTigiFyrhfU.pcBq2X6CQmKmQdirO9iz78T1-xhkvv_SbiqqiojRRKY&dib_tag=se&keywords=dji+osmo+pocket+4&qid=1778505437&sprefix=dji+o%2Caps%2C160&sr=8-1',
        image: 'assets/osmo_pocket.png',
        emoji: '📷', likes: 156, comments: 24,
        tags: ['kamera', 'dji', 'vlog', 'creators'], trending: true, addedBy: 'u6'
    },
    {
        id: 'p26', name: 'Apple iPhone 17 Pro Max 512 GB:ProMotion teknolojisine sahip 6.9 inç ekran, A19 Pro Çip, Bir iPhone’da Şimdiye Kadarki En İyi Pil Ömrü, Pro Fusion Kamera Sistemi, Center Stage Ön Kamera;Kozmik Turuncu', brand: 'Apple', category: 'tech',
        price: 136499.00, currency: '₺', url: 'https://www.amazon.com.tr/Apple-iPhone-Pro-Max-teknolojisine/dp/B0FQFJF2DP/ref=sr_1_1_sspa?crid=232IDFL2GHVVL&dib=eyJ2IjoiMSJ9.f8FGj1BXNT2zcX_L8g2OAShRmM0OSp_7h4-NutLFKxIk6IQnkOXRnRD90p8kezsuL6dtXUkpmhLWytsGG7CCDwTy5IKJP8x8lY5aMuaSKsOWTDllmaApaspgM1F5nrdeOWPiRVQcv1jlzWak1ZVTR-zcUkzmt_cVHAG8KcSvMUPhwskALL6Ad87N5R2pD2DnRdLMTg3GKF4z_C2urPJqFbbKiBXO7RYSPZBG30QS8wQJF0Sg1MxeBIRxfmbkfIhBDWK2X5r7Pmlk4yXg7PQc961DBPvCGz8W_1uuoq5RPRY.CUBhjXkUeNNAFL6nnR5lOAMzTZrZl0rqKENN_kA2JA4&dib_tag=se&keywords=iphone%2B17%2Bpro%2Bmax&qid=1778505623&sprefix=iphone%2B%2Caps%2C220&sr=8-1-spons&aref=JPqQMSinUO&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&th=1',
        image: 'assets/iphone17_orange.png',
        emoji: '📱', likes: 890, comments: 45,
        tags: ['iphone', 'apple', 'smartphone', 'orange'], trending: true, addedBy: 'u6'
    },
    {
        id: 'p27', name: 'Apple MacBook Pro Laptop: M5 Pro çip, 18 CPU ve 20 GPU’ya sahip: Yapay zeka için tasarlandı, 14.2 inç Liquid Retina XDR Ekran, 24GB Birleşik Bellek, 2 TB SSD Depolama; Gümüş Rengi', brand: 'Apple', category: 'tech',
        price: 159999.00, currency: '₺', url: 'https://www.amazon.com.tr/Apple-MacBook-Pro-Laptop-tasarland%C4%B1/dp/B0GR1DPDPR/ref=sr_1_3_sspa?crid=1R6OGE9BBKRCQ&dib=eyJ2IjoiMSJ9.8wQU89aABPVYqcV4Uf7QymkybcMFqo1g9ozatUUtDytCtVHK0uHq-aFPPss09G8VBxC3o6wWc3fMS6yfciAlgAUaWz62FD8vPM9D9jVBekUoAbdvmx7Yg2MMMSUX0xvsIeEwuZ6dYFzjyAo3FkPK-k1kuS5dO32XOu9QuDZ6jBEovfqU5sZ322246nLRgHphWyG_d_mkevgbJnkDqULiJc4eh2VqsIInjJuadVENxzvh_wkCYhpN9g5Qu5NPMqydkidCylVA3BKkkzR3YQkJaDR-ZOCh3-q8gPLO1Z6pNhw.GfIRg2odK8Rqldi4_d051xUCoqKTIyqEFS6RhJYd4mg&dib_tag=se&keywords=macbook+pro+m5&qid=1778505762&sprefix=mac%2Caps%2C223&sr=8-3-spons&aref=OJ3ycZda50&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&psc=1',
        image: 'assets/macbook_m5.png',
        emoji: '💻', likes: 1240, comments: 89,
        tags: ['macbook', 'apple', 'laptop', 'pro', 'm5'], trending: true, addedBy: 'u6'
    },
    {
        id: 'p28', name: 'Philips 5500 Serisi LatteGo Tam Otomatik Espresso Makinesi 20 Sıcak ve Soğuk İçecek, Renkli Dokunmatik Ekran, Beyaz Roze Renk, QuickStart, SilentBrew Teknolojisi (EP5543/80)', brand: 'Philips', category: 'home',
        price: 25554.00, currency: '₺', url: 'https://www.amazon.com.tr/EP5543-80-SilentBrew-Teknolojisi-%C3%87ekirdeklerden/dp/B0CZ7BV85B/ref=sr_1_1_sspa?crid=363F8MUX20ZYU&dib=eyJ2IjoiMSJ9.laM5th05pYaohdBPcl8u4PZt5owlTgjfgSkyutnm-P-2WhxnbtO3mAztisu_Otq_wUxp14iNr1Xl5l5l_T-7ntTAgCQLa8lWOLEMTpDrJJ6p5LYUvEMWvQ2gd_2siT_CVI-F5kBp2odveZz7DGbGo6JGxq0jFEB-dUOLAIHN_iTpLObT8DAUHCt6NJ6bZ6BleqEKtyYKhqASsa49lofW65q1ms79dxdJle4VUDON-mM9hvK5nUswO0XOVzHnFEgKT0j3fRI9cS9CMZWaE0-lWkiPPN_PgHpK8rANFMSCDQc.xGtMKue8zotRqWQySahi1mPFEiknNsYAPgnC7QGcOvw&dib_tag=se&keywords=philips%2Bkahve%2Bmakinesi&qid=1778506004&sprefix=philip%2Caps%2C158&sr=8-1-spons&aref=aMQvjj5kE0&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&th=1',
        image: 'assets/espresso_machine.png',
        emoji: '☕', likes: 540, comments: 42,
        tags: ['kahve', 'philips', 'espresso', 'kitchen'], trending: true, addedBy: 'u6'
    },
    {
        id: 'p29', name: 'Sevimli Termal Yazıcı, HD Görüntülü Baskı Kalitesi, Ders Notu ve Resim Çıkarılabilir, Bluetooth Bağlantısı İle App Kullanımı, Uzun Şarj Ömrü, Çocuklar ve Yetişkinler İçin Mini Termal Etiket Yazıcısı', brand: 'Generic', category: 'tech',
        price: 2841.82, currency: '₺', url: 'https://www.amazon.com.tr/G%C3%B6r%C3%BCnt%C3%BCl%C3%BC-%C3%87%C4%B1kar%C4%B1labilir-Bluetooth-Ba%C4%9Flant%C4%B1s%C4%B1-Yeti%C5%9Fkinler/dp/B0FMG1DX7X/ref=sr_1_22_sspa?__mk_tr_TR=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=24N80GRENZ1C3&dib=eyJ2IjoiMSJ9.aNcoQFpCHU-Ri9J-cIsKfxEJfviRK-3KjBYd2i6pAXphfBu3NEdHjQcecghn5FMRFVmQMQtmEtncGh-4uVOuwMnrkSANmmbOuuhE3hsSnGFXGxneu5wUuuSOifKNmv6sRCiH5wwd7dp93aBoPLjvRZsnrondnxezsRtkpXOCtXBk3r_u-nQZnufBzRB12CWsd5trFG_tfR4u6kU6N0Iemcosy4GjyJrywQRnoF_SysaAVM7kzpFgOrS-cbO5jSZ8T30yJj2CVyro6mk7SWMVm04yLAixQ3bHyfHbR-A7hjA.stcC1tXW28v_xrG2MqMOC2mEinQ9ljC9PEmOFi-jRfI&dib_tag=se&keywords=yaz%C4%B1c%C4%B1&qid=1778506361&sprefix=yaz%C4%B1c%C4%B1%2Caps%2C245&sr=8-22-spons&aref=4icC39qyuo&sp_csd=d2lkZ2V0TmFtZT1zcF9tdGY&psc=1',
        image: 'assets/thermal_printer.png',
        emoji: '🖨️', likes: 320, comments: 18,
        tags: ['yazıcı', 'mini', 'termal', 'hediye'], trending: true, addedBy: 'u6'
    },
    {
        id: 'p30', name: 'Teddy Kit - Dudak Makyaj Seti', brand: 'MAC', category: 'beauty',
        price: 2999.00, currency: '₺', url: 'https://www.maccosmetics.com.tr/makyaj/teddy-kit-dudak-makyaj-seti-2883/?_gl=1*217ecj*_up*MQ..*_gs*MQ..&gclid=Cj0KCQjw_IXQBhCkARIsADqELbKNQyyvfPHmokAV-uNHbpovG-gWbAhvGql2vt3AJTou2dHmUDN3fDwaAicHEALw_wcB&gbraid=0AAAAADr-Y4aEHqSQDpA7RFLec0bmnrL_r',
        image: 'assets/mac_teddy_kit.png',
        emoji: '💋', likes: 678, comments: 52,
        tags: ['makyaj', 'mac', 'ruj', 'dudak'], trending: true, addedBy: 'u1'
    },
    {
        id: 'p31', name: 'Baccarat Rouge 540 Extrait De Parfum 70 ml', brand: 'Maison Francis Kurkdjian', category: 'beauty',
        price: 24750.00, currency: '₺', url: 'https://www.beymen.com/tr/p_maison-francis-kurkdjian-baccarat-rouge-540-extrait-de-parfum-70-ml_330524?srsltid=AfmBOoqsiE6zLP4eNKqitK8KZfJ-IFEBEWxPc7aqccpIrMXMkUjDXThf',
        image: 'assets/baccarat_rouge.png',
        emoji: '✨', likes: 1250, comments: 84,
        tags: ['parfüm', 'lüks', 'baccarat', 'koku'], trending: true, addedBy: 'u1'
    },
    {
        id: 'p32', name: 'Yaşlanma Karşıtı Gündüz Bakım Seti-Gündüz Kremi 50 ml&Gündüz Serumu 30 ml&Göz Kremi 15ml&AHA Losyon 122ml', brand: 'Yves Rocher', category: 'beauty',
        price: 5590.00, currency: '₺', url: 'https://www.yvesrocher.com.tr/setler/yaslanma-karsiti-gunduz-bakim-seti-gunduz-kremi-50-mletgunduz-serumu-30-mletgoz-kremi-15mletaha-losyon-122ml/p/9917026',
        image: 'assets/yves_rocher_set.png',
        emoji: '🌿', likes: 890, comments: 64,
        tags: ['cilt bakım', 'yves rocher', 'anti-aging', 'serum'], trending: true, addedBy: 'u1'
    },
    {
        id: 'p33', name: 'Dyson Airwrap i.d.™ saç şekillendirme ve kurutma seti (Prusya mavisi/Parlak bakır)', brand: 'Dyson', category: 'tech',
        price: 27999.00, currency: '₺', url: 'https://www.dyson.com.tr/products/hair-care/sac-sekillendiriciler/airwrap-id-multi-styler-dryer-straight-wavy-prussian-blue-rich-copper',
        image: 'assets/dyson_airwrap.png',
        emoji: '💇‍♀️', likes: 2150, comments: 134,
        tags: ['dyson', 'saç', 'airwrap', 'teknoloji'], trending: true, addedBy: 'u6'
    },
    {
        id: 'p34', name: 'BRAUN AIO 7540 Hepsi Bir Arada Series 7 11 i 1 Arada Tıraş Kiti', brand: 'Braun', category: 'beauty',
        price: 2999.00, currency: '₺', url: 'https://www.mediamarkt.com.tr/tr/product/_braun-aio-7540-hepsi-bir-arada-series-7-11-i-1-arada-tiras-kiti-1248242.html?utm_source=new%20owned&utm_medium=ema-other%20email&utm_term=webshare&utm_campaign=webshare',
        image: 'assets/braun_shaver.png',
        emoji: '🪒', likes: 120, comments: 14,
        tags: ['bakım', 'tıraş', 'braun', 'erkek'], trending: true, addedBy: 'u7'
    },
    {
        id: 'p35', name: 'JEAN PAUL GAULTIER Le Beau Le Parfum - Eau de Parfum', brand: 'JEAN PAUL GAULTIER', category: 'beauty',
        price: 5985.00, currency: '₺', url: 'https://www.sephora.com.tr/p/jpg-le-beau---eau-de-parfum-P10024513.html',
        image: 'assets/le_beau_parfum.png',
        emoji: '🌿', likes: 890, comments: 45,
        tags: ['parfüm', 'jean paul gaultier', 'le beau', 'erkek'], trending: true, addedBy: 'u7'
    },
    {
        id: 'p36', name: 'Bois de Sauge - Saç ve Vücut Şampuanı Odunsu, Aromatik ve Ferah… 200 ml', brand: 'Yves Rocher', category: 'beauty',
        price: 645.00, currency: '₺', url: 'https://www.yvesrocher.com.tr/sac/erkek-sac-bakimi/erkek-sampuan/bois-de-sauge-sac-ve-vucut-sampuani/p/24873',
        image: 'assets/sampuan.webp',
        emoji: '🌿', likes: 145, comments: 12,
        tags: ['şampuan', 'yves rocher', 'saç bakım', 'erkek'], trending: true, addedBy: 'u7'
    },
    {
        id: 'p37', name: 'DIOR Sauvage Spray deodorant', brand: 'Dior', category: 'beauty',
        price: 2545.00, currency: '₺', url: 'https://www.sephora.com.tr/p/sauvage-spray-deodorant-P2290002.html',
        image: 'assets/deodorantpng.avif',
        emoji: '💨', likes: 532, comments: 28,
        tags: ['bakım', 'deodorant', 'dior', 'sauvage', 'erkek'], trending: true, addedBy: 'u7'
    },
    {
        id: 'p38', name: 'Erkek Bakım Seti', brand: 'L\'Alivé Natural', category: 'beauty',
        price: 3900.00, currency: '₺', url: 'https://lalivenatural.com/products/erkek-bakim-seti?variant=52305211064638&country=TR&currency=TRY&utm_medium=product_sync&utm_source=google&utm_content=sag_organic&utm_campaign=sag_organic&srsltid=AfmBOorArf0F3A5MlyetlfOx36QcKAZ5Znvtnp6wRTw44VfEKuQr3N-dsMc',
        image: 'assets/lalpng.webp',
        emoji: '🧔', likes: 245, comments: 12,
        tags: ['bakım', 'set', 'doğal', 'erkek'], trending: true, addedBy: 'u7'
    },
    {
        id: 'p39', name: 'ABSTRACT MAN SİYAH BİBLO 10X24X36CM', brand: 'Mudo', category: 'home',
        price: 3490.00, currency: '₺', url: 'https://www.mudo.com.tr/abstract-man-siyah-biblo-10x24x36cm-renksiz/',
        image: 'assets/heykelpng.jpg',
        emoji: '🗿', likes: 156, comments: 12,
        tags: ['biblo', 'dekorasyon', 'heykel', 'siyah'], trending: true, addedBy: 'u3'
    },
    {
        id: 'p40', name: 'LAMBA | USB ŞARJLI SPOT MASA LAMBASI', brand: 'Zara Home', category: 'home',
        price: 2490.00, currency: '₺', url: 'https://www.zarahome.com/tr/lamba--usb-sarjli-spot-masa-lambasi-l44321047?ct=true&style=1&categoryId=1020416307&pelement=512564278&colorId=712',
        image: 'assets/lambapng.webp',
        emoji: '💡', likes: 312, comments: 18,
        tags: ['lamba', 'dekorasyon', 'masa lambası', 'aydınlatma'], trending: true, addedBy: 'u3'
    },
    {
        id: 'p41', name: 'Liveup LS3243 Yoga Seti', brand: 'Liveup', category: 'sports',
        price: 2413.90, currency: '₺', url: 'https://www.hepsiburada.com/liveup-ls3243-yoga-seti-p-HBV00000VBQ4P?magaza=Uzayspor',
        image: 'assets/yogapng.webp',
        emoji: '🧘', likes: 189, comments: 14,
        tags: ['yoga', 'spor', 'set', 'fitness'], trending: true, addedBy: 'u3'
    },
    {
        id: 'p42', name: 'LCW HOME Karışık Çiçek Figürlü 2 Kişilik Porselen Kahve Fincan Takımı 90 Ml', brand: 'LCW HOME', category: 'home',
        price: 799.99, currency: '₺', url: 'https://www.lcw.com/cicek-figurlu-2-kisilik-porselen-kahve-fincan-takimi-90-ml-karisik-o-5062913',
        image: 'assets/bardak.webp',
        imageStyle: 'object-fit: contain; padding: 10px;',
        emoji: '☕', likes: 212, comments: 15,
        tags: ['kahve', 'fincan', 'dekorasyon', 'home'], trending: true, addedBy: 'u3'
    },
    {
        id: 'p43', name: 'Karaca Çaysever Robotea Pro Connect 4 in 1 Konuşan Cam Çay Makinesi Silver', brand: 'Karaca', category: 'home',
        price: 9999.00, currency: '₺', url: 'https://www.karaca.com/urun/karaca-caysever-robotea-pro-connect-4-in-1-konusan-otomatik-cam-cay-makinesi-su-isitici-ve-filtre-kahve-demleme-makinesi-2500w-si',
        image: 'assets/makine.png',
        emoji: '🫖', likes: 345, comments: 24,
        tags: ['çay makinesi', 'karaca', 'mutfak', 'elektronik'], trending: true, addedBy: 'u3'
    },
    {
        id: 'p44', name: 'Twigy Ekose Erkek Ev Terliği Lacivert', brand: 'Twigy', category: 'home',
        price: 799.90, currency: '₺', url: 'https://www.twigy.com/ekose-erkek-ev-terligi-lacivert-41-46/?_sgm_campaign=scn_e2c5e9d790000&_sgm_source=AA0552&_sgm_action=click',
        image: 'assets/terlik.png',
        imageStyle: 'object-fit: contain; padding: 10px;',
        emoji: '👟', likes: 124, comments: 8,
        tags: ['terlik', 'ev giyim', 'twigy', 'erkek'], trending: true, addedBy: 'u8'
    },
    {
        id: 'p45', name: 'LG MR11 Ev Sinema Sistemi, 2300W, 4.2 Kanal Ses', brand: 'LG', category: 'home',
        price: 44900.00, currency: '₺', url: 'https://www.lg.com/tr/hoparlor/ev-sinema-sistemleri/mr11-s94p2/',
        image: 'assets/lp.png',
        emoji: '🔊', likes: 212, comments: 18,
        tags: ['sinema sistemi', 'lg', 'ses sistemi', 'home theater'], trending: true, addedBy: 'u8'
    },
    {
        id: 'p46', name: 'Govee Envisual Led 3 Lite TV Arkası Led Şerit Ambiyans Aydınlatma Tv Renk Senkronizasyonu 40-50 inc', brand: 'Govee', category: 'home',
        price: 4899.00, currency: '₺', url: 'https://www.trendyol.com/govee/envisual-led-3-lite-tv-arkasi-led-serit-ambiyans-aydinlatma-tv-renk-senkronizasyonu-40-50-inc-p-873705514?boutiqueId=61&merchantId=468753&storefrontId=1&countryCode=TR&language=tr&gads=true',
        image: 'assets/tv.png',
        imageStyle: 'object-fit: contain; padding: 10px;',
        emoji: '🌈', likes: 178, comments: 12,
        tags: ['led şerit', 'govee', 'ambiyans', 'aydınlatma'], trending: true, addedBy: 'u8'
    },
    {
        id: 'p47', name: 'Aydın Sport Dambıl 68 kg Z Bar Halter Seti ve Dambıl Seti', brand: 'Aydın Sport', category: 'sports',
        price: 2399.00, currency: '₺', url: 'https://www.hepsiburada.com/dambil-68-kg-z-bar-halter-seti-ve-dambil-seti-p-HBV00001AH7KM?magaza=Reyonda',
        image: 'assets/dambil.png',
        emoji: '🏋️', likes: 145, comments: 9,
        tags: ['dambıl', 'spor', 'fitness', 'halter'], trending: true, addedBy: 'u8'
    },
    {
        id: 'p48', name: 'Diamond Select Toys Marvel Gallery Comic Iron Man PVC Heykel (Jun212282) Çok Renkli Standart', brand: 'Diamond Select Toys', category: 'home',
        price: 3999.00, currency: '₺', url: 'https://www.amazon.com.tr/Diamond-Select-Gallery-Jun212282-Standart/dp/B095L5WF99',
        image: 'assets/ironman.png',
        imageStyle: 'object-fit: contain; padding: 10px;',
        emoji: '🤖', likes: 256, comments: 14,
        tags: ['marvel', 'iron man', 'heykel', 'koleksiyon'], trending: true, addedBy: 'u8'
    },
    {
        id: 'p49', name: 'DOMYOS Mini Stepper - MS500', brand: 'Domyos', category: 'sports',
        price: 3890.00, currency: '₺', url: 'https://www.decathlon.com.tr/p/mini-stepper-ms500/_/R-p-338157?mc=8734775',
        image: 'assets/mini-stepper-ms500.png',
        imageStyle: 'object-fit: contain; padding: 10px;',
        emoji: '👟', likes: 89, comments: 4,
        tags: ['stepper', 'spor', 'evde spor', 'decathlon'], trending: true, addedBy: 'u9'
    },
    {
        id: 'p50', name: 'Dynamic R102 Eliptik Bisiklet Ayakta Ve Oturarak Kullanılabilir Orbitroller Orbitrack', brand: 'Dynamic', category: 'sports',
        price: 7090.00, currency: '₺', url: 'https://www.trendyol.com/dynamic/r102-eliptik-bisiklet-ayakta-ve-oturarak-kullanilabilir-orbitroller-orbitrack-p-86025623?boutiqueId=61&merchantId=174815&gads=true',
        image: 'assets/spor_v2.webp',
        imageStyle: 'object-fit: contain; padding: 10px;',
        emoji: '🚴‍♀️', likes: 112, comments: 7,
        tags: ['eliptik bisiklet', 'dynamic', 'evde spor', 'kardiyo'], trending: true, addedBy: 'u9'
    },
    {
        id: 'p51', name: '5 mm Yoga Minderi', brand: 'Oysho', category: 'sports',
        price: 1990.00, currency: '₺', url: 'https://www.oysho.com/tr/5-mm-yoga-minderi-l14172680?colorId=098&pelement=209041618&categoryId=1010822127',
        image: 'assets/yoga.png',
        imageStyle: 'object-fit: contain; padding: 10px;',
        emoji: '🧘‍♀️', likes: 132, comments: 6,
        tags: ['yoga', 'mat', 'spor', 'oysho'], trending: true, addedBy: 'u9'
    },
    {
        id: 'p52', name: 'AURA SİYAH TULUM', brand: 'Dossha', category: 'sports',
        price: 2712.90, currency: '₺', url: 'https://dossha.com/products/aura-siyah-tulum?_sgm_campaign=fcs_cfbe41df44000&_sgm_source=8731826192538%7Cproduct&_sgm_action=search&_sgm_term=aura&_sgm_pinned=false',
        image: 'assets/tayt.png',
        emoji: '🖤', likes: 167, comments: 12,
        tags: ['tulum', 'spor giyim', 'fitness', 'dossha'], trending: true, addedBy: 'u9'
    },
    {
        id: 'p53', name: 'PSSPOR 2 Adet 3KG Pembe Renk Dambıl Seti (2 Adet 3KG Gönderim Yapılmaktadır)', brand: 'PSSPOR', category: 'sports',
        price: 349.00, currency: '₺', url: 'https://www.amazon.com.tr/PSSPOR-Pembe-Damb%C4%B1l-G%C3%B6nderim-Yap%C4%B1lmaktad%C4%B1r/dp/B0FRT167D3?source=ps-sl-shoppingads-lpcontext&ref_=fplfs&psc=1&smid=A3NHJHKADPZM5Y',
        image: 'assets/2png.jpg',
        emoji: '💓', likes: 112, comments: 5,
        tags: ['dambıl', 'pembe', 'evde spor', 'fitness'], trending: true, addedBy: 'u9'
    },
    {
        id: 'p54', name: 'Liveup LS3163B Kapı-Koridor Barfiksi 120 Cm', brand: 'Liveup', category: 'sports',
        price: 1120.90, currency: '₺', url: 'https://www.decathlon.com.tr/p/mp/liveup/liveup-ls3163b-kapi-koridor-barfiksi-120-cm/_/R-p-ac67eb2b-d12a-44e7-baf5-fc2edd4532f0?mc=ac67eb2b-d12a-44e7-baf5-fc2edd4532f0_novar',
        image: 'assets/bpng.avif',
        emoji: '💪', likes: 134, comments: 6,
        tags: ['barfiks', 'fitness', 'spor', 'liveup'], trending: true, addedBy: 'u10'
    },
    {
        id: 'p55', name: 'ECG Ecgspor 30 kg (2x15 kg) Dambıl Seti ve Ağırlık Seti Vücut Geliştirme Aleti', brand: 'ECG Ecgspor', category: 'sports',
        price: 1499.23, currency: '₺', url: 'https://www.amazon.com.tr/ECG-Ecgspor-Damb%C4%B1l-A%C4%9F%C4%B1rl%C4%B1k-Geli%C5%9Ftirme/dp/B0DJGW446D/ref=lp_13486987031_1_1?pf_rd_p=cc6cc80f-b75c-447d-b915-0b5bcd09dfd2&pf_rd_r=3PCEFM1GJBEAVRQCM95Q&sbo=RZvfv%2F%2FHxDF%2BO5021pAnSA%3D%3D',
        image: 'assets/dpng.jpg',
        imageStyle: 'object-fit: contain; padding: 10px;',
        emoji: '🏋️‍♂️', likes: 189, comments: 12,
        tags: ['dambıl', 'vücut geliştirme', 'ağırlık seti', 'fitness'], trending: true, addedBy: 'u10'
    },
    {
        id: 'p56', name: 'Nike Reversible Yoga Mat 4 mm Kahverengi', brand: 'Nike', category: 'sports',
        price: 1989.00, currency: '₺', url: 'https://www.fitmoda.com/urun/nike-reversible-yoga-mat-4-mm-kahverengi-22840',
        image: 'assets/mat.png',
        imageStyle: 'object-fit: contain; padding: 10px;',
        emoji: '🧘‍♂️', likes: 112, comments: 4,
        tags: ['yoga matı', 'nike', 'spor', 'antrenman'], trending: true, addedBy: 'u10'
    },
    {
        id: 'p57', name: 'Basketbol Topu - 6 Numara - Kahverengi - Control Club BT100', brand: 'Control Club', category: 'sports',
        price: 720.00, currency: '₺', url: 'https://www.decathlon.com.tr/p/basketbol-topu-6-numara-kahverengi-control-club-bt100/_/R-p-333364?mc=8648075',
        image: 'assets/top.png',
        imageStyle: 'object-fit: contain; padding: 10px;',
        emoji: '🏀', likes: 156, comments: 8,
        tags: ['basketbol', 'top', 'spor', 'decathlon'], trending: true, addedBy: 'u10'
    },
    {
        id: 'p58', name: 'Klasik Futbol Kalesi - 180 cm × 120 cm - M Boy - Gri - 500', brand: 'Kipsta', category: 'sports',
        price: 4250.00, currency: '₺', url: 'https://www.decathlon.com.tr/p/klasik-futbol-kalesi-180-cm-120-cm-m-boy-gri-500/_/R-p-348622?mc=8916936&c=S%C4%B0YAH_GR%C4%B0',
        image: 'assets/kale.png',
        imageStyle: 'object-fit: contain; padding: 10px;',
        emoji: '🥅', likes: 142, comments: 5,
        tags: ['futbol', 'kale', 'spor', 'decathlon'], trending: true, addedBy: 'u10'
    },
    {
        id: 'p59', name: 'Percy Jackson and the Olympians 5 Book Paperback Boxed Set (w/poster): 1-5', brand: 'Disney Hyperion', category: 'books',
        price: 1911.43, currency: '₺', url: 'https://www.amazon.com.tr/Percy-Jackson-Olympians-Paperback-poster/dp/1368098045?source=ps-sl-shoppingads-lpcontext&ref_=fplfs&psc=1&smid=A1UNQM1SR2CHM',
        image: 'assets/k.png',
        imageStyle: 'object-fit: contain; padding: 10px;',
        emoji: '📚', likes: 210, comments: 15,
        tags: ['kitap', 'percy jackson', 'fantastik', 'set'], trending: true, addedBy: 'u11'
    },
    {
        id: 'p60', name: 'Harry Potter (Kutulu Set - 7 Kitap Takım)', brand: 'Yapı Kredi Yayınları', category: 'books',
        price: 2156.97, currency: '₺', url: 'https://www.amazon.com.tr/Harry-Potter-Seti-7-Kitap-Rowling/dp/9750843878?source=ps-sl-shoppingads-lpcontext&ref_=fplfs&psc=1&smid=A1SSX2339AN748',
        image: 'assets/harry.png',
        imageStyle: 'object-fit: contain; padding: 10px;',
        emoji: '⚡', likes: 289, comments: 24,
        tags: ['kitap', 'harry potter', 'fantastik', 'set'], trending: true, addedBy: 'u11'
    },
    {
        id: 'p61', name: 'Ben, Kirke', brand: 'İthaki Yayınları', category: 'books',
        price: 192.30, currency: '₺', url: 'https://www.kitapyurdu.com/kitap/ben-kirke/512225.html?srsltid=AfmBOop4j5ncdXfciD58RMuWaR76vN6fVszgjsu-4GQZjSbWM3fFTfG7',
        image: 'assets/kirke.png',
        imageStyle: 'object-fit: contain; padding: 10px;',
        emoji: '🏺', likes: 145, comments: 9,
        tags: ['kitap', 'mitoloji', 'edebiyat', 'ithaki'], trending: true, addedBy: 'u11'
    },
    {
        id: 'p62', name: 'Dikenler ve Güller Sarayı', brand: 'Dex Yayınevi', category: 'books',
        price: 448.00, currency: '₺', url: 'https://www.bkmkitap.com/dikenler-ve-guller-sarayi?gad_source=4&gad_campaignid=23828711231&gbraid=0AAAAAC36Jl-UlKVnfa74it-gN3b7fe7CB&gclid=Cj0KCQjw_IXQBhCkARIsADqELbIXgDDxuSyX8nett1Bzl1C6WnM7fqqYMOiAewl-AiJwmBb0Q-5sFaEaAp7vEALw_wcB',
        image: 'assets/gul.png',
        imageStyle: 'object-fit: contain; padding: 10px;',
        emoji: '🌹', likes: 198, comments: 11,
        tags: ['kitap', 'romantik fantastik', 'sarah j maas', 'dex'], trending: true, addedBy: 'u11'
    },
    {
        id: 'p63', name: 'Game Of Thrones - Taht Oyunları (9 Kitap Set)', brand: 'Epsilon Yayınevi', category: 'books',
        price: 3880.00, currency: '₺', url: 'https://www.amazon.com.tr/Game-Thrones-Oyunlar%C4%B1-Kitap-Kutulu/dp/9990010013/ref=sr_1_1_sspa?adgrpid=120118672036&dib=eyJ2IjoiMSJ9.YrPZstBhfgo1M9X_shvTHRiWxndph7kWibCNDUHH-U9DRSaNcdnbszlJj4vI-cWBB2yuidUqJc-RnF6sQvsJOHKsBDBHD74woE61PFYRyMZqWrtO2WJDNjmf-oj9VlF5kOkzy-rXk6PVDfBJVQTPiUUdnyJhfAlDWNJJmP6b8iM4dFEpexBJlueCXc8cT1mTnuO58zOwApkVxXfLvPMnDFYkfLZjhxrzf4d9SeZZylE.zbz9zteEBUlxBFJfw3M9Z1hyyrkmGub8HCjKebEdLN0&dib_tag=se&gad_source=4&hvadid=738524247057&hvdev=c&hvexpln=0&hvlocphy=1012782&hvnetw=g&hvocijid=8124443301220290385--&hvqmt=b&hvrand=8124443301220290385&hvtargid=kwd-296750962773&hydadcr=20362_2353342&keywords=taht+oyunlar%C4%B1+kitap+serisi&mcid=ce831f5a72133b2cb0e1ee29db6b6e7c&qid=1778517435&sr=8-1-spons&aref=DvXEz7BPu4&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&psc=1',
        image: 'assets/taht.png',
        imageStyle: 'object-fit: contain; padding: 10px;',
        emoji: '👑', likes: 342, comments: 28,
        tags: ['kitap', 'game of thrones', 'fantastik', 'set'], trending: true, addedBy: 'u11'
    },
    {
        id: 'p64', name: 'Sosyal Medya ve Aktif Kullanıcı - Sadettin Demirel', brand: 'Eğitim Yayınevi', category: 'books',
        price: 360.36, currency: '₺', url: 'https://www.egitimyayinevi.com/sosyal-medya-ve-aktif-kullanici',
        image: 'assets/1.png',
        imageStyle: 'object-fit: contain; padding: 10px;',
        emoji: '💻', likes: 112, comments: 4,
        tags: ['kitap', 'sosyal medya', 'eğitim', 'dijital'], trending: true, addedBy: 'u12'
    },
    {
        id: 'p65', name: 'DİJİTAL KALE', brand: 'Altın Kitaplar', category: 'books',
        price: 448.00, currency: '₺', url: 'https://www.abccadde.com/detay/dijital-kale-9789752112438?srsltid=AfmBOor999xOAsDzpn-3N3d5A6R09M4HrPpB_QkSydj1u7GjyY-uWuJLDEY',
        image: 'assets/2.png',
        imageStyle: 'object-fit: contain; padding: 10px;',
        emoji: '🔓', likes: 165, comments: 8,
        tags: ['kitap', 'dijital kale', 'dan brown', 'macera'], trending: true, addedBy: 'u12'
    },
    {
        id: 'p66', name: 'Benim Gibi Makineler - Ian McEwan', brand: 'Yapı Kredi Yayınları', category: 'books',
        price: 260.00, currency: '₺', url: 'https://www.bkmkitap.com/benim-gibi-makineler?srsltid=AfmBOopB3uaeH7wZ3HCiz6rxcI88S7Pfe7n1xUM3AAgrK9efWUW5mo7I-M4',
        image: 'assets/3.png',
        imageStyle: 'object-fit: contain; padding: 10px;',
        emoji: '🤖', likes: 85, comments: 4,
        tags: ['kitap', 'ian mcewan', 'yapı kredi', 'roman'], trending: true, addedBy: 'u12'
    },
    {
        id: 'p67', name: 'Dijital Çağda Habercilik - Aysel Çetinkaya', brand: 'Der Yayınları', category: 'books',
        price: 469.20, currency: '₺', url: 'https://www.bkmkitap.com/dijital-cagda-habercilik?waw_keyword=dijita&_gl=1*ib2srr*_gcl_aw*R0NMLjE3Nzg1MTczMDcuQ2owS0NRandfSVhRQmhDa0FSSXNBRHFFTGJJWGdERHh1U3lYOG5ldHQxQnpsMUM2V25NN2ZxcVlNT2lBZXdsLUFpSndtQmIwUS01c0ZhRWFBcDd2RUFMd193Y0I.*_gcl_au*OTU0OTI0MjU0LjE3Nzg1MTczMDg.',
        image: 'assets/4.png',
        imageStyle: 'object-fit: contain; padding: 10px;',
        emoji: '📰', likes: 54, comments: 2,
        tags: ['kitap', 'habercilik', 'dijital çağ', 'aysel çetinkaya'], trending: true, addedBy: 'u12'
    },
    {
        id: 'p68', name: 'Influencer: Sosyal Medya Çağında Marka Yaratmak - Brittany Hennessy', brand: 'Nova Kitap', category: 'books',
        price: 130.00, currency: '₺', url: 'https://www.bkmkitap.com/influencer?waw_keyword=sosyal%20medya&_gl=1*1tz8zxo*_gcl_aw*R0NMLjE3Nzg1MTczMDcuQ2owS0NRandfSVhRQmhDa0FSSXNBRHFFTGJJWGdERHh1U3lYOG5ldHQxQnpsMUM2V25NN2ZxcVlNT2lBZXdsLUFpSndtQmIwUS01c0ZhRWFBcDd2RUFMd193Y0I.*_gcl_au*OTU0OTI0MjU0LjE3Nzg1MTczMDg.',
        image: 'assets/5.png',
        imageStyle: 'object-fit: contain; padding: 10px;',
        emoji: '🌟', likes: 112, comments: 8,
        tags: ['kitap', 'influencer', 'sosyal medya', 'pazarlama'], trending: true, addedBy: 'u12'
    },
    {
        id: 'p69', name: 'Kiwi Kpf-10570 Kameralı Akıllı Hayvan Besleyici', brand: 'Kiwi', category: 'pets',
        price: 2199.00, currency: '₺', url: 'https://www.sokmarket.com.tr/kiwi-kpf-10570-kamerali-akilli-hayvan-besleyici-p-511688?srsltid=AfmBOooUYPV700Jvu3qDdArRC4ySqRgmRhv4PTVqcAFD-zbsMzFcL6HbBJg',
        image: 'assets/6.png',
        imageStyle: 'object-fit: contain; padding: 10px;',
        emoji: '🐱', likes: 145, comments: 12,
        tags: ['evcil hayvan', 'akıllı besleyici', 'kamera', 'kiwi'], trending: true, addedBy: 'u13'
    },
    {
        id: 'p70', name: 'Gigi Panda Evcil Hayvan Tüy Alma Tarağı', brand: 'Gigi Panda', category: 'pets',
        price: 212.99, currency: '₺', url: 'https://www.tuhafiyecimiz.com/products/gigi-panda-evcil-hayvan-tuy-alma-taragi-tek-tuslu-evcil-hayvan-tuy-alma-taragi-kopya?variant=49776335421760&country=TR&currency=TRY&utm_medium=product_sync&utm_source=google&utm_content=sag_organic&utm_campaign=sag_organic&srsltid=AfmBOorAmmx7Ch-dbxu-wlp6y2GXxtp93Oza03EJc4Gg-AUWKeK4IngpjF0',
        image: 'assets/7.png',
        imageStyle: 'object-fit: contain; padding: 10px;',
        emoji: '🐼', likes: 89, comments: 5,
        tags: ['evcil hayvan', 'tarak', 'tüy alma', 'gigi panda'], trending: true, addedBy: 'u13'
    },
    {
        id: 'p71', name: 'UTSADD Evcil Hayvan Yatağı - Açık Gri', brand: 'IKEA', category: 'pets',
        price: 799.00, currency: '₺', url: 'https://www.ikea.com.tr/urun/utsadd-acik-gri-45x10-cm-evcil-hayvan-yatagi-70570577',
        image: 'assets/8.png',
        imageStyle: 'object-fit: contain; padding: 10px;',
        emoji: '🛏️', likes: 67, comments: 3,
        tags: ['evcil hayvan', 'yatak', 'ikea', 'konfor'], trending: true, addedBy: 'u13'
    },
    {
        id: 'p72', name: 'Ice Pet Tekerlekli Çekçekli Kedi Köpek Taşıma Valizi', brand: 'Ice Pet', category: 'pets',
        price: 2549.00, currency: '₺', url: 'https://www.plmcase.com.tr/products/ice-pet-tekerlekli-cekcekli-kedi-kopek-tasima-valizi-42x44-x23-cm-pembe?variant=52334523449641&country=TR&currency=TRY&utm_medium=product_sync&utm_source=google&utm_content=sag_organic&utm_campaign=sag_organic&srsltid=AfmBOor_NW_JIi4zlxLHnsi1qevy6zViCIL5klZB3eemKjwUpVbylvK5moc',
        image: 'assets/kedi.png',
        imageStyle: 'object-fit: contain; padding: 10px;',
        emoji: '🐈', likes: 124, comments: 6,
        tags: ['evcil hayvan', 'valiz', 'taşıma', 'pembe'], trending: true, addedBy: 'u13'
    },
    {
        id: 'p73', name: 'Klerax Pet Evcil Hayvan Temizleme Mendili 40\'Lı', brand: 'Klerax Pet', category: 'pets',
        price: 68.99, currency: '₺', url: 'https://www.koctas.com.tr/klerax-pet-evcil-hayvan-temizleme-mendili-40li/p/1000786794?srsltid=AfmBOoooqN0LWVaOcvXbeJ3aB-dtqX5g7zxDZf5QL1RjxgoJyWzczRbX31A',
        image: 'assets/one.png',
        imageStyle: 'object-fit: contain; padding: 10px;',
        emoji: '🧼', likes: 42, comments: 1,
        tags: ['evcil hayvan', 'temizleme mendili', 'hijyen', 'klerax'], trending: true, addedBy: 'u13'
    },
    {
        id: 'p74', name: 'Neutron NTL-PG-05H Akıllı Evcil Hayvan Bakım Seti', brand: 'Neutron', category: 'pets',
        price: 4399.00, currency: '₺', url: 'https://www.a101.com.tr/ev-yasam/neutron-ntl-pg-05h-akilli-evcil-hayvan-bakim-seti_p-25007566?srsltid=AfmBOoqAtnt5BagSD4Z5hy2Py1bHra2ySp5teHFqUSz6_jGk5pQGw821tU0',
        image: 'assets/two.png',
        imageStyle: 'object-fit: contain; padding: 10px;',
        emoji: '✂️', likes: 78, comments: 4,
        tags: ['evcil hayvan', 'bakım seti', 'neutron', 'akıllı'], trending: true, addedBy: 'u14'
    },
    {
        id: 'p75', name: 'Petkit 5\'i 1 Arada Evcil Hayvan Tüy Bakım Seti', brand: 'Petkit', category: 'pets',
        price: 10999.95, currency: '₺', url: 'https://www.migros.com.tr/pet/petkit-5i-1-arada-evcil-hayvan-tuy-bakim-seti-p-272af23?srsltid=AfmBOooMTVmqNMf0eRpjZXvx6GVvbZSW1TnLcDy2bSuECikWXGFz-ts0kE8',
        image: 'assets/ee.png',
        imageStyle: 'object-fit: contain; padding: 10px;',
        emoji: '🐾', likes: 112, comments: 5,
        tags: ['evcil hayvan', 'bakım seti', 'petkit', 'tüy bakımı'], trending: true, addedBy: 'u14'
    },
    {
        id: 'p76', name: 'Royal Canin Yavru Kediler İçin Kuru Kedi Mama 4 Kg', brand: 'Royal Canin', category: 'pets',
        price: 1919.95, currency: '₺', url: 'https://www.migros.com.tr/pet/royal-canin-yavru-kediler-icin-kuru-kedi-mama-4-kg-p-280ba2a?srsltid=AfmBOooUHdR53DPXu6E4RvqVqvXNSY8Bo_ikKaJNN-Kte77ipwdgECVseMo',
        image: 'assets/oo.png',
        imageStyle: 'object-fit: contain; padding: 10px;',
        emoji: '🐈', likes: 156, comments: 12,
        tags: ['evcil hayvan', 'kedi maması', 'yavru kedi', 'royal canin'], trending: true, addedBy: 'u14'
    },
    {
        id: 'p77', name: 'Zekton Siyah El ve Sırt Çantası 2 Fileli Cep 9 Hava Kanallı Kedi Taşıma Çantası', brand: 'Zekton', category: 'pets',
        price: 525.00, currency: '₺', url: 'https://www.hepsiburada.com.tr/zekton-siyah-el-ve-sirt-cantasi-2-fileli-cep-9-hava-kanalli-kedi-tasima-cantasi-p-HBCV00004CMX36?magaza=G%C3%BCr%20Shop',
        image: 'assets/kedy.png',
        imageStyle: 'object-fit: contain; padding: 10px;',
        emoji: '🎒', likes: 45, comments: 2,
        tags: ['evcil hayvan', 'taşıma çantası', 'kedi', 'zekton'], trending: true, addedBy: 'u14'
    },
    {
        id: 'p78', name: 'FloriaShopping Airtag Kılıfı Silikon Tasmaya Uyumlu - Turuncu', brand: 'FloriaShopping', category: 'pets',
        price: 199.90, currency: '₺', url: 'https://www.amazon.com.tr/FloriaShopping-Silikon-Tasmaya-Turuncu-Standart/dp/B0D98965T6?source=ps-sl-shoppingads-lpcontext&ref_=fplfs&smid=A10ZHPTXHE5Z4&th=1',
        image: 'assets/kk.p.jpg',
        imageStyle: 'object-fit: contain; padding: 10px;',
        emoji: '🏷️', likes: 28, comments: 1,
        tags: ['evcil hayvan', 'tasmalı kılıf', 'airtag', 'turuncu'], trending: true, addedBy: 'u14'
    },
    {
        id: 'p79', name: 'Stanley The IceFlow Twist & Flip Termos Su Şişesi', brand: 'Stanley', category: 'home',
        price: 1279.21, currency: '₺', url: 'https://www.amazon.com.tr/Stanley-IceFlow-Twist-Termos-%C5%9Ei%C5%9Fesi/dp/B0FLDQYVTJ/ref=sr_1_1_sspa?adgrpid=126882668331&dib=eyJ2IjoiMSJ9.xFuQZ_2yygTxIb0oavkJGoSOn5fEhlQznDfuhMa-553KNWTUKrFrJ_W-70Ncmc9QndPqJvzfG-mQPMmh6gv-grRMskvbLws_6w0T2BPqf3EyB-sqQ8qSHWfk_Wwz_7mAJ9LXbIyDSCGtSvy-8Jb8fEsY-oufFmyzBkAUQe-pVpQJjSZw1Qh13dnL-xyuTr3XV6og6sUk3jzpeGMrOWAdSMKhrM8cJ74rBph_AG-ZQwDO1yrnsawqxdQt_hgUmns_8rP6UeiTUVPl_H9KjfTIUbtzvwLWZ50-G0Gg-oCgkx0.DFWMke01KpCU-up0_PysZFnEoL8vXqO37cGbv4o2oYs&dib_tag=se&gad_source=1&hvadid=545674606527&hvdev=c&hvexpln=0&hvlocphy=1012782&hvnetw=g&hvocijid=8077192973656602161--&hvqmt=b&hvrand=8077192973656602161&hvtargid=kwd-2439164134254&hydadcr=4911_2142382&keywords=stanley%2Bshaker%2Btermos&mcid=043238a8584f34e581fab359cbedecd2&qid=1778521448&sr=8-1-spons&aref=ByKAIDnzpp&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&th=1&psc=1',
        image: 'assets/stanley.png',
        imageStyle: 'object-fit: contain; padding: 10px;',
        emoji: '🥤', likes: 215, comments: 18,
        tags: ['termos', 'stanley', 'su şişesi', 'ev & yaşam'], trending: true, addedBy: 'u8'
    },
    {
        id: 'p80', name: 'ASUS Tuf Gaming F16 FX608JMR-RV066W Laptop', brand: 'ASUS', category: 'gaming',
        price: 75999.00, currency: '₺', url: 'https://www.mediamarkt.com.tr/tr/product/_asus-tuf-gaming-f16-fx608jmr-rv066wintelr-coretm-i7-14650hx16-gb-ram1-tb-ssdrtx-506016w11-laptop-1247805.html',
        image: 'assets/bil.png',
        imageStyle: 'object-fit: contain; padding: 10px;',
        emoji: '💻', likes: 245, comments: 15,
        tags: ['laptop', 'gaming', 'asus', 'tuf', 'rtx 5060'], trending: true, addedBy: 'u2'
    },
    {
        id: 'p81', name: 'TAKE 2 WWE 2K25 Standard Edition PS4 Oyun', brand: 'Take-Two', category: 'gaming',
        price: 1899.00, currency: '₺', url: 'https://www.mediamarkt.com.tr/tr/product/_take-2-wwe-2k25-standard-edition-ps4-oyun-1245799.html',
        image: 'assets/oyun.png',
        imageStyle: 'object-fit: contain; padding: 10px;',
        emoji: '🎮', likes: 189, comments: 12,
        tags: ['oyun', 'ps4', 'wwe', '2k25'], trending: true, addedBy: 'u2'
    },
    {
        id: 'p82', name: 'Nintendo Switch 2 Konsol Mario Kart World Paketi', brand: 'Nintendo', category: 'gaming',
        price: 44999.00, currency: '₺', url: 'https://www.google.com/search?sca_esv=43a6c5a008a39361&sxsrf=ANbL-n7jEt8eo_xsDq96vbvs8FHSdNb_1A:1778522299436&udm=28&fbs=ADc_l-Yk7dC9rTocjjwI5T_IO7ZXfwbLjiNybQex6G113dTgz6dQweFpCfeIUItUikyKQHqmOhL1CybajVKf8OCw5YhxRUHE7PK446UH1Rd7pryiH5fK9ara0F-0L57Dq3ofc76Yk-FvF7RfAj2Bju-Ronz7wcg_ij1FmTkV2jq9X3rqKWWWZ4OY5d2tBUzuSZNgm31w8La3KVBkJxe020JYbvSKd5M5_POBMhHk6t8MnaCeqmqF-l5YrOU2rpwkEq_O58zUAZxD&q=nintendo&ved=1t:220175&ictx=111&biw=1366&bih=599&dpr=1#sv=CAYS6QISABosMmFoVUtFd2o5M051QjZMR1VBeFhSQXRzRUhRUG9KcEVRZ2kxNkJBZ1FFQ1kihQIKEzk5ODEyMTA5NDQyNjE0MTYyMzkSFDEzMTYwMjU0NTMwOTU2OTc3NzgyGhM3NzQ2MjMzNzgyMjY1MTgzMDE5IhM0NDYyOTgzMjczMjA2NjQ5NDk0KgAyEzY4OTk5NDU1MDQyMjEzMTY2ODM6EjU3NjQ2Mjg4MTA3MDk2MDgxOEoCaGdSMlBDXzY4OTk5NDU1MDQyMjEzMTY2ODN8UFJPRF9QQ182ODk5OTQ1NTA0MjIxMzE2NjgzYgBqAIoBAKABA7ABAMIBAMoBANoBAOIBAOoBIk5pbnRlbmRvIFN3aXRjaCAyIE1hcmlvIEthcnQgV29ybGTwAQD6AQCSAgDaAgDiAgAwAEItMmFoVUtFd2o5M051QjZMR1VBeFhSQXRzRUhRUG9KcEVRcm9nR2VnUUlFQkFRIInNtLkJSggQAhgBIAEoAQ',
        image: 'assets/ni.png.jpg',
        imageStyle: 'object-fit: contain; padding: 10px;',
        emoji: '🎮', likes: 512, comments: 45,
        tags: ['nintendo', 'switch 2', 'konsol', 'mario kart'], trending: true, addedBy: 'u2'
    },
    {
        id: 'p83', name: 'Asus TUF Gaming K3 RGB Red Switch Mekanik Kablolu Gaming (Oyuncu) Klavye', brand: 'Asus', category: 'gaming',
        price: 3699.00, currency: '₺', url: 'https://www.amazon.com.tr/Gaming-Switch-Mekanik-Kablolu-Oyuncu/dp/B08WC8QBYB?source=ps-sl-shoppingads-lpcontext&ref_=fplfs&smid=A110F44TMPDYVA&th=1',
        image: 'assets/klavye.png.jpg',
        imageStyle: 'object-fit: contain; padding: 10px;',
        emoji: '⌨️', likes: 124, comments: 8,
        tags: ['klavye', 'gaming', 'asus', 'tuf', 'mekanik'], trending: true, addedBy: 'u2'
    },
    {
        id: 'p84', name: 'Razer BlackShark V3 Pro Beyaz PS5 Uyumlu Kablosuz Gaming Kulaklık', brand: 'Razer', category: 'gaming',
        price: 20139.00, currency: '₺', url: 'https://www.gaming.gen.tr/urun/824522/razer-blackshark-v3-pro-beyaz-ps5-uyumlu-kablosuz-gaming-kulaklik-rz04-05400200-r3m1/',
        image: 'assets/kulaklık.png',
        imageStyle: 'object-fit: contain; padding: 10px;',
        emoji: '🎧', likes: 145, comments: 12,
        tags: ['kulaklık', 'gaming', 'razer', 'kablosuz', 'ps5'], trending: true, addedBy: 'u2'
    },
    {
        id: 'p85', name: 'VW9803 Oyun Direksiyon Seti Siyah Renkli 3\'ü 1 Arada Playstation 3 Uyumlu', brand: 'Hadron', category: 'gaming',
        price: 2399, currency: '₺', url: 'https://www.hepsiburada.com/hadron-vw9803-oyun-direksiyon-seti-siyah-renkli-3-u-1-arada-playstation-3-uyumlu-p-HBCV00005E6AWF?magaza=cdabilisim',
        image: 'assets/hadron_steering.png',
        emoji: '🎮', likes: 95, comments: 8,
        tags: ['direksiyon', 'oyun', 'hadron', 'playstation'], trending: true, addedBy: 'u5'
    },
    {
        id: 'p86', name: 'Cyborg 15 B13WFKG-491XTR 8GB RTX5060 FHD 144Hz K10 Core™ i5-13420H 16 GB RAM 1 TB SSD 15,6 inç Windows 11 Pro Laptop Siyah', brand: 'MSI', category: 'tech',
        price: 66597.30, currency: '₺', url: 'https://www.mediamarkt.com.tr/tr/product/_msi-cyborg-15-b13wfkg-491xtr-8gb-rtx5060-fhd-144hz-k10-coretm-i5-13420h-16-gb-ram-1-tb-ssd-156-inc-windows-11-pro-laptop-siyah-171132958.html',
        image: 'assets/msi_cyborg.png',
        emoji: '💻', likes: 154, comments: 12,
        tags: ['laptop', 'gaming', 'msi', 'cyborg', 'rtx 5060'], trending: true, addedBy: 'u2'
    }
];

const SAMPLE_WISHLISTS = [
    {
        id: 'w1', userId: 'u1', title: 'İlkbahar Gardırobu', 
        description: 'Bu bahar için hayalini kurduğum parçalar',
        privacy: 'public', products: ['p17', 'p18', 'p19', 'p20'],
        likes: 245, comments: 32, shares: 18, completedProducts: ['p19', 'p20'],
        createdAt: '2026-03-15', category: 'fashion'
    },
    {
        id: 'w2', userId: 'u1', title: 'Güzellik Rutini',
        description: 'Günlük cilt bakım ürünleri',
        privacy: 'public', products: ['p3', 'p10', 'p30', 'p31', 'p32'],
        likes: 189, comments: 24, shares: 12, completedProducts: [],
        createdAt: '2026-03-20', category: 'beauty'
    },
    {
        id: 'w3', userId: 'u2', title: 'Tech Setup 2025',
        description: 'Hayalimdeki çalışma masası kurulumu',
        privacy: 'public', products: ['p2', 'p5', 'p7', 'p16', 'p86'],
        likes: 567, comments: 89, shares: 45, completedProducts: ['p5'],
        createdAt: '2026-02-28', category: 'tech'
    },
    {
        id: 'w4', userId: 'u2', title: 'Gaming Arsenal',
        description: 'Ultimate gaming setup',
        privacy: 'public', products: ['p80', 'p81', 'p82', 'p83', 'p84'],
        likes: 890, comments: 134, shares: 67, completedProducts: [],
        createdAt: '2026-03-05', category: 'gaming'
    },
    {
        id: 'w5', userId: 'u3', title: 'Ev Dekorasyon Fikirleri',
        description: 'Yeni evim için dekorasyon önerileri',
        privacy: 'public', products: ['p39', 'p40', 'p41', 'p42', 'p43'],
        likes: 134, comments: 18, shares: 8, completedProducts: ['p14'],
        createdAt: '2026-03-12', category: 'home'
    },
    {
        id: 'w6', userId: 'u4', title: 'Sonbahar Kombini', 
        description: 'Sezon trendlerine uygun kombinler',
        privacy: 'public', products: ['p21', 'p22', 'p23', 'p24'],
        likes: 1023, comments: 156, shares: 89, completedProducts: ['p22', 'p23', 'p24'],
        createdAt: '2026-03-08', category: 'fashion'
    },
    {
        id: 'w7', userId: 'u5', title: 'Pro Gamer Kit',
        description: 'Profesyonel gaming ekipmanları',
        privacy: 'public', products: ['p9', 'p11', 'p5', 'p2', 'p85'],
        likes: 734, comments: 98, shares: 52, completedProducts: [],
        createdAt: '2026-03-01', category: 'gaming'
    },
    {
        id: 'w8', userId: 'u6', title: 'Duygu\'nun Teknoloji Dünyası', 
        description: 'En sevdiğim teknolojik ürünler ve aksesuarlar',
        privacy: 'public', products: ['p25', 'p26', 'p27', 'p28', 'p29', 'p33'],
        likes: 120, comments: 15, shares: 10, completedProducts: [],
        createdAt: '2026-05-11', category: 'tech'
    },
    {
        id: 'w9', userId: 'u7', title: 'Erkek Bakım & Güzellik', 
        description: 'Favori kişisel bakım ve güzellik ürünlerim',
        privacy: 'public', products: ['p34', 'p35', 'p36', 'p37', 'p38'],
        likes: 45, comments: 5, shares: 2, completedProducts: [],
        createdAt: '2026-05-11', category: 'beauty'
    },
    {
        id: 'w10', userId: 'u8', title: 'Tuna\'nın Ev Keyfi', 
        description: 'Evde konfor ve şıklık.',
        privacy: 'public', products: ['p44', 'p45', 'p46', 'p47', 'p48', 'p79'],
        likes: 24, comments: 2, shares: 1, completedProducts: [],
        createdAt: '2026-05-11', category: 'home'
    },
    {
        id: 'w11', userId: 'u9', title: 'Deniz\'in Spor Dünyası', 
        description: 'En sevdiğim spor ve sağlık ürünleri.',
        privacy: 'public', products: ['p49', 'p50', 'p51', 'p52', 'p53'],
        likes: 32, comments: 3, shares: 1, completedProducts: [],
        createdAt: '2026-05-11', category: 'sports'
    },
    {
        id: 'w12', userId: 'u10', title: 'Burak\'ın Spor Odası', 
        description: 'Güç ve dayanıklılık odaklı spor ekipmanları.',
        privacy: 'public', products: ['p54', 'p55', 'p56', 'p57', 'p58'],
        likes: 56, comments: 4, shares: 2, completedProducts: [],
        createdAt: '2026-05-11', category: 'sports'
    },
    {
        id: 'w13', userId: 'u11', title: 'Parla\'nın Kitaplığı', 
        description: 'En sevdiğim fantastik seriler ve kitaplar.',
        privacy: 'public', products: ['p59', 'p60', 'p61', 'p62', 'p63'],
        likes: 84, comments: 6, shares: 3, completedProducts: [],
        createdAt: '2026-05-11', category: 'books'
    },
    {
        id: 'w14', userId: 'u12', title: 'Yaman\'ın Okuma Listesi', 
        description: 'Dijital çağ ve toplum üzerine incelemeler.',
        privacy: 'public', products: ['p64', 'p65', 'p66', 'p67', 'p68'],
        likes: 45, comments: 2, shares: 1, completedProducts: [],
        createdAt: '2026-05-11', category: 'books'
    },
    {
        id: 'w15', userId: 'u13', title: 'Rana\'nın Hayvan Dostu Favorileri', 
        description: 'Sevgili dostlarım için en teknolojik ve konforlu ürünler.',
        privacy: 'public', products: ['p69', 'p70', 'p71', 'p72', 'p73'],
        likes: 156, comments: 14, shares: 8, completedProducts: [],
        createdAt: '2026-05-11', category: 'pets'
    },
    {
        id: 'w16', userId: 'u14', title: 'Emre\'nin Pet Bakım Listesi', 
        description: 'Dostlarımın bakımı için gerekli her şey burada.',
        privacy: 'public', products: ['p74', 'p75', 'p76', 'p77', 'p78'],
        likes: 92, comments: 6, shares: 3, completedProducts: [],
        createdAt: '2026-05-11', category: 'pets'
    }
];

const SAMPLE_COMMENTS = [
    { id: 'c1', userId: 'u3', targetId: 'w1', text: 'Çok güzel seçimler! O çanta harika 😍', createdAt: '2026-03-16', likes: 12 },
    { id: 'c2', userId: 'u4', targetId: 'w1', text: 'Trençkotu ben de aldım, kesinlikle tavsiye ederim!', createdAt: '2026-03-16', likes: 8 },
    { id: 'c3', userId: 'u1', targetId: 'w3', text: 'Bu setup çok havalı olacak 🔥', createdAt: '2026-03-01', likes: 15 },
    { id: 'c4', userId: 'u5', targetId: 'w4', text: 'Aynı laptop bende var, performansı mükemmel!', createdAt: '2026-03-06', likes: 23 },
    { id: 'c5', userId: 'u2', targetId: 'w6', text: 'Stil danışmanlığı yaptırabilir miyiz? 😄', createdAt: '2026-03-09', likes: 18 },
];

const SAMPLE_BLOG_POSTS = [
    {
        id: 'b1', userId: 'u4', title: '2025 İlkbahar Moda Trendleri',
        excerpt: 'Bu ilkbaharda öne çıkan renkler, kumaşlar ve silüetler. Gardırobunuzu yenilemeye hazır olun!',
        content: 'İlkbahar sezonu yaklaşırken moda dünyası yeni trendlerle hareketleniyor...',
        category: 'Moda', emoji: '🌸', likes: 456, comments: 67,
        createdAt: '2026-03-20'
    },
    {
        id: 'b2', userId: 'u2', title: 'Evden Çalışma Setup Rehberi',
        excerpt: 'Verimli ve konforlu bir ev ofisi kurmak için gereken tüm ekipmanlar ve ipuçları.',
        content: 'Evden çalışma artık hayatımızın vazgeçilmez bir parçası...',
        category: 'Teknoloji', emoji: '🖥️', likes: 789, comments: 134,
        createdAt: '2026-03-18'
    },
    {
        id: 'b3', userId: 'u1', title: 'Minimalist Gardırop Oluşturma',
        excerpt: 'Az parça, çok kombin: Kapsül gardırop rehberiniz. Her mevsim şık olun!',
        content: 'Minimalizm sadece bir trend değil, bir yaşam tarzı...',
        category: 'Stil', emoji: '👗', likes: 345, comments: 45,
        createdAt: '2026-03-15'
    },
    {
        id: 'b4', userId: 'u3', title: 'Evde Spa Deneyimi',
        excerpt: 'Profesyonel cilt bakımını evinize getirin. Uygun fiyatlı ürünlerle lüks spa deneyimi.',
        content: 'Herkesin yoğun tempoya ihtiyaç duyduğu anlar var...',
        category: 'Güzellik', emoji: '🧖', likes: 234, comments: 28,
        createdAt: '2026-03-12'
    },
    {
        id: 'b5', userId: 'u5', title: 'En İyi Gaming Aksesuarları 2025',
        excerpt: 'Oyun deneyiminizi üst seviyeye taşıyacak aksesuarlar ve donanım önerileri.',
        content: 'Gaming dünyası her geçen gün gelişiyor...',
        category: 'Gaming', emoji: '🎮', likes: 567, comments: 89,
        createdAt: '2026-03-10'
    },
    {
        id: 'b6', userId: 'u4', title: 'Hediye Seçme Rehberi',
        excerpt: 'Sevdiklerinize en güzel hediyeleri seçmek için ipuçları ve öneriler.',
        content: 'Hediye seçmek bazen zor olabilir, ama imkansız değil...',
        category: 'Lifestyle', emoji: '🎁', likes: 890, comments: 156,
        createdAt: '2026-03-08'
    }
];

const SAMPLE_CHALLENGES = [
    {
        id: 'ch1', title: '30 Gün Minimalizm Challenge',
        description: 'Her gün bir ürün eleyelim, minimal bir gardırop oluşturalım!',
        participants: 2340, progress: 67, endDate: '2026-04-15',
        emoji: '🧹', category: 'lifestyle'
    },
    {
        id: 'ch2', title: 'Doğum Günü Hediye Maratonu 🎂',
        description: 'Arkadaşlarınız için en yaratıcı hediyeleri bulun!',
        participants: 1890, progress: 45, endDate: '2026-04-30',
        emoji: '🎁', category: 'social'
    },
    {
        id: 'ch3', title: 'İlkbahar Kombin Yarışması',
        description: 'En iyi ilkbahar kombinini oluştur, ödül kazan!',
        participants: 3450, progress: 82, endDate: '2026-04-10',
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
    const lang = (window.store && window.store.state && window.store.state.language) || 'tr';
    if (lang === 'en') {
        return new Intl.NumberFormat('en-US').format(price) + ' ₺';
    }
    return new Intl.NumberFormat('tr-TR').format(price) + ' ₺';
}

function timeAgo(dateStr) {
    const now = new Date();
    const date = new Date(dateStr);
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    const lang = (window.store && window.store.state && window.store.state.language) || 'tr';
    if (minutes < 1) return t('comp_time_ago_just_now');
    if (minutes < 60) return t('comp_time_ago_mins', { m: minutes });
    if (hours < 24) return t('comp_time_ago_hours', { h: hours });
    if (days < 7) return t('comp_time_ago_days', { d: days });
    return date.toLocaleDateString(lang === 'tr' ? 'tr-TR' : 'en-US');
}
