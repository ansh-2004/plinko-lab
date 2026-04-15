export default function Ball({ position }) {
  return (
    <div
      className="w-4 h-4 bg-red-500 rounded-full absolute transition-all duration-300 ease-in-out"
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}
    />
  );
}