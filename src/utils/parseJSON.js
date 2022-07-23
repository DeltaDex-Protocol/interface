var ethers = require("ethers");

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

  const rows = [
    {
      id: 0,
      token0: token0,
      token1: token1,
      token0_balance: token0_balance,
      token1_balance: token1_balance,
      amount: amount,
      expiry: expiry,
      fees: fees,
      hedges: perDay,
      hedgeFee: hedgeFee,
      strike: K,
      T: T,
      r: r,
      sigma: sigma,
      lam: lam,
      m: m,
      v: v,
    },
  ];

  return rows;
}

position = parsePosition(JDM_CALL);
