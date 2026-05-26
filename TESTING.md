# Testing with Jest

Dette prosjektet bruker ES Modules (`"type": "module"`). Derfor kjøres Jest via Node med `--experimental-vm-modules`.

## Installer testverktøy første gang

```bash
npm install
```

Hvis du har en gammel `package-lock.json`, kjør vanlig `npm install` første gang slik at lockfilen oppdateres med Jest.

## Kjør tester

```bash
npm test
```

## Kjør tester i watch mode

```bash
npm run test:watch
```

## Kjør med coverage

```bash
npm run test:coverage
```

## Teststruktur

```text
test/
├── integration/
│   └── examFlow.integration.test.js
├── model/
│   ├── domain/
│   └── repositories/
└── utils/
```

## Hva som testes

- Enhetstester: UseCases, repositories og rene hjelpefunksjoner isolert med mocks.
- Integrasjonstester: Faktisk dependency injection-oppsett + reelle datafiler, uten å teste React UI.

## Viktig observasjon

`GetExamByBaseIdAndLangUseCase.execute` tar i dag to argumenter:

```js
execute(baseId, lang)
```

Men `AppNavigationViewModel.js` kaller den med ett objekt:

```js
execute({ baseId, lang, language })
```

Det kan gjøre at språkbytte av aktiv eksamen ikke finner riktig oversatt eksamen. En mulig løsning er å gjøre use casen mer robust:

```js
execute(input, maybeLang) {
    const baseId = typeof input === "object" ? input.baseId : input;
    const lang = typeof input === "object" ? input.lang ?? input.language : maybeLang;

    return this.repository.getExamByBaseIdAndLang(baseId, lang);
}
```
