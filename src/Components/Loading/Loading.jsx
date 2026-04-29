import whiteBrain from "../../Assets/Images/whiteBrain.png";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center main">
      {/* Pulse rings */}
      <div className="relative flex items-center justify-center mb-6">
        <span className="absolute w-32 h-32 rounded-full bg-white/10 animate-ping" />
        <span className="absolute w-24 h-24 rounded-full bg-white/15 animate-ping [animation-delay:0.3s]" />
        <img
          src={whiteBrain}
          alt="Loading"
          className="relative w-20 h-auto animate-bounce z-10 drop-shadow-xl"
        />
      </div>
    </div>
  );
}
