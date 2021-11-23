import { Edit } from '@mui/icons-material'
import {
  Divider,
  Grid,
  Paper,
  Box,
  Typography,
  BoxProps,
  IconButton,
  Modal,
  Container,
} from '@mui/material'
import EditScholar from '@src/components/EditScholar'
import ThreeStatContainer from '@src/components/ThreeStatContainer'
import { CreateScholar } from '@src/redux/reducers/scholarSlice'
import toLocaleString from '@src/utils/common/toLocaleString'
import { ScholarDataResponse } from '@src/utils/scholarApi'
import Image from 'next/image'
import { useState } from 'react'

export default function ScholarSummary({
  name,
  manager_share,
  slp,
  leaderboard,
  ronin,
  conversionRate,
  overallMmr,
  place,
  ...restProps
}: CreateScholar &
  ScholarDataResponse & {
    place: number
    conversionRate: number
    overallMmr: number
  } & BoxProps) {
  const [editModal, setEditModal] = useState<boolean>(false)
  return (
    <>
      <Box {...restProps}>
        <Paper variant="outlined">
          <Box p={2}>
            <Box display="flex" justifyContent="space-between" alignItems="flex-start">
              <Box overflow="hidden">
                <Typography noWrap fontWeight={600} variant="h6">
                  {name}
                </Typography>
                <Typography fontFamily="Playfair Display, serif" variant="body2">
                  {leaderboard.name}
                </Typography>
              </Box>
              <Box>
                <IconButton
                  onClick={() => {
                    setEditModal(true)
                  }}
                >
                  <Edit />
                </IconButton>
              </Box>
            </Box>
            <Box my={2}>
              <Divider />
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={2}>
                <Image src="/assets/slp.svg" height={40} width={40} />
              </Grid>
              <Grid item container xs={10}>
                <Grid item xs={6}>
                  <ThreeStatContainer
                    title="SLP Earnings"
                    highlight={`${toLocaleString(slp.total)} SLP`}
                  />
                </Grid>
                <Grid item xs={6}>
                  <ThreeStatContainer
                    title="Average Daily"
                    highlight={`${toLocaleString(slp.average)} SLP`}
                    approximate={`${toLocaleString((slp.average * conversionRate).toFixed(2))} PHP`}
                  />
                </Grid>
                <Grid item xs={6}>
                  <ThreeStatContainer
                    title="Yesterday"
                    highlight={`${toLocaleString(slp.yesterdaySLP.toFixed(2))} SLP`}
                    approximate={`${toLocaleString(
                      (slp.yesterdaySLP * conversionRate).toFixed(2)
                    )} PHP`}
                  />
                </Grid>
                <Grid item xs={6}>
                  <ThreeStatContainer
                    title="Today"
                    highlight={`${toLocaleString(slp.todaySoFar.toFixed(2))} SLP`}
                    approximate={`${toLocaleString(
                      (slp.todaySoFar * conversionRate).toFixed(2)
                    )} PHP`}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Box my={1}>
              <Divider />
            </Box>

            <Grid container spacing={2}>
              <Grid item xs={2}>
                <Image src="/assets/dollar.svg" width={42} height={42} />
              </Grid>
              <Grid container item xs={10}>
                <Grid item xs={6}>
                  <ThreeStatContainer
                    title="Earnings"
                    highlight={`${toLocaleString((slp.total * conversionRate).toFixed(2))} PHP`}
                  />
                </Grid>
                <Grid item xs={6}></Grid>
                <Grid item xs={6}>
                  <ThreeStatContainer
                    title="Manager"
                    highlight={`${manager_share}%`}
                    approximate={`${toLocaleString(
                      ((manager_share / 100) * slp.total * conversionRate).toFixed(2)
                    )} PHP`}
                  />
                </Grid>
                <Grid item xs={6}>
                  <ThreeStatContainer
                    title="Scholar"
                    highlight={`${100 - manager_share}%`}
                    approximate={`${toLocaleString(
                      (((100 - manager_share) / 100) * slp.total * conversionRate).toFixed(2)
                    )} PHP`}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Box my={1}>
              <Divider />
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={2}>
                <Image src="/assets/mmr.svg" height={44} width={44} />
              </Grid>
              <Grid container item xs={10}>
                <Grid item xs={6}>
                  <ThreeStatContainer
                    title="Team MMR"
                    highlight={toLocaleString(leaderboard.elo)}
                    approximate={`Out of ${toLocaleString(overallMmr)} Average MMR`}
                  />
                </Grid>
                <Grid item xs={6}>
                  <ThreeStatContainer
                    title="Ranking"
                    highlight={toLocaleString(leaderboard.rank)}
                  />
                </Grid>
                <Grid item xs={6}>
                  <ThreeStatContainer title="Team Place" highlight={place} />
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Box>
      <Modal
        open={editModal}
        onClose={() => {
          setEditModal(false)
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
          <EditScholar
            onClose={() => {
              setEditModal(false)
            }}
            scholar={{
              manager_share,
              name,
              ronin,
            }}
          />
        </Container>
      </Modal>
    </>
  )
}
