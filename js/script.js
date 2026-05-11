// ---------- QUOTE SYSTEM ----------
const quotesList = [
    { text: 'A strong password is your first line of defense.', author: '— Cyber Guardian' },
    { text: 'Your password is the key to your digital kingdom — make it unbreakable.', author: '— Cyber Sentinel' },
    { text: 'A strong password is like a titanium door. A weak one is like a wet paper bag.', author: '— Security Architect' },
    { text: 'Entropy: the only thing that makes a hacker cry.', author: '— Cryptographer' },
    { text: 'Four random words beats complex shortcuts every time.', author: '— XKCD wisdom' },
    { text: "Never reuse passwords. It's like using the same key for your house, car, and safe.", author: '— OWASP Guide' },
    { text: "The best password is one you can't remember — use a manager.", author: '— Modern CISO' },
    { text: 'Long, unique, and unpredictable: the holy trinity of password strength.', author: '— NIST 2025' },
    { text: 'Change passwords, change your life.', author: '— Zero Trust' },
    { text: 'Never share your password, even with friends.', author: '— Privacy first' },
    { text: 'A 12-character password is 62 quadrillion times harder to crack.', author: '— Entropy Labs' }
];

let quoteIdx = 0;
const quoteTextElem = document.getElementById('quoteText');
const quoteAuthorElem = document.getElementById('quoteAuthor');
const dotsContainer = document.getElementById('quoteDots');

function buildDots() {
    dotsContainer.innerHTML = '';
    quotesList.forEach((_, idx) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (idx === quoteIdx) dot.classList.add('active');
        dotsContainer.appendChild(dot);
    });
}

function updateQuote() {
    quoteTextElem.textContent = `"${quotesList[quoteIdx].text}"`;
    quoteAuthorElem.textContent = quotesList[quoteIdx].author;
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, i) => {
        if (i === quoteIdx) dot.classList.add('active');
        else dot.classList.remove('active');
    });
}

function rotateQuote() {
    quoteIdx = (quoteIdx + 1) % quotesList.length;
    updateQuote();
}

buildDots();
setInterval(rotateQuote, 7000);

// ---------- PASSWORD STRENGTH ----------
const passwordInput = document.getElementById('passwordInput');
const toggleBtn = document.getElementById('togglePassBtn');
const strengthFill = document.getElementById('strengthFill');
const strengthTextLabel = document.getElementById('strengthTextLabel');
const scoreDetailsSpan = document.getElementById('scoreDetails');
const lengthStatSpan = document.getElementById('lengthStat');
const entropyBitsSpan = document.getElementById('entropyBits');
const scoreValueSpan = document.getElementById('scoreValue');
const charTypeCountSpan = document.getElementById('charTypeCount');
const charMixPanel = document.getElementById('charMixPanel');
const typingHintSpan = document.getElementById('typingHint');

let visible = false;
toggleBtn.addEventListener('click', () => {
    visible = !visible;
    passwordInput.type = visible ? 'text' : 'password';
    toggleBtn.textContent = visible ? '👁️' : '🙈';
});

