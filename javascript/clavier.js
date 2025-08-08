function add(number) {
  const passwordInput = document.getElementById("password");
  const usernameInput = document.getElementById("username");

  if (passwordInput.value.length < 6) {
    passwordInput.value += number;
  }

  if (passwordInput.value.length === 6 && usernameInput.value.length === 10) {
    window.location.href = "compte.html";
  }
}

// Prevent keyboard input in the password field
document.addEventListener("DOMContentLoaded", () => {
  const passwordInput = document.getElementById("password");
  passwordInput.addEventListener("keypress", (e) => {
    e.preventDefault();
  });

  const usernameInput = document.getElementById("username");
  usernameInput.addEventListener("input", () => {
    if (usernameInput.value.length > 10) {
      usernameInput.value = usernameInput.value.slice(0, 10);
    }
  });
});
