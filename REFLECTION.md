## Q1 -- Props

In Vue, a prop lets a parent pass data down to a child in a unidirectional flow. In `QuestionCard.vue`, the current question is passed as a prop, so the parent controls which question displays, and the component simply renders it.

Using props instead of importing `useGameStore` keeps `QuestionCard` presentational and reusable—it doesn’t depend on the store, focuses only on display, and is easier to test, maintain, and reuse, while keeping the data flow clear.

## Q2 -- $emit

In Vue, `$emit` is a way for a child component to communicate with its parent by sending out a custom event. It’s the opposite of a prop: while props pass data down, `$emit` sends messages up.

## Q3 -- Pinia store

Before Pinia, `App.vue` owned the state, so deeply nested components had to receive `currentIndex, score, and gameState` via prop drilling—passing props through layers that don’t use them—making code verbose and hard to maintain. Moving state to a Pinia store centralizes it, letting any component access or update it directly, eliminating prop drilling and decoupling state from the component tree.

## Q4 -- Vue Router

A multi-page site reloads the browser on each page, fetching new HTML. An SPA loads one HTML page and updates content via JavaScript. `router-view` renders the component for the active route, and Vue Router swaps components client-side, so URL changes don’t trigger full page reloads.

## Q5 -- v-if vs v-show

`v-if` conditionally renders elements in the DOM—they don’t exist until the condition is true. `v-show` always renders elements but toggles their visibility with CSS (display: none).

Here, `v-if` is better because only one screen is shown at a time, so creating/removing DOM elements avoids unnecessary rendering and keeps the DOM lightweight, whereas `v-show` would keep all screens in the DOM even when hidden.
