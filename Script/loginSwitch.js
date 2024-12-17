const loginTab = document.getElementById('login-tab');
const signupTab = document.getElementById('signup-tab');
const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');

// Add click event to toggle tabs
loginTab.addEventListener('click', () => {
  loginTab.classList.add('active');
  signupTab.classList.remove('active');
  loginForm.classList.add('active');
  signupForm.classList.remove('active');
});

signupTab.addEventListener('click', () => {
  signupTab.classList.add('active');
  loginTab.classList.remove('active');
  signupForm.classList.add('active');
  loginForm.classList.remove('active');
});
function clearErrors(){

  errors = document.getElementsByClassName('formerror');
  for(let item of errors)
  {
      item.innerHTML = "";
  }


}

function seterror(field, error) {
  document.querySelector(`[name="${field}"] + .formerror`).textContent = error;
}


const validationLogin = () => {
  let valid = true;
  clearErrors();
  const email = document.forms['loginForm']['email'].value;
  const password = document.forms['loginForm']['password'].value;

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    seterror('email', '*Invalid email format');
    valid = false;
  }

  // Validate Password Strength
  if (password.length < 6) {
    seterror('password', '*Password must be at least 6 characters');
    valid = false;
  }

  return valid;

}

const validateSignup = () => {
  let valid = true;
  clearErrors();

  const firstName = document.forms['signupForm']['firstName'].value;
  const email = document.forms['signupForm']['email'].value;
  const password = document.forms['signupForm']['password'].value;

  // Validate First Name
  if (!/^[a-zA-Z\s]+$/.test(firstName)) {
    seterror('firstName', '*First name must only contain letters');
    valid = false;
  }

  // Validate Email
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    seterror('email', '*Invalid email format');
    valid = false;
  }

  // Validate Password Strength
  if (password.length < 6) {
    seterror('password', '*Password must be at least 6 characters');
    valid = false;
  }

  return valid;
};
