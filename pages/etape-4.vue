<template>

  <div class="container">
	  <div class="grid">
	 	<div class="elements"></div>
 	</div>
 	
 	<div class="content">
	 	<header>
	 		<div class="logo"><nuxt-link to="/">MADE BY YOU</nuxt-link></div>
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
				 	<div><nuxt-link to="etape-1">1</nuxt-link></div>
				 	<div><nuxt-link to="etape-1">2</nuxt-link></div>
				 	<div><nuxt-link to="etape-1">3</nuxt-link></div>
				 	<div class="active">4</div>
			 	</div>
		 	</div>
		 	<div class="content-made-right etape4">
			 	
			 	<div class="infos"><div>Pour cette dernière étape de personnalisation, vous pouvez ajouter un motif ainsi que vos initiales (3 lettres max) : </div></div>
			 	<div class="choix cursor-pointer start">

					 	<div class="zone_1">
						 	<div>
							 	<div @click="etape(1,'t-shirt.svg')"><div class="figure"><img src="/upload/motif/1.png" alt="Made by you" /></div><div>M.B.Y</div></div>
							 	<div @click="etape(1,'t-shirt.svg')"><div class="figure"><img src="/upload/motif/2.png" alt="Made by you" /></div><div>Petits<br>pois</div></div>
							 	<div @click="etape(1,'t-shirt.svg')"><div class="figure"><img src="/upload/motif/3.png" alt="Made by you" /></div><div>Portée</div></div>
							 	<div @click="etape(1,'t-shirt.svg')"><div class="figure"><img src="/upload/motif/4.png" alt="Made by you" /></div><div>Spaghe-<br />ttis</div></div>
							 	<div @click="etape(1,'t-shirt.svg')"><div class="figure"><img src="/upload/motif/5.png" alt="Made by you" /></div><div>V</div></div>
						 	</div>
					 	</div>
					 	
					 					 	
				 	

				</div>
				<div class="preview-nav valid" @mouseleave='hideActiveValidT'>
					<div @mouseover='displayActiveValidT'  class="type-bt"><nuxt-link to="/etape-4">Valider</nuxt-link></div>
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
    ...mapGetters(['isAuthenticated', 'loggedInfont']),
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
	    imgPreview:'/upload/svg/t-shirt.svg',
	    id_etape_1:0,
	    id_etape_2:0,
	    id_etape_3:0,
	    parametres:'',
	    base_tshirt:new Array('forme_vetement','manche1','manche2','couture3'),
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
		console.log("val : " + this.g_width / coef)
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
	etape1: function(id,file)
	{
		this.imgPreview = '/upload/svg/' + file
		this.parametres.etape_1 = this.imgPreview;
		localStorage.setItem('parametres', JSON.stringify(this.parametres));
	}
	,
	loadEtape: function() {
		var para = this.parametres;
		if (para.id_etape_1 == 0) para.id_etape_1 = 1;
		this.id_etape_1 = para.id_etape_1
		var file = this.getFormByid(this.id_etape_1)
		this.loadSvg(file)
		this.isLoad = true;
	}
	,
	validEtape: function() {
		
	}
	,
	loadSvg: function(file) {
		document.querySelector('.preview-element').innerHTML = this.parametres.id_etape_3;
		
	}
	,
	getFormByid: function(id) {
		var form = '';
		switch(id) {
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
	    para.id_etape_1 = 1;
	    para.id_etape_2 = 0;
	    para.id_etape_3 = 0;	    
	    para.id_etape_4 = 0;
	    
	    
	    this.parametres = para;
	    localStorage.setItem('parametres', JSON.stringify(this.parametres));
	}
	,
	displayActiveValidT: function() {
		let paths = document.querySelectorAll('.zone_carre')
		for(let i=0; i<paths.length; i++){
			paths[i].classList.add('active')
		}
	}
	,
	hideActiveValidT: function() {
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

<style scoped>

</style>


