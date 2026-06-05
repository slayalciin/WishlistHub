/* ═══════════════════════════════════════════════════════
   WISHLIST HUB - Virtual Try-On Page
   ═══════════════════════════════════════════════════════ */

let uploadedPhoto = null;
let selectedTryOnItems = [];

function renderVirtualTryoutPage() {
    const tryOnProducts = SAMPLE_PRODUCTS.filter(p =>
        ['fashion'].includes(p.category)
    );

    return `
        <section class="section page-enter">
            <div class="virtual-tryout-header">
                <h1>
                    <i class="fas fa-tshirt" style="color: var(--accent-cyan);"></i>
                    ${t('vt_title')}
                </h1>
                <p>${t('vt_desc')}</p>
                <span class="ai-badge" style="margin-top: var(--space-sm);"><i class="fas fa-robot"></i> ${t('vt_ai_badge')}</span>
            </div>

            <div class="tryout-container">
                <!-- Left Panel - Products -->
                <div class="tryout-panel">
                    <h3 style="font-size: 1rem; font-weight: 700; margin-bottom: var(--space-md);">
                        <i class="fas fa-shopping-bag"></i> ${t('vt_panel_products')}
                    </h3>
                    
                    <div class="filter-tabs" style="margin-bottom: var(--space-md);">
                        <button class="filter-tab active" onclick="filterTryOnProducts('all', this)">${t('vt_filter_all')}</button>
                        <button class="filter-tab" onclick="filterTryOnProducts('top', this)">${t('vt_filter_top')}</button>
                        <button class="filter-tab" onclick="filterTryOnProducts('bottom', this)">${t('vt_filter_bottom')}</button>
                        <button class="filter-tab" onclick="filterTryOnProducts('shoes', this)">${t('vt_filter_shoes')}</button>
                    </div>

                    <div id="tryon-products-list">
                        ${SAMPLE_WARDROBE_ITEMS.map(item => `
                            <div class="tryout-item ${selectedTryOnItems.includes(item.id) ? 'selected' : ''}" 
                                 onclick="selectTryOnItem('${item.id}')">
                                <div style="width:50px; height:50px; border-radius: var(--radius-sm); background: ${item.color}20; display:flex; align-items:center; justify-content:center;">
                                    <span style="font-size: 1.8rem;">${item.emoji}</span>
                                </div>
                                <div class="tryout-item-info">
                                    <h4>${item.name}</h4>
                                    <p>${item.type === 'top' ? t('ch_slot_top') : item.type === 'bottom' ? t('ch_slot_bottom') : t('ch_slot_shoes')}</p>
                                </div>
                            </div>
                        `).join('')}

                        <!-- Wishlist Products -->
                        <h4 style="font-size: 0.85rem; color: var(--text-muted); margin-top: var(--space-lg); margin-bottom: var(--space-sm);">
                            ${t('vt_from_wishlist')}
                        </h4>
                        ${tryOnProducts.slice(0, 4).map(p => `
                            <div class="tryout-item" onclick="selectTryOnProduct('${p.id}')">
                                <div style="width:50px; height:50px; border-radius: var(--radius-sm); background: ${getProductColor(SAMPLE_PRODUCTS.indexOf(p))}; display:flex; align-items:center; justify-content:center;">
                                    <span style="font-size: 1.8rem;">${p.emoji}</span>
                                </div>
                                <div class="tryout-item-info">
                                    <h4>${p.name}</h4>
                                    <p>${p.brand} • ${formatPrice(p.price)}</p>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- Center - Canvas -->
                <div class="tryout-canvas" id="tryout-canvas">
                    ${uploadedPhoto ? `
                        <div class="tryout-model-area">
                            <img src="${uploadedPhoto}" alt="model" style="max-height: 500px; border-radius: var(--radius-lg);">
                            ${selectedTryOnItems.map(itemId => {
        const item = SAMPLE_WARDROBE_ITEMS.find(i => i.id === itemId);
        if (!item) return '';
        const positions = {
            top: 'top: 15%; left: 50%; transform: translateX(-50%);',
            bottom: 'top: 50%; left: 50%; transform: translateX(-50%);',
            shoes: 'bottom: 5%; left: 50%; transform: translateX(-50%);'
        };
        return `
                                    <div class="tryout-overlay-item" style="${positions[item.type] || ''}; font-size: 4rem; opacity: 0.7;">
                                        ${item.emoji}
                                    </div>
                                `;
    }).join('')}
                        </div>
                    ` : `
                        <div class="tryout-upload">
                            <div class="tryout-upload-icon">
                                <i class="fas fa-camera"></i>
                            </div>
                            <h3 style="font-size: 1.2rem; font-weight: 700; margin-bottom: var(--space-sm);">
                                ${t('vt_upload_photo')}
                            </h3>
                            <p style="color: var(--text-secondary); margin-bottom: var(--space-lg); max-width: 300px;">
                                ${t('vt_upload_desc')}
                            </p>
                            <input type="file" id="photo-upload" accept="image/*" style="display:none;" onchange="handlePhotoUpload(event)">
                            <button class="btn btn-primary btn-lg" onclick="document.getElementById('photo-upload').click()">
                                <i class="fas fa-upload"></i> ${t('vt_upload_photo')}
                            </button>
                            <button class="btn btn-secondary btn-lg" onclick="useDemoModel()" style="margin-top: var(--space-sm);">
                                <i class="fas fa-user"></i> ${t('vt_demo_model')}
                            </button>
                        </div>
                    `}
                </div>

                <!-- Right Panel - Selected & Preview -->
                <div class="tryout-panel">
                    <h3 style="font-size: 1rem; font-weight: 700; margin-bottom: var(--space-md);">
                        <i class="fas fa-layer-group"></i> ${t('vt_selected')}
                    </h3>

                    ${selectedTryOnItems.length > 0 ? `
                        <div style="margin-bottom: var(--space-lg);">
                            ${selectedTryOnItems.map(itemId => {
        const item = SAMPLE_WARDROBE_ITEMS.find(i => i.id === itemId);
        if (!item) return '';
        return `
                                    <div class="tryout-item selected">
                                        <div style="width:40px; height:40px; border-radius: var(--radius-sm); background: ${item.color}20; display:flex; align-items:center; justify-content:center;">
                                            <span style="font-size: 1.3rem;">${item.emoji}</span>
                                        </div>
                                        <div class="tryout-item-info">
                                            <h4>${item.name}</h4>
                                        </div>
                                        <button class="btn btn-ghost btn-sm" onclick="removeTryOnItem('${item.id}')" style="color: var(--accent-rose);">
                                            <i class="fas fa-times"></i>
                                        </button>
                                    </div>
                                `;
    }).join('')}
                        </div>
                        
                        <button class="btn btn-secondary btn-full" onclick="clearTryOnSelection()">
                            <i class="fas fa-undo"></i> ${t('vt_clear')}
                        </button>
                    ` : `
                        <div style="text-align: center; padding: var(--space-xl); color: var(--text-muted);">
                            <i class="fas fa-arrow-left" style="font-size: 1.5rem; margin-bottom: var(--space-md);"></i>
                            <p style="font-size: 0.85rem;">${t('vt_empty_selected')}</p>
                        </div>
                    `}

                    <!-- AI Suggestion -->
                    <div style="margin-top: var(--space-xl);">
                        <div style="display: flex; align-items: center; gap: var(--space-sm); margin-bottom: var(--space-md);">
                            <span class="ai-badge"><i class="fas fa-robot"></i> ${t('vt_ai_suggestion')}</span>
                        </div>
                        <div style="background: var(--bg-glass); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: var(--space-md);">
                            <p style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.6;">
                                ${selectedTryOnItems.length > 0
            ? t('vt_ai_success')
            : t('vt_ai_empty')}
                            </p>
                        </div>
                    </div>

                    <!-- Combo Preview -->
                    <div style="margin-top: var(--space-lg);">
                        <h4 style="font-size: 0.9rem; font-weight: 600; margin-bottom: var(--space-md);">
                            ${t('vt_preview')}
                        </h4>
                        <div style="display: flex; flex-direction: column; gap: 4px;">
                            <div style="height: 80px; border: 1px dashed var(--border-medium); border-radius: var(--radius-sm); display:flex; align-items:center; justify-content:center; overflow:hidden; ${getSelectedItemForSlot('top') ? `background: ${getSelectedItemForSlot('top').color}20;` : ''}">
                                ${getSelectedItemForSlot('top')
            ? `<span style="font-size: 2rem;">${getSelectedItemForSlot('top').emoji}</span>`
            : `<span style="font-size: 0.7rem; color: var(--text-muted);">${t('vt_filter_top')}</span>`}
                            </div>
                            <div style="height: 80px; border: 1px dashed var(--border-medium); border-radius: var(--radius-sm); display:flex; align-items:center; justify-content:center; overflow:hidden; ${getSelectedItemForSlot('bottom') ? `background: ${getSelectedItemForSlot('bottom').color}20;` : ''}">
                                ${getSelectedItemForSlot('bottom')
            ? `<span style="font-size: 2rem;">${getSelectedItemForSlot('bottom').emoji}</span>`
            : `<span style="font-size: 0.7rem; color: var(--text-muted);">${t('vt_filter_bottom')}</span>`}
                            </div>
                            <div style="height: 80px; border: 1px dashed var(--border-medium); border-radius: var(--radius-sm); display:flex; align-items:center; justify-content:center; overflow:hidden; ${getSelectedItemForSlot('shoes') ? `background: ${getSelectedItemForSlot('shoes').color}20;` : ''}">
                                ${getSelectedItemForSlot('shoes')
            ? `<span style="font-size: 2rem;">${getSelectedItemForSlot('shoes').emoji}</span>`
            : `<span style="font-size: 0.7rem; color: var(--text-muted);">${t('vt_filter_shoes')}</span>`}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        ${renderFooter()}
    `;
}

function getSelectedItemForSlot(type) {
    const itemId = selectedTryOnItems.find(id => {
        const item = SAMPLE_WARDROBE_ITEMS.find(i => i.id === id);
        return item && item.type === type;
    });
    return itemId ? SAMPLE_WARDROBE_ITEMS.find(i => i.id === itemId) : null;
}

function selectTryOnItem(itemId) {
    const item = SAMPLE_WARDROBE_ITEMS.find(i => i.id === itemId);
    if (!item) return;

    // Replace item of same type
    selectedTryOnItems = selectedTryOnItems.filter(id => {
        const existing = SAMPLE_WARDROBE_ITEMS.find(i => i.id === id);
        return existing && existing.type !== item.type;
    });

    selectedTryOnItems.push(itemId);
    renderPage('virtual-tryout');
}

function selectTryOnProduct(productId) {
    showToast(t('vt_added_toast'), 'success');
}

function removeTryOnItem(itemId) {
    selectedTryOnItems = selectedTryOnItems.filter(id => id !== itemId);
    renderPage('virtual-tryout');
}

function clearTryOnSelection() {
    selectedTryOnItems = [];
    renderPage('virtual-tryout');
}

function handlePhotoUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            uploadedPhoto = e.target.result;
            renderPage('virtual-tryout');
            showToast(t('vt_photo_uploaded'), 'success');
        };
        reader.readAsDataURL(file);
    }
}

function useDemoModel() {
    // Create a simple demo avatar using canvas
    const canvas = document.createElement('canvas');
    canvas.width = 300;
    canvas.height = 500;
    const ctx = canvas.getContext('2d');

    // Background
    const gradient = ctx.createLinearGradient(0, 0, 300, 500);
    gradient.addColorStop(0, '#1a1128');
    gradient.addColorStop(1, '#251B37');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 300, 500);

    // Simple figure
    ctx.fillStyle = '#8B5CF6';
    ctx.beginPath();
    ctx.arc(150, 120, 50, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#A78BFA';
    ctx.fillRect(120, 170, 60, 120);

    ctx.fillStyle = '#7C3AED';
    ctx.fillRect(110, 290, 35, 130);
    ctx.fillRect(155, 290, 35, 130);

    // Text
    ctx.fillStyle = '#F8F5FF';
    ctx.font = '14px Outfit, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(t('vt_demo_label'), 150, 460);

    uploadedPhoto = canvas.toDataURL();
    renderPage('virtual-tryout');
    showToast(t('vt_demo_loaded'), 'success');
}

function filterTryOnProducts(type, btn) {
    btn.parentElement.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
    btn.classList.add('active');

    const list = document.getElementById('tryon-products-list');
    if (!list) return;

    const filteredItems = type === 'all'
        ? SAMPLE_WARDROBE_ITEMS
        : SAMPLE_WARDROBE_ITEMS.filter(i => i.type === type);

    list.innerHTML = filteredItems.map(item => `
        <div class="tryout-item ${selectedTryOnItems.includes(item.id) ? 'selected' : ''}" 
             onclick="selectTryOnItem('${item.id}')">
            <div style="width:50px; height:50px; border-radius: var(--radius-sm); background: ${item.color}20; display:flex; align-items:center; justify-content:center;">
                <span style="font-size: 1.8rem;">${item.emoji}</span>
            </div>
            <div class="tryout-item-info">
                <h4>${item.name}</h4>
                <p>${item.type === 'top' ? t('ch_slot_top') : item.type === 'bottom' ? t('ch_slot_bottom') : t('ch_slot_shoes')}</p>
            </div>
        </div>
    `).join('');
}
