import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://todo-edfb5-default-rtdb.europe-west1.firebasedatabase.app/'
});

export default instance;