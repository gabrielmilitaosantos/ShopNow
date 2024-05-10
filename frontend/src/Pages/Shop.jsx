import React from "react";
import Hero from "../Components/Hero/Hero";
import Popular from "../Components/Popular/Popular";
import Offers from "../Components/Offers/Oferrs";
import NewCollections from "../Components/NewCollections/NewCollections";
import NewsLetter from "../Components/NewsLetter/NewsLetter";

// Homepage
function Shop() {
    return (
        <>
            <Hero />
            <Popular />
            <Offers />
            <NewCollections />
            <NewsLetter />
        </>
    )
}

export default Shop;