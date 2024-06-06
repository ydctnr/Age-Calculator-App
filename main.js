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
        if (validateForm()) {
            calculateAge();
        }
    });

    function validateForm() {
        const isDayValid = validateInput(dayInput, dayLabel, dayError, validateDay);
        const isMonthValid = validateInput(monthInput, monthLabel, monthError, validateMonth);
        const isYearValid = validateInput(yearInput, yearLabel, yearError, validateYear);
        return isDayValid && isMonthValid && isYearValid;
    }

    function validateInput(input, label, error, validationFunction) {
        const inputValue = input.value.trim();
        if (inputValue === "") {
            showError(input, label, error, "This field is required");
            return false;
        } else if (!validationFunction()) {
            return false;
        } else {
            resetError(input, label, error);
            return true;
        }
    }

    function showError(input, label, error, message) {
        input.style.borderColor = "var(--light-red)";
        label.style.color = "var(--light-red)";
        error.textContent = message;
        error.style.color = "var(--light-red)";
    }

    function resetError(input, label, error) {
        input.style.borderColor = "";
        label.style.color = "";
        error.textContent = "";
    }

    function validateDay() {
        const day = parseInt(dayInput.value);
        if (day < 1 || day > 31 || isNaN(day)) {
            showError(dayInput, dayLabel, dayError, "Must be a valid day");
            return false;
        } else {
            resetError(dayInput, dayLabel, dayError);
            return true;
        }
    }

    function validateMonth() {
        const month = parseInt(monthInput.value);
        if (month < 1 || month > 12 || isNaN(month)) {
            showError(monthInput, monthLabel, monthError, "Must be a valid month");
            return false;
        } else {
            resetError(monthInput, monthLabel, monthError);
            return true;
        }
    }

    function validateYear() {
        const year = parseInt(yearInput.value);
        if (year > currentYear || isNaN(year)) {
            showError(yearInput, yearLabel, yearError, year > currentYear ? "Must be in the past" : "Must be a valid year");
            return false;
        } else {
            resetError(yearInput, yearLabel, yearError);
            return true;
        }
    }

    function calculateAge() {
        const birthDate = new Date(parseInt(yearInput.value), parseInt(monthInput.value) - 1, parseInt(dayInput.value));
        const currentDate = new Date();

        let years = currentDate.getFullYear() - birthDate.getFullYear();
        let months = currentDate.getMonth() - birthDate.getMonth();
        let days = currentDate.getDate() - birthDate.getDate();

        if (months < 0 || (months === 0 && currentDate.getDate() < birthDate.getDate())) {
            years--;
            months += 12;
        }

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
        validateInput(dayInput, dayLabel, dayError, validateDay);
    });

    monthInput.addEventListener("input", function () {
        validateInput(monthInput, monthLabel, monthError, validateMonth);
    });

    yearInput.addEventListener("input", function () {
        validateInput(yearInput, yearLabel, yearError, validateYear);
    });
});