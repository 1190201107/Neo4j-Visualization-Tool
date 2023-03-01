import axios from "axios"

export const baseURLLink = "http://127.0.0.1:8888"
// export const baseURLLink = Config.API_URL;
console.log("Now using base link: ", baseURLLink)

const axios_instance = axios.create({
	baseURL: baseURLLink,
	timeout: 10000,
	crossDomain: true,
})

const axios_instance_fileDownload = axios.create({
	baseURL: baseURLLink,
	timeout: 1000000,
	crossDomain: true,
})

const axios_instance_fileUpload = axios.create({
	baseURL: baseURLLink,
	timeout: 10000000,
	crossDomain: true,
})

//请求拦截器
axios_instance.interceptors.request.use(
	(req) => {
		return req
	},
	(err) => {
		// 在请求错误
		console.log(err)
		// 该返回的数据则是axios.catch(err)中接收的数据
		return Promise.reject(err)
	}
)

//响应拦截器
axios_instance.interceptors.response.use(
	(res) => {
		// 请求成功对响应数据做处理
		console.log(res)
		if (res.data.code === 500 && res.data.message === "Invalid JWT") {
			window.location.href = "/graphDetail"
		}
		return res
	},
	(err) => {
		// 在请求错误时
		console.log(err)
		if (err.response) {
			// 诸如timeout等情况时response是undefined，会引起另一个error
			if (err.response.status === 401) {
				window.location.href = "/graphDetail"
			} else if (err.response.status === 403) {
				//跳回首页
				window.location.href = "/graphDetail"
			}
			// 在err.response合法时才能够这么返回
			// 该返回的数据则是axios.catch(err)中接收的数据
			return Promise.reject(err.response)
		} else {
			return Promise.reject(err) // 返回err本身
		}
	}
)

//文件下载响应拦截器
axios_instance_fileDownload.interceptors.response.use(
	(res) => {
		// 请求成功对响应数据做处理
		console.log(res)
		if (res.headers.authorization) {
			localStorage.setItem("authorization", res.headers.authorization)
		}
		if (res.data.code === 500 && res.data.message === "Invalid JWT") {
			localStorage.removeItem("authorization")
			window.location.href = "/simt/login"
		}
		// if (res.data.message === "Access is denied") {
		//   window.location.href = "/simt/auth/index";
		//   alert("Access is denied")
		// }
		// 该返回的数据则是axios.then(res)中接收的数据
		return res
	},
	(err) => {
		// 在请求错误时
		console.log(err)
		if (err.response) {
			// 诸如timeout等情况时response是undefined，会引起另一个error
			if (err.response.status === 401) {
				localStorage.removeItem("authorization")
				window.location.href = "/simt/login"
			} else if (err.response.status === 403) {
				//跳回首页
				window.location.href = "/simt/auth/index"
			}
			// 在err.response合法时才能够这么返回
			// 该返回的数据则是axios.catch(err)中接收的数据
			return Promise.reject(err.response)
		} else {
			return Promise.reject(err) // 返回err本身
		}
	}
)

axios_instance_fileUpload.interceptors.response.use(
	(res) => {
		// 请求成功对响应数据做处理
		console.log(res)
		if (res.headers.authorization) {
			localStorage.setItem("authorization", res.headers.authorization)
		}
		if (res.data.code === 500 && res.data.message === "Invalid JWT") {
			localStorage.removeItem("authorization")
			window.location.href = "/simt/login"
		}
		// if (res.data.message === "Access is denied") {
		//   window.location.href = "/simt/auth/index";
		//   alert("Access is denied")
		// }
		// 该返回的数据则是axios.then(res)中接收的数据
		return res
	},
	(err) => {
		// 在请求错误时
		console.log(err)
		if (err.response) {
			// 诸如timeout等情况时response是undefined，会引起另一个error
			if (err.response.status === 401) {
				localStorage.removeItem("authorization")
				window.location.href = "/simt/login"
			} else if (err.response.status === 403) {
				//跳回首页
				window.location.href = "/simt/auth/index"
			}
			// 在err.response合法时才能够这么返回
			// 该返回的数据则是axios.catch(err)中接收的数据
			return Promise.reject(err.response)
		} else {
			return Promise.reject(err) // 返回err本身
		}
	}
)

export {
	axios_instance,
	axios_instance_fileDownload,
	axios_instance_fileUpload,
}
