import React from 'react';
import { FloatButton } from 'antd';
import { 
  FontSizeOutlined, 
  BgColorsOutlined, 
  ReloadOutlined,
  SettingOutlined,
  EyeOutlined,
} from '@ant-design/icons';
import { useAccessibility } from '../context/AccessibilityContext';

const FloatAccessibility = () => {
  const { increaseText, cycleVisualMode, resetText, visualMode } = useAccessibility();

  const modeLabel = {
    normal: 'Modo normal',
    'high-contrast': 'Alto contraste',
    mono: 'Modo monocromatico',
  };

  return (
    <FloatButton.Group
      trigger="click"
      type="primary"
      style={{ right: 24, bottom: 24 }}
      icon={<SettingOutlined />}
      tooltip={<div>Opciones de Accesibilidad</div>}
    >
      <FloatButton 
        icon={<FontSizeOutlined />} 
        tooltip={<div>Aumentar Tamaño de Texto</div>} 
        onClick={increaseText} 
      />
      <FloatButton 
        icon={visualMode === 'mono' ? <EyeOutlined /> : <BgColorsOutlined />}
        tooltip={<div>{`Cambiar vista: ${modeLabel[visualMode]}`}</div>}
        onClick={cycleVisualMode}
      />
      <FloatButton 
        icon={<ReloadOutlined />} 
        tooltip={<div>Restablecer Ajustes</div>} 
        onClick={resetText} 
      />
    </FloatButton.Group>
  );
};

export default FloatAccessibility;
