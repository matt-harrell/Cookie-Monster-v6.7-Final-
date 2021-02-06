window.addEventListener('keyup', doKeyPress, false); //add the keyboard handler

let trigger_key = 71; // g key
function doKeyPress(e) {
	if (e.keyCode === trigger_key) {

				chrome.runtime.sendMessage({greeting: "hello"});

	}
}
// https://gist.github.com/SathyaBhat/894012
