


let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}


// 2) ADD TO CART (Menu Page)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           


const addButtons = document.querySelectorAll(".add");

addButtons.forEach(btn => {
    btn.addEventListener("click", function () {

        const name = this.dataset.name;
        const price = Number(this.dataset.price);


        const existing = cart.find(item => item.name === name && item.price === price);

        if (existing) {
            existing.qty = (existing.qty || 1) + 1;
        } else {
            cart.push({ name, price, qty: 1 });
        }

        saveCart();

        window.location.href = "order.html";
    });
});




const list = document.getElementById("cart-list");
const total = document.getElementById("cart-total");

function updateCartDisplay() {
    if (!list || !total) return;
    list.innerHTML = "";
    let sum = 0;

    cart.forEach((item, index) => {
        const li = document.createElement("li");

        li.innerHTML = `
            ${item.name} - ₹${item.price}
            <div>
                <button class="qty-btn minus" data-index="${index}">-</button>
                <span class="qty">${item.qty || 1}</span>
                <button class="qty-btn plus" data-index="${index}">+</button>
            </div>
        `;

        sum += item.price * (item.qty || 1);
        list.appendChild(li);
    });

    total.textContent = sum;
    saveCart();
}


cart = cart.map(item => ({ ...item, qty: item.qty || 1 }));


updateCartDisplay();



document.addEventListener("click", function (e) {
    if (!list) return;

    if (e.target.classList.contains("plus")) {
        const i = e.target.dataset.index;
        cart[i].qty++;
        updateCartDisplay();
    }


    if (e.target.classList.contains("minus")) {
        const i = e.target.dataset.index;

        if (cart[i].qty > 1) {
            cart[i].qty--;
        } else {

            cart.splice(i, 1);
        }
        updateCartDisplay();
    }
});

const checkoutBtn = document.getElementById("checkout-btn");

if (checkoutBtn) {
    checkoutBtn.addEventListener("click", function () {
        window.location.href = "receipt.html";
    });
}








