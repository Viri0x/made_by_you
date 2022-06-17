<template>
  <div class="container edit-form-nav">
	   
	  	
	  	<div class="list-container edit-container edit-form" :class="{'opacity-20': !isLoadForm}">
		  	
		  	
		 	<div class="form-container">

                <form method="post" autocomplete="off" @submit.prevent="submit">
	                
	            <fieldset>
		                <legend>Date</legend>
		                <div class="form-bloc">
			                <div class="col w-full">
				                <div class="col-content col-50">
					               <no-ssr><v-date-picker v-model="date_interview" mode="date">
									  <template v-slot="{ inputValue, inputEvents }">
									    <div class="col-content">
										  <label for="date_interview" id="Ldate_interview">Date de l'interview</label>
									      <input
									        type="text"
									        class="required_field"
									        :value="inputValue"
									        v-on="inputEvents"
									      />
									    </div>
									  </template>
									</v-date-picker></no-ssr>
				                </div>
				                
				                 <div class="col-content col-50">
					                <label for="tito" id="Ltito">Lieu de l'interview</label>
					                <input @focus="initForm" type="text" v-model="lieu_interview" name="lieu_interview" id="lieu_interview" value="" />
				                </div>

			                </div>
		                </div>

		                
                </fieldset>
	                
	            <div class="form-bloc">
	                <div class="col w-full">
		                <div class="col-content">
			                <label for="id_intervenant" id="Lid_intervenant">Invité</label>
			                 <select v-model="id_intervenant" name="id_intervenant" id="id_intervenant">
							 	<option value="0"></option>
							 	<option v-for='(intervenant, indexIntervenant) in intervenants' :value="intervenant.id_intervenant">{{intervenant.prenom}} {{intervenant.nom}}</option>
							 </select>
		                </div>
	                </div>
                </div>
                
                <div class="form-bloc">
	                <div class="col w-full">
		                <div class="col-content">
			                <label for="titre" id="Ltitre">Titre</label>
			                <input @focus="initForm" @change='updateSeo' class="required_field" type="text" v-model="titre" name="titre" id="titre" value="" />
		                </div>
	                </div>
                </div>
                
                <div class="form-bloc">
	                <div class="col w-full">
		                <div class="col-content">
			                <label for="sous_titre" id="Lsous_titre">Sous-titre</label>
			                <input @focus="initForm" type="text" v-model="sous_titre" name="sous_titre" id="sous_titre" value="" />
		                </div>
	                </div>
                </div>
                
                

                <div class="form-bloc">
	                <div class="col w-full">
		                <div  class="col-content ">
			                <label for="description" id="Ldescription">Description</label>
			                <div><quill-editor ref="editor" v-model="description" :options="editorOption" /></div>
		                </div>
	                </div>
                </div>
                
                <fieldset class="mt-9">
		                <legend>Audio</legend>
		                <div class="form-bloc">
			                <div class="col w-full">
				                <div class="col-content">
					                <div class="mediaCible1">
					                	<template v-if="displayComposant">
							                <upload v-model="fichier" :upload_value_file.sync="fichier" :upload_accept_file.sync="upload_son_accept_file" :upload_label_file.sync="upload_son_label_file" :upload_titre_file.sync="upload_son_titre_file" :upload_cible.sync="upload_son_cible" />
					                	</template>
					                </div>
				                </div>
			                </div>
		                </div>
		                
		                 <template v-if="displayComposant">
				        	<editTranche ref="editTrancheEl" :tranche_id_parent.sync="id_interview" :tranche_source.sync="source" />
				        </template>
		                
                </fieldset>
                
                 <fieldset class="mt-9">
		                <legend>Avis professionnel</legend>

		                 <template v-if="displayComposant">
				        	<editAvis ref="editAvisEl" :avis_id_parent.sync="id_interview" :avis_source.sync="source" />
				        </template>
		                
                </fieldset>
                
                <fieldset class="mt-9">
		                <legend>Style</legend>
		                
		                 <div class="form-bloc">
			                <div class="col w-full">
				                <div class="col-content">
					                <label for="sous-titre" id="Ltitre">Couleur</label>
					                <color-picker v-model="couleur"></color-picker>
				                </div>
			                </div>
		                </div>
		                
		                 <div class="form-bloc">
			                <div class="col w-full">
				                <div class="col-content">
					                 <div class="mediaCible2">
					                	<template v-if="displayComposant">
							                <upload v-model="visuel" :upload_value_file.sync="visuel" :upload_accept_file.sync="upload_visuel_accept_file" :upload_label_file.sync="upload_visuel_label_file" :upload_titre_file.sync="upload_visuel_titre_file" :upload_cible.sync="upload_visuel_cible" />
					                	</template>
					                </div>
				                </div>
			                </div>
		                </div>
		               

		                
                </fieldset>


                <template v-if="displayComposant">
                <editSeo @onChange="confirmSubmit" ref="editSeoEl" :seo_id_parent.sync="id_interview" :seo_source.sync="source" />
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


const cancelTokenSource = axios.CancelToken.source();

