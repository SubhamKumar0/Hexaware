// Handle profile picture upload
const profilePic = document.getElementById("profile-pic");
const profileImageUpload = document.getElementById("profile-image-upload");

// When profile picture is clicked, trigger the hidden file input
profilePic.addEventListener("click", () => {
  profileImageUpload.click();
});

// Display selected image as profile picture
profileImageUpload.addEventListener("change", (event) => {
  const reader = new FileReader();
  reader.onload = function () {
    profilePic.src = reader.result; // Update the image src with the selected image
  };
  if (event.target.files[0]) {
    reader.readAsDataURL(event.target.files[0]);
  }
});

// Handle adding new certificate
const addCertificateBtn = document.getElementById("add-certificate-btn");
const newCertificateUpload = document.getElementById("new-certificate-upload");
const certificatesList = document.getElementById("certificates-list");
const certificateUploadMessage = document.getElementById(
  "certificate-upload-message"
);

// Simulate uploaded certificates storage
let certificates = [
  { name: "AWS Certification", url: "#" },
  { name: "Python for Data Science Certificate", url: "#" },
];

// Function to render certificates list
function renderCertificates() {
  certificatesList.innerHTML = "";
  certificates.forEach((cert, index) => {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = cert.name;
    li.appendChild(span);

    const changeBtn = document.createElement("button");
    changeBtn.classList.add("change-certificate");
    changeBtn.innerHTML = `<i class="material-icons">edit</i> Change`;
    changeBtn.addEventListener("click", () => {
      changeCertificate(index);
    });
    li.appendChild(changeBtn);

    const removeBtn = document.createElement("button");
    removeBtn.classList.add("remove-certificate");
    removeBtn.innerHTML = `<i class="material-icons">delete</i> Remove`;
    removeBtn.addEventListener("click", () => {
      removeCertificate(index);
    });
    li.appendChild(removeBtn);

    certificatesList.appendChild(li);
  });
}

// Initial render
renderCertificates();

// Handle Add Certificate button click
addCertificateBtn.addEventListener("click", () => {
  newCertificateUpload.click();
});

// Handle new certificate upload
newCertificateUpload.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (file && file.type === "application/pdf") {
    // For demonstration, we'll just use the file name
    const certName = file.name.replace(/\.[^/.]+$/, ""); // Remove extension
    certificates.push({ name: certName, url: "#" });
    renderCertificates();
    certificateUploadMessage.textContent = "Certificate added successfully!";
    certificateUploadMessage.style.color = "green";
    // Reset the file input
    newCertificateUpload.value = "";
  } else {
    certificateUploadMessage.textContent = "Please upload a valid PDF file.";
    certificateUploadMessage.style.color = "red";
  }
});

// Function to remove a certificate
function removeCertificate(index) {
  if (confirm("Are you sure you want to remove this certificate?")) {
    certificates.splice(index, 1);
    renderCertificates();
    certificateUploadMessage.textContent = "Certificate removed successfully!";
    certificateUploadMessage.style.color = "green";
  }
}

// Function to change a certificate
function changeCertificate(index) {
  const changeInput = document.createElement("input");
  changeInput.type = "file";
  changeInput.accept = "application/pdf";
  changeInput.classList.add("hidden");

  changeInput.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      const certName = file.name.replace(/\.[^/.]+$/, ""); // Remove extension
      certificates[index].name = certName;
      certificates[index].url = "#"; // Update URL if needed
      renderCertificates();
      certificateUploadMessage.textContent =
        "Certificate updated successfully!";
      certificateUploadMessage.style.color = "green";
    } else {
      certificateUploadMessage.textContent = "Please upload a valid PDF file.";
      certificateUploadMessage.style.color = "red";
    }
  });

  // Trigger the file input
  changeInput.click();
}
