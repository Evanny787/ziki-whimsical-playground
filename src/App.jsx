
import { useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls, RoundedBox, Stars } from "@react-three/drei";
import { Bot, Sparkles, Rocket, Zap, CircleCheck, ArrowUpRight, Play, Heart, Trophy } from "lucide-react";
import * as THREE from "three";
import "./App.css";

function Robot({ color = "#a78bfa", position = [0, 0, 0], scale = 1 }) {
  const robot = useState(() => new THREE.Group())[0];

  useFrame(({ clock, pointer }) => {
    robot.position.y = Math.sin(clock.elapsedTime * 1.5) * 0.12;
    robot.rotation.y = Math.sin(clock.elapsedTime * 0.5) * 0.25 + pointer.x * 0.25;
    robot.rotation.x = pointer.y * 0.12;
  });

  return (
    <group ref={(node) => { if (node && robot.parent !== node.parent) node.add(robot); }} position={position} scale={scale}>
      <group>
        <Float speed={2} rotationIntensity={0.15} floatIntensity={0.4}>
          <RoundedBox args={[1.1, 0.9, 0.7]} radius={0.22} smoothness={4}>
            <meshStandardMaterial color={color} metalness={0.25} roughness={0.28} />
          </RoundedBox>
          <mesh position={[-0.23, 0.12, 0.365]}>
            <sphereGeometry args={[0.075, 24, 24]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
          <mesh position={[0.23, 0.12, 0.365]}>
            <sphereGeometry args={[0.075, 24, 24]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
          <mesh position={[0, -0.12, 0.37]}>
            <boxGeometry args={[0.24, 0.045, 0.025]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
          <mesh position={[0, 0.55, 0]}>
            <cylinderGeometry args={[0.035, 0.035, 0.22, 12]} />
            <meshStandardMaterial color="#d8b4fe" />
          </mesh>
          <mesh position={[0, 0.68, 0]}>
            <sphereGeometry args={[0.09, 20, 20]} />
            <meshStandardMaterial color="#f0abfc" emissive="#c026d3" emissiveIntensity={1.8} />
          </mesh>
          <mesh position={[-0.65, -0.1, 0]}>
            <sphereGeometry args={[0.16, 20, 20]} />
            <meshStandardMaterial color={color} />
          </mesh>
          <mesh position={[0.65, -0.1, 0]}>
            <sphereGeometry args={[0.16, 20, 20]} />
            <meshStandardMaterial color={color} />
          </mesh>
        </Float>
      </group>
    </group>
  );
}

function SpaceScene() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
      <ambientLight intensity={1.7} />
      <pointLight position={[3, 3, 5]} intensity={35} color="#c4b5fd" />
      <pointLight position={[-3, -2, 4]} intensity={20} color="#67e8f9" />
      <Stars radius={35} depth={20} count={700} factor={2} fade speed={1} />
      <Robot color="#a78bfa" position={[0, 0, 0]} scale={1.15} />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.8} />
    </Canvas>
  );
}

const missions = [
  { icon: Rocket, title: "Launch a mission", detail: "Give your agent a new challenge", color: "purple", points: "+50 XP" },
  { icon: Zap, title: "Speed run", detail: "Solve a task in record time", color: "cyan", points: "+30 XP" },
  { icon: Heart, title: "Human connection", detail: "Review an agent's work together", color: "pink", points: "+40 XP" },
];