export default {
  layout: 'edit',
  middleware: 'auth',
  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser']),
  },
  created() {
	 this.url_list = '/edit/interviews/';
	 
	 if (typeof this.$route.query.id_interview === 'undefined') {
		 this.id_interview = 0;
	 }
	 else  this.id_interview = parseInt(this.$route.query.id_interview);
	 	 	 
  }
  ,
  mounted() {
	  if (this.id_interview == '0') this.id_interview = this.getNextId(this.source)
	  else {
		  this.getInterview();
	  }
	  
	  this.getIntervenants();

  },
  data() {
    return {
	  url_server:this.$store.state.url_server,
	  id_font_app: this.$auth.user.id,
	  user_app: this.$auth.user.username,
	  initModeForm:'include',
	  source:'interview',
	  isNew:false,
	  url_list: '',
	  isLoadForm:false,
	  id_interview: 0,
	  id_intervenant:'',
      titre:'',
      sous_titre:'',
      description:'',
      date_interview: new Date(),
      lieu_interview:'',
      fichier: '',
      visuel: '',
      couleur: '#000',
      tito:'',
	  interview:[],
	  intervenants:[],
	  displayComposant : false,
	  displayEditSeo : false,
	  isDisplayMedia:false,
	  editorOption: {
          // Some Quill options...
          theme: 'snow',
          modules: {
            toolbar: [
              ['bold', 'italic', 'underline', 'strike'],
              ['blockquote', 'code-block'],
              ['link','code'],
              ["source"]
            ]
          }
        },
	  upload_son_titre_file:"Fichier de l'interview",
	  upload_son_label_file:'choisir le fichier mp3',
	  upload_son_accept_file : '.mp3',
	  upload_son_cible:'mediaCible1',
	  upload_visuel_titre_file:"Objet",
	  upload_visuel_label_file:'choisir le visuel',
	  upload_visuel_accept_file : '.jpg,.jpeg,.png,.gif',
	  upload_visuel_cible:'mediaCible2',
    }
  }
  ,
  methods: {
	getInterview: function()
	 {
       axios.get(this.url_server + "/getInterview?id_interview=" + this.id_interview)
       .then(response => {
	       this.interview = response.data.liste;
		   if (typeof this.interview.titre !== 'undefined') {
		       this.id_intervenant = this.interview.id_intervenant;
		       this.titre = this.interview.titre;
		       this.sous_titre = this.interview.sous_titre;
		       this.description = this.interview.description;
		       this.date_interview = moment(this.interview.date_interview).format('YYYY-MM-DD');
		       this.lieu_interview = this.interview.lieu_interview;
		       this.fichier = this.interview.fichier;
		       this.visuel = this.interview.visuel;
		       if (this.interview.couleur != '') this.couleur = this.interview.couleur;
		       else this.couleur = '#000';
		    }
		    
		    this.isLoadForm = true;
	       this.displayComposant = true;
	   })
       .catch(error => {
	       this.id_interview = 0;
		   displayErreur("'error loading interview")
      })
    }
    ,
     getIntervenants: function()
	 {
       axios.get(this.url_server + "/getIntervenants?recherche=&triBy=nom&triMode=ASC")
       .then(response => {
	       this.intervenants = response.data.liste;
	   })
	   .catch(error => {
		   displayErreur('intervenant loading error')
      })
    }
    ,
    submit() {
	   clearRequired();
	   this.hideErreur();
	   
	   this.date_interview = moment(this.date_interview).format('YYYY-MM-DD');
	   if (this.id_intervenant == '') this.id_intervenant = 0;
	   let data = { 
		id_interview: this.id_interview,
		id_intervenant: this.id_intervenant,
		titre: this.titre,
		sous_titre: this.sous_titre,
		description: this.description,
		date_interview: this.date_interview,
		lieu_interview: this.lieu_interview,
		fichier: this.fichier,
		visuel: this.visuel,
		couleur: this.couleur,
        isNew: this.isNew,
      };

	  var isFromSeo = false;
      var elems = document.querySelectorAll(".required_field");
	  [].forEach.call(elems, function(el) {
		    if ((el.value == '')) {
			   if (el.classList.contains("fromSeo")) isFromSeo = true;
			   el.classList.add("required");
			   console.log("ICIC : " +  el.getAttribute("id"))
			}
		});
		
		if(checkRequired()) {
			if (isFromSeo) this.$refs.editSeoEl.isShowSeo = true;
			console.log("isFromSeo : " + isFromSeo)
			displayErreur("Les champs en rouge sont requis");
		}
		else {
			disabledActions();
			  axios.post(this.url_server + "/addInterview", data)
			   .then(response => {
				   this.id_interview = response.data.id_interview;
				   this.$refs.editSeoEl.saveSeo();
			   })
			   .catch(error => {
				  enabledActions();
				  displayErreur("Error adding interview : " + error)
			   })
			
		}
       
    },
    getNextId(table) {
	    axios.get(this.url_server + "/getNextId?table=" + table)
	       .then(response => {
		       this.id_interview = response.data.id;
		       this.isNew = true;
		       this.getInterview();
		    })
		   .catch(error => {
			   displayErreur('Error getting nextId')
	      })
    }
    ,
    confirmSubmit() {
	    this.$router.push('/edit/interviews/');
	}
    ,
	updateSeo(){
	  var titre = '';
	  if (Array.isArray(this.titre)) titre = this.titre[0];
	  else titre = this.titre;

	  this.$refs.editSeoEl.updateInputSeo(titre);
	  
	}
	,
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
    
  }
}
</script>

<style>
	.color-block {
		width:100% !important;
	}
	</style>
