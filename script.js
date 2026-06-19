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

card.querySelector(".add-btn")
.addEventListener("click", () => addToCart(product));

menuContainer.appendChild(card);

});

});

function addToCart(product){

const existing = cart.find(
item => item.name === product.name
);

if(existing){

existing.qty++;

}else{

cart.push({
...product,
qty:1
});

}

renderCart();

}

function renderCart(){

cartItemsContainer.innerHTML = "";

let total = 0;

cart.forEach(item => {

const lineTotal = item.price * item.qty;

total += lineTotal;

const row = document.createElement("div");

row.classList.add("cart-item");

row.innerHTML = `

<div class="cart-left">

<strong>${item.name}</strong>

<div class="qty-controls">

<button onclick="decreaseQty('${item.name}')">−</button>

<span>${item.qty}</span>

<button onclick="increaseQty('${item.name}')">+</button>

</div>

</div>

<div>

₹${lineTotal}

</div>

`;

cartItemsContainer.appendChild(row);

});

totalElement.textContent = total;

}

totalElement.textContent = total;

}

});
