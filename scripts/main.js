let clientVeg = false;
let clientGF = false;
let organicState = "all";
let clientFrom = 0.00;
let clientTo = 11.00;

// automatically shows products
populateListProductChoices("displayProduct");

// Source - https://stackoverflow.com/a/31083391
// Posted by Gary, modified by community. See post 'Timeline' for change history
// Retrieved 2026-02-04, License - CC BY-SA 3.0

function getVals(){
  // Get slider values
  var parent = this.parentNode;
  var slides = parent.getElementsByTagName("input");
    var slide1 = parseFloat( slides[0].value );
    var slide2 = parseFloat( slides[1].value );
  // Neither slider will clip the other, so make sure we determine which is larger
  if( slide1 > slide2 ){ var tmp = slide2; slide2 = slide1; slide1 = tmp; }
  
  var displayElement = parent.getElementsByClassName("rangeValues")[0];
      displayElement.innerHTML = slide1 + " - " + slide2;
}

window.onload = function(){
  // Initialize Sliders
  var sliderSections = document.getElementsByClassName("range-slider");
      for( var x = 0; x < sliderSections.length; x++ ){
        var sliders = sliderSections[x].getElementsByTagName("input");
        for( var y = 0; y < sliders.length; y++ ){
          if( sliders[y].type ==="range" ){
            sliders[y].oninput = getVals;
            // Manually trigger event first time to display values
            sliders[y].oninput();
          }
        }
      }
}

// This function is called when any of the tab is clicked
function openInfo(evt, tabName) {

	// Get all elements with class="tabcontent" and hide them
	let tabcontent = document.getElementsByClassName("tabcontent");
	for (let i = 0; i < tabcontent.length; i++) {
		tabcontent[i].style.display = "none";
	}

	// Get all elements with class="tablinks" and remove the class "active"
	let tablinks = document.getElementsByClassName("tablinks");
	for (let i = 0; i < tablinks.length; i++) {
		tablinks[i].className = tablinks[i].className.replace(" active", "");
	}

	// Show the current tab, and add an "active" class to the button that opened the tab
	document.getElementById(tabName).style.display = "block";
	evt.currentTarget.className += " active";
}

// for client checkboxes
function isVegetarian(){
	clientVeg = document.getElementById("vegetarian").checked;
	populateListProductChoices("displayProduct");
}

function isGlutenFree(){
	clientGF = document.getElementById("glutenFree").checked;
	populateListProductChoices("displayProduct");
}

// filter products by organic preference
function searchOrganic(org){
	const checkBox = document.getElementById(org);
	if(checkBox.checked){
		organicState = org;
		populateListProductChoices("displayProduct");
	}
}

