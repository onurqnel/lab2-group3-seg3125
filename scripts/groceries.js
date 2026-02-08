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
    price: 3.99,
  },
  {
    name: "Gluten-free Bread",
    vegetarian: true,
    category: "Bread",
    image: "images/glutenfreebread.png",
    glutenFree: true,
    organic: true,
    price: 6.9,
  },
  {
    name: "Bagel",
    category: "Bread",
    image: "images/bagel.png",
    vegetarian: true,
    glutenFree: false,
    organic: false,
    price: 1.49,
  },
  {
    name: "Milk 3%",
    category: "Dairy",
    image: "images/milk.png",
    vegetarian: true,
    glutenFree: true,
    organic: false,
    price: 5.44,
  },
  {
    name: "Oat Milk",
    category: "Dairy",
    image: "images/oatmilk.png",
    vegetarian: true,
    glutenFree: true,
    organic: true,
    price: 4.47,
  },
  {
    name: "Yogurt",
    category: "Dairy",
    image: "images/yogurt.png",
    vegetarian: true,
    glutenFree: true,
    organic: false,
    price: 6.4,
  },
  {
    name: "Tomatoes",
    category: "Veggies",
    image: "images/tomato.png",
    vegetarian: true,
    glutenFree: true,
    organic: true,
    price: 0.96,
  },
  {
    name: "Cucumber",
    category: "Veggies",
    image: "images/cucumber.png",
    vegetarian: true,
    glutenFree: true,
    organic: false,
    price: 1.3,
  },
  {
    name: "Carrot",
    category: "Veggies",
    image: "images/carrot.png",
    vegetarian: true,
    glutenFree: true,
    organic: true,
    price: 0.89,
  },
  {
    name: "Apples",
    category: "Fruits",
    image: "images/apple.png",
    vegetarian: true,
    glutenFree: true,
    organic: true,
    price: 1.19,
  },
  {
    name: "Oranges",
    category: "Fruits",
    image: "images/orange.png",
    vegetarian: true,
    glutenFree: true,
    organic: false,
    price: 1.2,
  },
  {
    name: "Peach",
    category: "Fruits",
    image: "images/peach.png",
    vegetarian: true,
    glutenFree: true,
    organic: true,
    price: 1.5,
  },
  {
    name: "Salmon",
    category: "Meat",
    image: "images/salmon.png",
    vegetarian: false,
    glutenFree: true,
    organic: false,
    price: 10.0,
    unit: "(in lb)",
  },
  {
    name: "Beef",
    category: "Meat",
    image: "images/beef.png",
    vegetarian: false,
    glutenFree: true,
    organic: true,
    price: 9.5,
    unit: "(in lb)",
  },
  {
    name: "Chicken",
    category: "Meat",
    image: "images/chicken.png",
    vegetarian: false,
    glutenFree: true,
    organic: false,
    price: 10.8,
    unit: "(in lb)",
  },
];

// Given restrictions, return a filtered and sorted list of products
function restrictListProducts(prods, restrictionVeg, restrictionGF) {
  return (
    prods
      .filter((p) => {
        // Price range
        if (p.price < clientFrom || p.price > clientTo) return false;
        // Dietary restrictions: exclude items that violate checked preferences
        if (restrictionVeg && !p.vegetarian) return false;
        if (restrictionGF && !p.glutenFree) return false;
        return true;
      })
      // Category filter
      .filter((p) => clientCategory === "all" || p.category === clientCategory)
      // Organic filter
      .filter((p) => {
        if (organicState === "organic") return p.organic;
        if (organicState === "non-organic") return !p.organic;
        return true; // "all"
      })
      // Sort least to most expensive
      .sort((a, b) => a.price - b.price)
  );
}

// Calculate the total price of items, given a list of {name, quantity} objects
function getTotalPrice(chosenProducts) {
  return chosenProducts.reduce((total, item) => {
    const product = products.find((p) => p.name === item.name);
    return total + (product ? product.price * item.quantity : 0);
  }, 0);
}
