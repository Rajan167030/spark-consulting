import type { CSSProperties, FC } from "react";
import { useMemo } from "react";
import "./Beams.css";

interface BeamsProps {
  beamWidth?: number;
  beamHeight?: number;
  beamNumber?: number;
  lightColor?: string;
  speed?: number;
  noiseIntensity?: number;
  scale?: number;
  rotation?: number;
  backgroundColor?: string;
}

const Beams: FC<BeamsProps> = ({
  beamWidth = 3,
  beamHeight = 30,
  beamNumber = 20,
  lightColor = "#ffffff",
  speed = 2,
  noiseIntensity = 1.75,
  scale = 0.2,
  rotation = 30,
  backgroundColor = "#020617",
}) => {
  const beamItems = useMemo(
    () =>
      Array.from({ length: beamNumber }, (_, index) => {
        const left = (index / beamNumber) * 120 - 10;
        const delay = (index * 0.85) % 10;
        const durationOffset = (index % 5) * 0.35;
        const opacity = 0.25 + ((index * 11) % 9) / 18;
        return { left, delay, durationOffset, opacity };
      }),
    [beamNumber],
  );

  const duration = Math.max(6, 20 / Math.max(speed, 0.1));
  const blur = Math.max(0.5, noiseIntensity * 0.55);

  return (
    <div className="beams-container" style={{ backgroundColor }}>
      <div
        className="beams-track"
        style={{
          transform: `rotate(${rotation}deg) scale(${1 + scale})`,
        }}
      >
        {beamItems.map((beam, index) => (
          <span
            key={`${beam.left}-${index}`}
            className="beams-line"
            style={
              {
                left: `${beam.left}%`,
                width: `${beamWidth}px`,
                height: `${beamHeight}rem`,
                opacity: beam.opacity,
                filter: `blur(${blur}px)`,
                animationDuration: `${duration + beam.durationOffset}s`,
                animationDelay: `-${beam.delay}s`,
                background: `linear-gradient(180deg, transparent 0%, ${lightColor} 30%, ${lightColor} 68%, transparent 100%)`,
              } as CSSProperties
            }
          />
        ))}
      </div>
      <div className="beams-vignette" />
    </div>
  );
};

export default Beams;
