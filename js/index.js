document.addEventListener("DOMContentLoaded", event => {
    const form = document.getElementById("quiz");
    const quizQuestions = document.getElementById("quiz-questions");
    const quizSubmit = document.getElementById("quiz-submit");

    const quizItems = [{
            question: "It's illegal in Texas to put what on your neighbour’s Cow?",
            choices: { a: "Clothes", b: "Dirt", c: "Grafitti", d: "Nails" },
            answers: ["c"],
            correct: "Seriously? Texas law?",
            partiallyCorrect: "",
            wrong: "Sorry! The correct answer is Grafitti (really?).",
            scores: [0, 10],
            score: 0,
            inputIDs: [],
            answered: false,
        },
        {
            question: "What is the most common color of toilet paper in France?",
            choices: { a: "White", b: "Yellow", c: "Blue", d: "Pink" },
            answers: ["d"],
            correct: "Really! Pink? They are weird, those french dudes!",
            partiallyCorrect: "",
            wrong: "Sorry! The correct answer is Pink.",
            scores: [0, 10],
            score: 0,
            inputIDs: [],
            answered: false,
        },
        {
            question: "What is the boiling point of water?",
            choices: { a: "93.4°C", b: "212°F", c: "100°C", d: "200.1°F" },
            answers: ["a", "b", "c", "d"],
            correct: "You are absolutely right. All selected choices are correct!",
            partiallyCorrect: "Actually, all choices are correct! The boiling point of any liquid is dependant on pressure. For example, water boils at 100°C (212°F) at sea level, but 93.4°C (200.1°F) at 1,905 metres altitude.",
            wrong: "Baaah",
            scores: [0, 5, 10, 15, 20],
            score: 0,
            inputIDs: [],
            answered: false,
        },
        {
            question: "H2O is the chemical formula for what?",
            choices: { a: "Beer", b: "Air", c: "Salt", d: "Water" },
            answers: ["d"],
            correct: "You are absolutely right!",
            partiallyCorrect: "",
            wrong: "Nope! The correct answer is Water",
            scores: [0, 5],
            score: 0,
            inputIDs: [],
            answered: false,
        },
        {
            question: "Which color-pairs are complementary to each other?",
            choices: { a: "Green/Red", b: "Blue/Green", c: "Yellow/Blue", d: "Red/Orange", e: "Blue/Red" },
            answers: ["a", "c"],
            correct: "You are absolutely right! Both answers are correct!",
            partiallyCorrect: "Almost! Both Green/Red and Yellow/Blue are the correct answers.",
            wrong: "Nope! The correct answers are Green/Red and Yellow/Blue.",
            scores: [0, 10, 20],
            score: 0,
            inputIDs: [],
            answered: false,
        },
        {
            question: "From which movie do we know the character Han Solo?",
            choices: { a: "Lord of the Rings", b: "Star Wars", c: "Star Trek", d: "Harry Potter", e: "The Ring" },
            answers: ["b"],
            correct: "You are absolutely right!",
            partiallyCorrect: "",
            wrong: "Not even close! The correct answer is Star Wars.",
            scores: [0, 20],
            score: 0,
            inputIDs: [],
            answered: false,
        },
        {
            question: "In New York it is illegal to jump off a building! What is the required penalty for that?",
            choices: { a: "10 years in prison", b: "To be beaten by 3 police officers", c: "Death penalty", d: "A 1000 dollar fine" },
            answers: ["c"],
            correct: "You are absolutely right! That is stupid, by the way!",
            partiallyCorrect: "",
            wrong: "Nope! The correct answer is Death penalty! Yes, really!",
            scores: [0, 10],
            score: 0,
            inputIDs: [],
            answered: false,
        },
    ]

    form.addEventListener("submit", function(evt) {
        evt.preventDefault();
        if (!quizSubmit.classList.contains("js-active")) {
            return;
        }
        let scoreIndex = 0;
        let quizItemIndex = 0;
        for (let i = 0; i < form.length; i++) {
            if (form[i].nodeName == "INPUT") {
                const index = parseInt(form[i].name);
                if (quizItemIndex != index) {
                    quizItems[quizItemIndex].score = quizItems[quizItemIndex].scores[scoreIndex];
                    quizItemIndex = index;
                    scoreIndex = 0;
                }
                if (form[i].checked) {
                    const answer = form[i].value;
                    if (quizItems[index].answers.includes(answer)) {
                        scoreIndex++;
                    }
                }
            }
        }
        quizItems[quizItemIndex].score = quizItems[quizItemIndex].scores[scoreIndex];
        for (let q = 0; q < quizItems.length; q++) {
            const quizItem = quizItems[q];
            const question = document.getElementById("js-question-" + q);
            let maxScore = quizItem.scores[quizItem.scores.length - 1];
            question.insertAdjacentHTML("beforeend", `<span class="quiz__result-score${quizItem.score == maxScore ? " quiz__result-score-max" : quizItem.score == 0 ? " quiz__result-score-min" : ""}">Score: ${quizItem.score} <i>/</i> <span>${maxScore}</span></span>`);
            Object.keys(quizItem.choices).forEach((key, choice) => {
                const id = `q${q + 1}c${choice + 1}`;
                const inputChoice = document.getElementById(id);
                const labelChoice = document.getElementById("label-" + id);
                if (quizItem.answers.includes(key) && !inputChoice.checked) {
                    labelChoice.classList.add("js-correct");
                } else if (quizItem.answers.includes(key)) {
                    labelChoice.classList.add("js-correct");
                } else if (inputChoice.checked) {
                    labelChoice.classList.add("js-wrong");
                }
            });
            if (quizItem.score == quizItem.scores[quizItem.scores.length - 1]) {
                question.insertAdjacentHTML("afterend", `<p class="quiz__result-comment">${quizItem.correct}</p>`);
            } else {
                if (quizItem.score == 0) {
                    question.insertAdjacentHTML("afterend", `<p class="quiz__result-comment">${quizItem.wrong}</p>`);
                } else {
                    question.insertAdjacentHTML("afterend", `<p class="quiz__result-comment">${quizItem.partiallyCorrect}</p>`);
                }
            }
        }
    }, false);

    createQuestions();

    function createQuestions() {
        for (let q = 0; q < quizItems.length; q++) {
            const quizItem = quizItems[q];
            let type = "checkbox";
            if (quizItem.answers.length == 1) {
                type = "radio";
            }
            let input = "";
            Object.keys(quizItem.choices).forEach((key, choice) => {
                const id = `q${q + 1}c${choice + 1}`;
                input += `
                    <input type="${type}" id="${id}" name="${q}" value="${key}">
                    <label id="label-${id}" class="quiz__choice" for="${id}">${quizItem.choices[key]}</label>
                `;
                quizItem.inputIDs.push(id);
            });
            let html = `
                <div class="quiz__question">
                    <p id="js-question-${q}">${quizItem.question}</p>
                    <div id="quiz-group-${q}" class="quiz__group">
                        ${input}
                    </div>
                </div>
            `;
            quizQuestions.insertAdjacentHTML("beforeend", html);
            for (let i = 0; i < quizItem.inputIDs.length; i++) {
                const inputID = quizItem.inputIDs[i];
                const inp = document.getElementById(inputID);
                inp.addEventListener("click", function() {
                    let allGood = false;
                    for (let a = 0; a < quizItem.inputIDs.length; a++) {
                        const inputGroupID = quizItem.inputIDs[a];
                        const inpGroup = document.getElementById(inputGroupID);
                        if (inpGroup.checked) {
                            allGood = true;
                        }
                    }
                    quizItem.answered = allGood;
                    let allAnswered = true;
                    for (let iQuizItems = 0; iQuizItems < quizItems.length; iQuizItems++) {
                        const quizItem = quizItems[iQuizItems];
                        if (!quizItem.answered) {
                            allAnswered = false;
                        }
                    }
                    if (allAnswered) {
                        quizSubmit.classList.add("js-active")
                    } else {
                        quizSubmit.classList.remove("js-active")
                    }
                })
            }
        }
    }
});