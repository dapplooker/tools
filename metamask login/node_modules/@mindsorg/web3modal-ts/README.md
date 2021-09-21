# Web3Modal-TS

Fork of https://github.com/Web3Modal/web3modal, without any React or visual component implemented. Just the typescript core.

## Motivation

Web3Modal is a very useful and easy to use library, that allows developers to add support for multiple providers in their apps with a simple customizable configuration. 

However, the original package uses React and its bundled vanilla JS version also has React bundled with it. Therefore, separating the typescript core from the React data providers and visual components is particularly useful, not only to allow full customization of the UI, but can also serve as a starting point for implementations in other frameworks like Angular and VueJS.

## Usage

1. Install Web3Modal-TS NPM package

```bash
npm install --save @mindsorg/web3modal-ts
```

Or

```bash
yarn add @mindsorg/web3modal-ts
```

2. Instantiate a `Web3WalletConnector` object

```ts
const web3walletConnector = new Web3WalletConnector({
  network: "mainnet", // optional
  cacheProvider: true, // optional
  providerOptions // required
})
```

The `Web3WalletConnector` constructors takes an optional configuration argument that matches the [original web3modal's configuration object](https://github.com/Web3Modal/web3modal#usage)

See [Web3Modal's provider options](https://github.com/Web3Modal/web3modal#provider-options)

**Optionally** the object can be instantiated and the configuration added/overriden later with the `setConfiguration` method:

```ts
  web3WalletConnector.setConfiguration({
    network: "mainnet", // optional
    cacheProvider: true, // optional
    providerOptions // required
  })
```

3. Set connection and error event handlers

The `web3WalletConnector` object contains the event handlers for errors and connection to a wallet provider:

```ts
  web3WalletConnector.providerController.on(CONNECT_EVENT, provider => { ... });

  web3WalletConnector.providerController.on(ERROR_EVENT, error => { ... });

```

It also contains the methods to handle provider caching:

```ts
  web3WalletConnector.providerController.clearCachedProvider();

  web3WalletConnector.providerController.setCachedProvider(idString);
```

## Provider Options

Web3Modal-TS supports the original Web3modal's Metamask WalletConnect, Fortmatic, Torus, Authereum, UniLogin, BurnerConnect, Portis, Squarelink, Arkane, Mew Connect protocol, D'CENT Wallet and Bitski. See [Web3Modal's provider options](https://github.com/Web3Modal/web3modal#provider-options)

Additionally, it supports:

### WalletLink

1. Install Provider Package

```bash
npm install --save walletlink

# OR

yarn add walletlink
```

2. Set Provider Options

```typescript
import WalletLink from "walletlink";

const providerOptions = {
  walletlink: {
    package: WalletLink,
    options: {
      infuraUrl: 'https://mainnet.infura.io/v3/PROJECT_ID',
      appName: "My Awesome DApp",
      appLogoUrl: "https://example.com/logo.png",
      darkMode: false
    },
  },
};
```

## License

MIT