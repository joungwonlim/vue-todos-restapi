<template>
  <div class="ground">
    <Header />
    <Todos />
    <Footer />
  </div>
</template>
<script>
import Header from './Header.vue';
import Todos from './Todos.vue';
import Footer from './Footer.vue';

export default {
  name: 'Ground-vue',
  components: {
    Header,
    Todos,
    Footer,
  },
  setup() {},
};
</script>
<style lang="scss" scoped></style>
