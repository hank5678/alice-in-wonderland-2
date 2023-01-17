import axios from "axios"
import { message } from "ant-design-vue"

const instance = axios.create({
  baseURL: "http://localhost:3000/"
})

instance.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    message.error(error.message || "发生错误，请稍后再试")
    return Promise.reject(error)
  }
)

export default instance
