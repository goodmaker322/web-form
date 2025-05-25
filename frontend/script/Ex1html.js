document.addEventListener("DOMContentLoaded", function() {
    // Set min date for arrival to today
    const arrivalInput = document.getElementById("arrival");
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    const minDate = `${yyyy}-${mm}-${dd}`;
    arrivalInput.setAttribute("min", minDate);

    document.getElementById("reservationForm").onsubmit = function(e) {
        e.preventDefault();
        // Reset errors
        document.getElementById("fullnameError").textContent = "";
        document.getElementById("emailError").textContent = "";
        document.getElementById("tourError").textContent = "";
        document.getElementById("arrivalError").textContent = "";
        document.getElementById("personsError").textContent = "";
        document.getElementById("servicesError").textContent = "";
        document.getElementById("termsError").textContent = "";

        let valid = true;
        // Validate Full name
        const fullname = document.getElementById("fullname").value.trim();
        if (fullname.length < 3) {
            document.getElementById("fullnameError").textContent =
                "Full name must be at least 3 characters.";
            valid = false;
        }
        // Validate Email
        const email = document.getElementById("email").value.trim();
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            document.getElementById("emailError").textContent =
                "Invalid email address.";
            valid = false;
        }
        // Validate Tour
        const tour = document.getElementById("tour").value;
        if (!tour) {
            document.getElementById("tourError").textContent =
                "Please select a tour package.";
            valid = false;
        }
        // Validate Arrival (must be today or later)
        const arrival = arrivalInput.value;
        if (!arrival) {
            document.getElementById("arrivalError").textContent =
                "Please select an arrival date.";
            valid = false;
        } else if (arrival < minDate) {
            document.getElementById("arrivalError").textContent =
                "Arrival date cannot be in the past.";
            valid = false;
        }
        // Validate Persons (must be >= 1)
        const persons = document.getElementById("persons").value;
        if (!persons || persons < 1) {
            document.getElementById("personsError").textContent =
                "Number of persons must be at least 1.";
            valid = false;
        }
        // Validate Services
        const services = Array.from(
            document.querySelectorAll('input[name="services"]:checked')
        ).map((cb) => cb.value);
        if (services.length === 0) {
            document.getElementById("servicesError").textContent =
                "Please select at least one service.";
            valid = false;
        }
        // Validate Terms
        const terms = document.querySelector('input[name="terms"]:checked');
        if (!terms) {
            document.getElementById("termsError").textContent =
                "You must agree to the terms.";
            valid = false;
        } else if (terms.value === "I disagree") {
            document.getElementById("termsError").textContent =
                "You must agree to the terms to proceed.";
            valid = false;
        }
        if (!valid) return;

        // Display alert with all info
        const coupon = document.getElementById("coupon").value.trim();
        let info = `Registration Successful!\n\n`;
        info += `Full name: ${fullname}\n`;
        info += `Email: ${email}\n`;
        info += `Tour package: ${tour}\n`;
        info += `Arrival date: ${arrival}\n`;
        info += `Number of persons: ${persons}\n`;
        info += `Services: ${services.join(", ")}\n`;
        info += `Coupon code: ${coupon ? coupon : "N/A"}\n`;
        info += `Terms: ${terms.value}`;
        alert(info);
        document.getElementById("reservationForm").reset();
    };
});