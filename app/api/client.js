import axios from "axios";

export default axios.create({
  baseURL: 'http://118.67.215.209:6969/api' 
}); 

// baseURL: 'http://192.168.43.99:5000/api',
// baseURL: 'http://192.168.56.1:5000/api',
// baseURL: 'http://172.19.208.1:5000/api'
// baseURL: 'http://192.168.0.104:5000/api'

// baseURL: 'https://backservice.herokuapp.com/api'