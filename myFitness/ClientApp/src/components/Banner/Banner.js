import React, { useContext } from "react";
import BannerContext from "./BannerContext";

function Banner() {
    const { bannerMessage } = useContext(BannerContext);

    return (
        <div className="banner">
            {bannerMessage && (
                <div className="banner-message">
                    {bannerMessage}
                </div>
            )}
        </div>
    );
}

export default Banner;