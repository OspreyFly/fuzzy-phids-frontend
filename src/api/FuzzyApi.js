import axios from 'axios';
const BASE_URL = "http://localhost:3001";


/** API Class.
 *
 * Static class tying together methods used to get/send to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class FuzzyApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    // Check if the token is undefined and the endpoint is not 'auth/token'
    if (!FuzzyApi.token && endpoint !== 'auth/token' && endpoint !== 'auth/register') {
      console.warn("Authority Required First");
    }

    console.debug("API Call:", endpoint, data, method);
    let url = `${BASE_URL}/${endpoint}`;

    if (method === "get" && Object.keys(data).length > 0) {
      // Filter out undefined or null values and accumulate the remaining key-value pairs into a new object
      const filteredData = Object.entries(data).reduce((acc, [key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          acc[key] = value;
        }
        return acc;
      }, {});

      // Construct the URL with the filtered data
      url += `?${new URLSearchParams(filteredData).toString()}`;
      data = {}; // Clear data since we're sending it as query params
    }

    // Adjust headers to include the token
    const headers = { Authorization: `Bearer ${FuzzyApi.token}` };

    try {
      const result = await axios({
        url,
        method,
        data: method === "get" ? null : data, // Only send data for non-GET requests
        params: method === "get" ? data : null, // Only use params for GET requests
        headers
      });

      // Special handling for 'auth/token' and 'auth/register' endpoints
      if (endpoint === "auth/token" && !FuzzyApi.token) {
        FuzzyApi.token = result.data.token;
      } else if (endpoint === "auth/register") {
        FuzzyApi.token = result.data.token;
      }

      return result.data;
    } catch (err) {
      console.error("API Error:", err);
      let message = err;
      throw Array.isArray(message) ? message : [message];
    }
  }


  // Individual API routes

  /** Get the current user. */

  static async getCurrentUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  static async patchCurrentUser(username, queryParams = {}) {
    let res = await this.request(method="patch", endpoint=`/users/${username}`, data=queryParams );
    return res.user;
  }

  /** Get insects (filtered by species, minPrice, maxPrice if not undefined) */

  static async getAllInsects(queryParams = {}) {
    let res = await this.request("insects", queryParams);
    return res.insects;
  }

  /** Get details on a insect by id. */

  static async getInsect(id) {
    let res = await this.request(`insects/${id}`);
    return res.insect;
  }

  static async patchInsect(id, queryParams={}){
    let res = await this.request(`insects/${id}`, queryParams , "patch");
    return res.insect;
  }

  static async deleteInsect(id) {
    let res = await this.request(`insects/${id}`, "delete");
    return res.status;
  }

  /** Get list of orders (filtered by (total, submit_time) if not undefined) */

  static async getAllOrders(queryParams = {}) {
    let res = await this.request("orders", queryParams);
    return res.orders;
  }

  /** Get order { id, phone, delivery_address, submit_time, total, items, user_order_id } if not undefined) */

  static async getOrder(id) {
    let res = await this.request(`orders/${id}`);
    return res.order;
  }

  static async createOrder(queryParams = {}){
    let res = await this.request(`orders`, queryParams, "post");
    return res.order;
  }

  static async deleteOrder(id) {
    let res = await this.request(`orders/${id}`, "delete");
    return res.status;
  }

  /** Get token for login from username, password. */

  static async login(data) {
    let res = await this.request(`auth/token`, data, "post");
    return res.token;
  }

  /** Signup for site. */

  static async signup(data) {
    let res = await this.request(`auth/register`, data, "post");
    return res.token;
  }

  /** Save user profile page. */

  static async saveProfile(username, data) {
    let res = await this.request(`users/${username}`, data, "patch");
    return res.user;
  }
}



export default FuzzyApi;