<template>
  <div class="role-card">
    <span
      v-if="!role.active"
      class="status">
      Inactive
    </span>

    <div class="wrapper">
      <h5 class="name">{{ role.name }}</h5>
      <span class="type">{{ roleTypes[role.type] }}</span>
      <p class="description">{{ truncate(role.description, 120) }}</p>
      <div class="users">
        <template v-if="role.users.length">
          <img
            v-for="user of role.users"
            :key="user.id"
            :src="user.photo_url"
            alt="user image">
        </template>
        <span v-else>No assigned users</span>
      </div>
    </div>

    <div class="card-footer">
      <span class="date">{{ roleDate }}</span>
      <div v-if="role.editable">
        <span
          class="action-btn edit"
          @click="$router.push({ name: 'EditRole', params: { id: role.id } })">
          Edit
        </span>
        <span
          class="action-btn delete"
          @click="deleteRole({ id: role.id })">
          Delete
        </span>
      </div>
      <div v-else>
        <img src="@/-common-/assets/svgs/lock.svg">
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'

const { mapActions: mapRolesActions } = createNamespacedHelpers('roles')

export default {
  name: 'RoleCard',

  props: {
    role: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      roleTypes: {
        admin: 'Administrator Role',
        job_admin: 'Job Administrator Role'
      }
    }
  },

  computed: {
    roleDate () {
      return this.role.editable && this.role.modified_on
        ? `Last update: ${new Date(this.role.modified_on).toLocaleDateString('en-GB')}`
        : `Date created: ${new Date(this.role.created_on).toLocaleDateString('en-GB')}`
    }
  },

  methods: {
    ...mapRolesActions({
      deleteRole: 'delete'
    }),

    truncate (str, n) {
      return (str.length > n) ? str.substr(0, n - 1) + '...' : str
    }
  }
}
</script>

<style lang="scss" scoped>
.role-card {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  border: 1px solid $light_grey;
  margin-top: 2rem;

  @include breakpoint(desktop) {
    width: 45rem;
    margin: 3rem 3rem 0 0;

    &:nth-child(3n) {
      margin-right: 0;
    }
  }

  .status {
    position: absolute;
    top: 1.5rem;
    right: 1.5rem;
    color: $white;
    text-transform: uppercase;
    background-color: $red;
    border-radius: 6px;
    padding: .6rem;

    @include breakpoint(desktop) {
      top: 2rem;
      right: 2rem;
      padding: .8rem;
    }
  }

  .wrapper {
    padding: 6rem 2rem 0 2rem;

    @include breakpoint(desktop) {
      padding: 8rem 4rem 0 4rem;
    }
  }

  span {
    display: inline-block;
  }

  .name {
    @include fontSizeRem(14, 20);
    margin-bottom: 1rem;
  }

  .type {
    margin-bottom: 3rem;
  }

  .description {
    margin-bottom: 1.5rem;
  }

  .users {
    display: flex;
    margin-bottom: 5rem;

    img {
      width: 2.5rem;
      margin-right: .5rem;
      border-radius: 50%;

      @include breakpoint(desktop) {
        width: 4rem;
      }
    }

    span {
      font-style: italic;
    }
  }

  .card-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: lighten($light_grey, 15%);
    padding: 1rem 2rem;

    @include breakpoint(desktop) {
      padding: 2rem 4rem;
    }

    .date {
      color: darken($light_grey, 15%);
      line-height: 1.3;
    }

    .action-btn {
      font-weight: 700;
      text-transform: uppercase;
      margin-right: 1rem;
      cursor: pointer;

      &:last-child {
        margin-right: 0;
      }

      &.edit {
        color: darken($light_grey, 40%);
      }

      &.delete {
        color: $red;
      }
    }

    img {
      width: 2rem;
      height: 2rem;
    }
  }
}
</style>
