/* ═══════════════════════════════════════════════════════
   WISHLIST HUB - ComboHub (Digital Wardrobe) Page
   ═══════════════════════════════════════════════════════ */

let wardrobeFilter = 'all';

function renderComboHubPage() {
    const comboSlots = store.state.comboSlots;
    const savedCombos = store.state.savedCombos;
    const aiCombos = aiEngine.getComboRecommendations();

    const filteredItems = wardrobeFilter === 'all'
        ? store.state.wardrobeItems
        : store.state.wardrobeItems.filter(i => i.type === wardrobeFilter);

    return `
        <section class="section page-enter">
            <div class="combohub-header">
                <h1>
                    <i class="fas fa-shirt" style="color: var(--accent-pink);"></i>
                    ComboHub - Dijital Dolap
                </h1>
                <p>Kıyafetlerini yükle, kombinle ve AI önerileriyle ilham al</p>
            </div>

            <div class="combo-builder">
                <!-- Wardrobe Panel -->
                <div class="combo-wardrobe">
                    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: var(--space-md);">
                        <h3 style="font-size: 1.1rem; font-weight: 700;">
                            <i class="fas fa-closet"></i> Dolabım
                        </h3>
                        <button class="btn btn-sm btn-primary" onclick="openAddWardrobeModal()">
                            <i class="fas fa-plus"></i> Ekle
                        </button>
                    </div>

                    <div class="wardrobe-categories">
                        <button class="filter-tab ${wardrobeFilter === 'all' ? 'active' : ''}" 
                                onclick="filterWardrobe('all')">Tümü</button>
                        <button class="filter-tab ${wardrobeFilter === 'top' ? 'active' : ''}" 
                                onclick="filterWardrobe('top')">👔 Üst</button>
                        <button class="filter-tab ${wardrobeFilter === 'bottom' ? 'active' : ''}" 
                                onclick="filterWardrobe('bottom')">👖 Alt</button>
                        <button class="filter-tab ${wardrobeFilter === 'shoes' ? 'active' : ''}" 
                                onclick="filterWardrobe('shoes')">👟 Ayakkabı</button>
                    </div>

                    <div class="wardrobe-grid">
                        ${filteredItems.map(item => {
        const isSelected = comboSlots[item.type]?.id === item.id;
        return renderWardrobeItem(item, isSelected);
    }).join('')}
                        
                        <!-- Add new item placeholder -->
                        <div class="wardrobe-item" onclick="openAddWardrobeModal()" 
                             style="display:flex; align-items:center; justify-content:center; border: 2px dashed var(--border-medium);">
                            <div style="text-align: center;">
                                <i class="fas fa-plus" style="font-size: 1.5rem; color: var(--text-muted);"></i>
                                <p style="font-size: 0.65rem; color: var(--text-muted); margin-top: 4px;">Ekle</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Combo Preview Panel -->
                <div class="combo-preview-area">
                    <h3 style="font-size: 1.1rem; font-weight: 700; margin-bottom: var(--space-lg);">
                        <i class="fas fa-magic"></i> Kombin Oluştur
                    </h3>

                    <div class="combo-result">
                        <div class="combo-slots">
                            <!-- Top Slot -->
                            <div class="combo-slot ${comboSlots.top ? 'filled' : ''}">
                                ${comboSlots.top
            ? `<div style="width:100%; height:100%; background: ${comboSlots.top.color}20; display:flex; align-items:center; justify-content:center; position:relative;">
                                        <span style="font-size: 3rem;">${comboSlots.top.emoji}</span>
                                        <button onclick="clearComboSlot('top')" style="position:absolute; top:4px; right:4px; width:24px; height:24px; border-radius:50%; background: rgba(0,0,0,0.5); color:white; display:flex; align-items:center; justify-content:center; font-size:0.7rem; cursor:pointer; border:none;">
                                            <i class="fas fa-times"></i>
                                        </button>
                                        <span style="position:absolute; bottom:4px; font-size: 0.65rem; color: var(--text-secondary);">${comboSlots.top.name}</span>
                                       </div>`
            : '<div style="display:flex; flex-direction:column; align-items:center; gap:4px;"><i class="fas fa-tshirt" style="font-size: 1.5rem;"></i><span>Üst Giyim</span></div>'}
                            </div>
                            
                            <!-- Bottom Slot -->
                            <div class="combo-slot ${comboSlots.bottom ? 'filled' : ''}">
                                ${comboSlots.bottom
            ? `<div style="width:100%; height:100%; background: ${comboSlots.bottom.color}20; display:flex; align-items:center; justify-content:center; position:relative;">
                                        <span style="font-size: 3rem;">${comboSlots.bottom.emoji}</span>
                                        <button onclick="clearComboSlot('bottom')" style="position:absolute; top:4px; right:4px; width:24px; height:24px; border-radius:50%; background: rgba(0,0,0,0.5); color:white; display:flex; align-items:center; justify-content:center; font-size:0.7rem; cursor:pointer; border:none;">
                                            <i class="fas fa-times"></i>
                                        </button>
                                        <span style="position:absolute; bottom:4px; font-size: 0.65rem; color: var(--text-secondary);">${comboSlots.bottom.name}</span>
                                       </div>`
            : '<div style="display:flex; flex-direction:column; align-items:center; gap:4px;"><i class="fas fa-ruler-vertical" style="font-size: 1.5rem;"></i><span>Alt Giyim</span></div>'}
                            </div>
                            
                            <!-- Shoes Slot -->
                            <div class="combo-slot ${comboSlots.shoes ? 'filled' : ''}">
                                ${comboSlots.shoes
            ? `<div style="width:100%; height:100%; background: ${comboSlots.shoes.color}20; display:flex; align-items:center; justify-content:center; position:relative;">
                                        <span style="font-size: 3rem;">${comboSlots.shoes.emoji}</span>
                                        <button onclick="clearComboSlot('shoes')" style="position:absolute; top:4px; right:4px; width:24px; height:24px; border-radius:50%; background: rgba(0,0,0,0.5); color:white; display:flex; align-items:center; justify-content:center; font-size:0.7rem; cursor:pointer; border:none;">
                                            <i class="fas fa-times"></i>
                                        </button>
                                        <span style="position:absolute; bottom:4px; font-size: 0.65rem; color: var(--text-secondary);">${comboSlots.shoes.name}</span>
                                       </div>`
            : '<div style="display:flex; flex-direction:column; align-items:center; gap:4px;"><i class="fas fa-shoe-prints" style="font-size: 1.5rem;"></i><span>Ayakkabı</span></div>'}
                            </div>
                        </div>

                        <!-- Actions -->
                        <div style="display: flex; gap: var(--space-sm); margin-top: var(--space-lg); width: 100%;">
                            <button class="btn btn-primary btn-full" onclick="saveCurrentCombo()" 
                                    ${!comboSlots.top && !comboSlots.bottom && !comboSlots.shoes ? 'disabled style="opacity:0.5; pointer-events:none;"' : ''}>
                                <i class="fas fa-save"></i> Kombini Kaydet
                            </button>
                            <button class="btn btn-secondary" onclick="clearAllSlots()">
                                <i class="fas fa-undo"></i>
                            </button>
                            <button class="btn btn-secondary" onclick="randomCombo()">
                                <i class="fas fa-dice"></i>
                            </button>
                        </div>
                    </div>

                    <!-- AI Combo Suggestions -->
                    <div class="combo-ai-suggestion">
                        <div class="combo-ai-header">
                            <span class="ai-badge"><i class="fas fa-robot"></i> AI</span>
                            <h3>Kombin Önerileri</h3>
                        </div>
                        <div class="combo-suggestions-scroll">
                            ${aiCombos.map(combo => `
                                <div class="combo-suggestion-card" onclick="applyAICombo(${JSON.stringify(combo.items.map(i => i.id)).replace(/"/g, '&quot;')})">
                                    <div class="combo-suggestion-images">
                                        ${combo.items.slice(0, 4).map(item => `
                                            <div style="background: ${item.color}20; display:flex; align-items:center; justify-content:center;">
                                                <span style="font-size: 1.2rem;">${item.emoji}</span>
                                            </div>
                                        `).join('')}
                                        ${combo.items.length < 4 ? `<div style="background: var(--bg-glass);"></div>` : ''}
                                    </div>
                                    <p>${combo.name}</p>
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <!-- Saved Combos -->
                    ${savedCombos.length > 0 ? `
                        <div style="margin-top: var(--space-xl);">
                            <h3 style="font-size: 1rem; font-weight: 700; margin-bottom: var(--space-md);">
                                <i class="fas fa-bookmark"></i> Kayıtlı Kombinler
                            </h3>
                            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: var(--space-md);">
                                ${savedCombos.map(combo => `
                                    <div class="combo-suggestion-card" onclick="loadSavedCombo('${combo.id}')">
                                        <div style="display: flex; flex-direction: column; gap: 2px; height: 100px;">
                                            ${Object.values(combo.items).filter(Boolean).map(item => `
                                                <div style="flex:1; background: ${item.color}20; border-radius: 4px; display:flex; align-items:center; justify-content:center;">
                                                    <span style="font-size: 1rem;">${item.emoji}</span>
                                                </div>
                                            `).join('')}
                                        </div>
                                        <p style="margin-top: var(--space-sm);">${combo.name}</p>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    ` : ''}
                </div>
            </div>
        </section>
        ${renderFooter()}
    `;
}

