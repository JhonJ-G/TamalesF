// Este archivo maneja la selección de productos, envío de datos del usuario y generación de un enlace de WhatsApp para pedidos.

document.addEventListener('DOMContentLoaded', function() {
    const tamalePrice = 10000; // Precio fijo por tamal
    const cart = []; // Carrito de compras

    // Función para agregar productos al carrito
    window.addToCart = function(productName, price) {
        cart.push({ name: productName, price });
        alert(`${productName} ha sido agregado al carrito.`);
    };

    // Función para enviar el pedido
    window.submitOrder = function() {
        const userName = document.getElementById('name').value;
        const userPhone = document.getElementById('phone').value;

        if (cart.length === 0) {
            alert('El carrito está vacío. Por favor, agrega productos antes de enviar el pedido.');
            return;
        }

        if (!userName || !userPhone) {
            alert('Por favor, completa todos los campos del formulario.');
            return;
        }

        // Calcular el total del pedido
        const totalPrice = cart.reduce((total, item) => total + item.price, 0);

        // Crear el mensaje para WhatsApp
        const productList = cart.map(item => `- ${item.name}: $${item.price}`).join('\n');
        const message = `Hola, me gustaría realizar el siguiente pedido:\n${productList}\n\nTotal: $${totalPrice}\n\nMi nombre es ${userName} y mi número de teléfono es ${userPhone}.`;
        const whatsappLink = `https://wa.me/3022328933?text=${encodeURIComponent(message)}`;

        // Redirigir a WhatsApp
        window.open(whatsappLink, '_blank');
    };
});