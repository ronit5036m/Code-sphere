import React from "react";

const steps = [
  "Signup",
  "Setup Projects",
  "Upload projects",
  "Explore developers",
  "Chat and collaborate",
];

const Landing4 = () => (
  <div className="bg-black/90 text-gray-200 min-h-screen px-6 py-12">
    {/* How Developers Use CodeSphere */}
    <section className="max-w-4xl mx-auto mb-16">
      <h2 className="text-3xl font-bold mb-4 text-white">
        How Developers Use CodeSphere
      </h2>
      <h3 className="text-xl mb-4 text-blue-400">Step-by-step Experience:</h3>
      <ol className="list-decimal list-inside space-y-2 text-lg">
        {steps.map((step, i) => (
          <li key={i}>{step}</li>
        ))}
      </ol>
    </section>
    {/* Live Preview */}
    <section className="max-w-4xl mx-auto mb-16">
      <h2 className="text-3xl font-bold mb-4 text-white">
        Live Preview of CodeSphere in Action
      </h2>
      <p className="text-lg mb-6 text-gray-400">
        Experience CodeSphere through real developer profiles, an interactive
        project carousel, or a video walkthrough.
      </p>
      <div className="border-2 border-dashed border-blue-400 p-10 text-center italic rounded-lg text-gray-400">
        [ Live demo / video / carousel goes here ]
      </div>
    </section>
    {/* Testimonials */}
    <section className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-white">Developer Voices</h2>
      <blockquote className="border-l-4 border-blue-400 pl-4 text-lg italic text-gray-300">
        "I finally have a place to showcase my work."
        <footer className="mt-2 font-semibold text-blue-300">
          – Aritra, Web Dev
        </footer>
      </blockquote>
    </section>
  </div>
);
export default Landing4;
