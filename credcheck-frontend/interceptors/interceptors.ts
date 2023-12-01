import {AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse} from "axios";
import Router from 'next/router';

const API_URL = process.env.NEXT_PUBLIC_ENDPOINT_AUTH;


const onRequest = (config: AxiosRequestConfig): AxiosRequestConfig => {
     const token = JSON.parse(localStorage.getItem("cred-token") || '{}');
    // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzgyYWI3NzY0YWE1ZDMzYTUxYzNkMDMiLCJpYXQiOjE2Njk2MDAzOTJ9.IjSbPY-ocBB4oLlHY1kTl_xNmB7BxEJ0TwK7bNdgNFU';
     config.headers["authorization"] = `${token}`;
     return config;
  };

  const onRequestError = (error: AxiosError): Promise<AxiosError> => {
    return Promise.reject(error);
  };

  const onResponse = (response: AxiosResponse): AxiosResponse => {
    return response;
  };

const onResponseError = (error: AxiosError): Promise<AxiosError> => {
    console.error(`[response error] [${JSON.stringify(error)}]`);
    return Promise.reject(error);
}

export function setupInterceptorsTo(axiosInstance: AxiosInstance): AxiosInstance {
    axiosInstance.interceptors.request.use(onRequest, onRequestError);
    axiosInstance.interceptors.response.use(onResponse, onResponseError);
    return axiosInstance;
}