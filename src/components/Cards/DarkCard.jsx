import React from "react";

const DarkCard = ({ title, description, imageSrc, alt }) => (
  <div className="bg-black/80 border-l-4 border-blue-500 rounded-xl shadow-lg max-w-3xl mx-auto mb-6 overflow-hidden">
    <div className="p-6">
      <h2 className="text-2xl font-bold text-white">{title}</h2>
      <p className="text-gray-400 mt-2">{description}</p>
    </div>
    {imageSrc && (
      <div className="rounded-b-xl overflow-hidden border-t border-gray-800">
        <img src={imageSrc} alt={alt || "Card visual"} className="w-full" />
      </div>
    )}
  </div>
);

export default DarkCard;
