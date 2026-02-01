// Array of products, each product is an object with different fieldset
// A set of ingredients should be added to products		 
var products = [
	{
		name: "White Bread",
		category: "Bread",
		image: "images/whitebread.png",
		vegetarian: true,
		glutenFree: false,
		organic: false,
		price: 3.99
	},
	{
		name: "Gluten-free Bread",
		vegetarian: true,
		category: "Bread",
		image: "images/glutenfreebread.png",
		glutenFree: true,
		organic: true,
		price: 6.90
	},
	{
		name: "Milk 3%",
		category: "Dairy",
		image: "images/milk.png",
		vegetarian: true,
		glutenFree: true,
		organic: false,
		price: 5.44
	},
	{
		name: "Oat Milk",
		category: "Dairy",
		image: "images/oatmilk.png",
		vegetarian: true,
		glutenFree: true,
		organic: true,
		price: 4.47
	},
	{
		name: "Yogurt",
		category: "Dairy",
		image: "images/yogurt.png",
		vegetarian: true,
		glutenFree: true,
		organic: false,
		price: 6.40
	},
	{
		name: "Tomatoes",
		category: "Veggies",
		image: "images/tomato.png",
		vegetarian: true,
		glutenFree: true,
		organic: true,
		price: 0.96
	},
	{
		name: "Cucumber",
		category: "Veggies",
		image: "images/cucumber.png",
		vegetarian: true,
		glutenFree: true,
		organic: false,
		price: 1.30
	},
	{
		name: "Apples",
		category: "Fruits",
		image: "images/apple.png",
		vegetarian: true,
		glutenFree: true,
		organic: true,
		price: 1.19
	},
	{
		name: "Oranges",
		category: "Fruits",
		image: "images/orange.png",
		vegetarian: true,
		glutenFree: true,
		organic:false,
		price: 1.20
	},
	{
		name: "Salmon",
		category: "Meat",
		image: "images/salmon.png",
		vegetarian: false,
		glutenFree: true,
		organic: false,		
		price: 10.00,
		unit: "(in lb)"

	},
	{
		name: "Beef",
		category: "Meat",
		image: "images/beef.png",
		vegetarian: false,
		glutenFree: true,
		organic: true,
		price: 9.50,
		unit: "(in lb)"

	},
	{
		name: "Chicken",
		category: "Meat",
		image: "images/chicken.png",
		vegetarian: false,
		glutenFree: true,
		organic: false,
		price: 10.80,
		unit: "(in lb)"
	},


];

// given restrictions provided, make a reduced list of products
// prices should be included in this list, as well as a sort based on price
function restrictListProducts(prods, restrictionVeg, restrictionGF) {
	let first_products = [];
	let second_products = [];
	let product_names = [];

	// go through all potential products to determine display
	for (let i=0; i<prods.length; i++) {
		// if item is within price range
		if(prods[i].price >= clientFrom && prods[i].price <= clientTo){
			// sorting first for dietary restrictions

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

	//sort lest to most expensive (bubble sort)
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
	return second_products;
}

// Calculate the total price of items, with received parameter being a list of product objects with quantities
function getTotalPrice(chosenProducts) {
	let totalPrice = 0;
	for (let i=0; i<chosenProducts.length; i+=1) {
		const product = products.find(p => p.name === chosenProducts[i].name);
		if (product) {
			totalPrice += product.price * chosenProducts[i].quantity;
		}
	}
	return totalPrice;
}