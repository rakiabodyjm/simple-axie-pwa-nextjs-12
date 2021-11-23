import axios, { AxiosResponse } from 'axios'
import validator from 'validator'

export interface ScholarDataResponse {
  leaderboard: {
    drawTotal: number
    elo: number
    loseTotal: number
    name: string
    rank: string
    winRate: string
    winTotal: number
  }
  slp: {
    average: number
    claimableTotal: number
    lastClaimedItemAt: number
    todaySoFar: number
    total: number
    yesterdaySLP: number
  }
}
export const getScholarData = (id: string) => {
  if (!validator.isEthereumAddress(id)) {
    throw new Error(`Invalid ETH Address format ${id}`)
  }
  return axios
    .request({
      method: 'get',
      url: `https://axie-infinity.p.rapidapi.com/get-update/${id}`,
      params: {
        id,
      },
      headers: {
        'x-rapidapi-host': 'axie-infinity.p.rapidapi.com',
        'x-rapidapi-key': '6347e1065fmshb411b916585d558p13d51cjsn194d850bbea0',
      },
    })
    .then((res: AxiosResponse) => res.data as ScholarDataResponse)
    .catch((err) => {
      throw err
    })
}

export const getCurrencyInPh = () =>
  axios
    .get(
      'https://api.coingecko.com/api/v3/simple/token_price/ethereum?contract_addresses=0xcc8fa225d80b9c7d42f96e9570156c65d6caaa25&vs_currencies=php'
    )
    .then(
      (res) =>
        res.data as {
          '0xcc8fa225d80b9c7d42f96e9570156c65d6caaa25': {
            php: number
          }
        }
    )
    .then((res) => res['0xcc8fa225d80b9c7d42f96e9570156c65d6caaa25'].php)
    .catch((err) => {
      throw err
    })
