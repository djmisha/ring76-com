<section id="contact" class="contact-section">
        <div class="container">
            <h2>Join Our Club</h2>
            <p class="section-intro">Ready to begin your magical journey? Fill out the form below to connect with Ring 76.</p>
            
            <div class="form-container">
                <form id="contact-form" class="contact-form" method="post" novalidate>
                    <div class="form-group">
                        <label for="name">Name</label>
                        <input type="text" id="name" name="name" placeholder="Your name" required>
                        <span class="error-message" id="name-error"></span>
                    </div>
                    
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="email" id="email" name="email" placeholder="Your email address" required>
                        <span class="error-message" id="email-error"></span>
                    </div>
                    
                    <div class="form-group">
                        <label for="phone">Phone</label>
                        <input type="tel" id="phone" name="phone" placeholder="Your phone number" required>
                        <span class="error-message" id="phone-error"></span>
                    </div>
                    
                    <div class="form-group">
                        <label for="message">How can we help you?</label>
                        <textarea id="message" name="message" placeholder="Tell us about your interests in magic" rows="4" required></textarea>
                        <span class="error-message" id="message-error"></span>
                    </div>
                    
                    <div class="form-group" style="display:none;">
                        <label for="website">Website</label>
                        <input type="text" id="website" name="website" autocomplete="off">
                    </div>
                    
                    <div class="form-submit">
                        <button type="submit" class="btn" id="submit-button">Open Sesame</button>
                    </div>
                </form>
                <div id="form-response" class="form-response" style="display:none;">
                    <p></p>
                </div>
            </div>
        </div>
    </section>

<script>
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    const formResponse = document.getElementById('form-response');
    const submitButton = document.getElementById('submit-button');
    const emailInput = document.getElementById('email');
    const emailError = document.getElementById('email-error');
    const phoneInput = document.getElementById('phone');
    const phoneError = document.getElementById('phone-error');
    
    // Function to validate email
    function validateEmail(email) {
        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return "Please enter a valid email address";
        }
        
        // Block .ru email addresses
        if (email.toLowerCase().endsWith('.ru')) {
            return "Sorry, emails from this domain are not accepted for security reasons";
        }
        
        return ""; // Empty string means no error
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
    
    // Validate email on input
    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            const error = validateEmail(emailInput.value);
            emailError.textContent = error;
            if (error) {
                emailInput.classList.add('error');
            } else {
                emailInput.classList.remove('error');
            }
        });
    }
    
    // Validate phone on input
    if (phoneInput) {
        phoneInput.addEventListener('blur', function() {
            const error = validatePhone(phoneInput.value);
            phoneError.textContent = error;
            if (error) {
                phoneInput.classList.add('error');
            } else {
                phoneInput.classList.remove('error');
            }
        });
    }
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Clear previous errors
            document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
            
            // Validate email
            const email = emailInput.value;
            const emailErrorMsg = validateEmail(email);
            let hasError = false;
            
            if (emailErrorMsg) {
                emailError.textContent = emailErrorMsg;
                emailInput.classList.add('error');
                hasError = true;
            }
            
            // Validate phone
            const phone = phoneInput.value;
            const phoneErrorMsg = validatePhone(phone);
            
            if (phoneErrorMsg) {
                phoneError.textContent = phoneErrorMsg;
                phoneInput.classList.add('error');
                hasError = true;
            }
            
            if (hasError) {
                return;
            }
            
            // Disable submit button during submission
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';
            
            // Collect form data
            const formData = new FormData(contactForm);
            
            // Send AJAX request to the secure handler instead of directly to send-mail.php
            fetch('utils/mailer/form-handler.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                // Re-enable submit button
                submitButton.disabled = false;
                submitButton.textContent = 'Submit Application';
                
                // Show response message
                formResponse.style.display = 'block';
                const responseParagraph = formResponse.querySelector('p');
                
                if (data.success) {
                    // Success message
                    formResponse.classList.add('success');
                    formResponse.classList.remove('error');
                    responseParagraph.textContent = data.message;
                    
                    // Reset form on success
                    contactForm.reset();
                } else {
                    // Error message
                    formResponse.classList.add('error');
                    formResponse.classList.remove('success');
                    responseParagraph.textContent = data.message;
                }
                
                // Scroll to response message
                formResponse.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            })
            .catch(error => {
                // Handle network errors
                submitButton.disabled = false;
                submitButton.textContent = 'Submit Application';
                
                formResponse.style.display = 'block';
                formResponse.classList.add('error');
                formResponse.classList.remove('success');
                formResponse.querySelector('p').textContent = 'Something went wrong. Please try again later.';
            });
        });
    }
});
</script>