const first = document.querySelector('#firstname');
const last = document.querySelector('#lastname');
const pass = document.querySelector('#userpwd');
const email = document.querySelector('#useremail');
const date = document.querySelector("#birthdate");
const user = document.querySelector("#username");
const btn = document.querySelector("#sub");

const form = document.querySelector('#signup');


function containsNumbers(str) {
  return Boolean(str.match(/\d/));;
}

const checkFirstName= () => {

    let valid = false;
    const first_ = first.value.trim();
    if (!isRequired(first_)) {
        showError(first, 'Votre prénom ne peut être vide.');
    } else if (containsNumbers(first_)) {
        showError(first, `Votre prénom ne doit pas contenir de chiffres !`);
    } else {
        showSuccess(first);
        valid = true;
    }
    return valid;
};

const checkLastName= () => {

    let valid = false;

    const last_ = last.value.trim();

    if (!isRequired(last_)) {
        showError(last, 'Votre nom ne peut être vide.');
    } else if (containsNumbers(last_)){
        showError(last, `Votre nom ne doit pas contenir de chiffres !`);
    } else {
        showSuccess(last);
        valid = true;
    }
    return valid;
};



const checkEmail = () => {
    let valid = false;
    const email_ = email.value.trim();
    if (!isRequired(email_)) {
        showError(email, 'Ne doit pas être vide');
    } else if (!isEmailValid(email_)) {
        showError(email, 'Email invalide')
    } else {
        showSuccess(email);
        valid = true;
    }
    return valid;
};
const checkDate = () =>{
    let valid = false;
/*  const regex = /^\d{2}-\d{2}-\d{4}$/;
  if (regex.test(dateString));{

  }*/
    const date_ = date.value.trim(); //Assuming DD/MM/YYYY date 
    date_format = date_.split("/");
    const d = new Date(date_format[1]+"/"+date_format[0]+"/"+date_format[2]); //reformatting to MM/DD/YYYY
    const curr = new Date();
    if(isDateValid(d) === false){
        showError(date,"La date saisie est invalide !");
    }else if (d > curr){
        showError(date, "date saisie incohérente !");
    }else if (!isLeapYear(date_format[2]) && date_format[0] === "29" && date_format[1] === "02"){
        showError(date,"Année non bissextile!");
    }else{
        showSuccess(date);
        valid = true;
    }
    return valid;
};
const checkUsrName = () =>{
    let valid = false;
    const usr_ = user.value.trim();
    if(!isRequired(usr_) || usr_.length < 6){
        showError(user, "Nom d'utilisateur incorrect !");
    }else{
        showSuccess(user);
        valid = true;
    }
    return valid;
};

const checkPass = () => {
    const re = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{12,}$");
    let valid = false;
    const pass_ = pass.value.trim();
    if(re.test(pass_) == false){
        showError(pass, "Mot de Passe incorrect !");
    }else{
        showSuccess(pass);
        valid = true;
    }
    return valid;
};

const isDateValid = (date) =>{
    return !isNaN(date);
};
const isLeapYear = (year) =>{
    return Boolean((year % 100 === 0 && year % 400 === 0) || (year  % 4 === 0));
};

const isEmailValid = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

const isRequired = value => value === '' ? false : true;

const showError = (input, message) => {
    // get the form-field element
    const formField = input.parentElement;
    // add the error class
    formField.classList.remove('success');
    formField.classList.add('error');

    // show the error message
    const error = formField.querySelector('small');
    error.textContent = message;
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
    error.textContent = ''; //validation action
     btn.disabled = false;
}


form.addEventListener('submit', function (e) {
    // prevent the form from submitting
    e.preventDefault();


    // validate forms
    let last_ = checkLastName(),
        first_ = checkFirstName(),
        email_ = checkEmail(),
        pass_ = checkPass(),
        date_ = checkDate(),
        usr_ = checkUsrName()
        isFormValid = last_ && first_ && email_ && pass_ && date_ && usr_;

    // submit to the server if the form is valid
    if (isFormValid) {
        //Sending action
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
form.addEventListener('input', debounce(function (e) {
    switch (e.target.id) {
        case 'firstname':
            checkFirstName();
            break;
         case 'lastname':
            checkLastName();
            break;
        case 'useremail':
            checkEmail();
            break;
        case "birthdate":
            checkDate();
            break;
        case 'username':
            checkUsrName();
            break;
        case 'userpwd':
            checkPass();
            break;
        default:
        break;
    }
}));