// -------------------------------------- عرض التحمييل---------------------------


window.addEventListener('load', function(){
    
    setTimeout(function(){

        document.getElementById('loading-overlay').style.display='none'
    } , 1000)
})
// -------------AOS------------------
AOS.init();

// ------------------------------------------------ended--------------------------

    
    // Shopping Cart 
let cartItems = [];
let cartTotal = 0;

function initCart() {
    loadCart();
    updateCartDisplay();
    bindCartEvents();
}

function bindCartEvents() {
    const cartIcon = document.getElementById('cart-icon');
    const cartSidebar = document.getElementById('cart-sidebar');
    const closeCart = document.getElementById('close-cart');
    if (cartIcon && cartSidebar && closeCart) {
        cartIcon.addEventListener('click', (e) => {
            e.preventDefault();
            cartSidebar.classList.add('active');
        });
        closeCart.addEventListener('click', () => {
            cartSidebar.classList.remove('active');
        });
    }
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-to-cart')) {
            const productId = e.target.dataset.id;
            const productName = e.target.dataset.name;
            const productPrice = parseFloat(e.target.dataset.price);
            const productDate = e.target.dataset.date;
            addItemToCart(productId, productName, productPrice, productDate);
        }
    });
    const checkoutBtn = document.querySelector('.btn-checkout');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            checkoutCart();
        });
    }
}

function addItemToCart(id, name, price, date) {
    const existingItem = cartItems.find(item => item.id === id);
    if (existingItem) {
        // existingItem.quantity += 1;
        alert(' فوووق كده المنتج موجود ف السله ')
    } else {
        cartItems.push({
            id: id,
            name: name,
            price: price,
            date: date,
            quantity: 1
        });
        updateCart();
        showCartNotification(`${name} added to cart!`);
    }
}

function removeItemFromCart(id) {
    cartItems = cartItems.filter(item => item.id !== id);
    updateCart();
}

function updateCartQuantity(id, quantity) {
    const item = cartItems.find(item => item.id === id);
    if (item) {
        item.quantity = Math.max(0, quantity);
        if (item.quantity === 0) {
            removeItemFromCart(id);
        } else {
            updateCart();
        }
    }
}

function updateCart() {
    cartTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    saveCart();
    updateCartDisplay();
}

function updateCartDisplay() {
    const cartItemsDiv = document.getElementById('cart-items');
    const cartCount = document.querySelector('.cart-count');
    const totalAmount = document.querySelector('.total-amount');
    if (!cartItemsDiv || !cartCount || !totalAmount) return;
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    if (cartItems.length === 0) {
        cartItemsDiv.innerHTML = '<p style="text-align: center; color: #64748b; padding: 2rem;">Your cart is empty!!</p>';
    } else {
        cartItemsDiv.innerHTML = cartItems.map(item => `
            <div class="cart-item">
                <img src="./images/imagess/product-${item.id}-xs.jpg" alt="${item.name}" onerror="this.src='./images/imagess/product-1-xs.jpg'">
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <p class="cart-item-price">$${item.price.toFixed(2)}</p>
                    <small style="color: #94a3b8; font-size: 0.75rem;">Added: </small>
                    <div class="quantity-controls">
                        <button onclick="cart.updateQuantity('${item.id}', ${item.quantity - 1})">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="cart.updateQuantity('${item.id}', ${item.quantity + 1})">+</button>
                    </div>
                </div>
                <button onclick="cart.removeItem('${item.id}')" style="background: none; border: none; color: #ef4444; cursor: pointer;">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `).join('');
    }
    totalAmount.textContent = `$${cartTotal.toFixed(2)}`;
}


function saveCart() {
    localStorage.setItem('cart', JSON.stringify({
        items: cartItems,
        total: cartTotal
    }));
}

function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        const cartData = JSON.parse(savedCart);
        cartItems = cartData.items || [];
        cartTotal = cartData.total || 0;
    }
}

function checkoutCart() {
    if (cartItems.length === 0) {
        alert('Your cart is empty!! ' );
        return;
    }
    const orderSummary = cartItems.map(item => `${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`).join('\n');
    alert(`Order:\n${orderSummary}\n\nTotal: $${cartTotal.toFixed(2)}\n\nThank you for your purchase!`);
    cartItems = [];
    cartTotal = 0;
    updateCart();
    const cartSidebar = document.getElementById('cart-sidebar');
    if (cartSidebar) {
        cartSidebar.classList.remove('active');
    }
}

function showCartNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #10b981;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 10001;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 2000);
}

// Expose cart
window.cart = {
    addItem: addItemToCart,
    removeItem: removeItemFromCart,
    updateQuantity: updateCartQuantity
};

// Mobile Rosponsive
function initMobileNavigation() {
    $('.mobile-menu-btn').click(() => {
        $('.nav-menu').fadeToggle()
    
    }) 
}
// Newsletter Form
function initNewsletterForm() {
    const form = document.querySelector('.newsletter-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = form.querySelector('input[type="email"]').value;
            if (email) {
                alert('شكرا لك علي الاشتراك يصدّيقي');
                form.reset();
            }
        });
    }
}


// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initCart();
    initMobileNavigation();
    initNewsletterForm();
    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .filter-btn {
            padding: 0.5rem 1rem;
            border: 1px solid var(--border-color);
            background: white;
            border-radius: var(--radius-md);
            cursor: pointer;
            transition: all 0.3s ease;
            font-weight: 500;
        }
        
        .filter-btn:hover {
            background: var(--primary-color);
            color: white;
            border-color: var(--primary-color);
        }
        
        .filter-btn.active {
            background: var(--primary-color);
            color: white;
            border-color: var(--primary-color);
        }
        
        @media (max-width: 768px) {
            .nav-menu {
                position: fixed;
                top: 100%;
                left: 0;
                width: 100%;
                background: var(--bg-dark);
                flex-direction: column;
                padding: 2rem;
                transform: translateY(-100%);
                transition: transform 0.3s ease;
                z-index: 1000;
                  display: flex;
                align-items: center;
                gap: 20px;
                margin-bottom: 0.75rem;
            }
            
            .nav-menu.active {
                transform: translateY(0);
            }
            
            .dropdown-menu {
              display: flex;
                align-items: center;
                gap: 20px;
                margin-bottom: 0.75rem;
                position: static;
                opacity: 1;
                visibility: visible;
                transform: none;
                background: rgba(255, 255, 255, 0.1);
                margin-top: 0;
                margin-left: 1rem;
                border-radius: var(--radius-sm);
                display: none;
            }
            
            .dropdown-menu.active {
                display: block;
            }
            
            .dropdown-menu a {
                color: white;
                padding: 0.5rem 1rem;
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            }
            
            .dropdown-menu a:hover {
                background-color: rgba(255, 255, 255, 0.1);
                color: var(--accent-color);
                padding-left: 1.5rem;
            }
        }
    `;
    document.head.appendChild(style);
}); 