<?php
/**
 * Board Members Section
 * 
 * This include file displays all board members from the database
 * Can be included in any page that needs to display the board members
 */

// Include the database connection if not already included
require_once __DIR__ . '/../../utils/db-connect.php';

// Include the officers utility functions if not already included
require_once __DIR__ . '/../../utils/officers.php';

// Wrapper div for all board members
echo '<div class="content-row board-members-container">';

// Display all officers
displayAllOfficers($pdo);

echo '</div>';

// Close the database connection (optional as PHP will close it at the end of the script)
$pdo = null;
?>