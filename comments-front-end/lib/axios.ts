import Axios, { AxiosRequestConfig } from 'axios'

const internalAPI = 'http://comments-app.sandbox.svc.cluster.local:3000/api'
const publicAPI = 'https://comments-app.wuhsun.com/api'
const devAPI = 'http://localhost:3000/api'

const backendServer = Axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? internalAPI : publicAPI,
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
