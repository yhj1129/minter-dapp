require('dotenv').config();
const basePath = process.cwd();
const fs = require("fs");
const { MODE } = require(`${basePath}/constants/blend_mode.js`);
const { NETWORK } = require(`${basePath}/constants/network.js`);

const network = NETWORK.eth;

// General metadata for Ethereum
const namePrefix = "book";//여기
const description = "hihi";//여기
const baseUri = "ipfs://NewUriToReplace"; // This will be replaced automatically//여기

const layerConfigurations = [
  {
    growEditionSizeTo: 5,//여기
    layersOrder: [//여기
      { name: "Background" },
      { name: "Eyeball" },
      { name: "Eye color" },
      { name: "Iris" },
      { name: "Shine" },
      { name: "Bottom lid" },
      { name: "Top lid" },
    ],
  },
];

const shuffleLayerConfigurations = true;//번호 섞음 1~10하나 11~20하나 일케 안나오게

const debugLogs = false;

const format = {//여기 사이즈 조절
  width: 512,
  height: 512,
  smoothing: false,
};

const extraMetadata = {
  external_url: "https://silverbook.xyz", // 여기 Replace with your website or remove this line if you do not have one.
};

// NFTPort Info

// ** REQUIRED **
const AUTH = process.env.NFTPORT_API_KEY; // Set this in the .env file to prevent exposing your API key when pushing to Github
const LIMIT = 2; // Your API key rate limit
const CHAIN = 'goerli'; // only goerli, polygon, or ethereum

// REQUIRED CONTRACT DETAILS THAT CANNOT BE UPDATED LATER!
const CONTRACT_NAME = 'dhdh';//여기
const CONTRACT_SYMBOL = 'dh';//여기
const METADATA_UPDATABLE = true; // set to false if you don't want to allow metadata updates after minting //트루로 하면 나중에 리빌
const OWNER_ADDRESS = '0x5aaa58dc49B0aC91B2122AE96f0D2BAbc1B7Eb1a';//내지갑주소
const TREASURY_ADDRESS = '0x5aaa58dc49B0aC91B2122AE96f0D2BAbc1B7Eb1a';//출금될 지갑 주소
const MAX_SUPPLY = 5; // The maximum number of NFTs that can be minted. CANNOT BE UPDATED! //최대 민팅할 NFT 개수
const MINT_PRICE = 0.001; // Minting price per NFT. Goerli = ETH, Ethereum = ETH, Polygon = MATIC. CANNOT BE UPDATED!
const TOKENS_PER_MINT = 10; // maximum number of NFTs a user can mint in a single transaction. CANNOT BE UPDATED!

// REQUIRED CONTRACT DETAILS THAT CAN BE UPDATED LATER.
const PUBLIC_MINT_START_DATE = "2022-10-20T11:30:48+00:00"; // This is required. Eg: 2022-02-08T11:30:48+00:00
//부가적으로 설정하는 부분
// OPTIONAL CONTRACT DETAILS THAT CAN BE UPDATED LATER.
const PRESALE_MINT_START_DATE = "2022-10-10T11:30:48+00:00"; // Optional. Eg: 2022-02-08T11:30:48+00:00 
const ROYALTY_SHARE = 1000; // Percentage of the token price that goes to the royalty address. 100 bps = 1%
const ROYALTY_ADDRESS = "0x5aaa58dc49B0aC91B2122AE96f0D2BAbc1B7Eb1a"; // Address that will receive the royalty
const BASE_URI = null; // only update if you want to manually set the base uri //리빌하고 싶으면 널했다가 나중에 입력
const PREREVEAL_TOKEN_URI = null; // only update if you want to manually set the prereveal token uri //리빌하고 싶으면 입력
const PRESALE_WHITELISTED_ADDRESSES = []; // only update if you want to manually set the whitelisted addresses //주소들 리스트로 쭉 넣음 "", "", ""일케

