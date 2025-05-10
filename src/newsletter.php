<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Newsletter Archive | Ring 76 San Diego Magic Club</title>
    <meta name="description" content="Browse our collection of monthly newsletters from Ring 76, San Diego's premier magic club. Access archives dating back to 1988.">
    <meta name="keywords" content="Ring 76 newsletters, San Diego magic club publications, magic club archives, IBM magic newsletters, magic history">
    <meta name="author" content="Ring 76 - San Diego Magic Club">
    <meta property="og:title" content="Newsletter Archive | Ring 76 San Diego Magic Club">
    <meta property="og:description" content="Browse our collection of monthly newsletters from Ring 76, San Diego's premier magic club. Access archives dating back to 1988.">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://ring76.com/newsletter">

    <?php include_once('includes/styles.php'); ?>
</head>
<body>

<?php
// Include site header with navigation
include_once('includes/header.php');
?>

<main>
    <!-- Hero Section -->
    <section class="hero-section content-hero content-hero-newsletter">
        <div class="content-container">
            <h1>Newsletter Archive</h1>
            <p class="lead">Exploring the History and Magic of Ring 76</p>
        </div>
    </section>

    <!-- Introduction Section -->
    <section class="content-info">
        <div class="content-container">
            <h2>Our Monthly Publications</h2>
            <div class="content-row">
                <div class="content-col content-col-full">
                    <div class="content-details-card">
                        <h3>Documenting Our Magical Journey</h3>
                        <p>Since 1988, Ring 76 has published monthly newsletters to keep our members informed about club activities, share magical knowledge, and document our history. These newsletters contain meeting recaps, member spotlights, trick tutorials, upcoming events, and more.</p>
                        <p>Browse our extensive archive below to explore the rich history of Ring 76 and discover how our magical community has evolved over the decades.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Newsletter Archive Navigation and Content -->
    <section class="content-info newsletter-archive">
        <div class="content-container">
            <h2>Newsletter Archive</h2>
            <div class="content-row">
                <div class="content-col content-col-full">
                    <div class="content-details-card">
                        <?php
                        define("NUMBUTTON", "6");    // Number of year buttons to display
                        define("NUMPERROW", "3");    // Number of year buttons per row
                        define("FIRSTYEAR", "1988"); // The first possible newsletter year.
                        
                        // Get the parameters passed in with the page.
                        $year = isset($_GET['year']) ? $_GET["year"] : 0;
                        
                        // Validate Input
                        $thisyear = getdate()["year"];
                        if ($year < FIRSTYEAR || $year > $thisyear) {
                            $year = $thisyear;
                        }
                        
                        // Figure out which band of years to show on the page.
                        $startyear = $thisyear;
                        while ($startyear >= $year) {
                            $startyear = $startyear - NUMBUTTON;
                        }
                        $startyear += 1;
                        ?>
                        
                        <!-- Year Navigation -->
                        <div class="year-navigation">
                            <div class="year-buttons">
                                <?php
                                if ($startyear < (FIRSTYEAR)) $startyear = FIRSTYEAR;
                                
                                if ($startyear > (FIRSTYEAR)) {
                                    $temp = $startyear - 1;
                                    echo '<a href="newsletter.php?year=' . $temp . '" class="nav-btn prev-btn">Previous</a>';
                                }
                                
                                for ($i = 0; $i < NUMBUTTON; $i++) {
                                    $cur_year = $startyear + $i;
                                    if ($cur_year <= $thisyear) {
                                        $activeClass = ($cur_year == $year) ? ' active' : '';
                                        echo '<a href="newsletter.php?year=' . $cur_year . '" class="year-button' . $activeClass . '">' . $cur_year . '</a>';
                                        
                                        if (($i % NUMPERROW) == (NUMPERROW - 1)) {
                                            if ($i < NUMBUTTON - 1) echo '<br>';  // New line
                                        }
                                    }
                                }
                                
                                if ($startyear + NUMBUTTON < $thisyear) {
                                    $temp = $startyear + NUMBUTTON;
                                    echo '<a href="newsletter.php?year=' . $temp . '" class="nav-btn next-btn">Next</a>';
                                }
                                ?>
                            </div>
                        </div>
                        
                        <!-- Current Year Newsletters Display -->
                        <h3><?php echo $year; ?> Newsletters</h3>
                        
                        <div class="newsletter-grid">
                            <?php
                            $i = 1;
                            $foundNewsletters = false;
                            
                            while ($i <= 12) {
                                // Check if newsletters exist for each month
                                $monthstr = sprintf('%02d', $i);
                                $yearstr = sprintf('%04d', $year);
                                
                                $filename = '../newsletters/magicurrents_' . $yearstr . '-' . $monthstr . '.pdf';
                                if (file_exists($filename)) {
                                    $foundNewsletters = true;
                                    $ts = mktime(0, 0, 0, $i, 15);
                                    $monthname = date('F', $ts);
                                    echo '<a href="' . $filename . '" target="_blank" class="newsletter-item">' . $monthname . ' ' . $year . '</a>';
                                }
                                $i++;
                            }
                            
                            if (!$foundNewsletters) {
                                echo '<div class="no-newsletters-message">No newsletters are available for ' . $year . '.</div>';
                            }
                            ?>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Historical Note Section -->
    <section class="what-to-expect">
        <div class="content-container">
            <h2>About Our Newsletter</h2>
            <div class="content-row">
                <div class="content-col content-col-two-thirds content-offset-col">
                    <div class="expectation-list">
                        <div class="expectation-item">
                            <span class="emoji-icon">📜</span>
                            <div>
                                <h4>Historical Record</h4>
                                <p>Our newsletters serve as a historical record of Ring 76 activities, preserving the memories and achievements of our members throughout the decades.</p>
                            </div>
                        </div>
                        <div class="expectation-item">
                            <span class="emoji-icon">🎩</span>
                            <div>
                                <h4>Magical Knowledge</h4>
                                <p>Each issue contains tutorials, tips, and insights from experienced magicians, helping members develop their skills and expand their magical repertoire.</p>
                            </div>
                        </div>
                        <div class="expectation-item">
                            <span class="emoji-icon">👥</span>
                            <div>
                                <h4>Community Connection</h4>
                                <p>Our newsletter helps build and maintain our magical community by keeping members informed about club activities, celebrating achievements, and welcoming new members.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Digital Initiative Section -->
    <section class="attending-info">
        <div class="content-container">
            <h2>Digital Archive Initiative</h2>
            <div class="content-row content-align-center">
                <div class="content-col content-col-half">
                    <div class="attendance-info">
                        <div class="members">
                            <h3>Preserving Our History</h3>
                            <p>We're continually working to digitize our older newsletters to make them accessible to all members. This ongoing project helps preserve our club's rich history for future generations of magicians.</p>
                            <p>If you have physical copies of any Ring 76 newsletters that aren't currently in our digital archive, please consider sharing them with us to help complete our collection.</p>
                        </div>
                    </div>
                </div>
                <div class="content-col content-col-half">
                    <div class="attendance-info">
                        <div>
                            <h3>Available to All</h3>
                            <p>We're happy to share our newsletter archive with everyone who has an interest in magic and our club's activities.</p>
                            <p>We hope these resources inspire you to become a member of Ring 76 and join our community of magicians, where you can experience the magic in person!</p>
                            <a href="/contact.php" class="content-btn content-mt-medium">Become a Member</a>
                        </div>
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
