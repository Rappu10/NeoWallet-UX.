import React, { createContext, useState, useContext } from 'react';
import { ConfigProvider, theme } from 'antd';

const AccessibilityContext = createContext();

export const AccessibilityProvider = ({ children }) => {
  const [fontSize, setFontSize] = useState(16);
  const [visualMode, setVisualMode] = useState('normal');

  const cycleVisualMode = () => {
    setVisualMode((prev) => {
      if (prev === 'normal') return 'high-contrast';
      if (prev === 'high-contrast') return 'mono';
      return 'normal';
    });
  };
  const increaseText = () => setFontSize(prev => Math.min(prev + 2, 24));
  const resetText = () => {
    setFontSize(16);
    setVisualMode('normal');
  };

  const isHighContrast = visualMode === 'high-contrast';
  const isMono = visualMode === 'mono';

  const themeConfig = {
    algorithm: isHighContrast ? theme.darkAlgorithm : theme.defaultAlgorithm,
    token: {
      fontSize: fontSize,
      colorPrimary: isHighContrast ? '#fadb14' : isMono ? '#595959' : '#14b8a6',
      colorInfo: isHighContrast ? '#fadb14' : isMono ? '#595959' : '#14b8a6',
      borderRadius: 18,
      colorBgContainer: isHighContrast
        ? '#000000'
        : isMono
          ? 'rgba(245, 245, 245, 0.92)'
          : 'rgba(255, 255, 255, 0.72)',
      colorText: isHighContrast ? '#ffffff' : isMono ? '#1f1f1f' : undefined,
    },
  };

  return (
    <AccessibilityContext.Provider
      value={{ fontSize, visualMode, cycleVisualMode, increaseText, resetText }}
    >
      <ConfigProvider theme={themeConfig}>
        <div
          className={`accessibility-mode accessibility-mode-${visualMode}`}
          style={{
            fontSize: `${fontSize}px`,
            minHeight: '100vh',
            filter: isMono ? 'grayscale(1)' : 'none',
            background: isHighContrast ? '#000000' : 'transparent',
            color: isHighContrast ? '#ffffff' : 'inherit',
          }}
        >
          {children}
        </div>
      </ConfigProvider>
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => useContext(AccessibilityContext);
