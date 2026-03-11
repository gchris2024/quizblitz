<template>
  <StartScreen :onPlay="startGame" />
</template>

<script>
import StartScreen from "../components/StartScreen.vue";
import { useGameStore } from "../stores/gameStore";

export default {
  name: "HomeView",
  components: {
    StartScreen,
  },
  setup() {
    return { store: useGameStore() };
  },
  methods: {
    startGame() {
      this.store.startGame();
      // TODO Week 7: replace sessionStorage check with store.gameStarted
      sessionStorage.setItem("gameStarted", "true");
      this.$router.push({ name: "play" });
    },
  },
};
</script>
