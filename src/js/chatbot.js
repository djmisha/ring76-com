window.setupOwlChatbot = function () {
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

  $(".owl-avatar")
    .off("click")
    .on("click", function () {
      $(".chat-window").fadeToggle(300);
      pulseOwl();
      $(".suggestion-tags").show();
    });

  $(".close-chat")
    .off("click")
    .on("click", function () {
      $(".chat-window").fadeOut(300);
      setTimeout(function () {
        $(".chat-messages .message:not(:first-child)").remove();
        $(".suggestion-tags").show();
      }, 300);
    });

  $(".send-btn").off("click").on("click", sendMessage);
  $(".chat-input input")
    .off("keypress")
    .on("keypress", function (e) {
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

  if (window.owlPulseInterval) clearInterval(window.owlPulseInterval);
  if (window.owlShakeTimeout) clearTimeout(window.owlShakeTimeout);

  pulseOwl();

  window.owlPulseInterval = setInterval(function () {
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
      window.owlShakeTimeout = setTimeout(function () {
        shakeOwl();
        scheduleNextShake();
      }, randomDelay);
    }
    if (
      $(".owl-chatbot").length > 0 &&
      !$(".owl-chatbot").data("randomMovementsSetup")
    ) {
      $(".owl-chatbot")
        .css({
          bottom: "20px",
          right: "20px",
          opacity: 1,
        })
        .data("randomMovementsSetup", true);
      scheduleNextShake();
    }
  }
  setupRandomMovements();

  $(".owl-chatbot")
    .off("mouseenter mouseleave")
    .hover(
      function () {
        $(this).addClass("owl-hover");
      },
      function () {
        $(this).removeClass("owl-hover");
      }
    );

  $(".owl-avatar")
    .off("click.owlSpecific")
    .on("click.owlSpecific", function () {
      $(".owl-chatbot").stop(true, true).css({
        opacity: 1,
        right: "20px",
      });
      $(".chat-window").fadeToggle(300);
      pulseOwl();
    });

  $(".tag")
    .off("click")
    .on("click", function () {
      const query = $(this).data("query");
      const tagText = $(this).text();
      $(".chat-input input").val(tagText);
      sendMessage();
      $(".suggestion-tags").hide();
    });
};
