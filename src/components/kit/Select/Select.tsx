// import { Trans } from '@lingui/macro'
import { TraceEvent } from '@uniswap/analytics'
import { BrowserEvent, ElementName, EventName } from '@uniswap/analytics-events'
// import searchIcon from 'assets/svg/search.svg'
// import xIcon from 'assets/svg/x.svg'
// import useDebounce from 'hooks/useDebounce'
// import { useAtomValue, useUpdateAtom } from 'jotai/utils'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

import { ReactNode } from 'react'


import { SwapWidget } from '@uniswap/widgets'
import '@uniswap/widgets/fonts.css'

const CMC_TOKEN_LIST = 'https://api.coinmarketcap.com/data-api/v3/uniswap/all.json'

export function SswapWidget() {
  <div className="Uniswap">
    <SwapWidget
      tokenList={CMC_TOKEN_LIST} // Use the CoinMarketCap token list
    />
  </div>
}


export function TokenRow({
  header,
  listNumber,
  tokenInfo,
  price,
  percentChange,
  tvl,
  volume,
  sparkLine,
  ...rest
}: {
  first?: boolean
  header: boolean
  listNumber: ReactNode
  loading?: boolean
  tvl: ReactNode
  price: ReactNode
  percentChange: ReactNode
  sparkLine?: ReactNode
  tokenInfo: ReactNode
  volume: ReactNode
  last?: boolean
  style?: any
}) {
  // const rowCells = (
    
  // )
  if (header) return <div>{'rowCells'}</div>
  return <div {...rest}>{'rowCells'}</div>
}

/* Header Row: top header row component for table */
export function HeaderRow() {
  return (
    <TokenRow
      header={true}
      listNumber="#"
      tokenInfo={<>Token name</>}
      price={123}
      percentChange={123}
      tvl={1233}
      volume={'<HeaderCell category={TokenSortMethod.VOLUME} />'}
      sparkLine={null}
    />
  )
}

/* Loading State: row component with loading bubbles */
export function LoadingRow(props: { first?: boolean; last?: boolean }) {
  return (
    <TokenRow
      header={false}
      listNumber={""}
      loading
      tokenInfo={[]
        // <>
        //   <IconLoadingBubble />
        //   <MediumLoadingBubble />
        // </>
      }
      price={""}
      percentChange={""}
      tvl={"<LoadingBubble />"}
      volume={"<LoadingBubble />"}
      sparkLine={"<SparkLineLoadingBubble />"}
      {...props}
    />
  )
}



const GridContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: ${1500};
  background-color: ${({ theme }) => theme.backgroundSurface};
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.01), 0px 4px 8px rgba(0, 0, 0, 0.04), 0px 16px 24px rgba(0, 0, 0, 0.04),
    0px 24px 32px rgba(0, 0, 0, 0.01);
  margin-left: auto;
  margin-right: auto;
  border-radius: 12px;
  justify-content: center;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.backgroundOutline};
`

const TokenDataContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  height: 100%;
  width: 100%;
`

const NoTokenDisplay = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 60px;
  color: ${({ theme }) => theme.textSecondary};
  font-size: 16px;
  font-weight: 500;
  align-items: center;
  padding: 0px 28px;
  gap: 8px;
