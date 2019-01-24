<template>
  <article>
    <section
      v-for="burger in burgers"
      v-bind:key="burger.title"
      v-bind:style="{ backgroundImage: 'url(' + burger.image + ')' }"
      >
      <div class="image">
        <!--<img v-bind:src="burger.image">-->
      </div>
      <div class="text">
        <h2>{{burger.title}} <span class="price">{{burger.price}}kr</span></h2>
        <div class="icons">
          <div>
            <i class="fas fa-apple-alt"></i>
            <i class="fas fa-utensils"></i>
          </div>
          <div>
            <i class="fas fa-dollar-sign"></i>
          </div>
          <div>
            <i class="far fa-star"></i>
          </div>
          <i class="far fa-clock"></i>
        </div>
        <p>{{burger.text}}</p>
        <button v-on:click="order(burger)">Order {{burger.title}}</button>
      </div>
    </section>
    <div class="message" v-if="message">
      {{message}}
    </div>
  </article>
</template>

<script>
  export default{
    data(){
      return{
        burgers: [],
        message: ''
      }
    },
    created(){
      this.$axios.get('burgers.php').then((response) => {
        this.burgers = response.data;
      })
    },
    methods: {
      order(food){
        food.type = 'burger'
        // alert(id);
        this.$axios.post('place-order.php', food).then((response) => {
          console.log('place order response', response);
          this.message = `We are cooking your ${food.type} and it will be done in ${food.cooking_minutes} minutes`
        })
      }
    }
  }
</script>
