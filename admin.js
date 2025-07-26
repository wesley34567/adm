// ===== MAGNATAS DA MODA - ADMIN JAVASCRIPT =====

// Configurações e Credenciais
const ADMIN_CREDENTIALS = {
    username: 'magnataswesley',
    password: 'Kazuya66wesley@'
};

// Configurações do WhatsApp e Contatos
const CONTACTS = {
    whatsapp: '+5512988376383',
    instagram: '@magnatasdamoda',
    email: 'wesleycelularz3@gmail.com'
};

// Categorias disponíveis
const CATEGORIES = {
    'perfumes-arabes': 'Perfumes Árabes',
    'perfumes-importados': 'Perfumes Importados',
    'perfumes-brand': 'Perfumes Brand',
    'relogios-prova-agua': 'Relógios à Prova de Água',
    'relogios-importados': 'Relógios Importados',
    'relogios-original': 'Relógios Original',
    'bobobjacos': 'Bobobjacos',
    'blusas': 'Blusas',
    'jaquetas': 'Jaquetas',
    'tenis-importado-china': 'Tênis Importado China',
    'tenis-original': 'Tênis Original',
    'tenis-premium': 'Tênis Premium',
    'tenis-vietnam': 'Tênis Vietnam',
    'oculos-importados': 'Óculos Importados',
    'camisa-time-importada': 'Camisa de Time Importada'
};

// Estado da aplicação
let currentUser = null;
let products = [];
let editingProductId = null;

// ===== INICIALIZAÇÃO =====
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    loadProducts();
    setupEventListeners();
    checkAuthStatus();
    updateStats();
}

// ===== AUTENTICAÇÃO =====
function checkAuthStatus() {
    const savedUser = localStorage.getItem('magnatas_admin_user');
    if (savedUser) {
        currentUser = savedUser;
        showAdminInterface();
    } else {
        showLoginScreen();
    }
}

function showLoginScreen() {
    document.getElementById('loginScreen').style.display = 'block';
    document.getElementById('adminInterface').style.display = 'none';
}

function showAdminInterface() {
    document.getElementById('loginScreen').style.display = 'none';
    document.getElementById('adminInterface').style.display = 'block';
    document.getElementById('currentUser').textContent = currentUser;
    renderProducts();
    updateStats();
}

function login(username, password) {
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
        currentUser = username;
        localStorage.setItem('magnatas_admin_user', username);
        showAdminInterface();
        showMessage('Login realizado com sucesso!', 'success');
        return true;
    }
    return false;
}

function logout() {
    currentUser = null;
    localStorage.removeItem('magnatas_admin_user');
    showLoginScreen();
    showMessage('Logout realizado com sucesso!', 'success');
}

// ===== GERENCIAMENTO DE PRODUTOS =====
function loadProducts() {
    const savedProducts = localStorage.getItem('magnatas_products');
    if (savedProducts) {
        products = JSON.parse(savedProducts);
    } else {
        // Produtos de exemplo
        products = [
            {
                id: 1,
                name: 'Perfume Árabe Oud Luxo',
                category: 'perfumes-arabes',
                description: 'Perfume árabe premium com essência de oud natural, longa duração e fragrância marcante.',
                price: 89.90,
                image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400',
                video: '',
                createdAt: new Date().toISOString()
            },
            {
                id: 2,
                name: 'Relógio Importado Resistente',
                category: 'relogios-prova-agua',
                description: 'Relógio esportivo à prova d\'água até 50m, cronômetro e design moderno.',
                price: 159.90,
                image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
                video: '',
                createdAt: new Date().toISOString()
            },
            {
                id: 3,
                name: 'Tênis Premium Importado',
                category: 'tenis-premium',
                description: 'Tênis premium com tecnologia de amortecimento avançada e design exclusivo.',
                price: 299.90,
                image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400',
                video: '',
                createdAt: new Date().toISOString()
            }
        ];
        saveProducts();
    }
}

function saveProducts() {
    localStorage.setItem('magnatas_products', JSON.stringify(products));
    updateStats();
}

function addProduct(productData) {
    const newProduct = {
        id: Date.now(),
        ...productData,
        createdAt: new Date().toISOString()
    };
    products.push(newProduct);
    saveProducts();
    renderProducts();
    showMessage('Produto adicionado com sucesso!', 'success');
}

function updateProduct(id, productData) {
    const index = products.findIndex(p => p.id === id);
    if (index !== -1) {
        products[index] = {
            ...products[index],
            ...productData,
            updatedAt: new Date().toISOString()
        };
        saveProducts();
        renderProducts();
        showMessage('Produto atualizado com sucesso!', 'success');
    }
}

function deleteProduct(id) {
    if (confirm('Tem certeza que deseja excluir este produto?')) {
        products = products.filter(p => p.id !== id);
        saveProducts();
        renderProducts();
        showMessage('Produto excluído com sucesso!', 'success');
    }
}

