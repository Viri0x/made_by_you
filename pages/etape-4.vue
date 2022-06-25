<template>

  <div class="container">
	  <div class="grid">
	 	<div class="elements"></div>
 	</div>
 	
 	<div class="content">
	 	<header>
	 		<div class="logo"><nuxt-link to="/">MADE BY YOU</nuxt-link></div>
	 		<div class="like"><img class="img-logo" src="~/assets/img/like/like4.svg" alt="Made by you" /></div>
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
				 	<div><nuxt-link to="/etape-1">1</nuxt-link></div>
				 	<div><nuxt-link to="/etape-1">2</nuxt-link></div>
				 	<div><nuxt-link to="/etape-1">3</nuxt-link></div>
				 	<div class="active">4</div>
			 	</div>
		 	</div>
		 	<div class="content-made-right etape4">
			 	
			 	<div class="infos"><div>Pour cette dernière étape de personnalisation, vous pouvez ajouter un motif ainsi que vos initiales : </div></div>
			 	<div class="choix cursor-pointer start">

					 	<div class="zone_1">
						 	<div>
							 	<div @click="motif(1)"><div class="figure"><img src="/upload/motif/1.png" alt="Made by you" /></div><div>M.B.Y</div></div>
							 	<div><div class="figure"><img src="/upload/motif/2.png" alt="Made by you" /></div><div>Petits<br>pois</div></div>
							 	<div><div class="figure"><img src="/upload/motif/3.png" alt="Made by you" /></div><div>Portée</div></div>
							 	<div><div class="figure"><img src="/upload/motif/4.png" alt="Made by you" /></div><div>Spaghe-<br />ttis</div></div>
							 	<div><div class="figure"><img src="/upload/motif/5.png" alt="Made by you" /></div><div>V</div></div>
						 	</div>
					 	</div>
					 	
					 	<div class="zone_2">
						 	<div>
							 	<div @click="updateFont(1)" class="font_1 selected">Typo 1</div>
							 	<div @click="updateFont(2)" class="font_2">Typo 2</div>
							 	<div @click="updateFont(3)" class="font_3">Typo 3</div>
							 	<div @click="updateFont(4)" class="font_4">Typo 4</div>
						 	</div>
					 	</div>
					 	
					 	<div class="zone_3">
						 	<div>
							 	<div><input @input="goInitiale(1)" placeholder="vos initiales" name="initiale" id="initiale" value="" /></div>
						 	</div>
					 	</div>
					 	
					 					 	
				 	

				</div>
				<div class="preview-nav valid" @mouseleave='hideActiveValidT'>
					<div @mouseover='displayActiveValidT' @click="validEtape()" class="type-bt">Valider</div>
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
var oneTime = false;
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
	    id_font:1,
	    dragOffsetX: null,
      dragOffsetY: null
    }
  },
  mounted() {
	this.parametres = JSON.parse(localStorage.getItem('parametres') || "[]") ;
	this.loadEtape();
	this.getDimensions();
	window.addEventListener('resize', this.getDimensions);
	
	this.updateFont(1);
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
		this.parametres.id_etape_4 = document.querySelector('.preview-element').innerHTML;
		localStorage.setItem('parametres', JSON.stringify(this.parametres));
		document.location = '/end';
	}
	,
	loadSvg: function(file) {
		var loc = this.parametres.id_etape_3;
		//loc= loc.replace('<svg','<svg onload="makeDraggable(evt)" ')
		
		document.querySelector('.preview-element').innerHTML = loc;
		
		setTimeout(function() {
			
			document.querySelector('.preview-element svg').addEventListener('click', (event) => {
				if (!oneTime) {
					makeDraggable(event)
					oneTime = true;
				}
		});
		}, 100);
		
		
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
    ,
    updateFont(id) {
	    this.id_font = id;
	    
	    document.querySelector('.font_1').classList.remove('selected');
	    document.querySelector('.font_2').classList.remove('selected');
	    document.querySelector('.font_3').classList.remove('selected');
	    document.querySelector('.font_4').classList.remove('selected');
	    
	    document.querySelector('.font_' + id).classList.add('selected');
	    
	    this.goInitiale();
	}
     ,
    goInitiale() {
	    if (this.id_font == 1) document.querySelector('.preview-element #texte').style.fontFamily='LoRes 9 OT Narrow';
	    if (this.id_font == 2) document.querySelector('.preview-element #texte').style.fontFamily='IBMPlexSans-Regular';
	    if (this.id_font == 3) document.querySelector('.preview-element #texte').style.fontFamily='Anek Latin';
	    if (this.id_font == 4) document.querySelector('.preview-element #texte').style.fontFamily='Rigatoni';
	    document.querySelector('.preview-element #texte').textContent = document.querySelector('#initiale').value;
	}
    ,
    motif(index) {
	    /*motif4_sansmanche_colV
	    motif4_sansmanche_colclaudine
	    motif4_sansmanche_colmontant
	    motif4_sansmanche
	    motif4_colV
	    motif4_colclaudine
	    motif4_colmontant
	    motif4*/
	    
	    
	    
	     document.querySelector('.preview-element #motif').style.display = "block";
	     //document.querySelector('.preview-element #motif1-' + index).style.fill = "transparent";
	     //document.querySelector('.preview-element #motif1_colV').style.display = "block";
	     //document.querySelector('.preview-element #motif1_colV').style.fill = "transparent";
	     
	     
	    //motif1-2
	    
	    /*if (document.querySelector('.preview-element #colV').style.display == "block") {
		    document.querySelector('.preview-element #motif' + index + '_colV').style.display = "block";
		    document.querySelector('.preview-element #motif' + index + '_colclaudine').style.display = "none";
		    document.querySelector('.preview-element #motif' + index + '_colmontant').style.display = "none";
		}
		
		if (document.querySelector('.preview-element #colclaudine').style.display == "block") {
			console.log('.preview-element #motif' + index + '_colclaudine')
		    document.querySelector('.preview-element #motif' + index + '_colclaudine').style.display = "block";
		    document.querySelector('.preview-element #motif' + index + '_colV').style.display = "none";
		    document.querySelector('.preview-element #motif' + index + '_colmontant').style.display = "none";
		}

		if (document.querySelector('.preview-element #colmontant').style.display == "block") {
			console.log("lalal")
		    document.querySelector('.preview-element #motif' + index + '_colmontant').style.display = "block";
		    document.querySelector('.preview-element #motif' + index + '_colclaudine').style.display = "none";
		    document.querySelector('.preview-element #motif' + index + '_colV').style.display = "none";
		}*/
    }
  }
}


</script>

<style scoped>

</style>


