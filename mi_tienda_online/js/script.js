// Datos de productos simulados
const productos = [
    { id: 1, nombre: "Zapatillas Nike Air Max", descripcion: "Zapatillas deportivas de alta calidad.", precio: 120.00, cantidad_disponible: 10 },
    { id: 2, nombre: "Zapatillas Adidas UltraBoost", descripcion: "Zapatillas cómodas para correr.", precio: 140.00, cantidad_disponible: 8 }
];

// Mostrar productos en la página principal
window.onload = function() {
    const listaProductos = document.getElementById("producto-lista");

    productos.forEach(producto => {
        const productoElemento = document.createElement("div");
        productoElemento.classList.add("producto");
        productoElemento.innerHTML = `
            <h3>${producto.nombre}</h3>
            <p>${producto.descripcion}</p>
            <p>Precio: $${producto.precio}</p>
            <button onclick="agregarAlCarrito(${producto.id})">Añadir al carrito</button>
        `;
        listaProductos.appendChild(productoElemento);
    });

    // Mostrar los productos en el carrito
    if (window.location.pathname.includes('carrito.html')) {
        const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        const carritoLista = document.getElementById('carrito-lista');
        let total = 0;

        // Mostrar los productos del carrito
        carrito.forEach(producto => {
            const productoElemento = document.createElement('div');
            productoElemento.classList.add('producto');
            productoElemento.innerHTML = `
                <h3>${producto.nombre}</h3>
                <p>Precio: $${producto.precio}</p>
            `;
            carritoLista.appendChild(productoElemento);
            total += producto.precio;
        });

        // Mostrar el total
        document.getElementById('total').innerText = total.toFixed(2);

        // Finalizar compra
        document.getElementById('finalizar-compra').addEventListener('click', function() {
            localStorage.removeItem('carrito');
            alert("Compra realizada. El carrito ha sido vaciado.");
            window.location.href = 'index.html'; // Redirigir a la tienda
        });
    }
};

// Función para agregar productos al carrito
function agregarAlCarrito(idProducto) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const producto = productos.find(p => p.id === idProducto);
    
    carrito.push(producto);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    alert("Producto añadido al carrito");
}
