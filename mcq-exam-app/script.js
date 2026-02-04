// ===== GLOBAL VARIABLES =====
let allQuestions = [];
let quizQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let totalQuestions = 0;

// ===== DOM ELEMENTS =====
const fileInput = document.getElementById('fileInput');
const fileInfo = document.getElementById('fileInfo');
const uploadStatus = document.getElementById('uploadStatus');

const uploadScreen = document.getElementById('uploadScreen');
const configScreen = document.getElementById('configScreen');
const quizScreen = document.getElementById('quizScreen');
const resultScreen = document.getElementById('resultScreen');

const totalQuestionsInfo = document.getElementById('totalQuestionsInfo');
const questionCountInput = document.getElementById('questionCount');
const startQuizBtn = document.getElementById('startQuizBtn');
const configError = document.getElementById('configError');

const questionCounter = document.getElementById('questionCounter');
const scoreDisplay = document.getElementById('scoreDisplay');
const progressFill = document.getElementById('progressFill');
const questionText = document.getElementById('questionText');
const optionsContainer = document.getElementById('optionsContainer');

const finalScore = document.getElementById('finalScore');
const percentage = document.getElementById('percentage');
const restartBtn = document.getElementById('restartBtn');
const newFileBtn = document.getElementById('newFileBtn');

// ===== EVENT LISTENERS =====
fileInput.addEventListener('change', handleFileUpload);
startQuizBtn.addEventListener('click', handleStartQuiz);
restartBtn.addEventListener('click', restartQuiz);
newFileBtn.addEventListener('click', uploadNewFile);

// ===== FUNCTION: Handle File Upload =====
function handleFileUpload(event) {
    const file = event.target.files[0];
    
    if (!file) {
        return;
    }
    
    // Validate file type
    if (!file.name.endsWith('.txt')) {
        showStatus('Please upload a valid .txt file', 'error');
        return;
    }
    
    fileInfo.textContent = file.name;
    
    // Read file using FileReader
    const reader = new FileReader();
    
    reader.onload = function(e) {
        const text = e.target.result;
        parseQuestions(text);
    };
    
    reader.onerror = function() {
        showStatus('Error reading file. Please try again.', 'error');
    };
    
    reader.readAsText(file);
}

// ===== FUNCTION: Parse Questions from Text =====
function parseQuestions(text) {
    allQuestions = [];
    
    // Split by question numbers (1., 2., etc.) but keep the question number
    const questionBlocks = text.split(/(?=\d+\.\s+)/);
    
    questionBlocks.forEach(block => {
        if (block.trim().length === 0) return;
        
        const lines = block.split('\n').filter(line => line.trim() !== '');
        
        if (lines.length < 6) return; // Need at least: question + 4 options + answer
        
        let questionObj = {
            question: '',
            options: {},
            correct: ''
        };
        
        // Extract question (first line, remove number and asterisks)
        questionObj.question = lines[0]
            .replace(/^\d+\.\s*\*?\*?/, '')
            .replace(/\*?\*?$/, '')
            .trim();
        
        // Extract options (A, B, C, D)
        for (let i = 1; i < lines.length; i++) {
            const line = lines[i].trim();
            
            // Match options: A), B), C), D)
            const optionMatch = line.match(/^([A-D])\)\s*(.+)/);
            if (optionMatch) {
                const letter = optionMatch[1];
                const optionText = optionMatch[2].trim();
                questionObj.options[letter] = optionText;
            }
            
            // Match answer line: Answer: A or **Answer: A**
            const answerMatch = line.match(/\*?\*?Answer:\s*([A-D])\*?\*?/i);
            if (answerMatch) {
                questionObj.correct = answerMatch[1].toUpperCase();
            }
        }
        
        // Validate question has all required fields
        if (questionObj.question && 
            Object.keys(questionObj.options).length === 4 && 
            questionObj.correct) {
            allQuestions.push(questionObj);
        }
    });
    
    if (allQuestions.length === 0) {
        showStatus('No valid questions found. Please check the file format.', 'error');
        return;
    }
    
    // Show success message
    showStatus(`Successfully loaded ${allQuestions.length} questions! 🎉`, 'success');
    
    // Move to configuration screen after 1.5 seconds
    setTimeout(() => {
        showConfigScreen();
    }, 1500);
}

// ===== FUNCTION: Show Status Message =====
function showStatus(message, type) {
    uploadStatus.textContent = message;
    uploadStatus.className = `status-message ${type}`;
}

// ===== FUNCTION: Show Configuration Screen =====
function showConfigScreen() {
    uploadScreen.classList.remove('active');
    configScreen.classList.add('active');
    
    totalQuestionsInfo.textContent = `Total questions available: ${allQuestions.length}`;
    questionCountInput.max = allQuestions.length;
    questionCountInput.value = Math.min(10, allQuestions.length);
}

