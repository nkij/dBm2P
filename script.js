// Register service worker for PWA functionality
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(err) {
                console.log('ServiceWorker registration failed: ', err);
            });
    });
}

// Wait for DOM to be loaded before initializing
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lucide icons
    lucide.createIcons();

    // State variables
    let dbmValue = '';
    let powerValue = '';
    let lastModified = null;
    let copyFeedback = '';

    // DOM elements
    const dbmInput = document.getElementById('dbm-input');
    const powerInput = document.getElementById('power-input');
    const copyDbmBtn = document.getElementById('copy-dbm-btn');
    const copyPowerBtn = document.getElementById('copy-power-btn');
    const clearBtn = document.getElementById('clear-btn');
    const copyFeedbackDiv = document.getElementById('copy-feedback');
    const feedbackText = document.getElementById('feedback-text');
    const mathExplanation = document.getElementById('math-explanation');
    const mathContent = document.getElementById('math-content');

    // Convert dBm to power: Power (W) = 10^((dBm - 30) / 10)
    function dbmToPower(dbm) {
        return Math.pow(10, (dbm - 30) / 10);
    }

    // Convert power to dBm: dBm = 10 * log10(Power) + 30
    function powerToDbm(power) {
        return 10 * Math.log10(power) + 30;
    }

    function showMathExplanation(fromDbm, value, result) {
        mathExplanation.classList.remove('hidden');
        
        if (fromDbm) {
            // Show dBm to power calculation
            const dbm = Number(value);
            const power = result;
            const exponent = (dbm - 30) / 10;
            
            mathContent.innerHTML = `
                <div class="bg-blue-50 rounded-lg p-4 border border-blue-200">
                    <p class="font-medium text-blue-900 mb-2">Converting ${dbm} dBm to Watt:</p>
                    <div class="space-y-2 text-blue-800">
                        <div class="flex items-center space-x-2">
                            <span class="font-mono">Formula:</span>
                            <code class="bg-blue-100 px-2 py-1 rounded">Power (W) = 10^((dBm - 30) / 10)</code>
                        </div>
                        <div class="flex items-center space-x-2">
                            <span class="font-mono">Step 1:</span>
                            <span>Calculate exponent: (${dbm} - 30) ÷ 10 = ${exponent.toFixed(3)}</span>
                        </div>
                        <div class="flex items-center space-x-2">
                            <span class="font-mono">Step 2:</span>
                            <span>10^${exponent.toFixed(3)} = ${power.toFixed(6)} W</span>
                        </div>
                        <div class="flex items-center space-x-2 font-semibold">
                            <span class="font-mono">Result:</span>
                            <span class="text-blue-900">Power = ${power.toFixed(6)} W</span>
                        </div>
                    </div>
                </div>
            `;
        } else {
            // Show power to dBm calculation
            const power = Number(value);
            const dbm = result;
            const logValue = Math.log10(power);
            
            mathContent.innerHTML = `
                <div class="bg-green-50 rounded-lg p-4 border border-green-200">
                    <p class="font-medium text-green-900 mb-2">Converting ${power} W to dBm:</p>
                    <div class="space-y-2 text-green-800">
                        <div class="flex items-center space-x-2">
                            <span class="font-mono">Formula:</span>
                            <code class="bg-green-100 px-2 py-1 rounded">dBm = 10 × log₁₀(Power) + 30</code>
                        </div>
                        <div class="flex items-center space-x-2">
                            <span class="font-mono">Step 1:</span>
                            <span>Calculate log₁₀(${power}) = ${logValue.toFixed(6)}</span>
                        </div>
                        <div class="flex items-center space-x-2">
                            <span class="font-mono">Step 2:</span>
                            <span>10 × ${logValue.toFixed(6)} + 30 = ${dbm.toFixed(6)}</span>
                        </div>
                        <div class="flex items-center space-x-2 font-semibold">
                            <span class="font-mono">Result:</span>
                            <span class="text-green-900">dBm = ${dbm.toFixed(6)}</span>
                        </div>
                    </div>
                </div>
            `;
        }
    }

    function hideMathExplanation() {
        mathExplanation.classList.add('hidden');
    }

    function handleDbmChange(value) {
        dbmValue = value;
        lastModified = 'dbm';

        if (value === '' || isNaN(Number(value))) {
            powerValue = '';
            powerInput.value = '';
            copyPowerBtn.classList.add('hidden');
            updateClearButton();
            hideMathExplanation();
            return;
        }

        const dbm = Number(value);
        const power = dbmToPower(dbm);
        powerValue = power.toFixed(6);
        powerInput.value = powerValue;
        copyPowerBtn.classList.remove('hidden');
        updateClearButton();
        showMathExplanation(true, value, power);
    }

    function handlePowerChange(value) {
        powerValue = value;
        lastModified = 'power';

        if (value === '' || isNaN(Number(value)) || Number(value) <= 0) {
            dbmValue = '';
            dbmInput.value = '';
            copyDbmBtn.classList.add('hidden');
            updateClearButton();
            hideMathExplanation();
            return;
        }

        const power = Number(value);
        const dbm = powerToDbm(power);
        dbmValue = dbm.toFixed(6);
        dbmInput.value = dbmValue;
        copyDbmBtn.classList.remove('hidden');
        updateClearButton();
        showMathExplanation(false, value, dbm);
    }

    async function copyToClipboard(value, type) {
        try {
            await navigator.clipboard.writeText(value);
            showCopyFeedback(`${type} copied!`);
        } catch (err) {
            showCopyFeedback('Copy failed');
        }
    }

    function showCopyFeedback(message) {
        feedbackText.textContent = message;
        copyFeedbackDiv.classList.remove('hidden');
        setTimeout(() => {
            copyFeedbackDiv.classList.add('hidden');
        }, 2000);
    }

    function clearAll() {
        dbmValue = '';
        powerValue = '';
        lastModified = null;
        dbmInput.value = '';
        powerInput.value = '';
        copyDbmBtn.classList.add('hidden');
        copyPowerBtn.classList.add('hidden');
        updateClearButton();
        hideMathExplanation();
    }

    function updateClearButton() {
        if (dbmValue || powerValue) {
            clearBtn.classList.remove('hidden');
        } else {
            clearBtn.classList.add('hidden');
        }
    }

    // Event listeners
    dbmInput.addEventListener('input', (e) => {
        handleDbmChange(e.target.value);
        if (e.target.value) {
            copyDbmBtn.classList.remove('hidden');
        } else {
            copyDbmBtn.classList.add('hidden');
        }
    });

    powerInput.addEventListener('input', (e) => {
        handlePowerChange(e.target.value);
        if (e.target.value) {
            copyPowerBtn.classList.remove('hidden');
        } else {
            copyPowerBtn.classList.add('hidden');
        }
    });

    copyDbmBtn.addEventListener('click', () => {
        copyToClipboard(dbmValue, 'dBm value');
    });

    copyPowerBtn.addEventListener('click', () => {
        copyToClipboard(powerValue, 'Watt value');
    });

    clearBtn.addEventListener('click', clearAll);
});
