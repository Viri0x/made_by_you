<template>
  <div class="container  edit-form-nav">
	 
	  	
	  	<div class="list-container edit-container edit-form edit-form-nav" :class="{'opacity-20': !isLoadForm}">
		 	<div class="form-container">
                <form method="post" autocomplete="off" @submit.prevent="submit">
                <div class="form-bloc">
	                <div class="col w-full">
		                <div class="col-content">
			                <label for="titre" id="Ltitre">Title</label>
			                <input @focus="initForm" @change='updateSeo' class="required_field" type="text" v-model="titre" name="titre" id="titre" value="" />
		                </div>
	                </div>
                </div>
                <div class="form-bloc">
		             <div class="col w-full">   
		                <div class="col-content">
			                <label for="address" id="Laddress">Address</label>
			                <textarea  @focus="initForm" v-model="address" name="address" id="address"></textarea>
		                </div>
		             </div> 
                </div>
                
                
                 <div class="form-bloc">
		             <div class="col w-full"> 
		                <div class="col-content col-50">
			                <label for="email" id="Lemail">Email</label>
			                <input @focus="initForm" class="required_field" type="text" v-model="email" name="email" id="email" value="" />
		                </div>
		             </div> 
                </div>

                 <div class="form-bloc">
		             <div class="col w-full"> 
		                <div class="col-content col-50">
			                <label for="instagram" id="Linstagram">Instagram</label>
			                <input @focus="initForm" type="text" v-model="instagram" name="instagram" id="instagram" value="" />
		                </div>
		                
		                 <div class="col-content col-50">
			                <label for="spotify" id="Lspotify">Spotify</label>
			                <input @focus="initForm" type="text" v-model="spotify" name="spotify" id="spotify" value="" />
		                </div>
		             </div> 
                </div>
                
                <div class="form-bloc">
	                <div class="col w-full">
		                <div class="col-content">
			                <div>
			                	<template v-if="displayComposant">
					                <upload v-model="visuel" :upload_value_file.sync="visuel" :upload_accept_file.sync="upload_accept_file" :upload_label_file.sync="upload_label_file" :upload_titre_file.sync="upload_titre_file" :upload_cible.sync="upload_cible" />
			                	</template>
			                </div>
		                </div>
	                </div>
                </div>

                <div class="form-bloc">
	                <div class="col w-full">
		                <div class="col-content">
			                <label for="about" id="Labout">Infos</label>
			                <textarea  @focus="initForm" v-model="about" name="about" id="about"></textarea>
		                </div>
	                </div>
                </div>

                
                <template v-if="displayComposant">
                <editSeo @onChange="confirmSubmit" ref="editSeoEl" :seo_id_parent.sync="id_setting" :seo_source.sync="source" />
                </template>

                <div class="form-action">
	                <div><button @click="cancelForm(url_list)" type="button">Annuler</button></div>
	                <div><button type="submit">Enregistrer</button></div>
                </div>
                </form>
		 	</div>
				
	  	</div> 
	  	
  </div>
  
  
</template>

<script>
import { mapGetters } from 'vuex';
import axios from 'axios';
import moment from 'moment';
import SubNavSetting from '~/components/SubNavSetting.vue'; 

export default {
  layout: 'edit',
  middleware: 'auth',
  components: {
    SubNavSetting
  },
   computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser']),
  },
  created() {

  }
  ,
  mounted() {
  	this.getSetting();
  },
  data() {
    return {
	  url_server:this.$store.state.url_server,
	  id_font_app: this.$auth.user.id,
	  user_app: this.$auth.user.username,
	  url_list: '/edit/settings',
	  source:'setting',
	  id_setting: 1,
	  titre:'',
	  address:'',
	  email:'',
	  instagram:'',
	  spotify:'',
	  visuel:'',
	  about:'',
	  displayComposant : false,
	  isLoadForm:false,
	  upload_titre_file:'Visuel réseaux sociaux',
	  upload_label_file:'Choisir un visuel',
	  upload_accept_file : 'image/*',
	  upload_cible:'mediaCible1',
      
    }
  },
  methods: {
	getSetting: function()
	 {
       axios.get(this.url_server + "/getSetting?id_setting=" + this.id_setting)
       .then(response => {
	       this.setting = response.data.liste;
	       this.titre = this.setting.titre;
	       this.address = this.setting.address;
	       this.email = this.setting.email;
	       this.instagram = this.setting.instagram;
	       this.spotify = this.setting.spotify;
	       this.visuel = this.setting.visuel;
	       this.about = this.setting.about;

	       this.displayComposant = true;
	       this.isLoadForm = true;
	   })
       .catch(error => {
	       if (!error.response) console.log("retour erreur")
	       this.id_font = 0;
		   displayErreur("erreur de chargement settings")
      })
    },
    submit() {
	   clearRequired();
	   this.hideErreur();
	   let data = {
		id_setting: this.id_setting,
		titre: this.titre,
        address: this.address,
        email: this.email,
        instagram : this.instagram,
        spotify : this.spotify,
        visuel : this.visuel,
        about : this.about,
      };

	  var isFromSeo = false;
      var elems = document.querySelectorAll(".required_field");
	  [].forEach.call(elems, function(el) {
		    if ((el.value == '')) {
			   if (el.classList.contains("fromSeo")) isFromSeo = true;
			   el.classList.add("required");
			}
		});
		
		if(checkRequired()) {
			if (isFromSeo) this.$refs.editSeoEl.isShowSeo = true;
			displayErreur("Les champs en rouge sont requis");
		}
		else {
			disabledActions();
			  axios.post(this.url_server + "/addSetting", data)
			   .then(response => {
				   this.id_setting = response.data.id_setting;
				   this.$refs.editSeoEl.saveSeo();
			   })
			   .catch(error => {
				  enabledActions();
				  displayErreur("Erreur lors de l'update setting")
			   })
			
		}
       
    }
    ,
    confirmSubmit() {
	    document.location='/edit/settings';
	}
    ,
	updateSeo(){
	  this.$refs.editSeoEl.updateInputSeo(this.titre);
	  
	},
    hideErreur: function()
    {
	    hideErreur();
    }
    ,
    cancelForm: function(url)
    {
	    this.$router.push(url);
    }
    ,
    initForm: function(event)
    {
	   if (event.target.classList.contains("required")) event.target.classList.remove("required");
	   enabledActions();
	   hideErreur();
    }
    ,
    showHelp: function(message)
    {
	    displayErreur(message)
    }
    ,
    hideHelp: function()
    {
	    hideErreur();
    }
  }
}
</script>


