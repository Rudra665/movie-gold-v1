import axios from "axios";

export default axios.create({
  baseURL:
    "https://aa9e-2401-4900-1f3a-30a3-6622-187d-6c22-f447.ngrok-free.app",
  headers: {
    "ngrok-skip-browser-warning": "true"
  }
});
