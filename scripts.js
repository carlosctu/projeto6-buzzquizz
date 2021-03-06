/* você aqui */
// Criação do Quizz
// Navegação entre páginas
let qtQuestions,
  qtLevels,
  quizzSelectedObject,
  idClicked,
  quizzClicked,
  counterFalse,
  counterTrue,
  scrollCounter,
  counterComputedQuestions;
const questions = [];
const levels = [];

display1();

function createQuizz(element) {
  const hideContent = element.parentNode.parentNode.parentNode;
  hideContent.classList.add("hidden");
  document.querySelector(".basic-info").classList.remove("hidden");
}
function goHome(element) {
  const hideContent = element.parentNode.parentNode;
  hideContent.classList.add("hidden");
  document.querySelector(".content").classList.remove("hidden");
}
function nextPage(element) {
  const section = element.parentNode.classList;
  element.parentNode.classList.add("hidden");
  if (section.contains("basic-info")) {
    document.querySelector(".quiz-questions").classList.remove("hidden");
    qtQuestions = element.querySelector(".basic-info-questions").value;
    qtLevels = element.querySelector(".basic-info-questions-levels").value;
    createQuestions(qtQuestions);
    createLevels(qtLevels);
  } else if (section.contains("quiz-questions")) {
    document.querySelector(".quiz-levels").classList.remove("hidden");
  } else if (section.contains("quiz-levels")) {
    document.querySelector(".quiz-success").classList.remove("hidden");
    sendBasicInfo();
  }
}
//Cria perguntas
function createQuestions(qtQuestions) {
  const questionLabel = document.querySelector(".question-form");
  for (let i = 1; i <= qtQuestions; i++) {
    questionLabel.innerHTML += `<div class="question-label ${i}"><span>Pergunta ${i}</span><button type="button" onclick="openQuestion(this)"><ion-icon name="create-outline"></ion-icon></button></div>`;
    questionLabel.innerHTML += `<div class="question-info question-${i} hidden"><div class="question">
      <span>Pergunta ${i}</span>
      <div>
        <input class="title-question-${i}" type="text" placeholder="Texto da pergunta" minlength="20"  required/>
        <input class="color-question-${i}" type="text" placeholder="Cor de fundo da pergunta (Ex: #ffffff)" pattern="[#A-Za-z0-9]{7}"required/>
      </div>
    </div>
    <div class="question-right-answer">
      <span>Resposta correta</span>
      <div>
        <input class="right-answer-${i}" type="text" placeholder="Resposta correta"  required/>
        <input class="url-answer-${i}" type="url" placeholder="URL da imagem"  required/>
      </div>
    </div>
    <div class="question-wrong-answer">
      <span>Respostas incorretas</span>
      <div class="wrong-answer-1">
        <input class="wrong-answer-1" type="text" placeholder="Resposta incorreta"  required/>
        <input class="url-wrong-answer-1" type="url" placeholder="URL da imagem" required/>
      </div>
      <div class="wrong-answer-2">
        <input class="wrong-answer-2" type="text" placeholder="Resposta incorreta" />
        <input class="url-wrong-answer-2" type="url" placeholder="URL da imagem" />
      </div>
      <div class="wrong-answer-3">
        <input class="wrong-answer-3" type="text" placeholder="Resposta incorreta" />
        <input class="url-wrong-answer-3" type="url" placeholder="URL da imagem" />
      </div>
    </div>
    </div>`;
  }
  questionLabel.innerHTML += `<div class="quiz-button "><button type="submit">Prosseguir para criar níveis</button></div>`;
}
// Abrir/Editar pergunta do Quizz
function openQuestion(element) {
  const parent = element.parentNode;
  const allQuestions = parent.parentNode.querySelectorAll(".question-info");
  const questionOpened = document.querySelector(".opened-question");
  const labelClosed = document.querySelector(".closed-question");
  parent.classList.add("closed-question");
  parent.classList.add("hidden");
  if (questionOpened == null || questionOpened == "") {
    allQuestions[parent.classList[1] - 1].classList.remove("hidden");
    allQuestions[parent.classList[1] - 1].classList.add("opened-question");
  } else {
    questionOpened.classList.add("hidden");
    questionOpened.classList.remove("opened-question");
    labelClosed.classList.remove("hidden");
    labelClosed.classList.remove("closed-question");
    allQuestions[parent.classList[1] - 1].classList.remove("hidden");
    allQuestions[parent.classList[1] - 1].classList.add("opened-question");
  }
}
//Cria niveis
function createLevels(qtLevels) {
  const levelLabel = document.querySelector(".levels-form");
  for (let i = 1; i <= qtLevels; i++) {
    levelLabel.innerHTML += `<div class="levels-label ${i}"><span>Nível ${i}</span><button type="button" onclick="openLevel(this)"><ion-icon name="create-outline"></ion-icon></button></div>`;
    if (i == 1) {
      levelLabel.innerHTML += `<div class="level-info ${i} hidden">
      <div class="level">
      <span>Nível ${i}</span>
      <div>
        <input
          class="level-title-${i}"
          type="text"
          placeholder="Título do nível"
          minlength="10"
          required
        />
        <input
        class="level-minvalue-${i}"
          type="number"
          placeholder="% de acerto mínimo (informar 0)"
          min="0"
          max="0"
          required
        />
        <input class="level-url-${i}" type="url" placeholder="URL da imagem do nível" required />
        <textarea
          class="level-text-area-${i}"
          cols="30"
          rows="7"
          placeholder="Descrição do nível"
          minlength="30"
          required
    ></textarea>`;
    } else {
      levelLabel.innerHTML += `<div class="level-info ${i} hidden">
    <div class="level">
      <span>Nível ${i}</span>
      <div>
        <input
          class="level-title-${i}"
          type="text"
          placeholder="Título do nível"
          minlength="10"
          required
        />
        <input
          class="level-minvalue-${i}"
          type="number"
          placeholder="% de acerto mínima"
          min="0"
          max="100"
          required
        />
        <input class="level-url-${i}" type="url" placeholder="URL da imagem do nível" required />
        <textarea
        class="level-text-area-${i}"
          cols="30"
          rows="7"
          placeholder="Descrição do nível"
          minlength="30"
          required
    ></textarea>`;
    }
  }
  levelLabel.innerHTML += `<div class="levels-button"><button type="submit">Finalizar Quizz</button></div>`;
}
// Abrir/Editar level do Quizz
function openLevel(element) {
  const parent = element.parentNode;
  const allQuestions = parent.parentNode.querySelectorAll(".level-info");
  const levelOpened = document.querySelector(".opened-level");
  const labelClosed = document.querySelector(".closed-level");
  parent.classList.add("closed-level");
  parent.classList.add("hidden");
  if (levelOpened == null || levelOpened == "") {
    allQuestions[parent.classList[1] - 1].classList.remove("hidden");
    allQuestions[parent.classList[1] - 1].classList.add("opened-level");
  } else {
    levelOpened.classList.add("hidden");
    levelOpened.classList.remove("opened-level");
    labelClosed.classList.remove("hidden");
    labelClosed.classList.remove("closed-level");
    allQuestions[parent.classList[1] - 1].classList.remove("hidden");
    allQuestions[parent.classList[1] - 1].classList.add("opened-level");
  }
}
function getQuestions(i) {
  let answers = [];
  let contWrongAnswers = 0;
  let question = {};

  question = {
    title: document.querySelector(`.title-question-${i}`).value,
    color: document.querySelector(`.color-question-${i}`).value,
    answers: answers,
  };

  const rightAnswer = {
    text: document.querySelector(`.right-answer-${i}`).value,
    image: document.querySelector(`.url-answer-${i}`).value,
    isCorrectAnswer: true,
  };

  answers.push(rightAnswer);

  while (contWrongAnswers !== 3) {
    wrongAnswerValidator = document.querySelector(
      `.wrong-answer-${contWrongAnswers + 1} input`
    ).value;
    contWrongAnswers++;
  }

  for (let j = 1; j <= contWrongAnswers; j++) {
    let text = document.querySelector(
      `.question-${i} .wrong-answer-${j} input`
    ).value;
    if (text !== "") {
      let wrongAnswer = {
        text: text,
        image: document.querySelector(`.question-${i} .url-wrong-answer-${j}`)
          .value,
        isCorrectAnswer: false,
      };
      answers.push(wrongAnswer);
    }
    wrongAnswer = {};
  }
  questions.push(question);
  answers = [];
  question = {};
}
function getLevels(j) {
  let level = {};
  let minvalue = document.querySelector(`.level-minvalue-${j}`).value;
  level = {
    title: document.querySelector(`.level-title-${j}`).value,
    image: document.querySelector(`.level-url-${j}`).value,
    text: document.querySelector(`.level-text-area-${j}`).value,
    minValue: parseInt(minvalue),
  };
  levels.push(level);
  level = {};
}
function sendBasicInfo() {
  const title = document.querySelector(".basic-info-title").value;
  const image = document.querySelector(".basic-info-image").value;
  const quizCreatedScreen = document.querySelector(".sucess-image");
  quizCreatedScreen.innerHTML = `<img src="${image}" alt="User quiz image" /><div class="success-quiz-title">${title}</div>`;
  for (let i = 1; i <= qtQuestions; i++) {
    getQuestions(i);
  }

  for (let j = 1; j <= qtLevels; j++) {
    getLevels(j);
  }

  const infoQuizz = {
    title: title,
    image: image,
    questions: questions,
    levels: levels,
  };

  // Post: post("endpoint do AXIOS", dados -> neste caso seria o "info")
  const promisse = axios.post(
    "https://mock-api.driven.com.br/api/v7/buzzquizz/quizzes",
    infoQuizz
  );
  promisse.then((data) => {
    let userQuizzes = [];
    const deserializedInfo = localStorage.getItem("userQuizzes");
    let list = JSON.parse(deserializedInfo);
    if (list !== null) {
      userQuizzes = list;
    }
    const response = data;
    let quizzInfos = {
      id: response.data.id,
      title: response.data.title,
      image: response.data.image,
    };
    document
      .querySelector(".sucess-button")
      .classList.add(`q${response.data.id}`);
    userQuizzes.push(quizzInfos);
    let serializedInfo = JSON.stringify(userQuizzes);
    // Chave para pegar do localStorage: "userQuizzes", Data: serializeInfo
    localStorage.setItem("userQuizzes", serializedInfo);
  });
  promisse.catch(() => {
    console.log("Deu um erro no envio dos dados de Info Basicas");
  });
}
function showUserQuiz() {
  document.querySelector(".quiz-success").classList.add("hidden");
  document.querySelector(".content").classList.remove("hidden");
}
/*
------------------------------------------------------------------------------------------------------------
*/

