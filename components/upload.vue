<template>
	<div :class="cible_class">
		<div :class="flexIsFile" class="justify-between align-center">
			<label>{{titre_file}}</label>
			<div class="previewUpload pb-1 flex items-center justify-center">
  				<div class="flex items-center justify-center text-sm w-1/2" v-html="preview"></div>
			</div>
		</div>
		</label>
	   <label @click="hideErreur()" class="uploadZone bt-upload">
	        <span class="leading-normal">{{label_file}}</span>
			<input type="file" id="file" ref="file" v-on:change="handleFileUpload($event)" class="hidden"  :accept="accept_file" />
	    </label>
	    
	    
	    <div class="progress hidden">
			<div class="progress-title">{{ uploadPercentage }}%</div>
			<div class="progress-bar" :style="{ width: uploadPercentage + '%' }"></div>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import axios from 'axios';

export default {
  name: 'edit-upload',
  layout: 'edit',
  middleware: 'auth',
  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser']),
  },
  created() {
  }
  ,
  mounted() {
  	this.getPreview(this.value_file)
  },
  data() {
    return {
	  url_server:this.$store.state.url_server,
	  titre_file:this.upload_titre_file,
	  label_file:this.upload_label_file,
	  accept_file:this.upload_accept_file,
	  value_file:this.upload_value_file,
	  cible_class:this.upload_cible,
	  cible:'.' + this.upload_cible + ' ',
	  uploadPercentage: 0,
	  file:'',
	  preview:'',
	  flexIsFile:'',
    }
  },
  props: {
   upload_titre_file: String,
   upload_label_file: String,
   upload_accept_file: String,
   upload_value_file: String,
   upload_cible: String,
  },
  emits: ['update:specimen_file']
  ,
  methods: {
	handleFileUpload(e){
		this.hideErreur();
		
		var element = e.currentTarget;
		this.fileId = element.id;

		this.file = element.files[0];
		if (this.file != '') {
			this.submitFile();
		}
	}
    ,
    submitFile(){
	  //this.uploadErreur = '';
	  this.uploadPercentage = 0;
	  let formData = new FormData();
	  formData.append('file', this.file);
	  document.querySelector(this.cible + ".progress").classList.remove('hidden');
	  document.querySelector(this.cible + ".uploadZone").classList.add('hidden');
	  document.getElementById("file").disabled = true;
	  axios.post(this.url_server + '/uploadFile',
	    formData,
	    {
	      headers: {
	          'Content-Type': 'multipart/form-data'
	      },
	      onUploadProgress: function( progressEvent ) {
		      var val = parseInt( Math.round((progressEvent.loaded*100) / progressEvent.total ));
		      document.querySelector(this.cible + ".progress-title").innerHTML = val + '%';
			  this.uploadPercentage = val;
	      }.bind(this)
	    }
	  )
	  .then(response => {
		  
		  var isOptimize = response.data.isOptimize;
		  
		  document.querySelector('#file').value='';
		  this.value_file = response.data.optimizeFile[0];
		  this.$emit("input", response.data.optimizeFile[0]);
		  
		  if (isOptimize) {
			  document.querySelector(this.cible + ".progress-title").innerHTML = 'media optimization...';
			  //document.querySelector(this.cible + ".progress-stop").classList.add('hidden')
			  this.uploadPercentage = 0;
			  
			  setTimeout(function () { 
				  axios.get(this.url_server + "/optimizeFile?fichier=" + this.value_file)
			       .then(response => {
				       document.querySelector(this.cible + ".progress-title").innerHTML = 'media optimization...';
				       this.getPreview()
				   })
			       .catch(error => displayErreur("erreur lors de l'optimisation"))
				  
			  }.bind(this), 2000)
			  
		  }
		  else this.getPreview();

		  
		  
		  
      })
      .catch(err => {
	      if (typeof err.response.data.message === 'undefined') displayErreur(err.response.data.message)
	      else displayErreur(err.response.data.message)
		  document.querySelector(this.cible + ".progress").classList.add('hidden');
		  document.querySelector(this.cible + ".uploadZone").classList.remove('hidden');
		  document.getElementById("file").disabled = false;
      })
	}
	,
	getPreview: function()
    {
	    document.querySelector(this.cible + ".progress-title").innerHTML = '';
	    //document.querySelector(this.cible + ".progress-stop").classList.remove('hidden')
			  
	    document.querySelector(this.cible + ".progress").classList.add('hidden');
		document.querySelector(this.cible + ".uploadZone").classList.remove('hidden');
		document.getElementById("file").disabled = false;
		  
	    var preview = '';
	    var file = this.value_file;
	    if (this.value_file != '') {
		    console.log("file : " + this.value_file)
		    var ext = file.toLowerCase().split(".").pop();
		    
		    switch(ext) {
			    case "mp4" : preview = '<video width="100%" height="auto" controls><source src="/upload/' + file + '" type="video/mp4"></video>';
			    			 break;
			    case "mp3" : preview = '<audio controls><source src="/upload/' + file + '" type="audio/mpeg"></audio>';
			    			 break;
			    case "jpg" :
			    case "jpeg" :
			    case "gif" :
			    case "png" : preview = '<img class="w-20" src="/upload/' + file + '" />';
			    			 break;
			    default: preview = '<a class="flex" target="blank" href="/upload/' + file + '"><svg xmlns="http://www.w3.org/2000/svg" class="pr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg> preview file</a>';
			    		 this.flexIsFile = 'flex ';
		    }
		    
		    this.preview = preview;
	    }
	    
    }
	,
	hideErreur: function()
    {
	    hideErreur();
    }
  }
}
</script>




