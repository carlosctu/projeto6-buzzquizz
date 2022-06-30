/* você aqui */

// Criação do Quizz

// Tela 3.1 - Info básica do Quiz 
function sendBasicInfo() {
  const title = document.querySelector(".basic-info-title").value;
  const image = document.querySelector(".basic-info-image").value;
  const info = {
    title: title,
    image: image,
    questions: [
      {
        title: "Título da pergunta 1",
        color: "#123456",
        answers: [
          {
            text: "Texto da resposta 1",
            image: "https://http.cat/411.jpg",
            isCorrectAnswer: true,
          },
          {
            text: "Texto da resposta 2",
            image: "https://http.cat/412.jpg",
            isCorrectAnswer: false,
          },
        ],
      },
      {
        title: "Título da pergunta 2",
        color: "#123456",
        answers: [
          {
            text: "Texto da resposta 1",
            image: "https://http.cat/411.jpg",
            isCorrectAnswer: true,
          },
          {
            text: "Texto da resposta 2",
            image: "https://http.cat/412.jpg",
            isCorrectAnswer: false,
          },
        ],
      },
      {
        title: "Título da pergunta 3",
        color: "#123456",
        answers: [
          {
            text: "Texto da resposta 1",
            image: "https://http.cat/411.jpg",
            isCorrectAnswer: true,
          },
          {
            text: "Texto da resposta 2",
            image: "https://http.cat/412.jpg",
            isCorrectAnswer: false,
          },
        ],
      },
    ],
    levels: [
      {
        title: "Título do nível 1",
        image: "https://http.cat/411.jpg",
        text: "Descrição do nível 1",
        minValue: 0,
      },
      {
        title: "Título do nível 2",
        image: "https://http.cat/412.jpg",
        text: "Descrição do nível 2",
        minValue: 50,
      },
    ],
  };

  // Post: post("endpoint do AXIOS", dados -> neste caso seria o "info")
  const promisse = axios.post(
    "https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes",
    info
  );
  promisse.then((response) => {
    const title = response.data.title;
    const image = response.data.image;
    console.log(title, image);
  });
  promisse.catch(() =>
    console.log("Deu um erro no envio dos dados de Info Basicas")
  );
}
// Tela 3.2 - Perguntas do Quiz











/* 

------------------------------------------------------------------------------------------------------------

Podemos separar somente o código do JS com esse comentário, pode ficar mais organizado para cada um de nós.
Mas depois quando formos entregar, a gente retira esse comentário aqui.  
Aí a partir daqui sou eu com o display e listagem, e antes seria você com a criação do quizz.

------------------------------------------------------------------------------------------------------------

*/

/* eu aqui */

/* Tela 1 Lista de Quizzes */


let promisseGetQuizzes = axios.get('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes');
promisseGetQuizzes.then(displayAllQuizzes);

function displayAllQuizzes(answer){
  let quizzes = answer.data;
  let displayLists = document.querySelector('.all-quizzes-list');
  for(let i = 0; i<quizzes.length; i++){
    displayLists.innerHTML+=`
    <div class="quizz"><img src="${quizzes[i].image}" class="quizz-image"><p>${quizzes[i].title}</p></div>
    `;
  }
}

