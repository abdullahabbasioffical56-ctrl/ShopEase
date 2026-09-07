 // ShopEase Shopping Cart

let cart = JSON.parse(localStorage.getItem("cart")) || [];


// ==============================
// Add Product to Cart
// ==============================

function addToCart(name, price, image) {

    const existingProduct = cart.find(product => product.name === name);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({
            name: name,
            price: price,
            image: image,
            quantity: 1
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    alert(name + " added to cart!");

    displayCart();
    displayCheckout();
}


// ==============================
// Display Cart
// ==============================

function displayCart() {

    const cartItems = document.getElementById("cart-items");

    if (!cartItems) {
        return;
    }

    cartItems.innerHTML = "";

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <div class="cart-item">
                <h3>Your cart is empty.</h3>
            </div>
        `;

        updateTotal();
        return;
    }

    cart.forEach((product, index) => {

        const cartItem = document.createElement("div");

        cartItem.className = "cart-item";

        cartItem.innerHTML = `
            <div class="cart-product-image">
                <img
                    src="${product.image}"
                    alt="${product.name}"
                    style="width:100%; height:100%; object-fit:contain;"
                >
            </div>

            <div class="cart-product-info">
                <h3>${product.name}</h3>
                <p>Rs. ${product.price.toLocaleString()}</p>
            </div>

            <div class="quantity">

                <button onclick="decreaseQuantity(${index})">
                    -
                </button>

                <span>${product.quantity}</span>

                <button onclick="increaseQuantity(${index})">
                    +
                </button>

            </div>

            <button
                class="remove-btn"
                onclick="removeProduct(${index})">

                Remove

            </button>
        `;

        cartItems.appendChild(cartItem);
    });

    updateTotal();
}


// ==============================
// Increase Quantity
// ==============================

function increaseQuantity(index) {

    cart[index].quantity += 1;

    saveCart();
}


// ==============================
// Decrease Quantity
// ==============================

function decreaseQuantity(index) {

    if (cart[index].quantity > 1) {

        cart[index].quantity -= 1;

    } else {

        cart.splice(index, 1);

    }

    saveCart();
}


// ==============================
// Remove Product
// ==============================

function removeProduct(index) {

    cart.splice(index, 1);

    saveCart();
}


// ==============================
// Save Cart
// ==============================

function saveCart() {

    localStorage.setItem("cart", JSON.stringify(cart));

    displayCart();
    displayCheckout();
}


// ==============================
// Update Cart Total
// ==============================

function updateTotal() {

    let subtotal = 0;

    cart.forEach(product => {

        subtotal += product.price * product.quantity;

    });

    const delivery = cart.length > 0 ? 500 : 0;

    const total = subtotal + delivery;

    const subtotalElement =
        document.getElementById("subtotal");

    const deliveryElement =
        document.getElementById("delivery");

    const totalElement =
        document.getElementById("total");


    if (subtotalElement) {

        subtotalElement.textContent =
            "Rs. " + subtotal.toLocaleString();

    }

    if (deliveryElement) {

        deliveryElement.textContent =
            "Rs. " + delivery.toLocaleString();

    }

    if (totalElement) {

        totalElement.textContent =
            "Rs. " + total.toLocaleString();

    }
}


// ==============================
// Display Checkout
// ==============================

function displayCheckout() {

    const checkoutItems =
        document.getElementById("checkout-items");

    if (!checkoutItems) {
        return;
    }

    checkoutItems.innerHTML = "";

    if (cart.length === 0) {

        checkoutItems.innerHTML =
            `<p>Your cart is empty.</p>`;

        updateCheckoutTotal();

        return;
    }


    cart.forEach(product => {

        const item =
            document.createElement("div");

        item.className =
            "checkout-product";

        item.innerHTML = `
            <img
                src="${product.image}"
                alt="${product.name}"
            >

            <div class="checkout-product-info">

                <h4>${product.name}</h4>

                <p>
                    Quantity: ${product.quantity}
                </p>

                <p>
                    Price: Rs.
                    ${(product.price * product.quantity)
                    .toLocaleString()}
                </p>

            </div>
        `;

        checkoutItems.appendChild(item);

    });

    updateCheckoutTotal();
}


// ==============================
// Checkout Total
// ==============================

function updateCheckoutTotal() {

    let subtotal = 0;

    cart.forEach(product => {

        subtotal +=
            product.price * product.quantity;

    });

    const delivery =
        cart.length > 0 ? 500 : 0;

    const total =
        subtotal + delivery;


    const checkoutSubtotal =
        document.getElementById("checkout-subtotal");

    const checkoutTotal =
        document.getElementById("checkout-total");


    if (checkoutSubtotal) {

        checkoutSubtotal.textContent =
            "Rs. " + subtotal.toLocaleString();

    }

    if (checkoutTotal) {

        checkoutTotal.textContent =
            "Rs. " + total.toLocaleString();

    }
}


// ==============================
// Checkout
// ==============================

function checkout() {

    if (cart.length === 0) {

        alert("Your cart is empty!");

        return;
    }

    window.location.href = "checkout.html";
}


// ==============================
// Place Order
// ==============================

function placeOrder(event) {

    event.preventDefault();

    if (cart.length === 0) {

        alert("Your cart is empty!");

        return;
    }


    const name =
        document.getElementById("name").value;

    const phone =
        document.getElementById("phone").value;

    const address =
        document.getElementById("address").value;

    const payment =
        document.getElementById("payment").value;


    if (!name || !phone || !address || !payment) {

        alert("Please fill in all information.");

        return;
    }


    alert(
        "Order placed successfully! " +
        "Thank you, " +
        name +
        ". Your order will be processed soon."
    );


    cart = [];

    localStorage.removeItem("cart");

    window.location.href = "index.html";
}


// ==============================
// Search Products
// ==============================

function searchProducts() {

    const searchInput =
        document.getElementById("searchInput");

    if (!searchInput) {
        return;
    }


    const searchText =
        searchInput.value.toLowerCase();

    const products =
        document.querySelectorAll(".product-card");


    products.forEach(product => {

        const productText =
            product.textContent.toLowerCase();


        if (productText.includes(searchText)) {

            product.style.display = "block";

        } else {

            product.style.display = "none";

        }

    });
}


// ==============================
// Category Filter
// ==============================

function filterProducts(category) {

    const products =
        document.querySelectorAll(".product-card");


    products.forEach(product => {

        const productCategory =
            product.getAttribute("data-category");


        if (
            category === "all" ||
            productCategory === category
        ) {

            product.style.display = "block";

        } else {

            product.style.display = "none";

        }

    });
}


// ==============================
// Open Category From Home
// ==============================

function openCategory(category) {

    window.location.href =
        "products.html?category=" + category;
}


// ==============================
// Apply Category From URL
// ==============================

function loadCategoryFromURL() {

    const params =
        new URLSearchParams(
            window.location.search
        );

    const category =
        params.get("category");


    if (!category) {
        return;
    }


    // Wait until the Products page is ready
    const products =
        document.querySelectorAll(".product-card");


    if (products.length === 0) {
        return;
    }


    filterProducts(category);
}


// ==============================
// Load Functions
// ==============================

displayCart();

displayCheckout();

loadCategoryFromURL();