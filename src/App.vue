<template>
  <main id="app">
    <login></login>
    <header>
      <h1><router-link to="/">RECEPTIA</router-link></h1>
    </header>
    <article>
      <router-view/>
      <aside>
        <nav id="nav">
          <router-link to="/burgers">Burgers</router-link>
        </nav>
      </aside>
    </article>
  </main>
</template>

<script>
import login from '@/components/Login.vue'
export default {
  name: 'app',
  components: {
    login
  }
}
</script>

<style src="./App.css"></style>
