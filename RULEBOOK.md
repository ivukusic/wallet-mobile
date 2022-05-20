# Rulebook for React and React Native

- [**Rules**](#rules)

  - [**Eslint Prettier**](#eslint-prettier)
  - [**Functional components**](#functional-components)
  - [**Object destructuring**](#object-destructuring)
  - [**Naming convention**](#naming-convention)
  - [**ES6 features**](#es6-features)
  - [**Static typing**](#static-typing)
  - [**Other rules**](#other-rules)

- [**GIT**](#git)

  - [**Branching strategy**](#branching-strategy)
  - [**Functional components**](#functional-components)
  - [**Object destructuring**](#object-destructuring)
  - [**Naming convention**](#naming-convention)

- [**Project structure**](#project-structure)

- [**Error handling**](#error-handling)

## Rules

##### Eslint Prettier

Every project has to have **prettier** and **eslint** included. Also we have to have implemented **husky** to take care of our pre-commit hooks. We have to take care of that, so every developer follows certain guidelines, to make sure of coding standards and similarity in our code.

For enabling auto save you have to edit your editors settings.

```
Basic settings for VSCode... <ROOT_DIR>/.vscode/settings.json
{
  "editor.formatOnSave": true
}

```

In every moment you can check your code with:

```
yarn lint
```

##### Functional components

We give preference to functional components before class based components. Use class based components only in case when lifecycle methods can be used to boost performance of the app. Never use class based components for some simple render!

```javascript
// BAD
export default class Button extends React.Component {
  componentDidMount() {}

  render(props) {
    return <button onClick={props.onClick}>Click me!</button>;
  }
}

// GOOD
export default ({ onClick }) => {
  useEffect(() => {}, []);

  return <button onClick={onClick}>Click me!</button>;
};
```

##### Object destructuring

Preference of object destructuring especially in functional components. In some cases destructuring is not needed because variables are used only once.

```javascript
// BAD
export default (props: ButtonProps) => {};

// GOOD
export default ({ onClick, children }: ButtonProps) => {};
```

##### Lambda/function keyword

Prefer using lambda functions instead of function when declaring functional components. Use `function` keyword only when needed

```javascript
// BAD
function Button(props: ButtonProps) {}

// GOOD
const Button = ({ onClick, children }: ButtonProps) => {};
```

##### Naming convention

Try to write your components as easily for understanding as it’s possible. Every type of file should have a separate file proper name: {type}.{ts|tsx|scss}.
**There are different types of components:**

- index.tsx - view
- hook.ts - functional
- styles.ts - styling
- types.ts - component types

Every component should have an index file that is a root of the component. It is used as a view layer and to expose component that we need.

**Example:**

```
│── Weather
        ├── Components
        │        └── Graph
        │               ├── index.tsx
        │               ├── hook.ts
        │               ├── types.ts
        │               └── styles.ts
        ├── index.ts
        ├── types.ts
        ├── hook.ts
        └── styles.ts
```

##### Static typing

Don’t use **any, Object, Function** types. Object and Function types don’t tell us what we actually expect to be in this variable. Also TypeScript compiler does not know what fields can be in Object type and what function signature hides behind Function type.

Any is the most dangerous type for development because TypeScript stops his type checking for variables with Any type.

When **any** can be used:

- Developer should spend a lot of time (let’s say 15 minutes) to understand what type should be used there instead of any
- Some library is written pretty strange, without type-definitions, and developer works with this library calls’ results

If you decide to use Any, you should make a comment above it, which will explain why you prefer to use Any here.

##### Other rules

- **Freeze npm packages version (remove ^ symbols from package.json, use --save-exact flag when installing a packages)**
  We have to make sure that project can be maintained even after 1 year of development. We aren't interested in updating packages in that case, because some breaking changes can go with new a version of some package. To avoid unnecessary code rewriting, we have to freeze versions of all the packages.

- **Imports order**
  Every import should have its order. Normally it is ordered by type and alphabetically, mostly tslint will take care of that and warn you if it is on consistent.
  Example:

```
    import React from 'react';                                   // First you have to write imports for NPM packages
                                                                 // One empty line
    import Weather from 'screens/Weather';                       // Then you can write your local absolute imports
    import Weather from '../library/constants/Url.ts';           // Then you can write your local relative imports
                                                                 // One empty line
    import './App';                                              // Then you can write your styles import
                                                                 // One empty line

    const App = () => {}
```

- **If your component defines some big function in it (or a lot of small functions), move these functions into the utils folder in your component’s folder**
  Try to always split a medium and big components into small parts. It makes code easier to read and maintain.

- **Create reusable components**
  If 2 of your components has the same JSX, you can move that JSX to its own component and use it everywhere.

- **Create reusable hooks and utils**
  Same as in rule above. If you have the same logic in 2+ components, move it to its own file and use everywhere.

- **Split components by Pure / Impure**
  If you have some logic and big render function in your component, you can split it into 2 components: first one will do all the logic and render the second one, which will just accept all the callbacks and variables through props and do the rendering.

## GIT

In most cases tslint and pre-commit hooks will take care of some stuff for you, but you also have to take care that you don't have too much commented code in the repository. It is good to keep code clean and remove unnecessary comments. If you commented out some lines of the code, remove it and if you need it later, it can be restored through git.

##### Branching strategy

Every branch should follow a pattern in naming.

- **feature/JIRA_STORY_SHORT_CODE** - if your branch contains some feature or improvement - **feature/ZM-114**
- **bug/JIRA_STORY_SHORT_CODE** - if your branch is used for fixing bugs - **bug/ZM-115**
- **hotfix/JIRA_STORY_SHORT_CODE** - if your branch is used for creating hotfixes - **hotfix/ZM-116**

##### Commit messages

All the commits in your branch should contain the branch’s name in the start. Commits should contain proper description, not just some random words. From the commit message you and other developers should be able to come to conclusion what was changed. If they are not sure, there is a JIRA story short code to see more details.

- Wrong commit messages:

  - “update config.js”
  - “add dropdown with time zones on dashboard page”

- Correct commit messages:\*\*
  - “ZM-114 - added hourly and daily charts to weather screen”
  - “ZM-116 - update config.js”

## Project structure

```
├── public
├── src
│   ├── apollo
│   │   ├── mutation
│   │   │     └── index.ts
│   │   ├── query
│   │   │     └── index.ts
│   │   └── client.ts
│   │
│   ├── assets
│   │   ├── fonts
│   │   └── images
│   └── common
│   │     ├── components
│   │     │   └──Button
│   │     │       └──index.tsx
│   │     ├── consts
│   │     │   └── index.ts
│   │     ├── helpers
│   │     ├── themes
│   │     └── types
│   │ 
│   ├── navigation
│   ├── screens
│   │   └── auth
│   │       ├── EnterEmailScreen
│   │       ├── EnterLocationScreen
│   │       ├── EnterNameScreen
│   │       ├── EnterUsernameScreen
│   │       ├── SignupScreen
│   │       └── VerificationScreen
│   │               ├── index.tsx
│   │               ├── styles.ts
│   │               └── types.ts
│   └── index.tsx
├── .env
├── .gitignore
├── .prettierrc
├── app.json
├── index.js
├── metro.config.js
├── package.json
├── package.json
├── react-native.config.js
├── README.md
├── RULEBOOK.md
├── tsconfig.json
└── yarn.lock
```
