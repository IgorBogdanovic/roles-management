<template>
  <div class="manage-role">
    <h1>{{ manageMode.charAt(0).toUpperCase() + manageMode.slice(1) }} Role</h1>

    <div class="form">
      <div class="form-item">
        <label>Role Name</label>
        <input
          v-model="form.name"
          type="text">
      </div>
      
      <div class="form-item">
        <label>Role Type</label>
        <select v-model="form.type">
          <option value="admin">Administrator Role</option>
          <option value="job_admin">Job Administrator Role</option>
        </select>
      </div>

      <div class="form-item">
        <label>Role Description</label>
        <textarea
          v-model="form.description"
          style="width: 100%; height: 15rem;" />
      </div>

      <div class="form-item checkbox">
        <label>Role is editable</label>
        <input
          type="checkbox"
          v-model="form.editable">
      </div>

      <div class="form-item checkbox">
        <label>Role is active</label>
        <input
          type="checkbox"
          v-model="form.active">
      </div>
    </div>

    <button-cmp
      class="back"
      type="neutral"
      @clicked="$router.push({ name: 'RolesDashboard' })">
      Back
    </button-cmp>

    <button-cmp
      class="save"
      :disabled="!form.name"
      @clicked="saveRole()">
      Save
    </button-cmp>
  </div>
</template>

<script>
import store from '@/store'
import ButtonCmp from '@/-common-/components/ButtonCmp'

import { createNamespacedHelpers } from 'vuex'

const { mapGetters: mapRolesGetters, mapActions: mapRolesActions } = createNamespacedHelpers('roles')

export default {
  name: 'ManageRole',

  components: {
    ButtonCmp
  },

  // eslint-disable-next-line no-unused-vars
  async beforeRouteEnter (to, from, next) {
    if (to.name === 'CreateRole') {
      next()
    }
    await store.dispatch('roles/load')
    const role = store.getters['roles/getById'](parseInt(to.params.id))
    role.editable ? next() : next({ name: 'RolesDashboard' })
  },

  data () {
    return {
      manageMode: 'create',
      form: {
        name: '',
        type: 'admin',
        description: '',
        editable: false,
        active: false,
        users: []
      }
    }
  },

  computed: {
    ...mapRolesGetters({
      getRoleById: 'getById'
    })
  },

  async created () {
    this.setRoleData()
  },

  methods: {
    ...mapRolesActions({
      createRole: 'create',
      updateRole: 'update'
    }),

    setRoleData () {
      if (this.$route.name === 'EditRole') {
        this.manageMode = 'edit'
        const role = this.getRoleById(parseInt(this.$route.params.id))
        for (const key in this.form) {
          this.form[key] = role[key]
        }
      }
    },

    saveRole () {
      const payload = { ...this.form }

      const action = {
        create: () => {
          // in the real world, this would be set on back-end
          payload.created_on = new Date()
          this.createRole({ payload })
        },
        edit: () => {
          // in the real world, this would be set on back-end
          payload.modified_on = new Date()
          this.updateRole({ id: this.$route.params.id, payload })
        }
      }
      action[this.manageMode]()
      this.$router.push({ name: 'RolesDashboard' })
    }
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

.form {
  display: flex;
  flex-direction: column;
  width: 100%;

  @include breakpoint(desktop) {
    width: 50rem;
  }

  .form-item {
    margin-top: 1.5rem;

    @include breakpoint(desktop) {
      margin-top: 3rem;
    } 

    input, select {
      width: 100%;
    }

    &:not(.checkbox) {
      label {
        display: block;
        margin-bottom: .5rem;
      }
    }

    &.checkbox {
      display: flex;
      align-items: center;

      label {
        width: 30%;
      }

      input {
        width: auto;
        cursor: pointer;

        @include breakpoint(desktop) {
          width: 2.5rem;
        }
      }
    }
  }
}

.btn {
  margin-top: 2rem;

  @include breakpoint(desktop) {
    margin-top: 4rem;
  }

  &.back {
    margin-right: 1rem;
  }
}
</style>
