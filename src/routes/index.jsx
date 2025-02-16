import { Routes, Route } from "react-router-dom";

import Home from "../views/home.jsx";

import SurahIndex from "../views/surah/index.jsx";

function RoutesIndex() {
    return (
        <Routes>

            <Route path="/" element={<Home />} />

            <Route path="/qurans" element={<SurahIndex/>}/>

        </Routes>
    )
}

export default RoutesIndex