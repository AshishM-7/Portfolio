// ```javascript
// Typing effect for the home page
const words = ["a Photographer", "a Developer", "a Designer"]; // Reverted words
let i = 0;
let j = 0;
let currentWord = "";
let isDeleting = false;

function type() {
    currentWord = words[i];
    if (isDeleting) {
        document.getElementById("typing-text").textContent = currentWord.substring(0, j - 1);
        j--;
        if (j == 0) {
            isDeleting = false;
            i++;
            if (i == words.length) {
                i = 0;
            }
        }
    } else {
        document.getElementById("typing-text").textContent = currentWord.substring(0, j + 1);
        j++;
        if (j == currentWord.length) {
            isDeleting = true;
        }
    }
    setTimeout(type, isDeleting ? 100 : 200);
}

// Ensure the DOM is fully loaded before starting the typing effect
window.onload = function() {
    if (document.getElementById("typing-text")) {
        type();
    }
};

// Contact Form Submission (using a free service like Formspree)
const contactForm = document.getElementById("contact-form");

if (contactForm) {
    contactForm.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent the default form submission

        const form = event.target;
        const formData = new FormData(form);
        const name = formData.get("name");
        const email = formData.get("email");
        const subject = formData.get("subject");
        const message = formData.get("message");

        // Use a service like Formspree for handling form submissions
        // Replace 'your-formspree-id' with your actual Formspree form ID
        // You can get this by creating a new form on formspree.io and copying the ID from the action URL.
        const formspreeUrl = "https://formspree.io/f/your-formspree-id";

        fetch(formspreeUrl, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.ok) {
                // Using a custom modal/message box instead of alert()
                showMessageBox("Thank you! Your message has been sent.", "success");
                form.reset(); // Clear the form
            } else {
                showMessageBox("Oops! There was a problem submitting your form.", "error");
            }
        })
        .catch(error => {
            showMessageBox("Oops! An error occurred.", "error");
            console.error('Error:', error);
        });
    });
}

// Custom Message Box function (replaces alert())
function showMessageBox(message, type) {
    let messageBox = document.getElementById("custom-message-box");
    if (!messageBox) {
        messageBox = document.createElement("div");
        messageBox.id = "custom-message-box";
        messageBox.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            padding: 15px 30px;
            border-radius: 8px;
            font-size: 1rem;
            color: white;
            z-index: 10000;
            box-shadow: 0 4px 8px rgba(0,0,0,0.2);
            display: none;
            opacity: 0;
            transition: opacity 0.3s ease-in-out;
        `;
        document.body.appendChild(messageBox);
    }

    messageBox.textContent = message;
    if (type === "success") {
        messageBox.style.backgroundColor = "#28a745"; // Green
    } else if (type === "error") {
        messageBox.style.backgroundColor = "#dc3545"; // Red
    }

    messageBox.style.display = "block";
    setTimeout(() => {
        messageBox.style.opacity = 1;
    }, 10); // Small delay to trigger transition

    setTimeout(() => {
        messageBox.style.opacity = 0;
        setTimeout(() => {
            messageBox.style.display = "none";
        }, 300); // Hide after transition
    }, 3000); // Message visible for 3 seconds
}
