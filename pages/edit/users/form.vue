<template>
  <div class="container">
	  	<div class="list-container edit-container edit-form">
		  	<div class="edit-container-header"><h1>User</h1><div class="add"><NuxtLink to="/edit/users"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
</svg></NuxtLink></div>
		  	</div>
		  	
		 	<div class="form-container">
                <form method="post" autocomplete="off" @submit.prevent="submit">
                <div class="form-bloc">
		                <div class="col w-full">
			                <div class="col-content row items-center">
				                <div class="relative  inline-block w-9 mr-2 align-middle select-none transition duration-200 ease-in">
    <input type="checkbox" v-model="id_droit" name="id_droit" id="id_droit" value="1" class="toggle-checkbox" />
    <label for="id_droit" class="toggle-label"></label>
</div>
			                	<label for="id_droit" id="Lid_droit">Admin</label>
			                </div>
			                
		                </div>
                </div>
                <div class="form-bloc" v-show="id_user != 0">
		                <div class="col w-full">
			                <div class="col-content row items-top">
				                <div class="relative  inline-block w-9 mr-2 align-middle select-none transition duration-200 ease-in">
    <input @click="sendInvitation" type="checkbox" v-model="invitation" name="invitation" id="invitation" value="1" class="toggle-checkbox" />
    <label for="invitation" class="toggle-label"></label>
</div>
								<div>
			                	<label for="invitation" id="Linvitation"><span v-show='!isSendInvitation'>Send an invitation</span><span v-show='isSendInvitation'>Sending the invitation in progress...</span> </label>
			                	<div class="block">Invitation sent: {{nb_invitation}}</div>
								</div>
			                </div>
		                </div>
                </div>
                <div class="form-bloc">
	                <div class="col w-full">
		                <div class="col-content">
			                <label for="nom" id="Lnom">Last Name</label>
			                <input @focus="initForm" class="required_field" type="text" v-model="nom" name="nom" id="nom" value="" />
		                </div>
	                </div>
                </div>
                <div class="form-bloc">
		             <div class="col w-full">   
		                <div class="col-content">
			                <label for="prenom" id="Lprenom">First name</label>
			                <input @focus="initForm" type="text" v-model="prenom" name="prenom" id="prenom" value="" />
		                </div>
		             </div> 
                </div>
                <div class="form-bloc">
		             <div class="col w-full">
		                <div class="col-content">
			                <label for="email" id="Lemail">E-mail</label>
			                <input @focus="initForm" class="required_field" type="email" v-model="email" name="email" id="email" value="" />
		                </div>
	                </div>
                </div>

                <div class="form-action">
	                <div><button @click="cancelForm(url_list)" type="button">Cancel</button></div>
	                <div><button type="submit">Save</button></div>
                </div>
                </form>
		 	</div>
				
	  	</div>  
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import axios from 'axios';
import moment from 'moment';

export default {
  layout: 'edit',
  middleware: 'auth',
  components: {
  },
  created() {
	 if (typeof this.$route.query.id_user === 'undefined') {
		 this.id_user = 0;
	 }
	 else  this.id_user = this.$route.query.id_user;
  }
  ,
   computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser']),
  },
  mounted() {
		if (this.id_user > 0) this.getUser();
		
		//this.getVille('saints');
  },
  data() {
    return {
	url_server:this.$store.state.url_server,
    attributes: [
      // This is a single attribute
      {
       
      }
    ],
	  id_user_app: this.$auth.user.id,
	  user_app: this.$auth.user.username,
	  url_list: '/edit/users',
	  id_user: 0,
      nom: '',
      prenom:'',
      email:'',
      id_droit: 0,
      invitation:0,
      nb_invitation:0,
      isSendInvitation:false,
	  user:[],
    }
  },
  methods: {
	getUser: function()
	 {
       axios.get(this.url_server + "/getUser?id_user=" + this.id_user)
       .then(response => {
	       this.user = response.data.liste;

	       this.nom = this.user.nom;
	       this.prenom = this.user.prenom;
	       this.email = this.user.email;
	       this.id_droit = this.user.id_droit;
	       this.nb_invitation = this.user.invitation;


	   })
       .catch(error => {
	       this.id_user = 0;
		   displayErreur("erreur de chargement de l'utilisateur")
      })
    },
    submit() {
	   clearRequired();
	   this.hideErreur();
	   var date_depart = moment(this.date_depart).format('YYYY-MM-DD, h:mm:ss');
	   var date_retour = moment(this.date_retour).format('YYYY-MM-DD, h:mm:ss');
	   
	   
	   
	   let data = {
		id_user: this.id_user,
		nom: this.nom,
        prenom: this.prenom,
        email: this.email,
        id_droit: this.id_droit,
      };

      var elems = document.querySelectorAll(".required_field");
	  [].forEach.call(elems, function(el) {
		    if ((el.value == '')) el.classList.add("required");
		});
		
		if(checkRequired()) {
			displayErreur("The fields indicated are required");
		}
		else {
			disabledActions();
			const timeoutObj = setTimeout(() => {
			  axios.post(this.url_server + "/addUser", data)
			   .then(response => {
				   this.id_user = response.data.id_user;
				    this.$router.push('/edit/users');
			   }
			   )
			   .catch(response => {
				  enabledActions();
				  displayErreur("Erreur lors de l'ajout d'un utilisateur")
			   }
			   )
			}, 1000);
			
		}
       
    }
    ,
    sendInvitation: function()
    {
	    if (!this.invitation) {
		   document.getElementById("invitation").disabled = true;
		   this.isSendInvitation = true;
		   
		   const timeoutObj = setTimeout(() => { 
			   axios.get(this.url_server + "/invitationUser?id_user=" + this.id_user + "&name_from=" + this.user_app)
		    
		       .then(response => {
			       document.getElementById("invitation").disabled = false;
				   this.invitation = 0;
				   this.nb_invitation = response.data.nb_invitation;
				   this.isSendInvitation = false;
				   displayErreur("The invitation has been sent")
		
		
			   })
		       .catch(error => {
				   displayErreur("erreur lors de l'envoi de l'invitation");
				    document.getElementById("invitation").disabled = false;
				   this.invitation = 0;
				   this.isSendInvitation = false;
		      })
			  
		   }, 1500); 
	    }
    }
    ,
    hideErreur: function()
    {
	    hideErreur();
    }
    ,
    cancelForm: function(url)
    {
	    this.$router.push(url);
    }
    ,
    initForm: function(event)
    {
	   if (event.target.classList.contains("required")) event.target.classList.remove("required");
	   enabledActions();
	   hideErreur();
    }
  }
}
</script>


