import React from 'react';
import ReactDOM from 'react-dom/client';
import { ShaderGradientCanvas, ShaderGradient } from 'shadergradient';

function App() {
  return (
    <ShaderGradientCanvas
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 0
      }}
      pixelDensity={1}
      fov={45}
    >
      <ShaderGradient
        control='props'
        type='waterPlane'
        animate='on'
        uSpeed={0.25}
        uStrength={1.8}
        uDensity={1.2}
        uFrequency={4.5}
        uAmplitude={2.5}
        color1='#090B10'
        color2='#1E293B'
        color3='#D97706'
        reflection={0.1}
        lightType='3d'
        brightness={1.1}
        grain='on'
        grainBlending={0.6}
        cDistance={32}
        cPolarAngle={115}
        cAzimuthAngle={180}
      />
    </ShaderGradientCanvas>
  );
}

const mountEl = document.getElementById('shadergradient-root');
if (mountEl) {
  const root = ReactDOM.createRoot(mountEl);
  root.render(<App />);
}

window.ShaderGradientMount = {
  renderTo: (targetEl, props = {}) => {
    const root = ReactDOM.createRoot(targetEl);
    root.render(
      <ShaderGradientCanvas
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none'
        }}
        pixelDensity={1}
        fov={45}
      >
        <ShaderGradient
          control='props'
          type='waterPlane'
          animate='on'
          uSpeed={props.speed || 0.25}
          uStrength={props.strength || 1.8}
          uDensity={props.density || 1.2}
          uFrequency={props.frequency || 4.5}
          uAmplitude={props.amplitude || 2.5}
          color1={props.color1 || '#090B10'}
          color2={props.color2 || '#1E293B'}
          color3={props.color3 || '#D97706'}
          reflection={0.1}
          lightType='3d'
          brightness={1.1}
          grain='on'
          grainBlending={0.6}
          cDistance={32}
          cPolarAngle={115}
          cAzimuthAngle={180}
        />
      </ShaderGradientCanvas>
    );
    return root;
  }
};
