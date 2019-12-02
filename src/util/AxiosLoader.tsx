import axios, { AxiosRequestConfig } from 'axios';

export async function AxiosLoader<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
  try {
    const response = await axios({
      method: config?.method || 'get',
      url,
      data: config?.data || {},
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
}
