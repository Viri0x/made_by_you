var getFolderLevel = function(data, id){
	var resultat = '';
	for (const prop in data) {
		console.log("prop : " + data[prop].id)
		if (data[prop].id == id) return data[prop].files;
		else {
			var level_2 = data[prop].files
			for (const prop_2 in level_2) {
				console.log("prop_2 : " + level_2[prop_2].id)
				if (level_2[prop_2].id == id) return level_2[prop_2].files;
			}
		}
		
    // `prop` contains the name of each property, i.e. `'code'` or `'items'`
    // consequently, `data[prop]` refers to the value of each property, i.e.
    // either `42` or the array
	}
	
	return '';
}

var selectedElement, offset;
function getMousePosition(evt) {
  var CTM = document.querySelector('#Calque_2').getScreenCTM();
  return {
    x: (evt.clientX - CTM.e) / CTM.a,
    y: (evt.clientY - CTM.f) / CTM.d
  };
}

function makeDraggable(evt) {
	console.log("ICICI - makeDraggable")
  var svg = evt.target;
  svg.addEventListener('mousedown', startDrag);
  svg.addEventListener('mousemove', drag);
  svg.addEventListener('mouseup', endDrag);
  svg.addEventListener('mouseleave', endDrag);
  function startDrag(evt) {
	  console.log("ICICI")
  if (evt.target.classList.contains('draggable')) {
	  console.log("alalalla")
    selectedElement = evt.target;
    offset = getMousePosition(evt);
    offset.x -= parseFloat(selectedElement.getAttributeNS(null, "x"));
    offset.y -= parseFloat(selectedElement.getAttributeNS(null, "y"));
  }
}
  function drag(evt) {
  if (selectedElement) {
    evt.preventDefault();
    var coord = getMousePosition(evt);
    selectedElement.setAttributeNS(null, "x", coord.x - offset.x);
    selectedElement.setAttributeNS(null, "y", coord.y - offset.y);
  }
}
  function endDrag(evt) {
  selectedElement = null;
}
}

function testClick1()
{
	console.log("icic")
}

function displayErreur(erreur) {
	var box = document.getElementsByClassName("alertBox")[0];
	var message = document.getElementsByClassName("mes")[0];
	
	message.innerHTML = erreur;
	box.classList.remove('translate-y-full');
	
}

function ISdisplayErreur() {
	var box = document.getElementsByClassName("alertBox")[0];
	var message = document.getElementsByClassName("mes")[0];
	
	if (!box.classList.contains('hidden')) return true;
	else return false;
}

function hideErreur() {
	var box = document.getElementsByClassName("alertBox")[0];
	var message = document.getElementsByClassName("mes")[0];
	
	message.innerHTML = '';
	box.classList.add('translate-y-full');
}

function clearRequired()
{
	var elems = document.querySelectorAll(".required_field");
	[].forEach.call(elems, function(el) {
	    el.classList.remove("required");
	});
}

function checkRequired()
{
	var erreur = false;
	
	var elems = document.querySelectorAll(".required_field");
	[].forEach.call(elems, function(el) {
	    if (el.classList.contains("required")) erreur = true;
	});

	return erreur;
}

function disabledActions()
{
	var formAction = document.getElementsByClassName("form-action")[0];
	formAction.classList.add('animate-onWait');
	
	var elems = document.querySelectorAll(".form-action button");
	[].forEach.call(elems, function(el) {
		el.classList.add("cursornotallowed");
			el.disabled = true;
	    
	});
	 
}

function enabledActions()
{
	var formAction = document.getElementsByClassName("form-action")[0];
	formAction.classList.remove('animate-onWait');
	
	var elems = document.querySelectorAll(".form-action button");
	[].forEach.call(elems, function(el) {
		el.classList.remove("cursornotallowed");
			el.disabled = false;
	    
	});
	 
}


function clearRequiredModal()
{
	var elems = document.querySelectorAll(".modalZone .required_field");
	[].forEach.call(elems, function(el) {
	    el.classList.remove("required");
	});
}

function checkRequiredModal()
{
	var erreur = false;
	
	var elems = document.querySelectorAll(".modalZone .required");
	[].forEach.call(elems, function(el) {
		console.log("ISREQUIRED")
	    if (el.classList.contains("required")) erreur = true;
	});

	return erreur;
}

function disabledActionsModal()
{
	var formAction = document.querySelectorAll(".modalZone .form-action")[0];
	formAction.classList.add('animate-onWait');
	
	var elems = document.querySelectorAll(".modalZone .form-action button");
	[].forEach.call(elems, function(el) {
		el.classList.add("cursornotallowed");
			el.disabled = true;
	    
	});
	 
}

function enabledActionsModal()
{
	var formAction = document.querySelectorAll(".modalZone .form-action")[0];
	formAction.classList.remove('animate-onWait');
	
	var elems = document.querySelectorAll(".modalZone .form-action button");
	[].forEach.call(elems, function(el) {
		el.classList.remove("cursornotallowed");
			el.disabled = false;
	    
	});
	 
}



function clearRequiredModal2()
{
	var elems = document.querySelectorAll(".modalZone2 .required_field");
	[].forEach.call(elems, function(el) {
	    el.classList.remove("required");
	});
}

function checkRequiredModal2()
{
	var erreur = false;
	
	var elems = document.querySelectorAll(".modalZone2 .required");
	[].forEach.call(elems, function(el) {
		console.log("ISREQUIRED")
	    if (el.classList.contains("required")) erreur = true;
	});

	return erreur;
}

function disabledActionsModal2()
{
	var formAction = document.querySelectorAll(".modalZone2 .form-action")[0];
	formAction.classList.add('animate-onWait');
	
	var elems = document.querySelectorAll(".modalZone2 .form-action button");
	[].forEach.call(elems, function(el) {
		el.classList.add("cursornotallowed");
			el.disabled = true;
	    
	});
	 
}

function enabledActionsModal2()
{
	var formAction = document.querySelectorAll(".modalZone2 .form-action")[0];
	formAction.classList.remove('animate-onWait');
	
	var elems = document.querySelectorAll(".modalZone2 .form-action button");
	[].forEach.call(elems, function(el) {
		el.classList.remove("cursornotallowed");
			el.disabled = false;
	    
	});
	 
}

function bytesToSize(bytes) {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  if (bytes === 0) return 'n/a'
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10)
  if (i === 0) return `${bytes} ${sizes[i]})`
  return `${(bytes / (1024 ** i)).toFixed(1)} ${sizes[i]}`
}

function slugify(string) {
  const a = 'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìıİłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;'
  const b = 'aaaaaaaaaacccddeeeeeeeegghiiiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------'
  const p = new RegExp(a.split('').join('|'), 'g')

  return string.toString().toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/[^\w\-]+/g, '') // Remove all non-word characters
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, '') // Trim - from end of text
}

