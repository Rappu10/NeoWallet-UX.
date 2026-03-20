import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Statistic, Table, Tag, Spin } from 'antd';
import {
  UserOutlined,
  CalendarOutlined,
  MedicineBoxOutlined,
  RiseOutlined,
  HeartOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';
import { Column } from '@ant-design/plots';
import axios from 'axios';

const Dashboard = () => {
  const [data, setData] = useState({ pacientes: [], citas: [], medicos: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      axios.get('http://localhost:4000/pacientes'),
      axios.get('http://localhost:4000/citas'),
      axios.get('http://localhost:4000/medicos')
    ]).then(([pac, cit, med]) => {
      setData({ pacientes: pac.data, citas: cit.data, medicos: med.data });
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  // CONFIGURACIÓN CORREGIDA (Quitamos 'middle' que causaba el error)
  const configGrafica = {
    data: data.medicos.map(m => ({
      especialidad: m.especialidad,
      cantidad: Math.floor(Math.random() * 10) + 1 
    })),
    xField: 'especialidad',
    yField: 'cantidad',
    colorField: 'especialidad', // Le da colores distintos a las barras
    label: {
      text: (d) => d.cantidad,
      style: {
        fill: '#fff',
        opacity: 0.8,
      },
    },
  };

  const columnsCitas = [
    { title: 'Paciente ID', dataIndex: 'pacienteId', key: 'pacienteId' },
    { title: 'Fecha', dataIndex: 'fecha', key: 'fecha' },
    { title: 'Hora', dataIndex: 'hora', key: 'hora' },
    { title: 'Estado', key: 'status', render: () => <Tag color="blue">Agendada</Tag> }
  ];

  if (loading) return <Spin size="large" style={{ display: 'block', margin: '100px auto' }} />;

  const citasHoy = data.citas.length;
  const eficienciaOperativa = data.medicos.length ? Math.min(98, 72 + data.medicos.length * 3) : 72;
  const respuestaPromedio = data.citas.length ? Math.max(4, 18 - data.citas.length) : 12;

  return (
    <div className="page-shell">
      <section className="hero-panel">
        <div>
          <span className="eyebrow">Centro de monitoreo</span>
          <h1 className="hero-title">Panel hospitalario con vista operacional en tiempo real</h1>
          <p className="hero-copy">
            Supervisa pacientes, agenda medica y capacidad clinica desde una interfaz
            mas limpia, tecnica y enfocada en decisiones rapidas.
          </p>
          <div className="hero-tags">
            <span className="status-pill">
              <CheckCircleOutlined /> Sistema estable
            </span>
            <span className="status-pill">
              <HeartOutlined /> Flujo asistencial activo
            </span>
          </div>
        </div>
        <div className="hero-grid">
          <div className="hero-metric">
            <span>Respuesta promedio</span>
            <strong>{respuestaPromedio} min</strong>
          </div>
          <div className="hero-metric">
            <span>Eficiencia operativa</span>
            <strong>{eficienciaOperativa}%</strong>
          </div>
          <div className="hero-metric hero-metric-wide">
            <span>Citas monitoreadas hoy</span>
            <strong>{citasHoy}</strong>
          </div>
        </div>
      </section>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={8}>
          <Card variant="borderless" hoverable className="glass-card stat-card stat-card-positive">
            <Statistic 
              title="Pacientes Registrados" 
              value={data.pacientes.length} 
              prefix={<UserOutlined />} 
              suffix={<span className="stat-suffix"><RiseOutlined /> 12%</span>}
              styles={{ content: { color: '#d1fae5' }, title: { color: '#9fb0c7' } }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card variant="borderless" hoverable className="glass-card stat-card stat-card-info">
            <Statistic 
              title="Citas Totales" 
              value={data.citas.length} 
              prefix={<CalendarOutlined />} 
              suffix={<span className="stat-suffix"><RiseOutlined /> 8%</span>}
              styles={{ content: { color: '#dbeafe' }, title: { color: '#9fb0c7' } }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card variant="borderless" hoverable className="glass-card stat-card stat-card-accent">
            <Statistic 
              title="Personal Médico" 
              value={data.medicos.length} 
              prefix={<MedicineBoxOutlined />} 
              suffix={<span className="stat-suffix">Red activa</span>}
              styles={{ content: { color: '#ccfbf1' }, title: { color: '#9fb0c7' } }}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: '24px' }}>
        <Col xs={24} lg={12}>
          <Card title="Carga por Especialidad" className="glass-card surface-card">
            <div className="chart-shell">
              <Column {...configGrafica} />
            </div>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="Ultimas Citas" className="glass-card surface-card">
            <Table 
              className="hospital-table"
              dataSource={data.citas.slice(0, 5)} 
              columns={columnsCitas} 
              pagination={false} 
              rowKey="id"
              scroll={{ x: 640 }}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
