<template>
  <header>
	  <div class="mb-5"><img class="img-logo" src="~/assets/img/logo.svg" alt="Nude" /></div>
	  <nav class="nav-gabarit">
		  <ul>
			  <li><nuxt-link to="/edit/interviews" class="nav-link">interviews</nuxt-link></li>
			  <li><nuxt-link to="/edit/intervenants" class="nav-link">invités</nuxt-link></li>
			  <li><nuxt-link to="/edit/playlists" class="nav-link">playlists</nuxt-link></li>
			  <li class="mt-3"><nuxt-link to="/edit/settings" class="nav-link">paramètre</nuxt-link></li>
			  <li><nuxt-link to="/edit/users"  class="nav-link">users</nuxt-link></li>
			  <li class="pt-3"><a class="nav-link cursor-pointer" @click="logout">logout</a></li>
		  </ul>
	  </nav>
  </header>

</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser'])
  },
  data() {
    return {
	    isAdmin:'',
	}
  }
  ,
  methods: {
    async logout() {
      await this.$auth.logout();
      this.$router.push('/edit')
      // this.$store.commit('setLoggedIn', false) // even if I use this
      //console.log(this.$auth.loggedIn) // -> false
    }
  }
}
</script>

