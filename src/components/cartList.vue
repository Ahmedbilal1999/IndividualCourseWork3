<template>
  <div class="container my-5">
    <h2 class="mb-4" style="color: #4CAF50;">Cart</h2>
    <div v-if="cartCount === 0" class="alert alert-info" role="alert" style="background-color: #E1F7E0;">
      Your cart is empty
    </div>
    <div v-else>
      <section class="py-5">
        <div class="container px-4 px-lg-5 mt-5">
          <div
            class="row gx-4 gx-lg-5 row-cols-1 row-cols-md-3 row-cols-xl-4 justify-content-center"
          >
            <div class="col mb-5" v-for="product in cart" :key="product.id">
              <div class="card h-100" style="background-color: #E1F7E0;">
                <!-- Product image-->
                <img
                  class="card-img-top"
                  v-bind:src="product.image"
                  style="
                    height: 250px;
                    width: 100%;
                    border-bottom: 1px solid grey;
                  "
                />
                <!-- Product details-->
                <div class="card-body p-4">
                  <div class="text-center">
                    <!-- Product name-->
                    <h5 class="fw-bolder" style="border-bottom: 1px solid grey; color: #4CAF50;">
                      {{ product.subject }}
                    </h5>
                    <!-- Product price-->
                    <h5 class="fw-normal" style="color: #4CAF50;">Location:</h5>
                    <h5 class="fw-light" style="color: #4CAF50;">{{ product.location }}</h5>
                    <h5 style="margin-top: 15px; color: #4CAF50;" class="fw-normal">
                      Quantity: {{ product.cartquantity }}
                    </h5>
                    <h5 style="margin-top: 15px" class="fw-semibold">
                      AED {{ product.price }}
                    </h5>
                  </div>
                </div>
                <!-- Product actions-->
                <div class="card-footer p-4 pt-0 border-top-0 bg-transparent" style="background-color: #E1F7E0;">
                  <div class="text-center">
                    <button
                      class="btn btn-outline-success mt-auto"
                      @click="removeFromCart(product)"
                      v-if="cartQuantity(product)"
                    >
                      Remove From Cart
                    </button>
                    <button
                      class="btn btn-outline-dark mt-auto"
                      @click="reduceQuantity(product)"
                      v-else
                    >
                      Reduce Quantity from Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    cart: {
      type: Array,
      required: true,
    },
  },
  computed: {
    cartCount() {
      return this.cart.length;
    },
  },
  methods: {
    cartQuantity(product) {
      if (product.cartquantity > 1) {
        return false;
      } else {
        return true;
      }
    },

    removeFromCart(product) {
      this.$emit("remove-from-cart", product);
    },

    reduceQuantity(product) {
      this.$emit("reduce-quantity", product);
    },
  },
};
</script>

<style>
.cart-item-quantity {
  display: flex;
  align-items: center;
}

.cart-item-quantity button {
  margin: 0 5px;
}
</style>
