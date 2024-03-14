document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("dateForm");
    const dayInput = document.getElementById("day");
    const monthInput = document.getElementById("month");
    const yearInput = document.getElementById("year");
    const dayLabel = document.querySelector('label[for="day"]');
    const monthLabel = document.querySelector('label[for="month"]');
    const yearLabel = document.querySelector('label[for="year"]');
    const dayError = document.getElementById("dayError");
    const monthError = document.getElementById("monthError");
    const yearError = document.getElementById("yearError");
    const ageYears = document.getElementById("ageYears");
    const ageMonths = document.getElementById("ageMonths");
    const ageDays = document.getElementById("ageDays");
    
    const currentYear = new Date().getFullYear();

    form.addEventListener("submit", function(event) {
        event.preventDefault();
        if (validateInput(dayInput, dayLabel, dayError) && validateInput(monthInput, monthLabel, monthError) && validateInput(yearInput, yearLabel, yearError)) {
            calculateAge();
        }
    });

    function validateInput(input, label, error) {
        const inputValue = input.value.trim();
        if (inputValue === "") {
            input.style.borderColor = "var(--light-red)";
            label.style.color = "var(--light-red)";
            error.textContent = "This field is required";
            error.style.color = "var(--light-red)";
            return false;
        } else {
            input.style.borderColor = ""; // Reset border color
            label.style.color = ""; // Reset label color
            error.textContent = ""; // Clear error message
            return true;
        }
    }

    function validateDay() {
        const day = parseInt(dayInput.value);
        if (day < 1 || day > 31 || isNaN(day)) {
            dayError.textContent = "Must be a valid day";
            dayError.style.color = "var(--light-red)";
            return false;
        } else {
            dayError.textContent = "";
            return true;
        }
    }

    function validateMonth() {
        const month = parseInt(monthInput.value);
        if (month < 1 || month > 12 || isNaN(month)) {
            monthError.textContent = "Must be a valid month";
            monthError.style.color = "var(--light-red)";
            return false;
        } else {
            monthError.textContent = "";
            return true;
        }
    }

    function validateYear() {
        const year = parseInt(yearInput.value);
        if (year > currentYear) {
            yearError.textContent = "Must be in the past";
            yearError.style.color = "var(--light-red)";
            return false;
        } else if(isNaN(year)) {
            yearError.textContent = "Must be a valid year";
            yearError.style.color = "var(--light-red)";
            return false;
        }else {
            yearError.textContent = "";
            return true;
        }
    }

    function calculateAge() {
        const birthDate = new Date(parseInt(yearInput.value), parseInt(monthInput.value) - 1, parseInt(dayInput.value));
        const currentDate = new Date();

        let years = currentDate.getFullYear() - birthDate.getFullYear();
        let months = currentDate.getMonth() - birthDate.getMonth();
        let days = currentDate.getDate() - birthDate.getDate();

        // If birthdate hasn't occurred yet this year
        if (months < 0 || (months === 0 && currentDate.getDate() < birthDate.getDate())) {
            years--;
            months += 12;
        }

        // If days count is negative, adjust it
        if (days < 0) {
            const prevMonthLastDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
            days = prevMonthLastDay - birthDate.getDate() + currentDate.getDate();
            months--;
        }

        ageYears.textContent = years;
        ageMonths.textContent = months;
        ageDays.textContent = days;
    }

    dayInput.addEventListener("input", function () {
        validateDay();
    });

    monthInput.addEventListener("input", function () {
        validateMonth();
    });

    yearInput.addEventListener("input", function () {
        validateYear();
    });
});