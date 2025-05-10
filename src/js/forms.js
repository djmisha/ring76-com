/**
 * Form validation and submission handling
 */

// Add global function that can be called from main.js
window.setupContactForm = function () {
  // Initialize the contact form validation and submission
  initContactForm();
};

document.addEventListener("DOMContentLoaded", function () {
  // This will run automatically when the DOM is loaded
  // But the actual form validation setup will happen in setupContactForm
  // which is called by main.js
});

// Move all the form logic to a separate function that can be called by window.setupContactForm
function initContactForm() {
  const contactForm = document.getElementById("contact-form");
  // If no contact form exists on the page, don't proceed
  if (!contactForm) {
    return;
  }

  const formResponse = document.getElementById("form-response");
  const submitButton = document.getElementById("submit-button");

  // Get all the required form fields
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const phoneInput = document.getElementById("phone");
  const messageInput = document.getElementById("message");

  // Get all error message elements
  const nameError = document.getElementById("name-error");
  const emailError = document.getElementById("email-error");
  const phoneError = document.getElementById("phone-error");
  const messageError = document.getElementById("message-error");

  /**
   * Validation Functions
   */

  // Function to validate name
  function validateName(name) {
    if (!name.trim()) {
      return "Name is required";
    }
    return "";
  }

  // Function to validate email
  function validateEmail(email) {
    if (!email.trim()) {
      return "Email is required";
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Please enter a valid email address";
    }

    // Block .ru email addresses
    if (email.toLowerCase().endsWith(".ru")) {
      return "Sorry, emails from this domain are not accepted for security reasons";
    }

    return "";
  }

  // Function to validate phone
  function validatePhone(phone) {
    if (!phone.trim()) {
      return "Phone number is required";
    }

    // Basic phone validation (allows various formats)
    const phoneRegex = /^[0-9\-\(\)\s\+\.]+$/;
    if (!phoneRegex.test(phone)) {
      return "Please enter a valid phone number";
    }

    return "";
  }

  // Function to validate message
  function validateMessage(message) {
    if (!message.trim()) {
      return "Message is required";
    }
    return "";
  }

  /**
   * Display error or success state for an input
   */
  function displayFieldError(inputElement, errorElement, errorMessage) {
    if (errorMessage) {
      errorElement.textContent = errorMessage;
      inputElement.classList.add("error");
      return true;
    } else {
      errorElement.textContent = "";
      inputElement.classList.remove("error");
      return false;
    }
  }

  /**
   * Validate a single field and return if it has an error
   */
  function validateField(inputElement, errorElement, validationFn) {
    const value = inputElement.value;
    const errorMessage = validationFn(value);
    return displayFieldError(inputElement, errorElement, errorMessage);
  }

  /**
   * Field Validation Event Listeners
   * Only add validation on blur after the user has interacted with the form
   */

  // Add validation only after user has started filling out the form
  let formInteracted = false;

  function enableFieldValidation() {
    if (!formInteracted) {
      formInteracted = true;

      // Validate each field when it loses focus (blur event)
      if (nameInput) {
        nameInput.addEventListener("blur", function () {
          validateField(nameInput, nameError, validateName);
        });
      }

      if (emailInput) {
        emailInput.addEventListener("blur", function () {
          validateField(emailInput, emailError, validateEmail);
        });
      }

      if (phoneInput) {
        phoneInput.addEventListener("blur", function () {
          validateField(phoneInput, phoneError, validatePhone);
        });

        // Also add input event listener for immediate feedback on phone
        phoneInput.addEventListener("input", function () {
          if (phoneInput.classList.contains("error")) {
            validateField(phoneInput, phoneError, validatePhone);
          }
        });
      }

      if (messageInput) {
        messageInput.addEventListener("blur", function () {
          validateField(messageInput, messageError, validateMessage);
        });
      }
    }
  }

  // Add interaction listeners to enable validation after user starts using the form
  const formFields = [nameInput, emailInput, phoneInput, messageInput];
  formFields.forEach((field) => {
    if (field) {
      field.addEventListener("focus", enableFieldValidation);
    }
  });

  // Form Submission Handler
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Enable validation for future field interactions
    enableFieldValidation();

    // Clear previous errors
    document
      .querySelectorAll(".error-message")
      .forEach((el) => (el.textContent = ""));
    document
      .querySelectorAll("input, textarea")
      .forEach((el) => el.classList.remove("error"));

    // Validate all fields
    let hasError = false;

    // Validate name
    hasError = validateField(nameInput, nameError, validateName) || hasError;

    // Validate email
    hasError = validateField(emailInput, emailError, validateEmail) || hasError;

    // Validate phone
    hasError = validateField(phoneInput, phoneError, validatePhone) || hasError;

    // Validate message
    hasError =
      validateField(messageInput, messageError, validateMessage) || hasError;

    if (hasError) {
      return;
    }

    // Disable submit button during submission and add loading state
    submitButton.disabled = true;
    submitButton.textContent = "Sending...";
    submitButton.classList.add("submitting");

    // Collect form data
    const formData = new FormData(contactForm);

    // Send AJAX request to the secure handler
    fetch("utils/mailer/form-handler.php", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        // Re-enable submit button
        submitButton.disabled = false;
        submitButton.textContent = "Open Sesame";
        submitButton.classList.remove("submitting");

        // Show response message
        formResponse.style.display = "block";
        const responseParagraph = formResponse.querySelector("p");

        if (data.success) {
          // Success message
          formResponse.classList.add("success");
          formResponse.classList.remove("error");
          responseParagraph.textContent = data.message;

          // Reset form on success
          contactForm.reset();

          // Reset the formInteracted state since we're starting fresh
          formInteracted = false;
        } else {
          // Error message
          formResponse.classList.add("error");
          formResponse.classList.remove("success");
          responseParagraph.textContent = data.message;
        }

        // Scroll to response message
        formResponse.scrollIntoView({ behavior: "smooth", block: "nearest" });
      })
      .catch((error) => {
        // Handle network errors
        submitButton.disabled = false;
        submitButton.textContent = "Open Sesame";
        submitButton.classList.remove("submitting");

        formResponse.style.display = "block";
        formResponse.classList.add("error");
        formResponse.classList.remove("success");
        formResponse.querySelector("p").textContent =
          "Something went wrong. Please try again later.";
      });
  });
}
