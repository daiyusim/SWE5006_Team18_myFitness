import React, { createContext, useContext, useState } from "react";
import './Banner.css'
import { useSnackbar } from "notistack";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { BannerVariant } from "../../helper/Constants";

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
        showBanner(message, BannerVariant.SUCCESS);
    }

    const showErrorBanner =(message) => {
        message = message ?? "Error";
        showBanner(message, BannerVariant.ERROR);
    }

    const showBanner = (message, variant) => {
        setBannerMessage(message);
        const options = {
            variant: variant || BannerVariant.INFO,
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