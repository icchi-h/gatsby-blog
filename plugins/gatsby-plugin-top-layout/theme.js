import { pink, indigo, red } from '@material-ui/core/colors'
import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: pink[500],
    },
    secondary: {
      main: indigo[500],
    },
    error: {
      main: red[400],
    },
    background: {
      default: '#fff',
    },
  },
})

export default theme
