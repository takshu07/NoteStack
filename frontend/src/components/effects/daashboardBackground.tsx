import Antigravity from "./antiGravity";
const DashboardBackground = () => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-30">
      <Antigravity
        count={250}
        color="#9ca3af"
        particleSize={1.2}
        autoAnimate
      />
    </div>
  );
};

export default DashboardBackground;
