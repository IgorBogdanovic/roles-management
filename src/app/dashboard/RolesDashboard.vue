<template>
  <div class="dashboard">
    <h1>User Role Management</h1>

    <div class="top-bar">
      <filter-cmp
        ref="filter"
        :items="rolesState"
        @filtered="roles = $event" />
      <button-cmp @clicked="$router.push({ name: 'CreateRole' })">
        Create New Role
      </button-cmp>
    </div>

    <div class="role-cards-wrapper">
      <role-card
        v-for="role of roles"
        :key="role.id"
        :role="role" />
    </div>
  </div>
</template>

<script>
import ButtonCmp from '@/-common-/components/ButtonCmp'
import FilterCmp from './components/FilterCmp'
import RoleCard from './components/RoleCard'

import { createNamespacedHelpers } from 'vuex'

const { mapState: mapRolesState, mapActions: mapRolesActions } = createNamespacedHelpers('roles')

export default {
  name: 'RolesDashboard',

  components: {
    ButtonCmp,
    FilterCmp,
    RoleCard
  },

  data () {
    return {
      roles: null
    }
  },

  computed: {
    ...mapRolesState({
      rolesState: (state) => state.all
    })
  },

  watch: {
    rolesState: {
      async handler () {
        if (this.$refs.filter) {
          this.$refs.filter.applyFilter()
        }
      },
      deep: true
    }
  },

  async mounted () {
    await this.loadRoles()
    this.$refs.filter.applyFilter()
  },

  methods: {
    ...mapRolesActions({
      loadRoles: 'load'
    })
  }
}
</script>

<style lang="scss" scoped>
h1 {
  margin-bottom: 4rem;

  @include breakpoint(desktop) {
   margin-bottom: 8rem;
  }
}

.top-bar {
  margin-bottom: 2rem;

  @include breakpoint(desktop) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 4rem;
  }

  .btn {
    margin-top: 1rem;

    @include breakpoint(desktop) {
      margin-top: 0;
    }
  }
}

.role-cards-wrapper {
  display: flex;
  flex-wrap: wrap;
}
</style>
