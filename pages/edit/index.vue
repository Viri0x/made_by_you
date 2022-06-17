<template>
  <div class="container no-scrollbar">
     
  </div>
  
</template>

<script>
import { mapGetters } from 'vuex';
import axios from 'axios';

export default {
  layout: 'edit',
   middleware: 'auth',
  components: {
  },
   computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser']),
  },
  components: {
  },
  created() {
	  this.$router.push('/edit/interviews');
  },
  data() {
    return {
	    url_server:this.$store.state.url_server,
    };
  },
  methods: {

  }

}



</script>
