import { Close } from '@mui/icons-material'
import { Button, Divider, IconButton, Paper, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { addScholar as addScholarAction, CreateScholar } from '@src/redux/reducers/scholarSlice'
import { RootState } from '@src/redux/store'
import { useSnackbar, VariantType } from 'notistack'
import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import validator from 'validator'

export default function AddScholar({ onClose }: { onClose?: () => void }) {
  const [newScholar, setNewScholar] = useState<CreateScholar>({
    manager_share: -1,
    name: '',
    ronin: '',
  })

  const { enqueueSnackbar, closeSnackbar } = useSnackbar()

  const dispatchNotif = useCallback(
    (
      message: string,
      // type: 'error' | 'success' | 'warning',
      type: VariantType,
      timeoutMs?: number
    ) => {
      const snackBar = enqueueSnackbar(message, {
        variant: type,
      })
      const timeout = setTimeout(() => {
        closeSnackbar(snackBar)
        clearTimeout(timeout)
      }, timeoutMs || 2500)
    },
    [closeSnackbar, enqueueSnackbar]
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numeralInputs = ['manager_share']
    setNewScholar((prevState: CreateScholar) => ({
      ...prevState,
      [e.target.name]: numeralInputs.includes(e.target.name)
        ? Number(e.target.value)
        : e.target.value,
    }))
  }
  const scholars = useSelector((state: RootState) => state.scholars)
  const dispatch = useDispatch()
  const addScholar = useCallback(
    (scho: CreateScholar) => dispatch(addScholarAction(scho)),
    [dispatch]
  )
  const [errors, setErrors] = useState<Record<keyof CreateScholar | string, string[]>>({
    manager_share: [],
    ronin: [],
    name: [],
  })

  const validate = useCallback(async () => {
    const localErrors: Record<keyof CreateScholar, string[]> = {
      manager_share: [],
      name: [],
      ronin: [],
    }
    Object.keys(localErrors).forEach((beingValidated) => {
      const value = newScholar[beingValidated as keyof typeof newScholar]

      switch (beingValidated) {
        case 'manager_share':
          if (value > 100) {
            localErrors.manager_share = [
              ...localErrors.manager_share,
              'Manager Share should not be more than 100',
            ]
          }
          if (value < 0) {
            localErrors.manager_share = [
              ...localErrors.manager_share,
              'Manager Share should only have positive number',
            ]
          } else {
            localErrors.manager_share = []
          }
          break
        case 'ronin':
          if (!(value as string).includes('ronin')) {
            localErrors.ronin = [...localErrors.ronin, 'Ronin must start with ronin']
          }
          if (!validator.isEthereumAddress((value as string).replace('ronin:', '0x'))) {
            localErrors.ronin = [...localErrors.ronin, 'Ronin has invalid format']
          } else {
            localErrors.ronin = []
          }
          break
        case 'name':
          if (!value || !((value as string).length > 0)) {
            localErrors.name = [...localErrors.name, 'Name should not be empty']
          } else {
            localErrors.name = []
          }
          break
        default:
      }
    })

    if (
      Object.values(localErrors).reduce((acc, ea) => {
        if (ea.length > 0) {
          return true
        }
        return acc
      }, false)
    ) {
      return Promise.reject(localErrors)
    }
    return Promise.resolve(null)
  }, [newScholar])

  const clearErrors = () => {
    setErrors((prevState) =>
      Object.keys(prevState).reduce(
        (acc, key) => ({
          ...acc,
          [key]: [],
        }),
        prevState
      )
    )
  }
  const handleSubmit = useCallback(() => {
    if (!scholars?.map((ea) => ea.ronin).includes(newScholar.ronin)) {
      setSubmitted(true)
      validate()
        .then(() => {
          clearErrors()
          addScholar(newScholar)
          dispatchNotif('Ronin Account Added', 'success')
        })
        .catch((err: typeof errors) => {
          setErrors({ ...err })
        })
    } else {
      dispatchNotif('Ronin already used', 'error')
    }
  }, [scholars, validate, newScholar, dispatchNotif, addScholar])

  const [submitted, setSubmitted] = useState<boolean>(false)
  useEffect(() => {
    if (submitted) {
      validate()
        .then(() => {
          clearErrors()
        })
        .catch((err) => {
          setErrors(err as typeof errors)
        })
    }
  }, [newScholar, validate, submitted])

  return (
    <Box>
      <Paper variant="outlined">
        <Box p={2}>
          <Box display="flex" justifyContent="space-between">
            <Box>
              <Typography variant="h6">Add a Scholar Account</Typography>
              <Typography variant="body2">Create by putting the Ronin Address</Typography>
            </Box>
            <Box>
              <IconButton onClick={onClose}>
                <Close />
              </IconButton>
            </Box>
          </Box>

          <Box my={1}>
            <Divider />
          </Box>
          <Box>
            <Typography variant="caption">Scholar Name</Typography>
            <TextField
              size="small"
              name="name"
              onChange={handleChange}
              variant="outlined"
              placeholder="Axie NV Scholar 1"
              fullWidth
            />
            {errors.name.length > 0 &&
              errors.name.map((ea) => <ErrorTypography key={ea}>{ea}</ErrorTypography>)}

            <Typography variant="caption">Ronin</Typography>
            <TextField
              size="small"
              name="ronin"
              onChange={handleChange}
              variant="outlined"
              placeholder="ronin:..."
              fullWidth
            />

            {errors.ronin.length > 0 &&
              errors.ronin.map((ea) => <ErrorTypography key={ea}>{ea}</ErrorTypography>)}

            <Typography variant="caption">Manager Share</Typography>
            <TextField
              type="number"
              inputProps={{
                step: 5,
                min: 0,
              }}
              size="small"
              name="manager_share"
              onChange={handleChange}
              variant="outlined"
              fullWidth
              placeholder="40"
            />
            {errors.manager_share.length > 0 &&
              errors.manager_share.map((ea) => <ErrorTypography key={ea}>{ea}</ErrorTypography>)}
          </Box>
          <Box my={2}>
            <Divider />
          </Box>
          <Box display="flex">
            <Button onClick={handleSubmit} disableElevation fullWidth variant="contained">
              Confirm
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  )
}

const ErrorTypography = ({ children }: { children: string }) => (
  <Typography
    sx={{
      display: 'block',
      color: 'error.main',
    }}
    variant="caption"
  >
    {children}
  </Typography>
)
