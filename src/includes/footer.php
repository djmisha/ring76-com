<footer>
    <div class="container">
        <div class="footer-content">
            <div class="footer-sections">
                <div class="footer-info">
                    <h3>Ring 76</h3>
                    <p>The Honest Sid Gerhart Ring, San Diego</p>
                    <p>International Brotherhood of Magicians</p>
                    <p>503(c) Non-Profit Organization</p>
                    <img src="image/ibm-logo.png" alt="IBM Logo" width="150" class="footer-ibm-logo">
                </div>
                
                <div class="footer-nav-section">
                    <h3>Master Illusions</h3>
                    <ul>
                        <li><a href="index.php">Home</a></li>
                        <li><a href="about.php">About Us</a></li>
                        <li><a href="meetings.php">Meetings & Events</a></li>
                        <li><a href="membership.php">Membership</a></li>
                        <li><a href="contact.php">Join our Club</a></li>
                    </ul>
                </div>
                
                <div class="footer-nav-section">
                    <h3>Close-up Conjury</h3>
                    <ul>
                        <li><a href="board.php">Board of Directors</a></li>
                        <li><a href="hall-of-fame.php">Hall of Fame</a></li>
                        <li><a href="newsletter.php">Newsletter</a></li>
                        <li><a href="donate.php">Donate</a></li>
                      </ul>
                    </div>
                    
                    <div class="footer-nav-section">
                      <h3>Parlour Tricks</h3>
                      <ul>
                        <li><a href="https://arcanum.ring76.com/">Arcanum</a></li>
                        <li><a href="links.php">Link Directory</a></li>
                        <li><a href="#" class="do-magic" id="flip-trick">Do a Magic Trick</a></li>
                        <li><span class="tell-secret" id="secret-trick">Tell me the Secret</span></li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; <?php echo getCopyrightYears(1948); ?> All rights reserved - Ring 76 - San Diego Magic Club</p>
            <div class="back-to-top">
                <a href="#" id="back-to-top-btn">🪄 Turn Back Time</a>
            </div>
        </div>
    </div>
</footer>

<?php
/**
 * Function to display copyright years from start year to current year
 * @param int $startYear Starting year for copyright
 * @return string Formatted copyright year string
 */
function getCopyrightYears($startYear) {
    $currentYear = date('Y');
    if ($startYear == $currentYear || $startYear > $currentYear) {
        return $currentYear;
    }
    return $startYear . ' - ' . $currentYear . ' ';
}
?>
