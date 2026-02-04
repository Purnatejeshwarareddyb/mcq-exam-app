# MCQ Exam Practice Web Application

A lightweight, browser-based Multiple Choice Question (MCQ) practice application built with pure HTML, CSS, and Vanilla JavaScript. No frameworks, no dependencies, no backend required.

---

## 🎯 Project Description

This web application allows users to upload a text file containing Multiple Choice Questions and instantly converts it into an interactive quiz. Perfect for students, educators, or anyone looking to practice MCQs in a clean, distraction-free environment.

---

## ✨ Features

- 📤 **File Upload Support** - Upload `.txt` files containing MCQs
- 🎲 **Random Question Selection** - Questions are shuffled for each attempt
- 🎨 **Instant Visual Feedback** - Correct answers turn green, wrong answers turn red
- 📊 **Score Tracking** - See your final score at the end
- 🔄 **Reusable** - Restart with the same file or upload a new one
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile
- ⚡ **Zero Dependencies** - Runs entirely in the browser

---

## 🚀 How to Run

1. **Download the project files**
2. **Open `index.html`** in any modern web browser (Chrome, Firefox, Safari, Edge)
3. **That's it!** No installation or server setup required

---

## 📝 TXT File Format Rules

Your `.txt` file **MUST** follow this exact format:
```
1. What is Natural Language Processing?
A) A branch of AI that deals with human language
B) A database system
C) A hardware component
D) A programming language
Answer: A

2. What does CPU stand for?
A) Central Processing Unit
B) Computer Personal Unit
C) Central Program Utility
D) Central Processor Union
Answer: A
```

### Format Requirements:

- ✅ Each question starts with a number followed by a dot (e.g., `1.`)
- ✅ Four options labeled as `A)`, `B)`, `C)`, `D)`
- ✅ Answer line must start with `Answer:` followed by the correct option letter
- ✅ One blank line between questions (optional but recommended)
- ✅ Only **ONE** correct answer per question

---

## 🎮 How to Use

1. **Upload a TXT File**
   - Click "Choose File" button
   - Select your `.txt` file containing MCQs
   - File will be automatically parsed

2. **Configure Your Quiz**
   - Enter how many questions you want to practice
   - Number must be between 1 and total available questions

3. **Take the Quiz**
   - Click on your chosen answer (A, B, C, or D)
   - Green = Correct ✅
   - Red = Wrong ❌
   - Auto-advances to next question after 1 second

4. **View Results**
   - See your final score
   - Option to restart or upload new file

---

## 📁 Project Structure
```
mcq-exam-app/
│
├── index.html      # Main HTML structure
├── style.css       # All styling and animations
├── script.js       # Application logic
├── sample.txt      # Sample MCQ file for testing
└── README.md       # This file
```

---

## 🛠️ Technology Stack

- **HTML5** - Structure
- **CSS3** - Styling & Animations
- **Vanilla JavaScript (ES6+)** - Logic & Interactivity

---

## 🧪 Sample File Included

A `sample.txt` file is included with 10 sample questions for testing purposes.

---

## 🔮 Future Improvements

- ⏱️ Timer functionality
- 📊 Detailed analytics and progress tracking
- 💾 LocalStorage to save progress
- 🎯 Category-based question filtering
- 🏆 High score leaderboard
- 📱 Progressive Web App (PWA) support
- 🌙 Dark mode toggle
- 📥 Export results as PDF

---

## 🐛 Troubleshooting

**Questions not loading?**
- Check that your file follows the exact format specified above
- Ensure file has `.txt` extension

**Quiz not starting?**
- Make sure you enter a valid number of questions
- Number must be ≤ total questions available

**Options not clickable?**
- You can only click once per question
- Wait for auto-advance to next question

---

## 📄 License

Free to use for educational purposes.

---

## 👨‍💻 Developer Notes

- No external libraries or frameworks used
- All code is commented for easy understanding
- Follows ES6+ JavaScript standards
- Mobile-first responsive design

---

**Happy Learning! 📚**