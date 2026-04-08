<template>
  <section class="auth-view">
    <div class="bg-grid"></div>

    <div class="content">
      <div class="heading-wrap">
        <p class="eyebrow">One place to sign in or sign up</p>
        <h1 class="title">
          {{ isRegisterMode ? "Create your account" : "Welcome back" }}
        </h1>
        <p class="subtitle">
          {{
            isRegisterMode
              ? "Register once to save your best runs to the leaderboard."
              : "Log in to pick up where you left off and keep your scores."
          }}
        </p>
      </div>

      <div class="mode-switch" role="tablist" aria-label="Authentication mode">
        <button
          type="button"
          class="mode-btn"
          :class="{ active: !isRegisterMode }"
          @click="setMode('login')"
        >
          Login
        </button>
        <button
          type="button"
          class="mode-btn"
          :class="{ active: isRegisterMode }"
          @click="setMode('register')"
        >
          Register
        </button>
      </div>

      <form class="auth-form" @submit.prevent="handleSubmit">
        <label for="auth-email">Email</label>
        <input
          id="auth-email"
          v-model="email"
          type="email"
          autocomplete="email"
          required
        />

        <label for="auth-password">Password</label>
        <input
          id="auth-password"
          v-model="password"
          :type="showPassword ? 'text' : 'password'"
          :autocomplete="isRegisterMode ? 'new-password' : 'current-password'"
          required
        />

        <template v-if="isRegisterMode">
          <label for="auth-confirm-password">Confirm password</label>
          <input
            id="auth-confirm-password"
            v-model="confirmPassword"
            :type="showPassword ? 'text' : 'password'"
            autocomplete="new-password"
            required
          />
        </template>

        <label class="checkbox-row">
          <input v-model="showPassword" type="checkbox" />
          <span>Show password</span>
        </label>

        <button type="submit" class="submit-btn" :disabled="loading">
          {{ submitLabel }}
        </button>

        <p
          v-if="statusMessage"
          class="status-msg"
          :class="statusType === 'success' ? 'success' : 'error'"
        >
          {{ statusMessage }}
        </p>
      </form>

      <p class="helper-text">
        {{ isRegisterMode ? "Already registered?" : "Need an account?" }}
        <button type="button" class="inline-link" @click="toggleMode">
          {{ isRegisterMode ? "Switch to login" : "Create one now" }}
        </button>
      </p>
    </div>
  </section>
</template>

<script>
import { useGameStore } from "../stores/gameStore";

