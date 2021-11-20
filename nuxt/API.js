import axios from 'axios'
let user = null
if (process.client) {
  user = JSON.parse(localStorage.getItem('userData'))
}
let tokenHeader = false

if (user !== null) {
  tokenHeader = { headers: { Authorization: `Bearer ${user.token}` } }
} else {
  tokenHeader = false
}
export default {
  refreshUserData() {
    user = JSON.parse(localStorage.getItem('userData'))
    if (user !== null) {
      tokenHeader = { headers: { Authorization: `Bearer ${user.token}` } }
    } else {
      tokenHeader = false
    }
  },
  async getAxios(url) {
    this.refreshUserData()
    try {
      const res = tokenHeader
        ? await axios.get(url, tokenHeader)
        : await axios.get(url, tokenHeader)
      return res.data
    } catch (e) {
      // console.log(e);
      return { error: e.response.data.errors || e }
    }
  },
  async getAxiosZip(url) {
    this.refreshUserData()
    try {
      const res = user.token
        ? await axios.get(url, {
          headers: {
            Authorization: `Bearer ${user.token}`,
            accept: 'application/x-zip-compressed',
          },
        })
        : await axios.get(url, {
          headers: { accept: 'application/x-zip-compressed' },
        })
      return res.data
    } catch (e) {
      // console.log(e);
      return { error: e.response.data.errors || e }
    }
  },
  async getAxiosWithParams(url, param) {
    this.refreshUserData()
    try {
      const res = await axios.get(
        url,
        {
          params: param,
        },
        tokenHeader
      )
      return res.data
    } catch (e) {
      return { error: e.response.data.errors || e }
    }
  },
  async postAxios(url, data) {
    this.refreshUserData()
    try {
      const res = tokenHeader
        ? await axios.post(url, data, tokenHeader)
        : await axios.post(url, data)
      return res.data
    } catch (e) {
      // console.log(e);
      return { error: e.response.data.errors || e }
    }
  },
  async postAxiosFormData(url, data) {
    this.refreshUserData()
    try {
      const res = user.token
        ? await axios.post(url, data, {
          headers: {
            Authorization: `Bearer ${user.token}`,
            'Content-Type': 'multipart/form-data',
          },
        })
        : await axios.post(url, data, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
      return res.data
    } catch (e) {
      // console.log(e)
      return { error: e.response.data.errors || e }
    }
  },
  async patchAxios(url, data) {
    this.refreshUserData()
    try {
      const res = tokenHeader
        ? await axios.patch(url, data, tokenHeader)
        : await axios.patch(url, data)
      return res.data
    } catch (e) {
      // console.log(e);
      return { error: e.response.data.errors || e }
    }
  },
  async patchAxiosFormData(url, data) {
    this.refreshUserData()
    try {
      const res = user.token
        ? await axios.patch(url, data, {
          headers: {
            Authorization: `Bearer ${user.token}`,
            'Content-Type': 'multipart/form-data',
          },
        })
        : await axios.patch(url, data, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
      return res.data
    } catch (e) {
      // console.log(e)
      return { error: e.response.data.errors || e }
    }
  },
  async putAxios(url) {
    this.refreshUserData()
    try {
      const res = tokenHeader
        ? await axios.put(url, tokenHeader)
        : await axios.put(url)
      return res.data
    } catch (e) {
      // console.log(e);
      return { error: e.response.data.errors || e }
    }
  },
  async deleteAxios(url) {
    this.refreshUserData()
    try {
      const res = tokenHeader
        ? await axios.delete(url, tokenHeader)
        : await axios.delete(url)
      return res
    } catch (e) {
      // console.log(e);
      return { error: e.response.data.errors || e }
    }
  },

  // api start
  async getCategories() {
    const categoriesRes = await this.getAxios(
      `${process.env.API_URL}api/blog/categories`
    )
    return categoriesRes
  },
  async postCategory(category) {
    const loginRes = await this.postAxios(
      `${process.env.API_URL}api/blog/categories`,
      category
    )
    return loginRes
  },
  async postProfile(img) {
    const postProfileRes = await this.postAxiosFormData(
      `${process.env.API_URL}auth/profile/`,
      img
    )
    return postProfileRes
  },
  async patchUser(userData) {
    const userRes = await this.patchAxios(
      `${process.env.API_URL}auth/user/`,
      userData
    )
    return userRes
  },
  async deleteTask(taskId) {
    const deleteRes = await this.deleteAxios(
      `${process.env.API_URL}task/task/${taskId}/`
    )
    return deleteRes
  },
}
