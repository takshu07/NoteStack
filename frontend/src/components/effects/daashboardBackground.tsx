import GhostCursor from "./ghostCursor";
const DashboardBackground = () => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-30">
     <GhostCursor
  trailLength={250}      // ← replaces count
  color="#9ca3af"
  brightness={1}
  grainIntensity={0.05}
  bloomStrength={0.1}
  bloomRadius={1.0}
  bloomThreshold={0.025}
/>

    </div>
  );
};

export default  DashboardBackground ;
