<template>
	<div>
		
		
		
		<div class="form-bloc form-bloc-list mt-6">
	         <div class="col w-full">   
	            <div class="col-content">
	                 <label @click="displayTranche(0);hideErreur();" for="AddFile" id="LAddFile" class="mb-3 border-b border-mainColor cursor-pointer"><div class="pb-2">Résumés</div>
					     <div class="flex-1 text-right flex justify-end add highlight">
						     <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" /></svg>
		                </div>
	                </label>
	                <div class="loading" v-show="isShowLoadingTranches">Chargement...</div>
	                	<div class="loading" v-show="isShowNoResultTranches">aucun résumé.</div>
	                
									<draggable  :list="tranches" tag="div" @end="onEndPosition">
									<div v-for='(tranche, indexTranche) in tranches' class="relative cursor-pointer">
										<div  @click="displayTranche(tranche.id_tranche);hideErreur();" class="w-full mb-3 flex items-start justify-between hover:text-activeColor">
											<div>{{tranche.titre}}</div>
											<div class="text-right pl-3">{{formatResume(tranche.tps_debut,tranche.tps_fin)}}</div>
										</div>
									</div>
									</draggable>

	         	</div> 
	         </div>
	    </div>
	    
	    <!-- Main modal -->
		<div id="defaultModal" tabindex="1" @keydown.esc="displayTranche(0)" class="modalZone hidden overflow-y-auto overflow-x-hidden bg-mainBg/50 flex fixed right-0 left-0 top-4 z-50 justify-center items-center md:h-full md:inset-0">
		    <div class="relative px-6 w-full max-w-2xl h-full md:h-auto">
		        <!-- Modal content -->
		        <div class="relative bg-mainBg p-6 border border-activeColor">
		            <!-- Modal header -->
		            <div class="flex justify-between items-start border-b border-mainColor">
			             <h1>Résumé</h1>
		                <div class="bg-transparent ml-auto inline-flex items-center highlight" data-modal-toggle="defaultModal">
		                    <svg @click="displayTranche()" class="big cursor-pointer" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>  
		                </div>
		            </div>
		            <!-- Modal body -->
		            <div>
			            <div class="form-container w-full border-0 p-0">
							<form method="post" autocomplete="off" @submit.prevent="submitTrancheForm">

				                 <div class="form-bloc mt-9">
					                <div class="col w-full">
						                <div class="col-content">
							                <label for="titre" id="Ltitre">Titre</label>
							                <input type="text" @focus="initForm" v-model="titre" name="titre" id="titre_resume" />
						                </div>
					                </div>
				                </div>
				                
				                <div class="form-bloc">
					                <div class="col w-full">
						                <div class="col-content">
							                <label for="tps_debut" id="Ltps_debut">Début</label>
							                 <div class="relative mt-1">
											  <div class="flex absolute inset-y-0 right-0 items-center pointer-events-none text-activeColor pr-3">sec</div>
											  <input type="text" @focus="initForm" v-model="tps_debut" name="tps_debut" id="tps_debut" />
											</div>
							                
						                </div>
					                </div>
				                </div>
				                
				                <div class="form-bloc">
					                <div class="col w-full">
						                <div class="col-content">
							                <label for="tps_fin" id="Ltps_fin">Fin</label>
							                <div class="relative mt-1">
											  <div class="flex absolute inset-y-0 right-0 items-center pointer-events-none text-activeColor pr-3">sec</div>
											  <input type="text" @focus="initForm" v-model="tps_fin" name="tps_fin" id="tps_fin" />
											</div>
						                </div>
					                </div>
				                </div>

				                 <div class="form-action">
					                <div><button @click="displayTranche()" type="button">Annuler</button></div>
					                <div v-show="id_tranche != 0"><button @click="delTranche()" class="bt-delete" type="button">Supprimer</button></div>
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
	  this.getTranches();
	  
	  
  },
  data() {
    return {
	  url_server:this.$store.state.url_server,
	  flexIsFile:'',
	  source:this.tranche_source,
	  id_parent : this.tranche_id_parent,
	  id_tranche: 0,
	  isNew_tranche:false,
	  tranches:[],
	  tranche:'',
	  isShowLoadingTranches:true,
	  isShowNoResultTranches:false,
	  titre:'',
	  tps_debut:0,
	  tps_fin:0,
    }
  },
  props: {
  	tranche_source: String,
    tranche_id_parent: Number,
  },
  methods: {
     getTranches: function()
	 {
	   this.isShowNoResultTranches = false;
       axios.get(this.url_server + "/getTranches?id_interview=" + this.id_parent)
       .then(response => {
	       console.log("getTranches")
	       this.isShowLoadingTranches = false;
	       this.tranches = response.data.liste;
	       console.log("getTranches : " + this.tranches.length)
	       if (this.tranches.length == 0) this.isShowNoResultTranches = true;
	   })
	   .catch(error => {
		   displayErreur('tranches loading error')
      })
    }
    ,
    getTranche: function()
	 {
       axios.get(this.url_server + "/getTranche?id_tranche=" + this.id_tranche)
       .then(response => {
	       this.tranche = response.data.liste;
		   if (typeof this.tranche.titre !== 'undefined') {
		       this.titre = this.tranche.titre;
		       this.tps_debut = this.tranche.tps_debut.toFixed(2);
		       this.tps_fin = this.tranche.tps_fin.toFixed(2);
		    }
		    else {
			    this.tps_debut = 0;
			    this.tps_fin = 0;
		    }
	   })
       .catch(error => {
	       this.tps_debut = 0;
	       this.tps_fin = 0;
	       this.id_tranche = 0;
		   displayErreur("tranche loading error")
      })
    },
    delTranche: function()
	 {
       axios.get(this.url_server + "/delTranche?id_tranche=" + this.id_tranche)
       .then(response => {
	       this.displayTranche();
		   this.getTranches();
	   })
       .catch(error => {
	       this.id_tranche = 0;
		   displayErreur("tranche deleting error")
      })
    }
    ,
	submitTrancheForm() {
	   var erreur = 'Les champs en rouges sont requis';
	   clearRequiredModal();
	   this.hideErreur();
	   
	   this.isNew_tranche = false;
	   if (this.id_tranche == 0) this.isNew_tranche = true;

	   let data = {
		id_tranche:this.id_tranche,
		id_interview: this.id_parent,
		titre: this.titre,
		tps_debut: this.tps_debut,
		tps_fin: this.tps_fin,
        isNew: this.isNew_tranche,
      };

      var elems = document.querySelectorAll(".modalZone .required_field");
	  [].forEach.call(elems, function(el) {
		    if ((el.value == '')) {
			   el.classList.add("required");
			}
		});
		
		if (this.titre == '') {
			 document.getElementById("titre_resume").classList.add("required");
		}
		
		if (this.tps_debut == '') this.tps_debut = 0;
		if (this.tps_debut == 0) {
			 document.getElementById("tps_debut").classList.add("required");
		}
		
		if (this.tps_fin == '') this.tps_fin = 0;
		if (this.tps_fin == 0) {
			 document.getElementById("tps_fin").classList.add("required");
		}
		

		if(checkRequiredModal()) {
			displayErreur(erreur);
		}
		else {
			disabledActionsModal();
			  axios.post(this.url_server + "/addTranche", data)
			   .then(response => {
				   this.id_tranche = response.data.id_tranche;
				   this.isShowNoResultTranche = false;
				   this.displayTranche();
				   this.tranches = new Array();
				   this.getTranches();
			   })
			   .catch(error => {
				  enabledActionsModal();
				  displayErreur("Error adding tranche : " + error)
			   })
			
		}
       
    }
    ,
    isNumber(n) {
	    return !isNaN(parseFloat(n)) && isFinite(n);
	}
    ,
    displayTranche: function(id_tranche = 0)
    {
	    
	    var _element = document.querySelectorAll("#defaultModal")[0]
	    
	    if (_element.classList.contains('hidden')) {
		    _element.classList.remove("hidden");
		    _element.focus()
		    this.id_tranche = id_tranche;
		    if (this.id_tranche != 0) {
				
				this.getTranche();
			}
			else {
				this.titre = '';
				this.tps_debut = 0;
				this.tps_fin = 0;
				this.id_tranche = 0;
			}
		}
		else {
			this.id_tranche = 0;
			this.titre = '';
			this.tps_debut = 0;
			this.tps_fin = 0;
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
			id_tranche: this.id_tranche,
			list: this.tranches,
	      };
		 axios.post(this.url_server + "/updateTranchePosition", data)
	       .then(response => {
		       
		   })
	       .catch(error => displayErreur("error updating tranches"))
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




