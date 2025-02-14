import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api';

export const searchBatting = async (params) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/batting/search`, { params });
        return response.data;
    } catch (error) {
        console.error('API 请求失败:', error);
        throw error; // 抛出错误以便前端捕获
    }
};

export const getAllBatting = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/batting`);
        return response.data;
    } catch (error) {
        console.error('获取数据失败:', error);
        throw error;
    }
};

// 获取自动完成选项
export const getAutoCompleteOptions = async (field, searchText) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/${field}/search`, {
            params: { search: searchText }
        });
        return response.data.map(item => ({ value: item[field] }));
    } catch (error) {
        console.error('获取选项失败:', error);
        throw error;
    }
};