function selectWardrobeItem(itemId, type) {
    const item = store.state.wardrobeItems.find(i => i.id === itemId);
    if (item) {
        store.setComboSlot(item.type, item);
        renderPage('combohub');
    }
}

function clearComboSlot(type) {
    store.setComboSlot(type, null);
    renderPage('combohub');
}

function clearAllSlots() {
    store.clearComboSlots();
    renderPage('combohub');
}

function filterWardrobe(type) {
    wardrobeFilter = type;
    renderPage('combohub');
}

function saveCurrentCombo() {
    const slots = store.state.comboSlots;
    if (!slots.top && !slots.bottom && !slots.shoes) {
        showToast('En az bir parça seçin!', 'error');
        return;
    }

    const name = prompt('Kombine bir isim ver:') || `Kombin ${store.state.savedCombos.length + 1}`;
    store.saveCombo(name);
    showToast('Kombin kaydedildi! 🎉', 'success');
    renderPage('combohub');
}

function randomCombo() {
    const tops = store.state.wardrobeItems.filter(i => i.type === 'top');
    const bottoms = store.state.wardrobeItems.filter(i => i.type === 'bottom');
    const shoes = store.state.wardrobeItems.filter(i => i.type === 'shoes');

    if (tops.length) store.setComboSlot('top', tops[Math.floor(Math.random() * tops.length)]);
    if (bottoms.length) store.setComboSlot('bottom', bottoms[Math.floor(Math.random() * bottoms.length)]);
    if (shoes.length) store.setComboSlot('shoes', shoes[Math.floor(Math.random() * shoes.length)]);

    showToast('Rastgele kombin oluşturuldu! 🎲', 'success');
    renderPage('combohub');
}

