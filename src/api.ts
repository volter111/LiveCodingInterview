import axios from "axios";

const getAllUsers = () => {
  return axios.get("https://62e7d3dc93938a545bda1de1.mockapi.io/api/users");
};

export default getAllUsers;
