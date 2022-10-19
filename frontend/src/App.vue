<template>
  <div class="app">
    <Header />
    <router-view />
    <Footer />
  </div>
</template>
<script>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import Todos from './components/Todos.vue';

export default {
  name: 'App-vue',
  components: { Header, Footer, Todos },
  setup() {},
};
</script>
<style lang="scss" scoped></style>
