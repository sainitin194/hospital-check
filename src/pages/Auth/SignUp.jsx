import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Container, Form, Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
  let apiUrl = '';
  let requestData = {};

  if (data.role === 'Hospital') {
    apiUrl = `${import.meta.env.VITE_BACKEND_URL}/api/hospital/signup`;
    requestData = {
      hospitalName: data.hospitalName,
      hospitalEmail: data.email,
      hospitalPwd: data.password
    };
  } else if (data.role === 'Patient') {
    apiUrl = `${import.meta.env.VITE_BACKEND_URL}/api/patient/signup`;
    requestData = data;
  } else if (data.role === 'Insurance Company') {
    apiUrl = `${import.meta.env.VITE_BACKEND_URL}/api/insuranceComp/signup`;
    requestData = data;
  }

  try {
    const response = await axios.post(apiUrl, requestData);
    console.log('Signup success:', response.data);
    toast.success(response.data.msg || 'Registration successful!');
  } catch (error) {
    console.error('Signup failed:', error);
    toast.error('Signup failed: ' + (error.response?.data?.msg || error.message));
  }
};

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Sign Up</h2>
      <Form onSubmit={handleSubmit(onSubmit)}>

        {/* Select Role */}
        <Form.Group className="mb-3">
          <Form.Label>Select Role</Form.Label>
          <Form.Select {...register('role', { required: true })}>
            <option value="">-- Select Role --</option>
            <option value="Hospital">Hospital</option>
            <option value="Patient">Patient</option>
            <option value="Insurance Company">Insurance Company</option>
          </Form.Select>
          {errors.role && <span className="text-danger">Role is required</span>}
        </Form.Group>

        {/* Email */}
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            {...register('email', { required: true })}
            placeholder="Enter email"
          />
          {errors.email && <span className="text-danger">Email is required</span>}
        </Form.Group>

        {/* Hospital Name */}
        <Form.Group className="mb-3">
          <Form.Label>Hospital Name</Form.Label>
          <Form.Control
            type="text"
            {...register('hospitalName', { required: true })}
            placeholder="Enter hospital name"
          />
          {errors.hospitalName && <span className="text-danger">Hospital name is required</span>}
        </Form.Group>

        {/* Password */}
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            {...register('password', { required: true })}
            placeholder="Enter password"
          />
          {errors.password && <span className="text-danger">Password is required</span>}
        </Form.Group>

        <Button type="submit" variant="primary">Sign Up</Button>
      </Form>

      <ToastContainer />
    </Container>
  );
};

export default SignUp;
