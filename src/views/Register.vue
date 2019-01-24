<template>
  <article>
    <div class="card-body">
      <form @submit.prevent="submit" class="layout">
        <label>First name
          <input type="text" v-model="firstname" :disabled="loading" placeholder="Enter your first name" required/>
        </label>
        <label>Last name
          <input type="text" v-model="lastname" :disabled="loading" placeholder="Enter your last name" required/>
        </label>
        <label>Email
          <input type="email" v-model="email" :disabled="loading" placeholder="Enter your email" required/>
        </label>
        <label>Password
          <input type="password" v-model="password" :disabled="loading" placeholder="Enter your password" required/>
        </label>
        <div>
          <div>
            <span class="msg" v-if="message">{{message}}</span>
          </div>
          <div>
            <button type="submit" :disabled="loading">Register</button>
          </div>
        </div>

      </form>
    </div>
  </article>
</template>

<script>
export default {
  name: 'register',
  data() {
    return {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      message: '',
      loading: false
    };
  },
  methods: {
    submit() { // register
      this.loading = true;
      this.message = '';
      this.$axios.post('register.php', {
        firstname: this.firstname,
        lastname: this.lastname,
        email: this.email,
        password: this.password,
      }).then(response => {
        this.loading = false;
        if(response.data) {
          this.message = 'Registered';
        } else {
          this.message = 'Incorrect email/password';
        }
      }).catch(error => {
        this.message = 'Error';
        console.log('Error', error);
        this.loading = false;
      });
    }
  }
}
</script>

<style scoped>
#top{
  margin: -30px 0 15px -15px;
}
#top a{
  margin-right: 20px;
  font-family: "Kodchasan";
  color: #eee;
}
.card-body{
  box-sizing: border-box;
  background: rgba(255,255,255,0.9);
  border: 1px solid #eee;
  border-radius: 5px;
  padding: 10px 15px;
  max-width:400px;
  /* position: absolute;
  top: 50px;
  left: 50px; */
}
.card-body .msg{
  margin-left:10px;
}
.card-body .welcome{
  margin-right:10px;
  font-weight:bold;
}
.layout{
  display:flex;
  flex-direction: column;
}
.layout>*{
  display:flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom:5px;
}
</style>
