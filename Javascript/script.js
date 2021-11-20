window.onload = onpageload;

var loaderComponent = document.getElementById("loader");
var contentComponent = document.getElementById("content");
// var clickButton = document.getElementById("clickMe");

var cartItemList = [];

function onpageload() {
   contentComponent.style.display = 'none';
   loaderComponent.style.display = 'none';
   // clickButton.style.display = 'block';
   ClickMe();
}

function ClickMe() {
   showLoader();

   fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(json => {
         buildProductsList(json);
      });
}

function buildProductsList(products) {
   showContents();
   console.log("inside buildProductsList");
   var productListContainer = document.createElement('div');
   productListContainer.id = "prodListContainer";
   contentComponent.appendChild(productListContainer);

   for (let product of products) {
      var productContainer = document.createElement('div');
      productContainer.className = "prodContainer";

      var prodCheck = document.createElement('input');
      prodCheck.type = 'checkbox';
      prodCheck.name = 'prodCheck';
      prodCheck.value = product.title;
      prodCheck.className = "checkbox";
      // prodCheck.onchange = returnToCart(prodCheck, cartItems);
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
   console.log('inside returnToCart')

   var cart = document.getElementById("selectedItems");
   var items = "";

   // UPdating List with Selected Items
   prodCheck.checked
      ? cartItemList.push(prodCheck.value)
      : (cartItemList = cartItemList.filter((item) => item != prodCheck.value));

   if (cartItemList.length == 0) {
      items = "<p>Empty</p>";
   }
   else {
      cartItemList.forEach(item => {
         //var cartItem = document.createElement('p');
         items += "<p>" + item + "</p>";
      });
   }
   cart.innerHTML = items;
}

function showLoader() {
   loaderComponent.style.display = 'block';
   contentComponent.style.display = 'none';
   // clickButton.style.display = 'block';
}

function showContents() {
   loaderComponent.style.display = 'none';
   contentComponent.style.display = 'block';
   // clickButton.style.display = 'none';
}
