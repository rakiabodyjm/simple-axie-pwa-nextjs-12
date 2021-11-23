import { Typography } from '@mui/material'
import { Box } from '@mui/system'

const ThreeStatContainer = ({
  title,
  highlight,
  approximate,
}: {
  approximate?: string | number
  highlight?: string | number
  title?: string | number
}) => (
  <Box
    display="flex"
    flexDirection="column"
    sx={{
      '& > *': {
        lineHeight: 1.2,
      },
    }}
  >
    {title && <Typography variant="caption">{title}</Typography>}
    {highlight && (
      <Typography fontWeight={700} variant="body1">
        {highlight}
      </Typography>
    )}

    {approximate && (
      <Typography
        style={{
          transformOrigin: '0% 0%',
          transform: 'scale(0.8)',
        }}
        variant="caption"
      >
        {approximate}
      </Typography>
    )}
  </Box>
)
export default ThreeStatContainer
