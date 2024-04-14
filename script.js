document.addEventListener("DOMContentLoaded", function() {
    const incomeInput = document.getElementById("grossIncome");
    const extraIncomeInput = document.getElementById("extraIncome");
    const ageInput = document.getElementById("ageGroup");
    const deductionsInput = document.getElementById("deductions");
    const submitBtn = document.getElementById("submitBtn");
    const modal = document.getElementById("resultModal");
    const resultText = document.getElementById("resultText");
    const closeBtn = document.querySelector(".closeBtn"); // Added closeBtn reference

    // Function to reset input fields
    function resetInputFields() {
        incomeInput.value = "";
        extraIncomeInput.value = "";
        ageInput.value = "";
        deductionsInput.value = "";
    }

    // Function to check if a value is a valid number
    function isValidNumber(value) {
        return !isNaN(parseFloat(value)) && isFinite(value);
    }

    // Function to show error icon and tooltip
    function showErrorIcon(input, errorMessage) {
        const errorDiv = input.parentElement.querySelector(".error-icon");
        errorDiv.style.display = "block";
        errorDiv.title = errorMessage;
    }

    // Function to hide error icon and tooltip
    function hideErrorIcon(input) {
        const errorDiv = input.parentElement.querySelector(".error-icon");
        errorDiv.style.display = "none";
        errorDiv.title = "";
    }

    // Function to validate all input fields
    function validateForm() {
        let errors = false;

        if (!isValidNumber(incomeInput.value)) {
            showErrorIcon(incomeInput, "Please enter a valid number");
            errors = true;
        } else {
            hideErrorIcon(incomeInput);
        }

        if (!isValidNumber(extraIncomeInput.value)) {
            showErrorIcon(extraIncomeInput, "Please enter a valid number");
            errors = true;
        } else {
            hideErrorIcon(extraIncomeInput);
        }

        if (ageInput.value === "") {
            showErrorIcon(ageInput, "Input field is mandatory");
            errors = true;
        } else {
            hideErrorIcon(ageInput);
        }

        if (!isValidNumber(deductionsInput.value)) {
            showErrorIcon(deductionsInput, "Please enter a valid number");
            errors = true;
        } else {
            hideErrorIcon(deductionsInput);
        }

        return !errors;
    }

    submitBtn.addEventListener("click", function() {
        if (validateForm()) {
            const grossIncome = parseFloat(incomeInput.value);
            const extraIncome = parseFloat(extraIncomeInput.value);
            const deductions = parseFloat(deductionsInput.value);
            const ageGroup = ageInput.value;

            let overallIncome = grossIncome + extraIncome - deductions;
            let tax = 0;

            if (overallIncome > 800000) {
                if (ageGroup === "<40") {
                    tax = 0.3 * (overallIncome - 800000);
                } else if (ageGroup === ">=40&<60") {
                    tax = 0.4 * (overallIncome - 800000);
                } else if (ageGroup === ">=60") {
                    tax = 0.1 * (overallIncome - 800000);
                }
            }

            resultText.innerHTML = `Your Overall income will be<br>
<span>${overallIncome.toFixed(2)}</span><br>
after tax deduction of<br>
<span>${tax.toFixed(2)}</span><br>`;

            modal.style.display = "block";
        }
    });

    closeBtn.addEventListener("click", function() {
        modal.style.display = "none";
        resetInputFields(); // Reset input fields on close
    });

    window.addEventListener("click", function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
            resetInputFields(); // Reset input fields on close
        }
    });
});
