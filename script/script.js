
let questionElement = document.querySelector(".question")
const answerButton = document.querySelector(".answers")
const next = document.querySelector(".next")
const endQuiz = document.querySelector(".end-quiz")
const resetExam = document.querySelector(".reset-exam")
const anotherAnswer = document.querySelector(".another-answer")

    const questions = [
        {
            question: "1. Inside which HTML element do we put the javaScript?",
            answer: [
                {text: "script" , correct: true},
                {text: "link" , correct: false},
                {text: "meta" , correct: false},
                {text: "main" , correct: false}
            ]
        },
        {
            question: "2. Which Back-End works well with Vue.js ?",
            answer: [
                {text: "Laravel" , correct: false},
                {text: "Node.js" , correct: false},
                {text: "ASP.net" , correct: false},
                {text: "Django" , correct: true}
            ] 
        },
        {
            question: "3. Inside which HTML element do we put the CSS ?",
            answer: [
                {text: "meta" , correct: false},
                {text: "div" , correct: false},
                {text: "link" , correct: true},
                {text: "body" , correct: false},
            ]
        },
        {
            question: "4. What does P stand for in bootstrap ?",
            answer: [
                {text: "position" , correct: false},
                {text: "padding" , correct: true},
                {text: "p-tag" , correct: false},
                {text: "pink" , correct: false},
            ]
        },
        {
            question: "5. Which language we need to edit bootstrap ?",
            answer: [
                {text: "SCSS" , correct: true},
                {text: "SASS" , correct: false},
                {text: "CSS" , correct: false},
                {text: "SQL" , correct: false},
            ]
        }
    ];
    
    
    let currentQuestionIndex = 0;
    let score = 0;
    
    function showQuestion(){
        reset()
        let currentQuestion = questions[currentQuestionIndex];
        let questionNo = currentQuestionIndex + 1;
        questionElement.innerHTML = currentQuestion.question;
        
        currentQuestion.answer.forEach(answer => {
            const button = document.createElement("button")
            button.innerHTML = answer.text;
            button.classList.add("btn");
            answerButton.appendChild(button)
            if(answer.correct){
                button.dataset.correct = answer.correct
            }
            button.addEventListener('click', selectAnswer);
        })
    }

    function reset(){
        while(answerButton.firstChild){
            answerButton.removeChild(answerButton.firstChild)
        }
    }

    function selectAnswer(e){
        const selectedBtn = e.target
        const isCorrect = selectedBtn.dataset.correct == "true"
        if(isCorrect){
            score++;
        }
        selectedBtn.classList.add("selected")
        Array.from(answerButton.children).forEach(button => {
            if(button.classList.contains("selected") == false){
                button.disabled = true
            }
            
        })
    }

    anotherAnswer.addEventListener('click', resetAnswer)

    function resetAnswer(){

        const selectedButton =  document.querySelector(".selected");
        if(selectedButton.dataset.correct){
            score--;
        }  
        reset();
        showQuestion();  
    }

    next.addEventListener('click', ()=>{
        if(currentQuestionIndex < questions.length){
            nextButton();
        }
    })

  function  nextButton(){
        currentQuestionIndex++;
        if(currentQuestionIndex < questions.length){
            showQuestion()
        }
        else if(currentQuestionIndex == questions.length){
            next.disabled = true
        }

    }

    resetExam.addEventListener('click' , ()=>{
        reset();
        currentQuestionIndex = 0
        score = 0
        showQuestion();
    })

    endQuiz.addEventListener('click', ()=>{
        reset();
        questionElement.innerHTML = `You Scored ${score} out of ${questions.length}`;
        next.style.display ="none"
        endQuiz.style.display ="none"
        anotherAnswer.style.display ="none"
        resetExam.style.display ="none"

    })

    showQuestion();
    