// ===== RENDERIZAÇÃO =====
function renderProducts() {
    const grid = document.getElementById('productsGrid');
    const searchTerm = document.getElementById('searchFilter').value.toLowerCase();
    const categoryFilter = document.getElementById('categoryFilter').value;
    const priceFilter = document.getElementById('priceFilter').value;

    let filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm) ||
                            product.description.toLowerCase().includes(searchTerm);
        const matchesCategory = !categoryFilter || product.category === categoryFilter;
        const matchesPrice = !priceFilter || checkPriceRange(product.price, priceFilter);
        
        return matchesSearch && matchesCategory && matchesPrice;
    });

    if (filteredProducts.length === 0) {
        grid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: #6c757d;">
                <h3>📦 Nenhum produto encontrado</h3>
                <p>Tente ajustar os filtros ou adicione novos produtos.</p>
            </div>
        `;
        return;
    }

    grid.innerHTML = filteredProducts.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}" class="product-image" 
                 onerror="this.src='https://via.placeholder.com/300x250/006994/ffffff?text=Sem+Imagem'">
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-price" onclick="editPrice(${product.id})" style="cursor: pointer;" 
                     title="Clique para editar o preço">
                    R$ ${product.price.toFixed(2).replace('.', ',')}
                </div>
                <div class="product-category" style="color: #6c757d; font-size: 0.9rem; margin-bottom: 10px;">
                    📂 ${CATEGORIES[product.category]}
                </div>
                <div class="product-actions">
                    <button class="btn-small" style="background: #ffd700; color: #1a1a1a;" 
                            onclick="editProduct(${product.id})">
                        ✏️ Editar
                    </button>
                    <button class="btn-small" style="background: #dc2626; color: white;" 
                            onclick="deleteProduct(${product.id})">
                        🗑️ Excluir
                    </button>
                    ${product.video ? `
                        <button class="btn-small" style="background: #10b981; color: white;" 
                                onclick="window.open('${product.video}', '_blank')">
                            🎥 Vídeo
                        </button>
                    ` : ''}
                </div>
            </div>
        </div>
    `).join('');
}

function checkPriceRange(price, range) {
    switch(range) {
        case '0-50': return price >= 0 && price <= 50;
        case '50-100': return price > 50 && price <= 100;
        case '100-200': return price > 100 && price <= 200;
        case '200-500': return price > 200 && price <= 500;
        case '500+': return price > 500;
        default: return true;
    }
}

// ===== EDIÇÃO RÁPIDA DE PREÇO =====
function editPrice(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const newPrice = prompt(`Editar preço do produto "${product.name}":`, product.price);
    if (newPrice !== null && !isNaN(newPrice) && parseFloat(newPrice) >= 0) {
        updateProduct(productId, { price: parseFloat(newPrice) });
    }
}

// ===== MODAL DE PRODUTO =====
function openProductModal(product = null) {
    const modal = document.getElementById('productModal');
    const title = document.getElementById('modalTitle');
    const form = document.getElementById('productForm');
    
    editingProductId = product ? product.id : null;
    
    if (product) {
        title.textContent = '✏️ Editar Produto';
        document.getElementById('productId').value = product.id;
        document.getElementById('productName').value = product.name;
        document.getElementById('productCategory').value = product.category;
        document.getElementById('productDescription').value = product.description;
        document.getElementById('productPrice').value = product.price;
        document.getElementById('productVideo').value = product.video || '';
        
        if (product.image) {
            showImagePreview(product.image);
        }
    } else {
        title.textContent = '➕ Adicionar Produto';
        form.reset();
        hideImagePreview();
    }
    
    modal.style.display = 'block';
}

function closeProductModal() {
    document.getElementById('productModal').style.display = 'none';
    document.getElementById('productForm').reset();
    hideImagePreview();
    editingProductId = null;
}

function editProduct(id) {
    const product = products.find(p => p.id === id);
    if (product) {
        openProductModal(product);
    }
}

// ===== UPLOAD DE IMAGEM =====
function setupImageUpload() {
    const uploadArea = document.getElementById('imageUpload');
    const fileInput = document.getElementById('productImage');

    uploadArea.addEventListener('click', () => fileInput.click());
    
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.classList.add('dragover');
    });
    
    uploadArea.addEventListener('dragleave', () => {
        uploadArea.classList.remove('dragover');
    });
    
    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleImageFile(files[0]);
        }
    });
    
    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            handleImageFile(e.target.files[0]);
        }
    });
}

function handleImageFile(file) {
    if (!file.type.startsWith('image/')) {
        showMessage('Por favor, selecione apenas arquivos de imagem.', 'error');
        return;
    }
    
    if (file.size > 5 * 1024 * 1024) {
        showMessage('A imagem deve ter no máximo 5MB.', 'error');
        return;
    }
    
    const reader = new FileReader();
    reader.onload = (e) => {
        showImagePreview(e.target.result);
    };
    reader.readAsDataURL(file);
}

function showImagePreview(src) {
    const preview = document.getElementById('imagePreview');
    const img = document.getElementById('previewImg');
    img.src = src;
    preview.classList.remove('hidden');
}