//set price ranges
function setFrom(from){
	from = parseFloat(from);
	if (from < 0) from = 0;
	clientFrom = from;
	
	// Validate that from is not greater than to
	if (clientFrom > clientTo) {
		document.getElementById("from").value = clientTo;
		clientFrom = clientTo;
	}
	
	populateListProductChoices("displayProduct");
}
function setTo(to){
	to = parseFloat(to);
	if (to < 0) to = 0;
	clientTo = to;
	
	// Validate that to is not less than from
	if (clientTo < clientFrom) {
		document.getElementById("to").value = clientFrom;
		clientTo = clientFrom;
	}
	
    populateListProductChoices("displayProduct");
}

	
// generate a checkbox list from a list of products
// it makes each product name as the label for the checkboxes
function populateListProductChoices(slct2) {
	//display product
    const s2 = document.getElementById(slct2);
	
	// s2 represents the <div> in the Products tab, which shows the product list, so we first set it empty
    s2.innerHTML = "";
	
	//show the price ranges
	// let priceDisplayDiv = document.getElementById(displayPrice);
	// let line = "From " + clientFrom + " to " + clientTo;
	// priceDisplayDiv.innerText = "line";
		
	// obtain a reduced list of products based on restrictions
    const optionArray = restrictListProducts(products, clientVeg, clientGF);
 
	// Group by category 
	const grouped = {};
	for (const p of optionArray){
		if (!grouped[p.category]) grouped[p.category]=[];
		grouped[p.category].push(p);
	}	
	//create <ul> 
	const ul = document.createElement("ul");
	ul.style.listStyleType ="none";
	ul.style.padding ="0";

	for (const category of Object.keys(grouped)) {
		const category_li = document.createElement("li");
		category_li.textContent = category;
		ul.appendChild(category_li);
	
	   const products_ul = document.createElement("ul");
	   products_ul.style.listStyleType = "none";
	   products_ul.style.paddingLeft = "0";

	    for (const p of grouped[category]) {
		   const li = document.createElement("li");

		   const label = document.createElement("label");
		   label.className = "item " + (p.organic ? "organic" : "non-organic");

		    const img = document.createElement("img");
		    img.src = p.image;
		    img.alt = p.name;
		    label.appendChild(img);

			const check_Box = document.createElement("div");
			check_Box.className ="check-box";

			const checkbox = document.createElement("input");
			checkbox.type = "checkbox";
			checkbox.name = "product";
			checkbox.value = p.name;

			const name_span= document.createElement("span");
			name_span.textContent =p.name;

			check_Box.appendChild(checkbox);
			check_Box.appendChild(name_span);
			label.appendChild(check_Box);


			// quantity
			const qty = document.createElement("div");
			qty.className = "qty";

			const qty_Label = document.createElement("span");
			qty_Label.textContent = "quantity";

			const qty_Input = document.createElement("input");
			qty_Input.className = "quantity";
			qty_Input.type = "number";
			qty_Input.min = "0";
			qty_Input.value = "0";
			qty_Input.dataset.product = p.name;

			qty.appendChild(qty_Label);
			qty.appendChild(qty_Input);

			// Optional unit (for meats)
			if (p.unit) {
				const unitSpan = document.createElement("span");
				unitSpan.className = "unit";
				unitSpan.textContent = " " + p.unit;
				qty.appendChild(unitSpan);
			}
			label.appendChild(qty);
			li.appendChild(label);
			products_ul.appendChild(li);

	}
	category_li.appendChild(products_ul);
}
s2.appendChild(ul);

}
	
// This function is called when the "Add selected items to cart" button is clicked
// The purpose is to build the HTML to be displayed in the cart
function createCell(text, className = "") {
	const td = document.createElement("td");
	td.textContent = text;
	if (className) td.className = className;
	return td;
}

function selectedItems(){
	const ele = document.getElementsByName("product");
	const chosenProducts = [];
	const c = document.getElementById('displayCart');
	c.innerHTML = "";
	
	// Collect selected products with quantities
	for (let i = 0; i < ele.length; i++) { 
		if (ele[i].checked) {
			const productName = ele[i].value;
			const quantityInput = document.querySelector(`input.quantity[data-product="${productName}"]`);
			const quantity = quantityInput ? parseInt(quantityInput.value) || 1 : 1;
			chosenProducts.push({name: productName, quantity: quantity});
		}
	}
	
	// Check if cart is empty
	if (chosenProducts.length === 0) {
		const emptyMsg = document.createElement("p");
		emptyMsg.className = "empty-cart";
		emptyMsg.textContent = "Your cart is empty. Please select items from the Products tab.";
		c.appendChild(emptyMsg);
		return;
	}
	
	// Create cart header
	const header = document.createElement("h4");
	header.textContent = "Shopping Cart";
	c.appendChild(header);
	
	// Create table for cart items
	const table = document.createElement("table");
	table.className = "cart-table";
	
	// Table header
	const thead = document.createElement("thead");
	const headerRow = document.createElement("tr");
	["Product", "Quantity", "Unit Price", "Subtotal"].forEach(text => {
		const th = document.createElement("th");
		th.textContent = text;
		headerRow.appendChild(th);
	});
	thead.appendChild(headerRow);
	table.appendChild(thead);
	
	// Table body with products
	const tbody = document.createElement("tbody");
	chosenProducts.forEach(item => {
		const product = products.find(p => p.name === item.name);
		if (product) {
			const row = document.createElement("tr");
			
			// Product name
			row.appendChild(createCell(product.name + (product.unit ? " " + product.unit : "")));
			
			// Quantity
			row.appendChild(createCell(item.quantity, "center"));
			
			// Unit price
			row.appendChild(createCell("$" + product.price.toFixed(2), "right"));
			
			// Subtotal
			row.appendChild(createCell("$" + (product.price * item.quantity).toFixed(2), "right"));
			
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
	
	c.appendChild(table);
}

// Open the Client tab by default when page loads
window.addEventListener('DOMContentLoaded', function() {
	document.querySelector('.tablinks').click();
});