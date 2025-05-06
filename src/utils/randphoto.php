<?php
/**
 * Displays a random photo from the FPPhoto table with its caption
 */
function displayRandomPhoto($pdo) {
  try {
      $query = "SELECT * FROM FPPhoto ORDER BY RAND() LIMIT 1";
      $stmt = $pdo->prepare($query);
      $stmt->execute();
      
      if ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
          $photo = $row['PhotoName'] ?? '';
          $caption = $row['Caption'] ?? '';
          
          echo '<div class="random-photo-container">';
          echo '  <div class="random-photo-image">';
          echo '    <img src="https://www.ring76.com/assets/banner/' . $photo . '" alt="' . $caption . '">';
          echo '  </div>';
          echo '  <div class="random-photo-caption">';
          echo '    <p>' . $caption . '</p>';
          echo '  </div>';
          echo '</div>';
      }
  } catch (PDOException $e) {
      echo '<p>Error retrieving random photo: ' . $e->getMessage() . '</p>';
  }
}

// Example of how to use the function:
displayRandomPhoto($pdo);
?>