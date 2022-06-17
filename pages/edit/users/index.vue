<template>
  <div class="container no-scrollbar">

	  	<div class="list-container edit-container">
		  	<div class="edit-container-header"><h1>Users</h1><div class="add highlight"><NuxtLink to="/edit/users/form?id_user=0"><svg class="big" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" /></svg></NuxtLink></div>
		 	</div>
		 		<!--bg-interBg-->
		 		<div class="tools">
			 		<div><input placeholder="rechercher" type="text" name="recherche" id="recherche" v-model="recherche" value="" @keyup.enter="searchFromList" /></div>
			 		<div>{{users.length}} résultat<span v-if="users.length > 1">s</span></div>
		 		</div>
               <table class="w-full">
				  <thead>
				  	<tr class="hide">
				      <th class="text-left cursor-pointer isLink" @click="sortFromList('nom')">Last name</th>
				      <th class="text-left cursor-pointer isLink" @click="sortFromList('prenom')">First name</th>
				      <th class="text-left cursor-pointer   isLink" @click="sortFromList('email')">E-mail</th>
				      <th class="w-6 text-left  isLink" @click="sortFromList('online')">&nbsp;</th>
				      <th class="w-6 text-left">&nbsp;</th>
				    </tr>
				  </thead>
				  <tbody>
					<tr v-if="!users.length"><td class="flex" ><div v-show='isShowLoading'>Loading users...</div><div class="flex" v-show='isShowNoResult'><div class="pr-1"><NuxtLink to="/edit/users/form">... </NuxtLink></div> <div class="add highlight"><NuxtLink to="/edit/users/form"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="big"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" /></svg></NuxtLink></div></div></td></tr>
				    <tr class="border-b border-mainColor isLink" :class="user.id_droit == 1 ? 'text-headerColor' : ''" v-for='(user, indexUser) in users'>
				      <td @click="getUser(user.id_user);">{{user.nom}}</td>
				      <td @click="getUser(user.id_user);">{{user.prenom}}</td>
				      <td @click="getUser(user.id_user);">{{user.email}}</td>
				      <td class="actionList" @click="onlineFromList($event,user.id_user)">
					      <span v-if="user.online==1">online</span>
					      <span v-else>draft</span>
				      </td>
				      <td class="actionList">
					      <div class="iconDelete">
					      <svg @click="deleteFromList($event,user.id_user)" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
						</svg>
					      </div>
					      <div class="deleteFromList hidden l flex justify-end  items-center"><div class="mr-1"><button class="half" @click="deleteCancelFromList($event)" type="button">Annuler</button></div><div><button class="half" @click="deleteConfirmFromList($event,user.id_user)" type="button">Confirmer</button></div></div>
						
					 </td>
					 
				    </tr>
				  </tbody>
				</table>
				
	  	</div>  

  </div>
</template>

<script>
	
	
import { mapGetters } from 'vuex';
import axios from 'axios';

export default {
   layout: 'edit',
   middleware: 'auth',
   computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser']),
  },
  data() {
    return {
	    url_server:this.$store.state.url_server,
	    table:'user',
	    isShowLoading:true,
	    isShowNoResult:false,
	    id_user: this.$auth.user.id,
		users : "",
		recherche : "",
		triMode: "ASC",
		triBy: "nom",
    }
  },
  mounted() {
	    //displayErreur("loading...");
		this.getUsers();
		
		let spans = document.querySelectorAll('button');

	    spans.forEach(el => {
	      el.addEventListener('click', this.deleteCancelFromList);
	    })
  },
  methods: {
    getUsers: function()
	 {
       axios.get(this.url_server + "/getUsers?recherche=" + this.recherche + "&triBy=" + this.triBy + "&triMode=" + this.triMode)
       .then(response => {
	       this.isShowLoading = false;
	       this.users = response.data.liste;
	       if (this.users.length == 0) this.isShowNoResult = true;
	   })
       .catch(error => displayErreur('erreur de chargement des utilisateurs'))
    },
    getUser(id_user)
	{
		this.$router.push("/edit/users/form?id_user=" + id_user); 
	},
	deleteFromList(e,id_user)
	{
		var el = e.target.closest("td");
		el.querySelector('.iconDelete').classList.add("hidden")
		el.querySelector('.deleteFromList').classList.remove("hidden")
	},
	deleteCancelFromList(e) {
		var el = e.target.closest("td");
		el.querySelector('.deleteFromList').classList.add("hidden")
		el.querySelector('.iconDelete').classList.remove("hidden")
	}
	,
	deleteConfirmFromList(e,id_user) {
		this.deleteCancelFromList(e);
		
		axios.get(this.url_server + "/delUser?id_user=" + id_user)
       .then(response => {
	       this.getUsers();
	   })
       .catch(error => displayErreur("erreur lors de la suppression de l'utilisateur"))
	},
	onlineFromList(e,id_user)
	{
		var el = e.target.closest("td");
		
		axios.get(this.url_server + "/online?table=user&libelle=id_user&id=" + id_user)
       .then(response => {
	       if (response.data.status != '') el.innerHTML = response.data.status;
	   })
       .catch(error => displayErreur("erreur lors du changement d'état de l'utilisateur"))
	}
	,
	searchFromList(e)
	{
		this.getUsers();
	}
	,
	sortFromList(val)
	{
		if (this.triMode == "ASC") this.triMode = "DESC";
		else this.triMode = "ASC";
		
		this.triBy = val;
		this.getUsers();
	}
	
	
	
  }
  
  
}


</script>


