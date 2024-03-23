const sendButton = document.querySelector(".send-btn"); //document.querySelector("button[id=chat-send]");
const text = document.getElementById("message");
const ch = document.getElementById("msg-container"); //document.getElementById("conversation");
/*
const showError = (input, message) => {
	// get the form-field element
	const formField = input.parentElement;
	// add the error class
	formField.classList.remove('success');
	formField.classList.add('error');

	// show the error message
	const error = formField.querySelector('small');
	error.textContent = message;
	sendButton.disabled = true;
};*/

/*const showSuccess = (input, message) => {
	// get the form-field element
	const formField = input.parentElement;

	// remove the error class
	formField.classList.remove('error');
	formField.classList.add('success');

	// hide the error message
	const error = formField.querySelector('small');
	error.textContent = message; //validation action
	sendButton.disabled = false;
}*/




const isVoid = value => value === "" ? false : true;

/*const debounce = (fn, delay = 100) => { //function to delay the checkup -> runnable in java
	let timeoutId;
	return (...args) => {
		// cancel the previous timer
		if (timeoutId) {
			clearTimeout(timeoutId);
		}
		// setup a new timer
		timeoutId = setTimeout(() => {
			fn.apply(null, args)
		}, delay);
	};
};*/
var index;
function GETAll() {
	$.getJSON("/htbin/chatget.py")
		.done(function(data) {
			var str = JSON.stringify(data, null);
			var array = str.slice(1, str.length - 1).replaceAll("},", "}|").split("|");
			index = array.length;
			for (let i = 0; i < index; i++) {
				var newNode = document.createElement('p');
				var info = JSON.parse(array[i]);
				var msg = "[" + info["date"] + "-" + info["time"] + "]: " + info["user"] + " > " + info["msg"];
				newNode.innerHTML = msg;
				ch.appendChild(newNode);
			}
		});
}
function GETLast() {
	$.getJSON("/htbin/chatget.py")
		.done(function(data) {
			var str = JSON.stringify(data, null);
			array = str.slice(1, str.length - 1).replaceAll("},", "}|").split("|");
			i = (array.length - index == 1) ? (i = index + 1) : (i = array.length - index);
			var rNode = document.createElement('p');
			rNode.innerHTML = "AUTO REFRESH";
			ch.appendChild(rNode);
			for (let y = index; y < i; y++) {
				var newNode = document.createElement('p');
				var info = JSON.parse(array[y]);
				var msg = "[" + info["date"] + "-" + info["time"] + "]: " + info["user"] + " > " + info["msg"];
				newNode.innerHTML = msg;
				ch.appendChild(newNode);

			} index = array.length;
		});

}
GETAll(); // AT FIRST LOGIN

setInterval(function() { GETLast(); }, 30000); // refresh chat every 30 sec
text.addEventListener("input", debounce(function() {
	if (isVoid(text.value) == false) {
		showError(text, "Erreur texte vide");
		return false;
	} else {
		showSuccess(text, "Message Valide");
	}
}));
sendButton.addEventListener("click", function() {
	if (isVoid(text.value) == false) {
		showError(text, "Erreur texte vide");
		return false;
	}
	$.post("/htbin/chatsend.py", { msg: text.value });

	text.value = "";
	showSuccess(text, "Message Envoyé");
	GETLast();

});
