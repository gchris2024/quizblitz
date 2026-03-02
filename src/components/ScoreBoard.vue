<template>
  <div class="scoreboard">
    <div class="bg-grid"></div>

    <div class="content">
      <div class="header">
        <span class="over-label">GAME</span>
        <span class="over-label accent">OVER</span>
      </div>

      <div class="score-ring">
        <svg class="ring-svg" viewBox="0 0 120 120">
          <circle class="ring-bg" cx="60" cy="60" r="52" />
          <circle
            class="ring-fill"
            cx="60"
            cy="60"
            r="52"
            :stroke-dasharray="`${ringProgress} 999`"
          />
        </svg>
        <div class="score-inner">
          <div class="score-num-wrap">
            <span class="score-num">{{ score }}</span>
            <span class="score-denom">/10</span>
          </div>
        </div>
      </div>

      <p class="verdict">{{ verdict }}</p>

      <button class="restart-btn" @click="$emit('restart')">
        <span>↺</span>
        <span>Play Again</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ScoreBoard",

  props: {
    score: {
      type: Number,
      required: true,
    },
  },

  emits: ["restart"],

  computed: {
    ringProgress() {
      // circumference ≈ 2π×52 ≈ 326.7; map score/10 to that arc
      return ((this.score / 10) * 2 * Math.PI * 52).toFixed(1);
    },

    verdict() {
      if (this.score === 10) return "Perfect. Absolutely flawless. 🔥";
      if (this.score >= 8) return "Outstanding — you crushed it!";
      if (this.score >= 6) return "Solid effort. You know your stuff.";
      if (this.score >= 4) return "Not bad, but there's room to grow.";
      if (this.score >= 2) return "Rough round. Shake it off.";
      return "Yikes. The comeback starts now.";
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,wght@0,400;0,500;1,400&display=swap");

.scoreboard {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: #09090f;
  overflow: hidden;
  font-family: "DM Sans", sans-serif;
}

/* scrolling grid — matches StartScreen */
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

.scoreboard::after {
  content: "";
  position: absolute;
  inset: 0;
  background: radial-gradient(
    ellipse 60% 55% at 50% 50%,
    rgba(255, 200, 0, 0.1) 0%,
    transparent 70%
  );
  pointer-events: none;
}

/* ── content ── */
.content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.75rem;
  animation: fadeUp 0.55s ease both;
}
@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ── heading ── */
.header {
  display: flex;
  gap: 0.35em;
  line-height: 1;
}
.over-label {
  font-family: "Bebas Neue", sans-serif;
  font-size: clamp(4rem, 14vw, 7.5rem);
  color: #f5f0e0;
  letter-spacing: 0.06em;
  text-shadow: 0 0 40px rgba(255, 200, 0, 0.2);
}
.over-label.accent {
  color: #ffcc00;
  text-shadow: 0 0 60px rgba(255, 200, 0, 0.55);
}

/* ── score ring ── */
.score-ring {
  position: relative;
  width: clamp(140px, 30vw, 190px);
  height: clamp(140px, 30vw, 190px);
}
.ring-svg {
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
}
.ring-bg {
  fill: none;
  stroke: rgba(255, 255, 255, 0.07);
  stroke-width: 8;
}
.ring-fill {
  fill: none;
  stroke: #ffcc00;
  stroke-width: 8;
  stroke-linecap: round;
  filter: drop-shadow(0 0 8px rgba(255, 200, 0, 0.6));
  transition: stroke-dasharray 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}
.score-inner {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.1em;
  line-height: 1;
}
.score-num-wrap {
  display: flex;
  align-items: flex-end;
  gap: 0.1em;
}
.score-num {
  font-family: "Bebas Neue", sans-serif;
  font-size: clamp(3.2rem, 10vw, 4.5rem);
  color: #ffcc00;
  text-shadow: 0 0 30px rgba(255, 200, 0, 0.5);
  line-height: 1;
}
.score-denom {
  font-family: "Bebas Neue", sans-serif;
  font-size: clamp(1.4rem, 4vw, 2rem);
  color: rgba(245, 240, 224, 0.4);
  line-height: 1;
}

/* ── verdict ── */
.verdict {
  font-size: clamp(0.9rem, 2.2vw, 1.1rem);
  color: rgba(245, 240, 224, 0.55);
  letter-spacing: 0.04em;
  text-align: center;
  max-width: 26ch;
}

/* ── button ── */
.restart-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.85rem 2.6rem;
  background: #ffcc00;
  color: #09090f;
  border: none;
  border-radius: 4px;
  font-family: "Bebas Neue", sans-serif;
  font-size: 1.5rem;
  letter-spacing: 0.1em;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition:
    transform 0.15s ease,
    box-shadow 0.15s ease;
}
.restart-btn::before {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(
    120deg,
    transparent 30%,
    rgba(255, 255, 255, 0.35) 50%,
    transparent 70%
  );
  transform: translateX(-100%);
  transition: transform 0.4s ease;
}
.restart-btn:hover {
  transform: translateY(-3px) scale(1.04);
  box-shadow: 0 0 28px rgba(255, 200, 0, 0.55);
}
.restart-btn:hover::before {
  transform: translateX(100%);
}
.restart-btn:active {
  transform: scale(0.97);
  box-shadow: none;
}

.restart-btn span:first-child {
  display: inline-block;
  transition: transform 0.35s ease;
}
.restart-btn:hover span:first-child {
  transform: rotate(-180deg);
}
</style>
