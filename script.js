const form = document.getElementById("sign-up-form");

const usernameContainer = document.getElementById("username");
const usernameInput = document.getElementById("name");
const usernameError = document.querySelector(".username-error");

const emailContainer = document.getElementById("email");
const emailInput = document.getElementById("email-input");
const emailError = document.querySelector(".error-email");

const passwordContainer = document.getElementById("password");
const passwordInput = document.getElementById("password-input");
const passwordError = document.querySelector(".error-password");

const confirmPasswordContainer = document.getElementById("confirmPassword");
const confirmPasswordInput = document.getElementById("confirmPasswordin");
const confirmPasswordError = document.querySelector(".error-con");

let usernameErrors = [];
let passwordErrors = [];
let emailErrors = [];

function validateUsername(value) {
  usernameErrors = [];  // Clear previous errors
  if (value.length === 0) {
    usernameErrors.push("Username is required");
  } else if (value.toLowerCase() === "username") {
    usernameErrors.push("Username cannot be 'username'");
  } else {
    return true;
  }
  return false;
}

function validateEmail(value) {
  emailErrors = [];  // Clear previous errors
  if (value.length === 0) {
    emailErrors.push("Email is required");
  } else if (!value.includes("@")) {
    emailErrors.push("Email must contain @");
  } else {
    return true;
  }
  return false;
}

function validatePassword(value) {
  const specialChars = "-@#$%^&*()_+={}[]:;<>,.?`~|!";
  let hasUpperCase = false;
  let hasLowerCase = false;
  let hasNumber = false;
  let hasSpecialChar = false;
  let minLength = 8;

  passwordErrors = [];


  if (value.length === 0) {
    passwordErrors.push("Password cannot be empty");
  } else if (value.length < minLength) {
    passwordErrors.push("Password must be at least " + minLength + " characters long");
  } else {
    for (let i = 0; i < value.length; i++) {
      let char = value[i];

      // Check if it's an uppercase letter (A-Z)
      if (char >= 'A' && char <= 'Z') {
        hasUpperCase = true;
      }

      // Check if it's a lowercase letter (a-z)
      if (char >= 'a' && char <= 'z') {
        hasLowerCase = true;
      }

      // Check if it's a number (0-9)
      if (char >= '0' && char <= '9') {
        hasNumber = true;
      }

      // If all conditions are met, we can stop early
      if (hasUpperCase && hasLowerCase && hasNumber) {
        break;
      }

      
      if (specialChars.includes(char)) {
        hasSpecialChar = true;
      }
    }

    if (!hasUpperCase) {
      passwordErrors.push("Password must contain at least one uppercase letter");
    }
    if (!hasLowerCase) {
      passwordErrors.push("Password must contain at least one lowercase letter");
    }
    if (!hasNumber) {
      passwordErrors.push("Password must contain at least one number");
    }
    if (!hasSpecialChar) {
      passwordErrors.push("Password must contain at least one special character");
    }

    // If no errors, return true
    if (hasUpperCase && hasLowerCase && hasNumber) {
      return true;
    }
  }
  
  return false;
}


function validateConfirmPassword(value) {
  if (value.length === 0) {
    confirmPasswordError.textContent = "Confirm password cannot be empty";
  } else if (value !== passwordInput.value) {
    confirmPasswordError.textContent = "Passwords do not match";
  } else {
    confirmPasswordError.textContent = ""; // Clear error if passwords match
    return true;
  }
  return false;
}

function handleSubmit(event) {
  event.preventDefault();

  // Validate fields
  const isValidUser = validateUsername(usernameInput.value);
  const isValidEmail = validateEmail(emailInput.value);
  const isValidPassword = validatePassword(passwordInput.value);
  const isValidConfirmPassword = validateConfirmPassword(confirmPasswordInput.value);

  if (!(isValidUser && isValidEmail && isValidPassword && isValidConfirmPassword)) {
    usernameError.textContent = usernameErrors.join(", ");
    passwordError.textContent = passwordErrors.join(", ");
    emailError.textContent = emailErrors.join(", ");
    return;
  }

  // Success: All validations passed
  console.log(
    "username: " + usernameInput.value,
    "\nemail: " + emailInput.value,
    "\npassword: " + passwordInput.value,
    "\nconfirm password: " + confirmPasswordInput.value
  );
}


form.addEventListener("submit", handleSubmit);


function showPassword() {
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    label.textContent = "Hide Password";
  } else {
    passwordInput.type = "password";
    label.textContent = "Show Password";
  }
}

const showPasswordButton = document.getElementById("show");
const label = document.getElementById("show-label");

showPasswordButton.addEventListener("click", showPassword);
