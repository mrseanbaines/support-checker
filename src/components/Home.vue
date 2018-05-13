<template>
  <div v-if="data">

    <form>
      <div v-if="browsers">
        <label>Browser</label>
        <select v-model="selectedBrowser" @change="clearVersion" required>
          <option disabled value="">Select a browser</option>
          <option
            v-for="browser in browsers"
            :key="browser.abbr"
            :value="browser"
          >
            {{ browser.browser }}
          </option>
        </select>
        <span>{{ selectedBrowser.browser }}</span>
      </div>

      <div v-if="selectedBrowser">
        <label>Version</label>
        <select v-if="selectedBrowser" v-model="browserVersion" required>
          <option disabled value="">Select a version</option>
          <option
            v-for="version in filteredVersions.reverse()"
            :key="version"
            :value="version"
          >
            {{ version }}
          </option>
        </select>
        <span>{{ browserVersion }}</span>
      </div>

      <button v-if="browserVersion" type="submit">Submit</button>
    </form>

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
    };
  },
  name: 'Home',
  computed: {
    ...mapGetters([
      'data',
      'browsers',
    ]),
    filteredVersions() {
      return this.selectedBrowser.versions.filter(x => x !== null);
    },
  },
  methods: {
    clearVersion() {
      this.browserVersion = '';
    },
  },
};
</script>
