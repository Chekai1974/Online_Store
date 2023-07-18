import React from "react";
import Section1 from "./Sections/Section1/Section1";
import Section2 from "./Sections/Section2/Section2";
import Section3 from "./Sections/Section3/Section3";
import Section4 from "./Sections/Section4/Section4";
import MapPage from "../Map/MapPage";

function MainPage() {
  return (
    <>
      <Section1></Section1>
      <Section2></Section2>
      <Section3></Section3>
      <Section4></Section4>
      <MapPage></MapPage>
    </>
  );
}

export default MainPage;
