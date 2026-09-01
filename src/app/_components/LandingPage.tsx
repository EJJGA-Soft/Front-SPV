'use client'
import React from "react";
import Header from "./Header";
import Hero from "./Hero";
import Works from "./Works";

const LandingPage: React.FC = () => {
  return (
    <div className="landing-page">
      <Header />
      <main>
        <Hero />
        <Works />
      </main>
    </div>
  );
};

export default LandingPage;
