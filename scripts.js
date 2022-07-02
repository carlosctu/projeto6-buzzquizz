/* você aqui */
// Criação do Quizz
// Navegação entre páginas
let qtQuestions, qtLevels;

function nextPage(element) {
  const section = element.parentNode.classList;
  console.log(section);
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
  }
}
//Cria perguntas
function createQuestions(qtQuestions) {
  const questionLabel = document.querySelector(".question-form");
  for (let i = 1; i <= qtQuestions; i++) {
    questionLabel.innerHTML += `<div class="question-label ${i}"><span>Pergunta ${i}</span><button type="button" onclick="openQuestion(this)"><ion-icon name="create-outline"></ion-icon></button></div>`;
    questionLabel.innerHTML += `<div class="question-info ${i} hidden"><div class="question">
      <span>Pergunta ${i}</span>
      <div>
        <input type="text" placeholder="Texto da pergunta" minlength="20"  required/>
        <input type="text" placeholder="Cor de fundo da pergunta (Ex: #ffffff)" pattern="[#A-Za-z0-9]{7}"required/>
      </div>
    </div>
    <div class="question-right-answer">
      <span>Resposta correta</span>
      <div>
        <input type="text" placeholder="Resposta correta"  required/>
        <input type="url" placeholder="URL da imagem"  required/>
      </div>
    </div>
    <div class="question-wrong-answer">
      <span>Respostas incorretas</span>
      <div class="wrong-answer">
        <input type="text" placeholder="Resposta incorreta"  required/>
        <input type="url" placeholder="URL da imagem" required/>
      </div>
      <div class="wrong-answer">
        <input type="text" placeholder="Resposta incorreta" />
        <input type="url" placeholder="URL da imagem" />
      </div>
      <div class="wrong-answer">
        <input type="text" placeholder="Resposta incorreta" />
        <input type="url" placeholder="URL da imagem" />
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
          type="text"
          placeholder="Título do nível"
          minlength="10"
          required
        />
        <input
          type="number"
          placeholder="% de acerto mínimo (informar 0)"
          min="0"
          max="0"
          required
        />
        <input type="url" placeholder="URL da imagem do nível" required />
        <textarea
          class="text-area"
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
          type="text"
          placeholder="Título do nível"
          minlength="10"
          required
        />
        <input
          type="number"
          placeholder="% de acerto mínima"
          min="0"
          max="100"
          required
        />
        <input type="url" placeholder="URL da imagem do nível" required />
        <textarea
          class="text-area"
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

// Tela 3.1 - Info básica do Quiz
// function sendBasicInfo() {
//   const title = document.querySelector(".basic-info-title").value;
//   const image = document.querySelector(".basic-info-image").value;
//   const info = {
//     title: title,
//     image: image,
//     questions: [
//       {
//         title: "Título da pergunta 1",
//         color: "#123456",
//         answers: [
//           {
//             text: "Texto da resposta 1",
//             image: "https://http.cat/411.jpg",
//             isCorrectAnswer: true,
//           },
//           {
//             text: "Texto da resposta 2",
//             image: "https://http.cat/412.jpg",
//             isCorrectAnswer: false,
//           },
//         ],
//       },
//       {
//         title: "Título da pergunta 2",
//         color: "#123456",
//         answers: [
//           {
//             text: "Texto da resposta 1",
//             image: "https://http.cat/411.jpg",
//             isCorrectAnswer: true,
//           },
//           {
//             text: "Texto da resposta 2",
//             image: "https://http.cat/412.jpg",
//             isCorrectAnswer: false,
//           },
//         ],
//       },
//       {
//         title: "Título da pergunta 3",
//         color: "#123456",
//         answers: [
//           {
//             text: "Texto da resposta 1",
//             image: "https://http.cat/411.jpg",
//             isCorrectAnswer: true,
//           },
//           {
//             text: "Texto da resposta 2",
//             image: "https://http.cat/412.jpg",
//             isCorrectAnswer: false,
//           },
//         ],
//       },
//     ],
//     levels: [
//       {
//         title: "Título do nível 1",
//         image: "https://http.cat/411.jpg",
//         text: "Descrição do nível 1",
//         minValue: 0,
//       },
//       {
//         title: "Título do nível 2",
//         image: "https://http.cat/412.jpg",
//         text: "Descrição do nível 2",
//         minValue: 50,
//       },
//     ],
//   };

//   // Post: post("endpoint do AXIOS", dados -> neste caso seria o "info")
//   const promisse = axios.post(
//     "https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes",
//     info
//   );
//   promisse.then((response) => {
//     const title = response.data.title;
//     const image = response.data.image;
//     console.log(title, image);
//   });
//   promisse.catch(() =>
//     console.log("Deu um erro no envio dos dados de Info Basicas")
//   );
// }
// Tela 3.2 - Perguntas do Quiz

/*

------------------------------------------------------------------------------------------------------------

Podemos separar somente o código do JS com esse comentário, pode ficar mais organizado para cada um de nós.
Mas depois quando formos entregar, a gente retira esse comentário aqui.
Aí a partir daqui sou eu com o display e listagem, e antes seria você com a criação do quizz.

------------------------------------------------------------------------------------------------------------

*/

/* Tela 1 Lista de Quizzes */

// let content;
// let promisseGetQuizzes = axios.get(
//   "https://mock-api.driven.com.br/api/v7/buzzquizz/quizzes"
// );
// promisseGetQuizzes.then(displayTheQuizzes);

// function displayTheQuizzes(answer) {
//   //const userQuizzesSerialized = localStorage.getItem("userQuizzes");
//   //const userQuizzes = JSON.parse(userQuizzesSerialized);

//   //simulação do que viria do localStorage
//   let quizzExample = {
//     id: 1,
//     title: "Título do quizz",
//     image: "https://http.cat/411.jpg",
//   };

//   const userQuizzes = [quizzExample]; //array de objetos, sendo cada objeto um quizz

//   let quizzes = answer.data;
//   content = document.querySelector(".content");

//   if (userQuizzes.length === 0) {
//     content.innerHTML = `
//     <div class="display-lists">
//     <div class="user-none-quizzes">
//       <div class="none-quizzes-alert">
//         Você não criou nenhum quizz ainda :(
//       </div>
//       <div class="button-create-quizz">Criar Quizz</div>
//     </div>
//     <div class="all-quizzes">
//       <div class="title-all-quizzes">Todos os Quizzes</div>
//       <div class="all-quizzes-list"></div>
//     </div>
//     `;

//     let displayAllList = document.querySelector(".all-quizzes-list");
//     for (let i = 0; i < quizzes.length; i++) {
//       displayAllList.innerHTML += `
//       <div class="quizz"><img src="${quizzes[i].image}" class="quizz-image"><div class="quizz-image-gradient"></div><p>${quizzes[i].title}</p></div>
//       `;
//     }
//   }

//   if (userQuizzes.length !== 0) {
//     content.innerHTML = `
//     <div class="user-quizzes">
//       <div class="title-user-quizzes">
//         Seus Quizzes <ion-icon name="add-circle"></ion-icon>
//       </div>
//       <div class="user-quizzes-list"></div>
//     </div>
//     <div class="all-quizzes">
//       <div class="title-all-quizzes">Todos os Quizzes</div>
//       <div class="all-quizzes-list"></div>
//     </div>
//     `;

//     let displayUserList = document.querySelector(".user-quizzes-list");
//     for (let i = 0; i < userQuizzes.length; i++) {
//       displayUserList.innerHTML += `
//       <div class="quizz"><img src="${userQuizzes[i].image}" class="quizz-image"><div class="quizz-image-gradient"></div><p>${userQuizzes[i].title}</p></div>
//       `;
//     }

//     let displayAllList = document.querySelector(".all-quizzes-list");
//     for (let i = 0; i < quizzes.length; i++) {
//       displayAllList.innerHTML += `
//       <div class="quizz"><img src="${quizzes[i].image}" class="quizz-image"><div class="quizz-image-gradient"></div><p>${quizzes[i].title}</p></div>
//       `;
//     }
//   }
// }

/* Tela 2 Página de um Quizz */
