import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Select, DatePicker, Card, message, Tag } from 'antd';
import { CalendarOutlined, PlusOutlined, ClockCircleOutlined, AlertOutlined } from '@ant-design/icons';
import axios from 'axios';

const Citas = () => {
  const [citas, setCitas] = useState([]);
  const [pacientes, setPacientes] = useState([]);
  const [medicos, setMedicos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [form] = Form.useForm();

  // Traer toda la información necesaria
  const fetchData = async () => {
    setLoading(true);
    try {
      const [cit, pac, med] = await Promise.all([
        axios.get('http://localhost:4000/citas'),
        axios.get('http://localhost:4000/pacientes'),
        axios.get('http://localhost:4000/medicos')
      ]);
      setCitas(cit.data);
      setPacientes(pac.data);
      setMedicos(med.data);
    } catch (error) {
      message.error("Error al cargar los datos");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Guardar nueva cita
  const handleAddCita = async (values) => {
    try {
      const nuevaCita = {
        pacienteId: values.pacienteId,
        medicoId: values.medicoId,
        // Extraemos fecha y hora del DatePicker de Ant Design
        fecha: values.fecha.format('YYYY-MM-DD'),
        hora: values.fecha.format('HH:mm')
      };
      await axios.post('http://localhost:4000/citas', nuevaCita);
      message.success("Cita agendada correctamente");
      setIsModalOpen(false);
      form.resetFields();
      fetchData(); // Recargar la tabla
    } catch (error) {
      message.error("Error al agendar la cita");
    }
  };

  const columns = [
    { 
      title: 'Paciente', 
      dataIndex: 'pacienteId', 
      render: (id) => pacientes.find(p => p.id === id)?.nombre || `ID Desconocido` 
    },
    { 
      title: 'Médico', 
      dataIndex: 'medicoId', 
      render: (id) => medicos.find(m => m.id === id)?.nombre || `ID Desconocido` 
    },
    { title: 'Fecha', dataIndex: 'fecha' },
    { title: 'Hora', dataIndex: 'hora' },
    { title: 'Estado', render: () => <Tag color="blue">Agendada</Tag> }
  ];

  const citasProgramadas = citas.length;
  const medicosActivos = medicos.length;

  return (
    <Card
      className="glass-card surface-card"
      title={
        <div className="section-title">
          <span className="section-icon"><CalendarOutlined /></span>
          <div>
            <strong>Agenda de Citas Medicas</strong>
            <div className="section-subtitle">Programacion clinica con trazabilidad rapida</div>
          </div>
        </div>
      }
      extra={
        <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalOpen(true)}>
          Agendar Cita
        </Button>
      }
    >
      <div className="section-banner">
        <span><ClockCircleOutlined /> {citasProgramadas} citas en seguimiento</span>
        <span><AlertOutlined /> {medicosActivos} medicos disponibles</span>
      </div>
      <Table 
        className="hospital-table"
        dataSource={citas} 
        columns={columns} 
        rowKey="id" 
        loading={loading}
        pagination={{ pageSize: 5 }}
      />

      <Modal
        className="hospital-modal"
        title="Agendar Nueva Cita" 
        open={isModalOpen} 
        onCancel={() => setIsModalOpen(false)} 
        onOk={() => form.submit()}
        okText="Guardar"
        cancelText="Cancelar"
      >
        <Form form={form} layout="vertical" onFinish={handleAddCita}>
          <Form.Item name="pacienteId" label="Seleccionar Paciente" rules={[{ required: true, message: 'Selecciona un paciente' }]}>
            <Select 
              showSearch 
              placeholder="Busca un paciente"
              options={pacientes.map(p => ({ label: p.nombre, value: p.id }))} 
            />
          </Form.Item>
          <Form.Item name="medicoId" label="Seleccionar Médico" rules={[{ required: true, message: 'Selecciona un médico' }]}>
            <Select 
              showSearch 
              placeholder="Busca un médico"
              options={medicos.map(m => ({ label: `${m.nombre} - ${m.especialidad}`, value: m.id }))} 
            />
          </Form.Item>
          <Form.Item name="fecha" label="Fecha y Hora" rules={[{ required: true, message: 'Selecciona fecha y hora' }]}>
            <DatePicker showTime style={{ width: '100%' }} format="YYYY-MM-DD HH:mm" />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default Citas;
