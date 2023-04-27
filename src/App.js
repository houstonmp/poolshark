import { useState, useCallback } from "react";
import "./styles.css";
import GameComponent from "./components/GameComponent";
import Navbar from "./components/Navbar";
import Particles from "react-particles";
import { loadFull } from "tsparticles";
import BottomImage from "./components/BottomImage";
import Modal from "./components/UI/Modal";

export default function App() {
  const [isParticles, setParticles] = useState(true);
  const particlesInit = useCallback(async (engine) => {
    console.log(engine);
    // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    await console.log(container);
  }, []);

  return (
    <div className="App">
      <Navbar />
      <h1>Tic-Tac-Toe</h1>
      <GameComponent></GameComponent>
      {isParticles && (
        <Particles
          id="tsparticles"
          init={particlesInit}
          loaded={particlesLoaded}
          options={{
            fpsLimit: 120,
            interactivity: {
              events: {
                onHover: {
                  enable: true,
                  mode: "repulse",
                },
                resize: true,
              },
              modes: {
                push: {
                  quantity: 4,
                },
                repulse: {
                  distance: 100,
                  duration: 0.4,
                },
              },
            },
            particles: {
              color: [
                "#FDB515",
                "#D9661F",
                "#EE1F60",
                "#ED4E33",
                "#00B0DA",
                "#00A598",
                "#CFDD45",
                "#B9D3B6",
              ],
              collisions: {
                enable: false,
              },
              move: {
                directions: "top",
                enable: true,
                out_Mode: "out",
                bounce: false,

                random: false,
                speed: 1,
                straight: false,
                attract: {
                  enable: false,
                  rotateX: 600,
                  rotateY: 1200,
                },
              },
              number: {
                density: {
                  enable: true,
                  area: 800,
                },
                value: 60,
              },
              opacity: {
                value: 0.2,
                random: true,
                anim: {
                  enable: false,
                  speed: 1,
                  opacity_min: 0.05,
                  sync: false,
                },
              },
              shape: {
                type: "circle",
              },
              size: {
                value: { min: 0.5, max: 10 },
              },
            },
            detectRetina: true,
          }}
        />
      )}
    </div>
  );
}