/* Tela 1 Lista de Quizzes */
function display1() {
  let content;
  let userBannedList = [];
  let promisseGetQuizzes = axios.get(
    "https://mock-api.driven.com.br/api/v7/buzzquizz/quizzes"
  );
  promisseGetQuizzes.then(displayTheQuizzes);

  function displayTheQuizzes(answer) {
    const deserializedInfo = localStorage.getItem("userQuizzes");
    const list = JSON.parse(deserializedInfo);
    let userList = list;
    let quizzes = answer.data;
    content = document.querySelector(".content");

    if (list == null) {
      content.innerHTML = `
      <div class="display-lists">
      <div class="user-none-quizzes">
        <div class="none-quizzes-alert">
          Você não criou nenhum quizz ainda :(
        </div>
        <div class="button-create-quizz" onclick="createQuizz(this)">Criar Quizz</div>
      </div>
      <div class="all-quizzes">
        <div class="title-all-quizzes">Todos os Quizzes</div>
        <div class="all-quizzes-list"></div>
      </div>
      `;

      let displayAllList = document.querySelector(".all-quizzes-list");
      for (let i = 0; i < quizzes.length; i++) {
        displayAllList.innerHTML += `
        <div class="quizz q${quizzes[i].id}" onclick="display2(this)">
          <img src="${quizzes[i].image}" class="quizz-image">
          <div class="quizz-image-gradient"></div>
          <p>${quizzes[i].title}</p>
        </div>
        `;
      }
    } else {
      content.innerHTML = `
      <div class="user-quizzes">
        <div class="title-user-quizzes">  
          <p>Seus Quizzes</p><button onclick="createQuizz(this)"><ion-icon name="add-circle"></ion-icon></button>
        </div>
        <div class="user-quizzes-list"></div>
      </div>
      <div class="all-quizzes">
        <div class="title-all-quizzes">Todos os Quizzes</div>
        <div class="all-quizzes-list"></div>
      </div>
      `;

      let displayUserList = document.querySelector(".user-quizzes-list");
      for (let i = 0; i < list.length; i++) {
        displayUserList.innerHTML += `
        <div class="quizz q${list[i].id}" onclick="display2(this)">
          <img src="${list[i].image}" class="quizz-image">
          <div class="quizz-image-gradient"></div>
          <p>${list[i].title}</p>
        </div>
        `;
      }
      for (userList of userList) {
        userBannedList.push(userList.id);
      }

      let displayAllList = document.querySelector(".all-quizzes-list");
      for (let i = 0; i < quizzes.length; i++) {
        if (!userBannedList.includes(quizzes[i].id)) {
          displayAllList.innerHTML += `
          <div class="quizz q${quizzes[i].id}" onclick="display2(this)"><img src="${quizzes[i].image}" class="quizz-image"><div class="quizz-image-gradient"></div><p>${quizzes[i].title}</p></div>
          `;
        }
      }
    }
  }
}
/* Tela 2 Página de um Quizz */

