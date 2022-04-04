import Axios, { AxiosRequestConfig } from 'axios'

const backendServer = Axios.create({
  baseURL: 'http://localhost:3000/api',
})

export const request = (options: AxiosRequestConfig): Promise<any> =>
  new Promise((resolve, reject) => {
    backendServer(options)
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        reject(err)
      })
  })
