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
				 		<div class="anim isHidden"><video id="myVideo" autoplay muted><source src="/upload/anim/BETTERAVE.webm" type="video/webm"></video></div>
			 		</div>
			 		<div class="preview-corner-bottom"></div>
			 	</div>
			 	
			 	<div class="preview-nav">
				 	<div><nuxt-link to="etape-1">1</nuxt-link></div>
				 	<div><nuxt-link to="etape-1">2</nuxt-link></div>
				 	<div class="active">3</div>
				 	<div>4</div>
			 	</div>
		 	</div>
		 	<div class="content-made-right etape3">
			 	
			 	<div class="infos"><div>…puis sélectionnez la couleur que vous souhaitez lui attribuer :</div></div>
			 	<div class="choix cursor-pointer">

					 	<div>
						 	<div class="tito" @click="etape(1,'#fff',$event)"><img src="/upload/color/bords.svg" alt="Made by you" /> <div class="figure"><img src="/upload/color/1.svg" alt="Made by you" /></div></div>
						 	<div class="tito" @click="etape(2,'#f0846c',$event)"><img src="/upload/color/bords.svg" alt="Made by you" /> <div class="figure"><img src="/upload/color/2.svg" alt="Made by you" /></div></div>
						 	<div class="tito" @click="etape(3,'#ea7f7f',$event)"><img src="/upload/color/bords.svg" alt="Made by you" /> <div class="figure"><img src="/upload/color/3.svg" alt="Made by you" /></div></div>
						 	<div class="tito" @click="etape(4,'#ce2c2c',$event)"><img src="/upload/color/bords.svg" alt="Made by you" /> <div class="figure"><img src="/upload/color/4.svg" alt="Made by you" /></div></div>
						 	<div class="tito" @click="etape(5,'#e67c00',$event)"><img src="/upload/color/bords.svg" alt="Made by you" /> <div class="figure"><img src="/upload/color/5.svg" alt="Made by you" /></div></div>
					 	</div>
					 	
					 	<div>
						 	<div class="tito" @click="etape(6,'#fdce4e',$event)"><img src="/upload/color/bords.svg" alt="Made by you" /> <div class="figure"><img src="/upload/color/6.svg" alt="Made by you" /></div></div>
						 	<div class="tito" @click="etape(7,'#ffef74',$event)"><img src="/upload/color/bords.svg" alt="Made by you" /> <div class="figure"><img src="/upload/color/7.svg" alt="Made by you" /></div></div>
						 	<div class="tito" @click="etape(8,'#dbef45',$event)"><img src="/upload/color/bords.svg" alt="Made by you" /> <div class="figure"><img src="/upload/color/8.svg" alt="Made by you" /></div></div>
						 	<div class="tito" @click="etape(9,'#a7c30f',$event)"><img src="/upload/color/bords.svg" alt="Made by you" /> <div class="figure"><img src="/upload/color/9.svg" alt="Made by you" /></div></div>
						 	<div class="tito" @click="etape(10,'#6a9b40',$event)"><img src="/upload/color/bords.svg" alt="Made by you" /> <div class="figure"><img src="/upload/color/10.svg" alt="Made by you" /></div></div>
					 	</div>
					 	
					 	<div>
						 	<div class="tito" @click="etape(11,'#3d7e6a',$event)"><img src="/upload/color/bords.svg" alt="Made by you" /> <div class="figure"><img src="/upload/color/11.svg" alt="Made by you" /></div></div>
						 	<div class="tito" @click="etape(12,'#213279',$event)"><img src="/upload/color/bords.svg" alt="Made by you" /> <div class="figure"><img src="/upload/color/12.svg" alt="Made by you" /></div></div>
						 	<div class="tito" @click="etape(13,'#649cb1',$event)"><img src="/upload/color/bords.svg" alt="Made by you" /> <div class="figure"><img src="/upload/color/13.svg" alt="Made by you" /></div></div>
						 	<div class="tito" @click="etape(14,'#c4e3f7',$event)"><img src="/upload/color/bords.svg" alt="Made by you" /> <div class="figure"><img src="/upload/color/14.svg" alt="Made by you" /></div></div>
						 	<div class="tito" @click="etape(15,'#a32979',$event)"><img src="/upload/color/bords.svg" alt="Made by you" /> <div class="figure"><img src="/upload/color/15.svg" alt="Made by you" /></div></div>
					 	</div>
					 	
					 	<div>
						 	<div class="tito" @click="etape(16,'#8b103f',$event)"><img src="/upload/color/bords.svg" alt="Made by you" /> <div class="figure"><img src="/upload/color/16.svg" alt="Made by you" /></div></div>
						 	<div class="tito" @click="etape(17,'#503014',$event)"><img src="/upload/color/bords.svg" alt="Made by you" /> <div class="figure"><img src="/upload/color/17.svg" alt="Made by you" /></div></div>
						 	<div class="tito" @click="etape(18,'#894f15',$event)"><img src="/upload/color/bords.svg" alt="Made by you" /> <div class="figure"><img src="/upload/color/18.svg" alt="Made by you" /></div></div>
						 	<div class="tito" @click="etape(19,'#45423c',$event)"><img src="/upload/color/bords.svg" alt="Made by you" /> <div class="figure"><img src="/upload/color/19.svg" alt="Made by you" /></div></div>
						 	<div class="tito" @click="etape(20,'#000000',$event)"><img src="/upload/color/bords.svg" alt="Made by you" /> <div class="figure"><img src="/upload/color/20.svg" alt="Made by you" /></div></div>
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
	    parametres:'',
	    base_tshirt:new Array('forme_vetement','manche1','manche2','couture3'),
	    base_debardeur:new Array('forme_vetement','couture1','couture2','couture3'),
	    base_chemise:new Array('forme_vetement','manche1','manche2','col_chemise','couture1','couture2','couture3','boutons_ronds'),
	    base_polo:new Array('forme_vetement','col_polo','manche1','manche2','couture1','couture2','boutons'),
	    isSelected:false,
    }
  },
  mounted() {
	this.parametres = JSON.parse(localStorage.getItem('parametres') || "[]") ;
	this.loadEtape();
	this.getDimensions();
	//window.addEventListener('resize', this.getDimensions);
  }
  ,
  unmounted() {
    //window.removeEventListener('resize', this.getDimensions);
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
	etape: function(video,couleur,event)
	{
		var isSelected = false;
		let paths = document.getElementsByTagName('path')
		for(let i=0; i<paths.length; i++){
			if (paths[i].classList.contains('selectPath')) isSelected = true;
		}

		if (isSelected) {
			this.playVideo(video)
			this.initCouleur();
			document.querySelector('.selectPath').style.fill = couleur;
			event.target.parentNode.style.backgroundColor = couleur;
		}		
		else {
			document.querySelector('.infos > div').innerHTML = '<strong>Pour attribuer une couleur<br />sélectionner un élément</strong>'
			setTimeout(function () { document.querySelector('.infos > div').innerHTML='…puis sélectionnez la couleur que vous souhaitez lui attribuer :'; }.bind(this), 2000);
		}
		
		this.parametres.id_etape_3 = document.querySelector('.preview-element').innerHTML;
		localStorage.setItem('parametres', JSON.stringify(this.parametres));
	}
	,
	playVideo(index) {
		var vid = document.getElementById("myVideo");
		var _this = this 
		console.log("this1 : " + _this)
		vid.onended = function(_this, event) {
			console.log("this2 : " + _this)
		    _this.isAnim = false;
		    document.querySelector('.anim').classList.add('isHidden')
		};
		if (this.isAnim) {
			this.isAnim = false;
			document.querySelector('.anim').classList.add('isHidden')
			vid.pause();
			vid.currentTime = 0;
		}
		
		
		vid.src = '/upload/anim/' + index + '.webm';
		document.querySelector('.anim').classList.remove('isHidden')
		this.isAnim = true;
		vid.play();
	}
	,
	initCouleur: function() {
		let paths = document.getElementsByClassName('figure')
		for(let i=0; i<paths.length; i++){
			paths[i].style.backgroundColor = 'transparent';
		}
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
		
		document.querySelector('.preview-element').innerHTML = this.parametres.id_etape_2;
		
		
		/*document.querySelector('.preview-element').classList.add('loading');
		
		this.imgPreview = document.querySelector('#Model-' + file).innerHTML;
		var initPara = new Array();
		var svg_el =  document.querySelector('.preview-element #forme_vetement');
		
		switch(file) {
			case 'tshirt' : initPara = this.base_tshirt;
					 break;
			case 'debardeur' : initPara = this.base_debardeur;
					 break;
			case 'chemise' : initPara = this.base_chemise;
					 break;
			case 'polo' : initPara = this.base_polo;
					 break;
		}*/
		
		setTimeout(function() {
			let paths = document.getElementsByTagName('path')

			//now we can loop over the array and add an eventlistener to each path in the array
			// it listens to the 'click' event and then runs function toggleClass()
			for(let i=0; i<paths.length; i++){
				paths[i].style.fill="#fff";
				paths[i].classList.add('activePath')
			    paths[i].addEventListener('click', selectPath)
			}
			
			// In the function toggleClass we can toggle the 'clicked' class.
			function selectPath() {
				initSelectPath();
			    this.classList.toggle('selectPath')
			    console.log("cclic path")
			}
			
			function initSelectPath() {
			    for(let i=0; i<paths.length; i++){
			    	paths[i].classList.remove('selectPath')
			    }
			}
		}, 1000);
		
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


