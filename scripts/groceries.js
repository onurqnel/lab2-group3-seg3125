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
		name: "Gluten-free Bread",
		vegetarian: true,
		glutenFree: true,
		organic: true,
		price: 6.90
	},
	{
		name: "Milk 3%",
		vegetarian: true,
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
		vegetarian: true,
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

// given restrictions provided, make a reduced list of products
// prices should be included in this list, as well as a sort based on price

function restrictListProducts(prods, restrictionVeg, restrictionGF) {
	let first_products = [];
	let second_products = [];
	let product_names = [];

	// sorting first for dietary restrictions
	for (let i=0; i<prods.length; i++) {
		// item is vegetarian and gluten-free
		if((prods[i].vegetarian) && (prods[i].glutenFree)){
			first_products.push(prods[i]);
		}
		// client is vegetarian and item is vegetarian
		else if ((restrictionVeg) && (prods[i].vegetarian)){
			//check if gluten matters
			if((restrictionGF) && (prods[i].glutenFree)){
				first_products.push(prods[i]);
			}
			else if(!restrictionGF){
				first_products.push(prods[i]);
			}
		}
		// client is not vegetarian
		else if(!restrictionVeg){
			//check if gluten matters
			if((restrictionGF) && (prods[i].glutenFree)){
				first_products.push(prods[i]);
			}
			else if(!restrictionGF){
				first_products.push(prods[i]);
			}
		}
	}

	// sorting based on organic/non-organic/all 
	for(let i = 0; i < first_products.length; i++){
		if(organicState == "organic" && first_products[i].organic){
			second_products.push(first_products[i]);
		}
		else if(organicState == "non-organic" && !first_products[i].organic){
			second_products.push(first_products[i]);
		}
		else if (organicState == "all"){
			second_products.push(first_products[i]);
		}
	}

	//sort by price (bubble sort)
	let switches = true;
    while(switches){
        switches = false;
        for(let i = 0; i < second_products.length-1; i++){
            if(second_products[i].price > second_products[i + 1].price){
                let save = second_products[i];
                second_products[i] = second_products[i+1];
                second_products[i+1] = save;
                switches = true;
            }
        }
    }

	// add into names-only array
	for(let i = 0; i < second_products.length; i++){
		product_names.push(second_products[i].name);
	}

	// final display list of product names displayed
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