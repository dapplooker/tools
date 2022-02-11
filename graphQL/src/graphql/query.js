import {gql} from'@apollo/client';

export const UNISWAP_DATA = gql`
{
    pairs(first: 10, where: {reserveUSD_gt: "1000000", volumeUSD_gt: "50000"}, orderBy: reserveUSD, orderDirection: desc) {
    id
    token0 {
      id
      symbol
    }
    token1 {
      id
      symbol
    }
    reserveUSD
    volumeUSD
  }
}
`;


export const LIVEPEER_DATA = gql`
{
    protocol(id: "0") {
    inflation
    inflationChange
    winningTicketCount
    totalActiveStake
  }
  transcoders(where: {active: true}, first: 5) {
    totalStake
    rewardCut
    feeShare
    serviceURI
  }
}
`