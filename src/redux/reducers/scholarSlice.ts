import { createSlice, current } from '@reduxjs/toolkit'
const localStorageToken = 'scholarData'
// let initialState: CreateScholar[] = []
// export const retrieveScholars = () => {
//   try {
//     let scholarData: CreateScholar[] = []
//     const rawScholarData = localStorage.getItem(localStorageToken)
//     if (rawScholarData) {
//       scholarData = JSON.parse(rawScholarData) as CreateScholar[]
//     }
//     return scholarData
//   } catch (err) {
//     return []
//   }
// }
// if (process.browser && localStorage) {
//   initialState = retrieveScholars()
//   console.log('new InitialState', initialState)
// }
export interface CreateScholar {
  ronin: string
  name: string
  manager_share: number
}

export const retrieveScholars = () => {
  try {
    if (window?.localStorage && process?.browser) {
      let scholarData: CreateScholar[] = []
      const rawScholarData = localStorage.getItem(localStorageToken)
      if (rawScholarData) {
        scholarData = JSON.parse(rawScholarData) as CreateScholar[]
      }
      return scholarData
    }
    return []
  } catch (err) {
    return []
  }
}
const scholarSlice = createSlice({
  initialState: retrieveScholars(),
  name: 'scholars',
  reducers: {
    setScholars(_, { payload }: { payload: CreateScholar[] }) {
      return [...payload]
    },
    updateScholar(
      proxyState: CreateScholar[],
      {
        payload,
      }: {
        payload: {
          id: CreateScholar['ronin']
          update: Partial<CreateScholar>
        }
      }
    ) {
      let index: number | undefined
      const state = current(proxyState)
      console.log('state', state)

      const toBeUpdated = state.find((ea, ind) => {
        index = ind
        return ea.ronin === payload.id
      })
      console.log('toBeUpdated', toBeUpdated)
      if (!toBeUpdated) {
        throw new Error(`Ronin ${payload.id} Not in Scholar List`)
      }
      if (!(index === undefined || index === null)) {
        const stateCopy = [...state]
        stateCopy[index] = {
          ...toBeUpdated,
          ...payload.update,
        }
        console.log('newStateCopy', stateCopy)
        localStorage.setItem(localStorageToken, JSON.stringify(stateCopy))
        return stateCopy
      }
      console.log('index', index)
      localStorage.setItem(localStorageToken, JSON.stringify(state))
      return state
    },
    addScholar(state: CreateScholar[], { payload }: { payload: CreateScholar }) {
      const data = [...state, payload]
      localStorage.setItem(localStorageToken, JSON.stringify(data))
      return data
    },
    removeScholar(
      state: CreateScholar[],
      {
        payload,
      }: {
        payload: CreateScholar['ronin']
      }
    ) {
      const data = state.filter((fi) => fi.ronin !== payload)
      localStorage.setItem(localStorageToken, JSON.stringify(data))
      return data
    },
  },
})

export const { addScholar, removeScholar, updateScholar } = scholarSlice.actions
export default scholarSlice.reducer
