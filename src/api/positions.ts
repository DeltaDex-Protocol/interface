import { add } from 'mathjs'
import { ExpandedRowParamsType, PositionsInfoType } from './positions.types'

const pseudoData: PositionsInfoType[] = [
  {
    type: 'Uniswap v3 hedging',
    pairAddress: '0x2aff...2290',
    currentBalances: ['150 USDC', '249 1INCH'],
    currentPnL: '+230.48 USDC',
    performance: '93%',
    expand: {
      Expiry: '2022-12-02 00:00 UTC',
      'Liquidity provided': '200 USDC',
      'Value to protect': '521 1INCH',
      'Expected costs for replication': '33 USDC',
      // 'Last hedge': '2022-11-02 18:30 UTC',
      'Option type': 'long put',
      Leverage: '2x',
      Advanced: '', // TODO: change to model params & position greeks
    },
  },
  {
    type: 'Uniswap v3 hedging',
    pairAddress: '0x0ef1...f210',
    currentBalances: ['100 USDC', '97 1INCH'],
    currentPnL: '+120.26 USDC',
    performance: '96%',
    expand: {
      Expiry: '2022-12-02 00:00 UTC',
      'Liquidity provided': '200 1INCH',
      'Value to protect': '521 1INCH',
      'Expected costs for replication': '33 USDC',
      // 'Last hedge': '2022-11-02 18:30 UTC',
      'Option type': 'long put',
      Leverage: '2x',
      Advanced: '', // TODO: change to model params & position greeks
    },
  },
]

export const getPositionsInfo = async (
  id: number,
): Promise<PositionsInfoType[]> => {
  return pseudoData
}

// require("@nomiclabs/hardhat-waffle");
const { parseUnits } = require('ethers/lib/utils')
const { ethers } = require('ethers')

// require('dotenv').config()

const coreABI = require('@/abi/OptionMaker.json')
const storageABI = require('@/abi/OptionStorage.json')

const OptionMakerAddress = '0xd7a89AEa304A491Ef4B5e74928370059fa53D8C6'
const OptionStorageAddress = '0x232A4710D1A21AfEfB021654C5B48092e5faB67F'

// const RPC = 'http://localhost:8545'
// const provider = new ethers.providers.JsonRpcProvider(RPC)

export const viewPositions = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const signer = provider.getSigner()
  const optionmaker = new ethers.Contract(OptionMakerAddress, coreABI, signer)
  const optionstorage = new ethers.Contract(
    OptionStorageAddress,
    storageABI,
    signer,
  )

  const numberOfPairs = await optionstorage.numOfPairs()
  console.log(Number(numberOfPairs)) // it works

  console.log(signer)

  // let address = await optionstorage.returnPairAddress(0) // it does not work
  // console.log(address)

  // for (let i = 0; i < numberOfPairs; i++) {
  //   // const _pair = Object.create(Pair)
  //   let input = parseUnits(String(i))
  //   console.log(input)
  //   let address = await optionstorage.returnPairAddress(i)
  //   // console.log(address)
  // }
}

// const optionmaker = new ethers.Contract(OptionMakerAddress, coreABI, signer)
// const optionstorage = new ethers.Contract(
//   OptionStorageAddress,
//   storageABI,
//   signer,
// )

// const Pairs: Array<any> = []

// const Pair = {
//   address: null,
//   users: [],
// }

// const Positions: Array<any> = []

// const Position = {
//   pairAddress: null,
//   userAddress: null,
//   type: null,
//   ID: null,
//   amount: null,
//   expiry: null,
//   fees: null,
//   perDay: null,
//   hedgeFee: null,
//   lastHedgeTimeStamp: null,
//   nextHedgeTimeStamp: null,
// }

// async function main() {
//   while (true) {
//     let numberOfPairs = await getPairs()

//     await getUsers(numberOfPairs)
//     await savePositions(numberOfPairs)

//     arrangePositions()

//     // checkIfHedgeAvailable();

//     // hedgePosition(0);
//     // printPositions();

//     output()

//     await sleep(60000)
//   }
// }

// // @dev this will be slow if there are multiple positions to hedge in a single block...
// async function checkIfHedgeAvailable() {
//   timestamp = Date.now();

