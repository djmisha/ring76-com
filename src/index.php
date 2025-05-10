<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ring 76 - San Diego Magic Club | Learn & Perform Magic in San Diego</title>
    <meta name="description" content="Join Ring 76, San Diego's premier magician community. Learn magic tricks, attend live performances, and connect with fellow magic enthusiasts. Part of the International Brotherhood of Magicians.">
    <meta name="keywords" content="San Diego magic club, magicians San Diego, Ring 76, learn magic, magic performances, International Brotherhood of Magicians">
    <meta name="author" content="Ring 76 - San Diego Magic Club">
    <meta property="og:title" content="Ring 76 - San Diego Magic Club">
    <meta property="og:description" content="San Diego's community of magic enthusiasts dedicated to preserving and advancing the art of magic.">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://ring76.com">

    <?php include_once('includes/styles.php'); ?>
</head>
<body>

<?php
include_once('utils/db-connect.php');
// include_once('utils/randphoto.php');
?>

<?php
// Include site header with navigation
include_once('includes/header.php');
?>

<main>
    <section id="hero" class="hero-section hero-home">
        <div class="hero-content">
            <h1>Your Magical World</h1>
            <p>Discover the art of illusion with fellow enthusiasts</p>
            <a href="#membership" class="btn">Join Our Club</a>
        </div>
    </section>

    <section id="about" class="about-section">
        <div class="container">
            <h2>About Our Club</h2>
            <p>Ring 76 is a community of magic enthusiasts dedicated to preserving and advancing the art of magic. Founded in 1942, our club brings together amateur and professional magicians to share knowledge, techniques, and friendship.</p>
        </div>
    </section>

    <!-- Add divider between About and Events sections -->
    <div class="section-divider divider-wave"></div>

    <?php
    // Include Meetings and Events 
    include_once('includes//sections/events.php');
    ?>

    <!-- Add divider between Events and Magic Arts sections -->
    <div class="section-divider divider-peaks"></div>
    
    
    <!-- Random Photo section -->
    <?php
    include_once('utils/randphoto.php');
    ?>

    <!-- Add Magic Art Forms section -->
    <section id="magic-arts" class="magic-arts-section">
        <div class="container">
            <h2>Explore the Arts of Magic</h2>
            <p class="section-intro">Whatever magical art form captivates your interest, Ring 76 has experienced practitioners to guide and inspire you.</p>
            
            <div class="art-forms-container">
                <div class="art-form">
                    <div class="art-icon">👐</div>
                    <h3>Sleight of Hand</h3>
                    <p>Master the fundamental techniques of misdirection, dexterity, and precision that form the foundation of all magical performance.</p>
                </div>
                <div class="art-form">
                    <div class="art-icon">♠️</div>
                    <h3>Card Magic</h3>
                    <p>Master the classics of card manipulation, from ambitious card routines to mind-bending predictions and impossible locations.</p>
                </div>
                <div class="art-form">
                    <div class="art-icon">💰</div>
                    <h3>Coin Magic</h3>
                    <p>Develop sleight of hand skills with coin vanishes, appearances, transpositions, and the art of misdirection.</p>
                </div>
                <div class="art-form">
                    <div class="art-icon">🪄</div>
                    <h3>Close-Up Magic</h3>
                    <p>Perform miracles right under the spectator's nose with everyday objects and intimate magical experiences.</p>
                </div>
                <div class="art-form">
                    <div class="art-icon">🎭</div>
                    <h3>Stage Illusions</h3>
                    <p>Discover the principles behind grand illusions, stage presence, and theatrical magical presentations.</p>
                </div>
                <div class="art-form">
                    <div class="art-icon">🧠</div>
                    <h3>Mentalism</h3>
                    <p>Explore the realm of mind-reading, psychological forces, predictions, and apparent psychic phenomena.</p>
                </div>
            </div>
            
            <div class="magic-arts-cta">
                <a href="#contact" class="btn btn-gold">Find Your Magic</a>
            </div>
        </div>
    </section>

    <!-- Add divider between Magic Arts and Experience Magic sections -->
    <div class="section-divider divider-curve"></div>

    <!-- Add Experience Magic section -->
    <section id="experience-magic" class="experience-magic-section">
        <div class="container">
            <h2>Experience Magic</h2>
            <p class="section-intro">Learn how to amaze your audiences and enhance your skills</p>
            
            <div class="magic-experience-content">
                <div class="magic-experience-text">
                    <p>Magic is more than just tricks and illusions—it's about creating moments of wonder that stay with people forever. At Ring 76, we believe in the transformative power of magic to build confidence, enhance communication skills, and create meaningful connections with others.</p>
                    <p>Whether you're a complete beginner or a seasoned performer looking to refine your craft, our supportive community offers the guidance, resources, and opportunities you need to grow as a magical artist.</p>
                    
                    <div class="magic-benefit-cards">
                        <div class="magic-benefit-card">
                            <span class="benefit-icon">✨</span>
                            <h3>Presentation Skills</h3>
                            <p>Develop performance abilities that translate to professional success</p>
                        </div>
                        <div class="magic-benefit-card">
                            <span class="benefit-icon">🔮</span>
                            <h3>Psychological Insight</h3>
                            <p>Learn the principles behind effective magical performance</p>
                        </div>
                        <div class="magic-benefit-card">
                            <span class="benefit-icon">🎭</span>
                            <h3>Audience Engagement</h3>
                            <p>Master techniques to captivate any audience</p>
                        </div>
                        <div class="magic-benefit-card">
                            <span class="benefit-icon">🌟</span>
                            <h3>Supportive Community</h3>
                            <p>Join fellow magicians who celebrate your growth</p>
                        </div>
                    </div>
                    
                    <div class="cta-container">
                        <a href="#contact" class="btn">Begin Your Journey</a>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Add divider between Experience Magic and Membership sections -->
    <div class="section-divider divider-zigzag"></div>

    <!-- Membership section -->
    <section id="membership" class="membership-section">
        <div class="container">
            <h2>Membership Benefits</h2>
            <p>Joining Ring 76 connects you with a community of magic enthusiasts and provides access to valuable resources to develop your magical skills.</p>
            
            <div class="benefits-container">
                <div class="benefit">
                    <h3>Monthly Meetings</h3>
                    <p>Attend our regular meetings featuring performances, lectures, and workshops from experienced magicians.</p>
                </div>
                <div class="benefit">
                    <h3>Learning Resources</h3>
                    <p>Access our library of books, videos, and tutorials covering various aspects of magic and illusion.</p>
                </div>
                <div class="benefit">
                    <h3>Mentorship</h3>
                    <p>Connect with experienced performers who can guide you in developing your skills and routines.</p>
                </div>
                <div class="benefit">
                    <h3>Performance Opportunities</h3>
                    <p>Showcase your talents at club events and gain valuable performance experience.</p>
                </div>
                <div class="benefit">
                    <h3>IBM Membership</h3>
                    <p>Become part of the International Brotherhood of Magicians, connecting you to the global magic community.</p>
                </div>
                <div class="benefit">
                    <h3>Leadership Growth</h3>
                    <p>Develop your organizational skills by joining our board of directors, helping shape our future activities and direction.</p>
                </div>
            </div>
            
            <div class="membership-cta">
                <a href="#contact" class="btn">Join Today</a>
            </div>
        </div>
    </section>

    <!-- Add divider between Membership and Library sections -->
    <div class="section-divider divider-peaks"></div>

    <!-- Magic Library Section -->
    <section id="library" class="library-section">
        <div class="container">
            <h2>World's Third* Largest Magic Library <span class="probably">* probably</span></h2>
            <p class="library-tagline">We have one of the most unique libraries in the whole wide world for your magical education.</p>
            
            <div class="library-content">
                <div class="library-info">
                    <div class="library-stat">
                        <span class="stat-number">Lifetime of</span>
                        <span class="stat-label">Professional Magic Books</span>
                    </div>
                    <div class="library-stat">
                        <span class="stat-number">Centuries of</span>
                        <span class="stat-label"> Performance Techniques</span>
                    </div>
                    <div class="library-stat">
                        <span class="stat-number">Unlimited</span>
                        <span class="stat-label">Sleight of Hand Methods</span>
                    </div>
                    <a href="#contact" class="btn btn-outline">Access Our Collection</a>
                </div>
            </div>
        </div>
    </section>

    <!-- Add divider between Library and Contact sections -->
    <div class="section-divider divider-curve"></div>

    <!-- Join Our Club Section -->

    <?php
    // Include Contact Form
      include_once('includes//sections/contact-form.php');
    ?>
  

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
