<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hall of Fame | Ring 76 San Diego Magic Club</title>
    <meta name="description" content="Honoring the outstanding magicians and members of Ring 76 throughout our history. Discover our distinguished past presidents and competition winners.">
    <meta name="keywords" content="Ring 76 Hall of Fame, San Diego magic awards, magic competition winners, IBM magic club recognition, magic contest history">
    <meta name="author" content="Ring 76 - San Diego Magic Club">
    <meta property="og:title" content="Hall of Fame | Ring 76 San Diego Magic Club">
    <meta property="og:description" content="Honoring the outstanding magicians and members of Ring 76 throughout our history. Discover our distinguished past presidents and competition winners.">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://ring76.com/hall-of-fame">

    <?php include_once('includes/styles.php'); ?>
    <link href="https://fonts.googleapis.com/css2?family=Lobster+Two:wght@400;700&family=Fredoka:wght@300;400;500;600&display=swap" rel="stylesheet">

  </head>
<body>

<?php
// Include site header with navigation
include_once('includes/header.php');

// Include database connection
include_once('utils/db-connect.php');

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

?>

<main>
    <!-- Hero Section -->
    <section class="hero-section content-hero content-hero-halloffame">
        <div class="content-container">
            <h1>Hall of Fame</h1>
            <p class="lead">Honoring Excellence in San Diego's Magical Community</p>
        </div>
    </section>

    <!-- Introduction Section -->
    <section class="content-info">
        <div class="content-container">
            <h2>Ring 76 Recognition</h2>
            <div class="content-row">
                <div class="content-col content-col-full">
                    <div class="content-details-card">
                        <h3>Celebrating Magical Excellence</h3>
                        <p>The Ring 76 Hall of Fame honors those who have made significant contributions to our club and the art of magic in San Diego. From dedicated leadership to exceptional performance skills, these individuals represent the best of our magical community.</p>
                        <p>This page commemorates our past presidents who have guided our organization throughout its history, as well as the winners of our prestigious annual competitions and special recognitions.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Award Navigation -->
    <nav class="award-navigation">
        <div class="content-container">
            <ul>
                <li><a href="#president">Past Presidents</a></li>
                <li><a href="#member-of-year">Member of the Year</a></li>
                <li><a href="#performer-of-year">Performer of the Year</a></li>
                <li><a href="#stage-contest">Stage Contest</a></li>
                <li><a href="#closeup-contest">Close-up Contest</a></li>
            </ul>
        </div>
    </nav>

    <!-- President Section -->
    <section id="president" class="award-section">
        <div class="content-container">
            <h2>Past Presidents</h2>
            <div class="content-row">
                <div class="content-col content-col-full">
                    <div class="content-details-card">
                        <p>Throughout our history, these dedicated leaders have guided Ring 76 with their vision, passion, and commitment to the magical arts. We honor their service and the lasting impact they've made on our community.</p>
                        
                        <div class="award-container">
                            <?php
                            // Query for President data
                            $query = "SELECT * FROM `HallOfFame` WHERE `President` = 1 ORDER BY `Year` DESC";
                            $stmt = $pdo->prepare($query);
                            $stmt->execute();
                            $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
                            $num = count($data);
                            
                            if ($num > 0) {
                                $suitCounter = 0;
                                $suits = ["hearts", "diamonds", "clubs", "spades"];
                                $suitSymbols = ["♥", "♦", "♣", "♠"];
                                
                                // Loop through results and create award cards
                                for ($i = 0; $i < $num; $i++) {
                                    $name = pdoJ_result($stmt, $i, "Name");
                                    $year = pdoJ_result($stmt, $i, "Year");
                                    $endyear = pdoJ_result($stmt, $i, "EndYear");
                                    
                                    // Format years display
                                    $yearDisplay = $year;
                                    if ($endyear != "0000") {
                                        $yearDisplay .= " - " . $endyear;
                                    }
                                    
                                    // Cycle through suits
                                    $currentSuitIndex = $suitCounter % 4;
                                    $currentSuit = $suits[$currentSuitIndex];
                                    $currentSuitSymbol = $suitSymbols[$currentSuitIndex];
                                    $suitCounter++;
                            ?>
                            <div class="award-card">
                                <div class="award-card-inner">
                                    <div class="award-front">
                                        <div class="nameplate">
                                            <div class="corner top-left"></div>
                                            <div class="corner top-right"></div>
                                            <div class="corner bottom-left"></div>
                                            <div class="corner bottom-right"></div>
                                            <div class="award-name"><?php echo $name; ?></div>
                                            <div class="award-years"><?php echo $yearDisplay; ?></div>
                                            <div class="award-title">President</div>
                                        </div>
                                        <div class="shine"></div>
                                    </div>
                                    <div class="award-back">
                                        <div class="suit <?php echo $currentSuit; ?>"><?php echo $currentSuitSymbol; ?></div>
                                    </div>
                                </div>
                                <div class="sparkle-container">
                                    <div class="sparkle"></div>
                                    <div class="sparkle"></div>
                                    <div class="sparkle"></div>
                                    <div class="sparkle"></div>
                                    <div class="sparkle"></div>
                                    <div class="sparkle"></div>
                                    <div class="sparkle"></div>
                                    <div class="sparkle"></div>
                                </div>
                            </div>
                            <?php
                                }
                            }
                            ?>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Member of the Year Section -->
    <section id="member-of-year" class="award-section">
        <div class="content-container">
            <h2>Member of the Year</h2>
            <div class="content-row">
                <div class="content-col content-col-full">
                    <div class="content-details-card">
                        <p>Each year, Ring 76 recognizes one outstanding member who has gone above and beyond in their contributions to our club. This prestigious award celebrates dedication, service, and commitment to advancing our magical community.</p>
                        
                        <div class="award-container">
                            <?php
                            // Query for Member of the Year data
                            $query = "SELECT * FROM `HallOfFame` WHERE `MemberOfYear` = 1 ORDER BY `Year` DESC";
                            $stmt = $pdo->prepare($query);
                            $stmt->execute();
                            $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
                            $num = count($data);
                            
                            if ($num > 0) {
                                $suitCounter = 0;
                                $suits = ["hearts", "diamonds", "clubs", "spades"];
                                $suitSymbols = ["♥", "♦", "♣", "♠"];
                                
                                // Loop through results and create award cards
                                for ($i = 0; $i < $num; $i++) {
                                    $name = pdoJ_result($stmt, $i, "Name");
                                    $year = pdoJ_result($stmt, $i, "Year");
                                    
                                    // Cycle through suits
                                    $currentSuitIndex = $suitCounter % 4;
                                    $currentSuit = $suits[$currentSuitIndex];
                                    $currentSuitSymbol = $suitSymbols[$currentSuitIndex];
                                    $suitCounter++;
                            ?>
                            <div class="award-card">
                                <div class="award-card-inner">
                                    <div class="award-front">
                                        <div class="nameplate">
                                            <div class="corner top-left"></div>
                                            <div class="corner top-right"></div>
                                            <div class="corner bottom-left"></div>
                                            <div class="corner bottom-right"></div>
                                            <div class="award-name"><?php echo $name; ?></div>
                                            <div class="award-years"><?php echo $year; ?></div>
                                            <div class="award-title">Member of the Year</div>
                                        </div>
                                        <div class="shine"></div>
                                    </div>
                                    <div class="award-back">
                                        <div class="suit <?php echo $currentSuit; ?>"><?php echo $currentSuitSymbol; ?></div>
                                    </div>
                                </div>
                                <div class="sparkle-container">
                                    <div class="sparkle"></div>
                                    <div class="sparkle"></div>
                                    <div class="sparkle"></div>
                                    <div class="sparkle"></div>
                                    <div class="sparkle"></div>
                                    <div class="sparkle"></div>
                                    <div class="sparkle"></div>
                                    <div class="sparkle"></div>
                                </div>
                            </div>
                            <?php
                                }
                            }
                            ?>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Performer of the Year Section -->
    <section id="performer-of-year" class="award-section">
        <div class="content-container">
            <h2>Performer of the Year</h2>
            <div class="content-row">
                <div class="content-col content-col-full">
                    <div class="content-details-card">
                        <p>The Performer of the Year award recognizes exceptional magical talent, consistent excellence in performance, and artistic growth. These recipients have demonstrated outstanding skill, creativity, and showmanship in their magical presentations.</p>
                        
                        <div class="award-container">
                            <?php
                            // Query for Performer of the Year data
                            $query = "SELECT * FROM `HallOfFame` WHERE `PerformerOfYear` = 1 ORDER BY `Year` DESC";
                            $stmt = $pdo->prepare($query);
                            $stmt->execute();
                            $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
                            $num = count($data);
                            
                            if ($num > 0) {
                                $suitCounter = 0;
                                $suits = ["hearts", "diamonds", "clubs", "spades"];
                                $suitSymbols = ["♥", "♦", "♣", "♠"];
                                
                                // Loop through results and create award cards
                                for ($i = 0; $i < $num; $i++) {
                                    $name = pdoJ_result($stmt, $i, "Name");
                                    $year = pdoJ_result($stmt, $i, "Year");
                                    
                                    // Cycle through suits
                                    $currentSuitIndex = $suitCounter % 4;
                                    $currentSuit = $suits[$currentSuitIndex];
                                    $currentSuitSymbol = $suitSymbols[$currentSuitIndex];
                                    $suitCounter++;
                            ?>
                            <div class="award-card">
                                <div class="award-card-inner">
                                    <div class="award-front">
                                        <div class="nameplate">
                                            <div class="corner top-left"></div>
                                            <div class="corner top-right"></div>
                                            <div class="corner bottom-left"></div>
                                            <div class="corner bottom-right"></div>
                                            <div class="award-name"><?php echo $name; ?></div>
                                            <div class="award-years"><?php echo $year; ?></div>
                                            <div class="award-title">Performer of the Year</div>
                                        </div>
                                        <div class="shine"></div>
                                    </div>
                                    <div class="award-back">
                                        <div class="suit <?php echo $currentSuit; ?>"><?php echo $currentSuitSymbol; ?></div>
                                    </div>
                                </div>
                                <div class="sparkle-container">
                                    <div class="sparkle"></div>
                                    <div class="sparkle"></div>
                                    <div class="sparkle"></div>
                                    <div class="sparkle"></div>
                                    <div class="sparkle"></div>
                                    <div class="sparkle"></div>
                                    <div class="sparkle"></div>
                                    <div class="sparkle"></div>
                                </div>
                            </div>
                            <?php
                                }
                            }
                            ?>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Stage Contest Section -->
    <section id="stage-contest" class="award-section">
        <div class="content-container">
            <h2>Stage Contest Winners</h2>
            <div class="content-row">
                <div class="content-col content-col-full">
                    <div class="content-details-card">
                        <p>Our annual Stage Contest showcases the best in theatrical magic, from grand illusions to captivating manipulation acts. These winners have demonstrated exceptional skill in entertaining audiences with their magical performances on stage.</p>
                        
                        <div class="award-container">
                            <?php
                            // Query for Stage Contest data
                            $query = "SELECT * FROM `HallOfFame` WHERE `Stage` = 1 ORDER BY `Year` DESC";
                            $stmt = $pdo->prepare($query);
                            $stmt->execute();
                            $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
                            $num = count($data);
                            
                            if ($num > 0) {
                                $suitCounter = 0;
                                $suits = ["hearts", "diamonds", "clubs", "spades"];
                                $suitSymbols = ["♥", "♦", "♣", "♠"];
                                
                                // Loop through results and create award cards
                                for ($i = 0; $i < $num; $i++) {
                                    $name = pdoJ_result($stmt, $i, "Name");
                                    $year = pdoJ_result($stmt, $i, "Year");
                                    
                                    // Cycle through suits
                                    $currentSuitIndex = $suitCounter % 4;
                                    $currentSuit = $suits[$currentSuitIndex];
                                    $currentSuitSymbol = $suitSymbols[$currentSuitIndex];
                                    $suitCounter++;
                            ?>
                            <div class="award-card">
                                <div class="award-card-inner">
                                    <div class="award-front">
                                        <div class="nameplate">
                                            <div class="corner top-left"></div>
                                            <div class="corner top-right"></div>
                                            <div class="corner bottom-left"></div>
                                            <div class="corner bottom-right"></div>
                                            <div class="award-name"><?php echo $name; ?></div>
                                            <div class="award-years"><?php echo $year; ?></div>
                                            <div class="award-title">Stage Contest Winner</div>
                                        </div>
                                        <div class="shine"></div>
                                    </div>
                                    <div class="award-back">
                                        <div class="suit <?php echo $currentSuit; ?>"><?php echo $currentSuitSymbol; ?></div>
                                    </div>
                                </div>
                                <div class="sparkle-container">
                                    <div class="sparkle"></div>
                                    <div class="sparkle"></div>
                                    <div class="sparkle"></div>
                                    <div class="sparkle"></div>
                                    <div class="sparkle"></div>
                                    <div class="sparkle"></div>
                                    <div class="sparkle"></div>
                                    <div class="sparkle"></div>
                                </div>
                            </div>
                            <?php
                                }
                            }
                            ?>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Close-up Contest Section -->
    <section id="closeup-contest" class="award-section">
        <div class="content-container">
            <h2>Close-up Contest Winners</h2>
            <div class="content-row">
                <div class="content-col content-col-full">
                    <div class="content-details-card">
                        <p>The Close-up Contest celebrates the intimate art of magic performed right before your eyes. These winners have mastered the delicate skills of sleight of hand, misdirection, and audience engagement in the challenging realm of close-up magic.</p>
                        
                        <div class="award-container">
                            <?php
                            // Query for Close-up Contest data
                            $query = "SELECT * FROM `HallOfFame` WHERE `CloseUp` = 1 ORDER BY `Year` DESC";
                            $stmt = $pdo->prepare($query);
                            $stmt->execute();
                            $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
                            $num = count($data);
                            
                            if ($num > 0) {
                                $suitCounter = 0;
                                $suits = ["hearts", "diamonds", "clubs", "spades"];
                                $suitSymbols = ["♥", "♦", "♣", "♠"];
                                
                                // Loop through results and create award cards
                                for ($i = 0; $i < $num; $i++) {
                                    $name = pdoJ_result($stmt, $i, "Name");
                                    $year = pdoJ_result($stmt, $i, "Year");
                                    
                                    // Cycle through suits
                                    $currentSuitIndex = $suitCounter % 4;
                                    $currentSuit = $suits[$currentSuitIndex];
                                    $currentSuitSymbol = $suitSymbols[$currentSuitIndex];
                                    $suitCounter++;
                            ?>
                            <div class="award-card">
                                <div class="award-card-inner">
                                    <div class="award-front">
                                        <div class="nameplate">
                                            <div class="corner top-left"></div>
                                            <div class="corner top-right"></div>
                                            <div class="corner bottom-left"></div>
                                            <div class="corner bottom-right"></div>
                                            <div class="award-name"><?php echo $name; ?></div>
                                            <div class="award-years"><?php echo $year; ?></div>
                                            <div class="award-title">Close-up Contest Winner</div>
                                        </div>
                                        <div class="shine"></div>
                                    </div>
                                    <div class="award-back">
                                        <div class="suit <?php echo $currentSuit; ?>"><?php echo $currentSuitSymbol; ?></div>
                                    </div>
                                </div>
                                <div class="sparkle-container">
                                    <div class="sparkle"></div>
                                    <div class="sparkle"></div>
                                    <div class="sparkle"></div>
                                    <div class="sparkle"></div>
                                    <div class="sparkle"></div>
                                    <div class="sparkle"></div>
                                    <div class="sparkle"></div>
                                    <div class="sparkle"></div>
                                </div>
                            </div>
                            <?php
                                }
                            }
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
</body>
</html>
