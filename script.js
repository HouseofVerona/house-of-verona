const menuContainer = document.getElementById("menu-container");

const cartItemsContainer = document.getElementById("cart-items");

const totalElement = document.getElementById("cart-total");

let cart = [];

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

const button = card.querySelector("button");

button.addEventListener("click", () => {
addToCart(product);
});

menuContainer.appendChild(card);

});

});

function addToCart(product){

cart.push(product);

renderCart();

}

function renderCart(){

cartItemsContainer.innerHTML = "";

let total = 0;

cart.forEach(item => {

total += item.price;

const div = document.createElement("div");

div.classList.add("cart-item");

div.innerHTML = `
<span>${item.name}</span>
<span>₹${item.price}</span>
`;

cartItemsContainer.appendChild(div);

});

totalElement.textContent = total;

}