function computeStrengthMetrics(pwd) {
    if (!pwd) {
        return { score: 0, level: 'Very Weak', color: '#ff4444', entropy: 0, length: 0, charTypeCount: 0,
            charTypes: { lower: false, upper: false, digit: false, special: false } };
    }
    let score = 0;
    if (pwd.length >= 8) score += 10;
    if (pwd.length >= 12) score += 15;
    if (pwd.length >= 16) score += 20;
    if (pwd.length >= 20) score += 15;

    const hasLower = /[a-z]/.test(pwd);
    const hasUpper = /[A-Z]/.test(pwd);
    const hasDigit = /[0-9]/.test(pwd);
    const hasSpecial = /[^a-zA-Z0-9]/.test(pwd);

    let charTypeCount = 0;
    if (hasLower) charTypeCount++;
    if (hasUpper) charTypeCount++;
    if (hasDigit) charTypeCount++;
    if (hasSpecial) charTypeCount++;

    if (hasLower) score += 10;
    if (hasUpper) score += 15;
    if (hasDigit) score += 15;
    if (hasSpecial) score += 20;

    if (/(.)\1{2,}/.test(pwd)) score -= 15;
    if (/^[a-z]+$|^[A-Z]+$|^[0-9]+$/.test(pwd)) score -= 20;
    if (/^[a-zA-Z]+$|^[0-9]+$/.test(pwd) && !hasSpecial) score -= 10;

    let finalScore = Math.min(100, Math.max(0, score));
    let level = 'Very Weak';
    let color = '#ff4444';
    if (finalScore >= 90) { level = 'Very Strong'; color = '#44ffaa'; }
    else if (finalScore >= 70) { level = 'Strong'; color = '#2ecc71'; }
    else if (finalScore >= 50) { level = 'Moderate'; color = '#f4d03f'; }
    else if (finalScore >= 35) { level = 'Weak'; color = '#ffaa44'; }

    let charsetSize = 0;
    if (hasLower) charsetSize += 26;
    if (hasUpper) charsetSize += 26;
    if (hasDigit) charsetSize += 10;
    if (hasSpecial) charsetSize += 33;
    charsetSize = Math.max(1, charsetSize);
    let entropy = pwd.length * Math.log2(charsetSize);
    entropy = Math.round(entropy * 10) / 10;

    return { score: Math.round(finalScore), level, color, entropy, length: pwd.length, charTypeCount,
        charTypes: { lower: hasLower, upper: hasUpper, digit: hasDigit, special: hasSpecial } };
}

function updateUI() {
    const pwd = passwordInput.value;
    const metrics = computeStrengthMetrics(pwd);
    if (pwd.length === 0) {
        typingHintSpan.innerHTML = '✨ Start typing a password to see its strength analysis... ✨';
    } else {
        typingHintSpan.innerHTML = '🔐 Password analysis active - check your strength below!';
    }
    strengthFill.style.width = `${metrics.score}%`;
    strengthFill.style.background = metrics.color;
    strengthTextLabel.innerText = metrics.level;
    strengthTextLabel.style.color = metrics.color;
    scoreDetailsSpan.innerText = `${metrics.score} / 100`;
    lengthStatSpan.innerText = metrics.length;
    entropyBitsSpan.innerText = metrics.entropy;
    scoreValueSpan.innerText = metrics.score;
    charTypeCountSpan.innerText = metrics.charTypeCount;
    const types = metrics.charTypes;
    charMixPanel.innerHTML = `
        <span class="char-badge" style="color: ${types.lower ? '#b0ffc0' : '#7f9fbf'}">🔡 Lowercase ${types.lower ? '✓' : '✗'}</span>
        <span class="char-badge" style="color: ${types.upper ? '#b0ffc0' : '#7f9fbf'}">🔠 Uppercase ${types.upper ? '✓' : '✗'}</span>
        <span class="char-badge" style="color: ${types.digit ? '#b0ffc0' : '#7f9fbf'}">🔢 Numbers ${types.digit ? '✓' : '✗'}</span>
        <span class="char-badge" style="color: ${types.special ? '#b0ffc0' : '#7f9fbf'}">✨ Symbols ${types.special ? '✓' : '✗'}</span>
    `;
    if (pwd.length === 0) charMixPanel.innerHTML = `<span class="char-badge">⚡ Enter a password to see character analysis</span>`;
}

passwordInput.addEventListener('input', updateUI);
updateUI();

