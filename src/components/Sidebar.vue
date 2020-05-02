<template>
  <div id="sidebar">
    <h1>Filter By</h1>
    <div>
      <b-form-group
        id="category-filter-group"
        :label="filters.category.name"
        label-for="category-filter"
      >
        <b-form-select
          id="category-filter"
          v-model="filters.category.selected"
          :options="filters.category.values"
          @change="filterData"
        />
      </b-form-group>

      <b-form-group
        id="ownership-filter-group"
        :label="filters.ownership.name"
      >
        <b-form-checkbox-group
          v-model="filters.ownership.selected"
          :options="filters.ownership.values"
          @input="filterData"
          switches
          stacked
        ></b-form-checkbox-group>
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
        ownership: {
          name: 'Ownership',
          selected: null,
          values: [],
        },
      },
    };
  },
  created() {
    this.initFilters();
  },
  methods: {
    /**
     * Pre-populate values of all filters
     */
    initFilters() {
      const data = {};
      const filters = Object.keys(this.filters);

      // Take unique values for each filter and convert them to lower-case
      filters.map(filter => {
        data[filter] = {};
        this.data.features.map(feature => {
          data[filter][feature.properties.project[this.filters[filter].name].toLowerCase()] = 1;
        });
      });
      filters.map(filter => this.filters[filter].values = Object.keys(data[filter]));
    },

    /**
     * Filter source data based on selected filters
     *
     * Emits filtered results as 'results'
     */
    filterData() {
      let results = this.data.features;

      Object.keys(this.filters).map(filter => {
        results = this.filterBy(results, filter);
      });
      // Return only 'project' properties
      results = results.map(marker => marker.properties.project);

      this.$emit('results', results);
    },

    /**
     * Filter given 'list' using 'filter'
     *
     * @param array  list
     * @param string filter
     * @return boolean
     */
    filterBy(list, filter) {
      return list.filter(feature => {
        let property = feature.properties.project[this.filters[filter].name].toLowerCase();
        // Filter not selected so ignore it
        if (!this.filters[filter].selected) {
          return true;
        }
        // Selected filter is an array so exclude this feature if property doesn't exists in that array
        if (Array.isArray(this.filters[filter].selected)) {
          if (this.filters[filter].selected.length > 0
            && this.filters[filter].selected.indexOf(property) === -1) {
            return false;
          }
        }
        // Selected filter is a string so exclude this feature if property is not equal to it
        else if (this.filters[filter].selected && property !== this.filters[filter].selected) {
          return false;
        }
        // Filters passed
        return true;
      });
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
  #ownership-filter-group {
    label {
      text-transform: capitalize;
    }
  }
}
</style>