`

function NoTokensState({ message }: { message }) {
  return (
    <GridContainer>
      {/* <HeaderRow /> */}
      <NoTokenDisplay>{message}</NoTokenDisplay>
    </GridContainer>
  )
}

const LoadingRows = ({ rowCount }: { rowCount: number }) => (
  <>
    {Array(rowCount)
      .fill(null)
      .map((_, index) => {
        return <LoadingRow key={index} first={index === 0} last={index === rowCount - 1} />
      })}
  </>
)

export function LoadingTokenTable({ rowCount = 10 }: { rowCount?: number }) {
  return (
    <GridContainer>
      <HeaderRow />
      <TokenDataContainer>
        <LoadingRows rowCount={rowCount} />
      </TokenDataContainer>
    </GridContainer>
  )
}









export const FilterOption = styled.button<{ active: boolean; highlight?: boolean }>`
  height: 100%;
  color: ${({ theme, active }) => (active ? theme.accentActive : theme.textPrimary)};
  background-color: ${({ theme, active }) => (active ? theme.accentActiveSoft : theme.backgroundInteractive)};
  margin: 0;
  padding: 6px 12px 6px 14px;
  border-radius: 12px;
  font-size: 16px;
  line-height: 24px;
  font-weight: 600;
  transition-duration: ${({ theme }) => theme.transition.duration.fast};
  border: none;
  outline: ${({ theme, active, highlight }) => (active && highlight ? `1px solid ${theme.accentAction}` : 'none')};
  :hover {
    cursor: pointer;
    background-color: ${({ theme, active }) => (active ? theme.accentActiveSoft : theme.backgroundModule)};
    opacity: ${({ theme, active }) => (active ? theme.opacity.hover : 1)};
  }
  :focus {
    background-color: ${({ theme, active }) => (active ? theme.accentActiveSoft : theme.backgroundInteractive)};
  }
`



// import { MEDIUM_MEDIA_BREAKPOINT } from '../constants'
// import { filterStringAtom } from '../state'
const ICON_SIZE = '20px'

const SearchBarContainer = styled.div`
  display: flex;
  flex: 1;
`
const SearchInput = styled.input`
  background: no-repeat scroll 7px 7px;
  background-size: 20px 20px;
  background-position: 12px center;
  background-color: ${({ theme }) => theme.backgroundModule};
  border-radius: 12px;
  border: 1.5px solid ${({ theme }) => theme.backgroundOutline};
  height: 100%;
  width: min(200px, 100%);
  font-size: 14px;
  padding-left: 40px;
  color: ${({ theme }) => theme.textSecondary};

  :hover {
    background-color: ${({ theme }) => theme.backgroundSurface};
  }

  :focus {
    outline: none;
    background-color: ${({ theme }) => theme.backgroundSurface};
    border-color: ${({ theme }) => theme.accentActionSoft};
  }

  ::placeholder {
    color: ${({ theme }) => theme.textTertiary};
  }
  ::-webkit-search-cancel-button {
    -webkit-appearance: none;
    appearance: none;
    height: ${ICON_SIZE};
    width: ${ICON_SIZE};
    margin-right: 10px;
    background-size: ${ICON_SIZE} ${ICON_SIZE};
    cursor: pointer;
  }

  @media only screen and (max-width: ${1500}) {
    width: 100%;
  }
`

export default function SearchBar() {
  // const currentString = useAtomValue(filterStringAtom)
  // const [localFilterString, setLocalFilterString] = useState(currentString)
  // const setFilterString = useUpdateAtom(filterStringAtom)
  // const debouncedLocalFilterString = useDebounce(localFilterString, 300)

  // useEffect(() => {
  //   setLocalFilterString(currentString)
  // }, [currentString])

  // useEffect(() => {
  //   setFilterString(debouncedLocalFilterString)
  // }, [debouncedLocalFilterString, setFilterString])

  return (
    <SearchBarContainer>
      {/* <Trans
        render={({ translation }) => (
          <TraceEvent
            events={[BrowserEvent.onFocus]}
            name={EventName.EXPLORE_SEARCH_SELECTED}
            element={ElementName.EXPLORE_SEARCH_INPUT}
          > */}
            <SearchInput
              type="search"
              placeholder={`${123}`}
              id="searchBar"
              autoComplete="off"
              // value={localFilterString}
              // onChange={({ target: { value } }) => setLocalFilterString(value)}
            />
          {/* </TraceEvent>
        )}
      >
        Filter tokens
      </Trans> */}
    </SearchBarContainer>
  )
}







// import styled from "styled-components";


// export const InputRow = styled.div<{ selected: boolean }>`
//   ${({ theme }) => theme.flexRowNoWrap}
//   align-items: center;
//   padding: ${({ selected }) => (selected ? '0.75rem 0.5rem 0.75rem 1rem' : '0.75rem 0.75rem 0.75rem 1rem')};
// `

