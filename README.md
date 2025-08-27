# Tic Tac Toe (In space)

A simple Tic Tac Toe game built using Create React App.

<img src="https://github.com/rndware/tic-tac-toe-react/blob/master/media/play.gif" width="65%"/>

<img src="https://github.com/rndware/tic-tac-toe-react/blob/master/media/translate.gif" width="65%"/>

Note: audit issues are not due to create-react-app: https://overreacted.io/npm-audit-broken-by-design/

## Highlights

- Built with **React, Redux, and TypeScript**
- Emphasized **functional and presentational components**
- Implemented **compound components / slots** for custom grid cells
- Styled with **Sass modules** following **BEM syntax**
- Leveraged **Material UI** for icons, inputs, and buttons
- Integrated with **Storybook** for component exploration
- Decoupled board and game logic for maintainability
- Separated AI logic from game (**SOLID principles**)
- Used services to isolate AI logic from Redux slices
- Maintained flat, readable reducers (avoiding deep nesting)
- Kept reducers small and easy to follow
- Added internationalization (English & German)
- Used local storage for persisting settings
- Implemented undo functionality with board history
- Designed to be partially responsive

## TO-DO

- Remove all 'any' types remaining
- Unit test all remaining modules
- ~~Add in `classnames` for class toggling~~
- Reduce number of dispatch calls in `"game/playMove"` Thunk
- ~~Create a per region config file to replace static const data~~
- Create util for toggling element modifier e.g. `--highlight`
- ~~Add storybook with full component coverage~~
- ~~Create settings page to change player difficulty~~
- Create player form to input player details: name, age, colour etc.
- Update unit tests to use `ReactDOMTestUtils.act`

## Setup

Run `npm i` to install packages

Run `npm test` to run unit tests

Run `npm start` to run locally on [http://localhost:3000](http://localhost:3000)
