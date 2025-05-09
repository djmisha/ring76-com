// links.js - Handles functionality for the links page
(function () {
  // Initialize links page functionality
  window.setupLinksPage = function () {
    // Only initialize if we have the links page elements
    const linkFilters = document.querySelectorAll("#link-filter a");
    const linkFilterNav = document.getElementById("link-filter-nav");
    const linksHeading = document.getElementById("links-heading");
    const linksDisplay = document.getElementById("links-display");

    if (
      !linkFilters.length ||
      !linkFilterNav ||
      !linksHeading ||
      !linksDisplay
    ) {
      return;
    }

    // Function to show a specific category and hide others
    function showCategory(type) {
      // Update heading
      const activeFilterLink = document.querySelector(
        `#link-filter a[data-type="${type}"]`
      );
      linksHeading.textContent =
        type === "all"
          ? "All Links"
          : activeFilterLink
          ? activeFilterLink.textContent
          : "Links";

      // Hide all categories
      document.querySelectorAll(".links-category").forEach((category) => {
        category.style.display = "none";
        category.classList.remove("active");
      });

      // Show the selected category
      const selectedCategory = document.getElementById(`links-${type}`);
      if (selectedCategory) {
        selectedCategory.style.display = "block";
        selectedCategory.classList.add("active");

        // Scroll to the links display container, not to the top of page
        setTimeout(() => {
          // Using setTimeout to ensure DOM is updated before scrolling
          linksDisplay.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 10);
      }
    }

    // Set up click handlers for filters
    linkFilters.forEach((link) => {
      link.addEventListener("click", function (event) {
        event.preventDefault();

        // Update active state in navigation
        linkFilters.forEach((l) => l.classList.remove("active"));
        this.classList.add("active");

        // Show the appropriate category
        showCategory(this.dataset.type);
      });
    });

    // Make sure "All Links" is active and displayed by default
    const allLinksCategory = document.getElementById("links-all");
    if (allLinksCategory) {
      allLinksCategory.style.display = "block";
      allLinksCategory.classList.add("active");
    }
  };
})();
