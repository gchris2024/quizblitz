<template>
  <div class="play-view">
    <!-- Timer bar -->
    <div class="timer-bar">
      <div
        class="timer-fill"
        :style="{ width: timerPercent + '%' }"
        :class="{ urgent: store.timeLeft <= 5 }"
      ></div>
    </div>

    <!-- Progress indicator -->
    <p class="progress">
      Question {{ store.progress.current }} of {{ store.progress.total }}
    </p>

    <!-- Question -->
    <QuestionCard
      v-if="store.gameState === 'playing' && store.currentQuestion"
      :question="store.currentQuestion"
      :selectedAnswer="store.selectedAnswer"
      @answer="store.submitAnswer"
    />

    <!-- Score screen -->
    <ScoreBoard
      v-else-if="store.gameState === 'end'"
      @restart="handleRestart"
    />
  </div>
</template>

<script>
import { useGameStore } from "../stores/gameStore.js";
import QuestionCard from "../components/QuestionCard.vue";
import ScoreBoard from "../components/ScoreBoard.vue";

export default {
  name: "PlayView",
  components: { QuestionCard, ScoreBoard },

  setup() {
    const store = useGameStore();
    return { store };
  },

  computed: {
    timerPercent() {
      return (this.store.timeLeft / 15) * 100;
    },
  },

  methods: {
    handleRestart() {
      this.store.resetGame();
      this.$router.push({ name: "home" });
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,wght@0,400;0,500;1,400&display=swap");

.play-view {
  position: relative;
  min-height: calc(100dvh - var(--app-header-height, 88px));
  font-family: "DM Sans", sans-serif;
}

.timer-bar {
  position: absolute;
  top: 1rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 5;
  width: min(680px, calc(100% - 2rem));
  height: 10px;
  background: rgba(245, 240, 224, 0.08);
  border: 1px solid rgba(255, 220, 50, 0.2);
  border-radius: 999px;
  overflow: hidden;
  box-shadow:
    0 0 18px rgba(255, 200, 0, 0.16),
    inset 0 0 12px rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(3px);
}

.timer-fill {
  height: 100%;
  background: linear-gradient(90deg, #ffcc00 0%, #ffd84d 55%, #ffe99a 100%);
  transition: width 0.9s linear;
  box-shadow: 0 0 18px rgba(255, 200, 0, 0.65);
}

.timer-fill.urgent {
  background: linear-gradient(90deg, #ff6b4a 0%, #e53935 70%, #9c1f1f 100%);
  box-shadow: 0 0 20px rgba(229, 57, 53, 0.75);
  animation: urgentPulse 0.75s ease-in-out infinite;
}

.progress {
  position: absolute;
  top: 1.85rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 5;
  margin: 0;
  padding: 0.34rem 0.9rem;
  border-radius: 999px;
  border: 1px solid rgba(255, 220, 50, 0.18);
  background: rgba(9, 9, 15, 0.72);
  color: rgba(245, 240, 224, 0.72);
  font-size: 0.78rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  text-align: center;
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.32);
  backdrop-filter: blur(3px);
}

@keyframes urgentPulse {
  0%,
  100% {
    filter: saturate(1);
  }
  50% {
    filter: saturate(1.35) brightness(1.08);
  }
}

@media (max-width: 640px) {
  .timer-bar {
    top: 0.85rem;
    width: calc(100% - 1.25rem);
    height: 8px;
  }

  .progress {
    top: 1.6rem;
    font-size: 0.7rem;
    padding: 0.3rem 0.75rem;
  }
}
</style>
