import { Container, Paper, Typography } from '@mui/material'
import { Box } from '@mui/system'
import ManagerSummary from '@src/components/ManagerSummary'
import ScholarSummary from '@src/components/ScholarSummary'
import { CreateScholar } from '@src/redux/reducers/scholarSlice'
import { RootState } from '@src/redux/store'
import { getCurrencyInPh, getScholarData, ScholarDataResponse } from '@src/utils/scholarApi'
import { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import Head from 'next/head'

const toEth = (arg: string) => arg.replace('ronin:', '0x')
export default function IndexPage() {
  const scholars = useSelector((state: RootState) => state.scholars)
  const [withScholarData, setWithScholarData] = useState<
    | (ScholarDataResponse &
        CreateScholar & {
          place: number
        })[]
    | undefined
  >()

  useEffect(() => {
    if (scholars && scholars.length > 0) {
      Promise.all(
        scholars.map(async (ea) =>
          getScholarData(toEth(ea.ronin))
            .then((res) => ({ ...res, ...ea }))
            .catch((err) => {
              console.error(err)
              throw err
            })
        )
      )
        .then((res: (ScholarDataResponse & CreateScholar)[]) => {
          const sortedScholarData = res
            .sort((first, second) => second.leaderboard.elo - first.leaderboard.elo)
            .map((ea, index) => ({
              ...ea,
              place: index + 1,
            }))

          setWithScholarData(sortedScholarData)
        })
        .catch((err) => {
          throw err
        })
    }
  }, [scholars])

  const [conversionRate, setConversionRate] = useState(0)

  useEffect(() => {
    getCurrencyInPh()
      .then((res) => {
        setConversionRate(res)
      })
      .catch((err) => {
        console.error(err)
      })
  }, [])

  useEffect(() => {
    console.log('withScholarData', withScholarData)
  }, [withScholarData])

  const managerSummary = useMemo(() => {
    if (withScholarData) {
      return withScholarData.reduce(
        (acc, ea, index, array) => ({
          ...acc,
          totalManagerShare: acc.totalManagerShare + ea.manager_share / array.length,
          totalSlp: acc.totalSlp + ea.slp.total,
          totalSlpYesterday: acc.totalSlpYesterday + ea.slp.yesterdaySLP,
          totalSlpToday: acc.totalSlpToday + ea.slp.todaySoFar,
          totalAverageSlp: acc.totalAverageSlp + ea.slp.average,
          totalAverageMMR: acc.totalAverageMMR + ea.leaderboard.elo / array.length,
          totalAverageRanking: acc.totalAverageRanking + Number(ea.leaderboard.rank) / array.length,
        }),
        {
          conversionRate,
          totalManagerShare: 0,
          totalSlp: 0,
          totalSlpYesterday: 0,
          totalSlpToday: 0,
          totalAverageSlp: 0,
          totalAverageMMR: 0,
          totalAverageRanking: 0,
        }
      )
    }
    return {
      conversionRate,
      totalManagerShare: 0,
      totalSlp: 0,
      totalSlpYesterday: 0,
      totalSlpToday: 0,
      totalAverageSlp: 0,
      totalAverageMMR: 0,
      totalAverageRanking: 0,
    }
  }, [withScholarData, conversionRate])

  return (
    <>
      <Head>
        <title>Axie NV | Scholar Tracker</title>
        <meta property="og:title" content="Axie NV | Scholar Tracker" key="title" />
        <meta
          property="og:description"
          content="A simple Axie Scholar Tracker PWA by Axie NV Developers "
        />
        <meta property="og:image" content="/assets/axie-cover.jpeg" />
      </Head>
      <Container
        maxWidth="sm"
        style={{
          padding: 0,
        }}
        sx={{
          paddingBottom: (theme) => theme.spacing(2),
        }}
      >
        <ManagerSummary {...managerSummary} />
        {withScholarData &&
          withScholarData.map((scholarData) => (
            <ScholarSummary
              key={scholarData.ronin}
              {...scholarData}
              conversionRate={conversionRate}
              style={{
                marginTop: 16,
              }}
              overallMmr={managerSummary.totalAverageMMR}
            />
          ))}
      </Container>
    </>
  )
}
