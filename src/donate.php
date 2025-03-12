<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Donate | Ring 76 San Diego Magic Club</title>
    <meta name="description" content="Support Ring 76 by donating your time, joining the board, contributing magic items or books, or making a monetary donation.">
    <meta name="keywords" content="Ring 76 donations, San Diego magic club support, donate time, join the board, donate magic items, donate books, donate money">
    <meta name="author" content="Ring 76 - San Diego Magic Club">
    <meta property="og:title" content="Donate | Ring 76 San Diego Magic Club">
    <meta property="og:description" content="Support Ring 76 by donating your time, joining the board, contributing magic items or books, or making a monetary donation.">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://ring76.com/donate">

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
    <section class="hero-section content-hero content-hero-donate">
        <div class="content-container">
            <h1>Donate</h1>
            <p class="lead">Support the Magic Community in San Diego</p>
        </div>
    </section>

    <!-- Donate Time Section -->
    <section class="content-info">
        <div class="content-container">
            <h2>Donate Your Time</h2>
            <div class="content-row">
                <div class="content-col content-col-full">
                    <div class="content-details-card">
                        <h3>Volunteer with Us</h3>
                        <p>Your time is one of the most valuable gifts you can offer. Whether it's helping out at events, assisting with club activities, or sharing your skills and knowledge, your contribution makes a big difference.</p>
                        <p>Contact us to learn more about volunteer opportunities and how you can get involved.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Join the Board Section -->
    <section class="content-info">
        <div class="content-container">
            <h2>Join the Board</h2>
            <div class="content-row">
                <div class="content-col content-col-full">
                    <div class="content-details-card">
                        <h3>Become a Leader</h3>
                        <p>Our board members play a crucial role in guiding the direction of Ring 76. If you have a passion for magic and leadership skills, consider joining our board. Help us shape the future of our club and the magic community in San Diego.</p>
                        <p>Reach out to us for more information on board positions and the application process.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Donate Magic Items or Books Section -->
    <section class="content-info">
        <div class="content-container">
            <h2>Donate Magic Items or Books</h2>
            <div class="content-row">
                <div class="content-col content-col-full">
                    <div class="content-details-card">
                        <h3>Contribute to Our Library</h3>
                        <p>We are always looking to expand our magic library with new items and books. Your donations help us provide valuable resources to our members and preserve the art of magic for future generations.</p>
                        <p>If you have magic items or books you'd like to donate, please get in touch with us to arrange a donation.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Donate Money Section -->
    <section class="content-info">
        <div class="content-container">
            <h2>Donate Money</h2>
            <div class="content-row">
                <div class="content-col content-col-full">
                    <div class="content-details-card">
                        <h3>Support Financially</h3>
                        <p>Your financial contributions help us fund events, workshops, and other activities that keep our club thriving. Every donation, big or small, makes a significant impact.</p>
                        <p>Click the button below to make a secure donation via PayPal.</p>
                        <a href="#" class="content-btn content-mt-medium">Donate via PayPal</a>
                    </div>
                </div>
            </div>
        </div>
    </section>
   
    <!-- Add divider between Content and Footer -->
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
