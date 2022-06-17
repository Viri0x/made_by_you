<template>
	<div>
		
		
		
		<div class="form-bloc form-bloc-list mt-9">
	         <div class="col w-full">   
	            <div class="col-content">
	                 <label @click="displayMedia(0);hideErreur();" for="AddFile" id="LAddFile" class="mb-3 border-b border-mainColor cursor-pointer"><div class="pb-2">Medias</div>
					     <div class="flex-1 text-right flex justify-end add highlight">
						     <svg class="bi"  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" /></svg>
		                </div>
	                </label>
	                
						<draggable  class="media-grid w-full" :list="medias" tag="div" draggable=".item"  @end="onEndPosition">
									<div v-for='(media, indexMedia) in medias' @click="displayMedia(media.id_document);hideErreur();" v-html="getModeMedia(media.fichier)" class="relative item cursor-pointer"></div>
						</draggable>

	         	</div> 
	         </div>
	    </div>
	    
	    <!-- Main modal -->
		<div id="defaultModalMedia" tabindex="1" @keydown.esc="displayMedia(0)" class="modalZone hidden overflow-y-auto overflow-x-hidden bg-mainBg/50 flex fixed right-0 left-0 top-4 z-50 justify-center items-center md:h-full md:inset-0">
		    <div class="relative px-6 w-full max-w-2xl h-full md:h-auto">
		        <!-- Modal content -->
		        <div class="relative bg-mainBg p-6 border border-activeColor">
		            <!-- Modal header -->
		            <div class="flex justify-between items-start border-b border-mainColor">
			             <h1>Média</h1>
		                <div class="bg-transparent ml-auto inline-flex items-center highlight" data-modal-toggle="defaultModalMedia">
		                    <svg @click="displayMedia()" class="big cursor-pointer" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>  
		                </div>
		            </div>
		            <!-- Modal body -->
		            <div>
			            <div class="form-container w-full border-0 p-0">
							<form method="post" autocomplete="off" @submit.prevent="submitMediaForm">
								
								
				                
					            <div class="form-bloc mt-9">
					                <div class="col w-full">
						                <div class="col-content">
							                <div>
												<div :class="flexIsFile" class="justify-between align-center">
													<div class="previewMediaUpload pb-1 flex items-center  justify-center">
										  				<div class="text-sm w-28" v-html="previewMedia"></div>
													</div>
												</div>
												</label>
											   <label @click="initForm" class="uploadZone-media bt-upload required_field">
											        <span class="leading-normal">choisir un média</span>
													<input type="file" id="file_media" ref="file_media" v-on:change="handleFileUploadMedia($event)" class="hidden"  :accept="accept_file" />
											    </label>
											    
											    
											    <div class="progress progress-media hidden">
													<div class="progress-title-media">{{ uploadPercentageMedia }}%</div>
													<div class="progress-stop-media" @click="cancelFileUpload()">stop</div>
													<div class="progress-bar-media" :style="{ width: uploadPercentageMedia + '%' }"></div>
												</div>
											</div>
						                </div>
					                </div>
					            </div>
					            
				                 <div class="form-bloc">
					                <div class="col w-full">
						                <div class="col-content">
							                <label for="legende_media" id="Llegende_media">Légende</label>
							                <textarea  @focus="initForm" v-model="legende_media" name="legende_media" id="legende_media"></textarea>
						                </div>
					                </div>
				                </div>

				                 <div class="form-action">
					                <div><button @click="displayMedia()" type="button">Annuler</button></div>
					                <div v-show="id_document != 0"><button @click="delMedia()" class="bt-delete" type="button">Supprimer</button></div>
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
	  this.getMedias();
  },
  data() {
    return {
	  url_server:this.$store.state.url_server,
	  accept_file:'.jpg,.jpeg,.png,.gif,.mp4,.mp3,.pdf',
	  value_file:'',
	  uploadPercentageMedia: 0,
	  previewMedia:'',
	  flexIsFile:'',
	  source:this.media_source,
	  id_parent : this.media_id_parent,
	  id_document: 0,
	  file_media:'',
	  value_file:'',
	  embed_media:'',
	  poster_media:'',
	  autoplay_media:'',
	  legende_media:'',
	  isNew_media:false,
	  medias:[],
	  media:'',
	  isShowLoadingMedias:true,
	  isShowNoResultMedias:false,
    }
  },
  props: {
  	media_source: String,
    media_id_parent: Number,
  },

  methods: {
     getMedias: function()
	 {
		 console.log("p : " + this.id_parent + " / " + this.source)
       axios.get(this.url_server + "/getMedias?id_parent=" + this.id_parent + "&source=" + this.source)
       .then(response => {
	       this.isShowLoadingMedias = false;
	       this.medias = response.data.resultat;
	       if (this.medias.length == 0) this.isShowNoResultMedias = true;
	   })
	   .catch(error => {
		   displayErreur('media loading error')
      })
    }
    ,
    getMedia: function()
	 {
       axios.get(this.url_server + "/getMedia?id_document=" + this.id_document)
       .then(response => {
	       this.media = response.data.liste;
		   if (typeof this.media.fichier !== 'undefined') {
		       this.value_file = this.media.fichier;
		       this.legende_media = this.media.legende;
		       this.id_display = this.media.id_display;
		       this.display_end_line = this.media.display_end_line;
		       
		       this.getPreviewMedia();
		    }
	   })
       .catch(error => {
	       this.id_document = 0;
		   displayErreur("media loading error")
      })
    },
    delMedia: function()
	 {
       axios.get(this.url_server + "/delMedia?id_document=" + this.id_document)
       .then(response => {
	       this.displayMedia();
		   this.getMedias();
	   })
       .catch(error => {
	       this.id_document = 0;
		   displayErreur("media deleting error")
      })
    },
	submitMediaForm() {
	   clearRequiredModal();
	   this.hideErreur();
	   
	   if (this.id_document == 0) this.isNew_media = true;
	   let data = {
		id_document:this.id_document,
		id_parent: this.id_parent,
		source: this.source,
		fichier: this.value_file,
		embed: this.embed_media,
		poster: this.poster_media,
		autoplay: this.autoplay_media,
        legende: this.legende_media,
        id_display: this.id_display,
        display_end_line: this.display_end_line,
        isNew: this.isNew_media,
      };

      var elems = document.querySelectorAll(".modalZone .required_field");
	  [].forEach.call(elems, function(el) {
		    if ((el.value == '')) {
			   el.classList.add("required");
			}
		});
		
		if (this.value_file == '') {
			document.querySelectorAll(".modalZone .uploadZone-media")[0].classList.add("required")
		}
		
		
		if(checkRequiredModal()) {
			displayErreur("The fields indicated are required");
		}
		else {
			disabledActionsModal();
			  axios.post(this.url_server + "/addMedia", data)
			   .then(response => {
				   this.id_document = response.data.id_document;
				   this.displayMedia();
				   this.getMedias();
			   })
			   .catch(error => {
				  enabledActionsModal();
				  displayErreur("Error adding media : " + error)
			   })
			
		}
       
    },
	handleFileUploadMedia(e){
		this.hideErreur();
		
		var element = e.currentTarget;
		this.fileId = element.id;

		this.file_media = element.files[0];
		if (this.file_media != '') {
			this.submitMedia();
		}
	}
    ,
    submitMedia(){
	  //this.uploadErreur = '';
	  this.uploadPercentageMedia = 0;
	  let formData = new FormData();
	  formData.append('file', this.file_media);
	  document.querySelectorAll(".progress-media")[0].classList.remove('hidden');
	  document.querySelectorAll(".uploadZone-media")[0].classList.add('hidden');
	  document.getElementById("file_media").disabled = true;
	  axios.post(this.url_server + '/uploadFile',
	    formData,
	    {
	      headers: {
	          'Content-Type': 'multipart/form-data'
	      },
	      onUploadProgress: function( progressEvent ) {
		      var val = parseInt( Math.round((progressEvent.loaded*100) / progressEvent.total ));
		      document.querySelectorAll(".progress-title-media")[0].innerHTML = val + '%';
			  this.uploadPercentageMedia = val;
	      }.bind(this)
	    }
	  )
	  .then(response => {
		  
		  var isOptimize = response.data.isOptimize;
		  
		  document.querySelector('#file_media').value='';
		  this.value_file = response.data.optimizeFile[0];

		  
		  if (isOptimize) {
			  document.querySelectorAll(".progress-title-media")[0].innerHTML = 'media optimization...';
			  document.querySelectorAll(".progress-stop-media")[0].classList.add('hidden')
			  this.uploadPercentage = 0;
			  
			  setTimeout(function () { 
				  axios.get(this.url_server + "/optimizeFile?fichier=" + this.value_file)
			       .then(response => {
				       document.querySelectorAll(".progress-title-media")[0].innerHTML = 'media optimization...';
				       this.getPreviewMedia()
				   })
			       .catch(error => displayErreur("Error during optimization"))
				  
			  }.bind(this), 2000)
			  
		  }
		  else this.getPreviewMedia();

		  
		  
		  
      })
      .catch(err => {
	      if (typeof err.response.data.message === 'undefined') displayErreur(err.response.data.message)
	      else displayErreur(err.response.data.message)
		  document.querySelectorAll(".progress-media")[0].classList.add('hidden');
		  document.querySelectorAll(".uploadZone-media")[0].classList.remove('hidden');
		  document.getElementById("file_media").disabled = false;
      })
	}
	,
	getModeMedia: function(file,isAdmin)
    {
	    var ext = file.toLowerCase().split(".").pop();
	    var previewMedia = '';
	    switch(ext) {
		    case "mp4" : previewMedia = '<video width="100%" height="auto" controls><source src="/upload/' + file + '" type="video/mp4"></video>';
		    			 break;
		    case "mp3" : preview = '<audio controls><source src="/upload/' + file + '" type="audio/mpeg"></audio>';
			    			 break;
		    case "jpg" :
		    case "jpeg" :
		    case "gif" :
		    case "png" : previewMedia = '<img src="/upload/' + file + '" />';
		    			 break;
		    default: previewMedia = '<a class="flex" target="blank" href="/upload/' + file + '"><svg xmlns="http://www.w3.org/2000/svg" class="pr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg> preview file</a>';
		    
		    		 if (isAdmin) this.flexIsFile = 'flex ';
	    }
	    
	    return previewMedia;
	}
	,
	getPreviewMedia: function()
    {
	    document.querySelectorAll(".progress-title-media")[0].innerHTML = '';
	    document.querySelectorAll(".progress-stop-media")[0].classList.remove('hidden')
			  
	    document.querySelectorAll(".progress-media")[0].classList.add('hidden');
		document.querySelectorAll(".uploadZone-media")[0].classList.remove('hidden');
		document.getElementById("file_media").disabled = false;
		  
	    var previewMedia = '';
	    var file = this.value_file;
	    if (this.value_file != '') {
		    this.previewMedia = this.getModeMedia(file,true);
	    }
	    
    }
    ,
    displayMedia: function(id_document = 0)
    {
	    
	    var _element = document.querySelectorAll("#defaultModalMedia")[0]
	    
	    if (_element.classList.contains('hidden')) {
		    _element.classList.remove("hidden");
		    _element.focus()
		    this.id_document = id_document;
		    if (this.id_document != 0) {
				
				this.getMedia();
			}
			else {
				this.value_file = '';
				this.previewMedia = '';
			}
		}
		else {
			
			this.value_file = '';
			this.embed_media = '';
			this.poster_media = '';
			this.autoplay_media = 0;
	        this.legende_media = '';
	        this.isNew_media = false;
	        this.id_display = 0;
			this.display_end_line = 0;
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
			id_parent: this.source,
			id_parent: this.id_parent,
			list: this.medias,
	      };
		 axios.post(this.url_server + "/updateMediaPosition", data)
	       .then(response => {
		       
		   })
	       .catch(error => displayErreur("error updating positions"))
	}

  }
}
</script>

<style>

	</style>




