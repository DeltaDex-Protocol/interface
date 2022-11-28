### DeltaDex v2-interface
#### To run app:
```
yarn build
yarn start
```
and open `localhost:3000/impermanent-loss`
#### If for some reasons version does not compile, then run by:
```
yarn dev
```

### Contexts:
#### To manage and store form data, each page has its own form context and reducer.


`src/Context`:
```
\- form
    \- OptionFormContext
    \- OptionFormReducer
    \- LeverageTradingContext
    \- LeverageTradingReducer
```

#### Views of pages are located at `src/views/App`
```
\- App
    \- ImpermanentLoss
    \- LeverageTrading
    \- MyPositions
```

### Components
`src\components`:
```
\- layout
\- kit
```

### Api
For suitable and safe using of api calls, we splitted entire api into two separate folders: `pages/api/` and `src/api/` <br>

In cases when user should not see how request processes or not to influence on form validation, we're using `Next.js` backend (it means api must be located at `pages/api/`). <br>

In other cases, for better user experience, api calls are located at `src/api/`