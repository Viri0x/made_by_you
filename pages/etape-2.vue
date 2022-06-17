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
				 		<div v-show="isLoad" class="preview-element"  v-html="imgPreview"></div>
				 		<div v-show="isAnim" class="anim"></div>
			 		</div>
			 		<div class="preview-corner-bottom"></div>
			 	</div>
			 	
			 	<div class="preview-nav">
				 	<div><nuxt-link to="etape-1">1</nuxt-link></div>
				 	<div class="active">2</div>
				 	<div>3</div>
				 	<div>4</div>
			 	</div>
		 	</div>
		 	<div class="content-made-right etape2">
			 	
			 	<div class="infos"><div>Choisissez les différents détails que<br />vous souhaitez ajouter à votre haut :</div></div>
			 	<div class="choix cursor-pointer">
				 	
				 	<div v-show="id_etape_1 == 1">
					 	<div>
						 	<div @mouseleave='hideActiveValid($event)' @click="etapeBeforeCol_1(new Array('forme_tshirt_colV','colV'),new Array('forme_vetement','col_rond'))"><div @mouseover='displayActiveValid($event)'>Col<br />en V</div><div class="figureSVG"><img src="/upload/svg/colV.svg" @click="validAction($event);" alt="Made by you" /></div></div>
						 	<div @mouseleave='hideActiveValid($event)' @click="etapeBeforeCol_1(new Array('forme_tshirt_colclaudine','colclaudine'),new Array('forme_vetement','col_rond'))"><div @mouseover='displayActiveValid($event)'>Col<br />Claudine</div><div class="figureSVG"><img src="/upload/svg/colclaudine.svg" @click="validAction($event);" alt="Made by you" /></div></div>
						 	<div @mouseleave='hideActiveValid($event)' @click="etape(new Array('col_boutons'),new Array())"><div @mouseover='displayActiveValid($event)'>Col<br />3 boutons</div><div class="figureSVG"><img src="/upload/svg/bouton.svg" @click="validAction($event);" alt="Made by you" /></div></div>
					 	</div>
					 	
					 	<div>
						 	<div @mouseleave='hideActiveValid($event)' @click="etapeBeforeCol_1(new Array('forme_tshirt_colmontant','colmontant'),new Array('forme_vetement','col_rond'))"><div @mouseover='displayActiveValid($event)'>Col<br />montant</div><div class="figureSVG"><img src="/upload/svg/colroule.svg" @click="validAction($event);" alt="Made by you" /></div></div>
						 	<div @mouseleave='hideActiveValid($event)' @click="etapeBeforeCol_1(new Array('couture1','couture2'),new Array())"><div @mouseover='displayActiveValid($event)'>Coutures<br />manches</div><div class="figureSVG"><img src="/upload/svg/manchegauche.svg" @click="validAction($event);" alt="Made by you" /></div></div>
						 	<div @mouseleave='hideActiveValid($event)' @click="etape(new Array('poche'),new Array())"><div @mouseover='displayActiveValid($event)'>Petite<br />poches</div><div class="figureSVG"><img src="/upload/svg/petitepoche.svg" @click="validAction($event);" alt="Made by you" /></div></div>
					 	</div>
					 	
					 	<div>
						 	<div @mouseleave='hideActiveValid($event)' @click="etapeBeforeCol_1(new Array('manche_ballons1','manche_ballons2'),new Array('manche1','manche2'))"><div @mouseover='displayActiveValid($event)'>Manches<br />ballon</div><div class="figureSVG"><img src="/upload/svg/mancheballonG.svg" @click="validAction($event);" alt="Made by you" /></div></div>
						 	<div @mouseleave='hideActiveValid($event)' @click="etapeBeforeCol_1(new Array('manche_volants1','manche_volants2'),new Array('manche1','manche2'))"><div @mouseover='displayActiveValid($event)'>Manches<br />à volants</div><div class="figureSVG"><img src="/upload/svg/manchevolantG.svg" @click="validAction($event);" alt="Made by you" /></div></div>
					 	</div>
				 	</div>
				 	
				 	<div v-show="id_etape_1 == 2">
					 	<div>
						 	<div @mouseleave='hideActiveValid($event)' @click="etape(new Array('forme_debardeur_colV'),new Array())"><div @mouseover='displayActiveValid($event)'>Col<br />en V</div><div class="figureSVG"><img src="/upload/svg/colV.svg" @click="validAction($event);" alt="Made by you" /></div></div>
						 	<div @mouseleave='hideActiveValid($event)' @click="etape(new Array('col_boutons'),new Array())"><div @mouseover='displayActiveValid($event)'>Col<br />3 boutons</div><div class="figureSVG"><img src="/upload/svg/bouton.svg" @click="validAction($event);" alt="Made by you" /></div></div>
						 	<div @mouseleave='hideActiveValid($event)' @click="etape(new Array(),new Array('couture1','couture2','couture3'))"><div @mouseover='displayActiveValid($event)'>Sans<br />couture</div><div class="figureSVG"><img src="/upload/svg/sanscouture_debardeur.svg" @click="validAction($event);" alt="Made by you" /></div></div>
					 	</div>
					 	
					 	<div>
						 	<div @mouseleave='hideActiveValid($event)' @click="etape(new Array('forme_debardeur_bretelles_fines','col_fond_bretelles_fines'),new Array())"><div @mouseover='displayActiveValid($event)'>Bretelles<br />fines</div><div class="figureSVG"><img src="/upload/svg/bretellesfines.svg" @click="validAction($event);" alt="Made by you" /></div></div>
						 	<div @mouseleave='hideActiveValid($event)' @click="etape(new Array('poche'),new Array())"><div @mouseover='displayActiveValid($event)'>Petite<br />poche</div><div class="figureSVG"><img src="/upload/svg/petitepoche.svg"  @click="validAction($event);" alt="Made by you" /></div></div>
					 	</div>
				 	</div>

				 	
				 	<div v-show="id_etape_1 == 3">
					 	<div>
						 	<div @mouseleave='hideActiveValid($event)' @click="etape(new Array('col_claudine','forme_colclaudine'),new Array('col_chemise','forme_vetement'))"><div @mouseover='displayActiveValid($event)'>Col<br />Claudine</div><div class="figureSVG"><img src="/upload/svg/colclaudine.svg" @click="validAction($event);" alt="Made by you" /></div></div>
						 	<div @mouseleave='hideActiveValid($event)' @click="etapeBefore_3(new Array('manche_ballons1','manche_ballons2'),new Array('manche1','manche2','couture1','couture2'))"><div @mouseover='displayActiveValid($event)'>Manches<br />ballon</div><div class="figureSVG"><img src="/upload/svg/mancheballonG.svg" @click="validAction($event);" alt="Made by you" /></div></div>
						 	<div @mouseleave='hideActiveValid($event)' @click="etapeBefore_3(new Array('manche_volants1','manche_volants2'),new Array('manche1','manche2','couture1','couture2'))"><div @mouseover='displayActiveValid($event)'>Manches<br />à volant</div><div class="figureSVG"><img src="/upload/svg/manchevolantG.svg" @click="validAction($event);" alt="Made by you" /></div></div>
					 	</div>
					 	
					 	<div>
						 	<div @mouseleave='hideActiveValid($event)' @click="etapeBefore_3(new Array('boutons_carres'),new Array('boutons_ronds'))"><div @mouseover='displayActiveValid($event)'>Boutons<br />carré</div><div class="figureSVG"><img src="/upload/svg/boutoncarre.svg" @click="validAction($event);" alt="Made by you" /></div></div>
						 	<div @mouseleave='hideActiveValid($event)' @click="etapeBefore_3(new Array('boutons_triangles'),new Array('boutons_ronds'))"><div @mouseover='displayActiveValid($event)'>Boutons<br />triangle</div><div class="figureSVG"><img src="/upload/svg/boutontriangle.svg" @click="validAction($event);" alt="Made by you" /></div></div>
						 	<div @mouseleave='hideActiveValid($event)' @click="etape(new Array('poche'),new Array())"><div @mouseover='displayActiveValid($event)'>Petite<br />poche</div><div class="figureSVG"><img src="/upload/svg/petitepoche.svg"  @click="validAction($event);" alt="Made by you" /></div></div>
					 	</div>
					 	
					 	<div>
						 	<div @mouseleave='hideActiveValid($event)' @click="etape(new Array(),new Array('couture1','couture2','couture3'))"><div @mouseover='displayActiveValid($event)'>Sans<br />couture</div><div class="figureSVG"><img src="/upload/svg/sanscouture_chemise.svg" @click="validAction($event);" alt="Made by you" /></div></div>
					 	</div>
				 	</div>
				 	
				 	<div v-show="id_etape_1 == 4">
					 	<div>
						 	<div @mouseleave='hideActiveValid($event)' @click="etapeBeforeCol_4(new Array('colclaudine','forme_polo_colclaudine'),new Array('forme_vetement','col_polo'))"><div @mouseover='displayActiveValid($event)'>Col<br />Claudine</div><div class="figureSVG"><img @click="validAction($event);" src="/upload/svg/colclaudine.svg"  alt="Made by you" /></div></div>
						 	<div @mouseleave='hideActiveValid($event)' @click="etape(new Array('manche_ballons1','manche_ballons2'),new Array('manche1', 'manche2','couture1', 'couture2'))"><div @mouseover='displayActiveValid($event)'>Manches<br />ballon</div><div class="figureSVG"><img src="/upload/svg/mancheballonG.svg" @click="validAction($event);" alt="Made by you" /></div></div>
						 	<div @mouseleave='hideActiveValid($event)' @click="etape(new Array('poche'),new Array())"><div @mouseover='displayActiveValid($event)'>Petite<br />poche</div><div class="figureSVG"><img src="/upload/svg/petitepoche.svg"  @click="validAction($event);" alt="Made by you" /></div></div>
					 	</div>
					 	
					 	<div>
						 	<div @mouseleave='hideActiveValid($event)' @click="etapeBeforeBouton_4(new Array('boutons_carres','boutons_carrés_colclaudine'),new Array('boutons'))"><div @mouseover='displayActiveValid($event)'>Boutons<br />carré</div><div class="figureSVG"><img src="/upload/svg/boutoncarre.svg" @click="validAction($event);" alt="Made by you" /></div></div>
						 	<div @mouseleave='hideActiveValid($event)' @click="etapeBeforeBouton_4(new Array('boutons_triangle','boutons_triangle_colclaudine'),new Array('boutons'))"><div @mouseover='displayActiveValid($event)'>Boutons<br />triangle</div><div class="figureSVG"><img src="/upload/svg/boutontriangle.svg" @click="validAction($event);" alt="Made by you" /></div></div>
						 	<div @mouseleave='hideActiveValid($event)' @click="etapeBeforeCouture_4(new Array(),new Array('couture1','couture2'))"><div @mouseover='displayActiveValid($event)'>Sans<br />couture</div><div class="figureSVG"><img src="/upload/svg/sanscouture_polo.svg" @click="validAction($event);" alt="Made by you" /></div></div>
					 	</div>
				 	</div>

				</div>
				<div class="preview-nav valid" @mouseleave='hideActiveValidT'>
					<div @mouseover='displayActiveValidT'  class="type-bt"><nuxt-link to="/etape-3">Valider</nuxt-link></div>
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
	    parametres:'',
	    base_tshirt:new Array('forme_vetement','col_rond','manche1','manche2','couture3'),
	    base_debardeur:new Array('forme_vetement','couture1','couture2','couture3'),
	    base_chemise:new Array('forme_vetement','manche1','manche2','col_chemise','couture1','couture2','couture3','boutons_ronds'),
	    base_polo:new Array('forme_vetement','col_polo','manche1','manche2','couture1','couture2','boutons'),
	    
    }
  },
  mounted() {
	this.parametres = JSON.parse(localStorage.getItem('parametres') || "[]") ;
	console.log("PARAMETRES : " + this.parametres)
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
	etapeBefore_3: function(para,para_int) {
		if (para[0] == 'manche_ballons1') {
			document.querySelector('.preview-element #manche_volants1').style.display = "none";
			document.querySelector('.preview-element #manche_volants2').style.display = "none";
		}
		
		if (para[0] == 'manche_volants1') {
			document.querySelector('.preview-element #manche_ballons1').style.display = "none";
			document.querySelector('.preview-element #manche_ballons2').style.display = "none";
		}
		
		if (para[0] == 'boutons_carres') {
			document.querySelector('.preview-element #boutons_triangles').style.display = "none";
		}
		
		if (para[0] == 'boutons_triangles') {
			document.querySelector('.preview-element #boutons_carres').style.display = "none";
		}

		/*boutons_ronds_colclaudine
		boutons_carres_colclaudine
		boutons_triangles_colclaudine*/
		
		this.etape(para,para_int);
	}
	,
	etapeBeforeCol_1: function(para,para_int) {
		if (para[0] == 'forme_tshirt_colV') {
			document.querySelector('.preview-element #forme_tshirt_colclaudine').style.display = "none";
			document.querySelector('.preview-element #forme_tshirt_colmontant').style.display = "none";
		}
		
		if (para[0] == 'forme_tshirt_colclaudine') {
			document.querySelector('.preview-element #forme_tshirt_colmontant').style.display = "none";
			document.querySelector('.preview-element #forme_tshirt_colV').style.display = "none";
			document.querySelector('.preview-element #colmontant').style.display = "none";
			document.querySelector('.preview-element #colV').style.display = "none";
			
			//colV colmontant colclaudine
		}
		
		if (para[0] == 'forme_tshirt_colmontant') {
			document.querySelector('.preview-element #forme_tshirt_colclaudine').style.display = "none";
			document.querySelector('.preview-element #forme_tshirt_colV').style.display = "none";

			document.querySelector('.preview-element #colclaudine').style.display = "none";
			document.querySelector('.preview-element #colV').style.display = "none";		}
		
		if (para[0] == 'forme_tshirt_colV') {
			document.querySelector('.preview-element #forme_tshirt_colclaudine').style.display = "none";
			document.querySelector('.preview-element #forme_tshirt_colmontant').style.display = "none";
			document.querySelector('.preview-element #colmontant').style.display = "none";
			document.querySelector('.preview-element #colclaudine').style.display = "none";
		}


		if (para[0] == 'couture1') {
			
			document.querySelector('.preview-element #manche_ballons1').style.display = "none";
			document.querySelector('.preview-element #manche_ballons2').style.display = "none";
			document.querySelector('.preview-element #manche_volants1').style.display = "none";
			document.querySelector('.preview-element #manche_volants2').style.display = "none";
			
			document.querySelector('.preview-element #manche1').style.display = "block";
			document.querySelector('.preview-element #manche2').style.display = "block";
			
			
		}
		
		if (para[0] == 'manche_ballons1') {
			document.querySelector('.preview-element #couture1').style.display = "none";
			document.querySelector('.preview-element #couture2').style.display = "none";
			document.querySelector('.preview-element #manche_volants1').style.display = "none";
			document.querySelector('.preview-element #manche_volants2').style.display = "none";
		}
		
		if (para[0] == 'manche_volants1') {
			document.querySelector('.preview-element #manche_ballons1').style.display = "none";
			document.querySelector('.preview-element #manche_ballons2').style.display = "none";
			document.querySelector('.preview-element #couture1').style.display = "none";
			document.querySelector('.preview-element #couture2').style.display = "none";
		}
		
		this.etape(para,para_int);
	}
	,
	etapeBeforeCouture_4: function(para,para_int) {
			if (document.querySelector('.preview-element #manche_ballons1').style.display == "block") {
				document.querySelector('.preview-element #manche_ballons1').style.display = "none";
				document.querySelector('.preview-element #manche_ballons2').style.display = "none";
				document.querySelector('.preview-element #manche1').style.display = "block";
				document.querySelector('.preview-element #manche2').style.display = "block";
			}
			
		
		this.etape(para,para_int);
	}
	,
	etapeBeforeCol_4: function(para,para_int) {
		if (para[0] == 'colclaudine') {
			if (document.querySelector('.preview-element #boutons').style.display == "block") {
				//document.querySelector('.preview-element #boutons').style.display = "none";
				//document.querySelector('.preview-element #boutons_ronds_colclaudine').style.display = "block";
			}
			
			if (document.querySelector('.preview-element #boutons_carres').style.display == "block") {
				document.querySelector('.preview-element #boutons_carres').style.display = "none";
				document.querySelector('.preview-element #boutons_carrés_colclaudine').style.display = "block";
			}
			
			if (document.querySelector('.preview-element #boutons_triangle').style.display == "block") {
				document.querySelector('.preview-element #boutons_triangle').style.display = "none";
				document.querySelector('.preview-element #boutons_triangle_colclaudine').style.display = "block";
			}
			
		}
		
		this.etape(para,para_int);
	}
	,
	etapeBeforeBouton_4: function(para,para_int) {
		
		var new_para = new Array();
		
		if (para[0] == 'boutons_carres') {
			document.querySelector('.preview-element #boutons_triangle').style.display = "none";
			document.querySelector('.preview-element #boutons_triangle_colclaudine').style.display = "none";
			
			if (document.querySelector('.preview-element #colclaudine').style.display == "block") {
				new_para[0] = para[1];
			}
			else {
				new_para[0] = para[0];
			}
		}
		
		if (para[0] == 'boutons_triangle') {
			document.querySelector('.preview-element #boutons_carres').style.display = "none";
			document.querySelector('.preview-element #boutons_carrés_colclaudine').style.display = "none";
			
			if (document.querySelector('.preview-element #colclaudine').style.display == "block") {
				new_para[0] = para[1];
			}
			else {
				new_para[0] = para[0];
			}
		}

		/*var new_para = new Array();
		
		if (document.querySelector('.preview-element #colclaudine').style.display == "block") new_para[0] = para[1];
		else new_para[0] = para[0];
		
		para = new Array();
		para = new_para;*/
		
		this.etape(new_para,para_int);
	}
	,
	etape: function(para,para_int) {
		var paraUtil = new Array();
		var svg_el =  document.querySelector('.preview-element');
		var sens = true;
		if (para.length > 0) {
			sens = true;
			if (document.querySelector('.preview-element #' + para[0]).style.display == "block") sens = false;
		}
		else {
			sens = true;
			if (document.querySelector('.preview-element #' + para_int[0]).style.display == "none") sens = false;
		}
		
		for (var i=0;i<para.length;i++) {
			if (sens) {
				console.log("tito : " + para[i])
				document.querySelector('.preview-element #' + para[i]).style.display = "block";
			}
			else {
				document.querySelector('.preview-element #' + para[i]).style.display = "none";
			}
		}
		
		for (var i=0;i<para_int.length;i++) {
			if (sens) {
				document.querySelector('.preview-element #' + para_int[i]).style.display = "none";
			}
			else {
				document.querySelector('.preview-element #' + para_int[i]).style.display = "block";
			}
		}
		
		this.parametres.id_etape_2 = document.querySelector('.preview-element').innerHTML;
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
		document.querySelector('.preview-element').classList.add('loading');
		
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
		}
		
		setTimeout(function() {
			for (var i=0;i<initPara.length;i++) {
				var svg_el =  document.querySelector('.preview-element #' + initPara[i]).style.display = "block";
			}
			
			/*let svg = document.querySelector("svg");
			let rects = document.querySelectorAll("path");
			
			rects.forEach(rect => {
			  rect.addEventListener("mouseenter", e => {
			    svg.appendChild(rect);
			  });
			});*/

			
			
			document.querySelector('.preview-element').classList.remove('loading');
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
	clicSvg() {
		
	}
	,
	displayActiveValid(event)
	{
		console.log("ROLLL")
		var el = event.target;
		var _parent = el.parentNode
		el.parentNode.querySelector('.figureSVG').classList.add('active');
		
	}
	,
	hideActiveValid(event)
	{
		
		if (!event.target.querySelector('.figureSVG').classList.contains('valid')) event.target.querySelector('.figureSVG').classList.remove('active');
		
	}
	,
	validAction(event)
	{
		var el = event.target;
		var _parent = el.parentNode
		console.log("val = " + event.target.innerHTML)
		_parent.classList.toggle('valid');
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


