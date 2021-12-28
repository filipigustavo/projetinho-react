import axios from "axios";

const baseURL = "https://61c9b5bb20ac1c0017ed8db4.mockapi.io/api/"
const Axios = axios.create({ baseURL })

export default Axios