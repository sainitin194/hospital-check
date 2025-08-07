import axios from 'axios';

// ✅ Axios instance for Hospital-related endpoints
const hospitalInstance = axios.create({
  baseURL: '/hospital-service/api/hospital/',
  headers: {
    'Content-Type': 'application/json'
  }
});

hospitalInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('Hospital');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Axios instance for Patient-related endpoints
const patientInstance = axios.create({
  baseURL: '/hospital-service/api/patient/',
  headers: {
    'Content-Type': 'application/json'
  }
});

patientInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('Patient');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Axios instance for Insurance Company-related endpoints
const insuranceInstance = axios.create({
  baseURL: '/hospital-service/api/insuranceComp/',
  headers: {
    'Content-Type': 'application/json'
  }
});

insuranceInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('InsuranceCompany');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export { hospitalInstance, patientInstance, insuranceInstance };
