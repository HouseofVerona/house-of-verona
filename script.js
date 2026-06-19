const menuContainer = document.getElementById("menu-container");

fetch("data/menu.json")
.then(response => response.json())
.then(products => {

products.forEach(product => {

const card = document.createElement("div");

card.classList.add("product-card");

card.innerHTML = `
<img src="${product.image}" alt="${product.name}">
<h3>${product.name}</h3>
<p>₹${product.price}</p>
<button>Add To Cart</button>
`;

menuContainer.appendChild(card);

});

});
