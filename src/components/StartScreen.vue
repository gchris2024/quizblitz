<template>
  <div class="start-screen">
    <div class="bg-grid"></div>
    <div class="content">
      <div class="logo-wrap">
        <h1 class="logo">Quiz<span class="accent">Blitz</span></h1>
        <div class="logo-underline"></div>
      </div>
      <p class="tagline">Lightning-fast trivia. <em>Think fast or lose.</em></p>
      <button class="play-btn" @click="playGame">
        <span class="btn-text">Play</span>
        <span class="btn-flash">▶</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "StartScreen",
  props: {
    onPlay: {
      type: Function,
      required: true,
    },
  },
  methods: {
    playGame() {
      this.onPlay();
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,wght@0,400;0,500;1,400&display=swap");

.start-screen {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: #09090f;
  overflow: hidden;
  font-family: "DM Sans", sans-serif;
}

/* subtle grid background */
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

/* radial glow */
.start-screen::after {
  content: "";
  position: absolute;
  inset: 0;
  background: radial-gradient(
    ellipse 60% 55% at 50% 50%,
    rgba(255, 200, 0, 0.12) 0%,
    transparent 70%
  );
  pointer-events: none;
}

.content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  animation: fadeUp 0.6s ease both;
}

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(28px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* logo */
.logo-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.35rem;
}

.logo {
  font-family: "Bebas Neue", sans-serif;
  font-size: clamp(5rem, 16vw, 9rem);
  letter-spacing: 0.04em;
  color: #f5f0e0;
  line-height: 1;
  text-shadow: 0 0 40px rgba(255, 200, 0, 0.3);
}

.accent {
  color: #ffcc00;
  text-shadow: 0 0 60px rgba(255, 200, 0, 0.6);
}

.logo-underline {
  width: 60%;
  height: 3px;
  background: linear-gradient(90deg, transparent, #ffcc00, transparent);
  animation: pulse 2.4s ease-in-out infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 0.5;
    transform: scaleX(0.7);
  }
  50% {
    opacity: 1;
    transform: scaleX(1);
  }
}

/* tagline */
.tagline {
  font-size: clamp(0.95rem, 2.2vw, 1.2rem);
  color: rgba(245, 240, 224, 0.55);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  text-align: center;
}

.tagline em {
  font-style: italic;
  color: rgba(255, 200, 0, 0.65);
  text-transform: none;
}

/* play button */
.play-btn {
  margin-top: 0.75rem;
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.9rem 2.8rem;
  background: #ffcc00;
  color: #09090f;
  border: none;
  border-radius: 4px;
  font-family: "Bebas Neue", sans-serif;
  font-size: 1.6rem;
  letter-spacing: 0.1em;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  box-shadow: 0 0 0 0 rgba(255, 200, 0, 0.5);
  transition:
    transform 0.15s ease,
    box-shadow 0.15s ease;
}

.play-btn::before {
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

.play-btn:hover {
  transform: translateY(-3px) scale(1.04);
  box-shadow: 0 0 28px rgba(255, 200, 0, 0.55);
}

.play-btn:hover::before {
  transform: translateX(100%);
}

.play-btn:active {
  transform: translateY(0) scale(0.97);
  box-shadow: none;
}

.btn-flash {
  font-size: 1.1rem;
  transition: transform 0.2s ease;
}

.play-btn:hover .btn-flash {
  transform: translateX(4px);
}
</style>
