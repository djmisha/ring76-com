$(document).ready(function () {
  // Fix the smooth scrolling code to handle empty "#" links
  $('a[href^="#"]').on("click", function (event) {
    event.preventDefault();

    var href = this.getAttribute("href");

    // Handle the case where href is just "#"
    if (href === "#") {
      // Scroll to top of page
      $("html, body").animate(
        {
          scrollTop: 0,
        },
        800
      );
      return;
    }

    // Otherwise proceed with normal anchor link behavior
    var target = $(href);

    if (target.length) {
      $("html, body").animate(
        {
          scrollTop: target.offset().top - 80,
        },
        800
      );
    }
  });

  $(".event-card").hover(
    function () {
      $(this).find("h3").css("color", "#c41212");
    },
    function () {
      $(this).find("h3").css("color", "");
    }
  );

  $(window).scroll(function () {
    var scrollPosition = $(this).scrollTop();

    if ($(".membership-section").length) {
      var sectionPosition = $(".membership-section").offset().top;

      if (scrollPosition > sectionPosition - 500) {
        $(".benefit").each(function (i) {
          setTimeout(
            function (element) {
              $(element).addClass("visible");
            },
            i * 200,
            this
          );
        });
      }
    }
  });

  $(".benefit").addClass("benefit-animation");

  const owlResponses = {
    hello: "Hello! How can I help you with magic today?",
    hi: "Hi there! How can I assist you with your magical interests?",
    help: "I can help you learn about our club, upcoming events, or membership benefits. What would you like to know?",
    membership:
      "Joining Ring 76 gives you access to monthly meetings, learning resources, mentorship, performance opportunities, and more!",
    events:
      "We have several exciting events coming up, including Mini-Lectures, Stage Contests, and our annual Installation Banquet.",
    magic:
      "Magic is the art of creating illusions and wonder. Our club is dedicated to advancing this beautiful art form.",
    joke: function () {
      const jokes = [
        "Why don't magicians reveal their secrets? They're afraid no one will conjure up a laugh!",
        "What do you call a magician who lost their magic? Ian.",
        "Did you hear about the magician who was walking down the stairs? He tripped and fell into a trick!",
        "Why did the magician become a gardener? They wanted to try their hand at plant-based magic.",
        "How do magicians pay their bills? With trick-le down economics!",
        "A magician was driving down the road... then he turned into a driveway.",
        "What did the magician say when his rabbit disappeared? 'Hare today, gone tomorrow!'",
        "Why did the magician join the construction crew? To learn about building suspense.",
      ];
      return jokes[Math.floor(Math.random() * jokes.length)];
    },
    default:
      "I'm still learning about magic. Please ask me something else or contact our club for more information.",
  };

  $(".owl-avatar").on("click", function () {
    $(".chat-window").fadeToggle(300);
    pulseOwl();

    $(".suggestion-tags").show();
  });

  $(".close-chat").on("click", function () {
    $(".chat-window").fadeOut(300);

    setTimeout(function () {
      $(".chat-messages .message:not(:first-child)").remove();
      $(".suggestion-tags").show();
    }, 300);
  });

  $(".send-btn").on("click", sendMessage);
  $(".chat-input input").on("keypress", function (e) {
    if (e.which === 13) {
      sendMessage();
    }
  });

  function sendMessage() {
    const userInput = $(".chat-input input").val().trim();
    if (userInput === "") return;

    $(".chat-messages").append(`<div class="message user">${userInput}</div>`);
    $(".chat-input input").val("");

    $(".suggestion-tags").hide();

    $(".chat-messages").scrollTop($(".chat-messages")[0].scrollHeight);

    setTimeout(function () {
      let botResponse = getBotResponse(userInput.toLowerCase());

      $(".chat-messages").append(
        `<div class="message bot">${botResponse}</div>`
      );

      if (
        botResponse.includes("contact our club") ||
        botResponse.includes("anything else")
      ) {
        setTimeout(() => {
          $(".suggestion-tags").show();
          $(".chat-messages").scrollTop($(".chat-messages")[0].scrollHeight);
        }, 500);
      }

      $(".chat-messages").scrollTop($(".chat-messages")[0].scrollHeight);

      pulseOwl();
    }, 800);
  }

  function getBotResponse(input) {
    for (let keyword in owlResponses) {
      if (input.includes(keyword)) {
        return typeof owlResponses[keyword] === "function"
          ? owlResponses[keyword]()
          : owlResponses[keyword];
      }
    }
    return owlResponses.default;
  }

  function pulseOwl() {
    $(".owl-emoji").css("transform", "scale(1.2)");

    setTimeout(function () {
      $(".owl-emoji").css("transform", "scale(1)");
    }, 200);
  }

  pulseOwl();

  setInterval(function () {
    if (Math.random() < 0.2) {
      pulseOwl();
    }
  }, 5000);

  function shakeOwl() {
    if ($(".chat-window").is(":hidden")) {
      const shakeSequence = [
        { right: "15px" },
        { right: "25px" },
        { right: "15px" },
        { right: "25px" },
        { right: "20px" },
      ];

      const shakeDurations = [100, 100, 100, 100, 100];

      let sequenceIndex = 0;

      function nextShake() {
        if (sequenceIndex < shakeSequence.length) {
          $(".owl-chatbot").animate(
            shakeSequence[sequenceIndex],
            shakeDurations[sequenceIndex],
            function () {
              sequenceIndex++;
              nextShake();
            }
          );
        } else {
          $(".owl-chatbot")
            .animate({ right: "18px" }, 150)
            .animate({ right: "20px" }, 150);

          setTimeout(function () {
            pulseOwl();
          }, 100);
        }
      }

      nextShake();
    }
  }

  function setupRandomMovements() {
    function scheduleNextShake() {
      const minDelay = 8000;
      const maxDelay = 15000;
      const randomDelay =
        Math.floor(Math.random() * (maxDelay - minDelay)) + minDelay;

      setTimeout(function () {
        shakeOwl();
        scheduleNextShake();
      }, randomDelay);
    }

    $(".owl-chatbot").css({
      bottom: "20px",
      right: "20px",
      opacity: 1,
    });

    scheduleNextShake();
  }

  setupRandomMovements();

  $(".owl-chatbot").hover(
    function () {
      $(this).addClass("owl-hover");
    },
    function () {
      $(this).removeClass("owl-hover");
    }
  );

  $(".owl-avatar")
    .off("click")
    .on("click", function () {
      $(".owl-chatbot").stop(true, true).css({
        opacity: 1,
        right: "20px",
      });

      $(".chat-window").fadeToggle(300);
      pulseOwl();
    });

  $(".tag").on("click", function () {
    const query = $(this).data("query");

    const tagText = $(this).text();
    $(".chat-input input").val(tagText);
    sendMessage();

    $(".suggestion-tags").hide();
  });

  // Fix the magic eyes to properly follow mouse movement while also having random position on hover
  function setupHeaderEyes() {
    setTimeout(function () {
      $(".magic-eyes").css("transform", "translate(-50%, -50%) scale(1.2)");
      setTimeout(function () {
        $(".magic-eyes").css("transform", "translate(-50%, -50%)");
      }, 500);
    }, 1000);

    // Restore mouse movement tracking for pupils - this should not be removed
    $(document).mousemove(function (e) {
      $(".magic-eyes .pupil").each(function () {
        const pupil = $(this);
        const eye = pupil.parent();
        const eyeRect = eye[0].getBoundingClientRect();

        const eyeCenterX = eyeRect.left + eyeRect.width / 2;
        const eyeCenterY = eyeRect.top + eyeRect.height / 2;

        const deltaX = e.clientX - eyeCenterX;
        const deltaY = e.clientY - eyeCenterY;

        const angle = Math.atan2(deltaY, deltaX);

        const eyeRadius = eye.width() / 2;
        const maxDistance = eyeRadius - pupil.width() / 2;
        const distance = Math.min(
          Math.sqrt(deltaX * deltaX + deltaY * deltaY) / 5,
          maxDistance
        );

        const pupilX = Math.cos(angle) * distance;
        const pupilY = Math.sin(angle) * distance;

        pupil.css(
          "transform",
          `translate(calc(-50% + ${pupilX}px), calc(-50% + ${pupilY}px))`
        );
      });
    });

    function randomBlink() {
      const minDelay = 2000;
      const maxDelay = 6000;
      const randomDelay =
        Math.floor(Math.random() * (maxDelay - minDelay)) + minDelay;

      setTimeout(function () {
        $(".magic-eyes .eye").addClass("blinking");

        setTimeout(function () {
          $(".magic-eyes .eye").removeClass("blinking");
        }, 500); // Increased from 200ms to 500ms for more visible blinking

        randomBlink();
      }, randomDelay);
    }

    setTimeout(function () {
      $(".magic-eyes .eye").addClass("blinking");
      setTimeout(function () {
        $(".magic-eyes .eye").removeClass("blinking");
      }, 500); // Increased from 200ms to 500ms
    }, 1000);

    randomBlink();
  }

  setupHeaderEyes();

  $(".art-form").hover(
    function () {
      $(this).find(".art-icon").addClass("active");
    },
    function () {
      $(this).find(".art-icon").removeClass("active");
    }
  );

  $(window).scroll(function () {
    var scrollPosition = $(this).scrollTop();

    if ($("#magic-arts").length) {
      var sectionPosition = $("#magic-arts").offset().top;

      if (scrollPosition > sectionPosition - 500) {
        $(".art-form").each(function (i) {});
      }
    }
  });

  // Revert magic eyes to random movement on hover
  // const magicEyes = $(".magic-eyes");
  // if (magicEyes.length) {
  //   // Add hover event listener for random movement, but don't remove the mousemove handler
  //   magicEyes.on("mouseenter", function () {
  //     // Generate random position
  //     const randomTop = Math.floor(Math.random() * 80) + 10; // Between 10% and 90% of viewport height
  //     const randomLeft = Math.floor(Math.random() * 80) + 10; // Between 10% and 90% of viewport width

  //     // Add moving class for smoother animation
  //     $(this).addClass("moving");

  //     // Move the eyes to new random position
  //     $(this).css({
  //       top: randomTop + "vh",
  //       left: randomLeft + "vw",
  //     });

  //     // Make eyes blink when they move
  //     $(".magic-eyes .eye").addClass("blinking");

  //     setTimeout(function () {
  //       $(".magic-eyes .eye").removeClass("blinking");
  //       magicEyes.removeClass("moving");
  //     }, 200);
  //   });
  // }

  // Hamburger menu functionality
  $(".hamburger-menu").on("click", function () {
    $(this).toggleClass("active");
    $(".main-nav").toggleClass("open");
  });

  // Close mobile menu when clicking a link
  $(".main-nav a").on("click", function () {
    $(".hamburger-menu").removeClass("active");
    $(".main-nav").removeClass("open");
  });

  // Close mobile menu when clicking outside
  $(document).on("click", function (event) {
    if (
      !$(event.target).closest(".hamburger-menu").length &&
      !$(event.target).closest(".main-nav").length &&
      $(".main-nav").hasClass("open")
    ) {
      $(".hamburger-menu").removeClass("active");
      $(".main-nav").removeClass("open");
    }
  });

  // Magic trick - flip the entire site upside down
  $("#flip-trick").on("click", function (e) {
    e.preventDefault();

    // Add magic sparkle effect
    const sparkleDuration = 1000;

    // Create sparkles
    for (let i = 0; i < 50; i++) {
      createSparkle();
    }

    // Play magic sound
    const magicSound = new Audio("sounds/magic.mp3");
    try {
      magicSound.play().catch(function (error) {
        console.log("Audio couldn't play: ", error);
      });
    } catch (err) {
      console.log("Audio error: ", err);
    }

    // Wait for sparkles, then flip
    setTimeout(function () {
      // Toggle the upside-down class on the body
      $("body").toggleClass("magic-upside-down");

      // Add a message that appears
      if ($("body").hasClass("magic-upside-down")) {
        $("<div>", {
          class: "magic-message",
          html: "You've been magically flipped! <a href='#' id='restore-magic'>Restore</a>",
        }).appendTo("body");

        // Add listener to restore link
        $("#restore-magic").on("click", function (e) {
          e.preventDefault();
          $("body").removeClass("magic-upside-down");
          $(".magic-message").remove();
        });
      } else {
        $(".magic-message").remove();
      }
    }, sparkleDuration);

    // Function to create a single sparkle
    function createSparkle() {
      const sparkle = $("<div>", { class: "magic-sparkle" });

      // Random position across the screen
      const xPos = Math.random() * window.innerWidth;
      const yPos = Math.random() * window.innerHeight;

      // Random size
      const size = Math.random() * 10 + 5;

      // Random color
      const colors = ["#d4ac0d", "#8b0000", "#fff", "#ffc107"];
      const color = colors[Math.floor(Math.random() * colors.length)];

      sparkle.css({
        left: xPos + "px",
        top: yPos + "px",
        width: size + "px",
        height: size + "px",
        backgroundColor: color,
      });

      // Add to body
      sparkle.appendTo("body");

      // Animate and remove
      setTimeout(function () {
        sparkle.remove();
      }, sparkleDuration);
    }
  });
});

// Add CSS rules to the document
$("<style>")
  .prop("type", "text/css")
  .html(
    `
    .magic-upside-down {
      transform: rotate(180deg);
      transition: transform 1s cubic-bezier(0.68, -0.55, 0.27, 1.55);
    }
    
    .magic-sparkle {
      position: fixed;
      border-radius: 50%;
      z-index: 9999;
      pointer-events: none;
      animation: sparkle 1s forwards;
    }
    
    @keyframes sparkle {
      0% { 
        opacity: 0;
        transform: scale(0) rotate(0deg); 
      }
      50% { 
        opacity: 1; 
        transform: scale(1) rotate(180deg);
      }
      100% { 
        opacity: 0; 
        transform: scale(0) rotate(360deg);
      }
    }
    
    .magic-message {
      position: fixed;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      background-color: #d4ac0d;
      color: #111;
      padding: 10px 20px;
      border-radius: 20px;
      font-family: 'Lobster Two', cursive;
      font-size: 18px;
      box-shadow: 0 5px 15px rgba(0,0,0,0.3);
      z-index: 10000;
      text-align: center;
    }
    
    .magic-message a {
      color: #8b0000;
      text-decoration: underline;
      font-weight: bold;
    }
  `
  )
  .appendTo("head");
