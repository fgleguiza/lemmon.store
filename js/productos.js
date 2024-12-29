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
        console.log(element.images[0]);
        const imageUrl = element.images[0];
        item += `<div class="col-3">
                    <img loading="lazy" src="${imageUrl}" alt="${element.title}">
                </div>`;
    });
    productosContainer.innerHTML = item;
}

displayProducts();



