import GhostCursor from "./ghostCursor";
{/* BACKGROUND LAYER */}
{/* BACKGROUND */}
<div className="absolute inset-0 h-screen w-full z-0 pointer-events-none">
  <GhostCursor
    trailLength={140}
    color="#ffffff"
    brightness={2.2}
    bloomStrength={0.45}
    bloomRadius={1.1}
    bloomThreshold={0.015}
    edgeIntensity={0.3}
  />
</div>

