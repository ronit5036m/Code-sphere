import React from "react";
import Card from "../Cards/Card";
import Logo from "../../assets/logo";
function Landing2() {
  return (
    <main className="py-12">
      <h2 className="text-3xl font-bold text-white text-center mb-4">
        Our Purpose
      </h2>
      <p className="text-gray-300 max-w-2xl mx-auto text-center mb-10">
        CodeSphere is a platform built for developers by developers. Whether
        you're a beginner or a pro, it's the place to craft your personal brand,
        discover amazing projects, and grow in a community that gets you.
      </p>
      <h2 className="text-2xl font-semibold text-white text-center mb-8">
        Developer Project creation
      </h2>
      <div className="flex flex-wrap justify-center gap-8">
        <Card
          title="Project uploads"
          content="See what others build and take inspiration; build collaboration"
          imageUrl={Logo.image2}
          footer="Photo by Unsplash"
        />
        <Card
          title="Discover peers and opportunities"
          content="Talk with 1% of developers and grow more"
          imageUrl={Logo.image3}
          footer="Photo by Unsplash"
        />
        <Card
          title="Community engagement"
          content="Join our Discord server where people show work and get hired"
          imageUrl={Logo.image4}
          footer="Photo by Unsplash"
        />
      </div>
    </main>
  );
}
export default Landing2;
