<template>
  <div class="leaderboard-view">
    <div class="bg-grid"></div>

    <div class="content">
      <div class="heading-wrap">
        <h1 class="title">Leader<span class="accent">board</span></h1>
        <p class="subtitle">Top QuizBlitz runs</p>
      </div>

      <p v-if="loading" class="state-msg">Loading scores...</p>

      <p v-else-if="error" class="state-msg error-msg">
        Could not load scores. Is the server running?
      </p>

      <ol v-else-if="scores.length > 0" class="score-list">
        <li
          v-for="(entry, index) in scores"
          :key="entry._id || index"
          class="score-item"
        >
          <span class="rank">#{{ index + 1 }}</span>
          <span class="name">{{ entry.playerName }}</span>
          <span class="score"
            >{{ entry.score }} / {{ entry.totalQuestions }}</span
          >
        </li>
      </ol>

      <p v-else class="state-msg">No scores yet. Be the first to play!</p>

      <RouterLink to="/" class="back-link">← Back to home</RouterLink>
    </div>
  </div>
</template>

<script>
export default {
  name: "LeaderboardView",
  data() {
    return {
      scores: [],
      loading: true,
      error: false,
    };
  },
  async mounted() {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/scores`,
      );
      if (!response.ok) throw new Error("Server error");
      this.scores = await response.json();
    } catch (err) {
      this.error = true;
    } finally {
      this.loading = false;
    }
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,wght@0,400;0,500;1,400&display=swap");

.leaderboard-view {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: #09090f;
  overflow: hidden;
  font-family: "DM Sans", sans-serif;
}

.bg-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255, 220, 50, 0.06) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 220, 50, 0.06) 1px, transparent 1px);
  background-size: 48px 48px;
  animation: gridDrift 20s linear infinite;
}

.leaderboard-view::after {
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

.content {
  position: relative;
  z-index: 1;
  width: min(780px, calc(100% - 2rem));
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.15rem;
  padding: 2rem 1.25rem;
  border: 1px solid rgba(255, 220, 50, 0.16);
  border-radius: 16px;
  background: rgba(9, 9, 15, 0.78);
  box-shadow:
    0 28px 60px rgba(0, 0, 0, 0.45),
    inset 0 0 20px rgba(255, 220, 50, 0.05);
  backdrop-filter: blur(5px);
  animation: fadeUp 0.55s ease both;
}

.heading-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;
  margin-bottom: 0.35rem;
}

.title {
  font-family: "Bebas Neue", sans-serif;
  font-size: clamp(3rem, 10vw, 5.2rem);
  line-height: 1;
  letter-spacing: 0.06em;
  color: #f5f0e0;
  text-shadow: 0 0 40px rgba(255, 200, 0, 0.22);
}

.accent {
  color: #ffcc00;
  text-shadow: 0 0 58px rgba(255, 200, 0, 0.45);
}

.subtitle {
  color: rgba(245, 240, 224, 0.55);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: 0.8rem;
}

.score-list {
  width: min(640px, 100%);
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  padding: 0;
  margin: 0;
}

.score-item {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 0.7rem;
  padding: 0.75rem 0.9rem;
  border: 1px solid rgba(255, 220, 50, 0.2);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.03);
}

.rank {
  min-width: 2.6rem;
  font-family: "Bebas Neue", sans-serif;
  font-size: 1.32rem;
  letter-spacing: 0.06em;
  color: #ffcc00;
}

.name {
  color: #f5f0e0;
  font-size: 0.96rem;
}

.score {
  color: rgba(245, 240, 224, 0.72);
  font-size: 0.88rem;
  letter-spacing: 0.04em;
}

.state-msg {
  color: rgba(245, 240, 224, 0.65);
  text-align: center;
  letter-spacing: 0.03em;
}

.error-msg {
  color: #ff9d8e;
}

.back-link {
  margin-top: 0.45rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.1rem;
  border-radius: 6px;
  border: 1px solid rgba(255, 220, 50, 0.4);
  color: #ffdc32;
  text-decoration: none;
  letter-spacing: 0.04em;
  background: rgba(255, 220, 50, 0.08);
  transition:
    transform 0.15s ease,
    background 0.15s ease,
    box-shadow 0.15s ease;
}

.back-link:hover {
  transform: translateY(-2px);
  background: rgba(255, 220, 50, 0.16);
  box-shadow: 0 0 20px rgba(255, 200, 0, 0.28);
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

@keyframes gridDrift {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(48px);
  }
}

@media (max-width: 640px) {
  .content {
    width: calc(100% - 1rem);
    padding: 1.5rem 0.85rem;
    border-radius: 12px;
  }

  .score-item {
    grid-template-columns: auto 1fr;
    grid-template-areas:
      "rank name"
      "score score";
    row-gap: 0.35rem;
  }

  .rank {
    grid-area: rank;
  }

  .name {
    grid-area: name;
  }

  .score {
    grid-area: score;
    padding-left: 2.7rem;
  }
}
</style>
