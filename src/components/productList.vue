<template>
  <div>
    <header class="bg-success py-5">
      <div class="container px-4 px-lg-5 my-5">
        <div class="text-center text-white">
          <h1 class="display-4 fw-bolder">Learn your desired skill</h1>
          <input
            class="form-control mr-sm-2"
            type="text"
            placeholder="Search 🔍"
            v-model="search"
            v-on:input="filteredList"
          />
          <div
            style="display: flex; justify-content: center; align-items: center"
          >
            <select
              class="form-select mr-sm-2"
              v-model="sortByOptions.type"
              style="width: 100%; max-width: 250px; margin: 10px"
              @change="sortedLessons"

            >
              <option value="subject">Alphabatical order A-Z</option>
              <option value="price">Price 0-999</option>
              <option value="space">Availability</option>
              <option value="location">location</option>
            </select>

            <select
              class="form-select small"
              style="width: 100%; max-width: 250px; margin: 10px"
              @change="sortedLessons"
              v-model="sortByOptions.direction"
            >
              <option value="ascending">Ascending</option>
              <option value="descending">Descending</option>
            </select>
          </div>
        </div>
      </div>
    </header>

    <section class="py-5">
      <div class="container px-4 px-lg-5 mt-5">
        <div
          class="row gx-4 gx-lg-5 row-cols-1 row-cols-md-3 row-cols-xl-4 justify-content-center"
        >
          <div
            class="col mb-5"
            v-for="product in filteredProducts"
            :key="product.id"
          >
            <div class="card h-100">
              <!-- Course image-->
              <div style="position: relative;">
              <img
                class="card-img-top"
                v-bind:src="product.image"
                style="
                  height: 250px;
                  width: 100%;
                  object-fit: fill;
                  border-bottom: 1px solid rgb(8, 70, 4);
                "
              /></div>
              
              <!-- Product details-->
              <div class="card-body p-4" style="background-color: #f0f7ee;">
                <div class="text-center">
                  <!-- Product name-->
                  <h5 class="fw-bolder" style="border-bottom: 1px solid grey; color: #2b785d;">
                    {{ product.subject }}
                  </h5>
                  <!-- Product price-->
                  <h5 class="fw-normal" style="color: #4f9e64;">Location:</h5>
                  <h5 class="fw-light" style="color: #2b785d;">{{ product.location }}</h5>
                  <h5 style="margin-top: 15px; color: #4f9e64;" class="fw-normal">
                    Spaces: {{ product.space }}
                  </h5>
                  <h5 style="margin-top: 15px; color: #2b785d;" class="fw-semibold">
                    AED {{ product.price }}
                  </h5>
                </div>
              </div>
              <!-- Product actions-->
              <div class="card-footer p-4 pt-0 border-top-0 bg-transparent" style="background-color: #f0f7ee;">
                <div class="text-center">
                  <button
                    class="btn btn-outline-success mt-auto"
                    @click="addToCart(product)"
                    v-if="spaceCount(product)"
                  >
                    Add To Cart
                  </button>
                  <button class="btn btn-success mt-auto" v-else disabled>
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <footer style="background-color:#68ce7c;" v-if="page === 'product'">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-12 col-sm-6 mb-3 mb-sm-0 text-center text-sm-start">
            <p class="m-0 text-white">© WestPoint School</p>
          </div>
          <div class="col-12 col-sm-6 text-center text-sm-end">
            <ul class="list-inline mb-0">
              
            </ul>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
// import { products } from "./products.js";
import axios from 'axios';

export default {
  data() {
    return {
      products: [],
      filteredProducts: [],
      // products: products,
      search: "",
      sortByOptions: {
        type: "subject",
        direction: "ascending",
        sort: 'ascending',
      },
    };
  },

  methods: {
    filteredList() {
  fetch(`http://localhost:3000/collection/lesson/search?key_word=${this.search}`)
    .then(response => response.json())
    .then(data => {
      this.filteredProducts = data;
    })
    .catch(error => {
      console.error(error);
    });
},
    searchProducts() {
      this.filteredProducts = this.products.filter(product =>
        product.subject.toLowerCase().includes(this.search.toLowerCase())
      );
      this.sortedLessons();
    },

    addToCart(product) {
      this.$emit("addProduct", product);
    },
    spaceCount(product) {
      if (product.space > 0) {
        return true;
      } else {
        return false;
      }
    },
    sortedLessons() {
  switch (this.sortByOptions.type) {
    case 'subject':
      return this.filteredProducts.sort((a, b) => {
        return this.sortByOptions.direction === 'ascending' ? a.subject.toUpperCase() > b.subject.toUpperCase() ? 1 : -1 : a.subject.toUpperCase() < b.subject.toUpperCase() ? 1 : -1;
      });
    case 'location':
      return this.filteredProducts.sort((a, b) => {
        return this.sortByOptions.direction === 'ascending' ? a.location.toUpperCase() > b.location.toUpperCase() ? 1 : -1 : a.location.toUpperCase() < b.location.toUpperCase() ? 1 : -1;
      });
    case 'price':
      return this.filteredProducts.sort((a, b) => {
        return this.sortByOptions.direction === 'ascending' ? a.price - b.price : b.price - a.price;
      });
    case 'space':
      return this.filteredProducts.sort((a, b) => {
        return this.sortByOptions.direction === 'ascending' ? a.space - b.space : b.space - a.space;
      });
    default:
      return this.filteredProducts.sort((a, b) => {
        return this.sortByOptions.direction === 'ascending' ? a.id - b.id : b.id - a.id;
      });
  }
}

  },
  created() {
  axios.get('http://localhost:3000/collection/lesson/search?key_word=' + this.search)
    .then(response => {
      this.products = response.data;
      this.filteredProducts = response.data;
    })
    .catch(error => {
      console.error(error);
    });
},

  computed: {
    // filteredProducts() {
    //   return this.products.filter((product) => {
    //     return (
    //       product.subject.toLowerCase().includes(this.search.toLowerCase()) ||
    //       product.location.toLowerCase().includes(this.search.toLowerCase())
    //     );
    //   });
    // },
  },
};
</script>

<style>
/* Product card */
/* Define your color scheme */
:root {
  --primary-color: #5eff006b;
  --secondary-color: #0c8b3b;
  --text-color: #343a40;
}

/* Apply the color scheme to elements */
.card {
  background-color: var(--primary-color);
  color: var(--text-color);
}

.btn {
  background-color: var(--secondary-color);
  color: var(--text-color);
}
.card {
  box-shadow: 0 0 10px rgba(0, 82, 52, 0.1);
  border-radius: 8px;
  /* Additional styling */
}
.btn:hover {
  background-color: var(--primary-color);
  color: var(--text-color);
  /* Additional effects */
}

.card:hover {
  box-shadow: 0 0 12px rgba(78, 237, 99, 0.599);
  /* Additional effects */
}
body {
  font-family: "Arial", sans-serif;
  /* Additional typography styles */
}

h5 {
  font-size: 18px;
  font-weight: bold;
  /* Additional typography styles */
}
/* Adjust the layout for smaller screens */
@media (max-width: 768px) {
  .row-cols-md-3 {
    grid-template-columns: repeat(2, 1fr);
  }
}

</style>
