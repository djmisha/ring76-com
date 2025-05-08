/* /Users/mosinovs/workspace/ring76-com/src/js/transitions.js */
document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  let curtainContainer = document.querySelector(".curtain-container");

  // Create curtains if they don't exist
  if (!curtainContainer) {
    curtainContainer = document.createElement("div");
    curtainContainer.className = "curtain-container";
    curtainContainer.innerHTML = `
            <div class="curtain left"></div>
            <div class="curtain right"></div>
        `;
    body.appendChild(curtainContainer);
  }

  const performTransition = async (url) => {
    body.classList.add("transitioning");
    body.classList.add("curtains-closed");
    body.classList.remove("curtains-open");

    // Wait for curtains to close
    await new Promise((resolve) => setTimeout(resolve, 1200)); // Duration of CSS transition (increased from 750)

    window.isTransitioning = true; // Set flag before loading new content

    try {
      const response = await fetch(url);
      if (!response.ok) {
        console.error(
          "Failed to fetch page:",
          response.status,
          response.statusText
        );
        // Fallback to regular navigation if fetch fails
        window.location.href = url;
        window.isTransitioning = false; // Clear flag on error before returning
        return;
      }
      const text = await response.text();
      const parser = new DOMParser();
      const newDoc = parser.parseFromString(text, "text/html");
      const newBody = newDoc.body;
      const newTitle = newDoc.title;

      // Replace body content
      // It's important to manage scripts and styles carefully here.
      // For simplicity, this example replaces the entire body.innerHTML.
      // A more robust solution might involve diffing or specific content replacement.
      document.body.innerHTML = newBody.innerHTML;
      document.title = newTitle;

      // Re-create and append curtains to the new body
      curtainContainer = document.createElement("div");
      curtainContainer.className = "curtain-container";
      curtainContainer.innerHTML = `
                <div class="curtain left"></div>
                <div class="curtain right"></div>
            `;
      document.body.appendChild(curtainContainer);
      // Ensure body still has the closed class for the open animation
      document.body.classList.add("transitioning");
      document.body.classList.add("curtains-closed");

      // Update URL
      history.pushState({ path: url }, "", url);

      // Re-initialize any scripts or event listeners if needed for the new content
      // This is a common challenge with AJAX-loaded content.
      // For example, re-attach navigation listeners if they were part of the old body.
      initializePageSpecificScripts(); // Placeholder for re-initialization logic
    } catch (error) {
      console.error("Error during page transition:", error);
      // Fallback to regular navigation on error
      window.location.href = url;
      window.isTransitioning = false; // Clear flag on error before returning
      return;
    }

    // Scroll to top before curtains open
    window.scrollTo(0, 0);

    // Wait a brief moment for the new content to be in place and scroll to happen
    await new Promise((resolve) => setTimeout(resolve, 50));

    body.classList.remove("curtains-closed");
    body.classList.add("curtains-open");

    // Wait for curtains to open
    await new Promise((resolve) => setTimeout(resolve, 1200)); // Duration of CSS transition (increased from 750)
    body.classList.remove("transitioning");
    body.classList.remove("curtains-open"); // Clean up
    // Remove the old curtain container if it was duplicated, ensure only one exists
    const allCurtains = document.querySelectorAll(".curtain-container");
    if (allCurtains.length > 1) {
      allCurtains.forEach((curtain, index) => {
        if (index < allCurtains.length - 1) curtain.remove();
      });
    }
    window.isTransitioning = false; // Clear flag after transition is complete
  };

  document.addEventListener(
    "click",
    (event) => {
      const target = event.target.closest("a");

      if (target && target.href) {
        // Immediately allow default behavior for links meant to open in new tabs or download
        if (
          target.getAttribute("target") === "_blank" ||
          target.hasAttribute("download")
        ) {
          return; // Let the browser handle it, do not preventDefault or transition
        }

        // Only apply transition to internal .php links on the same hostname
        if (
          target.href.endsWith(".php") &&
          target.hostname === window.location.hostname
        ) {
          // Ensure it's not an anchor link on the same page, which should be handled by smooth scroll or default browser behavior
          if (target.pathname === window.location.pathname && target.hash) {
            return;
          }
          event.preventDefault();
          const url = target.href;
          performTransition(url);
        }
        // Other types of links (e.g., #anchor on different page, external non-php, etc.) will just behave normally
      }
    },
    true
  ); // Use capture phase for the event listener

  window.addEventListener("popstate", (event) => {
    // Handle browser back/forward buttons
    if (event.state && event.state.path) {
      performTransition(event.state.path);
    } else {
      // Fallback for initial page load or states without path
      // Or simply reload if the state is not what's expected
      window.location.reload();
    }
  });

  function initializePageSpecificScripts() {
    // This function should re-run any JS needed for the new page content.
    console.log("Re-initializing page-specific scripts...");

    // Call all setup functions from main.js that need to be re-applied to new content
    if (typeof window.setupSmoothScrolling === "function") {
      window.setupSmoothScrolling();
    }
    if (typeof window.setupEventCardHover === "function") {
      window.setupEventCardHover();
    }
    if (typeof window.setupMembershipAnimations === "function") {
      window.setupMembershipAnimations();
    }
    if (typeof window.setupContactForm === "function") {
      // Ensure contact form specific elements like #contact-form and #form-response exist before calling
      if ($("#contact-form").length) {
        window.setupContactForm();
      }
    }
    if (typeof window.setupOwlChatbot === "function") {
      // Ensure chatbot specific elements exist before calling
      if ($(".owl-chatbot").length) {
        window.setupOwlChatbot();
      }
    }
    if (typeof window.setupHeaderEyes === "function") {
      // Header eyes are likely in the header, which might be part of the body replacement
      // or static. If they are part of the replaced body, they need re-init.
      if ($(".magic-eyes").length) {
        window.setupHeaderEyes();
      }
    }
    if (typeof window.setupArtFormHover === "function") {
      window.setupArtFormHover();
    }
    if (typeof window.setupHamburgerMenu === "function") {
      // Hamburger menu is likely in the header, similar to header eyes.
      if ($(".hamburger-menu").length) {
        window.setupHamburgerMenu();
      }
    }
    if (typeof window.setupMagicTricks === "function") {
      window.setupMagicTricks();
    }
    if (typeof window.setupBackToTopButton === "function") {
      // Back to top button might be added dynamically or exist in the footer.
      if ($("#back-to-top-btn").length) {
        window.setupBackToTopButton();
      }
    }

    // Custom page-specific initializers
    if (typeof window.initializeLinksPageLogic === "function") {
      window.initializeLinksPageLogic();
    }

    console.log("Page specific scripts re-initialized.");

    // Re-attach curtain container to the body if it was lost during innerHTML replacement
    // This is already handled by re-creating it in performTransition, but as a safeguard:
    if (!document.querySelector(".curtain-container")) {
      const newCurtainContainer = document.createElement("div");
      newCurtainContainer.className = "curtain-container";
      newCurtainContainer.innerHTML = `
                <div class="curtain left"></div>
                <div class="curtain right"></div>
            `;
      document.body.appendChild(newCurtainContainer);
    }
  }

  // Initial curtain setup for the first page load (optional, if you want them to open on first load)
  // setTimeout(() => {
  //     body.classList.add('curtains-open');
  // }, 50); // Small delay to ensure styles are applied
});
