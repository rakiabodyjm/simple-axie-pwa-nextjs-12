import { Container, Divider, Typography } from '@mui/material'
import { Box } from '@mui/system'
import DarkModeToggle from 'react-dark-mode-toggle'
import Image from 'next/image'

export default function Layout({
  children,
  darkMode,
  toggleDarkMode,
}: {
  darkMode: boolean
  toggleDarkMode: () => void
  children: JSX.Element
}) {
  return (
    <Container maxWidth="sm">
      <Box minHeight="100vh">
        <Box pt={2} display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <Image src="/assets/axie-nv-logo.png" width={72} height={72} />
            {/* <Typography fontFamily="Playfair Display, serif" fontWeight={600} variant="body2">
              A Simple Scholar Tracker by Axie NV
            </Typography> */}
          </Box>
          <Box>
            <DarkModeToggle size={64} onChange={toggleDarkMode} checked={darkMode} />
          </Box>
        </Box>
        <Box mb={2}>
          <Divider />
        </Box>

        <main>{children}</main>
      </Box>
    </Container>
  )
}
