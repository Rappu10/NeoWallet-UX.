import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, InputNumber, Space, Card, message, Popconfirm } from 'antd';
import { UserAddOutlined, DeleteOutlined, UserOutlined, SafetyCertificateOutlined } from '@ant-design/icons';
import axios from 'axios';

const Pacientes = () => {
  const [pacientes, setPacientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  // 1. Cargar pacientes de db.json
  const fetchPacientes = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:4000/pacientes');
      setPacientes(res.data);
    } catch (error) {
      message.error("Error al conectar con la API");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPacientes();
  }, []);

  // 2. Función para Agregar Paciente (POST)
  const handleAdd = async (values) => {
    try {
      await axios.post('http://localhost:4000/pacientes', values);
      message.success("Paciente registrado correctamente");
      setIsModalOpen(false);
      form.resetFields();
      fetchPacientes(); // Recargamos la tabla
    } catch (error) {
      message.error("No se pudo guardar el paciente");
    }
  };

  // 3. Función para Eliminar (DELETE)
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/pacientes/${id}`);
      message.success("Registro eliminado");
      fetchPacientes();
    } catch (error) {
      message.error("Error al eliminar");
    }
  };

  const columns = [
    { title: 'Nombre Completo', dataIndex: 'nombre', key: 'nombre', sorter: (a, b) => a.nombre.localeCompare(b.nombre) },
    { title: 'Edad', dataIndex: 'edad', key: 'edad' },
    { title: 'CURP', dataIndex: 'curp', key: 'curp' },
    { title: 'Tipo de Sangre', dataIndex: 'sangre', key: 'sangre', render: (text) => <b>{text}</b> },
    {
      title: 'Acciones',
      key: 'actions',
      render: (_, record) => (
        <Popconfirm title="¿Eliminar paciente?" onConfirm={() => handleDelete(record.id)}>
          <Button type="link" danger icon={<DeleteOutlined />} />
        </Popconfirm>
      ),
    },
  ];

  const promedioEdad = pacientes.length
    ? Math.round(pacientes.reduce((acc, paciente) => acc + paciente.edad, 0) / pacientes.length)
    : 0;

  return (
    <Card
      className="glass-card surface-card"
      title={
        <div className="section-title">
          <span className="section-icon"><UserOutlined /></span>
          <div>
            <strong>Gestion de Pacientes</strong>
            <div className="section-subtitle">Identidad, edad y perfil sanguineo en una vista unica</div>
          </div>
        </div>
      }
      extra={
        <Button type="primary" icon={<UserAddOutlined />} onClick={() => setIsModalOpen(true)}>
          Nuevo Paciente
        </Button>
      }
    >
      <div className="section-banner">
        <span><SafetyCertificateOutlined /> {pacientes.length} expedientes sincronizados</span>
        <span>Edad promedio: {promedioEdad} anos</span>
      </div>
      <Table 
        className="hospital-table"
        dataSource={pacientes} 
        columns={columns} 
        rowKey="id" 
        loading={loading}
        pagination={{ pageSize: 5 }}
      />

      {/* Modal para el Formulario */}
      <Modal
        className="hospital-modal"
        title="Registrar Nuevo Paciente" 
        open={isModalOpen} 
        onCancel={() => setIsModalOpen(false)}
        onOk={() => form.submit()}
        okText="Guardar"
        cancelText="Cancelar"
      >
        <Form form={form} layout="vertical" onFinish={handleAdd}>
          <Form.Item name="nombre" label="Nombre Completo" rules={[{ required: true, message: 'Ingresa el nombre' }]}>
            <Input placeholder="Ej. Juan Pérez" />
          </Form.Item>
          <Form.Item name="edad" label="Edad" rules={[{ required: true }]}>
            <InputNumber min={0} max={120} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="curp" label="CURP" rules={[{ required: true, len: 18 }]}>
            <Input placeholder="18 caracteres" />
          </Form.Item>
          <Form.Item name="sangre" label="Tipo de Sangre" rules={[{ required: true }]}>
            <Input placeholder="Ej. O+" />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default Pacientes;
