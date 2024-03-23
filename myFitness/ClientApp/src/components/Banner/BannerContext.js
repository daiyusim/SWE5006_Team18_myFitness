import React, { createContext, useContext, useState } from "react";
import { useSnackbar } from "notistack";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
 
const BannerContext = createContext({
    showBanner: () => { },
    showSuccessBanner: () => { },
    showErrorBanner: () => { },
});

export function BannerProvider({ children }) {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const [bannerMessage, setBannerMessage] = useState("");

    const showSuccessBanner =(message) => {
        message = message ?? "Success";
        showBanner(message, "success");
    }

    const showErrorBanner =(message) => {
        message = message ?? "Error";
        showBanner(message, "error");
    }

    const showBanner = (message, variant) => {
        setBannerMessage(message);
        const options = {
            variant: variant || "info",
            autoHideDuration: 3000, // set to 3 secs
            action: (key) => (
                <IconButton
                    aria-label="close"
                    color="inherit"
                    onClick={() => {
                        closeSnackbar(key);
                        setBannerMessage(""); // Clear the message when closed
                    }}
                    className="close-banner-button"
                >
                    <CloseIcon />
                </IconButton>
            ),
        };

        enqueueSnackbar(message, options);
    };

    const value = {
        showBanner,
        showSuccessBanner,
        showErrorBanner
    };

    return (
        <BannerContext.Provider value={value}>
            {children}
            {bannerMessage && (
                <div className="banner-message">
                </div>
            )}
        </BannerContext.Provider>
    );
}

export function useBanner() {
    return useContext(BannerContext);
}

export default BannerContext;