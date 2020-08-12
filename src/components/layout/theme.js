import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: { main: '#ff6b6b' }, //red
    secondary: { main: '#FFE66D' }, //yellow
    info: { main: '#4ECDC4' }, // blue
    error: { main: '#F7FFF7' }, //grey
  },
});

export default theme;