// ===== FUNCTION: Handle Start Quiz =====
function handleStartQuiz() {
    const count = parseInt(questionCountInput.value);
    
    // Validation
    if (!count || count <= 0) {
        configError.textContent = 'Please enter a valid number greater than 0';
        return;
    }
    
    if (count > allQuestions.length) {
        configError.textContent = `Maximum ${allQuestions.length} questions available`;
        return;
    }
    
    configError.textContent = '';
    startQuiz(count);
}

// ===== FUNCTION: Start Quiz =====
function startQuiz(questionCount) {
    // Shuffle questions randomly
    const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
    
    // Select required number of questions
    quizQuestions = shuffled.slice(0, questionCount);
    
    // Initialize quiz state
    currentQuestionIndex = 0;
    score = 0;
    totalQuestions = questionCount;
    
    // Show quiz screen
    configScreen.classList.remove('active');
    quizScreen.classList.add('active');
    
    // Render first question
    renderQuestion();
}

// ===== FUNCTION: Render Question =====
function renderQuestion() {
    const question = quizQuestions[currentQuestionIndex];
    
    // Update header info
    questionCounter.textContent = `Question ${currentQuestionIndex + 1}/${totalQuestions}`;
    scoreDisplay.textContent = `Score: ${score}`;
    
    // Update progress bar
    const progress = ((currentQuestionIndex) / totalQuestions) * 100;
    progressFill.style.width = `${progress}%`;
    
    // Display question
    questionText.textContent = question.question;
    
    // Clear previous options
    optionsContainer.innerHTML = '';
    
    // Create option buttons
    Object.keys(question.options).forEach(letter => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'option';
        optionDiv.textContent = `${letter}) ${question.options[letter]}`;
        optionDiv.dataset.option = letter;
        
        // Add click handler
        optionDiv.addEventListener('click', () => handleOptionClick(letter));
        
        optionsContainer.appendChild(optionDiv);
    });
}

// ===== FUNCTION: Handle Option Click =====
function handleOptionClick(selectedOption) {
    const question = quizQuestions[currentQuestionIndex];
    const allOptions = document.querySelectorAll('.option');
    
    // Disable all options after click
    allOptions.forEach(opt => {
        opt.classList.add('disabled');
        opt.style.pointerEvents = 'none';
    });
    
    // Find the clicked option element
    const clickedOption = Array.from(allOptions).find(
        opt => opt.dataset.option === selectedOption
    );
    
    // Check if answer is correct
    if (selectedOption === question.correct) {
        clickedOption.classList.add('correct');
        score++;
    } else {
        clickedOption.classList.add('wrong');
        
        // Also highlight the correct answer
        const correctOption = Array.from(allOptions).find(
            opt => opt.dataset.option === question.correct
        );
        setTimeout(() => {
            correctOption.classList.add('correct');
        }, 300);
    }
    
    // Wait 1.5 seconds then move to next question or show result
    setTimeout(() => {
        currentQuestionIndex++;
        
        if (currentQuestionIndex < totalQuestions) {
            renderQuestion();
        } else {
            showResult();
        }
    }, 1500);
}

// ===== FUNCTION: Show Result =====
function showResult() {
    quizScreen.classList.remove('active');
    resultScreen.classList.add('active');
    
    const percent = Math.round((score / totalQuestions) * 100);
    
    finalScore.textContent = `${score}/${totalQuestions}`;
    percentage.textContent = `${percent}%`;
    
    // Change emoji based on performance
    const resultIcon = document.querySelector('.result-icon');
    if (percent >= 80) {
        resultIcon.textContent = '🏆';
    } else if (percent >= 60) {
        resultIcon.textContent = '👍';
    } else if (percent >= 40) {
        resultIcon.textContent = '😊';
    } else {
        resultIcon.textContent = '💪';
    }
}

// ===== FUNCTION: Restart Quiz =====
function restartQuiz() {
    resultScreen.classList.remove('active');
    
    // Reset and start new quiz with same questions count
    startQuiz(totalQuestions);
}

// ===== FUNCTION: Upload New File =====
function uploadNewFile() {
    // Reset everything
    allQuestions = [];
    quizQuestions = [];
    currentQuestionIndex = 0;
    score = 0;
    totalQuestions = 0;
    
    fileInput.value = '';
    fileInfo.textContent = 'No file chosen';
    uploadStatus.textContent = '';
    
    // Go back to upload screen
    resultScreen.classList.remove('active');
    uploadScreen.classList.add('active');
}

// ===== INITIAL STATE =====
console.log('MCQ Exam Practice App Initialized! 🚀');