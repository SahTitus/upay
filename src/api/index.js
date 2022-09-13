import axios from "axios";

const API = axios.create({ baseURL: "https://upay-back.vercel.app" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});

export const deleteUser = (id) => API.delete(`/user/${id}/delete`);

export const fetchUsers = () => API.get(`/user/users`);
export const fetchUser = (id) => API.get(`/user/users/${id}`, {goId:id} );
export const fetchAdmin = (id) => API.get(`/user/users/${id}/admin` );

export const updateUser = (id, updatedUser) => API.patch(`/user/${id}`, updatedUser);
export const makePayment = (id, paymentData) => API.patch(`/user/${id}/pay`, paymentData);
export const addFees = (id, feesData) => API.patch(`/user/${id}/addFees`, feesData);

export const signIn = (formData) => API.post(`/user/signin`, formData);
export const signUp = (formData) => API.post(`/user/signup`, formData);
