<template>

  <div class="container">
	  <div class="grid">
	 	<div class="elements"></div>
 	</div>
 	
 	<div class="content">
	 	<header>
	 		<div class="logo" @click="logout">MADE BY YOU</div>
	 		<div class="like"><img class="img-logo" src="~/assets/img/like.svg" alt="Made by you" /></div>
	 	</header>
	 	
	 	<div class="content-made">
		 	<div class="content-made-left">
			 	<div class="preview-content">
				 	<div class="preview-corner-top"></div>
			 		<div class="preview">
				 		<div v-show="isLoad" class="preview-element" v-html="imgPreview"></div>
				 		<div v-show="isAnim" class="anim"></div>
			 		</div>
			 		<div class="preview-corner-bottom"></div>
			 	</div>
			 	
			 	<div class="preview-nav">
				 	<div class="active">1</div>
				 	<div>2</div>
				 	<div>3</div>
				 	<div>4</div>
			 	</div>
		 	</div>
		 	<div class="content-made-right etape1">
			 	
			 	<div class="infos"><div>Pour commencer, choisissez le type de haut<br />que vous souhaitez personnaliser :</div></div>
			 	<div class="choix cursor-pointer">
				 	
				 	<div @click="etape(1,'tshirt',$event)">T</div>
				 	<div @click="etape(2,'debardeur',$event)">D</div>
				 	<div @click="etape(3,'chemise',$event)">C</div>
				 	<div @click="etape(4,'polo',$event)">P</div>
				</div>
				<div class="preview-nav valid" @mouseleave='hideActiveValid'>
					<div @mouseover='displayActiveValid'  class="type-bt"><nuxt-link to="/etape-2">Valider</nuxt-link></div>
					<div class="zone_carre carre_tf"></div>
					<div class="zone_carre carre_tr"></div>
					
					<div class="zone_carre carre_bl"></div>
					<div class="zone_carre carre_br"></div>
					<div class="zone_carre carre_l1"></div>
					<div class="zone_carre carre_l2"></div>
					<div class="zone_carre carre_r1"></div>
					<div class="zone_carre carre_r2"></div>
			 	</div>
		 	</div>
	 	</div>
 	</div>
 	
 	
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	middleware: 'auth',
   computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser']),
  }
  ,
	layout: 'default',
	data() {
    return {
	    g_width: 0,
		g_height: 0,
	    isEn:true,
	    isSoon:false,
	    isAnim:false,
	    isLoad:false,
	    imgPreview:'<div class="mby">M.B.Y</div>',
	    parametres:'',
		base_tshirt:new Array('forme_vetement','col_rond','manche1','manche2','couture3'),
	    base_debardeur:new Array('forme_vetement','couture1','couture2','couture3'),
	    base_chemise:new Array('forme_vetement','manche1','manche2','col_chemise','couture1','couture2','couture3','boutons_ronds'),
	    base_polo:new Array('forme_vetement','col_polo','manche1','manche2','couture1','couture2','boutons'),
    }
  },
  mounted() {
	this.parametres = JSON.parse(localStorage.getItem('parametres') || "[]") ;
	this.loadEtape();
	this.getDimensions();
	window.addEventListener('resize', this.getDimensions);
  }
  ,
  unmounted() {
    window.removeEventListener('resize', this.getDimensions);
  }
  ,
   methods: {
	getDimensions() {
      this.g_width = document.querySelector('.grid').clientWidth;
      this.g_height = document.querySelector('.grid').clientHeight;
      
      this.displayGrid();
    }
    ,
	displayGrid: function() {
		var col = '';
		var grid_elements = document.querySelector('.grid .elements')
		var coef = this.vwTOpx(1.5);
		for (var i=0;i<(this.g_width / coef);i++) {
			for (var j=0;j<(this.g_width / coef);j++) {
				col += '<div></div>';
			}
		}
		
		grid_elements.innerHTML = col;
       
    },
    vwTOpx(value) {
	  var w = window;
	  var d = document;
	  var e = d.documentElement;
	  var g = d.getElementsByTagName('body')[0];
	  var x = w.innerHeight || e.clientHeight || g.clientHeight;
	 
	  var result = (x*value)/100;
	  return(result);
	}
	,
	etape: function(id,file,event)
	{
		//this.imgPreview = '/upload/all/' + file
		this.initSelectEtape();
		event.target.classList.add('active');
		this.loadSvg(file)
		this.parametres.id_etape_1 = id;
		
		
		
		var para = new Object();
	    para.id_etape_1 = id;
	    para.id_etape_2 = 0;
	    para.id_etape_3 = 0;	    
	    para.id_etape_4 = 0;
	    
	    
	    this.parametres = para;
	    console.log("PARAMETRE before : " + this.parametres)
	    localStorage.setItem('parametres', JSON.stringify(this.parametres));
		
		this.parametres = JSON.parse(localStorage.getItem('parametres') || "[]") ;
		
		console.log("PARAMETRE PAGE 1 : " + this.parametres)
	}
	,
	initSelectEtape: function(id,file,event)
	{
		let paths = document.querySelectorAll('.choix > div')
console.log("TAILLe : " + paths.length)
			//now we can loop over the array and add an eventlistener to each path in the array
			// it listens to the 'click' event and then runs function toggleClass()
			for(let i=0; i<paths.length; i++){
				console.log("VAVVAVVAV")
				paths[i].classList.remove('active');
			}
	}
	,
	loadEtape: function() {
		var para = this.parametres;
		if(typeof this.parametres.length === 'undefined') {
			this.initPara();
		}
		
				
		para.id_etape_1 = 0;
		var file = this.getFormByid(para.id_etape_1)
		if (file != '') this.loadSvg(file)
		this.isLoad = true;
	}
	,
	validEtape: function() {
		
	}
	,
	loadSvg: function(file) {
		document.querySelector('.preview-element').classList.add('loading');
		
		this.imgPreview = document.querySelector('#Model-' + file).innerHTML;
		var initPara = new Array();
		var svg_el =  document.querySelector('.preview-element #forme_vetement');
		
		switch(file) {
			case 'logo' : initPara = new Array();
					 break;
			case 'tshirt' : initPara = this.base_tshirt;
					 break;
			case 'debardeur' : initPara = this.base_debardeur;
					 break;
			case 'chemise' : initPara = this.base_chemise;
					 break;
			case 'polo' : initPara = this.base_polo;
					 break;
		}
		
		
		
		setTimeout(function() {
			for (var i=0;i<initPara.length;i++) {
				var svg_el =  document.querySelector('.preview-element #' + initPara[i]).style.display = "block";
			}
			
			document.querySelector('.preview-element').classList.remove('loading');
		}, 1000);
		
	}
	,
	getFormByid: function(id) {
		var form = '';
		switch(id) {
			case 0 : form = '';
					 break;
			case 1 : form = 'tshirt';
					 break;
			case 2 : form = 'debardeur';
					 break;
			case 3 : form = 'chemise';
					 break;
			case 4 : form = 'polo';
					 break;
		}
		
		return form;
	}
	,
	initPara() {
	  	var para = new Object();
	    para.id_etape_1 = 0;
	    para.id_etape_2 = 0;
	    para.id_etape_3 = 0;	    
	    para.id_etape_4 = 0;
	    
	    
	    this.parametres = para;
	    localStorage.setItem('parametres', JSON.stringify(this.parametres));
	}
	,
	testClick: function() {
	  	console.log("test")
	}
	,
	displayActiveValid: function() {
		let paths = document.querySelectorAll('.zone_carre')
		for(let i=0; i<paths.length; i++){
			paths[i].classList.add('active')
		}
	}
	,
	hideActiveValid: function() {
		let paths = document.querySelectorAll('.zone_carre')
		for(let i=0; i<paths.length; i++){
			paths[i].classList.remove('active')
		}
	}
	,
		async logout() {
	      await this.$auth.logout();
	      this.$router.push('/login')
	    }
  }
}
</script>




