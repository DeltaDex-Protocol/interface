import { useEffect } from 'react'
import Modal from 'react-modal'
import ReactLoading from 'react-loading'
// import { useModalContext } from "../../context/modal/modalContext";
// import { Heading } from "../../common/atomic";
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import {
//   faArrowLeft,
//   faChevronDown,
//   faTimes,
// } from "@fortawesome/free-solid-svg-icons";
// import { PrimaryBlockButton } from "../../common/buttons";
import { useState } from 'react'
// import {
//   getPoolFromPair,
//   getPoolTicks,
//   getTopTokenList,
//   getVolumn24H,
//   Pool,
//   updateNetwork,
//   V3Token,
// } from "../../repos/uniswap";
// import SearchTokenPage from "./SearchTokenPage";
// import { useAppContext } from "../../context/app/appContext";
// import { AppActionType } from "../../context/app/appReducer";
// import { sortToken } from "../../utils/helper";
// import { getPriceChart } from "../../repos/coingecko";
// import { ModalActionType } from "../../context/modal/modalReducer";
// import { Network, NETWORKS } from "../../common/types";

const ModalStyle = {
  overlay: {
    backgroundColor: 'rgba(10, 15, 39, 0.9)',
    zIndex: 99999,
  },
  content: {
    border: 0,
    padding: 0,
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    borderRadius: '16px',
    marginRight: 'calc(-50% + 30px)',
    transform: 'translate(-50%, -50%)',
    background: 'rgba(54, 52, 122, 1)',
  },
}
const Container = styled.div`
  max-width: 370px;
  padding: 15px;

  @media only screen and (max-width: 400px) {
    padding: 10px;
  }
`
const SelectNetworkContainer = styled.div`
  margin-bottom: 15px;
`
const SelectPairContainer = styled.div`
  display: grid;
  grid-gap: 10px;
  margin-bottom: 15px;
  grid-template-columns: repeat(2, 1fr);
`
const TokenSelect = styled.div`
  color: white;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 12px;
  transition: 0.3s;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(255, 255, 255, 0.1);
  font-weight: 500;

  &:hover {
    background: rgba(255, 255, 255, 0.25);
  }

  & > span {
    display: flex;
    align-items: center;

    & > img {
      width: 25px;
      height: 25px;
      margin-right: 10px;
      border-radius: 50%;
    }
  }
`
const Tier = styled.div`
  border-radius: 12px;
  padding: 6px;
  cursor: pointer;
  border: 1px solid rgba(255, 255, 255, 0.1);

  & h4 {
    color: #fff;
    margin: 0;
    font-size: 1rem;
  }

  & > span {
    font-size: 0.8rem;
    line-height: 1.2rem;
    margin-top: 5px;
    display: inline-block;
    color: #999;
  }

  & > div {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 5px;
    padding: 3px 5px;
    color: #ccc;
    font-size: 0.8rem;
    margin-top: 7px;
    text-align: center;
  }
`
const FeeTiersContainer = styled.div`
  display: grid;
  grid-gap: 7px;
  grid-template-columns: repeat(2, 1fr);
  margin-bottom: 20px;
`
const GoBack = styled.h1`
  color: white;
  margin: 0;
  font-weight: 500;
  display: flex;
  padding: 15px;
  justify-content: center;
  align-items: center;
  background: rgb(50, 50, 50);
  font-size: 1rem;

  @media only screen and (max-width: 400px) {
    padding: 15px 10px;
  }

  & > div {
    cursor: pointer;
    position: absolute;
    left: 15px;
  }
`
const NetworkItem = styled.div`
  cursor: pointer;
  color: white;
  display: flex;
  align-items: center;
  transition: 0.3s;
  width: calc(370px - 10px * 2);
  margin: 10px;
  border: 1px solid #333;
  border-radius: 15px;
  padding: 10px 15px;
  position: relative;

  @media only screen and (max-width: 400px) {
    width: calc(100vw - 50px);
  }

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  & > img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin-right: 15px;
  }

  & > div {
    & h5 {
      margin: 0;
      font-weight: normal;
      font-size: 1rem;
      color: white;

      & > span {
        position: absolute;
        right: 10px;
        top: 10px;
        background: #fd0000;
        color: white;
        font-size: 0.6rem;
        padding: 3px 5px;
        border-radius: 5px;
        font-weight: bold;
      }
    }
    & span {
      font-size: 0.8rem;
      color: #999;
      display: block;
    }
  }
`
const Logo = styled.h1`
  color: white;
  margin: 0;
  font-weight: bold;
  font-size: 1.2rem;
  font-weight: 500;
  display: flex;
  padding: 15px;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  & > span {
    font-size: 1.4rem;
    margin-right: 7px;
  }
  & > div {
    position: absolute;
    right: 20px;
    cursor: pointer;
    color: #ccc;
    &:hover {
      color: white;
    }

    @media only screen and (max-width: 400px) {
      right: 15px;
    }
  }

  @media only screen and (max-width: 400px) {
    padding: 15px 10px;
  }
`
const FEE_TIER_STYLES = {
  DISABLE: {
    cursor: 'not-allowed',
    background: 'rgba(255, 255, 255, 0.1)',
  },
  ACTIVE: {
    border: '1px solid rgba(38, 109, 221, 1)',
    background: 'rgba(38, 109, 221, 0.25)',
  },
}
const SelectPairModal = () => {
  // const appContext = useAppContext();
  // const modalContext = useModalContext();

  // const [selectedNetwork, setSelectedNetwork] = useState<Network | null>(
  //   NETWORKS[0]
  // );
  // const [selectedTokens, setSelectedTokens] = useState<V3Token[] | null[]>([
  //   null,
  //   null,
  // ]);
  const [showSelectNetworkPage, setShowSelectNetworkPage] = useState<boolean>(
    false,
  )
  const [showSelectTokenPage, setShowSelectTokenPage] = useState<boolean>(false)
  const [selectedTokenIndex, setSelectedTokenIndex] = useState<number | null>(
    null,
  )

  // const [pools, setPools] = useState<Pool[]>([]);
  // const [selectedPool, setSelectedPool] = useState<Pool | null>(null);

  const [isSubmitLoading, setIsSubmitLoading] = useState<boolean>(false)

  return (
    <>
      <Modal style={ModalStyle} isOpen={1} contentLabel="Example Modal">
        <Logo>
          <span>🦄</span> UniswapCalculator
        </Logo>
        <Container>
          {/* <Heading>Select Network</Heading> */}
          {/* <SelectNetworkContainer> */}
          {/* <TokenSelect
                  onClick={() => {
                    if (!isSubmitLoading) {
                      setSelectedPool(null);
                      setShowSelectNetworkPage(true);
                    }
                  }}
                > */}
          {/* {!selectedNetwork && <span>Select a network</span>} */}
          {/* {selectedNetwork !== null && (
                    <span>
                      <img
                        src={selectedNetwork.logoURI}
                        alt={selectedNetwork.name}
                      />
                      {selectedNetwork.name}
                    </span>
                  )} */}
          <span>
            {/* <FontAwesomeIcon icon={faChevronDown}></FontAwesomeIcon> */}
          </span>
          {/* </TokenSelect> */}
          {/* </SelectNetworkContainer> */}

          {/* <Heading>Select Pair</Heading> */}
          <SelectPairContainer>
            <TokenSelect
              onClick={() => {
                if (!isSubmitLoading) {
                  // setSelectedPool(null);
                  setShowSelectTokenPage(true)
                  setSelectedTokenIndex(0)
                }
              }}
            >
              {<span>Select a token</span>}
              {/* {selectedTokens[0] && (
                    <span>
                      <img
                        src={selectedTokens[0].logoURI}
                        alt={selectedTokens[0].name}
                      />
                      {selectedTokens[0].symbol}
                    </span>
                  )} */}
              <span>
                {/* <FontAwesomeIcon icon={faChevronDown}></FontAwesomeIcon> */}
              </span>
            </TokenSelect>
            <TokenSelect
              onClick={() => {
                if (!isSubmitLoading) {
                  // setSelectedPool(null);
                  setShowSelectTokenPage(true)
                  setSelectedTokenIndex(1)
                }
              }}
            >
              {1 && <span>Select a token</span>}
              {/* {selectedTokens[1] && (
                    <span>
                      <img
                        src={selectedTokens[1].logoURI}
                        alt={selectedTokens[1].name}
                      />
                      {selectedTokens[1].symbol}
                    </span>
                  )} */}
              <span>
                {/* <FontAwesomeIcon icon={faChevronDown}></FontAwesomeIcon> */}
              </span>
            </TokenSelect>
          </SelectPairContainer>

          <div>Select Fee Tier</div>
          <FeeTiersContainer>
            <Tier>
              <h4 style={!0 ? { color: '#999' } : {}}>0.01%</h4>
              <span>Best for very stable pairs.</span>
              {/* <div>{'100'}</div> */}
            </Tier>
            <Tier>
              <h4 style={!0 ? { color: '#999' } : {}}>0.05%</h4>
              <span>Best for stable pairs.</span>
            </Tier>
            <Tier>
              <h4 style={!0 ? { color: '#999' } : {}}>0.3%</h4>
              <span>Best for most pairs.</span>
            </Tier>
            <Tier>
              <h4 style={!0 ? { color: '#999' } : {}}>1%</h4>
              <span>Best for exotic pairs.</span>
            </Tier>
          </FeeTiersContainer>
        </Container>
      </Modal>
    </>
  )
}

export default SelectPairModal
