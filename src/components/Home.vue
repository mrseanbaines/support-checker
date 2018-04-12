<template>
  <div v-if="all">
    <h1>{{ all.title }}</h1>
    <p>{{ all.body }}</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Home',
  computed: {
    ...mapGetters(['all']),
  },
};
</script>
