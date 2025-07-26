<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Magnatas da Moda - Painel Administrativo</title>
    <link rel="stylesheet" href="style.css">
    <link rel="manifest" href="manifest.json">
    <meta name="theme-color" content="#006994">
</head>
<body>
    <!-- Bandeira dos EUA Animada -->
    <div class="usa-flag"></div>
    
    <!-- Header Principal -->
    <header class="main-header">
        <h1 class="logo-title">MAGNATAS DA MODA</h1>
        <p class="subtitle">Painel Administrativo - Premium Fashion Store</p>
    </header>

    <div class="container">
        <!-- Tela de Login -->
        <div id="loginScreen" class="login-container">
            <h2 class="login-title">🔐 Acesso Administrativo</h2>
            <div id="loginError" class="error-message hidden">
                Usuário ou senha incorretos!
            </div>
            <form id="loginForm">
                <div class="form-group">
                    <label for="username">Usuário:</label>
                    <input type="text" id="username" name="username" required placeholder="Digite seu usuário">
                </div>
                <div class="form-group">
                    <label for="password">Senha:</label>
                    <input type="password" id="password" name="password" required placeholder="Digite sua senha">
                </div>
                <button type="submit" class="btn btn-primary">ENTRAR NO SISTEMA</button>
            </form>
        </div>

        <!-- Interface Principal do Admin -->
        <div id="adminInterface" class="main-interface">
            <!-- Barra Superior -->
            <div class="top-bar">
                <div class="user-info">
                    👨‍💼 Bem-vindo, <span id="currentUser">Admin</span> | Painel Administrativo
                </div>
                <button id="logoutBtn" class="logout-btn">🚪 Sair</button>
            </div>

            <!-- Estatísticas -->
            <div class="admin-stats">
                <div class="stat-card">
                    <div class="stat-number" id="totalProducts">0</div>
                    <div class="stat-label">Total de Produtos</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number" id="totalCategories">15</div>
                    <div class="stat-label">Categorias</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number" id="totalValue">R$ 0,00</div>
                    <div class="stat-label">Valor Total Estoque</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number" id="lastUpdate">Hoje</div>
                    <div class="stat-label">Última Atualização</div>
                </div>
            </div>

            <!-- Ações Administrativas -->
            <div class="admin-actions">
                <button id="addProductBtn" class="btn-admin btn-add-product">➕ Adicionar Produto</button>
                <button id="backupBtn" class="btn-admin btn-backup">💾 Backup Dados</button>
                <button id="restoreBtn" class="btn-admin btn-restore">📥 Restaurar Dados</button>
                <input type="file" id="restoreFile" accept=".json" style="display: none;">
            </div>

            <!-- Filtros -->
            <div class="filters-section">
                <div class="filters-grid">
                    <div class="filter-group">
                        <label for="searchFilter">🔍 Buscar Produto:</label>
                        <input type="text" id="searchFilter" placeholder="Digite o nome do produto...">
                    </div>
                    <div class="filter-group">
                        <label for="categoryFilter">📂 Filtrar por Categoria:</label>
                        <select id="categoryFilter">
                            <option value="">Todas as Categorias</option>
                            <option value="perfumes-arabes">Perfumes Árabes</option>
                            <option value="perfumes-importados">Perfumes Importados</option>
                            <option value="perfumes-brand">Perfumes Brand</option>
                            <option value="relogios-prova-agua">Relógios à Prova de Água</option>
                            <option value="relogios-importados">Relógios Importados</option>
                            <option value="relogios-original">Relógios Original</option>
                            <option value="bobobjacos">Bobobjacos</option>
                            <option value="blusas">Blusas</option>
                            <option value="jaquetas">Jaquetas</option>
                            <option value="tenis-importado-china">Tênis Importado China</option>
                            <option value="tenis-original">Tênis Original</option>
                            <option value="tenis-premium">Tênis Premium</option>
                            <option value="tenis-vietnam">Tênis Vietnam</option>
                            <option value="oculos-importados">Óculos Importados</option>
                            <option value="camisa-time-importada">Camisa de Time Importada</option>
                        </select>
                    </div>
                    <div class="filter-group">
                        <label for="priceFilter">💰 Filtrar por Preço:</label>
                        <select id="priceFilter">
                            <option value="">Todos os Preços</option>
                            <option value="0-50">R$ 0 - R$ 50</option>
                            <option value="50-100">R$ 50 - R$ 100</option>
                            <option value="100-200">R$ 100 - R$ 200</option>
                            <option value="200-500">R$ 200 - R$ 500</option>
                            <option value="500+">R$ 500+</option>
                        </select>
                    </div>
                </div>
            </div>

            <!-- Grid de Produtos -->
            <div id="productsGrid" class="products-grid">
                <!-- Produtos serão carregados aqui via JavaScript -->
            </div>
        </div>
    </div>

    <!-- Modal para Adicionar/Editar Produto -->
    <div id="productModal" class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <h3 class="modal-title" id="modalTitle">➕ Adicionar Produto</h3>
                <button id="closeModal" class="close-modal">✕</button>
            </div>
            <form id="productForm">
                <input type="hidden" id="productId">
                
                <div class="form-group">
                    <label for="productName">📝 Nome do Produto:</label>
                    <input type="text" id="productName" required placeholder="Ex: Perfume Árabe Luxo">
                </div>

                <div class="form-group">
                    <label for="productCategory">📂 Categoria:</label>
                    <select id="productCategory" required>
                        <option value="">Selecione uma categoria</option>
                        <option value="perfumes-arabes">Perfumes Árabes</option>
                        <option value="perfumes-importados">Perfumes Importados</option>
                        <option value="perfumes-brand">Perfumes Brand</option>
                        <option value="relogios-prova-agua">Relógios à Prova de Água</option>
                        <option value="relogios-importados">Relógios Importados</option>
                        <option value="relogios-original">Relógios Original</option>
                        <option value="bobobjacos">Bobobjacos</option>
                        <option value="blusas">Blusas</option>
                        <option value="jaquetas">Jaquetas</option>
                        <option value="tenis-importado-china">Tênis Importado China</option>
                        <option value="tenis-original">Tênis Original</option>
                        <option value="tenis-premium">Tênis Premium</option>
                        <option value="tenis-vietnam">Tênis Vietnam</option>
                        <option value="oculos-importados">Óculos Importados</option>
                        <option value="camisa-time-importada">Camisa de Time Importada</option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="productDescription">📄 Descrição:</label>
                    <textarea id="productDescription" rows="4" required placeholder="Descreva o produto detalhadamente..."></textarea>
                </div>

                <div class="form-group">
                    <label for="productPrice">💰 Preço (R$):</label>
                    <input type="number" id="productPrice" step="0.01" min="0" required placeholder="0.00">
                </div>

                <div class="form-group">
                    <label>🖼️ Imagem do Produto:</label>
                    <div class="image-upload" id="imageUpload">
                        <div class="upload-text">📁 Clique ou arraste uma imagem aqui</div>
                        <div class="upload-subtext">Formatos aceitos: JPG, PNG, GIF (máx. 5MB)</div>
                        <input type="file" id="productImage" accept="image/*" style="display: none;">
                    </div>
                    <div id="imagePreview" class="hidden">
                        <img id="previewImg" style="max-width: 200px; border-radius: 10px; margin-top: 10px;">
                    </div>
                </div>

                <div class="form-group">
                    <label for="productVideo">🎥 URL do Vídeo (opcional):</label>
                    <input type="url" id="productVideo" placeholder="https://youtube.com/watch?v=...">
                </div>

                <div class="form-group">
                    <button type="submit" class="btn btn-primary">💾 Salvar Produto</button>
                    <button type="button" id="cancelBtn" class="btn btn-secondary">❌ Cancelar</button>
                </div>
            </form>
        </div>
    </div>

    <script src="admin.js"></script>
</body>
</html>
