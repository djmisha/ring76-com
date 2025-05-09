/**
 * Particle Manager - Manages the particles.js library for Ring 76
 */
document.addEventListener("DOMContentLoaded", function () {
  // Set up particles container
  const setupParticlesContainer = () => {
    // Check if container already exists
    if (document.getElementById("particles-js")) {
      return;
    }

    // Create particles container
    const particlesContainer = document.createElement("div");
    particlesContainer.id = "particles-js";
    particlesContainer.style.position = "fixed";
    particlesContainer.style.top = "0";
    particlesContainer.style.left = "0";
    particlesContainer.style.width = "100%";
    particlesContainer.style.height = "100%";
    particlesContainer.style.zIndex = "999"; // Keep particles on top
    particlesContainer.style.pointerEvents = "none";
    particlesContainer.style.display = "none";
    document.body.prepend(particlesContainer);
  };

  // Define colorful particle configuration
  const particlesConfig = {
    particles: {
      number: {
        value: 200,
        density: {
          enable: true,
          value_area: 800,
        },
      },
      color: {
        value: [
          "#FF0000", // Red
          "#00FF00", // Green
          "#0000FF", // Blue
          "#FFFF00", // Yellow
          "#FF00FF", // Magenta
          "#00FFFF", // Cyan
          "#FFA500", // Orange
          "#800080", // Purple
          "#008000", // Dark Green
          "#FFC0CB", // Pink
        ],
      },
      shape: {
        type: "circle",
        stroke: {
          width: 0,
          color: "#000000",
        },
        polygon: {
          nb_sides: 5,
        },
      },
      opacity: {
        value: 0.7,
        random: true,
        anim: {
          enable: true,
          speed: 1,
          opacity_min: 0.1,
          sync: false,
        },
      },
      size: {
        value: 8,
        random: true,
        anim: {
          enable: true,
          speed: 5,
          size_min: 1,
          sync: false,
        },
      },
      line_linked: {
        enable: false,
        distance: 150,
        color: "#ffffff",
        opacity: 0.4,
        width: 1,
      },
      move: {
        enable: true,
        speed: 4,
        direction: "bottom",
        random: true,
        straight: false,
        out_mode: "out",
        bounce: false,
        attract: {
          enable: true,
          rotateX: 600,
          rotateY: 1200,
        },
      },
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: {
          enable: true,
          mode: "bubble",
        },
        onclick: {
          enable: true,
          mode: "repulse",
        },
        resize: true,
      },
      modes: {
        grab: {
          distance: 400,
          line_linked: {
            opacity: 0.5,
          },
        },
        bubble: {
          distance: 200,
          size: 12,
          duration: 0.3,
          opacity: 0.8,
          speed: 3,
        },
        repulse: {
          distance: 200,
          duration: 0.4,
        },
        push: {
          particles_nb: 4,
        },
        remove: {
          particles_nb: 2,
        },
      },
    },
    retina_detect: true,
  };

  // Initialize particles
  const initParticles = () => {
    const particlesContainer = document.getElementById("particles-js");

    if (particlesContainer.style.display === "none") {
      particlesContainer.style.display = "block";

      // Initialize directly with the configuration object
      particlesJS("particles-js", particlesConfig);
      console.log("Particles.js initialized with colorful configuration");

      // Animate the magic eyes to indicate particles are active
      const magicEyes = document.querySelector(".magic-eyes");
      if (magicEyes) {
        magicEyes.classList.add("particles-active");
      }
    } else {
      particlesContainer.style.display = "none";

      // Remove the active class from magic eyes
      const magicEyes = document.querySelector(".magic-eyes");
      if (magicEyes) {
        magicEyes.classList.remove("particles-active");
      }
    }
  };

  // Setup particles container
  setupParticlesContainer();

  // Add event listener to the magic eyes
  const magicEyes = document.querySelector(".magic-eyes");
  if (magicEyes) {
    magicEyes.addEventListener("click", function (e) {
      e.preventDefault();
      initParticles();

      // Add special cursor to indicate it's clickable
      if (!magicEyes.style.cursor) {
        magicEyes.style.cursor = "pointer";
      }
    });

    // Add cursor style to indicate the eyes are clickable
    magicEyes.style.cursor = "pointer";

    // Add a title attribute for accessibility
    magicEyes.setAttribute("title", "Toggle magical particles");
  }
});
