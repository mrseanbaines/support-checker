<template>
  <ul>

    <li v-if="browsers">
      <label for="browser">
        <strong>
          Browser
        </strong>
      </label>
      <select
        id="browser"
        required
        v-model="browser"
        @change="setSelected('selectedBrowser', browser)"
      >
        <option disabled selected value="">Select a browser</option>
        <option
          v-for="browser in browsers"
          :key="browser[0]"
          :value="browser"
        >
          {{ browser[1].browser }}
        </option>
      </select>
    </li>

    <li class="push-top" v-if="selectedBrowser">
      <label for="version">
        <strong>
          Version
        </strong>
      </label>
      <select
        id="version"
        required
        v-model="version"
        @change="setSelected('selectedVersion', version)"
      >
        <option
          disabled
          selected
          value=""
        >
          Select a version
        </option>
        <option
          v-for="version in filteredVersions"
          :key="version"
          :value="version"
        >
          {{ version }}
        </option>
      </select>
    </li>

    <li class="push-top">
      <strong>
        Categories
      </strong>
    </li>

    <li>
      <ul>
        <li v-for="category in categories" :key="category[0]">
          <input
            v-model="filteredCategories"
            :value="category[1]"
            :id="category[0]"
            type="checkbox"
            @change="setCategories()"
          >
          <label :for="category[0]">{{ category[0] }}</label>
        </li>
      </ul>
    </li>

    <li class="push-top">
      <label for="search">
        <strong>
          Search
        </strong>
      </label>
      <input
        id="search"
        type="search"
        v-model="searchText"
        @keyup="setSearch"
        placeholder="Filter by title"
      >
    </li>

  </ul>
</template>

<script>
/* eslint-disable no-console */

import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      browser: '',
      version: '',
      filteredCategories: [],
      searchText: '',
    };
  },
  name: 'Filters',
  computed: {
    ...mapGetters([
      'browsers',
      'selectedBrowser',
      'selectedVersion',
      'categories',
    ]),
    filteredVersions() {
      return this.selectedBrowser[1].versions.filter(x => x !== null).reverse();
    },
  },
  methods: {
    setSelected(key, value) {
      this.$store.dispatch('setSelected', {
        [key]: value,
      });
    },
    setCategories() {
      this.$store.dispatch('setCategories', this.filteredCategories);
    },
    setSearch() {
      this.$store.dispatch('setSearch', this.searchText);
    },
  },
};
</script>
