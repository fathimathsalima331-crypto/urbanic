let cart = JSON.parse(localStorage.getItem("urbaneCart")) || [];

/* ---------------- CART TOGGLE ---------------- */
function toggleCart() {
  document.getElementById("cartDrawer").classList.toggle("open");
  document.querySelector(".cart-overlay").classList.toggle("show");
  document.body.classList.toggle("cart-open");
}

/* ---------------- ADD TO CART ---------------- */
function addToCart(name, price) {
  const existing = cart.find(item => item.name === name);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ name, price, qty: 1 });
  }

  saveCart();
  updateCart();
  toggleCart();
}

/* ---------------- UPDATE CART ---------------- */
function updateCart() {
  const cartItems = document.getElementById("cartItems");
  const cartCount = document.getElementById("cartCount");
  const cartTotal = document.getElementById("cartTotal");

  cartItems.innerHTML = "";
  let total = 0;
  let count = 0;

  cart.forEach((item, index) => {
    total += item.price * item.qty;
    count += item.qty;

    cartItems.innerHTML += `
      <div class="cart-item">
        <div class="cart-item-info">
          <strong>${item.name}</strong>
          <p>₹${item.price} × ${item.qty}</p>
        </div>
        <div class="cart-actions">
          <button onclick="changeQty(${index}, -1)">−</button>
          <button onclick="changeQty(${index}, 1)">+</button>
          <button class="remove" onclick="removeItem(${index})">×</button>
        </div>
      </div>
    `;
  });

  cartCount.innerText = count;
  cartTotal.innerText = total;
}

/* ---------------- CHANGE QTY ---------------- */
function changeQty(index, change) {
  cart[index].qty += change;

  if (cart[index].qty <= 0) {
    cart.splice(index, 1);
  }

  saveCart();
  updateCart();
}

/* ---------------- REMOVE ITEM ---------------- */
function removeItem(index) {
  cart.splice(index, 1);
  saveCart();
  updateCart();
}

/* ---------------- CHECKOUT ---------------- */
function checkout() {
  if (cart.length === 0) {
    alert("Your bag is empty");
    return;
  }

  alert("Checkout demo ✨\nIntegrate Razorpay / Stripe later");
}

/* ---------------- STORAGE ---------------- */
function saveCart() {
  localStorage.setItem("urbaneCart", JSON.stringify(cart));
}

/* ---------------- INIT ---------------- */
updateCart();
