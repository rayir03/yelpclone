import axios from "axios";


export default axios.create({
    baseURL: "http://localhost:4004/api/v1/restaurants/",
});