document.addEventListener("DOMContentLoaded", () => {

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
<button class="add-btn">Add To Cart</button>
`;

card.querySelector(".add-btn").addEventListener("click", () => {
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

total += Number(item.price);

const row = document.createElement("div");

row.classList.add("cart-item");

row.innerHTML = `
<span>${item.name}</span>
<span>₹${item.price}</span>
`;

cartItemsContainer.appendChild(row);

});

totalElement.textContent = total;

}

});