// ---------- FAQ ACCORDION with Enhanced Formatting & Icons for all ----------
const faqData = [
    { icon: "🔎", q: "How is password strength calculated?", 
      a: "Password strength is calculated based on multiple factors: length (longer = stronger), character diversity (uppercase, lowercase, numbers, symbols), entropy (unpredictability), and absence of common patterns. Each character adds exponential strength, not linear. For example, a 16-character password is exponentially stronger than an 8-character one. Our algorithm gives a score 0–100. Higher entropy and more character types = exponentially stronger password." },
    
    { icon: "🧠", q: "How to create a strong password?", 
      a: "<strong>Follow these guidelines:</strong><ul class='styled-list'><li>✔️ Use at least 12–16 characters</li><li>✔️ Mix uppercase and lowercase letters</li><li>✔️ Include numbers and special symbols (!@#$%^&*)</li><li>✔️ Avoid dictionary words and personal information</li><li>✔️ Don't use predictable patterns (like '123' or 'qwerty')</li><li>✔️ Create unique passwords for important accounts</li><li>✔️ Use a passphrase combining unrelated words with numbers/symbols (e.g., 'BluePiano$42Jazz')</li><li>✔️ Never reuse passwords across sites and enable 2FA</li></ul>" },
    
    { icon: "⏱️", q: "How long does it take to crack passwords?", 
      a: "Cracking time depends on the password's entropy and attacker's resources. A simple 6-character password can be cracked in milliseconds. A 12-character mixed password takes thousands of years with brute force. Our calculator assumes 10 billion guesses per second (GPU-accelerated attack). Real security also depends on the system: salted hashing and rate limiting dramatically increase cracking time." },
    
    { icon: "📊", q: "What is entropy?", 
      a: "Entropy measures password randomness in 'bits'. Each additional bit doubles the difficulty to guess. A password with 60+ bits is strong, 80+ bits is extremely secure. Our live metrics show your password's entropy score." },
    
    { icon: "🔬", q: "What's the difference between entropy and length?", 
      a: "Length is how many characters are in your password. Entropy measures the randomness and unpredictability. A 20-character password of only 'a's has low entropy; a 12-character password with mixed cases, numbers, and symbols has high entropy. Entropy = log₂(possible characters^length). Higher entropy always means stronger passwords." },
    
    { icon: "🛡️", q: "Does this tool store my password?", 
      a: "NO! Everything runs inside your browser with zero data transmission. No logs, no network. Your privacy is 100% protected!" },
    
    { icon: "🔐", q: "Should I use a password manager?", 
      a: "Absolutely. Password managers generate and store unique high-entropy passwords. You only need one master password. Recommended: Bitwarden, 1Password, or Proton Pass." },
    
    { icon: "♻️", q: "How often should I change passwords?", 
      a: "Change after any data breach, or every 6-12 months for important accounts. But using strong, unique passwords matters more than frequent changes." },
    
    { icon: "💡", q: "What's a passphrase and why is it better?", 
      a: "A passphrase uses 4+ unrelated words combined with numbers/symbols: 'CoffeeMountain#42Butterfly'. Passphrases are easier to remember than random characters but just as strong. They work because word count (entropy per word choice) beats character length. Example: 'Correct-Horse-Battery-Staple' with a symbol is incredibly strong and memorable." }
];

const faqContainer = document.getElementById('faqContainer');
function buildFAQ() {
    faqContainer.innerHTML = '';
    faqData.forEach((item) => {
        const accordionDiv = document.createElement('div');
        accordionDiv.className = 'faq-accordion-item';
        const btn = document.createElement('button');
        btn.className = 'faq-question-btn';
        btn.innerHTML = `<span>${item.icon} ${item.q}</span><span class="faq-icon">▼</span>`;
        const answerDiv = document.createElement('div');
        answerDiv.className = 'faq-answer';
        answerDiv.style.display = 'none';
        answerDiv.innerHTML = `<p>${item.a}</p>`;
        btn.addEventListener('click', () => {
            const isOpen = answerDiv.style.display === 'block';
            answerDiv.style.display = isOpen ? 'none' : 'block';
            btn.querySelector('.faq-icon').innerHTML = isOpen ? '▼' : '▲';
        });
        accordionDiv.appendChild(btn);
        accordionDiv.appendChild(answerDiv);
        faqContainer.appendChild(accordionDiv);
    });
}
buildFAQ();