// ** OPTIONAL **
let CONTRACT_ADDRESS = "YOUR CONTRACT ADDRESS"; // If you want to manually include it //쓰던 컨트랙트 있으면

// Generic Metadata is optional if you want to reveal your NFTs //리빌할거면 하기 리빌 전 내용들
const GENERIC = true; // Set to true if you want to upload generic metas and reveal the real NFTs in the future //트루하면 리빌하는거
const GENERIC_TITLE = CONTRACT_NAME; // Replace with what you want the generic titles to say if you want it to be different from the contract name.
const GENERIC_DESCRIPTION = "REPLACE THIS"; // Replace with what you want the generic descriptions to say. // 여기 설명 바꾸기
const GENERIC_IMAGE = "https://ipfs.io/ipfs/bafybeid7dmhp6qwusps2opfq3plhffwwb6kybms4dkbsp6mc7d5btu44ui"; // Replace with your generic image that will display for all NFTs pre-reveal.

// Automatically set contract address if deployed using the deployContract.js script
try {
  const rawContractData = fs.readFileSync(
    `${basePath}/build/contract/_contract.json`
  );
  const contractData = JSON.parse(rawContractData);
  if (contractData.response === "OK") {
    CONTRACT_ADDRESS = contractData.contract_address;
  }
} catch (error) {
  // Do nothing, falling back to manual contract address
}
// END NFTPort Info

const solanaMetadata = {
  symbol: "YC",
  seller_fee_basis_points: 1000, // Define how much % you want from secondary market sales 1000 = 10%
  external_url: "https://www.youtube.com/c/hashlipsnft",
  creators: [
    {
      address: "7fXNuer5sbZtaTEPhtJ5g5gNtuyRoKkvxdjEjEnPN4mC",
      share: 100,
    },
  ],
};

const gif = {
  export: false,
  repeat: 0,
  quality: 100,
  delay: 500,
};

const text = {
  only: false,
  color: "#ffffff",
  size: 20,
  xGap: 40,
  yGap: 40,
  align: "left",
  baseline: "top",
  weight: "regular",
  family: "Courier",
  spacer: " => ",
};

const pixelFormat = {
  ratio: 2 / 128,
};

const background = {
  generate: true,
  brightness: "80%",
  static: false,
  default: "#000000",
};

const rarityDelimiter = "#";

const uniqueDnaTorrance = 10000;

const preview = {
  thumbPerRow: 5,
  thumbWidth: 50,
  imageRatio: format.height / format.width,
  imageName: "preview.png",
};

const preview_gif = {
  numberOfImages: 5,
  order: "ASC", // ASC, DESC, MIXED
  repeat: 0,
  quality: 100,
  delay: 500,
  imageName: "preview.gif",
};

module.exports = {
  format,
  baseUri,
  description,
  background,
  uniqueDnaTorrance,
  layerConfigurations,
  rarityDelimiter,
  preview,
  shuffleLayerConfigurations,
  debugLogs,
  extraMetadata,
  pixelFormat,
  text,
  namePrefix,
  network,
  solanaMetadata,
  gif,
  preview_gif,
  AUTH,
  LIMIT,
  CONTRACT_ADDRESS,
  OWNER_ADDRESS,
  TREASURY_ADDRESS,
  CHAIN,
  GENERIC,
  GENERIC_TITLE,
  GENERIC_DESCRIPTION,
  GENERIC_IMAGE,
  CONTRACT_NAME,
  CONTRACT_SYMBOL,
  METADATA_UPDATABLE,
  ROYALTY_SHARE,
  ROYALTY_ADDRESS,
  MAX_SUPPLY,
  MINT_PRICE,
  TOKENS_PER_MINT,
  PRESALE_MINT_START_DATE,
  PUBLIC_MINT_START_DATE,
  BASE_URI,
  PREREVEAL_TOKEN_URI,
  PRESALE_WHITELISTED_ADDRESSES
};
