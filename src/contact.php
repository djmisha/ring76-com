<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact & Join Ring 76 | San Diego Magic Club</title>
    <meta name="description" content="Connect with Ring 76, San Diego's premier magic club. Learn how to contact us and become a member of our magical community.">
    <meta name="keywords" content="Ring 76 contact, join magic club, San Diego magic, magic club membership, IBM magic club, contact magicians">
    <meta name="author" content="Ring 76 - San Diego Magic Club">
    <meta property="og:title" content="Contact & Join Ring 76 | San Diego Magic Club">
    <meta property="og:description" content="Connect with Ring 76, San Diego's premier magic club. Learn how to contact us and become a member of our magical community.">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://ring76.com/contact">

    <?php include_once('includes/styles.php'); ?>
    <link href="https://fonts.googleapis.com/css2?family=Lobster+Two:wght@400;700&family=Fredoka:wght@300;400;500;600&display=swap" rel="stylesheet">
</head>
<body>

<?php
// Include site header with navigation
include_once('includes/header.php');
?>

<main>
    <!-- Hero Section -->
    <section class="hero-section content-hero">
        <div class="content-container">
            <h1>Contact & Join Ring 76</h1>
            <p class="lead">Connect with San Diego's magical community</p>
        </div>
    </section>

    <!-- Membership Section -->
    <section class="location-details">
        <div class="content-container">
            <h2>How to Join Our Club</h2>
            <div class="content-row">
                <div class="content-col content-col-full">
                    <div class="content-details-card">
                        <h3>Membership Process</h3>
                        <p>Becoming a member of Ring 76 opens doors to a world of magical knowledge, performance opportunities, and friendship with fellow magic enthusiasts.</p>
                        
                        <div class="content-row content-mt-medium">
                            <div class="content-col content-col-full">
                                <div class="expectation-item">
                                    <span class="emoji-icon">1️⃣</span>
                                    <div>
                                        <h4>Attend as a Guest</h4>
                                        <p>We invite you to attend up to three meetings as our guest before making a commitment to join. This gives you a chance to meet our members, experience our activities, and ensure our club is the right fit for you.</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="content-col content-col-full content-mt-medium">
                                <div class="expectation-item">
                                    <span class="emoji-icon">2️⃣</span>
                                    <div>
                                        <h4>Apply for Membership</h4>
                                        <p>Complete the application form below, and our membership director will guide you through the easy process to join.</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="content-col content-col-full content-mt-medium">
                                <div class="expectation-item">
                                    <span class="emoji-icon">3️⃣</span>
                                    <div>
                                        <h4>Membership Dues</h4>
                                        <p>Pay the Ring 76 Membership dues on PayPal</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="content-col content-col-full content-mt-medium">
                                <div class="expectation-item">
                                    <span class="emoji-icon">4️⃣</span>
                                    <div>
                                        <h4>Perform Magic for the Club</h4>
                                        <p>As part of the joining process, we ask you to perform a simple magic effect for the club. This is not an assessment of your magical skill, but rather a way to demonstrate your interest in magic and share your enthusiasm with fellow members.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Membership Benefits Section -->
   
    <!-- ADD THE BENEFITS SECTIOM PHP --> 

    <!-- Application Form Section -->
    <section class="attending-info">
        <div class="content-container">
          <h2>Membership Application</h2>
          <?php
           // Include Contact Form
           include_once('includes//sections/contact-form.php');
           ?>
        </div>
    </section>
   
    <!-- Payment Section -->
    <section class="content-info">
        <div class="content-container">
            <h2>Pay Your Dues</h2>
            <div class="content-row">
                <div class="content-col content-col-full">
                    <div class="content-details-card text-center">
                        <h3>Complete Your Membership</h3>
                        <p>After contacting us regarding membership, be sure to submit your dues to expedite the process. Payment confirms your commitment to joining our magical community.</p>
                        <div class="content-mt-medium">
                            <a href="#paypal" class="content-btn">Submit Payment on PayPal</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    
    <!-- Add divider between Contact section and Footer -->
    <div class="section-divider divider-wave"></div>
</main>

<?php
// Include site footer
include_once('includes/footer.php');

// Include chatbot component
include_once('includes/chatbot.php');

// Include scripts
include_once('includes/scripts.php');
?>
</body>
</html>
