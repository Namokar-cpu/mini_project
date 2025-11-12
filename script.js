/**
 * SemiconTech Website - script.js
 * Contains general client-side functionality.
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Highlight the Active Navigation Link
    // Get all navigation links in the main navbar
    const navLinks = document.querySelectorAll('.nav-links a');
    const currentPath = window.location.pathname.split('/').pop(); // Get the current page filename (e.g., "index.html")

    navLinks.forEach(link => {
        // Get the link's href filename
        const linkPath = link.getAttribute('href').split('/').pop();

       
        if (linkPath === currentPath || (currentPath === '' && linkPath === 'index.html')) {
            // Apply a class to highlight the active link
            link.classList.add('active-nav-link');
        }
    });

    // 2. Smooth Scroll for "Back to top" button
    const backToTopLink = document.querySelector('.back-to-top');

    if (backToTopLink) {
        backToTopLink.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default hash behavior
            window.scrollTo({
                top: 0,
                behavior: 'smooth' 
            });
        });
    }

   
    const addToCartButtons = document.querySelectorAll('.card .buttons');
    
    addToCartButtons.forEach(button => {
        if (button.textContent.trim() === 'Add to Cart') {
            button.addEventListener('click', () => {
                const productTitle = button.closest('.card').querySelector('h3').textContent;
                // alert(`"${productTitle}" has been added to your simulated cart! (Functionality not fully implemented)`);
            });
        }
    });

    
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Stop the form from actually submitting
            alert('Thank you for your message! We will get back to you soon. (Simulated Submission)');
            
            contactForm.reset();
        });
    }

    
});

//.......................

/**
 * SemiconTech Enhanced Cart System - script.js

 */

document.addEventListener("DOMContentLoaded", () => {
  const cartKey = "semicontech_cart";
  const addButtons = document.querySelectorAll(".add-to-cart");
  const cartContainer = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  const clearCartBtn = document.getElementById("clear-cart");

  // --- Load Cart from localStorage ---
  function loadCart() {
    const saved = localStorage.getItem(cartKey);
    return saved ? JSON.parse(saved) : [];
  }

  // --- Save Cart to localStorage ---
  function saveCart(cart) {
    localStorage.setItem(cartKey, JSON.stringify(cart));
  }

  // --- Add Item to Cart ---
  function addToCart(item) {
    let cart = loadCart();
    const existing = cart.find(p => p.name === item.name);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...item, quantity: 1 });
    }
    saveCart(cart);
    alert(`${item.name} added to cart!`);
  }

  // --- Remove Item from Cart ---
  function removeFromCart(index) {
    let cart = loadCart();
    cart.splice(index, 1);
    saveCart(cart);
    renderCart();
  }

  // --- Clear Cart ---
  function clearCart() {
    localStorage.removeItem(cartKey);
    renderCart();
  }

  // --- Render Cart Page ---
  function renderCart() {
    if (!cartContainer) return; 
    const cart = loadCart();
    cartContainer.innerHTML = "";

    if (cart.length === 0) {
      cartContainer.innerHTML = "<p>Your cart is empty.</p>";
      if (cartTotal) cartTotal.textContent = "Total: ₹0";
      return;
    }

    let total = 0;
    cart.forEach((item, index) => {
      total += item.price * item.quantity;
      const div = document.createElement("div");
      div.classList.add("cart-item");
      div.innerHTML = `
        <div class="cart-row">
          <img src="${item.img}" alt="${item.name}" width="80">
          <div class="cart-info">
            <h4>${item.name}</h4>
            <p>Price: ₹${item.price}</p>
            <p>Quantity: ${item.quantity}</p>
          </div>
          <button class="btn btn-danger" data-index="${index}">Remove</button>
        </div>
      `;
      cartContainer.appendChild(div);
    });

    if (cartTotal) cartTotal.textContent = `Total: ₹${total}`;
    document.querySelectorAll(".btn-danger").forEach(btn => {
      btn.addEventListener("click", e => {
        const i = e.target.getAttribute("data-index");
        removeFromCart(i);
      });
    });
  }

  // --- Event: Add to Cart on Products Page ---
  addButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const card = btn.closest(".card");
      const item = {
        name: card.dataset.name,
        price: parseInt(card.dataset.price),
        img: card.dataset.img,
      };
      addToCart(item);
    });
  });


  if (clearCartBtn) {
    clearCartBtn.addEventListener("click", () => {
      if (confirm("Are you sure you want to clear your cart?")) clearCart();
    });
  }


  renderCart();
});