function display2(quizzClickedDiv) {
  counterFalse = 0;
  counterTrue = 0;
  scrollCounter = 0;
  counterComputedQuestions = 0;
  console.log(quizzClickedDiv);

  for (let i = 0; i < 10000; i++) {
    if (quizzClickedDiv.classList.contains(`q${i}`) === true) {
      idClicked = i;
      let promisseGetQuizzClicked = axios.get(
        `https://mock-api.driven.com.br/api/v7/buzzquizz/quizzes/${idClicked}`
      );
      promisseGetQuizzClicked.then(displayTheQuizzClicked);
    }
  }

  function displayTheQuizzClicked(answer) {
    quizzSelectedObject = answer.data;
    quizzClicked = answer.data;
    content = document.querySelector(".content");
    content.scrollIntoView({
      block: "start",
      inline: "nearest",
      behavior: "smooth",
    });

    content.innerHTML = `
    <div class="title-in-quizz">
      <p>${quizzClicked.title}</p>
      <img src="${quizzClicked.image}">
      <div class="title-in-quizz-gradient"></div>
    </div>
    <div class="questions-in-quizz"></div>
    <div class="sucess-content"></div>
    `;
    let clickedQuizzQuestionsArray = quizzClicked.questions;
    let clickedQuizzQuestionsList = document.querySelector(
      ".questions-in-quizz"
    );
    for (let i = 0; i < clickedQuizzQuestionsArray.length; i++) {
      clickedQuizzQuestionsList.innerHTML += `
      <div class="question-in-quizz">
        <div style="background-color:${clickedQuizzQuestionsArray[i].color}" class="title-question-in-quizz">
          <p>${clickedQuizzQuestionsArray[i].title}</p>
        </div>
        <div class="answers-question-in-quizz answers-question-in-quizz${i}"></div>
      </div>
      `;
      let clickedQuizzAnswersArray = clickedQuizzQuestionsArray[i].answers;
      let clickedQuizzAnswersList = document.querySelector(
        `.answers-question-in-quizz${i}`
      );
      let clickedQuizzAnswersArraySort =
        clickedQuizzAnswersArray.sort(comparator);
      for (let j = 0; j < clickedQuizzAnswersArray.length; j++) {
        if (clickedQuizzAnswersArraySort[j].isCorrectAnswer === true) {
          clickedQuizzAnswersList.innerHTML += `
          <div class="answer-question-in-quizz correct-answer" onclick="calculateQuizzSuccess(this)">
            <img src="${clickedQuizzAnswersArraySort[j].image}">
            <p>${clickedQuizzAnswersArraySort[j].text}</p>
          </div>
            `;
        }
        if (clickedQuizzAnswersArraySort[j].isCorrectAnswer === false) {
          clickedQuizzAnswersList.innerHTML += `
          <div class="answer-question-in-quizz incorrect-answer" onclick="calculateQuizzSuccess(this)">
            <img src="${clickedQuizzAnswersArraySort[j].image}">
            <p>${clickedQuizzAnswersArraySort[j].text}</p>
          </div>
            `;
        }
      }
    }
  }
}
function calculateQuizzSuccess(answerClickedDiv) {
  if (answerClickedDiv.classList.contains("correct-answer") === true) {
    answerClickedDiv.onclick = null;
    answerClickedDiv.classList.add("answer-question-in-quizz-true");
    let divQuestionsIn = answerClickedDiv.parentNode;
    const falseAnswersArray =
      divQuestionsIn.querySelectorAll(".incorrect-answer");
    falseAnswersArray.forEach((answer) => {
      answer.classList.add("answer-question-in-quizz-false");
      answer.onclick = null;
    });
    counterTrue++;
    counterComputedQuestions++;
    divQuestionsIn.onclick = null;
  }
  if (answerClickedDiv.classList.contains("incorrect-answer") === true) {
    answerClickedDiv.onclick = null;
    let divQuestionsIn = answerClickedDiv.parentNode;
    const falseAnswersArray =
      divQuestionsIn.querySelectorAll(".incorrect-answer");
    falseAnswersArray.forEach((answer) => {
      answer.classList.add("answer-question-in-quizz-false");
      answer.onclick = null;
    });
    answerClickedDiv.classList.add("answer-question-in-quizz-false-selected");
    divQuestionsIn
      .querySelector(".correct-answer")
      .classList.add("answer-question-in-quizz-true-nonselected");
    divQuestionsIn.querySelector(".correct-answer").onclick = null;
    counterFalse++;
    counterComputedQuestions++;
  }
  let questionIn = document.querySelectorAll(".question-in-quizz");
  if (scrollCounter < questionIn.length - 1) {
    scrollCounter++;
    setTimeout(scrollerQuestions, 2000);
    function scrollerQuestions() {
      questionIn[scrollCounter].scrollIntoView({
        block: "end",
        inline: "nearest",
        behavior: "smooth",
      });
    }
  }
  if (counterComputedQuestions === questionIn.length) {
    content = document.querySelector(".content");
    percentSucess = (counterTrue / (counterTrue + counterFalse)) * 100;
    percentSucessFixed = Math.round(percentSucess);
    let clickedQuizzLevelsArray = quizzClicked.levels;
    clickedQuizzLevelsArray.sort(orderMaker);
    let sucessContent = document.querySelector(".sucess-content");
    for (let i = 0; i < clickedQuizzLevelsArray.length; i++) {
      if (percentSucessFixed >= clickedQuizzLevelsArray[i].minValue) {
        sucessContent.innerHTML = `
        <div class="quizz-sucess-report">
          <div class="title-quizz-sucess-report">
            <p>${percentSucessFixed}% de acerto: ${clickedQuizzLevelsArray[i].title}</p>
          </div>
          <div class="description-quizz-sucess-report">
            <img src="${clickedQuizzLevelsArray[i].image}">
            <p>${clickedQuizzLevelsArray[i].text}</p>
          </div>
        </div>

        <div class="button-reset-quizz q${idClicked}" onclick="display2(this)">Reiniciar Quizz</div>
        <div class="button-back-home" onclick="reset()">Voltar pra home</div>
        `;
      }
    }
    setTimeout(scrollerSuccess, 2000);
    function scrollerSuccess() {
      document.querySelector(".quizz-sucess-report").scrollIntoView({
        block: "end",
        inline: "nearest",
        behavior: "smooth",
      });
    }
  }
}

function comparator() {
  return Math.random() - 0.5;
}

function orderMaker(lvl1, lvl2) {
  if (lvl1.minValue > lvl2.minValue) {
    return 1;
  }
  if (lvl1.minValue < lvl2.minValue) {
    return -1;
  }
  return 0;
}

function reset() {
  window.location.reload();
}
