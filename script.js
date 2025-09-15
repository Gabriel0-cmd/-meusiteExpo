// Quiz Questions
const questions = [
  {
    question: "Qual é a principal causa do derretimento acelerado em locais de Patrimônio Mundial?",
    options: [
      "Atividade vulcânica",
      "Mudanças climáticas e aquecimento global",
      "Turismo excessivo",
      "Terremotos frequentes"
    ],
    correct: 1
  },
  {
    question: "Qual destes NÃO é um exemplo de local de Patrimônio Mundial afetado pelo derretimento?",
    options: [
      "Parque Nacional de Kilimanjaro",
      "Geleiras do Parque Nacional Los Glaciares",
      "Grande Barreira de Corais",
      "Torre Eiffel"
    ],
    correct: 3
  },
  {
    question: "Qual das seguintes é uma consequência direta do derretimento acelerado?",
    options: [
      "Aumento da biodiversidade",
      "Crescimento das calotas polares",
      "Elevação do nível do mar",
      "Diminuição da temperatura global"
    ],
    correct: 2
  }
];

// Variáveis do quiz
let currentQuestion = 0;
let userAnswers = new Array(questions.length).fill(null);
const quizContent = document.getElementById('quiz-content');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const submitBtn = document.getElementById('submit-btn');
const restartBtn = document.getElementById('restart-btn');
const resultDiv = document.getElementById('result');

// Inicializar Quiz
function initQuiz() {
  currentQuestion = 0;
  userAnswers = new Array(questions.length).fill(null);
  resultDiv.innerHTML = '';
  restartBtn.style.display = 'none';
  showQuestion(currentQuestion);
  updateButtons();
}

// Mostrar Pergunta
function showQuestion(index) {
  const question = questions[index];
  let optionsHtml = '';

  question.options.forEach((option, i) => {
    let emoji = '';
    if (userAnswers[index] !== null) {
      emoji = i === question.correct ? '✅' : '❌';
    }
    const checked = userAnswers[index] === i ? 'checked' : '';
    optionsHtml += `
      <div class="option">
        <label>
          <input type="radio" name="answer" value="${i}" ${checked}>
          ${String.fromCharCode(65 + i)}. ${option} ${emoji}
        </label>
      </div>
    `;
  });

  quizContent.innerHTML = `
    <div class="question">
      <h3>Questão ${index + 1} de ${questions.length}</h3>
      <p>${question.question}</p>
    </div>
    <div class="options">${optionsHtml}</div>
  `;

  const optionInputs = document.querySelectorAll('input[name="answer"]');
  optionInputs.forEach(input => {
    input.addEventListener('change', (e) => {
      userAnswers[index] = parseInt(e.target.value);
      showQuestion(index);
      updateButtons();
    });
  });
}

// Atualizar Botões
function updateButtons() {
  prevBtn.style.display = currentQuestion > 0 ? 'inline-block' : 'none';
  nextBtn.style.display = currentQuestion < questions.length - 1 ? 'inline-block' : 'none';
  submitBtn.style.display = currentQuestion === questions.length - 1 ? 'inline-block' : 'none';
  nextBtn.disabled = userAnswers[currentQuestion] === null;
  submitBtn.disabled = userAnswers.includes(null);
}

// Calcular Pontuação
function calculateScore() {
  return userAnswers.reduce((acc, ans, idx) => ans === questions[idx].correct ? acc + 1 : acc, 0);
}

// Mostrar Resultados
function showResults() {
  const score = calculateScore();
  const percentage = (score / questions.length) * 100;
  let message = '';

  if (percentage >= 80) message = 'Parabéns! Excelente conhecimento!';
  else if (percentage >= 60) message = 'Bom trabalho! Você tem um bom entendimento.';
  else if (percentage >= 40) message = 'Você sabe algumas coisas, mas pode aprender mais.';
  else message = 'Estude mais sobre o tema!';

  resultDiv.innerHTML = `
    <h3>Resultado: ${score} de ${questions.length} (${percentage.toFixed(1)}%)</h3>
    <p>${message}</p>
  `;
  restartBtn.style.display = 'inline-block';
}

// Botões de navegação
prevBtn.addEventListener('click', () => {
  if (currentQuestion > 0) {
    currentQuestion--;
    showQuestion(currentQuestion);
    updateButtons();
  }
});

nextBtn.addEventListener('click', () => {
  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    showQuestion(currentQuestion);
    updateButtons();
  }
});

submitBtn.addEventListener('click', showResults);
restartBtn.addEventListener('click', initQuiz);

document.addEventListener('DOMContentLoaded', initQuiz);