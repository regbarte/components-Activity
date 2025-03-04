import axios from 'axios';

const URL = 'http://localhost:5000/names'
const userAPI = axios.create({baseURL: URL})

export const getUsers = async () => {
    return (await userAPI.get('/')).data
}


console.log(axios.isCancel('reggggggggg'));