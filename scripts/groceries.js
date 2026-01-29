// Array of products, each product is an object with different fieldset
// A set of ingredients should be added to products		 

var products = [
	{
		name: "White Bread",
		vegetarian: true,
		glutenFree: false,
		organic: false,
		price: 3.99
	},
	{
		name: "GlutenFree Bread",
		vegetarian: true,
		glutenFree: true,
		organic: true,
		price: 6.90
	},
	{
		name: "Milk 3%",
		vegetarian: false,
		glutenFree: true,
		organic: false,
		price: 5.44
	},
	{
		name: "Oat Milk",
		vegetarian: true,
		glutenFree: true,
		organic: true,
		price: 4.47
	},
	{
		name: "Yogurt",
		vegetarian: false,
		glutenFree: true,
		organic: false,
		price: 6.40
	},
	{
		name: "Tomatoes",
		vegetarian: true,
		glutenFree: true,
		organic: true,
		price: 0.96
	},
	{
		name: "Cucumber",
		vegetarian: true,
		glutenFree: true,
		organic: false,
		price: 1.30
	},
	{
		name: "Apples",
		vegetarian: true,
		glutenFree: true,
		organic: true,
		price: 1.19
	},


	{
		name: "Oranges",
		vegetarian: true,
		glutenFree: true,
		organic:false,
		price: 1.20
	},
	{
		name: "Salmon",
		vegetarian: false,
		glutenFree: true,
		organic: false,		price: 10.00	},
	{
		name: "Beef",
		vegetarian: false,
		glutenFree: true,
		organic: true,
		price: 9.50
	},
	{
		name: "Chicken",
		vegetarian: false,
		glutenFree: true,
		organic: false,
		price: 10.80
	},


];
	
// Organic Filter 
function filterSelection(c) {
  document.querySelectorAll(".item").forEach(item => {
    if (c === "all" || item.classList.contains(c)) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
}

document.querySelectorAll('input[name="FilterOrganic"]').forEach(radio => {
  radio.addEventListener("change", () => {
    const value = document.querySelector(
      'input[name="FilterOrganic"]:checked'
    ).value;
    filterSelection(value);
  });
});

// default
filterSelection("all");


// given restrictions provided, make a reduced list of products
// prices should be included in this list, as well as a sort based on price

function restrictListProducts(prods, restriction) {
	let product_names = [];
	for (let i=0; i<prods.length; i+=1) {
		if ((restriction == "Vegetarian") && (prods[i].vegetarian == true)){
			product_names.push(prods[i].name);
		}
		else if ((restriction == "GlutenFree") && (prods[i].glutenFree == true)){
			product_names.push(prods[i].name);
		}
		else if (restriction == "organic" && prods[i].organic) {
            product_names.push(prods[i].name);
       }
	   else if (restriction == "non-organic" && !prods[i].organic) {
            product_names.push(prods[i].name);
       }
		else if (restriction == "None"){
			product_names.push(prods[i].name);
		}
	}
	return product_names;
}

// Calculate the total price of items, with received parameter being a list of products
function getTotalPrice(chosenProducts) {
	totalPrice = 0;
	for (let i=0; i<products.length; i+=1) {
		if (chosenProducts.indexOf(products[i].name) > -1){
			totalPrice += products[i].price;
		}
	}
	return totalPrice;
}