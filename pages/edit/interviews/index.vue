<template>
  <div class="container no-scrollbar edit-form-nav">
	  	<div class="list-container edit-container w-full">
		  	<div class="edit-container-header"><h1>Interviews</h1><div class="add highlight"><NuxtLink :to="{ path: url_add}"><svg class="big" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" /></svg></NuxtLink></div>
		 	</div>
		 		<div class="tools">
			 		<div><input placeholder="search" type="text" name="recherche" id="recherche" v-model="recherche" value="" @keyup.enter="searchFromList" /></div>
			 		<div>{{interviews.length}} result<span v-if="interviews.length > 1">s</span></div>
		 		</div>
               <table class="w-full">
				  <thead>
				  	<tr class="hide">
					  	<th class="w-28 text-left cursor-pointer isLink">&nbsp;</th>
				      <th class="text-left cursor-pointer isLink" @click="sortFromList('titre')">Title</th>
				      <th class="w-6 text-left isLink" @click="sortFromList('online')">&nbsp;</th>
				      <th class="w-6 text-left">&nbsp;</th>
				    </tr>
				    <tr v-if="!interviews.length"><td class="flex" colspan="4"><div v-show='isShowLoading'>Chargement des interviews...</div><div class="flex" v-show='isShowNoResult'><div class="pr-1 flex items-center"><NuxtLink :to="{ path: url_add}">aucun résultat, ajouter un interview </NuxtLink></div> <div class="add highlight"><NuxtLink :to="{ path: url_add}"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="big"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" /></svg></NuxtLink></div></div></td></tr>
				  </thead>
					<draggable  :list="interviews" tag="tbody" @end="onEndPosition">
					    <tr class="border-b border-mainColor isLink"  v-for='(interview, indexInterview) in interviews'>
						  <td @click="getInterview(interview.id_interview);"><img v-if="interview.visuel != ''" :src="'/upload/' + interview.visuel.replace('file-','file-s-')" :alt="interview.titre"></td>
					      <td @click="getInterview(interview.id_interview);">{{interview.titre}}</td>
					      <td class="actionList" @click="onlineFromList($event,interview.id_interview)">
						      <span v-if="interview.online==1">online</span>
						      <span v-else>draft</span>
					      </td>
					      <td class="actionList">
						      <div class="iconDelete">
						      <svg @click="deleteFromList($event,interview.id_interview)" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
							</svg>
						      </div>
						      <div class="deleteFromList hidden l flex justify-end  items-center"><div class="mr-1"><button class="half" @click="deleteCancelFromList($event)" type="button">Cancel</button></div><div><button class="half" @click="deleteConfirmFromList($event,interview.id_interview)" type="button">Confirm</button></div></div>
							
						 </td>
					    </tr>
				    </draggable>
				</table>
				
	  	</div>  
	  	
	  	

  </div>
</template>

<script>
	
	
import { mapGetters } from 'vuex';
import axios from 'axios';
import draggable from 'vuedraggable'

export default {
   layout: 'edit',
   middleware: 'auth',
   computed: {
    ...mapGetters(['isAuthenticated', 'loggedInfont']),
  },
  components: {
	  draggable
  },
  created() {

  },
  data() {
    return {
	    url_server:this.$store.state.url_server,
	    url_back: '',
	    table:'interview',
	    isShowLoading:true,
	    isShowNoResult:false,
	    id_user: this.$auth.user.id,
		interviews : [],
		recherche : "",
		triMode: "ASC",
		triBy: "titre",
		url_add: '/edit/interviews/form?id_interview=0',
    }
  },
  mounted() {
	    this.getInterviews();
		
		let spans = document.querySelectorAll('button');

	    spans.forEach(el => {
	      el.addEventListener('click', this.deleteCancelFromList);
	    })
  },	
  methods: {
    getInterviews: function()
	 {
       axios.get(this.url_server + "/getInterviews?recherche=" + this.recherche + "&triBy=" + this.triBy + "&triMode=" + this.triMode)
       .then(response => {
	       this.isShowLoading = false;
	       this.interviews = response.data.liste;
	       if (this.interviews.length == 0) this.isShowNoResult = true;
	   })
       .catch(error => displayErreur('error loading interviews'))
    },
    getInterview(id_interview)
	{
		this.$router.push("/edit/interviews/form?id_interview=" + id_interview); 
	},
	deleteFromList(e,id_interview)
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
	deleteConfirmFromList(e,id_interview) {
		this.deleteCancelFromList(e);
		
		axios.get(this.url_server + "/delInterview?id_interview=" + id_interview)
       .then(response => {
	       this.getInterviews();
	   })
       .catch(error => displayErreur("error deleting interview"))
	},
	onlineFromList(e,id_interview)
	{
		var el = e.target.closest("td");
		
		axios.get(this.url_server + "/online?table=interview&libelle=id_interview&id=" + id_interview)
       .then(response => {
	       if (response.data.status != '') el.innerHTML = response.data.status;
	   })
       .catch(error => displayErreur("error changing interview state"))
	}
	,
	searchFromList(e)
	{
		this.getInterviews();
	}
	,
	sortFromList(val)
	{
		if (this.triMode == "ASC") this.triMode = "DESC";
		else this.triMode = "ASC";
		
		this.triBy = val;
		this.getInterviews();
	}
	,
	onEndPosition()
	{
		let data = {
			list: this.interviews,
	      };
		 axios.post(this.url_server + "/updateInterviewPosition", data)
	       .then(response => {
		       
		   })
	       .catch(error => displayErreur("error changing interview position"))
	}
	
	
	
  }
  
  
}


</script>


