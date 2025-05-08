<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Magic Links Directory | Ring 76 - San Diego Magic Club</title>
    <meta name="description" content="Explore our curated list of magic-related websites, organizations, shops, and resources for magicians of all levels.">
    <meta name="keywords" content="magic links, magician resources, magic organizations, magic shops, magic forums, magic clubs, magic learning">
    <meta name="author" content="Ring 76 - San Diego Magic Club">
    <meta property="og:title" content="Magic Links Directory | Ring 76 - San Diego Magic Club">
    <meta property="og:description" content="Explore our curated list of magic-related websites, organizations, shops, and resources for magicians of all levels.">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://ring76.com/links">

    <?php include_once('includes/styles.php'); ?>
    <link href="https://fonts.googleapis.com/css2?family=Lobster+Two:wght@400;700&family=Fredoka:wght@300;400;500;600&display=swap" rel="stylesheet">
</head>
<body>

<?php
// Include site header with navigation
include_once('includes/header.php');

// Include database connection
include_once('utils/db-connect.php');

// Get type of links to display, if specified in URL
$type = isset($_GET['type']) ? $_GET['type'] : "";

// Helper function equivalent to the original mysqlJ_result function but for PDO
function pdoJ_result($stmt, $row, $field=0) {
    $stmt->execute();
    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
    if (isset($data[$row])) {
        if (is_string($field)) {
            return isset($data[$row][$field]) ? $data[$row][$field] : null;
        } else {
            $keys = array_keys($data[$row]);
            return isset($data[$row][$keys[$field]]) ? $data[$row][$keys[$field]] : null;
        }
    }
    return null;
}

