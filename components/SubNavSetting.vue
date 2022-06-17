<template>
 	<div class="menuTab">
	    <ul>
	        <li class="menuTab-main">
		        <ul>
			        <li class="mr-6">
			            <NuxtLink exact class="nav-link" :to="{ path: '/edit/settings/'}">Settings</NuxtLink>
			        </li>
			        <!--<li>
			        	<NuxtLink exact class="nav-link" :to="{ path: '/edit/settings/css'}">Css</NuxtLink>
			        </li>-->
		        </ul>
	        </li>
	    </ul>
	</div>
</template>

<script>
export default {
  name: 'sub-nav-setting',
  data: function () {
    	return {

    	}
  	},
	props: {

  }
}
</script>