<template>
  <div class="container flex max-w-full w-full h-full p-6 md:p-0">
    
    <div class="form-login flex items-center justify-center w-full bg-mainBg">
	    
		    <div class="md:w-1/2 lg:w-96 w-full flex items-center justify-center flex-col bg-mainBg p-3 md:p-6  border border-mainColor">
			    <h1><div class="logoContainer" v-show="!isPasswordForgot"><div class="logo"><img class="img-logo" src="~/assets/img/logo.svg" alt="Nude" /></div></div><span v-show="isPasswordForgot">Forgot your password?</span></h1>
			    
			    
			    <div class="w-full">
				    <form method="post" @submit.prevent="checkSubmit">
					    
					    <div v-show="passwordForgotSend" class="text-mainColor mb-9">
					    	An email has just been sent to you with instructions to reset your password.
					    </div>

						<div>
							<div v-show="!passwordForgotSend">
							    <div v-bind:class = "(!isPasswordForgot)?'mb-6':'mb-0'">
								    <div><input placeholder="Email" name="username" id="username" v-model="username" type="email" @focus="initForm()" /></div>
							    </div>
						    
								 <div v-show="!isPasswordForgot" class="relative">
										    <div><input :type="showPassword ? 'password' : 'text'" placeholder="Password"  name="password" id="password" v-model="password" class="form-input"  type="password" @focus="initForm()" />
											    <div class="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
				
				                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="mini" @click="showPassword = !showPassword" :class="{'hidden': !showPassword, 'block':showPassword }">
									  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
									  <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
									</svg>
									
									<svg xmlns="http://www.w3.org/2000/svg" class="mini"  :class="{'block': !showPassword, 'hidden':showPassword }" @click="showPassword = !showPassword" viewBox="0 0 20 20" fill="currentColor">
									  <path fill-rule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clip-rule="evenodd" />
									  <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
									</svg>
				
				                  </div>
								    </div>
						    </div>
						    
						    <!--<div class="mb-4">
							    <label class="inline-flex items-center">
				                  <input v-model="remember_me" id="remember_me" name="remember_me" type="checkbox" value="1" />
				                  <span class="ml-2"><a href="#">Se souvenir de moi</a></span>
				                </label>
						    </div>-->
	
						    <div class="pt-6 mb-9  text-center form-action">
						    	<button type="submit"><span v-if="!isPasswordForgot">Log in</span><span v-else>Send</span></button>
						    </div>
							</div>
						     <div class="text-center cx-tools">
						    	<p @click="cxMode(true,'passwordForgot')" v-show="!isPasswordForgot">Forgot your password?</p>
						    	<p @click="cxMode(false,'login')" v-show="isPasswordForgot">Login</p>
						    </div>
						</div>
				    </form>
			    </div>
			    
		    </div>
	    
    </div>
    
    
    
    
    
                
    
  </div>
</template>

<script>
import axios from 'axios';

export default {
  layout: 'auth'
  ,
  mounted() {
  	//this.hideErreur();
  },
  data() {
    return {
	  url_server:this.$store.state.url_server,
	  showPassword:true,
	  isPasswordForgot:false,
	  submitUrl:'login',
	  username: '',
      password: '',
	  user:'',
	  id_user:'',
      username: '',
      password: '',
      passwordForgotSend:false,
    }
  },
  methods: {
	  checkSubmit: function() {
		  hideErreur();
		  disabledActions();
		  
		  if (this.isPasswordForgot) this.passwordForgot();
		  else this.login();
	  }
	  ,
	  passwordForgot: function() {	
		  axios.get(this.url_server + "/passwordForgot?username=" + this.username)
	       .then(response => {
		      this.cxMode(false,'login');
		      this.passwordForgotSend = true;
		      this.isPasswordForgot = true;
		      
		      //displayErreur(response.data.message);
		   })
	       .catch(error => {
		       enabledActions();
		       if (!error.response) {
		            displayErreur("Erreur réseau - appel API passwordForgot");
		        } else {
		            displayErreur(error.response.data.message);
		        }
	      })
    },
	  async login() {
		  
		  try {
	        await this.$auth.loginWith('local', {
	          data: {
	            username: this.username,
	            password: this.password
	          }
	        })
	        this.$router.push('/edit')
	      } catch (e) {
		      enabledActions();
		      if (!e.response) {
	            // network error
	            displayErreur("Erreur réseau - appel API login");
	        } else {
	            displayErreur(e.response.data.message);
	        }
	      }
    },
    cxMode: function(val,url)
    {
	    this.username = '';
	    this.password = '';
	    this.isPasswordForgot = val;
	    this.passwordForgotSend = false;
	    this.submitUrl = url;
	    enabledActions();
    }
    ,
    hideErreur: function()
    {
	    hideErreur();
    }
    ,
    initForm: function()
    {
	   enabledActions();
	   hideErreur();
    }
    
  }
}
</script> 

<style>

</style>
