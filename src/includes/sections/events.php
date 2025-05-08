<?php
// Include the database connection
require_once __DIR__ . '/../../utils/db-connect.php';

// Fetch upcoming events for display cards (limit to 5 most recent)
try {
    $stmt = $pdo->prepare("SELECT * FROM Events WHERE Date >= CURRENT_DATE-1 AND Type='Ring' ORDER BY Date LIMIT 5");
    $stmt->execute();
    $events = $stmt->fetchAll(PDO::FETCH_ASSOC);
} catch (PDOException $e) {
    error_log("Database error in events.php: " . $e->getMessage());
    $events = []; // Empty array if query fails
}
?>

<section id="events" class="events-section">
    <div class="container">
        <h2>Upcoming Meetings and Events</h2>
        <div class="event-cards">
            <?php if (count($events) > 0): ?>
                <?php foreach($events as $event): ?>
                    <div class="event-card">
                        <h3><?= htmlspecialchars($event['Name']) ?></h3>
                        <p class="event-date"><?= date('F j, Y', strtotime($event['Date'])) ?></p>
                        <p class="event-place">
                          <?= htmlspecialchars($event['Place']) ?>
                        </p>
                        <p><?= !empty($event['Comment']) ? htmlspecialchars($event['Comment']) : 'Join us for this magical event.' ?></p>
                    </div>
                <?php endforeach; ?>
            <?php else: ?>
                <p>No upcoming events at this time. Please check back later.</p>
            <?php endif; ?>
        </div>
    </div>
</section>
