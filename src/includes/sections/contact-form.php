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
                    
                    <div class="form-group honeypot">
                        <label for="website">Website</label>
                        <input type="text" id="website" name="website" autocomplete="off">
                    </div>
                    
                    <div class="form-submit">
                        <button type="submit" class="btn" id="submit-button">Open Sesame</button>
                    </div>
                </form>
                <div id="form-response" class="form-response">
                    <p></p>
                </div>
            </div>
        </div>
    </section>

<script src="js/forms.js"></script>