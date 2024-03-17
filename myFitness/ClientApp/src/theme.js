import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    typography: {
        fontFamily: "Montserrat"
    },
    palette: {
        navy: '#23418B',
    },
    components: {
        MuiContainer: {
            styleOverrides: {
                root: {
                    paddingLeft: '12px',
                    paddingRight: '12px'
                }
            }
        },
        MuiFormControlLabel: {
            styleOverrides: {
                asterisk: {
                    visibility: 'hidden'
                }
            }
        },
        MuiTab: {
            styleOverrides: {
                root: {
                    fontWeight: 550,
                    color: '#000080',
                    padding: '12px 12px'
                }
            }
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    padding: "0.375rem 0.75rem",
                    marginTop: 0,
                },
                input: {
                    padding: 0
                },
            }
        },
        MuiFormLabel: {
            styleOverrides: {
                root: {
                    fontWeight: 700,
                    fontSize: "14px",
                    lineHeight: "20px",
                    color: '#212529'
                },
                asterisk: {
                    color: '#db3131'
                },
                '&$error': {
                    color: '#db3131'
                },
            }
        }
    },
});

export default theme;