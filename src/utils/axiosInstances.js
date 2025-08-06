import axios from 'axios';

// Axios instance for Hospital-related endpoints
const hospitalInstance = axios.create({
  baseURL: 'http://56.228.62.37:3434/hospital-service/api/hospital/', // ✅ Updated from localhost
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


// Axios instance for Patient-related endpoints
const patientInstance = axios.create({
  baseURL: 'http://localhost:3434/api/patient/',
  headers: {
    'Content-Type': 'application/json'
  }
});

patientInstance.interceptors.request.use(
  (config) => {
    // Retrieve the "Patient" token from localStorage
    const token = localStorage.getItem('Patient');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Axios instance for Insurance Company-related endpoints
const insuranceInstance = axios.create({
  baseURL: 'http://localhost:3434/api/insuranceComp/',
  headers: {
    'Content-Type': 'application/json'
  }
});

insuranceInstance.interceptors.request.use(
  (config) => {
    // Retrieve the "InsuranceCompany" token from localStorage
    const token = localStorage.getItem('InsuranceCompany');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { hospitalInstance, patientInstance, insuranceInstance };