function applyAICombo(itemIds) {
    itemIds.forEach(id => {
        const item = store.state.wardrobeItems.find(i => i.id === id);
        if (item) {
            store.setComboSlot(item.type, item);
        }
    });
    showToast('AI kombini uygulandı! 🤖', 'success');
    renderPage('combohub');
}

function loadSavedCombo(comboId) {
    const combo = store.state.savedCombos.find(c => c.id === comboId);
    if (combo) {
        store.state.comboSlots = { ...combo.items };
        showToast('Kombin yüklendi!', 'success');
        renderPage('combohub');
    }
}

function openAddWardrobeModal() {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.id = 'add-wardrobe-modal';
    modal.innerHTML = `
        <div class="modal-container">
            <button class="modal-close" onclick="document.getElementById('add-wardrobe-modal').remove()">
                <i class="fas fa-times"></i>
            </button>
            <h2 style="font-size: 1.3rem; font-weight: 700; margin-bottom: var(--space-xl);">
                <i class="fas fa-plus-circle" style="color: var(--primary);"></i> Kıyafet Ekle
            </h2>
            <div class="form-group">
                <label>Kıyafet Adı</label>
                <input type="text" class="form-input" id="wardrobe-item-name" placeholder="Örn: Mavi Gömlek">
            </div>
            <div class="form-group">
                <label>Tür</label>
                <div style="display: flex; gap: var(--space-md);">
                    <label style="display: flex; align-items: center; gap: var(--space-sm); cursor: pointer; font-size: 0.85rem; color: var(--text-secondary);">
                        <input type="radio" name="wr-type" value="top" checked> 👔 Üst Giyim
                    </label>
                    <label style="display: flex; align-items: center; gap: var(--space-sm); cursor: pointer; font-size: 0.85rem; color: var(--text-secondary);">
                        <input type="radio" name="wr-type" value="bottom"> 👖 Alt Giyim
                    </label>
                    <label style="display: flex; align-items: center; gap: var(--space-sm); cursor: pointer; font-size: 0.85rem; color: var(--text-secondary);">
                        <input type="radio" name="wr-type" value="shoes"> 👟 Ayakkabı
                    </label>
                </div>
            </div>
            <div class="form-group">
                <label>Fotoğraf</label>
                <input type="file" accept="image/*" id="wardrobe-photo" class="form-input" style="padding: var(--space-sm);">
            </div>
            <div class="form-group">
                <label>Renk</label>
                <input type="color" id="wardrobe-color" value="#8B5CF6" class="form-input" style="height: 40px; cursor: pointer;">
            </div>
            <button class="btn btn-primary btn-full" onclick="addWardrobeItem()">
                <i class="fas fa-check"></i> Ekle
            </button>
        </div>
    `;
    document.body.appendChild(modal);
}

function addWardrobeItem() {
    const name = document.getElementById('wardrobe-item-name').value.trim();
    const type = document.querySelector('input[name="wr-type"]:checked').value;
    const color = document.getElementById('wardrobe-color').value;

    if (!name) {
        showToast('Kıyafet adı gerekli!', 'error');
        return;
    }

    const typeEmojis = { top: '👔', bottom: '👖', shoes: '👟' };
    const newItem = {
        id: 'wr' + Date.now(),
        type,
        name,
        emoji: typeEmojis[type],
        color
    };

    store.state.wardrobeItems.push(newItem);
    store.saveToStorage();
    document.getElementById('add-wardrobe-modal').remove();
    showToast('Kıyafet dolabına eklendi! 👗', 'success');
    renderPage('combohub');
}
