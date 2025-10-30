// src/pages/Home.jsx
import React from "react";
import Nav from "../MyComponent/Nav";
import BestSeller from "../MyComponent/BestSeller";
import HeroBanter from "../MyComponent/HeroBanter";
import Dot from "../MyComponent/Dot";
import KBeauty from "../MyComponent/KBeauty";
import Kspecial from "../MyComponent/Kspecial";
import Logo from "../MyComponent/Logo";
import Feeds from "../MyComponent/Feeds";
export default function Home() {
  return (
    <div>
      <Nav />
      <HeroBanter />
      <BestSeller />
      <Dot/>
      <KBeauty/>
      <Kspecial/>
      <Logo/>
      <Feeds/>
    </div>
  );
}
