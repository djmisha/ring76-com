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

<script id="linksPageScript"> // Added id="linksPageScript"
window.initializeLinksPageLogic = function() {
    const allLinksData = <?php echo json_encode($allLinks); ?>;
    
    const linksDisplay = document.getElementById('links-display');
    const linksHeading = document.getElementById('links-heading');
    const linkFilters = document.querySelectorAll('#link-filter a');
    const linkFilterNav = document.getElementById('link-filter-nav');

    if (!linksDisplay || !linksHeading || !linkFilters.length || !linkFilterNav) {
        return;
    }
    
    linksDisplay.innerHTML = ''; // Clear display area for idempotency

    function formatLinksByFirstLetter(links) {
        const grouped = links.reduce((acc, link) => {
            if (!link.Name || typeof link.Name !== 'string' || link.Name.length === 0) {
                return acc; // Skip if Name is invalid
            }
            const letter = link.Name[0].toUpperCase();
            if (!acc[letter]) acc[letter] = [];
            acc[letter].push(link);
            return acc;
        }, {});

        let html = '';
        Object.keys(grouped).sort().forEach(letter => {
            html += `<h3 class="links-letter-group">${letter}</h3><ul class="links-list">`;
            grouped[letter].forEach(link => {
                let url = link.LinkURL && link.LinkURL.trim() !== '' ? link.LinkURL.trim() : '#';
                
                const nameText = link.Name ? link.Name : 'Unnamed Link';
                const descriptionText = link.Description ? link.Description : '';
                
                html += `<li><a href="${url}" class="external-link" target="_blank" rel="noopener noreferrer" onclick="window.open('${url}', '_blank'); return false;">${nameText}</a>${descriptionText ? ' - ' + descriptionText : ''}</li>`;
            });
            html += `</ul>`;
        });
        return html;
    }

    function filterLinks(type) {
        linksDisplay.innerHTML = ''; // Clear display for new filter

        const activeFilterLink = document.querySelector(`#link-filter a[data-type="${type}"]`);
        linksHeading.textContent = type === 'all' ? 'All Links' : (activeFilterLink ? activeFilterLink.textContent : 'Links');

        const filteredLinks = type === 'all' ? allLinksData : allLinksData.filter(link => link.Type === type);
        
        if (filteredLinks.length === 0) {
            linksDisplay.innerHTML = '<p>No links found for this category.</p>';
            return;
        }
        linksDisplay.innerHTML = formatLinksByFirstLetter(filteredLinks);
    }

    linkFilters.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            linkFilters.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            filterLinks(this.dataset.type);
        });
    });
    
    const initialActiveFilter = document.querySelector('#link-filter a[data-type="all"]');
    if (initialActiveFilter) {
        initialActiveFilter.classList.add('active');
    }
    filterLinks('all'); // Initialize with all links
};

// This auto-execution block should only run on a direct, non-AJAX load.
if (typeof window.isTransitioning === 'undefined' || !window.isTransitioning) {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            if (typeof window.initializeLinksPageLogic === 'function') {
                window.initializeLinksPageLogic();
            }
        });
    } else {
        if (typeof window.initializeLinksPageLogic === 'function') {
             window.initializeLinksPageLogic();
        }
    }
}
</script>
</body>
</html>
