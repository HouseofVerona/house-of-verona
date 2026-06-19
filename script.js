let menuData = [];

async function loadMenu() {

const response = await fetch("data/menu.json");

menuData = await response.json();

displayMenu(menuData);

}

function displayMenu(items){

const menuContainer =
document.getElementById("menuContainer");

menuContainer.innerHTML = "";

items.forEach(item => {

let priceHTML = "";

if(item.sizes){

const firstPrice =
Object.values(item.sizes)[0];

priceHTML = `₹${firstPrice}+`;

}else{

priceHTML = `₹${item.price}`;

}

menuContainer.innerHTML += `

<div class="menu-card">

<img src="${item.image}" alt="${item.name}">

<div class="menu-info">

${item.bestseller ? '<div class="bestseller">⭐ Bestseller</div>' : ''}

<div class="menu-name">${item.name}</div>

<div class="menu-price">${priceHTML}</div>

<button
class="add-cart-btn"
onclick="addToCart('${item.name}')">
Add To Cart
</button>

</div>

</div>

`;

});

}

document.addEventListener("click", e => {

if(e.target.classList.contains("category-btn")){

document
.querySelectorAll(".category-btn")
.forEach(btn => btn.classList.remove("active"));

e.target.classList.add("active");

const category =
e.target.dataset.category;

if(category === "all"){

displayMenu(menuData);

}else{

const filtered =
menuData.filter(item =>
item.category === category);

displayMenu(filtered);

}

}

});

document
.getElementById("searchInput")
.addEventListener("input", function(){

const term =
this.value.toLowerCase();

const filtered =
menuData.filter(item =>
item.name.toLowerCase().includes(term));

displayMenu(filtered);

});

function addToCart(product){

alert(product + " added to cart");

}

loadMenu();
