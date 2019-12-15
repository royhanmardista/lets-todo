import axios from 'axios'

const server = axios.create({
  baseURL: 'http://35.234.201.75/'
})

export default server