// export const CurrencySelect = styled.button<{ selected: boolean }>`
//   align-items: center;
//   height: 2.2rem;
//   font-size: 20px;
//   font-weight: 500;
//   background-color: ${({ selected, theme }) => (selected ? theme.bg1 : theme.primary1)};
//   color: ${({ selected, theme }) => (selected ? theme.text1 : theme.white)};
//   border-radius: 12px;
//   box-shadow: ${({ selected }) => (selected ? 'none' : '0px 6px 10px rgba(0, 0, 0, 0.075)')};
//   outline: none;
//   cursor: pointer;
//   user-select: none;
//   border: none;
//   padding: 0 0.5rem;
//   :focus,
//   :hover {
//   }
// `

// export const LabelRow = styled.div`
//   ${({ theme }) => theme.flexRowNoWrap}
//   align-items: center;
//   color: ${({ theme }) => theme.text1};
//   font-size: 0.75rem;
//   line-height: 1rem;
//   padding: 0.75rem 1rem 0 1rem;
//   span:hover {
//     cursor: pointer;
//   }
// `

// export const Aligner = styled.span`
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
// `

// export const StyledDropDown = styled.div`
//   margin: 0 0.25rem 0 0.5rem;
//   height: 35%;
//   path {
//     stroke: ${({ selected, theme }) => (selected ? theme.text1 : theme.white)};
//     stroke-width: 1.5px;
//   }
// `

// const InputPanel = styled.div<{ hideInput?: boolean }>`
//   ${({ theme }) => theme.flexColumnNoWrap}
//   position: relative;
//   border-radius: ${({ hideInput }) => (hideInput ? '8px' : '20px')};
//   background-color: ${({ theme }) => theme.bg2};
//   z-index: 1;
// `

// const Container = styled.div<{ hideInput: boolean }>`
//   border-radius: ${({ hideInput }) => (hideInput ? '8px' : '20px')};
//   border: 1px solid ${({ theme }) => theme.bg2};
//   background-color: ${({ theme }) => theme.bg1};
// `

// const StyledTokenName = styled.span<{ active?: boolean }>`
//   ${({ active }) => (active ? '  margin: 0 0.25rem 0 0.75rem;' : '  margin: 0 0.25rem 0 0.25rem;')}
//   font-size:  ${({ active }) => (active ? '20px' : '16px')};
// `

// const StyledBalanceMax = styled.button`
//   height: 28px;
//   background-color: ${({ theme }) => theme.primary5};
//   border: 1px solid ${({ theme }) => theme.primary5};
//   border-radius: 0.5rem;
//   font-size: 0.875rem;
//   font-weight: 500;
//   cursor: pointer;
//   margin-right: 0.5rem;
//   color: ${({ theme }) => theme.primaryText1};
//   :hover {
//     border: 1px solid ${({ theme }) => theme.primary1};
//   }
//   :focus {
//     border: 1px solid ${({ theme }) => theme.primary1};
//     outline: none;
//   }
//   ${({ theme }) => theme.mediaWidth.upToExtraSmall`
//     margin-right: 0.5rem;
//   `};
// `

// interface CurrencyInputPanelProps {
//   value: string
//   onUserInput: (value: string) => void
//   onMax?: () => void
//   showMaxButton: boolean
//   label?: string
//   onCurrencySelect?: (currency: any) => void
//   currency?: any | null
//   disableCurrencySelect?: boolean
//   hideBalance?: boolean
//   pair?: any | null
//   hideInput?: boolean
//   otherCurrency?: any | null
//   id: string
//   showCommonBases?: boolean
//   customBalanceText?: string
// }