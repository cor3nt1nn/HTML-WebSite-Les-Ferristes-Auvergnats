const pass = document.querySelector('#userpwd');
const user = document.querySelector("#username");
const btn = document.querySelector("#sub");
const form = document.getElementById("login");
const submitter = document.querySelector("button[id=sub]");
const errorMsg = document.querySelector("small[id=error-msg]");
const isRequired = value => value === '' ? false : true;
let isLogged = false;
const checkUsrName = () => {
	let valid = false;
	const usr_ = user.value.trim();
	if (!isRequired(usr_) || usr_.length < 6) {
		showError(user, "Nom d'utilisateur incorrect !");
	} else {
		showSuccess(user);
		valid = true;
	}
	return valid;
};

const checkPass = () => {
	const re = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{12,}$");
	let valid = false;
	const pass_ = pass.value.trim();
	if (re.test(pass_) == false) {
		showError(pass, "Mot de passe ne repectant pas les conventions");
	} else {
		showSuccess(pass);
		valid = true;
	}
	return valid;
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
	error.style.color = "red";
	btn.disabled = true;
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
	error.style.color = "#66ff00";
	btn.disabled = false;
}


form.addEventListener('submit', function(e) {

	// validate forms
	let pass_ = checkPass(),
		usr_ = checkUsrName();
	isFormValid = pass_ && usr_;
	const xhr = new XMLHttpRequest();
	// submit to the server if the form is valid
	if (!isFormValid) {
		// prevent the form from submitting
		e.preventDefault();
	} else {
		//if succeeded let use XHR
		const f = new FormData(form, submitter);
		xhr.open("post", "/htbin/login.py", false); // [false, usr_, pass_])
		xhr.send(f);

		if (xhr.responseText.startsWith("Bonjour")) {
			document.cookie = "name=" + usr_ + "; online=true;SameSite=None; secure=true; expires=0; path=/";
			alert("Successfully logged !");
			isLogged = true;
		} else alert("Credentials error");//showError(errorMsg, "Erreur dans les identifiants");

	}
	//----------------------------------------- CATCH ERROR FROM CONNECTION 
	xhr.onload = function() {
		if (xhr.status != 200) {
			showError(`Error ${xhr.status}: ${xhr.statusText}`);
		} else {
			showSuccess(`Done, got ${xhr.response.length} bytes`);
		};
	}
});

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
form.addEventListener('input', debounce(function(e) {
	switch (e.target.id) {
		case 'username2':
			checkUsrName();
			break;
		case 'userpwd2':
			checkPass();
			break;
		default:
			break;
	}
}));


