<template>
  <nav class="navbar orange lighten-1">
    <div
      class="nav-wrapper"
      v-show="isMaterialIconsLoaded"
    >
      <div class="navbar-left">
        <a
          href="#"
          @click.prevent="$emit('toggle-sidebar')"
        >
          <i class="material-icons black-text">dehaze</i>
        </a>
        <span class="black-text"> {{ date | date('datetime') }} </span>
      </div>

      <ul class="right hide-on-small-and-down">
        <li>
          <a
            class="dropdown-trigger black-text"
            href="#"
            data-target="dropdown"
            ref="dropdown"
          >
            {{ userName }}
            <i class="material-icons right">arrow_drop_down</i>
          </a>

          <ul id='dropdown' class='dropdown-content'>
            <li>
              <router-link
                class="black-text"
                to="/profile"
              >
                <i class="material-icons">account_circle</i> {{ 'Profile' | i18n }}
              </router-link>
            </li>
            <li class="divider" tabindex="-1"></li>
            <li>
              <a
                href="#"
                class="black-text"
                @click.prevent="logout"
              >
                <i class="material-icons">assignment_return</i> {{ 'Logout' | i18n }}
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  data () {
    return {
      date: new Date(),
      interval: null,
      dropdown: null,
      isMaterialIconsLoaded: false
    }
  },
  async mounted () {
    this.interval = setInterval(() => {
      this.date = new Date()
    }, 1000)

    this.dropdown = M.Dropdown.init(this.$refs.dropdown, {
      constrainWidth: false
    })

    setTimeout(() => {
      this.isMaterialIconsLoaded = true
    }, 150)
  },
  beforeDestroy () {
    clearInterval(this.interval)

    if (this.dropdown && this.dropdown.destroy) {
      this.dropdown.destroy()
    }
  },
  computed: {
    userName () {
      return this.$store.getters['user/user'].name
    }
  },
  methods: {
    async logout () {
      await this.$store.dispatch('auth/logout')
      this.$router.push('/login?message=logout')
    }
  }
}
</script>
