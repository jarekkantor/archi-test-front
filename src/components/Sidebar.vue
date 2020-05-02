<template>
  <div id="sidebar">
    <div class="filter-header">
      <h1>Filter By</h1>
      <a href="#" @click="resetAllFilters">Reset All</a>
    </div>
    <div>
      <!-- Category filter -->
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
        >
          <template v-slot:first>
            <b-form-select-option value="" disabled>-- Please select --</b-form-select-option>
          </template>
        </b-form-select>
      </b-form-group>

      <!-- Ownership filter -->
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

      <!-- Dev. Type filter -->
      <b-form-group
        id="dev_type-filter-group"
        label="Development Type"
      >
        <b-form-checkbox-group
          v-model="filters.dev_type.selected"
          :options="filters.dev_type.values"
          @input="filterData"
          switches
          stacked
        ></b-form-checkbox-group>
      </b-form-group>

      <!-- Status filter -->
      <b-form-group
        id="status-filter-group"
        :label="filters.status.name"
      >
        <b-form-checkbox-group
          v-model="filters.status.selected"
          :options="filters.status.values"
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
          selected: '',
          values: [],
        },
        ownership: {
          name: 'Ownership',
          selected: [],
          values: [],
        },
        dev_type: {
          name: 'Dev. Type',
          selected: [],
          values: [],
        },
        status: {
          name: 'Status',
          selected: [],
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
      filters.map(filter => {
        console.log(`Values loaded for ${filter} filter.`);
        this.filters[filter].values = Object.keys(data[filter]);
      });
    },

    /**
     * Reset all filters
     */
    resetAllFilters(event) {
      event.preventDefault();
      Object.keys(this.filters).map(filter => {
        console.log(`Filter ${filter} reset.`);
        this.filters[filter].selected = Array.isArray(this.filters[filter].selected) ? [] : '';
      });
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

      // Return no results when none of the filters has been selected
      let selected = Object.keys(this.filters).filter(filter => this.filters[filter].selected.length);
      if (results.length === this.data.features.length && selected.length === 0) {
        results = [];
      }

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
  margin: 15px;
  margin-right: 0;
  padding: 15px 20px;

  border: 1px solid #eee;
  border-right: none;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;

  .filter-header {
    position: relative;

    h1 {
      font-size: 22px;
      border-bottom: 1px solid #eee;
      margin-bottom: 15px;
    }

    a {
      position: absolute;
      top: 0;
      right: 0;
      cursor: pointer;
    }
  }

  label,
  legend {
    font-weight: bold;
  }

  select {
    text-transform: capitalize;
  }
  #ownership-filter-group,
  #dev_type-filter-group,
  #status-filter-group {
    label {
      font-weight: normal;
      text-transform: capitalize;
      cursor: pointer;
    }
  }
}
</style>
