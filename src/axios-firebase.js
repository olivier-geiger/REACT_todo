import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://todo-list-6318d-default-rtdb.europe-west1.firebasedatabase.app/'
});

export default instance;