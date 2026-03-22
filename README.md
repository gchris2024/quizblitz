# Quiz Blitz

Quiz Blitz is a quick-fire browser trivia game built around web development questions and a constant countdown. Each round throws the player into a 10-question run with 15 seconds per question, instant right-or-wrong feedback, and a final score screen that makes the whole thing feel closer to an arcade challenge than a standard quiz form.

The app keeps the loop simple on purpose: hit play, survive the timer, lock in answers fast, and see how cleanly you can finish the round before jumping back in for another run.

## Directory Structure

- `src/components/` contains the main UI pieces such as the start screen, question card, and score screen.
- `src/views/` contains route-level pages like the home screen, play view, and placeholder leaderboard.
- `src/stores/` holds the Pinia game store that manages quiz state, score tracking, and timer behavior.
- `src/data/` contains the question bank used during each round.
- `src/router/` defines the app routes.
- `src/assets/` is reserved for static assets used by the Vue app.
- `public/` holds public files served directly by Vite.
