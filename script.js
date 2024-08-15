function toggleNavbar() {
  const dropdownContent = document.getElementById("dropdown-content");
  const topNavbar = document.querySelector(".navbar");

  if (!dropdownContent) {
    console.error("dropdownContent element not found");
    return;
  }

  if (!dropdownContent.classList.contains("visible")) {
    // Show dropdown
    fetch('hamburgonclick.html')
      .then(response => response.text())
      .then(data => {
        dropdownContent.innerHTML = data + '<button class="cross-button">&#x2715;</button>';
        dropdownContent.classList.add("visible");

        const crossButton = document.querySelector(".cross-button");
        crossButton.addEventListener("click", toggleNavbar);

        // Ensure the transition starts after the content is loaded
        requestAnimationFrame(() => {
          dropdownContent.style.transform = "translateY(0)";
          dropdownContent.style.opacity = "1";
        });
      })
      .catch(error => console.error('Error loading the HTML file:', error));
  } else {
    // Hide dropdown
    dropdownContent.style.transform = "translateY(-100%)";
    dropdownContent.style.opacity = "0";

    // Wait for the transition to end before clearing the content
    setTimeout(() => {
      dropdownContent.classList.remove("visible");
      dropdownContent.innerHTML = ''; // Clear the content when hiding
    }, 500); // Match the transition duration
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector(".hamburger");
  hamburger.addEventListener("click", toggleNavbar);
});