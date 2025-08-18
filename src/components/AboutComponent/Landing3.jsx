import React from "react";
import DarkCard from "../Cards/DarkCard";
import Logo from "../../assets/logo";
function Landing3() {
  const features = [
    {
      title: "Visual Projects",
      description:
        "Showcase your best creative work in a stunning, scrollable gallery",
      imageSrc: `${Logo.image8}`,
      alt: "Visual gallery of creative work",
    },
    {
      title: "Project Showcasing",
      description:
        "Highlight your latest projects with detailed case studies and behind-the-scenes insights",
      imageSrc: `${Logo.image5}`,
      alt: "Project case studies",
    },
    {
      title: "Community Chatrooms",
      description:
        "Connect, collaborate, and chat in real-time with like-minded creators.",
      imageSrc: `${Logo.image7}`,
      alt: "Chat interface",
    },
    {
      title: "Search & Discover",
      description:
        "Explore trending work, rising talent, and hidden gems through powerful discovery tools.",
      imageSrc: `${Logo.image8}`,
      alt: "Search feed",
    },
    {
      title: "Public Profiles",
      description:
        "Build a personal brand with a customizable profile that tells your creative story.",
      imageSrc: `${Logo.image8}`,
      alt: "User profile",
    },
  ];

  return (
    <main className="py-12 bg-gradient-to-b from-black/80 to-[#18181b]">
      <h1 className="text-3xl font-bold text-center mb-10 text-white">
        Key Features
      </h1>
      <div className="flex flex-col gap-6 items-center">
        {features.map((f, i) => (
          <DarkCard key={f.title} {...f} />
        ))}
      </div>
    </main>
  );
}
export default Landing3;
