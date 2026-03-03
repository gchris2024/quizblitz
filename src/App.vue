<template>
  <div id="app">
    <StartScreen v-if="gameState === 'start'" @start="startGame" />
    <QuestionCard
      v-else-if="gameState === 'playing'"
      :question="questions[currentIndex]"
      :currentIndex="currentIndex"
      :totalQuestions="questions.length"
      @answer="handleAnswer"
    />
    <ScoreBoard v-else :score="score" @restart="resetGame" />
  </div>
</template>

<script>
import StartScreen from "./components/StartScreen.vue";
import QuestionCard from "./components/QuestionCard.vue";
import ScoreBoard from "./components/ScoreBoard.vue";
export default {
  name: "App",
  components: {
    StartScreen,
    QuestionCard,
    ScoreBoard,
  },
  data() {
    return {
      questions: [
        {
          question: "What does HTML stand for?",
          answers: [
            "Home Tool Markup Language",
            "High Tech Modern Language",
            "Hyperlinks and Text Markup Language",
            "Hypertext Markup Language",
          ],
          correct: 3,
        },
        {
          question: "What does CSS stand for?",
          answers: [
            "Computer Style Sheets",
            "Cascading Style Sheets",
            "Creative Style System",
            "Code Style Standard",
          ],
          correct: 1,
        },
        {
          question:
            "What is the primary purpose of JavaScript in web development?",
          answers: [
            "To style web pages",
            "To manage servers",
            "To add interactivity to web pages",
            "To store databases",
          ],
          correct: 2,
        },
        {
          question: "What does the DOM represent?",
          answers: [
            "Database Object Model",
            "Data Organization Method",
            "Default Operating Module",
            "Document Object Model",
          ],
          correct: 3,
        },
        {
          question: "What does API stand for?",
          answers: [
            "Advanced Programming Integration",
            "Application Process Integration",
            "Application Programming Interface",
            "Automated Program Interface",
          ],
          correct: 2,
        },
        {
          question: "What is a responsive web design?",
          answers: [
            "A design that only works on desktop",
            "A design with quick loading times",
            "A design that requires user input",
            "A design that adapts to different screen sizes",
          ],
          correct: 3,
        },
        {
          question: "Which protocol is more secure: HTTP or HTTPS?",
          answers: [
            "HTTP is more secure",
            "They are equally secure",
            "HTTPS is more secure",
            "Neither is secure",
          ],
          correct: 2,
        },
        {
          question: "What does JSON stand for?",
          answers: [
            "Java Syntax Object Name",
            "JavaScript Online Network",
            "Joint Standard Object Name",
            "JavaScript Object Notation",
          ],
          correct: 3,
        },
        {
          question: "Which of these is a frontend framework?",
          answers: ["Express", "Django", "React", "Flask"],
          correct: 2,
        },
        {
          question: "What is the purpose of version control systems like Git?",
          answers: [
            "To compile code",
            "To host websites",
            "To run web servers",
            "To track changes and collaborate on code",
          ],
          correct: 3,
        },
      ],
      currentIndex: 0,
      score: 0,
      gameState: "start", // 'start', 'playing', 'end'
    };
  },
  methods: {
    startGame() {
      this.gameState = "playing";
      this.currentIndex = 0;
      this.score = 0;
    },
    handleAnswer(isCorrect) {
      if (isCorrect) {
        this.score++;
      }
      this.currentIndex++;
      if (this.currentIndex >= this.questions.length) {
        this.gameState = "end";
      }
    },
    resetGame() {
      this.gameState = "start";
      this.currentIndex = 0;
      this.score = 0;
    },
  },
};
</script>
