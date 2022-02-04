<template>
  <div id="app" class="center_container m-t-3">
    <div class="m-children">
      <span v-if="loading">Loading...</span>
      <Card
        v-else
        v-for="post in postsOnPage"
        :key="post.id"
        :post="post"
        :user="getUser(post.userId)"
      />
    </div>
    <Pagination
      :totalPages="parseInt(posts.length / 10)"
      :perPage="10"
      :currentPage="currentPage"
      @pagechanged="onPageChange"
    />
  </div>
</template>

<script>
import Card from './components/Card/Card.vue';
import Pagination from './components/Pagination/Pagination.vue';

export default {
  name: 'App',
  components: { Card, Pagination },
  data() {
    return {
      currentPage: 1,
    };
  },
  mounted() {
    this.$store.dispatch('getPosts');
    this.$store.dispatch('getUsers');
  },
  computed: {
    loading() {
      return this.$store.getters.getLoading;
    },
    postsOnPage() {
      return this.$store.getters.postsOnPage;
    },
    posts() {
      return this.$store.getters.allPosts;
    },
    users() {
      return this.$store.getters.users;
    },
  },
  methods: {
    getUser(id) {
      return this.users.find((x) => x.id === id);
    },
    onPageChange(page) {
      this.currentPage = page;
    },
  },
  watch: {
    posts() {
      this.$store.dispatch('postsOnPage', this.currentPage);
    },
    currentPage() {
      this.$store.dispatch('postsOnPage', this.currentPage);
    },
  },
};
</script>

<style lang="scss">
@import './assets/scss/idex.scss';
</style>
