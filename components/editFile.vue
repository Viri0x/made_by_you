<template>
	<div>
		
		
		
		<div class="form-bloc form-bloc-list mt-9">
	         <div class="col w-full">   
	            <div class="col-content">
	                 <label @click="displayFile(0);hideErreur();" for="AddFile" id="LAddFile" class="mb-3 border-b border-mainColor cursor-pointer"><div class="pb-2">Fichiers son</div>
					     <div class="flex-1 text-right flex justify-end add highlight">
						     <svg class="bi"  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" /></svg>
		                </div>
	                </label>
	                <div v-show='isShowLoadingFiles'>Chargement des fichiers...</div><div v-show='isShowNoResultFiles'>Aucun fichier</div>
						<draggable  class="sound-grid w-full" :list="files" tag="div" draggable=".item"  @end="onEndPosition">
									<div v-for='(file, indexFile) in files' class="relative item cursor-pointer">
										<div class="soundPlayer" :id="'S_' + indexFile">
											<div class="progress-play"><div class="progress-play-val"></div></div>
											<div  class="content-play">
												<div class="player isLoading" @click="playSound('/upload/' + file.fichier,'S_' + indexFile, indexFile)"><img src="/img/play.svg" alt="Play" /></div>
												<div @click="displayFile(file.id_file);hideErreur();">{{file.titre}}</div>
												<div class="duration">...{{loadSound('/upload/' + file.fichier,'S_' + indexFile, indexFile)}}</div>
											</div>
										</div>
										
									</div>
						</draggable>

	         	</div> 
	         </div>
	    </div>
	    
	    <!-- Main modal -->
		<div id="defaultModalFile" tabindex="1" @keydown.esc="displayFile(0)" class="modalZone hidden overflow-y-auto overflow-x-hidden bg-mainBg/50 flex fixed right-0 left-0 top-4 z-50 justify-center items-center md:h-full md:inset-0">
		    <div class="relative px-6 w-full max-w-2xl h-full md:h-auto">
		        <!-- Modal content -->
		        <div class="relative bg-mainBg p-6 border border-activeColor">
		            <!-- Modal header -->
		            <div class="flex justify-between items-start border-b border-mainColor">
			             <h1>Fichier</h1>
		                <div class="bg-transparent ml-auto inline-flex items-center highlight" data-modal-toggle="defaultModalFile">
		                    <svg @click="displayFile()" class="big cursor-pointer" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>  
		                </div>
		            </div>
		            <!-- Modal body -->
		            <div>
			            <div class="form-container w-full border-0 p-0">
							<form method="post" autocomplete="off" @submit.prevent="submitFileForm">
								
								
				                
					            <div class="form-bloc mt-9">
					                <div class="col w-full">
						                <div class="col-content">
							                <div>
												<div :class="flexIsFile" class="justify-between align-center">
													<div class="previewFileUpload pb-1 flex items-center  justify-center">
										  				<div class="text-sm" v-html="previewFile"></div>
													</div>
												</div>
												</label>
											   <label @click="initForm" class="uploadZone-file bt-upload required_field">
											        <span class="leading-normal">choisir un mp3</span>
													<input type="file" id="file_media" ref="file_media" v-on:change="handleFileUploadMedia($event)" class="hidden"  :accept="accept_file" />
											    </label>
											    
											    
											    <div class="progress progress-media hidden">
													<div class="progress-title-media">{{ uploadPercentageFile }}%</div>
													<div class="progress-bar-media" :style="{ width: uploadPercentageFile + '%' }"></div>
												</div>
											</div>
						                </div>
					                </div>
					            </div>

				                 <div class="form-action">
					                <div><button @click="displayFile()" type="button">Annuler</button></div>
					                <div v-show="id_file != 0"><button @click="delFile()" class="bt-delete" type="button">Supprimer</button></div>
					                <!--<div><button type="submit">Enregistrer</button></div>-->
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
import draggable from 'vuedraggable';
import moment from 'moment';

