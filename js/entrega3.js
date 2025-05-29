
      // Constantes del DOM
      const API_BASE = "https://fakestoreapi.com";
      const productContainer = document.getElementById("product-container");
      const categorySelect = document.getElementById("categorySelect");
      const searchInput = document.getElementById("searchInput");
      const cartElement = document.getElementById("cart");
      const totalElement = document.getElementById("total");
      const alertArea = document.getElementById("alert-area");
      const buyerName = document.getElementById("buyerName");
      const buyerEmail = document.getElementById("buyerEmail");

      // Variables principales
      let allProducts = []; // Array de productos
      let cart = JSON.parse(localStorage.getItem("cart")) || []; // Array de objetos en carrito

      // Promesa: Obtener categorías y poblar el select
      fetch(`${API_BASE}/products/categories`)
        .then(res => res.json())
        .then(categories => {
          categories.forEach(cat => {
            const option = document.createElement("option");
            option.value = cat;
            option.textContent = cat.charAt(0).toUpperCase() + cat.slice(1);
            categorySelect.appendChild(option);
          });
        });

      // Promesa: Obtener productos
      fetch(`${API_BASE}/products`)
        .then(res => res.json())
        .then(data => {
          allProducts = data; // Array
          renderProducts(allProducts);
        });

      // Eventos de filtro
      categorySelect.addEventListener("change", applyFilters);
      searchInput.addEventListener("input", applyFilters);

      function applyFilters() {
        const selected = categorySelect.value;
        const search = searchInput.value.toLowerCase();
        let filtered = allProducts;
        if (selected !== "all") filtered = filtered.filter(p => p.category === selected); // array.filter
        if (search) filtered = filtered.filter(p => p.title.toLowerCase().includes(search));
        renderProducts(filtered);
      }

      // Mostrar productos
      function renderProducts(products) {
        productContainer.innerHTML = "";
        products.forEach(product => {
          const col = document.createElement("div");
          col.className = "col-md-4 col-lg-3";
          const card = document.createElement("div");
          card.className = "card h-100 shadow-sm";
          card.innerHTML = `
            <img src="${product.image}" class="card-img-top product-img" alt="${product.title}">
            <div class="card-body d-flex flex-column">
              <h6 class="card-title">${product.title}</h6>
              <p class="card-text">$${product.price}</p>
            </div>
          `;
          const button = document.createElement("button");
          button.className = "btn btn-primary mt-auto";
          button.innerHTML = '<i class="bi bi-cart-plus"></i> Agregar al carrito';
          button.addEventListener("click", () => addToCart(product)); // función
          card.querySelector(".card-body").appendChild(button);
          col.appendChild(card);
          productContainer.appendChild(col);
        });
      }

      // Agregar producto al carrito
      function addToCart(product) {
        const found = cart.find(item => item.id === product.id); // objeto en array
        if (found) {
          found.qty++;
        } else {
          cart.push({ ...product, qty: 1 }); // objeto nuevo con propiedad qty
        }
        saveCart();
        showAlert('<i class="bi bi-check-circle-fill"></i> Producto agregado al carrito', "success", product);
      }

      // Guardar y actualizar carrito
      function saveCart() {
        localStorage.setItem("cart", JSON.stringify(cart)); // localStorage
        renderCart();
      }

      // Mostrar carrito
      function renderCart() {
        cartElement.innerHTML = "";
        let total = 0;
        if (cart.length === 0) {
          cartElement.innerHTML = '<p class="text-muted">El carrito está vacío.</p>';
        } else {
          cart.forEach(item => {
            total += item.price * item.qty;
            cartElement.innerHTML += `
              <div class="d-flex justify-content-between align-items-center mb-2">
                <div class="flex-grow-1">
                  <strong>${item.title}</strong><br>
                  $${item.price} x ${item.qty} = $${(item.price * item.qty).toFixed(2)}
                </div>
                <div class="btn-group">
                  <button class="btn btn-sm btn-outline-secondary" onclick="changeQty(${item.id}, -1)">
                    <i class="bi bi-dash"></i>
                  </button>
                  <button class="btn btn-sm btn-outline-secondary" onclick="changeQty(${item.id}, 1)">
                    <i class="bi bi-plus"></i>
                  </button>
                  <button class="btn btn-sm btn-outline-danger" onclick="removeItem(${item.id})">
                    <i class="bi bi-x-circle"></i>
                  </button>
                </div>
              </div>
            `;
          });
        }
        totalElement.textContent = total.toFixed(2);
      }

      // Cambiar cantidad de un producto
      function changeQty(productId, change) {
        const item = cart.find(p => p.id === productId);
        if (!item) return;
        item.qty += change;
        if (item.qty <= 0) {
          cart = cart.filter(p => p.id !== productId); // eliminar si qty = 0
          showAlert(`<i class="bi bi-dash-circle"></i> Producto eliminado del carrito`, "warning", item);
        }
        saveCart();
      }

      // Eliminar producto
      function removeItem(id) {
        const removedItem = cart.find(item => item.id === id);
        cart = cart.filter(item => item.id !== id);
        saveCart();
        showAlert('<i class="bi bi-trash3-fill"></i> Producto eliminado del carrito', "warning", removedItem);
      }

      // Vaciar carrito
      function clearCart() {
        const totalItems = cart.length;
        cart = [];
        saveCart();
        showAlert(`<i class="bi bi-x-octagon-fill"></i> Carrito vaciado (${totalItems} productos)`, "danger");
      }

      // Simular pago
      function simulatePayment() {
        const form = document.querySelector(".needs-validation");
        form.classList.add("was-validated");
        if (!form.checkValidity()) return;

        if (cart.length === 0) {
          showAlert('<i class="bi bi-exclamation-circle-fill"></i> El carrito está vacío', "danger");
          return;
        }

        const name = buyerName.value;
        const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0).toFixed(2);

        showAlert(`<i class="bi bi-check2-circle"></i> ¡Gracias ${name}! Pago realizado por $${total}.`, "success");
        cart = [];
        saveCart();
        buyerName.value = "";
        buyerEmail.value = "";
        bootstrap.Modal.getInstance(document.getElementById("cartModal")).hide();
      }

      // Mostrar alertas
      function showAlert(message, type = "info", product = null) {
        alertArea.innerHTML = "";
        let productInfo = "";
        if (product) productInfo = `<div class="small text-muted mt-1">• ${product.title} (x${product.qty || 1})</div>`;
        const alert = document.createElement("div");
        alert.className = `alert alert-${type} alert-dismissible fade show mt-2`;
        alert.innerHTML = `${message}${productInfo}
          <button type="button" class="btn-close" data-bs-dismiss="alert"></button>`;
        alertArea.appendChild(alert);
        setTimeout(() => {
          alert.classList.remove("show");
          alert.classList.add("fade");
          setTimeout(() => alert.remove(), 300);
        }, 4000);
      }

      // Inicializar carrito al cargar
      renderCart();
