document.addEventListener("DOMContentLoaded", event => {
    const form = document.getElementById("quiz");
    const quizQuestions = document.getElementById("quiz-questions");
    const quizSubmit = document.getElementById("quiz-submit");
    const quizButtons = document.getElementById("quiz-buttons");

    //Only used for testpurposes (true = activates "test mode", false = disable "test mode")
    const testMode = false;
    //Only used for testpurposes

    //To add questions all you need to do is add a new object to this array, and everything is
    //created dynamically for you:
    let quizItems = [{
            question: "It's illegal in Texas to put what on your neighbour’s cow?",
            choices: { a: "Clothes", b: "Dirt", c: "Grafitti", d: "Nails" },
            answers: ["c"],
            correct: "Seriously? Texas law!?",
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

    //#region SETTINGS
    const body = document.querySelector("body");
    const settings = document.getElementById("settings");
    const settingsMenu = document.getElementById("settings-menu");
    const settingsClose = document.getElementById("settings-close");
    const settingsAdd = document.getElementById("settings-add");
    const settingsMenuAdd = document.getElementById("settings-menu-add");
    const settingsQuiz = document.getElementById("settings-quiz");

    const settingsClear = document.getElementById("settings-clear");
    const settingsMenuClear = document.getElementById("settings-menu-clear");
    const settingsClearClose = document.getElementById("settings-clear-close");
    const settingsQuizCancel = document.getElementById("settings-quiz-cancel");
    const settingsQuizDelete = document.getElementById("settings-quiz-delete");
    const createQuestionLink = document.getElementById("create-question-link");

    body.addEventListener("click", function(evt) {
        settingsMenu.classList.remove("js-active");
    });
    settings.addEventListener("click", function(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        settingsMenu.classList.toggle("js-active");
    });
    settingsMenuAdd.addEventListener("click", function(evt) {
        evt.preventDefault();
        settingsAdd.classList.add("js-active");
    });
    settingsMenuClear.addEventListener("click", function(evt) {
        evt.preventDefault();
        settingsClear.classList.add("js-active");
    });
    settingsClose.addEventListener("click", function(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        settingsAdd.classList.remove("js-active");
    });
    settingsClearClose.addEventListener("click", function(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        settingsClear.classList.remove("js-active");
    });
    settingsQuizCancel.addEventListener("click", function(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        settingsClear.classList.remove("js-active");
    });
    settingsQuizDelete.addEventListener("click", function(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        resetQuestions();
        quizItems = [];
        quizQuestions.innerHTML = "";
        quizButtons.classList.add("js-hidden");
        settingsClear.classList.remove("js-active");
        createQuestionLink.classList.add("js-active");
    });
    createQuestionLink.addEventListener("click", function(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        settingsAdd.classList.add("js-active");
    });

    settingsQuiz.addEventListener("submit", function(evt) {
        evt.preventDefault();
        const letters = "abcdefghijklmnopqrstuvwxyz";
        let letterIndex = 0;
        let obj = new Object();
        obj.question = document.getElementById("setting-question").value;
        let choices = document.getElementById("setting-choices").value.split(",");
        obj.choices = new Object();
        for (let i = 0; i < choices.length; i++) {
            const choice = choices[i];
            obj.choices[letters[letterIndex]] = choice;
            letterIndex++;
        }
        letterIndex = 0;
        obj.answers = [];
        let answers = document.getElementById("setting-answers").value.split(",");
        for (let i = 0; i < answers.length; i++) {
            const answer = answers[i];
            obj.answers.push(answer);
        }
        obj.scores = [0];
        let scores = document.getElementById("setting-score").value.split(",");
        for (let i = 0; i < scores.length; i++) {
            const score = scores[i];
            obj.scores.push(parseInt(score));
        }
        obj.correct = document.getElementById("setting-comment-correct").value;
        obj.partiallyCorrect = document.getElementById("setting-comment-partly-correct").value;
        obj.wrong = document.getElementById("setting-comment-wrong").value;
        obj.score = 0;
        obj.inputIDs = [];
        obj.answered = false;
        quizItems.push(obj);
        resetQuestions();
        createQuestions();
        settingsAdd.classList.remove("js-active");
        quizButtons.classList.remove("js-hidden");
        createQuestionLink.classList.remove("js-active");
    });
    //#endregion SETTINGS

    form.addEventListener("submit", function(evt) {
        evt.preventDefault();
        let scoreIndex = 0;
        let quizItemIndex = 0;
        //Loop through all answers (input elements) and compare answers with quizItems objects
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
        //Loop through quizItems objects to display score, comments and show which answers are correct/wrong
        for (let q = 0; q < quizItems.length; q++) {
            const quizItem = quizItems[q];
            const question = document.getElementById("js-question-" + q);
            let maxScore = quizItem.scores[quizItem.scores.length - 1];
            question.insertAdjacentHTML("beforeend", `<span class="quiz__result-score${quizItem.score == maxScore ? " quiz__result-score-max" : quizItem.score == 0 ? " quiz__result-score-min" : ""}">Score: ${quizItem.score} <i>/</i> <span>${maxScore}</span></span>`);
            Object.keys(quizItem.choices).forEach((key, choice) => {
                const id = `q${q + 1}c${choice + 1}`;
                const inputChoice = document.getElementById(id);
                const labelChoice = document.getElementById("label-" + id);
                inputChoice.disabled = true;
                if (quizItem.answers.includes(key) && !inputChoice.checked) {
                    labelChoice.classList.add("js-correct");
                } else if (quizItem.answers.includes(key)) {
                    labelChoice.classList.add("js-correct");
                } else if (inputChoice.checked) {
                    labelChoice.classList.add("js-wrong");
                }
            });
            if (quizItem.score == quizItem.scores[quizItem.scores.length - 1]) {
                question.insertAdjacentHTML("afterend", `<p class="quiz__result-comment js-comment">${quizItem.correct}</p>`);
            } else {
                if (quizItem.score == 0) {
                    question.insertAdjacentHTML("afterend", `<p class="quiz__result-comment js-comment">${quizItem.wrong}</p>`);
                } else {
                    question.insertAdjacentHTML("afterend", `<p class="quiz__result-comment js-comment">${quizItem.partiallyCorrect}</p>`);
                }
            }
        }
        quizSubmit.classList.remove("js-active");
        //Total score display and score info
        const totalScore = getTotalScore();
        const maxScore = getMaxScore();
        const bottomScoreMargin = Math.round(maxScore * 0.3);
        const topScoreMargin = Math.round(maxScore * 0.8);
        let scoreQuality = "good";
        if (totalScore < bottomScoreMargin) {
            scoreQuality = "bad";
        }
        if (totalScore > topScoreMargin) {
            scoreQuality = "fantastic";
        }
        let maxScoreText = "";
        if (totalScore == maxScore) {
            maxScoreText = `<p class="quiz__perfect-score">Perfect score! WOW!!!</p>`;
        }
        quizButtons.insertAdjacentHTML("beforebegin", `
            <div id="quiz-total-score" class="quiz__total-score-container">
                <div class="quiz__total-score-inner">
                    <p class="quiz__total-score-title">Total score: <span class="quiz__compare-${scoreQuality}">${totalScore}</span> / ${maxScore}</p>
                    ${maxScoreText}
                    <div class="quiz__compare">
                        <ul>
                            <li>Below <strong>${bottomScoreMargin}</strong>: <span class="quiz__compare-bad">Bad</span></li>
                            <li>Between <strong>${bottomScoreMargin}</strong> and <strong>${topScoreMargin}</strong>: <span class="quiz__compare-good">Good</span></li>
                            <li>Above <strong>${topScoreMargin}</strong>: <span class="quiz__compare-fantastic">Fantastic</span></li>
                        </ul>
                    </div>
                </div>
            </div>
        `);
        // document.getElementById("quiz-total-score").addEventListener("click", resetQuestions);
        const totalScoreArea = document.getElementById("quiz-total-score");
        totalScoreArea.addEventListener("click", function() {
                totalScoreArea.parentNode.removeChild(totalScoreArea);
            })
            // location.href = "index.html#quiz-total-score";
    }, false);

    form.addEventListener("reset", resetQuestions);

    //Create all question sections with input-elements and labels
    createQuestions();

    function resetQuestions() {
        //Remove all comments
        const commentElms = document.querySelectorAll(".js-comment");
        for (let i = commentElms.length - 1; i >= 0; i--) {
            const commentElm = commentElms[i];
            commentElm.parentNode.removeChild(commentElm);
        }
        //Remove all score elements
        const resultScoreElms = document.querySelectorAll(".quiz__result-score");
        for (let i = resultScoreElms.length - 1; i >= 0; i--) {
            const resultScoreElm = resultScoreElms[i];
            resultScoreElm.parentNode.removeChild(resultScoreElm);
        }
        //Remove color from labels styled with "correct" color
        const correctLabels = document.querySelectorAll(".js-correct");
        for (let i = correctLabels.length - 1; i >= 0; i--) {
            const correctLabel = correctLabels[i];
            correctLabel.classList.remove("js-correct");
        }
        //Remove color from labels styled with "wrong" color
        const wrongLabels = document.querySelectorAll(".js-wrong");
        for (let i = wrongLabels.length - 1; i >= 0; i--) {
            const wrongLabel = wrongLabels[i];
            wrongLabel.classList.remove("js-wrong");
        }
        //Reenable all input elements
        const inpAll = document.querySelectorAll("input");
        for (let i = 0; i < inpAll.length; i++) {
            const inp = inpAll[i];
            inp.disabled = false;
            inp.checked = false;
        }
        //Reset quizItems objects
        for (let i = 0; i < quizItems.length; i++) {
            const quizItem = quizItems[i];
            quizItem.score = 0;
            quizItem.answered = false;
        }
        //Remove total score info box
        const totalScoreArea = document.getElementById("quiz-total-score");
        if (totalScoreArea) {
            totalScoreArea.parentNode.removeChild(totalScoreArea);
        }
        //Disable submit button
        quizSubmit.classList.remove("js-active");
        quizSubmit.disabled = true;
    }

    function createQuestions() {
        quizQuestions.innerHTML = "";
        for (let q = 0; q < quizItems.length; q++) {
            const quizItem = quizItems[q];
            let type = "checkbox";
            if (quizItem.answers.length == 1) {
                type = "radio";
            }
            let input = "";
            Object.keys(quizItem.choices).forEach((key, choice) => {
                //Make sure the input elements has unique ID's.
                //Also adds value to use when looking up answers in quizItems objects
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
                <hr class="quiz__question-separator">
            `;
            quizQuestions.insertAdjacentHTML("beforeend", html);
            for (let i = 0; i < quizItem.inputIDs.length; i++) {
                const inputID = quizItem.inputIDs[i];
                const inp = document.getElementById(inputID);
                //EventListener listens to click on any input element
                //which controls the displaying of the "Check answers" -button
                inp.addEventListener("click", inpClicked);
            }

            //Only used for testpurposes (selects and checks the first input element in each group)
            if (testMode) {
                document.getElementById(quizItem.inputIDs[0]).checked = true;
                inpClicked();
            }
            //Only used for testpurposes

            function inpClicked() {
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
                    quizSubmit.classList.add("js-active");
                    quizSubmit.disabled = false;
                } else {
                    quizSubmit.classList.remove("js-active");
                    quizSubmit.disabled = true;
                }
            }
        }
    }

    function getTotalScore() {
        let score = 0;
        for (let i = 0; i < quizItems.length; i++) {
            const quizItem = quizItems[i];
            score += quizItem.score;
        }
        return score;
    }

    function getMaxScore() {
        let score = 0;
        for (let i = 0; i < quizItems.length; i++) {
            const quizItem = quizItems[i];
            score += quizItem.scores[quizItem.scores.length - 1];
        }
        return score;
    }
});