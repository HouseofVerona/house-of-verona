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

const checkoutBtn = document.getElementById("checkout-btn");

checkoutBtn.addEventListener("click", async () => {

const customerName =
document.getElementById("customer-name").value.trim();

const customerMobile =
document.getElementById("customer-mobile").value.trim();

const orderType =
document.getElementById("order-type").value;

if(customerName === ""){
alert("Please enter your name");
return;
}

if(customerMobile === ""){
alert("Please enter mobile number");
return;
}

if(cart.length === 0){
alert("Your cart is empty");
return;
}

let total = 0;

let message =
`☕ HOUSE OF VERONA ORDER

Name: ${customerName}

Mobile: ${customerMobile}

Order Type: ${orderType}

---------------------

`;

cart.forEach(item => {

const lineTotal = item.price * item.qty;

total += lineTotal;

message +=
`${item.name} x${item.qty} = ₹${lineTotal}\n`;

});

message += `

---------------------

TOTAL = ₹${total}

Luxury in Every Sip.
`;

const whatsappURL =
`https://wa.me/918799817395?text=${encodeURIComponent(message)}`;

if(orderType === "Dine In"){

window.open(whatsappURL, "_blank");
return;

}

try {

const response = await fetch(
"https://hov-backend.houseofverona.workers.dev/create-order",
{
method: "POST",
headers: {
"Content-Type": "application/json"
},
body: JSON.stringify({
amount: total
})
}
);

const order = await response.json();

const options = {

key: "rzp_live_T3bRWO413Cvs1R",

amount: order.amount,

currency: "INR",

name: "House of Verona",

description: "Takeaway Order",

order_id: order.id,

handler: function () {

window.open(
whatsappURL,
"_blank"
);

},

theme: {
color: "#C8A96B"
}

};

const rzp = new Razorpay(options);

rzp.open();

}
catch(error){

alert(
"Payment system unavailable. Please try again."
);

console.error(error);

}

});

});

