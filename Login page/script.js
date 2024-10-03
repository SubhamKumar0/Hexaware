document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent form from submitting

  // Get input values
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  // Simple validation
  if (username === "" || password === "") {
    displayError("Both fields are required.");
  } else if (username.length < 3 || password.length < 6) {
    displayError(
      "Username must be at least 3 characters and password must be at least 6 characters long."
    );
  } else {
    // Process login (you can add more logic here)
    alert("Login successful!");
  }
});

// Function to display error messages
function displayError(message) {
  const errorMessage = document.getElementById("error-message");
  errorMessage.textContent = message;
  errorMessage.style.color = "red";
}
