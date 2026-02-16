// ===========================
// menu.js – Royal Restaurant
// ===========================

// Load cart and customer info
let cart = JSON.parse(localStorage.getItem("cart") || "[]");
let customer = JSON.parse(localStorage.getItem("customerData") || "null");

// If no customer details → redirect
if (!customer) {
  window.location.href = "customerDetails.html";
}

// GREETING
document.addEventListener("DOMContentLoaded", () => {
  const g = document.getElementById("greeting");
  if (g && customer) {
    g.innerText = `Welcome, ${customer.name}! 🎉 (Table ${customer.table})`;
  }
});

// ===========================
// MENU DATA
// ===========================
const MENU_DATA = {
  "Main Course": [
    { name: "Paneer Butter Masala", price: 220, image: "paneer.jpg" },
    { name: "Chicken Biryani", price: 280, image: "biryani.jpg" },
    { name: "Dal Makhani", price: 180, image: "dal.jpg" },
    { name: "Rajma Chawal", price: 160, image: "rajma.jpg" },
    { name: "Palak Paneer", price: 210, image: "palak.jpg" },
    { name: "Chole Bhature", price: 150, image: "chole.jpg" },
    { name: "Mutton Curry", price: 350, image: "mutton.jpg" },
    { name: "Veg Pulao", price: 170, image: "pulao.jpg" },
    { name: "Tandoori Roti", price: 30, image: "roti.jpg" },
    { name: "Butter Naan", price: 50, image: "naan.jpg" }
  ],

  "Starters": [
    { name: "Spring Rolls", price: 120, image: "spring.jpg" },
    { name: "Paneer Tikka", price: 180, image: "tikka.jpg" },
    { name: "Chicken Tandoori", price: 250, image: "tandoori.jpg" },
    { name: "Veg Manchurian", price: 140, image: "manchurian.jpg" },
    { name: "French Fries", price: 100, image: "fries.jpg" },
    { name: "Onion Rings", price: 90, image: "onion.jpg" },
    { name: "Garlic Bread", price: 110, image: "garlic.jpg" },
    { name: "Cheese Balls", price: 150, image: "cheese.jpg" },
    { name: "Fish Fingers", price: 220, image: "fish.jpg" },
    { name: "Hara Bhara Kebab", price: 180, image: "kebab.jpg" }
  ],

  "Desserts": [
    { name: "Gulab Jamun", price: 80, image: "gulab.jpg" },
    { name: "Rasgulla", price: 90, image: "rasgulla.jpg" },
    { name: "Ice Cream", price: 100, image: "icecream.jpg" },
    { name: "Chocolate Cake", price: 150, image: "cake.jpg" },
    { name: "Brownie", price: 170, image: "brownie.jpg" },
    { name: "Cheesecake", price: 200, image: "cheese_cake.jpg" },
    { name: "Kheer", price: 120, image: "kheer.jpg" },
    { name: "Fruit Salad", price: 110, image: "fruit.jpg" },
    { name: "Donut", price: 90, image: "donut.jpg" },
    { name: "Ice-Cream Sundae", price: 180, image: "sundae.jpg" }
  ]
};

// ===========================
// RENDER MENU
// ===========================
function renderMenu() {
  const container = document.getElementById("menu");
  container.innerHTML = "";

  Object.keys(MENU_DATA).forEach(category => {
    const title = document.createElement("div");
    title.className = "category";
    title.innerText = category;
    container.appendChild(title);

    MENU_DATA[category].forEach(item => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <h3>${item.name}</h3>
        <p>₹${item.price}</p>
        <button class="addBtn" data-name="${item.name}" data-price="${item.price}">Add to Cart</button>
      `;
      container.appendChild(card);
    });
  });

  // add event listeners to buttons
  document.querySelectorAll(".addBtn").forEach(btn => {
    btn.addEventListener("click", () => {
      addToCart(
        btn.getAttribute("data-name"),
        Number(btn.getAttribute("data-price"))
      );
    });
  });
}

// ===========================
// CART LOGIC
// ===========================
function addToCart(name, price) {
  const item = cart.find(i => i.name === name);

  if (item) {
    item.qty += 1;
  } else {
    cart.push({ name, price, qty: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  showToast(`${name} added to cart`);
}

// Go to cart page
function goToCart() {
  window.location.href = "cart.html";
}

// ===========================
// TOAST MESSAGE
// ===========================
function showToast(message) {
  const toast = document.createElement("div");
  toast.innerText = message;
  toast.style = `
    position: fixed;
    bottom: 80px;
    right: 20px;
    background: rgba(0,0,0,0.8);
    color: #fff;
    padding: 10px 14px;
    border-radius: 10px;
    z-index: 9999;
    font-size: 14px;
  `;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 1600);
}

// Render menu on page load
document.addEventListener("DOMContentLoaded", renderMenu);
