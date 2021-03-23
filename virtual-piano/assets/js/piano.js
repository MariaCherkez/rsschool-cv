const buttons = document.getElementsByClassName('switch'); 
const keys  = document.getElementsByClassName('key'); 
let pressKey = false;
 
for (let key of keys) { 
	key.ondragstart = function() { return false; };
} 
 
document.querySelector('.fullScreen').addEventListener ('click', event => {
	if (!document.fullscreenElement) {		
		document.documentElement.requestFullscreen();
		event.target.style.background = "url('./assets/img/exit-full-screen.svg') no-repeat 50% 50%"; 
	} else {
		document.exitFullscreen();
		event.target.style.background = "url('./assets/img/full-screen.svg') no-repeat 50% 50%";
	}
});
	 
document.querySelector('.switch_container').addEventListener ('click', event => {	
	for (let button of buttons) 
		button.classList.remove('btn_active'); 
	event.target.classList.add('btn_active'); 

	let classAdd = "key_note";
	let classDelete = "key_letter";
	let isChange = !event.target.classList.contains('btn_nothing'); 
	if (isChange && event.target.classList.contains('btn_letters')) {
		classAdd = "key_letter";
		classDelete = "key_note";
	} 
	for (let key of keys) { 
		if (!isChange) {
			key.classList.remove('key_note', 'key_letter');	
		} else {
			key.classList.remove(classDelete);	
			key.classList.add(classAdd); 
		}		
	} 
});
	   
document.querySelector('.container_keys').addEventListener ('mousedown', event => {
	if (event.target.classList.contains('key')){
		pressKey = true;
		addActiveAndPlay(event.target);  
	}			
});
	 
document.querySelector('.container_keys').addEventListener ('mouseup', event => {
	if (event.target.classList.contains('key')) { 
		event.target.classList.remove('active_w', 'active_b');	 		
	}
});

document.addEventListener ('mouseup', event => {pressKey = false;});

document.querySelector('.container_keys').addEventListener ('mouseover', event => {
	if (pressKey && event.target.classList.contains('key')) {
		addActiveAndPlay(event.target); 	
	}		
});

document.querySelector('.container_keys').addEventListener ('mouseout', event => {
	if (pressKey && event.target.classList.contains('key')) { 
		event.target.classList.remove('active_w', 'active_b'); 
	}	
});
	 
window.addEventListener ('keydown', event => { 
	if (!event.repeat) {
		let elem =  document.querySelector('div[data-keycode="' + event.code + '"]'); 
		if (elem !== null) {
			addActiveAndPlay(elem); 	 
		}
	}
});

window.addEventListener ('keyup', event => { 
	let elem =  document.querySelector('div[data-keycode="' + event.code + '"]');
	if (elem !== null) {
		elem.classList.remove('active_w','active_b'); 
	} 
}); 

function addActiveAndPlay(elem) {
	if (elem.classList.contains('white_key'))
		elem.classList.add('active_w');
	if (elem.classList.contains('black_key'))
		elem.classList.add('active_b');
	(new Audio('./assets/audio/' + elem.dataset.note.replace('#', "b") + '.mp3')).play();	
}