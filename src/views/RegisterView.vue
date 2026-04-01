<template>
  <section class="auth-view">
    <div class="bg-grid"></div>

    <div class="content">
      <div class="heading-wrap">
        <h1 class="title">Regis<span class="accent">ter</span></h1>
        <p class="subtitle">Create your QuizBlitz account</p>
      </div>

      <form class="auth-form" @submit.prevent="handleRegister">
        <label for="register-email">Email</label>
        <input
          id="register-email"
          v-model="email"
          type="email"
          autocomplete="email"
          required
        />

        <label for="register-password">Password</label>
        <input
          id="register-password"
          v-model="password"
          type="password"
          autocomplete="new-password"
          required
        />

        <button type="submit" :disabled="loading">
          {{ loading ? "Creating account..." : "Register" }}
        </button>

        <p v-if="error" class="error">{{ error }}</p>
      </form>

      <RouterLink to="/login" class="swap-link"
        >Already have an account? Login</RouterLink
      >
    </div>
  </section>
</template>

<script>
import { useGameStore } from "../stores/gameStore";

export default {
  name: "RegisterView",
  data() {
    return {
      email: "",
      password: "",
      loading: false,
      error: "",
    };
  },
  methods: {
    async handleRegister() {
      this.error = "";
      this.loading = true;

      try {
        const store = useGameStore();
        await store.register(this.email, this.password);
        this.$router.push("/");
      } catch (err) {
        this.error = err?.message || "Unable to register. Please try again.";
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,wght@0,400;0,500;1,400&display=swap");

.auth-view {
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

.auth-view::after {
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
  width: min(460px, calc(100% - 2rem));
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 1rem;
  padding: 2rem 1.4rem;
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
  font-size: clamp(2.8rem, 10vw, 4.4rem);
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
  font-size: 0.78rem;
  text-align: center;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
}

label {
  color: rgba(245, 240, 224, 0.74);
  letter-spacing: 0.04em;
  font-size: 0.84rem;
}

input {
  border: 1px solid rgba(255, 220, 50, 0.25);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.03);
  color: #f5f0e0;
  padding: 0.72rem 0.82rem;
  outline: none;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

input:focus {
  border-color: rgba(255, 220, 50, 0.65);
  box-shadow: 0 0 0 2px rgba(255, 220, 50, 0.15);
}

button {
  margin-top: 0.35rem;
  padding: 0.8rem 1rem;
  border: none;
  border-radius: 6px;
  background: #ffcc00;
  color: #09090f;
  font-family: "Bebas Neue", sans-serif;
  font-size: 1.35rem;
  letter-spacing: 0.08em;
  cursor: pointer;
  transition:
    transform 0.15s ease,
    box-shadow 0.15s ease,
    opacity 0.15s ease;
}

button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 0 24px rgba(255, 200, 0, 0.45);
}

button:disabled {
  opacity: 0.72;
  cursor: not-allowed;
}

.error {
  color: #ff9d8e;
  text-align: center;
  margin-top: 0.15rem;
}

.swap-link {
  text-align: center;
  color: #ffdc32;
  text-decoration: none;
  letter-spacing: 0.03em;
  font-size: 0.92rem;
  opacity: 0.92;
}

.swap-link:hover {
  text-decoration: underline;
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
    padding: 1.45rem 0.9rem;
    border-radius: 12px;
  }
}
</style>
