<template>
  <header>
	  <div>
		  <div><nuxt-link to="/">Simple Editions</nuxt-link></div>
		  <div><nuxt-link to="/books">Books</nuxt-link></div>
	  </div>
	  <div v-show='initLang' class="lang cursor-pointer" @click='updateLang(1)'><span v-show='!isEn'>FR</span><span v-show='isEn'>EN</span></div>
  </header>
  
</template>

<script>
import { mapMutations } from 'vuex';

export default {
	data() {
    return {
	    initLang : false,
	    isEn:false,
    }
  },
   mounted() {
	   if (this.$auth.$storage.getLocalStorage('isEn') == null ) this.$auth.$storage.setLocalStorage('isEn',true)
	    this.isEn = this.$auth.$storage.getLocalStorage('isEn')
	    this.updateLang(0);
	    this.initLang = true;
  },
   methods: {
	 updateLang: function(etat)
	 {

		 if (etat == 1) {
			 if (this.isEn) this.isEn = false;
			 else this.isEn = true;
		 }

		 this.$auth.$storage.setLocalStorage('isEn',this.isEn)
		 this.$emit('isEnglish', this.isEn)
    }
	   
  }
}
</script>


