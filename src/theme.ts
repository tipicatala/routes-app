import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#007BFF', // Blue color for primary
    },
    secondary: {
      main: '#148f9c', // Gray color for secondary
    },
    error: {
      main: '#DC3545', // Red color for errors
    },
    warning: {
      main: '#FFC107', // Orange color for warnings
    },
    info: {
      main: '#17A2B8', // Teal color for informational messages
    },
    success: {
      main: '#28A745', // Green color for success messages
    },
    text: {
      primary: '#333', // Dark text color
      secondary: '#666', // Lighter text color
    },
  },
  typography: {
    fontFamily: "'Roboto', 'Arial', sans-serif",
  },
});

export default theme;
