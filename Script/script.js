// Este archivo maneja la selección de productos, envío de datos del usuario y generación de un enlace de WhatsApp para pedidos.

document.addEventListener('DOMContentLoaded', function () {
    const cart = []; // Carrito de compras

    // Función para agregar productos al carrito
    window.addToCart = function (productName, price) {
        if (!productName || price <= 0) {
            console.error('Producto inválido o precio incorrecto.');
            return;
        }

        const existingProduct = cart.find(item => item.name === productName);
        if (existingProduct) {
            existingProduct.quantity += 1; // Incrementar cantidad si ya existe
        } else {
            cart.push({ name: productName, price, quantity: 1 }); // Agregar nuevo producto
        }
        updateCartSidebar();
    };

    // Función para actualizar el contenido del carrito en el sidebar
    function updateCartSidebar() {
        const cartItems = document.getElementById('cart-items');
        const cartTotal = document.getElementById('cart-total');
        cartItems.innerHTML = ''; // Limpia la lista de productos

        if (cart.length === 0) {
            cartItems.innerHTML = '<p>El carrito está vacío.</p>';
            cartTotal.textContent = 'Total: $0';
            return;
        }

        let total = 0;
        cart.forEach((item, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                ${item.name} - $${item.price}
                <div>
                    <input type="number" min="1" value="${item.quantity}" onchange="updateQuantity(${index}, this.value)">
                    <button onclick="removeFromCart(${index})">Eliminar</button>
                </div>
            `;
            cartItems.appendChild(li);
            total += item.price * item.quantity;
        });

        cartTotal.textContent = `Total: $${total}`;
    }

    // Función para actualizar la cantidad desde el campo de entrada
    window.updateQuantity = function (index, value) {
        const quantity = parseInt(value, 10);
        if (quantity > 0) {
            cart[index].quantity = quantity;
        } else {
            cart.splice(index, 1); // Eliminar producto si la cantidad es 0 o inválida
        }
        updateCartSidebar();
    };

    // Función para eliminar un producto del carrito
    window.removeFromCart = function (index) {
        cart.splice(index, 1); // Eliminar producto
        updateCartSidebar();
    };

    // Función para enviar el pedido
    window.submitOrder = function () {
        if (cart.length === 0) {
            alert('El carrito está vacío. Por favor, agrega productos antes de enviar el pedido.');
            return;
        }

        const userName = document.getElementById('name').value;
        const userPhone = document.getElementById('phone').value;
        const userAddress = document.getElementById('address').value;
        const paymentMethod = document.getElementById('payment-method').value;

        if (!userName || !userPhone || !userAddress || !paymentMethod) {
            alert('Por favor, completa todos los campos del formulario.');
            return;
        }

        // Calcular el total del pedido
        const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

        // Crear el mensaje para WhatsApp
        const productList = cart.map(item => `- ${item.name}: $${item.price} x ${item.quantity}`).join('\n');
        const message = `Hola, me gustaría realizar el siguiente pedido:\n${productList}\n\nTotal: $${totalPrice}\n\nMi nombre es ${userName}, mi número de teléfono es ${userPhone}, mi dirección es ${userAddress}, y mi método de pago es ${paymentMethod}.`;
        const whatsappLink = `https://wa.me/3117434565?text=${encodeURIComponent(message)}`;

        // Redirigir a WhatsApp
        window.open(whatsappLink, '_blank');
    };
});