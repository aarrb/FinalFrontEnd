function getURLParameterByName(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

function displayAllProducts() {
    const products = document.querySelectorAll(".product-card");
    products.forEach(product => {
        product.style.display = "block";

        
    });
}

function applyProductFilters() {


    const filterBar = document.querySelector(".filter-bar");
    const flowerType = filterBar.querySelector("#flower-type").value;
    const occasion = filterBar.querySelector("#occasion").value;
    const color = filterBar.querySelector("#color").value;

    document.querySelectorAll(".product-card").forEach(product => {
        const matchesFilter = (filterValue, productData) => filterValue === "all" || filterValue === productData;
        const displayStyle = matchesFilter(flowerType, product.getAttribute("data-flower-type")) ||
                             matchesFilter(occasion, product.getAttribute("data-occasion")) ||
                             matchesFilter(color, product.getAttribute("data-color")) ? "block" : "none";
        product.style.display = displayStyle;

        if (displayStyle === "block") {
            product.addEventListener("click", () => {
                window.location.href = `add-to-basket.html?productId=${product.id}`;
            });
        }
    });
}

function sortProductGrid() {
    const selectedOption = document.querySelector("#sort").value;
    const productGrid = document.querySelector(".product-grid");
    const products = Array.from(productGrid.children);

    const comparePrices = (a, b) => {
        const priceA = parseInt(a.getAttribute("data-price"));
        const priceB = parseInt(b.getAttribute("data-price"));
        return selectedOption === "price-low-high" ? priceA - priceB : priceB - priceA;
    };

    products.sort(comparePrices);
    productGrid.innerHTML = "";
    products.forEach(product => productGrid.appendChild(product));
}



function refreshCartCount() {
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        const cartCount = localStorage.getItem('cartCount') || 0;
        cartCountElement.textContent = cartCount;
    }
}



document.addEventListener("DOMContentLoaded", function () {
    const productId = getURLParameterByName("productId");
    if (productId) {
        fetchProductDetails(productId);
    }

    document.querySelectorAll(".filters select").forEach(dropdown => {
        dropdown.addEventListener("change", applyProductFilters);
    });

    document.querySelector("#sort").addEventListener("change", sortProductGrid);
    displayAllProducts();
    refreshCartCount();
});
