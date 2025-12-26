document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".php-email-form");
  if (!form) return;

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const loading = form.querySelector(".loading");
    const errorMessage = form.querySelector(".error-message");
    const sentMessage = form.querySelector(".sent-message");

    // Reset UI
    loading.style.display = "block";
    errorMessage.style.display = "none";
    sentMessage.style.display = "none";
    errorMessage.textContent = "";

    const formData = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: formData,
        headers: {
          "Accept": "application/json"
        }
      });

      const data = await response.json();
      loading.style.display = "none";

      if (data.ok) {
        sentMessage.style.display = "block";
        form.reset();
      } else {
        errorMessage.textContent = "Submission failed. Please try again.";
        errorMessage.style.display = "block";
      }

    } catch (error) {
      loading.style.display = "none";
      errorMessage.textContent = "Network error. Please try again later.";
      errorMessage.style.display = "block";
    }
  });
});
