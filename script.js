const form = document.forms['signUp'];
const formElems = form.elements;

form.setAttribute('novalidate',true);


//submit handler on the form

form.addEventListener('submit', function (event) {

    // Get the form elements
    let fields = form.elements;

    // Validate each field
    // Store the first field with an error to a variable so we can bring it into focus later
    let error, hasErrors;

    for (let i = 0, j = fields.length; i < j; i++) {
        
        error = hasError(fields[i]);
        
        if (error) {
            showError(fields[i], error);

            if (!hasErrors) {
                hasErrors = fields[i];
            }
        }
    }

    // If there are errrors, don't submit form and focus on first element with error
    if (hasErrors) {
        event.preventDefault();
        hasErrors.focus();
    }

}, false);


function hasError(field) {

    // checks to return immediate for such fields

    if (
        field.disabled || 
        field.type === 'reset' || 
        field.type === 'submit' || 
        field.type === 'button'
    ) return;

    //phonenumber validator

    if(field.type === 'tel') return isValidPhoneNumber((field));

    //text validator

    if (field.type === 'text') return isValidName(field);

    //email validator

    if (field.type === 'email') return isValidEmail(field);

    return;

}


//render error messages to DOM

function showError(field, error) {

    // Add error class to field
    field.classList.add('error');

    // Get field id or name
    var id = field.id || field.name;
    if (!id) return;

    // error message field
    var message = field.form.querySelector('.error-' + id );

    // Update error message
    message.innerHTML = error;

    // Show error message
    message.style.display = 'block';
    message.style.visibility = 'visible';

}


//remove error messages rendered to DOM

function removeError (field) {

    // Remove error class to field
    field.classList.remove('error');
    
    
    // Get field id or name
    var id = field.id || field.name;
    if (!id) return;
    
    // Check if an error message is in the DOM
    var message = field.form.querySelector('.error-' + id + '');
    if (!message) return;
    
    // If so, hide it
    message.innerHTML = '';
    message.style.display = 'none';
    message.style.visibility = 'hidden';
    
}


function isValidName(field) {


    //since lastName isnt required, 
    //trim whitespaces and return
    
    if(field.name === 'lastName') {
    
        field.value = field.value.trim();
        return;
    
    };
    

    let validity = field.validity;
    
    //Check for required field
    
    if(validity.valueMissing) return 'Required';


    //Check for minimum Characters
    
    if(validity.tooShort) return 'Atleast ' + field.getAttribute('minlength') + ' characters minimum.';
    

    //Check for maximum Characters
    
    if (validity.tooLong) return 'Must be ' + field.getAttribute('maxlength') + ' characters.';

    
    //Check for characters other than alphabets
    
    if(validity.patternMismatch) {

        field.value = '';
        return 'Only [A-Z, a-z]';
    }

}


//validate phone number field

function isValidPhoneNumber(field) {

    let value = field.value.trim();

    //regex for 10 digit

    const pattern = /^\d{10}$/;

    //post value if valid
    //post null since not a required field

    if(pattern.test(value)) {
    
        return;
    
    } else {
    
        field.value = '';
        return;
    
    }
}


//email field validate

function isValidEmail(field) {

    let validity = field.validity;
    let value = field.value.trim();

    //required field check

    if(validity.valueMissing) return 'Required';

    //regex for email 
    
    const pattern = /^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*(\.\w{2,})+$/

    //fails prompt invalid

    if (pattern.test(value)) {
      
        field.value = value;
        return;
    
    } else {

        field.value = '';
        return "Invalid Email address";
    
    }
}