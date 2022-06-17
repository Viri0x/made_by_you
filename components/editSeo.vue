<template>
   <div class="form-bloc form-bloc-list mt-6 border-b border-mainColor" :class="{'active': isShowSeo}">
         <div class="col w-full">   
            <div class="col-content mb-1">
                <label class="add" @click="isShowSeo = !isShowSeo;hideErreur();" for="showSeo" id="LshowSeo"><div>SEO</div><div class="flex-1 flex justify-end add highlight"><svg xmlns="http://www.w3.org/2000/svg" class="big" :class="{'rotate-90': isShowSeo}" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
                </div></label>
                <div>
	                	<div class="form-bloc-list-content" v-show='isShowSeo'>
		                	 <div class="form-bloc">
					             <div class="col w-full">   
					                <div class="col-content">
						                <label for="seo_title" id="Lseo_title">Page title</label>
						                <input @focus="initForm" class="required_field fromSeo" type="text" v-model="seo_title" name="seo_title" id="seo_title" value="" />
					                </div>
					             </div>
		                	 </div>
		                	 <div class="form-bloc">
					             <div class="col w-full">     
					                <div class="col-content">
						                <label for="seo_description" id="Lseo_description">Meta description</label>
						                <textarea @focus="initForm" class="fromSeo"  v-model="seo_description" name="seo_description" id="seo_description"></textarea>
					                </div>
					             </div>
		                	 </div>
		                	 <div class="form-bloc">
					             <div class="col w-full"> 
					                <div class="col-content">
						                <label for="seo_url" id="Lseo-url">Url</label>
						                <input @focus="initForm" class="required_field fromSeo" type="text" v-model="seo_url" name="seo_url" id="seo_url" value="" />
					                </div>
					             </div> 
			                </div>
	                	</div>
						 
                </div>
            </div>
         </div> 
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import axios from 'axios';

export default {
  name: 'edit-seo',
  layout: 'edit',
  middleware: 'auth',
  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser']),
  },
  created() {
  }
  ,
  mounted() {
	  
  	this.getSeo();
  },
  data() {
    return {
	  url_server:this.$store.state.url_server,
	  source:this.seo_source,
	  id_parent : this.seo_id_parent,
	  seo_title : '',
	  seo_description : '',
	  seo_url : '',
	  isShowSeo:false,
    }
  },
  props: {
   seo_source: String,
   seo_id_parent: Number,
  },
  methods: {
	getSeo: function()
	 {
       axios.get(this.url_server + "/getSeo?source=" + this.source + "&id_parent=" + parseInt(this.id_parent))
       .then(response => {
	       this.seo = response.data.liste;
	       this.seo_title = this.seo.titre;
	       this.seo_description = this.seo.description;
	       this.seo_url = this.seo.url;
	   })
       .catch(error => {
		   displayErreur("erreur de chargement SEO")
      })
    },
    saveSeo: function()
	 {
		 let data = {
			source: this.source,
			id_parent: this.id_parent,
			seo_title: this.seo_title,
			seo_description: this.seo_description,
			seo_url: this.seo_url,
	      };

		 var elems = document.querySelectorAll(".required_field");
	  [].forEach.call(elems, function(el) {
		    if ((el.value == '')) {
			   el.classList.add("required");
			}
		});
		
		if(checkRequired()) {
			displayErreur("Les champs indiqués sont obligatoires");
		}
		else {
			disabledActions();
			  axios.post(this.url_server + "/addSeo", data)
			   .then(response => {
				   this.$emit('onChange', 'submit');
			   })
			   .catch(error => {
				  enabledActions();
				  displayErreur("Erreur lors de l'update seo")
			   })
			
		}
    },
    saveSeoConfirm: function()
	 {
       var val = this.saveSeo();
    }
    ,
    updateInputSeo: function(titre)
	 {
       this.seo_title = titre;
       this.seo_url = slugify(titre)
    }
    ,
    saveSeoInput: function(titre)
	 {
       this.seo_title = titre;
    },
     initForm: function(event)
    {
	   if (event.target.classList.contains("required")) event.target.classList.remove("required");
	   enabledActions();
	   hideErreur();
    },
    hideErreur: function()
    {
	    hideErreur();
    }
  }
}
</script>


