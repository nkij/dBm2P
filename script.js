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
    let dbValue = '';
    let voltageRatio = '';
    let lastModified = null;
    let copyFeedback = '';

    // DOM elements
    const dbInput = document.getElementById('db-input');
    const voltageInput = document.getElementById('voltage-input');
    const copyDbBtn = document.getElementById('copy-db-btn');
    const copyVoltageBtn = document.getElementById('copy-voltage-btn');
    const clearBtn = document.getElementById('clear-btn');
    const copyFeedbackDiv = document.getElementById('copy-feedback');
    const feedbackText = document.getElementById('feedback-text');
    const mathExplanation = document.getElementById('math-explanation');
    const mathContent = document.getElementById('math-content');

    // Convert dB to voltage ratio: V2/V1 = 10^(dB/20)
    function dbToVoltageRatio(db) {
        return Math.pow(10, db / 20);
    }

    // Convert voltage ratio to dB: dB = 20 * log10(V2/V1)
    function voltageRatioToDb(ratio) {
        return 20 * Math.log10(ratio);
    }

    function showMathExplanation(fromDb, value, result) {
        mathExplanation.classList.remove('hidden');
        
        if (fromDb) {
            // Show dB to ratio calculation
            const db = Number(value);
            const ratio = result;
            const exponent = db / 20;
            
            mathContent.innerHTML = `
                <div class="bg-blue-50 rounded-lg p-4 border border-blue-200">
                    <p class="font-medium text-blue-900 mb-2">Converting ${db} dB to Voltage Ratio:</p>
                    <div class="space-y-2 text-blue-800">
                        <div class="flex items-center space-x-2">
                            <span class="font-mono">Formula:</span>
                            <code class="bg-blue-100 px-2 py-1 rounded">V₂/V₁ = 10^(dB/20)</code>
                        </div>
                        <div class="flex items-center space-x-2">
                            <span class="font-mono">Step 1:</span>
                            <span>Calculate exponent: ${db} ÷ 20 = ${exponent.toFixed(3)}</span>
                        </div>
                        <div class="flex items-center space-x-2">
                            <span class="font-mono">Step 2:</span>
                            <span>10^${exponent.toFixed(3)} = ${ratio.toFixed(6)}</span>
                        </div>
                        <div class="flex items-center space-x-2 font-semibold">
                            <span class="font-mono">Result:</span>
                            <span class="text-blue-900">V₂/V₁ = ${ratio.toFixed(6)}</span>
                        </div>
                    </div>
                </div>
            `;
        } else {
            // Show ratio to dB calculation
            const ratio = Number(value);
            const db = result;
            const logValue = Math.log10(ratio);
            
            mathContent.innerHTML = `
                <div class="bg-green-50 rounded-lg p-4 border border-green-200">
                    <p class="font-medium text-green-900 mb-2">Converting ${ratio} V₂/V₁ to dB:</p>
                    <div class="space-y-2 text-green-800">
                        <div class="flex items-center space-x-2">
                            <span class="font-mono">Formula:</span>
                            <code class="bg-green-100 px-2 py-1 rounded">dB = 20 × log₁₀(V₂/V₁)</code>
                        </div>
                        <div class="flex items-center space-x-2">
                            <span class="font-mono">Step 1:</span>
                            <span>Calculate log₁₀(${ratio}) = ${logValue.toFixed(6)}</span>
                        </div>
                        <div class="flex items-center space-x-2">
                            <span class="font-mono">Step 2:</span>
                            <span>20 × ${logValue.toFixed(6)} = ${db.toFixed(6)}</span>
                        </div>
                        <div class="flex items-center space-x-2 font-semibold">
                            <span class="font-mono">Result:</span>
                            <span class="text-green-900">dB = ${db.toFixed(6)}</span>
                        </div>
                    </div>
                </div>
            `;
        }
    }

    function hideMathExplanation() {
        mathExplanation.classList.add('hidden');
    }

    function handleDbChange(value) {
        dbValue = value;
        lastModified = 'db';

        if (value === '' || isNaN(Number(value))) {
            voltageRatio = '';
            voltageInput.value = '';
            copyVoltageBtn.classList.add('hidden');
            updateClearButton();
            hideMathExplanation();
            return;
        }

        const db = Number(value);
        const ratio = dbToVoltageRatio(db);
        voltageRatio = ratio.toFixed(6);
        voltageInput.value = voltageRatio;
        copyVoltageBtn.classList.remove('hidden');
        updateClearButton();
        showMathExplanation(true, value, ratio);
    }

    function handleVoltageChange(value) {
        voltageRatio = value;
        lastModified = 'voltage';

        if (value === '' || isNaN(Number(value)) || Number(value) <= 0) {
            dbValue = '';
            dbInput.value = '';
            copyDbBtn.classList.add('hidden');
            updateClearButton();
            hideMathExplanation();
            return;
        }

        const ratio = Number(value);
        const db = voltageRatioToDb(ratio);
        dbValue = db.toFixed(6);
        dbInput.value = dbValue;
        copyDbBtn.classList.remove('hidden');
        updateClearButton();
        showMathExplanation(false, value, db);
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
        dbValue = '';
        voltageRatio = '';
        lastModified = null;
        dbInput.value = '';
        voltageInput.value = '';
        copyDbBtn.classList.add('hidden');
        copyVoltageBtn.classList.add('hidden');
        updateClearButton();
        hideMathExplanation();
    }

    function updateClearButton() {
        if (dbValue || voltageRatio) {
            clearBtn.classList.remove('hidden');
        } else {
            clearBtn.classList.add('hidden');
        }
    }

    // Event listeners
    dbInput.addEventListener('input', (e) => {
        handleDbChange(e.target.value);
        if (e.target.value) {
            copyDbBtn.classList.remove('hidden');
        } else {
            copyDbBtn.classList.add('hidden');
        }
    });

    voltageInput.addEventListener('input', (e) => {
        handleVoltageChange(e.target.value);
        if (e.target.value) {
            copyVoltageBtn.classList.remove('hidden');
        } else {
            copyVoltageBtn.classList.add('hidden');
        }
    });

    copyDbBtn.addEventListener('click', () => {
        copyToClipboard(dbValue, 'dB value');
    });

    copyVoltageBtn.addEventListener('click', () => {
        copyToClipboard(voltageRatio, 'Voltage ratio');
    });

    clearBtn.addEventListener('click', clearAll);
});