//   for (i = 0; i < Positions.length; i++) {
//     if (timestamp < Positions[i].nextHedgeTimeStamp) {
//       hedgePosition(i);
//     }
//     else {
//       // pass
//     }
//   }
// }

// async function hedgePosition(index) {
//   console.log("Hedging Position");

//   let position = Positions[index];

//   const pair = position.pairAddress;
//   const user = position.userAddress;
//   const ID = position.ID;

//   if (position.type == "BS") {
//     await optionmaker.BS_HEDGE(pair, user, ID);
//   }
//   else {
//     await optionmaker.JDM_HEDGE(pair, user, ID);
//   }
//   position.nextHedgeTimeStamp = nextHedgeTimeStamp(position.perDay, Date.now());

//   console.log("Hedging Position Sucess");

// }

// export async function getUsers(numberOfPairs) {
//   for (let i = 0; i < numberOfPairs; i++) {
//     const pair = Pairs[i].address

//     const allUsers = await optionstorage.getUserAddressesInPair(pair)
//     // @ts-ignore
//     Pairs[i].users = [...new Set(allUsers)]
//   }
// }

// export async function getPairs() {
//   let numberOfPairs = await optionstorage.numOfPairs()
//   console.log(provider)

//   for (let i = 0; i < numberOfPairs; i++) {
//     const _pair = Object.create(Pair)

//     _pair.address = await optionstorage.returnPairAddress(i)

//     Pairs.push(_pair)
//   }

//   return numberOfPairs
// }

// async function savePositions(numberOfPairs) {
//   /*
//     IMPORTANT DATA FOR HEDGING
//     uint amount;
//     uint expiry;
//     uint fees;
//     uint perDay;
//     uint hedgeFee;
//     uint lastHedgeTimeStamp;
//   */

//   // Getting all positions of all users
//   for (let i = 0; i < numberOfPairs; i++) {
//     let pair = Pairs[i].address

//     let users = Pairs[i].users

//     for (let j = 0; j < users.length; j++) {
//       let user = users[j]

//       let numberOfUserPositions = await optionstorage.userIDlength(user)

//       for (let ID = 0; ID < numberOfUserPositions; ID++) {
//         let positionData = await optionstorage.BS_PositionParams(pair, user, ID)
//         let type

//         if (positionData.amount == 0) {
//           positionData = await optionstorage.JDM_PositionParams(pair, user, ID)
//           type = 'JDM'
//         } else {
//           type = 'BS'
//         }

//         const position = Object.create(Position)

//         position.pairAddress = pair
//         position.userAddress = user
//         position.type = type
//         position.ID = ID
//         position.amount = positionData[0]
//         position.expiry = positionData[1]
//         position.fees = positionData[2]
//         position.perDay = positionData[3].toNumber()
//         position.hedgeFee = positionData[4]
//         position.lastHedgeTimeStamp = positionData[5].toNumber()
//         position.nextHedgeTimeStamp = nextHedgeTimeStamp(
//           position.perDay,
//           position.lastHedgeTimeStamp,
//         )

//         Positions.push(position)
//       }
//     }
//   }
// }

// function nextHedgeTimeStamp(perDay, lastHedgeTimeStamp) {
//   let interval = 86400 / perDay
//   let nextTimeStamp = lastHedgeTimeStamp + interval

//   return nextTimeStamp
// }

// function arrangePositions() {
//   Positions.sort(compare)
// }

// function compare(a, b) {
//   if (a.nextHedgeTimeStamp < b.nextHedgeTimeStamp) {
//     return -1
//   }
//   if (a.nextHedgeTimeStamp > b.nextHedgeTimeStamp) {
//     return 1
//   }
//   return 0
// }

// @dev this is a test function
// function printPositions() {
//   for (let i = 0; i < Positions.length; i++) {
//     console.log(Positions[i])
//   }
// }

// function sleep(ms) {
//   return new Promise((resolve) => setTimeout(resolve, ms))
// }

// function output() {
//   console.log('Number of pairs in contract: ', Pairs.length.toString())
//   console.log('Number of open positions: ', Positions.length.toString())
// }

// main()
//   .then(() => process.exit(0))
//   .catch((error) => {
//     console.error(error)
//     process.exit(1)
//   })
