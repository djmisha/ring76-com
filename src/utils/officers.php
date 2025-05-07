<?php
/**
 * Officers utility file
 * 
 * This file provides functions to retrieve and display board member information
 * from the database.
 */

// HTML filtering for security
$htmlfilter = array("<", ">", "%", ";", "&", "'");
$htmlreplace = array("|1", "|2", "|3", "|4", "|5", "|6");

/**
 * Get single officer information by position
 * 
 * @param PDO $pdo Database connection
 * @param string $position Officer position (e.g., 'PRESIDENT')
 * @return array|null Officer data or null if not found
 */
function getOfficer($pdo, $position) {
    try {
        $stmt = $pdo->prepare("SELECT * FROM Officers WHERE office = ?");
        $stmt->execute([$position]);
        
        if ($stmt->rowCount() > 0) {
            $officer = $stmt->fetch(PDO::FETCH_ASSOC);
            
            // Restore forbidden characters in description
            if (isset($officer['description'])) {
                global $htmlfilter, $htmlreplace;
                $officer['description'] = str_replace($htmlreplace, $htmlfilter, $officer['description']);
            }
            
            return $officer;
        }
        
        return null;
    } catch (PDOException $e) {
        error_log("Database error in getOfficer: " . $e->getMessage());
        return null;
    }
}

/**
 * Get all members-at-large
 * 
 * @param PDO $pdo Database connection
 * @return array Array of members-at-large
 */
function getMembersAtLarge($pdo) {
    try {
        $stmt = $pdo->prepare("SELECT * FROM Officers WHERE office = 'MEMBERATLARGE'");
        $stmt->execute();
        
        $members = [];
        while ($member = $stmt->fetch(PDO::FETCH_ASSOC)) {
            // Restore forbidden characters in description
            if (isset($member['description'])) {
                global $htmlfilter, $htmlreplace;
                $member['description'] = str_replace($htmlreplace, $htmlfilter, $member['description']);
            }
            
            $members[] = $member;
        }
        
        return $members;
    } catch (PDOException $e) {
        error_log("Database error in getMembersAtLarge: " . $e->getMessage());
        return [];
    }
}

/**
 * Display a single officer with HTML formatting
 * 
 * @param array $officer Officer data
 * @param string $title Officer title to display
 * @return void
 */
function displayOfficer($officer, $title) {
    if (!$officer) return;
    
    echo '<div class="content-col content-col-full content-mt-medium">';
    echo '    <div class="content-details-card">';
    echo '        <h2>' . htmlspecialchars($title) . '</h2>';
    echo '        <div class="officer-profile">';
    echo '            <div class="officer-info">';
    echo '                <h3><strong>' . htmlspecialchars($officer['name']) . '</strong></h3>';
    
    if (!empty($officer['description'])) {
        echo '                <p>' . htmlspecialchars($officer['name']) . ' ' . $officer['description'] . '</p>';
    }
    
    if (!empty($officer['email'])) {
        echo '                <span><a class="content-btn content-mt-medium" href="mailto:' . htmlspecialchars($officer['email']) . '">Contact ' . htmlspecialchars($officer['name']) . '</a></span>';
    }
    
    echo '            </div>';
    
    if (!empty($officer['photo'])) {
        echo '            <div class="officer-image">';
        echo '                <img src="https://ring76.com/assets/images/' . htmlspecialchars($officer['photo']) . '" alt="' . htmlspecialchars($officer['name']) . '" width="120" height="150">';
        echo '            </div>';
    }
    
    echo '        </div>';
    echo '    </div>';
    echo '</div>';
}

/**
 * Display all board members from the database
 * 
 * @param PDO $pdo Database connection
 * @return void
 */
function displayAllOfficers($pdo) {
    // President
    $president = getOfficer($pdo, 'PRESIDENT');
    displayOfficer($president, 'President');
    
    // 1st VP
    $firstVp = getOfficer($pdo, 'FIRSTVP');
    displayOfficer($firstVp, '1st VP (Entertainment)');
    
    // 2nd VP
    $secondVp = getOfficer($pdo, 'SECONDVP');
    displayOfficer($secondVp, '2nd VP (Membership)');
    
    // Treasurer
    $treasurer = getOfficer($pdo, 'TREASURER');
    displayOfficer($treasurer, 'Treasurer');
    
    // Secretary
    $secretary = getOfficer($pdo, 'SECRETARY');
    displayOfficer($secretary, 'Secretary');
    
    // Sergeant at Arms
    $sgtAtArms = getOfficer($pdo, 'SGTATARMS');
    displayOfficer($sgtAtArms, 'Sergeant at Arms');
    
    // Members at Large
    $membersAtLarge = getMembersAtLarge($pdo);
    foreach ($membersAtLarge as $member) {
        displayOfficer($member, 'Member-at-Large');
    }
}
?>