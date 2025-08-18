
const Card = ({ title, content, imageUrl, footer }) => (
  <div className="bg-gradient-to-b from-[#18181b] to-[#23272f] border border-gray-800 rounded-2xl shadow-2xl overflow-hidden w-[320px] hover:scale-[1.03] hover:shadow-blue-500/20 transition-all duration-300">
    {imageUrl && (
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-44 object-cover bg-black"
      />
    )}
    <div className="p-5">
      <h3 className="text-xl font-bold text-white mb-1">{title}</h3>
      <p className="text-gray-300 text-base mb-2">{content}</p>
    </div>
    {footer && (
      <div className="px-5 py-3 bg-black/60 border-t border-gray-800 text-gray-400 text-xs">
        {footer}
      </div>
    )}
  </div>
);

export default Card;
