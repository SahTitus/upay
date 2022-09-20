import {
  authData,
  isError,
  isLoading,
  fetchUsers,
  removeUser,
  editUser,
  fetchUser,
  adminData,
} from "../redux/auth";
import * as api from "../api/index.js";

export const getUsers = () => async (dispatch) => {
  dispatch(isLoading());
  try {
    const { data } = await api.fetchUsers();

    dispatch(fetchUsers(data));
  } catch (error) {
    dispatch(isError(error?.response?.data));
  }
};
export const getUser = (id) => async (dispatch) => {
  dispatch(isLoading());
  try {
    const { data } = await api.fetchUser(id);

    dispatch(fetchUser(data));
  } catch (error) {
    dispatch(isError(error?.response?.data));
  }
};
export const getAdmin = (id, navigate) => async (dispatch) => {
  dispatch(isLoading());
  try {
    const { data } = await api.fetchAdmin(id);

    navigate("/admin")
    dispatch(adminData(data));
  } catch (error) {
    dispatch(isError(error?.response?.data));
  }
};

export const updateUser =
  (id, userData, navigate, goToDashboard) => async (dispatch) => {
    dispatch(isLoading());
    try {
      const { data } = await api.updateUser(id, userData);

    
      if (goToDashboard) {
        navigate("/profile");
        dispatch(editUser(data));
      } else {
        navigate("/students");
      }
    } catch (error) {
      dispatch(isError(error?.response?.data));
    }
  };

export const addFees = (id, userData, navigate) => async (dispatch) => {
  dispatch(isLoading());
  try {
    const {data} = await api.addFees(id, userData);

    dispatch(adminData(data));
    navigate("/admin");
  } catch (error) {
    dispatch(isError(error?.response?.data));
  }
};

export const makePayment = (id, userData, navigate) => async (dispatch) => {
  dispatch(isLoading());
  try {
    const {data} = await api.makePayment(id, userData);

    dispatch(editUser(data));
    navigate("/invoices");
  } catch (error) {
    dispatch(isError(error?.response?.data));
  }
};

export const deleteUser = (id) => async (dispatch) => {
  try {
    await api.deleteUser(id);

    dispatch(removeUser(id));
  } catch (error) {
    dispatch(isError(error?.response?.data));
  }
};

export const signin = (formData, navigate) => async (dispatch) => {
  dispatch(isLoading());
  try {
    const { data } = await api.signIn(formData);

    dispatch(authData(data));

    navigate("/");
  } catch (error) {
    dispatch(isError(error?.response?.data));
  }
};

export const signup = (formData, navigate) => async (dispatch) => {
  dispatch(isLoading());
  try {
    const { data } = await api.signUp(formData);

    dispatch(authData(data));

    navigate("/");
  } catch (error) {
    dispatch(isError(error?.response?.data));
  }
};
