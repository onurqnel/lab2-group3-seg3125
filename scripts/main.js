// Global filter state
let clientVeg = false;
let clientGF = false;
let organicState = "all";
let clientCategory = "all";
let clientFrom = 0.0;
let clientTo = 11.0;

// Range slider display
function getVals() {
  const parent = this.parentNode;
  const slides = parent.getElementsByTagName("input");
  let slide1 = parseFloat(slides[0].value);
  let slide2 = parseFloat(slides[1].value);
  if (slide1 > slide2) {
    [slide1, slide2] = [slide2, slide1];
  }
  parent.getElementsByClassName("rangeValues")[0].innerHTML =
    "$" + slide1 + " - $" + slide2;
}

// Tab navigation
function openInfo(evt, tabName) {
  for (const tab of document.getElementsByClassName("tabcontent")) {
    tab.style.display = "none";
  }
  for (const link of document.getElementsByClassName("tablinks")) {
    link.classList.remove("active");
  }
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.classList.add("active");
}

//  Dietary preference handlers
function isVegetarian() {
  clientVeg = document.getElementById("vegetarian").checked;
  populateListProductChoices("displayProduct");
}

function isGlutenFree() {
  clientGF = document.getElementById("glutenFree").checked;
  populateListProductChoices("displayProduct");
}

// Organic filter
function searchOrganic(org) {
  organicState = org;
  populateListProductChoices("displayProduct");
}

// Category filter
function setCategory(category) {
  clientCategory = category;
  populateListProductChoices("displayProduct");
}

// Price range handlers
function setFrom(value) {
  clientFrom = Math.max(0, parseFloat(value));
  if (clientFrom > clientTo) {
    clientFrom = clientTo;
    document.getElementById("from").value = clientFrom;
  }
  populateListProductChoices("displayProduct");
}

function setTo(value) {
  clientTo = Math.max(0, parseFloat(value));
  if (clientTo < clientFrom) {
    clientTo = clientFrom;
    document.getElementById("to").value = clientTo;
  }
  populateListProductChoices("displayProduct");
}

// Search filter
function applySearchFilter() {
  const input = document.getElementById("searchInput");
  const container = document.getElementById("displayProduct");
  if (!input || !container) return;

  const query = input.value.toLowerCase().trim();

  for (const label of container.querySelectorAll("label")) {
    const row = label.parentElement;
    row.style.display =
      query === "" || label.textContent.toLowerCase().includes(query)
        ? ""
        : "none";
  }
}

// Build a single product list item
function createProductItem(product) {
  const li = document.createElement("li");

  const label = document.createElement("label");
  label.className = "item " + (product.organic ? "organic" : "non-organic");

  // Product image
  const img = document.createElement("img");
  img.src = product.image;
  img.alt = product.name;
  label.appendChild(img);

  // Checkbox + name
  const checkBoxDiv = document.createElement("div");
  checkBoxDiv.className = "check-box";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.name = "product";
  checkbox.value = product.name;

  // Auto-set quantity to 1 when checked, 0 when unchecked
  checkbox.addEventListener("change", function () {
    const qtyInput = document.querySelector(
      `input.quantity[data-product="${product.name}"]`,
    );
    if (qtyInput) {
      qtyInput.value = this.checked ? "1" : "0";
    }
  });

  const nameSpan = document.createElement("span");
  nameSpan.textContent = product.name;

  checkBoxDiv.appendChild(checkbox);
  checkBoxDiv.appendChild(nameSpan);
  label.appendChild(checkBoxDiv);

  // Price display
  const priceSpan = document.createElement("span");
  priceSpan.className = "product-price";
  priceSpan.textContent = "$" + product.price.toFixed(2);
  label.appendChild(priceSpan);

  // Quantity input
  const qtyDiv = document.createElement("div");
  qtyDiv.className = "qty";

  const qtyLabel = document.createElement("span");
  qtyLabel.textContent = "Quantity";

  const qtyInput = document.createElement("input");
  qtyInput.className = "quantity";
  qtyInput.type = "number";
  qtyInput.min = "0";
  qtyInput.value = "0";
  qtyInput.dataset.product = product.name;

  qtyDiv.appendChild(qtyLabel);
  qtyDiv.appendChild(qtyInput);

  // Optional unit (for meats)
  if (product.unit) {
    const unitSpan = document.createElement("span");
    unitSpan.className = "unit";
    unitSpan.textContent = " " + product.unit;
    qtyDiv.appendChild(unitSpan);
  }

  label.appendChild(qtyDiv);
  li.appendChild(label);
  return li;
}

