import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#0a0a0b",
      paper: "#131315",
    },
    text: {
      primary: "#d4d4d8",
      secondary: "#8a8a90",
      disabled: "#55555a",
    },
    divider: "#2a2a2e",
    primary: {
      main: "#f2f2f3",
      contrastText: "#0a0a0b",
    },
    error: {
      main: "#c15a4f",
    },
    action: {
      hover: "rgba(255, 255, 255, 0.04)",
      selected: "rgba(255, 255, 255, 0.08)",
    },
  },
  shape: {
    borderRadius: 2,
  },
  typography: {
    fontFamily:
      '"JetBrains Mono", ui-monospace, "SFMono-Regular", Consolas, monospace',
    button: {
      textTransform: "uppercase",
      letterSpacing: "0.06em",
      fontWeight: 600,
      fontSize: "0.72rem",
    },
    overline: {
      letterSpacing: "0.06em",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#0a0a0b",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: "#1a1a1d",
        },
        notchedOutline: {
          borderColor: "#3f3f45",
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "#8a8a90",
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        outlined: {
          borderColor: "#2a2a2e",
        },
        containedPrimary: {
          "&:hover": {
            backgroundColor: "#d4d4d8",
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderColor: "#1f1f22",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 2,
        },
      },
    },
  },
});

export default theme;
