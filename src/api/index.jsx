//import axios
import axios from 'axios';

const Api = axios.create({
    baseURL: 'https://quran-api.santrikoding.com'
})

export default Api