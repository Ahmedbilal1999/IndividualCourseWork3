

<template>
  <div class="container-fluid" style="margin-top: 50px">
    <main class="center-align">
      <div class="backs">
      <div class="row justify-content-center">
        

        <div class="col-md-8 " style="margin-top: 100px;">
          <h4 class="text-white">Checkout Billing Form</h4>
          <form class="needs-validation">
            <div class="row g-4">
              <div class="col-md-4">
                <input
                  type="text"
                  v-model="user.name"
                  class="form-control"
                  id="firstName"
                  placeholder="Name on ID"
                  required
                />
              </div>

              <div class="col-md-4">
                <input
                  type="email"
                  class="form-control"
                  id="email"
                  v-model="user.email"
                  placeholder="you@example.com"
                />
              </div>

              <div class="col-md-5">
                <input
                type="text"
                class="form-control"
                id="address"
                placeholder="Apt 8602, Marina Heights Tower"
                v-model="user.address"
                required
                />
              </div>

              <div class="col-md-3">
                <input
                  type="number"
                  class="form-control"
                  v-model.number="user.phone"
                  id="phone"
                  placeholder="+971-501-275981"
                  required
                />
              </div>
            </div>

            <hr class="my-4" />

            <button  class="w-50 btn btn-success btn-lg" value="Checkout" @click="submitCheckout"  style="margin-bottom: 25px">
              Checkout
            </button>
          </form>
        </div>
      </div>
    </div>
    </main>
  </div>
</template>

<script>
export default {
  name: "checkOut",
  data() {
    return {
      cart: [], // Assuming you have a cart array with items
      user: {
        name: "",
        email: "",
        address: "",
        city: "",
        phone: "",
        method: "Home",
        gift: false,
      },
    };
  },
  computed: {
    cartTotal() {
      return this.cart.reduce(
        (total, product) => total + product.price * product.space,
        0
      );
    },
    cartCount() {
      let count = 0;
      this.cart.forEach((item) => {
        count += item.space;
      });
      return count;
    },
  },
  methods: {
    navigateTo(page) {
      this.page = page;
    },
    submitCheckout() {
      // Update the space property of lessons in the cart
      this.cart.forEach((item) => {
        const lessonIndex = this.lessons.findIndex(
          (lesson) => lesson.id === item.id
        );
        if (lessonIndex !== -1) {
          this.lessons[lessonIndex].space += 1;
        }
      });

      // Create the order object with updated space property
      const order = {
        checkoutName: this.user.name,
        checkoutemail: this.user.email,
        checkoutaddress: this.user.address,
        checkoutstate: this.user.state,
        checkoutphone: this.user.phone,

        cartProduct: this.cart,
      };

      // Send the order to the server
      fetch("http://localhost:3000/collection/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
        cache: "no-store",
        body: JSON.stringify(order),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Order submitted:", data);
          alert(data.message);
          // Handle the response data here (e.g., show a success message)
        })
        .catch((error) => {
          console.log("Error submitting order:", error);
          // Handle the error here (e.g., show an error message)
        });

      // Reset the cart
      this.cart = [];
      // Reset the user details
      this.user = {
        name: "",
        email: "",
        address: "",
        city: "",
        phone: "",
        state: "",
        method: "Home",
        gift: false,
      };
    },
  },
};
</script>

  <style>
  /* Add custom styles here */
  .backs{
  background-image: url(@/assets/checks.jpg);
  background-repeat: no-repeat;
  background-size: cover;
  width: fit-content;
  height: 53.5vh;
}

  </style>
