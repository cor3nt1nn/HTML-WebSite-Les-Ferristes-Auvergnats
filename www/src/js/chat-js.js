const sendButton = document.querySelector(".send-btn"); //document.querySelector("button[id=chat-send]");
const text = document.getElementById("message");
const ch = document.getElementById("msg-container"); //document.getElementById("conversation");
const cookie = document.cookie;
const isVoid = value => value === "" ? false : true;

var index;
const debounce = (fn, delay = 100) => { //function to delay the checkup -> runnable in java
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
};
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
};

const showSuccess = (input) => {
	// get the form-field element
	const formField = input.parentElement;

	// remove the error class
	formField.classList.remove('error');
	formField.classList.add('success');

	// hide the error message
	const error = formField.querySelector('small');
	error.textContent = 'Valide'; //validation action
	sendButton.disabled = false;
}
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
if (cookie != "") {
	GETAll(); // AT FIRST CLICK ON PAGE
	sendButton.disabled = false;
	setInterval(function() { GETLast(); }, 5000); // refresh chat every 5 sec
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
}else{
	sendButton.disabled = true;
	ch.textContent = "Vous devez être connecté pour avoir accès au chat !";
	ch.style.color = 'white';
}