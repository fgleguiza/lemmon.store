async function getProducts() {
    const response = await fetch('https://api.escuelajs.co/api/v1/products/?categoryId=1');
    const data = await response.json();
    return data;
}

async function displayProducts() {
    const productosContainer = document.getElementById('productosContainer');
    const products = await getProducts();

    let item = '';
    products.forEach(element => {
        const imageUrl = element.images[0];
        item += `
            <div class="target-producto col-3">
                <img src="${imageUrl} alt="${element.title}"
                    alt="">
                <p>Precio : $${element.price}</p>
                <button>AGREGAR AL CARRITO</button>
            </div>`;
    });
    productosContainer.innerHTML = item;
}

displayProducts();



