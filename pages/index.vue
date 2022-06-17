<template>

  <div class="container">
 	<div class="content">
	 	<header class="home">
	 		<div class="logo">MADE BY YOU</div>
	 	</header>
	 	
	 	<div class="content-home">
		 	<video id="myVideo" autoplay muted loop><source src="/upload/home.mp4" type="video/mp4"></video>
	 	</div>
	 	
	 	<footer class="home">
	 		<div class="logo"><nuxt-link to="/etape-1">commencer</nuxt-link></div>
	 	</footer>
 	</div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	middleware: 'auth',
   computed: {
    ...mapGetters(['isAuthenticated', 'loggedInfont']),
  }
  ,
	layout: 'default',
	data() {
    return {
	    parametres:'',
	    g_width: 0,
		g_height: 0,
	    isEn:true,
	    isSoon:false,
	    isAnim:false,
    }
  },
  mounted() {

  }
  ,
  unmounted() {
  }
  ,
   methods: {
	
  }
}
</script>

<style scoped>

</style>


