<template>
	<div>
		
		
		
		<div class="form-bloc form-bloc-list mt-6">
	         <div class="col w-full">   
	            <div class="col-content">
	                 <label @click="displayLien(0);hideErreur();" for="AddFile" id="LAddFile" class="mb-3 border-b border-mainColor cursor-pointer"><div class="pb-2">Liens</div>
					     <div class="flex-1 text-right flex justify-end add highlight">
						     <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" /></svg>
		                </div>
	                </label>
	                <div class="loading" v-show="isShowLoadingLiens">Chargement...</div>
	                	<div class="loading" v-show="isShowNoResultLiens">aucun lien.</div>
	                
									<draggable  :list="liens" tag="div" @end="onEndPosition">
									<div v-for='(lien, indexLien) in liens' class="relative cursor-pointer">
										<div  @click="displayLien(lien.id_lien);hideErreur();" class="w-full mb-3 flex items-start justify-between hover:text-activeColor">
											<div>{{lien.titre}}</div>
										</div>
									</div>
									</draggable>

	         	</div> 
	         </div>
	    </div>
	    
	    <!-- Main modal -->
		<div id="defaultModal" tabindex="1" @keydown.esc="displayLien(0)" class="modalZone hidden overflow-y-auto overflow-x-hidden bg-mainBg/50 flex fixed right-0 left-0 top-4 z-50 justify-center items-center md:h-full md:inset-0">
		    <div class="relative px-6 w-full max-w-2xl h-full md:h-auto">
		        <!-- Modal content -->
		        <div class="relative bg-mainBg p-6 border border-activeColor">
		            <!-- Modal header -->
		            <div class="flex justify-between items-start border-b border-mainColor">
			             <h1>Lien</h1>
		                <div class="bg-transparent ml-auto inline-flex items-center highlight" data-modal-toggle="defaultModal">
		                    <svg @click="displayLien()" class="big cursor-pointer" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>  
		                </div>
		            </div>
		            <!-- Modal body -->
		            <div>
			            <div class="form-container w-full border-0 p-0">
							<form method="post" autocomplete="off" @submit.prevent="submitLienForm">

				                 <div class="form-bloc mt-9">
					                <div class="col w-full">
						                <div class="col-content">
							                <label for="titre" id="Ltitre">Libellé</label>
							                <input type="text" @focus="initForm" v-model="titre" name="titre" id="titre_lien" />
						                </div>
					                </div>
				                </div>
				                
				                <div class="form-bloc">
					                <div class="col w-full">
						                <div class="col-content">
							                <label for="url" id="Lurl">Url</label>
							                 <input type="text" @focus="initForm" v-model="url" name="url" id="url_lien" />
							                
						                </div>
					                </div>
				                </div>

				                 <div class="form-action">
					                <div><button @click="displayLien()" type="button">Annuler</button></div>
					                <div v-show="id_lien != 0"><button @click="delLien()" class="bt-delete" type="button">Supprimer</button></div>
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
	  this.getLiens();
	  
	  
  },
  data() {
    return {
	  url_server:this.$store.state.url_server,
	  flexIsFile:'',
	  source:this.lien_source,
	  id_parent : this.lien_id_parent,
	  id_lien: 0,
	  isNew_lien:false,
	  liens:[],
	  lien:'',
	  isShowLoadingLiens:true,
	  isShowNoResultLiens:false,
	  titre:'',
	  url:'',
    }
  },
  props: {
  	lien_source: String,
    lien_id_parent: Number,
  },
  methods: {
     getLiens: function()
	 {
	   this.isShowNoResultLiens = false;
       axios.get(this.url_server + "/getLiens?id_intervenant=" + this.id_parent)
       .then(response => {
	       this.isShowLoadingLiens = false;
	       this.liens = response.data.liste;
	       if (this.liens.length == 0) this.isShowNoResultLiens = true;
	   })
	   .catch(error => {
		   displayErreur('liens loading error')
      })
    }
    ,
    getLien: function()
	 {
       axios.get(this.url_server + "/getLien?id_lien=" + this.id_lien)
       .then(response => {
	       this.lien = response.data.liste;
		   if (typeof this.lien.titre !== 'undefined') {
		       this.titre = this.lien.titre;
		       this.url = this.lien.url;
		    }
		    else {
			    this.titre = '';
			    this.url = '';
		    }
	   })
       .catch(error => {
	       this.titre = '';
		   this.url = '';
	       this.id_lien = 0;
		   displayErreur("lien loading error")
      })
    },
    delLien: function()
	 {
       axios.get(this.url_server + "/delLien?id_lien=" + this.id_lien)
       .then(response => {
	       this.displayLien();
		   this.getLiens();
	   })
       .catch(error => {
	       this.id_lien = 0;
		   displayErreur("lien deleting error")
      })
    }
    ,
	submitLienForm() {
	   var erreur = 'Les champs en rouges sont requis';
	   clearRequiredModal();
	   this.hideErreur();
	   
	   this.isNew_lien = false;
	   if (this.id_lien == 0) this.isNew_lien = true;

	   let data = {
		id_lien:this.id_lien,
		id_intervenant: this.id_parent,
		titre: this.titre,
		url: this.url,
        isNew: this.isNew_lien,
      };

      var elems = document.querySelectorAll(".modalZone .required_field");
	  [].forEach.call(elems, function(el) {
		    if ((el.value == '')) {
			   el.classList.add("required");
			}
		});
		
		if (this.titre == '') {
			 document.getElementById("titre_lien").classList.add("required");
		}
		
		if (this.url == '') {
			 document.getElementById("url_lien").classList.add("required");
		}

		if(checkRequiredModal()) {
			displayErreur(erreur);
		}
		else {
			disabledActionsModal();
			  axios.post(this.url_server + "/addLien", data)
			   .then(response => {
				   this.id_lien = response.data.id_lien;
				   this.isShowNoResultLien = false;
				   this.displayLien();
				   this.liens = new Array();
				   this.getLiens();
			   })
			   .catch(error => {
				  enabledActionsModal();
				  displayErreur("Error adding lien : " + error)
			   })
			
		}
       
    }
    ,
    isNumber(n) {
	    return !isNaN(parseFloat(n)) && isFinite(n);
	}
    ,
    displayLien: function(id_lien = 0)
    {
	    
	    var _element = document.querySelectorAll("#defaultModal")[0]
	    
	    if (_element.classList.contains('hidden')) {
		    _element.classList.remove("hidden");
		    _element.focus()
		    this.id_lien = id_lien;
		    if (this.id_lien != 0) {
				
				this.getLien();
			}
			else {
				this.titre = '';
				this.url = '';
				this.id_lien = 0;
			}
		}
		else {
			this.id_lien = 0;
			this.titre = '';
			this.url = '';
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
	       clearRequiredModal();
       }
	   enabledActionsModal();
	   hideErreur();
    }
    ,
	onEndPosition()
	{
		let data = {
			id_lien: this.id_lien,
			list: this.liens,
	      };
		 axios.post(this.url_server + "/updateLienPosition", data)
	       .then(response => {
		       
		   })
	       .catch(error => displayErreur("error updating liens"))
	}
	
	
  }
}
</script>

<style>

	</style>




