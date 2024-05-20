# Tic Tac Toe (In space)

A simple Tic Tac Toe game built using Create React App.

<img src="https://github.com/rndware/tic-tac-toe/blob/master/media/playing.gif" width="65%"/>
</br>
<img src="https://github.com/rndware/tic-tac-toe/blob/master/media/playing2.gif" width="65%"/>

## Highlights

- Written in React/Redux/Typescript
- Use of functional and 'dumb' components where possible
- Unit tested with BDD where possible
- Styled using Sass modules with BEM syntax
- Used Material UI for icons, inputs and buttons
- Decoupled board from game logic
- Use of services to decouple AI logic from slices
- Keeping reducers 'flat' to avoid heavily nested data
- I18n in English and German
- Use of local storage for saving settings data
- Undo button to replay interactions using board history
- Storybook component explorer integration
- Partially responsive

## TO-DO

- Remove all 'any' types remaining
- Unit test all remaining modules
- ~~Add in `classnames` for class toggling~~
- Reduce number of dispatch calls in `"game/playMove"` Thunk
- Create a per region config file to replace static const data
- Make game service no longer global in module
- Create util for toggling element modifier e.g. `--highlight`
- ~~Add storybook with full component coverage~~
- ~~Create settings page to change player difficulty~~
- Create player form to input player details: name, age, colour etc.

## Setup

Run `npm i` to install packages

Run `npm test` to run unit tests

Run `npm start` to run locally on [http://localhost:3000](http://localhost:3000)