// Function to get all link types from database
function getLinkTypes($pdo) {
    $query = "SELECT DISTINCT Type FROM Links ORDER BY Type";
    $stmt = $pdo->prepare($query);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

// Function to get all links or links of specific type
function getLinks($pdo, $type = "") {
    if (!empty($type)) {
        $query = "SELECT * FROM Links WHERE Type = :type ORDER BY Name";
        $stmt = $pdo->prepare($query);
        $stmt->bindParam(':type', $type);
    } else {
        $query = "SELECT * FROM Links ORDER BY Name";
        $stmt = $pdo->prepare($query);
    }
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

// Function to get friendly name for link type
function getTypeFriendlyName($type) {
    $names = [
        'Mfg' => 'Manufacturers',
        'Vendor' => 'Vendors',
        'Magician' => 'Magicians',
        'Resource' => 'Resources',
        'Org' => 'Organizations',
        'Other' => 'Other Links'
    ];
    
    return isset($names[$type]) ? $names[$type] : $type;
}

// Get all link types for navigation
$linkTypes = getLinkTypes($pdo);

// Get all links for JavaScript to filter
$allLinks = getLinks($pdo);
?>

<main>
    <!-- Hero Section -->
    <section class="hero-section content-hero content-hero-links">
        <div class="content-container">
            <h1 class="links-page-title">Magic Links Directory</h1>
            <p class="lead">Useful Resources for the Magical Community</p>
        </div>
    </section>

    <!-- Introduction Section -->
    <section class="content-info">
        <div class="content-container">
            <h2 class="links-page-title">Explore the World of Magic</h2>
            <div class="content-row">
                <div class="content-col content-col-full">
                    <div class="content-details-card">
                        <p>Welcome to our curated collection of magic-related websites and resources. We've compiled this list to help magicians of all skill levels find valuable information, products, and communities. Please note that Ring 76 is not affiliated with these external sites and does not endorse any specific products or services.</p>
                        <p>If you have a magic link you would like added or notice a link that is no longer working, please <a href="mailto:librarian@ring76.com,webmage@ring76.com?subject=Magic Links">click here</a> to send us an email.</p>
                        <p><em>Links open in a new tab for your convenience.</em></p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Links Navigation -->
    <nav id="link-filter-nav" class="award-navigation">
        <div class="content-container">
            <ul id="link-filter">
                <li><a href="#" data-type="all" class="active">All Links</a></li>
                <?php
                foreach ($linkTypes as $typeRow) {
                    $linkType = $typeRow['Type'];
                    $typeName = getTypeFriendlyName($linkType);
                    echo '<li><a href="#links-heading" data-type="' . $linkType . '">' . $typeName . '</a></li>';
                }
                ?>
            </ul>
        </div>
    </nav>

    <!-- Links Section -->
    <section id="links-container" class="content-info">
        <div class="content-container">
            <h2 id="links-heading" class="links-page-title">All Links</h2>
            <div class="content-row">
                <div class="content-col content-col-full">
                    <div class="content-details-card links-card">
                        <div id="links-display">
                            <?php
                            // This section will be dynamically populated by JavaScript
                            ?>
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

<script>
document.addEventListener('DOMContentLoaded', function() {
    // Store all links as a JavaScript object
    const allLinks = <?php echo json_encode($allLinks); ?>;
    
    // Cache DOM elements
    const linksDisplay = document.getElementById('links-display');
    const linksHeading = document.getElementById('links-heading');
    const linkFilters = document.querySelectorAll('#link-filter a');
    const linkFilterNav = document.getElementById('link-filter-nav');
    
    // Function to format links by first letter
    function formatLinks(links) {
        if (links.length === 0) {
            return '<div class="no-results"><p>No links found in this category.</p></div>';
        }
        
        // Group links by first letter
        const groupedLinks = {};
        
        links.forEach(link => {
            const name = link.Name;
            let firstLetter = name.charAt(0).toUpperCase();
            
            // Group numbers under #
            if (!isNaN(parseInt(firstLetter))) {
                firstLetter = '#';
            }
            
            if (!groupedLinks[firstLetter]) {
                groupedLinks[firstLetter] = [];
            }
            
            groupedLinks[firstLetter].push(link);
        });
        
        // Sort keys alphabetically
        const sortedKeys = Object.keys(groupedLinks).sort();
        
        // Generate HTML for grouped links
        let html = '';
        
        sortedKeys.forEach(letter => {
            html += `<div class="alpha-group">`;
            html += `<h3 class="alpha-header">${letter}</h3>`;
            html += `<ul class="links-list">`;
            
            groupedLinks[letter].forEach(link => {
                const name = link.Name;
                const url = link.LinkURL;
                
                if (url) {
                    html += `<li>
                        <a href="${url}" target="_blank" rel="noopener noreferrer">
                            <span class="link-title">${name}</span>
                            <span class="link-description">${url}</span>
                        </a>
                    </li>`;
                }
            });
            
            html += `</ul>`;
            html += `</div>`;
        });
        
        return html;
    }
    
    // Function to filter links
    function filterLinks(type) {
        // Show loading indicator
        linksDisplay.innerHTML = '<div class="loading"></div>';
        
        // Get navigation bar position for scrolling reference
        const navPosition = linkFilterNav.getBoundingClientRect();
        
        setTimeout(() => {
            let filteredLinks;
            let headingText;
            
            if (type === 'all') {
                filteredLinks = allLinks;
                headingText = 'All Links';
            } else {
                filteredLinks = allLinks.filter(link => link.Type === type);
                
                // Get friendly name for the type
                const typeNames = {
                    'Mfg': 'Manufacturers',
                    'Vendor': 'Vendors',
                    'Magician': 'Magicians',
                    'Resource': 'Resources',
                    'Org': 'Organizations',
                    'Other': 'Other Links'
                };
                
                headingText = typeNames[type] || type;
            }
            
            // Update heading
            linksHeading.textContent = headingText;
            
            // Update display with formatted links
            linksDisplay.innerHTML = formatLinks(filteredLinks);
            
            // Scroll to the navigation bar (not the top of the page)
            if (navPosition) {
                const scrollTarget = window.scrollY + navPosition.top;
                window.scrollTo({
                    top: scrollTarget,
                    behavior: 'smooth'
                });
            }
        }, 300); // Short delay to show loading animation
    }
    
    // Set up event listeners for filters
    linkFilters.forEach(filter => {
        filter.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all filters
            linkFilters.forEach(f => f.classList.remove('active'));
            
            // Add active class to clicked filter
            this.classList.add('active');
            
            // Get filter type
            const type = this.getAttribute('data-type');
            
            // Filter links
            filterLinks(type);
        });
    });
    
    // Initialize with all links
    filterLinks('all');
});
</script>
</body>
</html>
