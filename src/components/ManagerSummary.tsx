import { AddCircleOutlined } from '@mui/icons-material'
import {
  Backdrop,
  CircularProgress,
  Container,
  Divider,
  Grid,
  IconButton,
  Modal,
  Paper,
  Typography,
} from '@mui/material'
import { Box } from '@mui/system'
import dynamic from 'next/dynamic'
import { useState } from 'react'
import Image from 'next/image'
import ThreeStatContainer from '@src/components/ThreeStatContainer'
import toLocaleString from '@src/utils/common/toLocaleString'

const AddScholar = dynamic(() => import('@src/components/AddScholar'))

export default function ManagerSummary({
  totalManagerShare,
  totalSlp,
  totalSlpYesterday,
  totalSlpToday,
  totalAverageSlp,
  conversionRate,
  totalAverageMMR,
  totalAverageRanking,
}: {
  totalManagerShare: number
  totalSlp: number
  totalSlpYesterday: number
  totalSlpToday: number
  conversionRate: number
  totalAverageSlp: number
  totalAverageMMR: number
  totalAverageRanking: number
}) {
  const [addModal, setAddModal] = useState<boolean>(false)
  return (
    <>
      <Box>
        <Paper variant="outlined">
          <Box p={2}>
            <Box display="flex" justifyContent="space-between" alignItems="flex-start">
              <Box>
                <Typography fontWeight={600} variant="h6">
                  Manager Summary
                </Typography>
                <Typography fontFamily="Playfair Display serif" variant="body2">
                  Manager Summary based on Scholar data
                </Typography>
              </Box>
              <Box>
                <IconButton
                  onClick={() => {
                    setAddModal(true)
                  }}
                >
                  <AddCircleOutlined />
                </IconButton>
              </Box>
            </Box>
            <Box my={2}>
              <Divider />
            </Box>

            <Grid container spacing={1}>
              <Grid item xs={2}>
                <Image src="/assets/slp.svg" height={40} width={40} />
              </Grid>
              <Grid item xs={5}>
                <ThreeStatContainer
                  title="SLP Earnings"
                  highlight={`${toLocaleString(totalSlp)} SLP`}
                />
              </Grid>
              <Grid item xs={5}>
                <ThreeStatContainer
                  title="Average Daily"
                  highlight={`${toLocaleString(totalAverageSlp)} SLP`}
                  approximate={`${toLocaleString(
                    (totalAverageSlp * conversionRate).toFixed(2)
                  )} PHP`}
                />
              </Grid>
            </Grid>
            <Grid container spacing={1}>
              <Grid item xs={2}>
                {/* <Image src="/assets/dollar.svg" height={42} width={42} /> */}
              </Grid>
              <Grid item xs={5}>
                <ThreeStatContainer
                  title="Yesterday"
                  highlight={`${toLocaleString(totalSlpYesterday)} SLP`}
                  approximate={`${toLocaleString(
                    (totalSlpYesterday * conversionRate).toFixed(2)
                  )} PHP`}
                />
              </Grid>
              <Grid item xs={5}>
                <ThreeStatContainer
                  title="Today"
                  highlight={`${toLocaleString(totalSlpToday)} SLP`}
                  approximate={`${(totalSlpToday * conversionRate).toFixed(2)} PHP`}
                />
              </Grid>
            </Grid>
            <Box my={2}>
              <Divider />
            </Box>

            <Grid container spacing={1}>
              <Grid item xs={2}>
                <Image src="/assets/dollar.svg" width={42} height={42} />
              </Grid>

              <Grid item xs={10} container>
                <Grid item xs={12}>
                  <ThreeStatContainer
                    title="Earnings"
                    highlight={`${toLocaleString((totalSlp * conversionRate).toFixed(2))} PHP `}
                  />
                </Grid>

                <Grid item xs={6}>
                  <ThreeStatContainer
                    highlight={`${totalManagerShare}%`}
                    title="Manager"
                    approximate={`${toLocaleString(
                      ((totalSlp * conversionRate * totalManagerShare) / 100).toFixed(2)
                    )} PHP`}
                  />
                </Grid>
                <Grid item xs={6}>
                  <ThreeStatContainer
                    highlight={`${100 - totalManagerShare}%`}
                    title="Scholar"
                    approximate={`${toLocaleString(
                      (((100 - totalManagerShare) / 100) * totalSlp * conversionRate).toFixed(2)
                    )} PHP`}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Box my={2}>
              <Divider />
            </Box>

            <Grid container spacing={1}>
              <Grid item xs={2}>
                <Image src="/assets/mmr.svg" height={44} width={44} />
              </Grid>
              <Grid container item xs={10}>
                <Grid item xs={6}>
                  <ThreeStatContainer
                    highlight={`${toLocaleString(totalAverageMMR)}`}
                    title="Average Team MMR"
                  />
                </Grid>
                <Grid item xs={6}>
                  <ThreeStatContainer
                    highlight={`${Number(totalAverageRanking.toFixed(0)).toLocaleString()}`}
                    title="Average Team Ranking"
                  />
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Box>

      <Modal
        open={addModal}
        onClose={() => {
          setAddModal(false)
        }}
        closeAfterTransition
        BackdropProps={{
          timeout: 500,
        }}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Container maxWidth="xs">
          <AddScholar
            onClose={() => {
              setAddModal(false)
            }}
          />
        </Container>
      </Modal>
    </>
  )
}
