<template>
  <div id="app">
    <header class="app-header">
      <RouterLink to="/" class="brand">Quiz<span>Blitz</span></RouterLink>

      <nav class="nav-links" aria-label="Primary navigation">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/leaderboard">Leaderboard</RouterLink>
        <RouterLink to="/auth">Account</RouterLink>
      </nav>

      <div class="account-actions">
        <span v-if="store.userEmail" class="user-pill">{{
          store.userEmail
        }}</span>
        <button
          v-if="store.token"
          type="button"
          class="logout-btn"
          @click="handleLogout"
        >
          Sign out
        </button>
      </div>
    </header>

    <main class="app-view">
      <RouterView />
    </main>
  </div>
</template>

<script>
import { useGameStore } from "./stores/gameStore";

export default {
  name: "App",
  setup() {
    return { store: useGameStore() };
  },
  methods: {
    handleLogout() {
      this.store.logout();
      if (this.$route.path !== "/") {
        this.$router.push("/");
      }
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,wght@0,400;0,500;1,400&display=swap");

#app {
  min-height: 100vh;
  background: #09090f;
}

.app-header {
  position: sticky;
  top: 0;
  z-index: 20;
  display: flex;
  align-items: center;
  gap: 0.9rem;
  flex-wrap: wrap;
  padding: 0.85rem 1rem;
  background: rgba(9, 9, 15, 0.92);
  border-bottom: 1px solid rgba(255, 220, 50, 0.15);
  font-family: "DM Sans", sans-serif;
  backdrop-filter: blur(10px);
}

.app-header::before {
  content: "";
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255, 220, 50, 0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 220, 50, 0.04) 1px, transparent 1px);
  background-size: 48px 48px;
  pointer-events: none;
}

.brand,
.nav-links a,
.logout-btn,
.user-pill {
  position: relative;
  z-index: 1;
}

.brand {
  display: inline-flex;
  align-items: baseline;
  gap: 0.1rem;
  color: #f5f0e0;
  text-decoration: none;
  font-family: "Bebas Neue", sans-serif;
  font-size: clamp(1.6rem, 4vw, 2rem);
  letter-spacing: 0.06em;
}

.brand span {
  color: #ffcc00;
}

.nav-links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem;
}

.nav-links a,
.logout-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 42px;
  padding: 0.55rem 0.9rem;
  border-radius: 999px;
  border: 1px solid rgba(255, 220, 50, 0.12);
  color: #c9c9d6;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.92rem;
  letter-spacing: 0.02em;
  background: rgba(255, 255, 255, 0.03);
  transition:
    color 0.2s ease,
    background 0.2s ease,
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.nav-links a:hover,
.logout-btn:hover {
  color: #ffdc32;
  background: rgba(255, 220, 50, 0.1);
  transform: translateY(-1px);
}

.nav-links a.router-link-active {
  color: #ffdc32;
  background: rgba(255, 220, 50, 0.12);
  box-shadow: 0 0 12px rgba(255, 220, 50, 0.18);
}

.account-actions {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 0.55rem;
  flex-wrap: wrap;
}

.user-pill {
  max-width: min(260px, 70vw);
  padding: 0.5rem 0.8rem;
  border-radius: 999px;
  border: 1px solid rgba(255, 220, 50, 0.18);
  color: rgba(245, 240, 224, 0.82);
  background: rgba(255, 220, 50, 0.06);
  font-size: 0.84rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.logout-btn {
  cursor: pointer;
  font-family: inherit;
}

.app-view {
  min-height: calc(100vh - var(--app-header-height, 88px));
}

@media (max-width: 760px) {
  .app-header {
    padding: 0.8rem 0.75rem;
  }

  .brand {
    width: 100%;
    justify-content: center;
  }

  .nav-links,
  .account-actions {
    width: 100%;
    justify-content: center;
    margin-left: 0;
  }

  .nav-links a,
  .logout-btn {
    flex: 1 1 120px;
  }

  .user-pill {
    max-width: 100%;
    width: 100%;
    text-align: center;
  }
}
</style>
