/**
 * Master JavaScript File - Term Loan
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // 2. Financial Eligibility Calculator Logic (for tools.html)
    const calcForm = document.getElementById('eligibility-calc-form');
    if (calcForm) {
        calcForm.addEventListener('input', calculateEligibility);
    }
});

function calculateEligibility() {
    const incomeInput = document.getElementById('monthly-income');
    const emiInput = document.getElementById('existing-emi');
    const tenureInput = document.getElementById('loan-tenure');
    const resultBox = document.getElementById('calc-result');

    if (incomeInput && emiInput && tenureInput && resultBox) {
        const income = parseFloat(incomeInput.value) || 0;
        const emi = parseFloat(emiInput.value) || 0;
        const tenureYears = parseFloat(tenureInput.value) || 1;

        // Formula: FOIR 50% of available income capitalized at ~10.5% interest rate
        const availableEMICapacity = Math.max(0, (income * 0.5) - emi);
        const estimatedLoanAmount = Math.round(availableEMICapacity * tenureYears * 12 * 0.75);

        document.getElementById('display-emi-capacity').innerText = "₹ " + availableEMICapacity.toLocaleString('en-IN');
        document.getElementById('display-max-loan').innerText = "₹ " + estimatedLoanAmount.toLocaleString('en-IN');
    }
}
