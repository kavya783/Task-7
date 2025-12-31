
function myFunction(str) {
  fetch('./assets/json/1.json')
    .then(response => response.json())
    .then(data => {

      const container = document.getElementById("product-container");
      container.innerHTML = "";

      const post = data.filter(product => product.buttonType === str);
      let string = "";

      post.forEach(product => {

        const rating = product.rating;
        let stars = "";
        for (let i = 1; i <= 5; i++) {
          if (i <= rating) {
            stars += "<i class='bi bi-star-fill'></i>"
          }
          else {
            stars += "<i class='bi bi-star'></i>";
          }
        }
        const originalCost = product.cost;
        const discount = product.discount;
        const discountedPrice =
          originalCost - (originalCost * discount / 100);

        string += `
         <div class="swiper-slide d-flex justify-content-center mt-5 mb-5">
    <div class="card product-container">
     <img src="${product.img}" class="card-img-top mt-2 ">

              <div class="card-body ">
                <h5 class="card-title fs-5">${product.name}</h5>

                <h6 class="text-success">
                  Prodcut Cost:
                  <del class="text-danger">₹${originalCost}</del>
                </h6>

                <h6 class="text-primary">
                  Final Cost:
                  ₹${discountedPrice.toFixed(2)}
                  (${discount}% off)
                </h6>

                <h6>
                  Rating:
                  <span class="text-warning">${stars}</span>
                  <span class="text-success">(${product.rating})</span>
                </h6>

               <div class="d-flex justify-content-start">
  <button class="btn btn-sm"
    style="background:${product.buttonColor};color:white;">
    ${product.buttonType}
  </button>
</div>

              </div>
            </div>
          </div>
        `;
      });

      container.innerHTML = string;

      swiper.update();
      swiper.slideTo(0);
    });
}
var swiper = new Swiper(".mySwiper", {
  slidesPerView: 1,
  spaceBetween: 15,

  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  breakpoints: {
    0: {
      slidesPerView: 1
    },
    768: {
      slidesPerView: 2
    },
    1024: {
      slidesPerView: 3
    },
    1440: {
      slidesPerView: 4
    }
  }
});