export default {
  name: "LoginView",
  data() {
    return {
      mode: "login",
      email: "",
      password: "",
      confirmPassword: "",
      showPassword: false,
      loading: false,
      statusMessage: "",
      statusType: "error",
    };
  },
  computed: {
    isRegisterMode() {
      return this.mode === "register";
    },
    submitLabel() {
      if (this.loading) {
        return this.isRegisterMode ? "Creating account..." : "Logging in...";
      }
      return this.isRegisterMode ? "Create account" : "Login";
    },
  },
  mounted() {
    this.syncModeFromRoute();
  },
  watch: {
    $route() {
      this.syncModeFromRoute();
    },
  },
  methods: {
    syncModeFromRoute() {
      const nextMode =
        this.$route.query.mode === "register" ? "register" : "login";
      this.mode = nextMode;
      if (nextMode !== "register") {
        this.confirmPassword = "";
      }
    },
    setMode(mode, preserveStatus = false) {
      this.mode = mode;
      if (!preserveStatus) {
        this.statusMessage = "";
        this.statusType = "error";
      }
      if (mode !== "register") {
        this.confirmPassword = "";
      }

      const nextQuery = mode === "register" ? { mode: "register" } : {};
      if (
        this.$route.path !== "/auth" ||
        this.$route.query.mode !== nextQuery.mode
      ) {
        this.$router.replace({ path: "/auth", query: nextQuery });
      }
    },
    toggleMode() {
      this.setMode(this.isRegisterMode ? "login" : "register");
    },
    async handleSubmit() {
      this.statusMessage = "";
      this.statusType = "error";

      if (this.isRegisterMode && this.password !== this.confirmPassword) {
        this.statusMessage = "Passwords do not match.";
        return;
      }

      this.loading = true;

      try {
        const store = useGameStore();

        if (this.isRegisterMode) {
          await store.register(this.email, this.password);
          this.password = "";
          this.confirmPassword = "";
          this.statusType = "success";
          this.statusMessage = "Account created. Log in to continue.";
          this.setMode("login", true);
          return;
        }

        await store.login(this.email, this.password);
        this.$router.push("/");
      } catch (err) {
        this.statusMessage =
          err?.message ||
          (this.isRegisterMode
            ? "Unable to register. Please try again."
            : "Unable to login. Please try again.");
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
  min-height: calc(100dvh - var(--app-header-height, 88px));
  padding: 1rem;
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
  width: min(520px, 100%);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: clamp(1rem, 4vw, 2rem);
  border: 1px solid rgba(255, 220, 50, 0.16);
  border-radius: 16px;
  background: rgba(9, 9, 15, 0.82);
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
  gap: 0.45rem;
  text-align: center;
}

.eyebrow {
  color: rgba(255, 220, 50, 0.82);
  font-size: 0.74rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.title {
  font-family: "Bebas Neue", sans-serif;
  font-size: clamp(2.4rem, 9vw, 4rem);
  line-height: 1;
  letter-spacing: 0.06em;
  color: #f5f0e0;
  text-shadow: 0 0 40px rgba(255, 200, 0, 0.22);
}

.subtitle {
  color: rgba(245, 240, 224, 0.62);
  font-size: 0.92rem;
  line-height: 1.5;
  max-width: 34ch;
}

.mode-switch {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.35rem;
  padding: 0.3rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 220, 50, 0.12);
}

.mode-btn {
  min-height: 44px;
  border: none;
  border-radius: 999px;
  background: transparent;
  color: rgba(245, 240, 224, 0.72);
  font-family: "DM Sans", sans-serif;
  font-weight: 600;
  cursor: pointer;
  transition:
    background 0.2s ease,
    color 0.2s ease,
    transform 0.2s ease;
}

.mode-btn.active {
  background: #ffcc00;
  color: #09090f;
  box-shadow: 0 0 18px rgba(255, 200, 0, 0.32);
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

label {
  color: rgba(245, 240, 224, 0.74);
  letter-spacing: 0.04em;
  font-size: 0.84rem;
}

input {
  border: 1px solid rgba(255, 220, 50, 0.25);
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.03);
  color: #f5f0e0;
  padding: 0.82rem 0.9rem;
  outline: none;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

input:focus {
  border-color: rgba(255, 220, 50, 0.65);
  box-shadow: 0 0 0 2px rgba(255, 220, 50, 0.15);
}

.checkbox-row {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  margin-top: 0.1rem;
  font-size: 0.82rem;
}

.checkbox-row input {
  width: 1rem;
  height: 1rem;
  accent-color: #ffcc00;
}

.submit-btn {
  margin-top: 0.25rem;
  padding: 0.85rem 1rem;
  border: none;
  border-radius: 10px;
  background: #ffcc00;
  color: #09090f;
  font-family: "Bebas Neue", sans-serif;
  font-size: 1.25rem;
  letter-spacing: 0.08em;
  cursor: pointer;
  transition:
    transform 0.15s ease,
    box-shadow 0.15s ease,
    opacity 0.15s ease;
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 0 24px rgba(255, 200, 0, 0.45);
}

.submit-btn:disabled {
  opacity: 0.72;
  cursor: not-allowed;
}

.status-msg {
  text-align: center;
  margin-top: 0.2rem;
  font-size: 0.9rem;
}

.status-msg.error {
  color: #ff9d8e;
}

.status-msg.success {
  color: #9af0a8;
}

.helper-text {
  text-align: center;
  color: rgba(245, 240, 224, 0.7);
  font-size: 0.9rem;
}

.inline-link {
  border: none;
  background: transparent;
  color: #ffdc32;
  font: inherit;
  cursor: pointer;
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
  .auth-view {
    padding: 0.75rem;
  }

  .content {
    border-radius: 12px;
  }

  .subtitle {
    font-size: 0.88rem;
  }
}
</style>
