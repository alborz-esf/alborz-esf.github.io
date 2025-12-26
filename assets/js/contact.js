document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".php-email-form");
  if (!form) return;

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const loading = form.querySelector(".loading");
    const errorMessage = form.querySelector(".error-message");
    const sentMessage = form.querySelector(".sent-message");

    loading.style.display = "block";
    errorMessage.style.display = "none";
    sentMessage.style.display = "none";

    const formData = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: formData,
        headers: {
          "Accept": "application/json"
        }
      });

      loading.style.display = "none";

      if (response.ok) {
        sentMessage.style.display = "block";
        form.reset();
      } else {
        errorMessage.textContent = "Something went wrong. Please try again.";
        errorMessage.style.display = "block";
      }
    } catch (error) {
      loading.style.display = "none";
      errorMessage.textContent = "Network error. Please try again later.";
      errorMessage.style.display = "block";
    }
  });
});
