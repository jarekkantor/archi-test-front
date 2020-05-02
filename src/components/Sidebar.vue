<template>
  <div id="sidebar">
    <h1>Filter By</h1>
    <div>
      <b-form-group
        :label="filters.category.name"
        label-for="category-filter"
      >
        <b-form-select
          id="category-filter"
          v-model="filters.category.selected"
          :options="filters.category.values"
          @change="plot"
        />
      </b-form-group>
    </div>

  </div>
</template>

<script>
export default {
  name: 'Sidebar',
  props: {
    data: {},
  },
  data() {
    return {
      filters: {
        category: {
          name: 'Category',
          selected: null,
          values: [],
        },
      },
    };
  },
  created() {
    this.initCategories();
  },
  methods: {
    initCategories() {
      const data = {};

      this.data.features.map(feature => {
        data[feature.properties.project.Category.toLowerCase()] = 1;
      });

      this.filters.category.values = Object.keys(data);
    },
    plot() {
      let markers = [];

      this.data.features.map(feature => {
        if (feature.properties.project.Category.toLowerCase() === this.filters.category.selected) {
          markers.push(feature.properties.project);
        }
      });

      this.$emit('markersUpdated', markers);
    },
  },
};
</script>

<style lang="scss">
#sidebar {
  width: 250px;
  margin: 0 15px;

  select {
    text-transform: capitalize;
  }
}
</style>
