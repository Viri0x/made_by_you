<template>
	<div>
		
		
		
		<div class="form-bloc form-bloc-list">
	         <div class="col w-full">   
	            <div class="col-content">
	                 <label @click="displayAvis(0);hideErreur();" for="AddFile" id="LAddFile" class="mb-3 border-b border-mainColor cursor-pointer"><div class="pb-2">Question / réponse</div>
					     <div class="flex-1 text-right flex justify-end add highlight">
						     <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" /></svg>
		                </div>
	                </label>
	                <div class="loading" v-show="isShowLoadingAvis">Chargement...</div>
	                	<div class="loading" v-show="isShowNoResultAvis">aucun avis.</div>
	                
									<draggable  :list="aviss" tag="div" @end="onEndPosition">
									<div v-for='(avis, indexAvis) in aviss' class="relative cursor-pointer">
										<div  @click="displayAvis(avis.id_avis);hideErreur();" class="w-full mb-3 flex items-start justify-between hover:text-activeColor">
											<div>{{avis.titre}}</div>
										</div>
									</div>
									</draggable>

	         	</div> 
	         </div>
	    </div>
	    
	    <!-- Main modal -->
		<div id="defaultModalAvis" tabindex="1" @keydown.esc="displayAvis(0)" class="modalZone2 hidden overflow-y-auto overflow-x-hidden bg-mainBg/50 flex fixed right-0 left-0 top-4 z-50 justify-center items-center md:h-full md:inset-0">
		    <div class="relative px-6 w-full max-w-2xl h-full md:h-auto">
		        <!-- Modal content -->
		        <div class="relative bg-mainBg p-6 border border-activeColor">
		            <!-- Modal header -->
		            <div class="flex justify-between items-start border-b border-mainColor">
			             <h1>Avis</h1>
		                <div class="bg-transparent ml-auto inline-flex items-center highlight" data-modal-toggle="defaultModalAvis">
		                    <svg @click="displayAvis()" class="big cursor-pointer" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>  
		                </div>
		            </div>
		            <!-- Modal body -->
		            <div>
			            <div class="form-container w-full border-0 p-0">
							<form method="post" autocomplete="off" @submit.prevent="submitAvisForm">

				                 <div class="form-bloc mt-9">
					                <div class="col w-full">
						                <div class="col-content">
							                <label for="titre" id="Ltitre">Question</label>
							                <input type="text" @focus="initForm" v-model="titre" name="titre" id="titre_avis" />
						                </div>
					                </div>
				                </div>
				                
				                <div class="form-bloc mt-9">
					                <div class="col w-full">
						                <div class="col-content">
							                <label for="texte" id="Ltexte">Réponse</label>
							                <div><quill-editor ref="editor" v-model="texte" :options="editorOption" /></div>
						                </div>
					                </div>
				                </div>

				                
				                

				                 <div class="form-action">
					                <div><button @click="displayAvis()" type="button">Annuler</button></div>
					                <div v-show="id_avis != 0"><button @click="delAvis()" class="bt-delete" type="button">Supprimer</button></div>
					                <div><button type="submit">Enregistrer</button></div>
				                </div>
	                
				            </form>
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
import draggable from 'vuedraggable'

