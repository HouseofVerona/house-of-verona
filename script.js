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

})
.catch(error => {
console.error("Menu loading error:", error);
});

function addToCart(product){

const existingItem = cart.find(
item => item.name === product.name
);

if(existingItem){

existingItem.qty++;

}else{

cart.push({
...product,
qty: 1
});

}

renderCart();

}

function increaseQty(name){

const item = cart.find(
p => p.name === name
);

if(item){

item.qty++;
renderCart();

}

}

function decreaseQty(name){

const item = cart.find(
p => p.name === name
);

if(item){

item.qty--;

if(item.qty <= 0){

cart = cart.filter(
p => p.name !== name
);

}

renderCart();

}

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

<button class="minus-btn">−</button>

<span>${item.qty}</span>

<button class="plus-btn">+</button>

</div>
</div>

<div>
₹${lineTotal}
</div>
`;

row.querySelector(".plus-btn").addEventListener("click", () => {
increaseQty(item.name);
});

row.querySelector(".minus-btn").addEventListener("click", () => {
decreaseQty(item.name);
});

cartItemsContainer.appendChild(row);

});

totalElement.textContent = total;

}

});

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

})
.catch(error => {
console.error("Menu loading error:", error);
});

function addToCart(product){

const existingItem = cart.find(
item => item.name === product.name
);

if(existingItem){

existingItem.qty++;

}else{

cart.push({
...product,
qty: 1
});

}

renderCart();

}

function increaseQty(name){

const item = cart.find(
p => p.name === name
);

if(item){

item.qty++;
renderCart();

}

}

function decreaseQty(name){

const item = cart.find(
p => p.name === name
);

if(item){

item.qty--;

if(item.qty <= 0){

cart = cart.filter(
p => p.name !== name
);

}

renderCart();

}

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

<button class="minus-btn">−</button>

<span>${item.qty}</span>

<button class="plus-btn">+</button>

</div>
</div>

<div>
₹${lineTotal}
</div>
`;

row.querySelector(".plus-btn").addEventListener("click", () => {
increaseQty(item.name);
});

row.querySelector(".minus-btn").addEventListener("click", () => {
decreaseQty(item.name);
});

cartItemsContainer.appendChild(row);

});

totalElement.textContent = total;

}

});
