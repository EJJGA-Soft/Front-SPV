import React from "react";
import Header from "../../components/landingpage/Header";
import Hero from "../../components/landingpage/Hero";
import Works from "../../components/landingpage/Works";


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
