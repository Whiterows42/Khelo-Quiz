const questions = [
    {
        question: "Which is the largest Animal in The world",
        Answer: [
            { text: "shark", correct: "false" },
            { text: "Blue Whale", correct: "true" },
            { text: "Elephant", correct: "false" },
            { text: "Giraffe", correct: "false" },
        ]
    },
    {
        question: "Which planet is known as the Red Planet?",
        Answer: [
            { text: "mars", correct: "true" },
            { text: "venus", correct: "false" },
            { text: "jupiter", correct: "false" },
            { text: "Saturn", correct: "false" },
        ]
    },
    {
        question: "Who was the first Prime Minister of India?",
        Answer: [
            { text: "Indira Gandhi", correct: "false" },
            { text: "Sardar Patel", correct: "false" },
            { text: "Rajiv Gandhi", correct: "false" },
            { text: "Jawaharlal Nehru", correct: "true" },
        ]
    },
    {
        question: "What is the capital city of India?",
        Answer: [
            { text: "Mumbai", correct: "false" },
            { text: "New Delhi", correct: "true" },
            { text: "Kolkata", correct: "false" },
            { text: "Chennai", correct: "false" },
        ] 
    },
    {
        question: "Which river is known as the 'Ganga of the South'?",
        Answer: [
            { text: "Godavari", correct: "true" },
            { text: "Brahmaputra", correct: "false" },
            { text: "Yamuna", correct: "false" },
            { text: "Kaveri", correct: "false" },
        ]
    },
    {
        question: "What is the longest river in India?",
        Answer: [
            { text: "Yamuna", correct: "false" },
            { text: "Brahmaputra", correct: "false" },
            { text: "Ganges", correct: "true" },
            { text: "Godavari", correct: "false" },
        ]
    },
    {
        question: "Which Indian state is known as the 'Spice Garden of India'?",
        Answer: [
            { text: "Kerala", correct: "true" },
            { text: "Karnataka", correct: "false" },
            { text: "Andhra Pradesh", correct: "false" },
            { text: "Tamil Nadu", correct: "false" },
        ]
    },
    {
        question: "Who is known as the 'Iron Man of India'?",
        Answer: [
            { text: "Sardar Patel", correct: "true" },
            { text: "Jawaharlal Nehru", correct: "false" },
            { text: "Subhas Chandra Bose", correct: "false" },
            { text: "Rajendra Prasad", correct: "false" },
        ]
    },
    {
        question: "In which year did India gain independence from British rule?",
        Answer: [
            { text: "1945", correct: "false" },
            { text: "1950", correct: "false" },
            { text: "1962", correct: "false" },
            { text: "1947", correct: "true" },
        ]
    },
    {
        question: "Which Indian state is known as the 'Land of Five Rivers'?",
        Answer: [
            { text: "Punjab", correct: "true" },
            { text: "Haryana", correct: "false" },
            { text: "Uttar Pradesh", correct: "false" },
            { text: "Rajasthan", correct: "false" },
        ]
    }
    

];



const questionElement = document.getElementById("question");
const answerbtns = document.getElementById("answer-button");
const nextpagebtn = document.getElementById("Next-btn");

let curentQuestionIndex = 0;
let score = 0;

function StartQuiz() {
    curentQuestionIndex = 0;
    score = 0;
    nextpagebtn.innerHTML = "NEXT";
    showQuestion();
}

function showQuestion() {
    resetestate();
    let currentQuestion = questions[curentQuestionIndex];
    let questionNO = curentQuestionIndex + 1;
    questionElement.innerHTML = questionNO + ". " + currentQuestion.question;

    currentQuestion.Answer.forEach(answers => {
        const button = document.createElement("button");
        button.innerHTML = answers.text;
        answerbtns.appendChild(button);

        button.addEventListener("click", () => selectAnswer(answers.correct === "true", button));
    });
}

function resetestate() {
    nextpagebtn.style.display = "none";
    while (answerbtns.firstChild) {
        answerbtns.removeChild(answerbtns.firstChild);
    }
}

function selectAnswer(isCorrect, selectedButton) {
    // Disable all buttons to prevent further clicks
    disableAllButtons();

    // Apply a class based on correctness to the selected button
    selectedButton.classList.add(isCorrect ? "correct" : "incorrect");

    // Apply "incorrect" class to other buttons
    Array.from(answerbtns.children).forEach(button => {
        if (button !== selectedButton && button.dataset.correct === "true") {
            button.classList.add("correct");
        } else if (button !== selectedButton && button.dataset.correct === "false") {
            button.classList.add("incorrect");
        }
        button.disabled = true; // Disable other buttons
    });

    // Update score for correct answers
    if (isCorrect) {
        score++;
    }

    // Proceed to the next question after a short delay
    setTimeout(() => {
        curentQuestionIndex++;
        if (curentQuestionIndex < questions.length) {
            showQuestion();
        } else {
            showscore();
        }
    }, 1000);
}

function disableAllButtons() {
    Array.from(answerbtns.children).forEach(button => {
        button.disabled = true;
    });
}

function showscore() {
    resetestate();
    questionElement.innerHTML = `You Scored ${score} Out of ${questions.length}!`;
    nextpagebtn.innerHTML = "Play Again";
    nextpagebtn.style.display = "block";
}

nextpagebtn.addEventListener("click", StartQuiz);

StartQuiz();