import axios from 'axios';
const API_DEFAULT_PARAMS = { page_size: 1000, region_id: 32, key: 'ruhebf8058' };

class ApiService {
  constructor() {
    this.instance = axios.create({
      baseURL: 'https://catalog.api.2gis.ru/3.0',
      timeout: 30000,
    });
  }

  async apiCall(url, method='GET', params) {
    const withDefaultParams = { ...params, ...API_DEFAULT_PARAMS }
    return this.instance({
      url: `${this.instance.defaults.baseURL}${url}`,
      method,
      params: withDefaultParams,
    });
  }

  async getRequestedMarkers(params) {
    const res = await this.apiCall('/markers','GET',params);
    return res.data.result;
  }
}

export default new ApiService();