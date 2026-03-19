import React, { useState } from 'react';
import { Layout, Menu, Button, theme } from 'antd';
import {
  DashboardOutlined,
  UserOutlined,
  CalendarOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  MedicineBoxOutlined
} from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';

const { Header, Sider, Content } = Layout;

const HospitalLogo = ({ compact = false }) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: compact ? 0 : 12,
      width: '100%',
      justifyContent: compact ? 'center' : 'flex-start',
    }}
  >
    <div
      style={{
        width: 40,
        height: 40,
        borderRadius: 12,
        background: 'linear-gradient(135deg, #0f766e 0%, #14b8a6 100%)',
        display: 'grid',
        placeItems: 'center',
        boxShadow: '0 10px 24px rgba(15, 118, 110, 0.25)',
        flexShrink: 0,
      }}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M10.5 5.25C10.5 4.42157 11.1716 3.75 12 3.75C12.8284 3.75 13.5 4.42157 13.5 5.25V10.5H18.75C19.5784 10.5 20.25 11.1716 20.25 12C20.25 12.8284 19.5784 13.5 18.75 13.5H13.5V18.75C13.5 19.5784 12.8284 20.25 12 20.25C11.1716 20.25 10.5 19.5784 10.5 18.75V13.5H5.25C4.42157 13.5 3.75 12.8284 3.75 12C3.75 11.1716 4.42157 10.5 5.25 10.5H10.5V5.25Z"
          fill="#ffffff"
        />
      </svg>
    </div>
    {!compact && (
      <div style={{ color: 'white', lineHeight: 1.1 }}>
        <div style={{ fontSize: 15, fontWeight: 700, letterSpacing: 0.4 }}>
          Hospital Central
        </div>
        <div style={{ fontSize: 11, opacity: 0.8 }}>Atencion y Gestion Clinica</div>
      </div>
    )}
  </div>
);

const MainLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Esto es para que el tema de AnTD se adapte si activas el alto contraste
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const menuItems = [
    {
      key: '/',
      icon: <DashboardOutlined />,
      label: 'Dashboard',
    },
    {
      key: '/pacientes',
      icon: <UserOutlined />,
      label: 'Pacientes',
    },
    {
      key: '/citas',
      icon: <CalendarOutlined />,
      label: 'Citas Médicas',
    },
  ];

  return (
    <Layout className="hospital-layout" style={{ minHeight: '100vh' }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        breakpoint="lg"
        className="hospital-sider"
        style={{ background: 'linear-gradient(180deg, #0f172a 0%, #134e4a 100%)' }}
      >
        <div
          style={{
            minHeight: 72,
            margin: 16,
            padding: collapsed ? '12px 0' : '12px 14px',
            background: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: 16,
          display: 'flex',
          alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: 'blur(8px)',
          }}
        >
          <HospitalLogo compact={collapsed} />
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={({ key }) => navigate(key)}
          style={{ background: 'transparent' }}
        />
      </Sider>
      <Layout>
        <Header
          className="hospital-header"
          style={{
            padding: '0 24px 0 0',
            background: colorBgContainer,
            display: 'flex',
            alignItems: 'center',
            gap: 16,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ fontSize: '16px', width: 64, height: 64 }}
          />
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1 }}>
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: 12,
                background: '#e6fffb',
                display: 'grid',
                placeItems: 'center',
              }}
            >
              <MedicineBoxOutlined style={{ fontSize: 20, color: '#0f766e' }} />
            </div>
            <div>
              <h2 style={{ margin: 0, fontSize: 24 }}>Sistema de Gestion Hospitalaria</h2>
            </div>
          </div>
          <div
            style={{
              padding: '8px 14px',
              borderRadius: 999,
              background: '#ecfeff',
              color: '#0f766e',
              fontWeight: 600,
              fontSize: 12,
            }}
          >
            Hospital activo
          </div>
        </Header>
        <Content
          className="hospital-content"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            overflow: 'initial'
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
