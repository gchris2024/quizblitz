# Quiz 2 Answers

**Name:** Chris Garcia
**Date:** 23 Mar 2025

## Q1

The correct Vue behavior is D: The component should emit an event to the parent requesting the change, and the parent should update its own data in response.
Instead of mutating the data being passed to it, the student should instead emit an event telling the parent to modify the data.

## Q2

In `gameStore.js`, for `state`, you would add a variable `lastAnswerCorrect: null`. In both the `startGame()` and `nextQuestion()` function calls, it would again be reset to `null`. For the `submitAnswer(answerIndex)` function, there would be an extra line `this.lastAnswerCorrect = isCorrect;`, utilizing the already-existing `isCorrect` variable.
The reason `QuestionCard` should read this property from the store rather than from a prop is to keep the component's state separate from the existing logic of the store. In addition, this property is free to be used by other interested components.

## Q3

If you were to remove the arrow function from the `state` property in the game store, C: All component instances that call `useGameStore()` will share the same state object in memory, meaning a state change in one component affects all others simultaneously because all instances would now be sharing the same plain `state` object.

## Q4

Part A:
The issue is that routing is never actually used in the template. Even though `/play` is defined, Vue Router renders matched components only inside `<RouterView />`. Here, `GameView` is manually controlled with `v-if`, so when navigating to `/play`, the router updates the URL but has nowhere to inject `GameView`. As a result, nothing appears (blank screen).

Part B:
Corrected `App.vue` template:

```html
<template>
  <div>
    <h1>QuizBlitz</h1>
    <RouterView />
  </div>
</template>
```

`<RouterView />` dynamically renders components based on the current route.

## Q5

For a component that is only ever used once, at the end of the game, and only displays data, Approach B is preferable, because `ScoreBoard` only displays data it receives — keeping it decoupled from the store makes it easier to reuse or test in isolation.

## Q6

The error occurs because when `currentIndex === state.questions.length`, the getter returns `state.questions[length]`, which is out of bounds. In JavaScript, that evaluates to undefined, so accessing `currentQuestion.text` throws an error.
To modify `nextQuestion()` would likely introduce a hacky fix. It is better to modify the getter, where the problem actually arises. Also, this way any other component that needs to access the `currentQuestion` would be aware that `currentIndex` is out of bounds:

```js
getters: {
  currentQuestion: (state) => {
    if (state.currentIndex >= state.questions.length) return null;
    return state.questions[state.currentIndex];
  };
}
```

## Q7

For the following component

```js
<button
  v-for="(answer, index) in question.answers"
  :key="index"
  @click="$emit('answer', index === question.correct)"
>
  {{ answer }}
</button>
```

B: Using `index` as `:key` is acceptable because the answers array for a given question does not change while the component is mounted; the risk of key-related bugs only arises when the list can be reordered or items deleted.

## Q8

### Local file approach

- Advantage: Using the local `questionBank` makes `startGame()` fully synchronous and reliable. The game can immediately set `gameState = "playing"` and call `_startTimer()` without worrying about delays or failures, which keeps the timing logic consistent.

- Disadvantage: The questions are static. Updating or expanding content requires redeploying the app, and `questions.length` is fixed, limiting replayability and variety.

### Remote API approach

- Advantage: Fetching from an API allows dynamic and scalable content across different versions of the app. The app can easily vary `questions`, increasing replay value without needing to change the codebase.

- Disadvantage: It introduces asynchrony and failure points. If the fetch is slow or fails, `startGame()` may delay setting gameState = "playing" and starting `_startTimer()`, potentially breaking the user experience unless an additional loading/error state is added.

### My choice and reasoning:

I would choose the local file approach. The store’s logic (`startGame()`) assumes immediate availability of questions. Keeping data local avoids adding loading states and error handling, which simplifies development at this early stage, which also makes debugging easier.

## Q9

B: `v-show` hides elements with `display: none` but keeps them mounted, so `startGame()` would need to defend against being called while a game is already in progress, and the game state could persist unexpectedly between screen transitions.

## Q10

This timer functionality was already implemented across the store and the `PlayView.vue` component, but I will explain some changes you would need to make.
`useGameStore.js` changes:

- In `state`, you would include `timeLeft` and `_timerInterval`. The latter is a reference to an internal timer that will be used in `tick()` - In `actions`, you would include `_startTimer()` and `_stopTimer()`. These methods are called by `startGame()` and `nextQuestion()` respectively. They start and stop a timer that ticks every second.

```js
    _startTimer() {
      this._stopTimer(); // always clear any existing timer first
      this._timerInterval = setInterval(() => {
        this.tick();
      }, 1000);
    },

    _stopTimer() {
      if (this._timerInterval) {
        clearInterval(this._timerInterval);
        this._timerInterval = null;
      }1
    },
```

In `PlayView.vue`, the progress bar appears:

```html
<div
  :style="{ width: timerPercent + '%' }"
  :class="{ urgent: store.timeLeft <= 5 }"
></div>
```

The timer logic lives explicitly in the store because the purpose of `PlayView.vue` is presentational, not logical. It is best to only present information rather than compute it for itself.

### AI Disclaimer

For these answers, I ran the questions through ChatGPT, then synthesized the output with my own understanding.