export default {
  name: 'edit-media',
  layout: 'edit',
  middleware: 'auth',
  components: {
        draggable
    }
  ,
  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser']),
  },
  created() {
  }
  ,
  mounted() {
	  this.getAviss();
	  
	  
  },
  data() {
    return {
	  url_server:this.$store.state.url_server,
	  flexIsFile:'',
	  source:this.avis_source,
	  id_parent : this.avis_id_parent,
	  id_avis: 0,
	  isNew_avis:false,
	  aviss:[],
	  avis:'',
	  isShowLoadingAvis:true,
	  isShowNoResultAvis:false,
	  titre:'',
	  texte:'',
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
    }
  },
  props: {
  	avis_source: String,
    avis_id_parent: Number,
  },
  methods: {
     getAviss: function()
	 {
	   this.isShowNoResultAvis = false;
       axios.get(this.url_server + "/getAviss?id_interview=" + this.id_parent)
       .then(response => {
	       this.isShowLoadingAvis = false;
	       this.aviss = response.data.liste;
	       if (this.aviss.length == 0) this.isShowNoResultAvis = true;
	   })
	   .catch(error => {
		   displayErreur('avis loading error')
      })
    }
    ,
    getAvis: function()
	 {
       axios.get(this.url_server + "/getAvis?id_avis=" + this.id_avis)
       .then(response => {
	       this.avis = response.data.liste;
		   if (typeof this.avis.titre !== 'undefined') {
		       this.titre = this.avis.titre;
		       this.texte = this.avis.texte;
		    }
		    else {
			    this.texte = '';
		    }
	   })
       .catch(error => {
	       this.texte ='';
	       this.id_avis = 0;
		   displayErreur("avis loading error")
      })
    },
    delAvis: function()
	 {
       axios.get(this.url_server + "/delAvis?id_avis=" + this.id_avis)
       .then(response => {
	       this.displayAvis();
		   this.getAviss();
	   })
       .catch(error => {
	       this.id_avis = 0;
		   displayErreur("avis deleting error")
      })
    }
    ,
	submitAvisForm() {
	   var erreur = 'Les champs en rouges sont requis';
	   clearRequiredModal2();
	   this.hideErreur();
	   
	   this.isNew_avis = false;
	   if (this.id_avis == 0) this.isNew_avis = true;

	   let data = {
		id_avis:this.id_avis,
		id_interview: this.id_parent,
		titre: this.titre,
		texte: this.texte,
        isNew: this.isNew_avis,
      };

      var elems = document.querySelectorAll(".modalZone2 .required_field");
	  [].forEach.call(elems, function(el) {
		    if ((el.value == '')) {
			   el.classList.add("required");
			}
		});
		
		if (this.titre == '') {
			 document.getElementById("titre_avis").classList.add("required");
		}

		if(checkRequiredModal2()) {
			displayErreur(erreur);
		}
		else {
			disabledActionsModal2();
			  axios.post(this.url_server + "/addAvis", data)
			   .then(response => {
				   this.id_avis = response.data.id_avis;
				   this.isShowNoResultAvis = false;
				   this.displayAvis();
				   this.aviss = new Array();
				   this.getAviss();
			   })
			   .catch(error => {
				  enabledActionsModal2();
				  displayErreur("Error adding avis : " + error)
			   })
			
		}
       
    }
    ,
    isNumber(n) {
	    return !isNaN(parseFloat(n)) && isFinite(n);
	}
    ,
    displayAvis: function(id_avis = 0)
    {
	    
	    var _element = document.querySelectorAll("#defaultModalAvis")[0]
	    
	    if (_element.classList.contains('hidden')) {
		    _element.classList.remove("hidden");
		    _element.focus()
		    this.id_avis = id_avis;
		    if (this.id_avis != 0) {
				
				this.getAvis();
			}
			else {
				this.titre = '';
				this.texte = '';
				this.id_avis = 0;
			}
		}
		else {
			this.id_avis = 0;
			this.titre = '';
			this.texte = '';
			_element.classList.add("hidden");
			this.initForm();
		}
    }
	,
	hideErreur: function()
    {
	    hideErreur();
    }
    ,
    initForm: function(event)
    {
	   if (typeof event !== 'undefined') {
			if (event.target.classList.contains("required")) event.target.classList.remove("required");
       }
       else {
	       clearRequiredModal2();
       }
	   enabledActionsModal2();
	   hideErreur();
    }
    ,
	onEndPosition()
	{
		let data = {
			id_avis: this.id_avis,
			list: this.aviss,
	      };
		 axios.post(this.url_server + "/updateAvisPosition", data)
	       .then(response => {
		       
		   })
	       .catch(error => displayErreur("error updating avis"))
	}
	,
	formatResume(tps_debut,tps_fin)
	{
		var val = parseFloat(tps_fin).toFixed(2) - parseFloat(tps_debut).toFixed(2);
		return val.toFixed(2).toString().replace(".",":");
	}
	
  }
}
</script>

<style>

	</style>




