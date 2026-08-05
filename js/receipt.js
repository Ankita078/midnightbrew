let cart = JSON.parse(localStorage.getItem("cart")) || [];

const list = document.getElementById("receipt-items");
const subTotal = document.getElementById("sub-total");
const gstBox = document.getElementById("gst");
const grandTotalBox = document.getElementById("grand-total");

let subtotal = 0;

cart.forEach(item => {
    let li = document.createElement("li");
    li.innerHTML = `
        ${item.name} (x${item.qty}) 
        <span>₹${item.price * item.qty}</span>
    `;
    list.appendChild(li);

    subtotal += item.price * item.qty;
});

let gst = subtotal * 0.05;
let grandTotal = subtotal + gst;

subTotal.textContent = subtotal.toFixed(2);
gstBox.textContent = gst.toFixed(2);
grandTotalBox.textContent = grandTotal.toFixed(2);

// Clear cart AFTER printing
window.onafterprint = () => {
    localStorage.removeItem("cart");
};
