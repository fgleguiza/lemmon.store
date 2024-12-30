async function getProducts() {
    const response = await fetch('https://api.escuelajs.co/api/v1/products/?categoryId=1');
    const data = await response.json();
    return data;
}

async function displayProducts() {
    const productosContainer = document.getElementById('productosContainer');
    if (productosContainer) {
        const products = await getProducts();
        let item = '';
        products.forEach((element, index) => {
            const imageUrl = element.images[0];
            item += `
                <div class="target-producto col-5">
                    <img src="${imageUrl} alt="${element.title}"
                        alt="">
                    <p>Precio : $${element.price}</p>
                    <button class="addStorage" data-id="${index}">AGREGAR AL CARRITO</button>
                </div>`;
        });
        productosContainer.innerHTML += item;

        document.querySelectorAll('.addStorage').forEach(button => {
            button.addEventListener('click', (e) => {
                const productId = e.target.getAttribute('data-id');
                addToCart(products[productId]);
            });
        });
    }
}


function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${product.title} ha sido añadido al carrito.`);
}



function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter((item, index) => index !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
}


function displayCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartContainer = document.getElementById('tbody');
    if (cartContainer) {
        cartContainer.innerHTML = '';
        cart.forEach((item, index) => {
            console.log(item);
            const imageUrl = item.images[0];
            cartContainer.innerHTML += `
                    <tr>
                    <th scope="row">1</th>
                      <td> <img src="${imageUrl} alt="${item.title}"</td>
                        <td>${item.title}</td>
                        <td>$  ${item.price}</td>
                        <td><button class="removeItem" data-id="${index}">Eliminar</button></td>
                    </tr>
                `;
        });

        document.querySelectorAll('.removeItem').forEach(button => {
            button.addEventListener('click', (e) => {
                const productId = e.target.getAttribute('data-id');
                removeFromCart(parseInt(productId));
                displayCart();
            });
        });

    }
}




async function displayProductsIndex() {
    const containerItemIndex = document.getElementById('containerItemIndex')
    if (containerItemIndex) {
        const productsIndex = await getProducts();
        const keys = Object.keys(productsIndex);
        let i = 0;
        let item = '';
        while (i < 4) {
            const key = keys[i];
            const element = productsIndex[key];
            console.log(element);
            const imageUrl = element.images[0];
            item += `
            <div class="target-producto col-3">
                <img src="${imageUrl} alt="${element.title}"
                    alt="">
                <p>Precio : $${element.price}</p>
                <a href="./page/productos.html">VER PRODUCTOS</a>
            </div>`
            i++;
        }
        containerItemIndex.innerHTML += item;
    }

}

displayProducts();
displayProductsIndex();
displayCart();



