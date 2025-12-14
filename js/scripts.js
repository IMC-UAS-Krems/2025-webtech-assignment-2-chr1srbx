const products = [
    { id: 1, name: "Warm Blanket", price: 15.00, img: "img/item1.jpg" },
    { id: 2, name: "First Aid Kit", price: 25.00, img: "img/item2.jpg" },
    { id: 3, name: "School Supplies", price: 12.00, img: "img/item3.jpg" },
    { id: 4, name: "Food Parcel", price: 30.00, img: "img/item4.jpg" },
    { id: 5, name: "Clean Water", price: 10.00, img: "img/item5.jpg" },
    { id: 6, name: "Hygiene Pack", price: 18.00, img: "img/item6.jpg" },
    { id: 7, name: "Children's Toy", price: 8.00, img: "img/item7.jpg" },
    { id: 8, name: "Winter Coat", price: 40.00, img: "img/item8.jpg" },
    { id: 9, name: "Medicine Pack", price: 50.00, img: "img/item9.jpg" },
    { id: 10, name: "Tent", price: 100.00, img: "img/item10.jpg" }
];

let cart = [];

window.onload = function() {
    loadGallery();
};

// Loop through products and create HTML for each
function loadGallery() {
    const container = document.getElementById("product-container");
    
    products.forEach(function(product) {
        const col = document.createElement("div");
        col.className = "col-md-4 col-sm-6 mb-4"; 
        
        col.innerHTML = `
            <div class="card h-100 shadow-sm">
                <img src="${product.img}" class="card-img-top" alt="${product.name}" style="height: 200px; object-fit: cover;">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">Donation Amount: $${product.price.toFixed(2)}</p>
                    <button class="btn btn-outline-primary mt-auto" onclick="addToCart(${product.id})">Add to Cart</button>
                </div>
            </div>
        `;
        container.appendChild(col);
    });
}

// Find item by ID and add to cart array
function addToCart(id) {
    const item = products.find(function(p) {
        return p.id === id;
    });
    cart.push(item);
    updateCartUI();
}

function updateCartUI() {
    document.getElementById("cart-count").innerText = cart.length;
}

function showCheckout() {
    if (cart.length === 0) {
        alert("Please add at least one item to your cart.");
        return;
    }
    
    document.getElementById("gallery-view").classList.add("d-none");
    document.getElementById("checkout-view").classList.remove("d-none");
    
    renderCartSummary();
}

function showGallery() {
    document.getElementById("checkout-view").classList.add("d-none");
    document.getElementById("gallery-view").classList.remove("d-none");
}

// Show list of items in the checkout sidebar
function renderCartSummary() {
    const list = document.getElementById("cart-summary");
    list.innerHTML = "";
    
    let total = 0;
    
    cart.forEach(function(item) {
        const li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-center";
        li.innerHTML = `${item.name} <span>$${item.price.toFixed(2)}</span>`;
        list.appendChild(li);
        total += item.price;
    });
    
    const totalRow = document.createElement("li");
    totalRow.className = "list-group-item active fw-bold";
    totalRow.innerHTML = `Total: $${total.toFixed(2)}`;
    list.appendChild(totalRow);
}

// Check inputs before processing
function validateAndSubmit() {
    const name = document.getElementById("fullName").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const zip = document.getElementById("zip").value;
    const address = document.getElementById("address").value;
    const errorMsg = document.getElementById("error-msg");
    
    errorMsg.innerText = "";

    if (!name || !email || !phone || !zip || !address) {
        errorMsg.innerText = "Please fill out all fields.";
        return;
    }

    if (isNaN(phone)) {
        errorMsg.innerText = "Phone number must contain digits only.";
        return;
    }

    if (zip.length > 6) {
        errorMsg.innerText = "ZIP Code cannot be longer than 6 characters.";
        return;
    }

    if(!email.includes("@")){
        errorMsg.innerText = "Please enter a valid email.";
        return;
    }

    calculateFinal(name, email);
}

function calculateFinal(name, email) {
    let subtotal = 0;
    cart.forEach(item => subtotal += item.price);
    
    let discount = 0;
    if (cart.length >= 3) {
        discount = subtotal * 0.10;
    }
    
    let tax = (subtotal - discount) * 0.02;
    
    let total = subtotal - discount + tax;
    
    document.getElementById("receipt-name").innerText = name;
    document.getElementById("receipt-email").innerText = email;
    document.getElementById("receipt-subtotal").innerText = "$" + subtotal.toFixed(2);
    document.getElementById("receipt-discount").innerText = "-$" + discount.toFixed(2);
    document.getElementById("receipt-tax").innerText = "$" + tax.toFixed(2);
    document.getElementById("receipt-total").innerText = "$" + total.toFixed(2);
    document.getElementById("checkout-view").classList.add("d-none");
    document.getElementById("confirmation-view").classList.remove("d-none");
}