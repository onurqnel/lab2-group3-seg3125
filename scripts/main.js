let clientVeg = false;
let clientGF = false;
let organicState = "all";
let clientFrom = 0.00;
let clientTo = 100.00;

// This function is called when any of the tab is clicked
// It is adapted from https://www.w3schools.com/howto/howto_js_tabs.asp

function openInfo(evt, tabName) {

	// Get all elements with class="tabcontent" and hide them
	tabcontent = document.getElementsByClassName("tabcontent");
	for (i = 0; i < tabcontent.length; i++) {
		tabcontent[i].style.display = "none";
	}

	// Get all elements with class="tablinks" and remove the class "active"
	tablinks = document.getElementsByClassName("tablinks");
	for (i = 0; i < tablinks.length; i++) {
		tablinks[i].className = tablinks[i].className.replace(" active", "");
	}

	// Show the current tab, and add an "active" class to the button that opened the tab
	document.getElementById(tabName).style.display = "block";
	evt.currentTarget.className += " active";

}


// for client checkboxes
function isVegetarian(){
	var checkBox = document.getElementById("vegetarian");
	if (checkBox.checked){
    	clientVeg = true;
		populateListProductChoices("displayProduct");
  	}
	else {
     	clientVeg = false;
		populateListProductChoices("displayProduct");
  	}
}

function isGlutenFree(){
	var checkBox = document.getElementById("glutenFree");
	if (checkBox.checked){
    	clientGF = true;
		populateListProductChoices("displayProduct");

  	}
	else {
     	clientGF = false;
		populateListProductChoices("displayProduct");
  	}
}

// need to add functionality back to organics
function searchOrganic(org){
	var checkBox = document.getElementById(org)
	if(checkBox.checked){
		organicState = org;
		console.log(org);
		populateListProductChoices("displayProduct");
	}
}

//set price ranges
function setFrom(from){
	clientFrom = from
	populateListProductChoices("displayProduct");
}
function setTo(to){
	clientTo = to;
    populateListProductChoices("displayProduct");
}

	
// generate a checkbox list from a list of products
// it makes each product name as the label for the checkbos

function populateListProductChoices(slct2) {
	//display product
    var s2 = document.getElementById(slct2);
	
	// s2 represents the <div> in the Products tab, which shows the product list, so we first set it empty
    s2.innerHTML = "";
		
	// obtain a reduced list of products based on restrictions
    var optionArray = restrictListProducts(products, clientVeg, clientGF);

	// for each item in the array, create a checkbox element, each containing information such as:
	// <input type="checkbox" name="product" value="Bread">
	// <label for="Bread">Bread/label><br>

	// Gropup by category 
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
	  qty_Input.dataset.product=p.name;

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
	
// This function is called when the "Add selected items to cart" button in clicked
// The purpose is to build the HTML to be displayed (a Paragraph) 
// We build a paragraph to contain the list of selected items, and the total price

function selectedItems(){
	
	var ele = document.getElementsByName("product");
	var chosenProducts = [];
	
	var c = document.getElementById('displayCart');
	c.innerHTML = "";
	
	// build list of selected item
	var para = document.createElement("P");
	para.innerHTML = "You selected : ";
	para.appendChild(document.createElement("br"));
	for (i = 0; i < ele.length; i++) { 
		if (ele[i].checked) {
			para.appendChild(document.createTextNode(ele[i].value));
			para.appendChild(document.createElement("br"));
			chosenProducts.push(ele[i].value);
		}
	}
		
	// add paragraph and total price
	c.appendChild(para);
	c.appendChild(document.createTextNode("Total Price is " + getTotalPrice(chosenProducts)));
		
}