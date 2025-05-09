window.setupContactForm = function () {
  if ($("#contact-form").length > 0) {
    const contactForm = $("#contact-form");

    contactForm.off("submit").on("submit", function (e) {
      e.preventDefault();

      if (validateForm()) {
        if ($("#website").val().length > 0) {
          console.log("Bot submission detected");
          showFormResponse("success", "Thank you for your message!");
          return false;
        }

        const formData = $(this).serialize();

        $.ajax({
          url: $(this).attr("action"),
          method: "POST",
          data: formData,
          dataType: "json",
          success: function (response) {
            if (response.success) {
              contactForm[0].reset();
              showFormResponse("success", response.message);
            } else {
              showFormResponse(
                "error",
                response.message ||
                  "There was an error sending your message. Please try again."
              );
            }
          },
          error: function () {
            showFormResponse(
              "error",
              "There was an error sending your message. Please try again."
            );
          },
        });
      }

      return false;
    });

    $("#name, #email, #message")
      .off("blur")
      .on("blur", function () {
        validateField($(this));
      });

    function validateForm() {
      let isValid = true;
      if (!validateField($("#name"))) isValid = false;
      if (!validateField($("#email"))) isValid = false;
      if (!validateField($("#message"))) isValid = false;
      return isValid;
    }

    function validateField($field) {
      const fieldId = $field.attr("id");
      const value = $field.val().trim();
      const $errorElement = $("#" + fieldId + "-error");
      const $formGroup = $field.closest(".form-group");

      $formGroup.removeClass("has-error");
      $errorElement.text("");

      switch (fieldId) {
        case "name":
          if (value === "") {
            $errorElement.text("Please enter your name");
            $formGroup.addClass("has-error");
            return false;
          }
          break;
        case "email":
          if (value === "") {
            $errorElement.text("Please enter your email address");
            $formGroup.addClass("has-error");
            return false;
          } else if (!isValidEmail(value)) {
            $errorElement.text("Please enter a valid email address");
            $formGroup.addClass("has-error");
            return false;
          }
          break;
        case "message":
          if (value === "") {
            $errorElement.text("Please enter your message");
            $formGroup.addClass("has-error");
            return false;
          }
          break;
      }
      return true;
    }

    function isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }

    function showFormResponse(type, message) {
      const $formResponse = $("#form-response");
      $formResponse.removeClass("success error").addClass(type);
      $formResponse.html("<p>" + message + "</p>").slideDown();
      if (type === "success") {
        setTimeout(function () {
          $formResponse.slideUp();
        }, 5000);
      }
    }
  }
};
