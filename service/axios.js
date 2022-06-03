import axios from "axios";

const instance = axios.create({
  baseURL: "http://tevkil.eu-central-1.elasticbeanstalk.com",
  //baseURL: "http://localhost:3000",
  timeout: 10000,
  headers: { "X-Custom-Header": "foobar" },
});

export default instance;
