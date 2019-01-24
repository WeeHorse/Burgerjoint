<template>
  <article id="article">
    <nav id="top">
      <div v-if="user.firstname">
        <a v-on:click="logout" :disabled="loading">Logout {{user.firstname}}</a>
      </div>
      <div v-else>
        <a v-on:click="showLogin" :disabled="loading">Login</a>
        <router-link to="/register">Register</router-link>
      </div>
    </nav>
    <div v-if="!user.firstname && showingLogin" class="card-body">
      <form @submit.prevent="submit">
        <label>Email
          <input type="text" v-model="email" :disabled="loading" />
        </label>
        <label>Password
          <input type="password" v-model="password" :disabled="loading" />
        </label>
        <button type="cancel" v-on:click="cancelLogin">Cancel</button>
        <button type="submit" :disabled="loading">Login</button>
        <span class="msg" v-if="message">{{message}}</span>
      </form>
    </div>
  </article>
</template>

<script>
export default{
  name: 'login',
  data() {
    return {
      email: '',
      password: '',
      message: '',
      loading: false,
      showingLogin: false,
      user: {}
    };
  },
  created(){
    this.$axios.get('user.php').then(response => {
      console.log('/user', response);
      this.user = response.data;
    }).catch(e => {
      // not logged in
    });
  },
  methods: {
    showLogin() {
      this.showingLogin = true;
    },
    cancelLogin(e){
      e.preventDefault();
      this.showingLogin = false;
    },
    submit() { // login
      this.loading = true;
      this.message = '';
      this.$axios.post('login.php', {
        email: this.email,
        password: this.password,
      }).then(response => {
        console.log('/login', response);
        this.loading = false;
        this.showingLogin = false;
        if(response.data.loggedIn) {
          this.user = response.data.user;
        } else {
          this.message = 'Incorrect email/password';
        }
      }).catch(error => {
        this.message = 'Login error';
        console.log('login error', error);
        this.loading = false;
      });
    },
    logout() {
      this.loading = true;
      this.$axios.post('logout.php').then(response => {
        console.log(response);
        this.loading = false;
        this.user = {};
      }).catch(error => {
        console.log('logout error', error);
        this.loading = false;
      });
    }
  },
  watch: {
    email() {
      this.message = '';
    },
    password() {
      this.message = '';
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
  background: rgba(255,255,255,0.7);
  border: 1px solid #eee;
  border-radius: 5px;
  padding: 5px 10px;
  /*position: absolute;
  top: 5px;
  left: 5px;
  width:calc(100vw - 10px);*/
}
.card-body label{
  margin-right:20px;
}
.card-body .msg{
  margin-left:10px;
}
.card-body .welcome{
  margin-right:10px;
  font-weight:bold;
}
</style>
