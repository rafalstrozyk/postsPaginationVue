import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    pageSize: 10,
    posts: [],
    users: [],
    postsOnPage: [],
    loading: false,
  },
  getters: {
    allPosts: (state) => state.posts,
    postsOnPage: (state) => state.postsOnPage,
    users: (state) => state.users,
    getLoading: (state) => state.loading,
  },
  mutations: {
    SET_POSTS(state, posts) {
      state.posts = posts;
    },
    SET_POSTS_ON_PAGE(state, posts) {
      state.postsOnPage = posts;
    },
    SET_USERS(state, users) {
      state.users = users;
    },
    SET_LOADIN(state, isLoading) {
      state.loading = isLoading;
    },
    DELETE_POST(state, id) {
      const i = state.posts.map((item) => item.id).indexOf(id);
      state.posts.splice(i, 1);
    },
  },
  actions: {
    async getPosts({ commit }) {
      commit('SET_LOADIN', true);
      await axios
        .get('https://jsonplaceholder.typicode.com/posts')
        .then((res) => {
          commit('SET_POSTS', res.data);
          commit('SET_LOADIN', false);
        });
    },
    postsOnPage({ commit, state }, pageNumber) {
      const result = () => {
        return state.posts.slice(
          (pageNumber - 1) * state.pageSize,
          pageNumber * state.pageSize
        );
      };
      commit('SET_POSTS_ON_PAGE', result());
    },
    async getUsers({ commit }) {
      commit('SET_LOADIN', true);
      await axios
        .get('https://jsonplaceholder.typicode.com/users')
        .then((res) => {
          commit('SET_USERS', res.data);
          commit('SET_LOADIN', false);
        });
    },
    async deletePost({ commit }, id) {
      await axios
        .delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
        .then(() => {
          commit('DELETE_POST', id);
        });
    },
  },
  modules: {},
});
