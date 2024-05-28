import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api/auth',
});

interface FormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
  rememberPassword: boolean;
}

export async function checkUserExists(email: string): Promise<boolean> {
  try {
    const response = await api.get(`/user/${email}`);
    return response.data.exists;
  } catch (error) {
    console.error('Error checking user existence:', error);
    throw new Error('Error checking user existence');
  }
}

export const registerUser = async (values: FormValues) => {
  try {
    const response = await api.post('/register', values);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || 'Error registering user');
    } else {
      throw new Error('Error registering user');
    }
  }
};

export const loginUser = async (values: FormValues) => {
  try {
    const response = await api.post('/login', values);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || 'Error logging in user');
    } else {
      throw new Error('Error logging in user');
    }
  }
};
