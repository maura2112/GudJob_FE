import { BASE_URL } from '.';
import axiosClient from '../utils/axiosClient';

const profileApi = {
  getUserProfile: () => {
    try {
      const response = axiosClient.get(`${BASE_URL}/api/Users/Profile`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  getUserProfileById: (userId) => {
    try {
      const response = axiosClient.get(`${BASE_URL}/api/Users/GetUser`, {
        params: { uid: userId },
        headers: { accept: '*/*' },
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  changePassword: async (oldPassword, newPassword, newPasswordConfirm) => {
    try {
      const response = await axiosClient.put(
        `${BASE_URL}/api/Users/ChangePassword`,
        {
          oldPassword,
          newPassword,
          newPasswordConfirm,
        }
      );
      return response;
    } catch (error) {
      console.error(
        'Error during changePassword API call:',
        error.response || error.message
      );
      throw error;
    }
  },

  updateProfile: async (data) => {
    try {
      const response = await axiosClient.post(
        `${BASE_URL}/api/Users/Update`,
        data
      );
      console.log('response', response);
      return response;
    } catch (error) {
      console.error(
        'Error during changePassword API call:',
        error.response || error.message
      );
      throw error;
    }
  },

  updateEducation: async (data) => {
    try {
      const response = await axiosClient.put(
        `${BASE_URL}/api/Users/UpdateEducation`,
        data
      );
      return response;
    } catch (error) {
      console.error(
        'Error during changePassword API call:',
        error.response || error.message
      );
      throw error;
    }
  },

  updateExperience: async (data) => {
    try {
      const response = await axiosClient.put(
        `${BASE_URL}/api/Users/UpdateExperience`,
        data
      );
      return response;
    } catch (error) {
      console.error(
        'Error during changePassword API call:',
        error.response || error.message
      );
      throw error;
    }
  },

  submitRating: async (data) => {
    try {
      const response = await axiosClient.post(
        `${BASE_URL}/api/Ratings/Rate`,
        data
      );
      return response;
    } catch (error) {
      console.error(
        'Error during changePassword API call:',
        error.response || error.message
      );
      throw error;
    }
  },

  getUserProjectByStatus: async ({ statusId, userId, pageIndex, pageSize }) => {
    try {
      const params = {
        statusId: statusId,
        userId: userId,
        PageIndex: pageIndex,
        PageSize: pageSize,
      };

      const response = await axiosClient.get(
        `${BASE_URL}/api/Projects/GetByStatus`,
        { params }
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default profileApi;
