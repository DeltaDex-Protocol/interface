var ethers = require("ethers");

const JDM_CALL = [
  "0x6B175474E89094C44Da98b954EedeAC495271d0F",
  "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
  {
    type: "BigNumber",
    hex: "0x081ff99153cf96f624",
  },
  {
    type: "BigNumber",
    hex: "0x0c3b554618b21b34",
  },
  {
    type: "BigNumber",
    hex: "0x5150ae84a8cdf00000",
  },
  {
    type: "BigNumber",
    hex: "0x63cca175",
  },
  {
    type: "BigNumber",
    hex: "0x0ad78ebc5ac6200000",
  },
  {
    type: "BigNumber",
    hex: "0x3782dace9d900000",
  },
  {
    type: "BigNumber",
    hex: "0x00",
  },
  {
    type: "BigNumber",
    hex: "0x62dc07b5",
  },
  [
    {
      type: "BigNumber",
      hex: "0x3635c9adc5dea00000",
    },
    {
      type: "BigNumber",
      hex: "0x06f05b59d3b20000",
    },
    {
      type: "BigNumber",
      hex: "0x016345785d8a0000",
    },
    {
      type: "BigNumber",
      hex: "0x0c7d713b49da0000",
    },
    {
      type: "BigNumber",
      hex: "0x0de0b6b3a7640000",
    },
    {
      type: "BigNumber",
      hex: "0x0de0b6b3a7640000",
    },
    {
      type: "BigNumber",
      hex: "0x0de0b6b3a7640000",
    },
  ],
];

function parsePosition(JDM_CALL) {
  const JDM = JSON.stringify(JDM_CALL);

  const JDMparsed = JSON.parse(JDM);

  var token0 = JDMparsed[0];
  var token1 = JDMparsed[1];

  var token0_balance = ethers.utils.formatUnits(
    ethers.BigNumber.from(JDMparsed[2]),
    "ether"
  );

  var token1_balance = ethers.utils.formatUnits(
    ethers.BigNumber.from(JDMparsed[3]),
    "ether"
  );

  var amount = ethers.utils.formatUnits(
    ethers.BigNumber.from(JDMparsed[4]),
    "ether"
  );

  var expiry = ethers.BigNumber.from(JDMparsed[5]).toString();

  var fees = ethers.utils.formatUnits(
    ethers.BigNumber.from(JDMparsed[6]),
    "ether"
  );

  var perDay = ethers.BigNumber.from(JDMparsed[7]).toString();

  var hedgeFee = ethers.utils.formatUnits(
    ethers.BigNumber.from(JDMparsed[8]),
    "ether"
  );

  var lastHedge = ethers.BigNumber.from(JDMparsed[9]).toString();

  var K = ethers.utils.formatUnits(
    ethers.BigNumber.from(JDMparsed[10][0]),
    "ether"
  );

  var T = ethers.utils.formatUnits(
    ethers.BigNumber.from(JDMparsed[10][1]),
    "ether"
  );

  var r = ethers.utils.formatUnits(
    ethers.BigNumber.from(JDMparsed[10][2]),
    "ether"
  );

  var sigma = ethers.utils.formatUnits(
    ethers.BigNumber.from(JDMparsed[10][3]),
    "ether"
  );

  var m = ethers.utils.formatUnits(
    ethers.BigNumber.from(JDMparsed[10][4]),
    "ether"
  );

  var v = ethers.utils.formatUnits(
    ethers.BigNumber.from(JDMparsed[10][5]),
    "ether"
  );

  var lam = ethers.utils.formatUnits(
    ethers.BigNumber.from(JDMparsed[10][5]),
    "ether"
  );

  position = [
    token0,
    token1,
    token0_balance,
    token1_balance,
    amount,
    expiry,
    fees,
    perDay,
    hedgeFee,
    lastHedge,
    K,
    T,
    r,
    sigma,
    m,
    v,
    lam,
  ];

  return position;
}

position = parsePosition(JDM_CALL);
console.log(position.length);
