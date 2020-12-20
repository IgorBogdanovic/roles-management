<template>
  <div class="filter">
    <input
      v-model="filter.name"
      type="text"
      placeholder="Search"
      @input="applyFilter()">

    <div class="status">
      <label>Role Status</label>
      <select
        v-model="filter.status"
        @change="applyFilter()">
        <option value="all">Active and Inactive</option>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FilterCmp',

  props: {
    items: {
      type: Array,
      required: true
    }
  },

  data () {
    return {
      filteredItems: [...this.items],
      filter: {
        name: '',
        status: 'all'
      }
    }
  },

  methods: {
    async applyFilter () {
      this.filteredItems = await this.filterItems(this.filter, this.items)
      this.$emit('filtered', this.filteredItems)
    },

    async filterItems (filter, items) {
      const { name, status } = filter
      if (!name && !status) return items

      let filteredItems = items
      if (name) {
        filteredItems = await this.filterByName(name, filteredItems)
      }
      if (status) {
        filteredItems = await this.filterByStatus(status, filteredItems)
      }
      return filteredItems
    },

    async filterByName (name, items) {
      return items.filter(item => item.name.toUpperCase().includes(name.toUpperCase()))
    },

    async filterByStatus (status, items) {
      const statusFilters = {
        all: () => items,
        active: () => items.filter(item => item.active),
        inactive: () => items.filter(item => !item.active)
      }
      return statusFilters[status]()
    }
  }
}
</script>

<style lang="scss" scoped>
.filter {
  display: flex;
  align-items: flex-end;

  input {
    margin-right: 2rem;

    @include breakpoint(desktop) {
      margin-right: 4rem;
    }
  }

  label {
    display: block;
    padding-left: .4rem;
    margin-bottom: .5rem;
  }
}
</style>
