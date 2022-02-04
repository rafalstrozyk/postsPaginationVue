<template>
  <div v-if="post && user" class="card">
    <h3 class="card_title">{{ post.title }}</h3>
    <div class="card_user m-t-1">{{ user.name }}</div>
    <div>
      <p class="card_p m-t-1">
        {{ showMore ? post.body : truncate(post.body, 50) }}
      </p>
      <button class="btn_content" v-on:click="handleShowMore">
        {{ showMore ? 'see less' : 'see more' }}
      </button>
    </div>
    <div class="m-t-2">
      <span class="card_removing" v-if="isDelete">removing ...</span>
      <button class="btn_remove" v-else v-on:click="deletePost">
        Remove post
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: {
    post: Object,
    user: Object,
  },
  data() {
    return {
      showMore: false,
      isDelete: false,
    };
  },
  methods: {
    truncate(str, n) {
      return str.length > n ? str.substr(0, n - 1) + '...' : str;
    },
    handleShowMore() {
      this.showMore = !this.showMore;
    },
    deletePost() {
      return [
        this.$store.dispatch('deletePost', this.post.id),
        (this.isDelete = true),
      ];
    },
  },
};
</script>

<style lang="scss">
@import './_card.scss';
</style>
