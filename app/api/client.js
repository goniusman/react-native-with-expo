import axios from "axios";

export default axios.create({
  baseURL: 'http://backservice.herokuapp.com/api/',
});