// Populate product list
function populateListProductChoices(containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";

  const filteredProducts = restrictListProducts(products, clientVeg, clientGF);

  // Group products by category
  const grouped = {};
  for (const p of filteredProducts) {
    if (!grouped[p.category]) grouped[p.category] = [];
    grouped[p.category].push(p);
  }

  const ul = document.createElement("ul");
  ul.style.listStyleType = "none";
  ul.style.padding = "0";

  for (const category of Object.keys(grouped)) {
    const categoryLi = document.createElement("li");
    categoryLi.textContent = category;

    const productsUl = document.createElement("ul");
    productsUl.style.listStyleType = "none";
    productsUl.style.paddingLeft = "0";

    for (const p of grouped[category]) {
      productsUl.appendChild(createProductItem(p));
    }

    categoryLi.appendChild(productsUl);
    ul.appendChild(categoryLi);
  }

  container.appendChild(ul);
  applySearchFilter();
}

// Cart helpers
function createCell(text, className = "") {
  const td = document.createElement("td");
  td.textContent = text;
  if (className) td.className = className;
  return td;
}

function selectedItems() {
  // Switch to cart tab
  document.getElementById("cart").click();

  const checkboxes = document.getElementsByName("product");
  const chosenProducts = [];
  const cartContainer = document.getElementById("displayCart");
  cartContainer.innerHTML = "";

  // Collect selected products with quantities
  for (const cb of checkboxes) {
    if (cb.checked) {
      const qtyInput = document.querySelector(
        `input.quantity[data-product="${cb.value}"]`,
      );
      const quantity = qtyInput ? parseInt(qtyInput.value) || 1 : 1;
      chosenProducts.push({ name: cb.value, quantity });
    }
  }

  // Empty cart message
  if (chosenProducts.length === 0) {
    const emptyMsg = document.createElement("p");
    emptyMsg.className = "empty-cart";
    emptyMsg.textContent =
      "Your cart is empty. Please select items from the Products tab.";
    cartContainer.appendChild(emptyMsg);
    return;
  }

  // Cart header
  const header = document.createElement("h4");
  header.textContent = "Shopping Cart";
  cartContainer.appendChild(header);

  // Cart table
  const table = document.createElement("table");
  table.className = "cart-table";

  // Table header
  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");
  ["Product", "Quantity", "Unit Price", "Subtotal"].forEach((text) => {
    const th = document.createElement("th");
    th.textContent = text;
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);
  table.appendChild(thead);

  // Table body
  const tbody = document.createElement("tbody");
  chosenProducts.forEach((item) => {
    const product = products.find((p) => p.name === item.name);
    if (product) {
      const row = document.createElement("tr");
      row.appendChild(
        createCell(product.name + (product.unit ? " " + product.unit : "")),
      );
      row.appendChild(createCell(item.quantity, "center"));
      row.appendChild(createCell("$" + product.price.toFixed(2), "right"));
      row.appendChild(
        createCell("$" + (product.price * item.quantity).toFixed(2), "right"),
      );
      tbody.appendChild(row);
    }
  });
  table.appendChild(tbody);

  // Table footer with total
  const tfoot = document.createElement("tfoot");
  const totalRow = document.createElement("tr");

  const totalLabelCell = document.createElement("td");
  totalLabelCell.colSpan = 3;
  totalLabelCell.textContent = "Total:";
  totalLabelCell.className = "total-label";
  totalRow.appendChild(totalLabelCell);

  const totalAmountCell = document.createElement("td");
  totalAmountCell.textContent = "$" + getTotalPrice(chosenProducts).toFixed(2);
  totalAmountCell.className = "total-amount";
  totalRow.appendChild(totalAmountCell);

  tfoot.appendChild(totalRow);
  table.appendChild(tfoot);
  cartContainer.appendChild(table);
}

document.addEventListener("DOMContentLoaded", function () {
  // Open Products tab by default
  document.querySelector(".tablinks").click();

  // Initialize range sliders
  for (const section of document.getElementsByClassName("range-slider")) {
    for (const slider of section.getElementsByTagName("input")) {
      if (slider.type === "range") {
        slider.oninput = getVals;
        slider.oninput(); // display initial values
      }
    }
  }

  // Bind search input
  const searchInput = document.getElementById("searchInput");
  if (searchInput) {
    searchInput.addEventListener("input", applySearchFilter);
  }

  // Text size controls
  let currentSize = 18;
  const minSize = 14;
  const maxSize = 28;

  function applyFontSize() {
    document.documentElement.style.fontSize = currentSize + "px";
    localStorage.setItem("siteFontSize", currentSize);
  }

  const saved = localStorage.getItem("siteFontSize");
  if (saved) {
    currentSize = parseInt(saved, 10);
    applyFontSize();
  }

  const plus = document.getElementById("increaseText");
  const minus = document.getElementById("decreaseText");

  if (plus) {
    plus.addEventListener("click", () => {
      if (currentSize < maxSize) {
        currentSize += 2;
        applyFontSize();
      }
    });
  }

  if (minus) {
    minus.addEventListener("click", () => {
      if (currentSize > minSize) {
        currentSize -= 2;
        applyFontSize();
      }
    });
  }
});

populateListProductChoices("displayProduct");
