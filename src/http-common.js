import axios from "axios";

export default axios.create({
    baseURL: "https://dark-thought.herokuapp.com/api",
    headers: {
        "content-type": "application/json"
    }
});