function hideImagePreview() {
    document.getElementById('imagePreview').classList.add('hidden');
}

// ===== ESTATÍSTICAS =====
function updateStats() {
    const totalProducts = products.length;
    const totalValue = products.reduce((sum, product) => sum + product.price, 0);
    const lastUpdate = new Date().toLocaleDateString('pt-BR');
    
    document.getElementById('totalProducts').textContent = totalProducts;
    document.getElementById('totalValue').textContent = `R$ ${totalValue.toFixed(2).replace('.', ',')}`;
    document.getElementById('lastUpdate').textContent = lastUpdate;
}

// ===== BACKUP E RESTAURAÇÃO =====
function backupData() {
    const data = {
        products: products,
        timestamp: new Date().toISOString(),
        version: '1.0'
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `magnatas-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showMessage('Backup realizado com sucesso!', 'success');
}

function restoreData(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const data = JSON.parse(e.target.result);
            if (data.products && Array.isArray(data.products)) {
                if (confirm('Tem certeza que deseja restaurar os dados? Isso substituirá todos os produtos atuais.')) {
                    products = data.products;
                    saveProducts();
                    renderProducts();
                    showMessage('Dados restaurados com sucesso!', 'success');
                }
            } else {
                showMessage('Arquivo de backup inválido.', 'error');
            }
        } catch (error) {
            showMessage('Erro ao ler o arquivo de backup.', 'error');
        }
    };
    reader.readAsText(file);
}

// ===== MENSAGENS =====
function showMessage(message, type = 'success') {
    // Remove mensagens existentes
    const existingMessages = document.querySelectorAll('.success-message, .error-message');
    existingMessages.forEach(msg => msg.remove());
    
    const messageDiv = document.createElement('div');
    messageDiv.className = type === 'success' ? 'success-message' : 'error-message';
    messageDiv.textContent = message;
    
    const container = document.querySelector('.container');
    container.insertBefore(messageDiv, container.firstChild);
    
    setTimeout(() => {
        messageDiv.remove();
    }, 5000);
}

// ===== EVENT LISTENERS =====
function setupEventListeners() {
    // Login
    document.getElementById('loginForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        if (login(username, password)) {
            document.getElementById('loginError').classList.add('hidden');
        } else {
            document.getElementById('loginError').classList.remove('hidden');
        }
    });
    
    // Logout
    document.getElementById('logoutBtn').addEventListener('click', logout);
    
    // Adicionar produto
    document.getElementById('addProductBtn').addEventListener('click', () => openProductModal());
    
    // Backup
    document.getElementById('backupBtn').addEventListener('click', backupData);
    
    // Restaurar
    document.getElementById('restoreBtn').addEventListener('click', () => {
        document.getElementById('restoreFile').click();
    });
    
    document.getElementById('restoreFile').addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            restoreData(e.target.files[0]);
        }
    });
    
    // Modal
    document.getElementById('closeModal').addEventListener('click', closeProductModal);
    document.getElementById('cancelBtn').addEventListener('click', closeProductModal);
    
    // Fechar modal clicando fora
    document.getElementById('productModal').addEventListener('click', (e) => {
        if (e.target.id === 'productModal') {
            closeProductModal();
        }
    });
    
    // Form de produto
    document.getElementById('productForm').addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('productName').value,
            category: document.getElementById('productCategory').value,
            description: document.getElementById('productDescription').value,
            price: parseFloat(document.getElementById('productPrice').value),
            video: document.getElementById('productVideo').value,
            image: document.getElementById('previewImg').src || 'https://via.placeholder.com/300x250/006994/ffffff?text=Sem+Imagem'
        };
        
        if (editingProductId) {
            updateProduct(editingProductId, formData);
        } else {
            addProduct(formData);
        }
        
        closeProductModal();
    });
    
    // Filtros
    document.getElementById('searchFilter').addEventListener('input', renderProducts);
    document.getElementById('categoryFilter').addEventListener('change', renderProducts);
    document.getElementById('priceFilter').addEventListener('change', renderProducts);
    
    // Upload de imagem
    setupImageUpload();
}

// ===== UTILITÁRIOS =====
function formatPrice(price) {
    return `R$ ${price.toFixed(2).replace('.', ',')}`;
}

function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('pt-BR');
}

// Adicionar CSS para textarea
const style = document.createElement('style');
style.textContent = `
    textarea {
        width: 100%;
        padding: 12px;
        border: 2px solid var(--azul-mar-claro);
        border-radius: 8px;
        font-size: 1rem;
        font-family: inherit;
        resize: vertical;
        min-height: 100px;
    }
    
    textarea:focus {
        outline: none;
        border-color: var(--vermelho);
    }
    
    .product-category {
        background: var(--azul-mar);
        color: white;
        padding: 4px 8px;
        border-radius: 12px;
        font-size: 0.8rem;
        display: inline-block;
        margin-bottom: 10px;
    }
`;
document.head.appendChild(style);