function App() {
  const [activeMission, setActiveMission] = useState(null);
  const [completed, setCompleted] = useState([]);
  const [showToast, setShowToast] = useState(false);

  function launchMission(index) {
    setActiveMission(index);
    setShowToast(false);
  }

  function completeMission() {
    if (activeMission === null) return;
    if (!completed.includes(activeMission)) {
      setCompleted([...completed, activeMission]);
    }
    setShowToast(true);
  }

  return (
    <main className="app-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <nav className="topbar">
        <a className="brand" href="#home"><span className="brand-icon"><Bot size={22} /></span> ziki<span className="brand-dot">.</span><span className="brand-lab">PLAYGROUND</span></a>
        <div className="nav-links"><a href="#missions">Missions</a><a href="#agents">Your agents</a><a href="#about">About</a></div>
        <div className="profile"><span className="online-dot" /> <span>Human explorer</span><span className="avatar">H</span></div>
      </nav>

      <section className="hero" id="home">
        <div className="hero-copy">
          <div className="eyebrow"><Sparkles size={15} /> A LITTLE MORE MAGIC, A LOT MORE HUMAN</div>
          <h1>Big ideas.<br />Tiny <span className="gradient-text">robots.</span><br /><span className="outline-text">Infinite</span> possibilities.</h1>
          <p className="hero-description">Meet your AI teammates, send them on adventures, and make incredible things happen — together.</p>
          <div className="hero-actions"><a href="#missions" className="primary-button">Explore missions <ArrowUpRight size={17} /></a><a href="#agents" className="secondary-button"><Play size={15} /> Meet your agent</a></div>
          <div className="social-proof"><div className="mini-avatars"><span>🤖</span><span>👾</span><span>✨</span></div><span><strong>1,284</strong> little missions launched today</span></div>
        </div>
        <div className="hero-visual" id="agents">
          <div className="visual-glow" />
          <div className="orbit orbit-one" /><div className="orbit orbit-two" />
          <div className="floating-label label-top"><Sparkles size={14} /> curious by design</div>
          <div className="robot-stage"><SpaceScene /></div>
          <div className="floating-label label-bottom"><span className="online-dot" /> Nova is dreaming up ideas</div>
          <span className="sparkle sparkle-a">✦</span><span className="sparkle sparkle-b">✧</span><span className="sparkle sparkle-c">✳</span>
        </div>
      </section>

      <section className="stats-strip">
        <div><span className="stat-icon purple-stat"><Bot size={19} /></span><div><strong>12</strong><small>Friendly agents</small></div></div>
        <div><span className="stat-icon cyan-stat"><CircleCheck size={19} /></span><div><strong>{completed.length}</strong><small>Missions completed</small></div></div>
        <div><span className="stat-icon pink-stat"><Trophy size={19} /></span><div><strong>{completed.length * 50}</strong><small>XP earned</small></div></div>
        <div className="status-note"><span className="online-dot" /> All systems feeling good</div>
      </section>

      <section className="missions-section" id="missions">
        <div className="section-heading"><div><div className="eyebrow"><Sparkles size={14} /> YOUR NEXT ADVENTURE</div><h2>Pick a little <span className="gradient-text">mission.</span></h2><p>Small steps. Big energy. Your agent is ready when you are.</p></div><div className="mission-counter">{completed.length} / {missions.length} completed</div></div>
        <div className="mission-grid">
          {missions.map((mission, index) => {
            const Icon = mission.icon;
            const isDone = completed.includes(index);
            return <article className={`mission-card ${mission.color} ${activeMission === index ? "selected" : ""}`} key={mission.title}>
              <div className="card-top"><span className="mission-icon"><Icon size={22} /></span><span className="xp-pill">{isDone ? "✓ Done!" : mission.points}</span></div>
              <h3>{mission.title}</h3><p>{mission.detail}</p>
              <button className="mission-button" onClick={() => launchMission(index)}>{isDone ? "Play again" : "Let's go"} <ArrowUpRight size={16} /></button>
              {isDone && <div className="completed-ribbon"><CircleCheck size={14} /> Completed</div>}
            </article>;
          })}
        </div>
      </section>

      <section className="bottom-banner" id="about"><div className="banner-sparkle"><Sparkles size={25} /></div><div><h3>Humans and agents. Better together.</h3><p>The best things happen when curiosity meets collaboration.</p></div><a href="#missions">Make some magic <ArrowUpRight size={16} /></a></section>
      <footer><a className="brand footer-brand" href="#home"><span className="brand-icon"><Bot size={18} /></span> ziki<span className="brand-dot">.</span></a><span>Made with curiosity & a little bit of magic ✨</span><span>PLAY NICE. BUILD BIG.</span></footer>

      {activeMission !== null && <div className="modal-backdrop" onClick={() => setActiveMission(null)}><section className="mission-modal" onClick={e => e.stopPropagation()}><button className="modal-close" onClick={() => setActiveMission(null)}>×</button><div className={`modal-icon ${missions[activeMission].color}`}><Sparkles size={26} /></div><div className="eyebrow">MISSION BRIEFING · #{activeMission + 1}</div><h2>{missions[activeMission].title}</h2><p>{missions[activeMission].detail}. Work with Nova to make it happen. Ready to give it a try?</p><div className="briefing-agent"><div className="briefing-robot">🤖</div><div><strong>Nova</strong><small>AI teammate · Excited to help</small></div><span className="online-dot" /></div><button className="primary-button modal-launch" onClick={completeMission}>{completed.includes(activeMission) ? "Mission already completed" : "Complete mission"} <Sparkles size={17} /></button>{showToast && <p className="success-message">🎉 Mission complete! You and Nova make a great team.</p>}</section></div>}
    </main>
  );
}

export default App;
