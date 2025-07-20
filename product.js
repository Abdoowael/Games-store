// Product Page JavaScript
//  start looding

window.addEventListener('load', function(){
    setTimeout(function(){

        document.getElementById('loading-overlay').style.display='none'
    } , 1000)
})
// Aos
AOS.init();

// Procedural state variables
let currentQuantity = 1;
let selectedColor = 'black';

    // Image Gallery
function initImageGallery() {
        const thumbnails = document.querySelectorAll('.thumbnail');
        const mainImage = document.getElementById('main-product-image');

        thumbnails.forEach(thumbnail => {
            thumbnail.addEventListener('click', () => {
                thumbnails.forEach(t => t.classList.remove('active'));
                thumbnail.classList.add('active');
                const imageSrc = thumbnail.dataset.image;
                mainImage.src = imageSrc;
                mainImage.style.opacity = '0';
                setTimeout(() => {
                    mainImage.style.opacity = '1';
                }, 150);
            });
        });
    }

    // Tab Navigation
function initTabs() {
        const tabButtons = document.querySelectorAll('.tab-btn');
        const tabPanels = document.querySelectorAll('.tab-panel');

        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const targetTab = button.dataset.tab;
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabPanels.forEach(panel => panel.classList.remove('active'));
                button.classList.add('active');
                document.getElementById(targetTab).classList.add('active');
            });
        });
    }

    // Color Options
function initColorOptions() {
        const colorOptions = document.querySelectorAll('.color-option');
        colorOptions.forEach(option => {
            option.addEventListener('click', () => {
                colorOptions.forEach(o => o.classList.remove('active'));
                option.classList.add('active');
            selectedColor = option.dataset.color;
            showNotification(`Color changed to ${selectedColor}`);
            });
        });
    }

    // Quantity Controls
function initQuantityControls() {
        const quantityInput = document.getElementById('quantity-input');
        if (quantityInput) {
            quantityInput.addEventListener('change', (e) => {
                let value = parseInt(e.target.value);
                if (isNaN(value) || value < 1) {
                    value = 1;
                } else if (value > 10) {
                    value = 10;
                alert('كفايا 10 بس عشان الميزانية');
                }
            currentQuantity = value;
                e.target.value = value;
            });
        }
    }

    // Image Zoom
function initImageZoom() {
        const mainImage = document.querySelector('.main-image');
        const zoomOverlay = document.querySelector('.image-zoom-overlay');
        if (mainImage && zoomOverlay) {
            zoomOverlay.addEventListener('click', () => {
            showImageZoom(mainImage.querySelector('img').src);
            });
        }
    }

function showImageZoom(imageSrc) {
        const modal = document.createElement('div');
        modal.className = 'image-zoom-modal';
        modal.innerHTML = `
            <button class="zoom-close">&times;</button>
            <img src="${imageSrc}" alt="Product" class="zoom-image">
        `;
        document.body.appendChild(modal);
        setTimeout(() => {
            modal.classList.add('active');
        }, 10);
        const closeModal = () => {
            modal.classList.remove('active');
            setTimeout(() => {
                document.body.removeChild(modal);
            }, 300);
        };
        modal.querySelector('.zoom-close').addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    // Wishlist
function initWishlist() {
        const wishlistBtn = document.querySelector('.btn-wishlist');
        if (wishlistBtn) {
            wishlistBtn.addEventListener('click', () => {
                const icon = wishlistBtn.querySelector('i');
                if (icon.classList.contains('far')) {
                    icon.classList.remove('far');
                    icon.classList.add('fas');
                    wishlistBtn.style.background = 'var(--danger-color)';
                    wishlistBtn.style.color = 'white';
                    wishlistBtn.style.borderColor = 'var(--danger-color)';
                showNotification('Added to wishlist!');
                } 
            });
        }
    }

    // Utility Functions
function showNotification(message) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--success-color);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: var(--radius-md);
            box-shadow: var(--shadow-lg);
            z-index: 10001;
            animation: slideIn 0.3s ease;
            font-weight: 500;
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

function updateQuantity(change) {
    const input = document.getElementById('quantity-input');
    let currentValue = parseInt(input.value) || 1;
    let newValue = currentValue + change;
    if (newValue < 1){
        newValue = 1;
    }
    if (newValue > 10){
        newValue = 10;
        alert('كفايا 10 بس عشان الميزانية');
    } 
    input.value = newValue;
    currentQuantity = newValue;
}

function addToCart(productId = '1', productName = null, price = null, color = null, date = '2024-01-15') {
    // If called from the main product page button, get values from DOM
    if (!productName) {
        productName = document.querySelector('.product-header h1').textContent;
    }
    if (!price) {
        price = parseFloat(document.querySelector('.current-price').textContent.replace('$', ''));
    }
    if (!color) {
        color = selectedColor;
    }
    const quantity = currentQuantity;
    if (window.cart && typeof window.cart.addItem === 'function') {
        window.cart.addItem(productId, `${productName} (${color})`, price, date);
        if (quantity > 1) {
            for (let i = 1; i < quantity; i++) {
                window.cart.addItem(productId, `${productName} (${color})`, price, date);
            }
        }
        showNotification(`${quantity}x ${productName} added to cart!`);
    } else {
        alert('Cart functionality is not available. Please try again later.');
    }
}

function buyNow() {
    addToCart();
    setTimeout(() => {
        alert('Done يصدّيقي');
    }, 500);
}

function addToWishlist() {
    const wishlistBtn = document.querySelector('.btn-wishlist');
    if (wishlistBtn) {
        wishlistBtn.click();
    }
}

// Initialize when DOM is loaded
function initProductPage() {
    initImageGallery();
    initTabs();
    initColorOptions();
    initQuantityControls();
    initImageZoom();
    initWishlist();
}

document.addEventListener('DOMContentLoaded', () => {
    initProductPage();
 
}); 