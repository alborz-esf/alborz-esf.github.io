document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".php-email-form");
  if (!form) return;
  
  async function handleSubmit(event) {
    event.preventDefault();
    const loading = form.querySelector(".loading");
    var status = document.getElementById("my-form-status");
    var data = new FormData(event.target);
    loading.style.display = "block";
    fetch(event.target.action, {
      method: form.method,
      body: data,
      headers: {
          'Accept': 'application/json'
      }
    }).then(response => {
      loading.style.display = "none";
      if (response.ok) {
        status.innerHTML = "Thanks for your submission!";
        form.reset()
      } else {
        response.json().then(data => {
          if (Object.hasOwn(data, 'errors')) {
            status.innerHTML = data["errors"].map(error => error["message"]).join(", ")
          } else {
            status.innerHTML = "Oops! There was a problem submitting your form"
          }
        })
      }
    }).catch(error => {
      loading.style.display = "none";
      status.innerHTML = "Oops! There was a problem submitting your form"
    });
  }
  form.addEventListener("submit", handleSubmit)
});
