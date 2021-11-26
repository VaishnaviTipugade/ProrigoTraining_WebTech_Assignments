window.onload = onpageload;

var loaderComponent = document.getElementById("loader");
var contentComponent = document.getElementById("content");

var cartItemList = [];
var cartItemPriceList = [];

function onpageload() {
   contentComponent.style.display = 'none';
   loaderComponent.style.display = 'none';
   fetchData();
}

function fetchData() {
   showLoader();

   fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(json => {
         buildProductsList(json);
      });
}

function buildProductsList(products) {
   showContents();
   var productListContainer = document.createElement('div');
   productListContainer.id = "prodListContainer";
   contentComponent.appendChild(productListContainer);

   for (let product of products) {
      var productContainer = document.createElement('div');
      productContainer.className = "prodContainer";

      var prodCheck = document.createElement('input');
      prodCheck.type = 'checkbox';
      prodCheck.name = 'prodCheck';
      prodCheck.value = product.title + "separator" + product.price;
      prodCheck.className = "checkbox";

      prodCheck.setAttribute("onchange", "returnToCart(this)");

      var productImage = document.createElement('img');
      productImage.src = product.image;

      var prodDetailsContainer = document.createElement('div');
      prodDetailsContainer.className = "prodDetails";

      var productTitle = document.createElement('h2');
      var productReview = document.createElement('div');
      productReview.className = "prodReview";
      var productRate = document.createElement('p');
      productRate.className = "rate";
      var starRating = document.createElement('span');
      starRating.className = "fa fa-star checked";
      var productCount = document.createElement('p');
      var productDescription = document.createElement('p');
      var productPrice = document.createElement('p');

      productTitle.innerHTML = product.title;

      var productRatings = product.rating;
      productRate.innerHTML = productRatings.rate + " ★";
      productCount.innerHTML = "Count : " + productRatings.count;

      productDescription.innerHTML = product.description;

      productPrice.innerHTML = "$" + product.price;

      productReview.append(productRate, productCount);
      prodDetailsContainer.append(
         productTitle,
         productReview,
         productDescription
      );
      productContainer.append(
         prodCheck,
         productImage,
         prodDetailsContainer,
         productPrice
      );
      productListContainer.appendChild(productContainer);
   }

}

function returnToCart(prodCheck) {

   var prodCheckArr = prodCheck.value.split('separator');

   var cart = document.getElementById("selectedItems");
   var itemsPrice = document.getElementById("itemsPrice");
   var totalPrice = document.getElementById("totalPrice");

   var items = "";
   var prices = "";
   var total = 0;

   // Updating List with Selected Items
   prodCheck.checked
      ? cartItemList.push(prodCheckArr[0]) && cartItemPriceList.push(prodCheckArr[1])
      : (cartItemList = cartItemList.filter((item) => item != prodCheckArr[0])) && (cartItemPriceList = cartItemPriceList.filter((price) => price != prodCheckArr[1]));

   if (cartItemList.length == 0 && cartItemPriceList.length == 0) {
      items = "<p>Empty</p>";
      prices = "<p>Empty</p>";
   }
   else {
      cartItemList.forEach(item => {
         items += "<p>" + item + "</p>";
      });
      cartItemPriceList.forEach(price => {
         prices += "<p>" + "$" + price + "</p>";
         total += parseFloat(price);
      });
   }
   cart.innerHTML = items;
   itemsPrice.innerHTML = prices;
   totalPrice.innerHTML = "$" + total.toFixed(2);
}

function showLoader() {
   loaderComponent.style.display = 'block';
   contentComponent.style.display = 'none';
}

function showContents() {
   loaderComponent.style.display = 'none';
   contentComponent.style.display = 'block';
}
