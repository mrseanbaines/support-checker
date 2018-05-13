<template>
  <div v-if="data">

    <form>
      <div v-if="browsers">
        <label>Browser</label>
        <select v-model="selectedBrowser" @change="clear" required>
          <option disabled value="">Select a browser</option>
          <option
            v-for="browser in browsers"
            :key="browser[0]"
            :value="browser"
          >
            {{ browser[1].browser }}
          </option>
        </select>
        <span v-if="selectedBrowser">{{ selectedBrowser[1].browser }}</span>
      </div>

      <div v-if="selectedBrowser">
        <label>Version</label>
        <select v-model="browserVersion" @change="getFiltered" required>
          <option disabled value="">Select a version</option>
          <option
            v-for="version in filteredVersions"
            :key="version"
            :value="version"
          >
            {{ version }}
          </option>
        </select>
        <span>{{ browserVersion }}</span>
      </div>
    </form>

    <div v-if="filteredProps">
      <p>
        <small>
          {{ filteredProps.length }} results
        </small>
      </p>
      <p>
        <strong>
          The following properties or features are not supported by
          {{ selectedBrowser[1].browser }} {{ browserVersion }}:
        </strong>
      </p>
      <p
        v-for="prop in filteredProps"
        :key="prop[0]"
      >
        {{ prop[1].title }}
      </p>
    </div>

  </div>
</template>

<script>
/* eslint-disable no-console */

import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      selectedBrowser: '',
      browserVersion: '',
      filteredProps: null,
    };
  },
  name: 'Home',
  computed: {
    ...mapGetters([
      'data',
      'browsers',
      'filteredData',
    ]),
    filteredVersions() {
      return this.selectedBrowser[1].versions.filter(x => x !== null).reverse();
    },
  },
  methods: {
    clear() {
      this.browserVersion = '';
      this.filteredProps = null;
    },
    getFiltered() {
      this.filteredProps =
        this.filteredData(this.selectedBrowser[0], this.browserVersion);
    },
  },
};
</script>
