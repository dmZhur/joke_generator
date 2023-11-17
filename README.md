# Technical assignment

App is hosted on `https://dmzhur.github.io/joke_generator/`

To run locally

```
yarn imstall
yarn run start

```
Application automatically move you to

`http://localhost:3000/joke_generator`

![Home-page]![screen](https://github.com/dmZhur/joke_generator/assets/9991770/ed7e98ab-acfa-4b2c-bd82-34d9534ff568)

## Development details

For getting first 10 jokes I using this request

`https://api.chucknorris.io/jokes/search?query=dev`

In a response I get 52 jokes, I shuffle this array, and take first 10 elements after shuffled
`
// shuffle array
const shuffled = action.payload.result?.sort(() => 0.5 - Math.random());
// Get first 10 elements after shuffled
state.jokes = shuffled?.length ? shuffled.slice(0, 10) : [];
`
For geting new joke every 5 seconds I using this reqest
`https://api.chucknorris.io/jokes/random`

For cache store, I used Redux Persist `redux-persist`

## Unit tests

If you want to run unit tests locally please run:

```
yarn run test
```



