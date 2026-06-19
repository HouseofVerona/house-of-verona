const WHATSAPP_NUMBER = "918799817395";
document.addEventListener("DOMContentLoaded", () => {
const menuContainer = document.getElementById("menu-container"); const cartItemsContainer = document.getElementById("cart-items"); const totalElement = document.getElementById("cart-total"); const checkoutBtn = document.getElementById("checkout-btn");
let cart = [];
fetch("data/menu.json") .then(response => response.json()) .then(products => {
products.forEach(product => {
const card = document.createElement("div");
card.classList.add("product-card");
card.innerHTML = ` 
�
${product.name}
₹${product.price}
Add To Cart `;
card.querySelector(".add-btn").addEventListener("click", () => { addToCart(product); });
menuContainer.appendChild(card);
});
});
function addToCart(product){
const existingItem = cart.find( item => item.name === product.name );
if(existingItem){
existingItem.qty++;
}else{
cart.push({ ...product, qty:1 });
}
renderCart();
}
function increaseQty(name){
const item = cart.find( p => p.name === name );
if(item){
item.qty++; renderCart();
}
}
function decreaseQty(name){
const item = cart.find( p => p.name === name );
if(item){
item.qty--;
if(item.qty <= 0){
cart = cart.filter( p => p.name !== name );
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
�

${item.name}
�

−
${item.qty}
+
�

�

�
₹${lineTotal} 
`;
row.querySelector(".plus-btn").addEventListener("click", () => { increaseQty(item.name); });
row.querySelector(".minus-btn").addEventListener("click", () => { decreaseQty(item.name); });
cartItemsContainer.appendChild(row);
});
totalElement.textContent = total;
}
checkoutBtn.addEventListener("click", () => {
const customerName = document.getElementById("customer-name").value.trim();
const customerMobile = document.getElementById("customer-mobile").value.trim();
const orderType = document.getElementById("order-type").value;
if(customerName === ""){
alert("Please enter your name"); return;
}
if(customerMobile === ""){
alert("Please enter mobile number"); return;
}
if(cart.length === 0){
alert("Your cart is empty"); return;
}
let message = `☕ HOUSE OF VERONA ORDER
Name: ${customerName}
Mobile: ${customerMobile}
Order Type: ${orderType}
---------------------\n`;
let total = 0;
cart.forEach(item => {
const itemTotal = item.price * item.qty;
total += itemTotal;
message += ${item.name} x${item.qty} = ₹${itemTotal}\n;
});
message += `\n---------------------
TOTAL = ₹${total}
Luxury in Every Sip.`;
const whatsappURL = https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)};
window.open(whatsappURL, "_blank");
});
});
