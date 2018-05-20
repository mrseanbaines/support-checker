<template>
  <div v-if="data">

    <Filters></Filters>

    <div v-if="selectedVersion">
      <p class="push-top">
        <small>
          {{ filteredProps.length }}
          {{ filteredProps.length > 1 ? 'results' : 'result' }}
        </small>
      </p>
      <p>
        <strong>
          The following properties or features are not supported by
          {{ selectedBrowser[1].browser }} {{ selectedVersion }}:
        </strong>
      </p>
      <ul>
        <li
          class="with-border-top pad-top"
          v-for="prop in filteredProps"
          :key="prop[0]"
        >
          <a>{{ prop[1].title }}</a>
          <p>
            <small v-for="(category, i) in prop[1].categories" :key="i">
              {{ category }}{{ i !== prop[1].categories.length - 1 ? ', ' : '' }}
            </small>
          </p>
        </li>
      </ul>
    </div>

  </div>
</template>

<script>
/* eslint-disable no-console */

import { mapGetters } from 'vuex';
import Filters from './Filters';

export default {
  name: 'Home',
  components: {
    Filters,
  },
  computed: {
    ...mapGetters([
      'data',
      'selectedBrowser',
      'selectedVersion',
      'categories',
      'selectedCategories',
      'query',
    ]),
    filteredProps() {
      const browser = this.selectedBrowser[0];
      const version = this.selectedVersion;

      return this.data
        // Filter by browser & version
        .filter(prop =>
          prop[1].stats[browser][version].includes('n'),
        )
        // Filter by categories
        .filter(prop =>
          prop[1].categories.some(x =>
            this.selectedCategories.includes(x) ||
            this.selectedCategories.length === 0,
          ),
        )
        // Filter by search term
        .filter(prop =>
          prop[1].title.toLowerCase()
            .includes(this.query.toLowerCase()),
        );
    },
  },
};
</script>
