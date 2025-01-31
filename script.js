// script.js

// Function to handle form submission
document.getElementById('form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission behavior
    
    // Get form input values
    const name = document.querySelector('input[name="name"]').value;
    const email = document.querySelector('input[name="email"]').value;
    const message = document.querySelector('textarea[name="message"]').value;

    // Validate input fields
    if (name.trim() === "" || email.trim() === "" || message.trim() === "") {
        displayResponseMessage("Please fill in all fields.", "error");
    } else if (!validateEmail(email)) {
        displayResponseMessage("Please enter a valid email address.", "error");
    } else if (message.length < 10) {
        displayResponseMessage("Your message is too short. Please provide more details.", "error");
    } else if (message.length > 500) {
        displayResponseMessage("Your message is too long. Please shorten it to under 500 characters.", "error");
    } else {
        // Show loading spinner
        showLoadingState(true);

        // Simulate form submission (this could be replaced with actual form submission logic)
        setTimeout(() => {
            // Simulate successful form submission
            displayResponseMessage("Thank you! Your message has been sent.", "success");

            // Clear the form
            document.getElementById('form').reset();

            // Reset character count
            updateCharacterCount();

            // Hide loading spinner
            showLoadingState(false);
        }, 2000); // Simulate a delay (2 seconds)
    }
});

// Function to display response messages (error or success)
function displayResponseMessage(message, type) {
    const responseElement = document.getElementById('response-message');
    responseElement.textContent = message;
    
    if (type === "success") {
        responseElement.style.color = "#28a745"; // Green for success
        responseElement.innerHTML = `<i class="fas fa-check-circle"></i> ${message}`; // Success icon
    } else {
        responseElement.style.color = "#dc3545"; // Red for error
        responseElement.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`; // Error icon
    }
}

// Function to validate email format
function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
}

// Show or hide loading state
function showLoadingState(isLoading) {
    const loadingSpinner = document.getElementById('loading-spinner');
    const formButton = document.querySelector('.contact-form button');

    if (isLoading) {
        loadingSpinner.style.display = 'inline-block';
        formButton.disabled = true; // Disable the submit button while loading
    } else {
        loadingSpinner.style.display = 'none';
        formButton.disabled = false; // Enable the submit button after loading
    }
}

// Update character count display
document.querySelector('textarea[name="message"]').addEventListener('input', updateCharacterCount);

function updateCharacterCount() {
    const messageLength = document.querySelector('textarea[name="message"]').value.length;
    const maxLength = 500;
    const charCountElement = document.getElementById('char-count');
    
    charCountElement.textContent = `${messageLength} / ${maxLength} characters`;

    // Change color if message is too long
    if (messageLength > maxLength) {
        charCountElement.style.color = "#dc3545"; // Red if too long
    } else {
        charCountElement.style.color = "#000"; // Black color if within limit
    }
}

// Initialize the character count on page load
updateCharacterCount();
