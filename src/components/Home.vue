<template>
  <div v-if="data">

    <div v-if="browsers">
      <label for="browser">Browser</label>
      <select id="browser" v-model="selectedBrowser" required  @change="reset">
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
      <label for="version">Version</label>
      <select id="version" v-model="selectedVersion" required>
        <option disabled value="">Select a version</option>
        <option
          v-for="version in filteredVersions"
          :key="version"
          :value="version"
        >
          {{ version }}
        </option>
      </select>
      <span>{{ selectedVersion }}</span>
    </div>

    <div v-if="selectedVersion">
      <p>
        <small>
          {{ filteredProps.length }} results
        </small>
      </p>
      <p>
        <strong>
          The following properties or features are not supported by
          {{ selectedBrowser[1].browser }} {{ selectedVersion }}:
        </strong>
      </p>
      <div
        v-for="prop in filteredProps"
        :key="prop[0]"
      >
        {{ prop[1].title }}
        <br>
      </div>
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
      selectedVersion: '',
    };
  },
  name: 'Home',
  computed: {
    ...mapGetters([
      'data',
      'browsers',
      'categories',
    ]),
    filteredVersions() {
      return this.selectedBrowser[1].versions.filter(x => x !== null).reverse();
    },
    filteredProps() {
      const browser = this.selectedBrowser[0];
      const version = this.selectedVersion;

      return this.data.filter(prop =>
        prop[1].stats[browser][version].includes('n'),
      );
    },
  },
  methods: {
    reset() {
      this.selectedVersion = '';
    },
  },
};
</script>
