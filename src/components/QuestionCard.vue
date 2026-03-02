<template>
  <div class="question-card">
    <div class="bg-grid"></div>

    <div class="content">
      <p class="question-text">{{ question.question }}</p>

      <div class="answers">
        <button
          v-for="(answer, index) in question.answers"
          :key="index"
          class="answer-btn"
          :class="{
            correct: answered && index === question.correct,
            wrong:
              answered && index === selectedIndex && index !== question.correct,
          }"
          :disabled="answered"
          @click="handleAnswer(index)"
        >
          <span class="answer-letter">{{ letters[index] }}</span>
          <span class="answer-text">{{ answer }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "QuestionCard",

  props: {
    question: {
      type: Object,
      required: true,
    },
  },

  emits: ["answer"],

  data() {
    return {
      answered: false,
      selectedIndex: null,
      letters: ["A", "B", "C", "D"],
    };
  },

  methods: {
    handleAnswer(index) {
      if (this.answered) return;

      this.answered = true;
      this.selectedIndex = index;

      const isCorrect = index === this.question.correct;

      setTimeout(() => {
        this.$emit("answer", isCorrect);
        // Reset state after emitting so the card is clean if the parent
        // reuses this component with a new question prop.
        this.answered = false;
        this.selectedIndex = null;
      }, 1000);
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,wght@0,400;0,500;1,400&display=swap");

.question-card {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: #09090f;
  overflow: hidden;
  font-family: "DM Sans", sans-serif;
}

/* scrolling grid — matches StartScreen / ScoreBoard */
.bg-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255, 220, 50, 0.06) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 220, 50, 0.06) 1px, transparent 1px);
  background-size: 48px 48px;
  animation: gridDrift 20s linear infinite;
}
@keyframes gridDrift {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(48px);
  }
}
.question-card::after {
  content: "";
  position: absolute;
  inset: 0;
  background: radial-gradient(
    ellipse 60% 55% at 50% 50%,
    rgba(255, 200, 0, 0.08) 0%,
    transparent 70%
  );
  pointer-events: none;
}

/* ── layout ── */
.content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: min(600px, 90vw);
  animation: fadeUp 0.45s ease both;
}
@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ── question ── */
.question-text {
  font-size: clamp(1.1rem, 3vw, 1.45rem);
  font-weight: 500;
  color: #f5f0e0;
  line-height: 1.5;
  text-align: center;
  padding: 1.5rem 1.75rem;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 10px;
}

/* ── answer grid ── */
.answers {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.85rem;
}

/* ── answer button ── */
.answer-btn {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.9rem 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: #f5f0e0;
  font-family: "DM Sans", sans-serif;
  font-size: clamp(0.85rem, 1.8vw, 1rem);
  font-weight: 500;
  text-align: left;
  cursor: pointer;
  transition:
    background 0.15s ease,
    border-color 0.15s ease,
    transform 0.1s ease;
  position: relative;
  overflow: hidden;
}

.answer-btn::before {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(
    120deg,
    transparent 30%,
    rgba(255, 255, 255, 0.07) 50%,
    transparent 70%
  );
  transform: translateX(-100%);
  transition: transform 0.35s ease;
}

.answer-btn:not(:disabled):hover {
  background: rgba(255, 200, 0, 0.1);
  border-color: rgba(255, 200, 0, 0.35);
  transform: translateY(-2px);
}
.answer-btn:not(:disabled):hover::before {
  transform: translateX(100%);
}
.answer-btn:not(:disabled):active {
  transform: translateY(0) scale(0.98);
}

/* disabled state — keep appearance, just block pointer */
.answer-btn:disabled {
  cursor: default;
}

/* ── letter badge ── */
.answer-letter {
  flex-shrink: 0;
  width: 1.7rem;
  height: 1.7rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.08);
  font-family: "Bebas Neue", sans-serif;
  font-size: 1rem;
  letter-spacing: 0.05em;
  color: #ffcc00;
  transition:
    background 0.2s ease,
    color 0.2s ease;
}

/* ── correct highlight ── */
.answer-btn.correct {
  background: rgba(60, 210, 110, 0.15);
  border-color: rgba(60, 210, 110, 0.6);
  color: #b6ffd4;
  animation: popIn 0.25s ease;
}
.answer-btn.correct .answer-letter {
  background: rgba(60, 210, 110, 0.3);
  color: #3cd26e;
}

/* ── wrong highlight ── */
.answer-btn.wrong {
  background: rgba(255, 70, 70, 0.15);
  border-color: rgba(255, 70, 70, 0.6);
  color: #ffc0c0;
  animation: shake 0.35s ease;
}
.answer-btn.wrong .answer-letter {
  background: rgba(255, 70, 70, 0.3);
  color: #ff4646;
}

@keyframes popIn {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.04);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes shake {
  0%,
  100% {
    transform: translateX(0);
  }
  20% {
    transform: translateX(-6px);
  }
  40% {
    transform: translateX(6px);
  }
  60% {
    transform: translateX(-4px);
  }
  80% {
    transform: translateX(4px);
  }
}
</style>
