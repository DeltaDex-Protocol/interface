const defineAddresses = {
  '0xE6937ab8cc964D616DeD01225a208a732f0dBF47': 'DAI',
  '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48': 'USDC',
  '0xdAC17F958D2ee523a2206206994597C13D831ec7': 'USDT',
  '0xA8DFC7Df45a0Fd0701fafFEA739d31b2d2CCfBF2': 'WETH',
}

const TokenOptions = [
  { label: 'DAI', value: '0xE6937ab8cc964D616DeD01225a208a732f0dBF47' },
  { label: 'USDC', value: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48' },
  { label: 'USDT', value: '0xdAC17F958D2ee523a2206206994597C13D831ec7' },
  { label: 'WETH', value: '0xA8DFC7Df45a0Fd0701fafFEA739d31b2d2CCfBF2' },
]

const AddressToToken = {
  "0xE6937ab8cc964D616DeD01225a208a732f0dBF47": "DAI",
  "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48": "USDC",
  "0xdAC17F958D2ee523a2206206994597C13D831ec7": "USDT",
  "0xA8DFC7Df45a0Fd0701fafFEA739d31b2d2CCfBF2": "WETH",
};


const OptionDirections = [
  { label: "long", value: "long" },
  { label: "short", value: "short" },
];

const VanillaTypes = [
  { label: "call", value: "vanillaCall" },
  { label: "put", value: "vanillaPut" },
];

const AvailableModels = [
  { label: "Black-Scholes", value: "black-scholes" },
  { label: "Jump Diffusion", value: "jump-diffusion" },
  { label: "SABR model (coming soon)", value: "sabr" },
  { label: "Heston model (coming soon)", value: "heston" },
];

export { defineAddresses, TokenOptions, AddressToToken, OptionDirections, VanillaTypes, AvailableModels }
