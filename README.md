# 🛡️ CyberGuard | Password Strength Vault

A modern, real-time password strength checker with entropy calculation, security metrics, and educational FAQ section. Built with HTML, CSS, and vanilla JavaScript.

## 🚀 Live Demo

[View Live Demo](https://moubanik.github.io/password-strength-checker/)

## ✨ Features

### 🔐 Core Functionality
- **Real-time Password Analysis** - Instant feedback as you type
- **Entropy Calculation** - Measures password randomness in bits
- **Strength Score (0-100)** - Numerical rating with color-coded meter
- **Live Metrics Dashboard** - Length, entropy bits, character types, and score
- **Password Visibility Toggle** - Show/hide password with eye icon

### 📊 Strength Levels
| Level | Score Range | Color | Description |
|-------|-------------|-------|-------------|
| Very Weak | 0-34 | 🔴 Red | Easily guessable |
| Weak | 35-49 | 🟠 Orange | Vulnerable to attacks |
| Moderate | 50-69 | 🟡 Yellow | Decent but can improve |
| Strong | 70-89 | 🟢 Green | Good for most accounts |
| Very Strong | 90-100 | 💎 Teal | Excellent security |

### 🔍 Character Analysis
Tracks and displays presence of:
- ✅ Lowercase letters (a-z)
- ✅ Uppercase letters (A-Z)
- ✅ Numbers (0-9)
- ✅ Special symbols (!@#$%^&* etc.)

### 📈 Advanced Security Metrics
- **Entropy (bits)** - Measures password randomness (higher = better)
- **Character Type Count** - Diversity score (0-4 types)
- **Crack Time Estimates** - Realistic time to brute force
- **Pattern Detection** - Penalizes repeated chars and sequential patterns

### ❓ Educational FAQ Section
9 interactive accordion questions covering:
- How password strength is calculated
- How to create strong passwords
- Password cracking time estimates
- Entropy explained simply
- Difference between entropy and length
- Privacy assurance (no data storage)
- Password manager recommendations
- How often to change passwords
- Passphrase advantages

## 🛠️ Technologies Used

- **HTML5** - Semantic structure with accessible elements
- **CSS3** - Gradient backgrounds, glassmorphism effects, responsive grid/flexbox
- **JavaScript (Vanilla)** - Pure JS, no dependencies or frameworks
- **No External Libraries** - 100% custom code

## 📁 Project Structure
password-strength-checker/
├── index.html
├── style.css
└── script.js


## 🔧 Installation & Local Usage

### Method 1: Direct Download
1. Download `index.html` to your computer
2. Double-click to open in any modern browser
3. No server required - works offline!

### Method 2: Clone Repository
```bash
git clone https://github.com/YOUR-USERNAME/password-strength-checker.git
cd password-strength-checker
open index.html
