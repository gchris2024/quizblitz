<template>
  <div id="app">
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/leaderboard">Leaderboard</RouterLink>
      <RouterLink to="/login">Login</RouterLink>
      <RouterLink to="/register">Register</RouterLink>
    </nav>
    <RouterView />
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,wght@0,400;0,500;1,400&display=swap");

nav {
  position: relative;
  display: flex;
  gap: 2rem;
  padding: 1.25rem 2rem;
  background: #09090f;
  border-bottom: 1px solid rgba(255, 220, 50, 0.15);
  font-family: "DM Sans", sans-serif;
  backdrop-filter: blur(8px);
}

/* Subtle grid background */
nav::before {
  content: "";
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255, 220, 50, 0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 220, 50, 0.04) 1px, transparent 1px);
  background-size: 48px 48px;
  pointer-events: none;
}

nav a {
  position: relative;
  z-index: 1;
  color: #b8b8c8;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.95rem;
  letter-spacing: 0.5px;
  transition: color 0.3s ease;
  padding: 0.5rem 1rem;
  border-radius: 4px;
}

nav a:hover {
  color: #ffdc32;
}

nav a.router-link-active {
  color: #ffdc32;
  background: rgba(255, 220, 50, 0.1);
  box-shadow: 0 0 12px rgba(255, 220, 50, 0.2);
}
</style>
