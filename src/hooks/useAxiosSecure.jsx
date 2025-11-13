import axios from "axios";
import React from "react";

const instance = axios.create({
  baseURL: "https://movies-master-pro-api-server.vercel.app",
});

const useAxiosSecure = () => {
  instance.interceptors.request.use((config) => {
    return config;
  });

  return instance;
};

export default useAxiosSecure;