var Tone;
var playerSound;
var bufferSound = new Array();

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
  }
  ,
  created() {
  }
  ,
  mounted() {
	  this.getFiles();
	  
	  Tone = require("Tone");
	  
	  playerSound = new Tone.Player().toDestination();
	  //this.loadSound('',1,1)
  },
  data() {
    return {
	  url_server:this.$store.state.url_server,
	  accept_file:'.mp3',
	  value_file:'',
	  uploadPercentageFile: 0,
	  previewFile:'',
	  flexIsFile:'',
	  source:this.media_source,
	  id_parent : this.file_id_parent,
	  id_file: 0,
	  titre:'',
	  file_media:'',
	  value_file:'',
	  isNew_file:false,
	  files:[],
	  file:'',
	  isShowLoadingFiles:true,
	  isShowNoResultFiles:false,
	  progressValTotal:0,
	  isPlayingSound : -1,
	  valSetInterval:'',
	  valSetTimeout:'',
	  myCurrentTime : 0,
	  myCurrentTimeSave : 0,
    }
  },
  props: {
    file_id_parent: Number,
  },

  methods: {
     getFiles: function()
	 {
       axios.get(this.url_server + "/getFiles?id_playlist=" + this.id_parent)
       .then(response => {
	       this.isShowLoadingFiles = false;
	       this.files = response.data.liste;
	       if (this.files.length == 0) this.isShowNoResultFiles = true;
	   })
	   .catch(error => {
		   displayErreur('files loading error')
      })
    }
    ,
    getFile: function()
	 {
       axios.get(this.url_server + "/getFile?id_file=" + this.id_file)
       .then(response => {
	       this.file = response.data.liste;
		   if (typeof this.file.fichier !== 'undefined') {
		       this.value_file = this.file.fichier;
		       this.getPreviewFile();
		    }
	   })
       .catch(error => {
	       this.id_file = 0;
		   displayErreur("file loading error")
      })
    },
    delFile: function()
	 {
       axios.get(this.url_server + "/delFile?id_file=" + this.id_file)
       .then(response => {
	       this.displayFile();
		   this.getFiles();
	   })
       .catch(error => {
	       this.id_file = 0;
		   displayErreur("file deleting error")
      })
    },
	submitFileForm() {
	   clearRequiredModal();
	   this.hideErreur();
	   this.isNew_file = false;
	   if (this.id_file == 0) this.isNew_file = true;
	   
	   let data = {
		id_file:this.id_file,
		id_playlist: this.id_parent,
		titre: this.titre,
		fichier: this.value_file,
        isNew: this.isNew_file,
      };

      var elems = document.querySelectorAll(".modalZone .required_field");
	  [].forEach.call(elems, function(el) {
		    if ((el.value == '')) {
			   el.classList.add("required");
			}
		});
		
		if (this.value_file == '') {
			document.querySelectorAll(".modalZone .uploadZone-file")[0].classList.add("required")
		}
		
		
		if(checkRequiredModal()) {
			displayErreur("The fields indicated are required");
		}
		else {
			disabledActionsModal();
			  axios.post(this.url_server + "/addFile", data)
			   .then(response => {
				   this.id_file = response.data.id_file;
				   this.displayFile();
				   this.isShowNoResultFiles = false;
				   this.getFiles();
			   })
			   .catch(error => {
				  enabledActionsModal();
				  displayErreur("Error adding file : " + error)
			   })
			
		}
       
    },
	handleFileUploadMedia(e){
		this.hideErreur();
		
		var element = e.currentTarget;
		this.fileId = element.id;

		this.file_media = element.files[0];
		this.titre = element.files[0].name;
		if (this.file_media != '') {
			this.submitMedia();
		}
	}
    ,
    submitMedia(){
	  //this.uploadErreur = '';
	  this.uploadPercentageFile = 0;
	  let formData = new FormData();
	  formData.append('file', this.file_media);
	  document.querySelectorAll(".progress-media")[0].classList.remove('hidden');
	  document.querySelectorAll(".uploadZone-file")[0].classList.add('hidden');
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
			  this.uploadPercentageFile = val;
	      }.bind(this)
	    }
	  )
	  .then(response => {
		  
		  var isOptimize = response.data.isOptimize;
		  
		  document.querySelector('#file_media').value='';
		  this.value_file = response.data.optimizeFile[0];
		  
		  this.submitFileForm();
		  //this.getPreviewFile();

      })
      .catch(err => {
	      if (typeof err.response.data.message === 'undefined') displayErreur(err.response.data.message)
	      else displayErreur(err.response.data.message)
		  document.querySelectorAll(".progress-media")[0].classList.add('hidden');
		  document.querySelectorAll(".uploadZone-file")[0].classList.remove('hidden');
		  document.getElementById("file_media").disabled = false;
      })
	}
	,
	getModeFile: function(file,isAdmin)
    {
	    var previewFile = '<audio controls><source src="/upload/' + file + '" type="audio/mpeg"></audio>';
	    var previewFile = '';

	    return previewFile;
	}
	,
	getPreviewFile: function()
    {
	    document.querySelectorAll(".progress-title-media")[0].innerHTML = '';
	    //document.querySelectorAll(".progress-stop-media")[0].classList.remove('hidden')
			  
	    document.querySelectorAll(".progress-media")[0].classList.add('hidden');
		document.querySelectorAll(".uploadZone-file")[0].classList.remove('hidden');
		document.getElementById("file_media").disabled = false;
		  
	    var previewFile = '';
	    var file = this.value_file;
	    if (this.value_file != '') {
		    this.previewFile = this.getModeFile(file,true);
	    }
	    
    }
    ,
    displayFile: function(id_file = 0)
    {
	    
	    var _element = document.querySelectorAll("#defaultModalFile")[0]
	    
	    if (_element.classList.contains('hidden')) {
		    _element.classList.remove("hidden");
		    _element.focus()
		    this.id_file = id_file;
		    if (this.id_file != 0) {
				
				this.getFile();
			}
			else {
				this.value_file = '';
				this.previewFile = '';
			}
		}
		else {
			this.value_file = '';
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
	   clearRequiredModal();
	   enabledActionsModal();
	   hideErreur();
    }
    ,
	onEndPosition()
	{
		let data = {
			id_parent: this.id_parent,
			list: this.files,
	      };
		 axios.post(this.url_server + "/updateFilePosition", data)
	       .then(response => {
		       
		   })
	       .catch(error => displayErreur("error updating positions"))
	}
	,
	loadSound(file, id, index)
	{
		bufferSound[index] = new Tone.ToneAudioBuffer(file, () => {
			document.querySelector('#' + id + ' .duration').innerHTML = this.convertSoundDuration(bufferSound[index].duration);
			document.querySelector('#' + id + ' .player').classList.remove('isLoading');
		});
		
		 /*bufferSound = new Tone.ToneAudioBuffers({
		 urls: {
			 C1: "/upload/file-1652950866037.mp3",
			C2: "/upload/file-1653050696794.mp3",
		 },
		 onload: () => console.log("loaded"),
	});*/
		

	}
	,
	playSound(file,id,index)  
	{
		if (!document.querySelector('#' + id + ' .player').classList.contains('isLoading')) {
			
			if (this.isPlayingSound == index) {
				if (playerSound.state == 'stopped') {
					playerSound.start();
					playerSound.seek(this.myCurrentTimeSave);
					
				}
				else {
					this.pauseSound(id);
				}
			}
			else {
				if (this.isPlayingSound != -1) {
					clearTimeout(this.valSetTimeout);
					this.stopSound();
				}
				
				this.initAllSound();
				
				Tone.Transport.start();
				this.myCurrentTime = new Tone.TransportTime();
				
				this.isPlayingSound = index;
				this.progressValTotal = bufferSound[index].duration;
				playerSound.buffer = bufferSound[index];
				playerSound.start();
				this.playSoundProgress(id);
				
				document.querySelector('#' + id + ' .player img').setAttribute("src","/img/pause.png");
				
				
			}
			
		}
		
	}
	,
	initAllSound()
	{
		document.querySelectorAll('.progress-play-val').forEach(el => el.style.width = '0px');
		document.querySelectorAll('.player img').forEach(el => el.setAttribute("src","/img/play.svg"));
	}
	,
	pauseSound(id)  
	{
		//Tone.Transport.stop();
		clearInterval(this.valSetInterval);		
		playerSound.stop();		
		
		
		this.myCurrentTimeSave = this.myCurrentTime.toSeconds();
		console.log("PAUSE : " + this.myCurrentTimeSave)
		document.querySelector('#' + id + ' .player img').setAttribute("src","/img/play.svg");
		//Tone.Transport.stop();
		//this.myCurrentTime = 0;
	}
	,
	stopSound()  
	{
		//Tone.stop();
		
		this.isPlayingSound = -1;
		this.progressValTotal = 0;
		clearInterval(this.valSetInterval);
		document.querySelectorAll('.progress-play-val').forEach(el => el.style.width = '0px');
		
		playerSound.stop();		
		Tone.Transport.stop();
		this.myCurrentTime = 0;
	}
	,
	playSoundProgress(id)  
	{
		
		
		if (this.isPlayingSound != -1) {		
			//console.log("IN : " + this.myCurrentTime.toSeconds())	
			document.querySelector('#' + id + ' .progress-play-val').style.width = Math.round((this.myCurrentTime.toSeconds()*100) / this.progressValTotal ) + '%';
			
			this.valSetInterval = setTimeout(function () { if (this.isPlayingSound != -1) this.playSoundProgress(id) }.bind(this), 200);
			//setInterval(function () { if (this.isPlayingSound != -1) this.playSoundProgress(id) }.bind(this), 100);     
		}
		else {
			console.log("OUT")
			clearTimeout(this.valSetInterval);
		}
		
	}
	,
	playSoundOld(file,id,index) 
	{
		console.log(bufferSound[index])

    
		playerSound = new Tone.Player(file, () => {
			//document.querySelectorAll('#' + id + ' img')[0].setAttribute("src","assets/img/pause.png");
			playerSound.start();
			// seek to the offset in 1 second from now
			//player.seek(0.4, "+1");
		}).toDestination();
	}
	,
	convertSoundDuration(sec)
	{
		var val = (sec / 60).toFixed(2);
		return val.toString().replace(".",":")
	}

  }
}
</script>

<style>

	</style>




