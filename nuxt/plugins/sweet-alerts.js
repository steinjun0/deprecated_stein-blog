import Vue from 'vue'
import VueSweetalert2 from 'vue-sweetalert2'
import Swal from 'sweetalert2'

Vue.use(VueSweetalert2)

function success(app, val, func = () => { }) {
    if (app.$swal !== undefined) {
        app.$swal({
            title: 'Good job!',
            text: val,
            icon: 'success',
            customClass: {
                confirmButton: 'btn btn-primary',
            },
            buttonsStyling: true,
        }).then(func)
    } else {
        Swal.fire({
            title: 'Good job!',
            text: val,
            icon: 'success',
            customClass: {
                confirmButton: 'btn btn-primary',
            },
            buttonsStyling: true,
        }).then(func)
    }
}

// error
function error(app, val, func = () => { }) {
    if (app.$swal !== undefined) {
        app.$swal({
            title: 'Error!',
            text: val,
            icon: 'error',
            customClass: {
                confirmButton: 'btn btn-primary',
            },
            buttonsStyling: true,
        }).then(func)
    } else {
        Swal.fire({
            title: 'Error!',
            text: val,
            icon: 'error',
            customClass: {
                confirmButton: 'btn btn-primary',
            },
            buttonsStyling: true,
        }).then(func)
    }
}

// warning
function warning(app, val, func = () => { }) {
    if (app.$swal !== undefined) {
        app.$swal({
            title: 'Warning!',
            text: val,
            icon: 'warning',
            customClass: {
                confirmButton: 'btn btn-primary',
            },
            buttonsStyling: true,
        }).then(func)
    } else {
        Swal.fire({
            title: 'Warning!',
            text: val,
            icon: 'warning',
            customClass: {
                confirmButton: 'btn btn-primary',
            },
            buttonsStyling: true,
        }).then(func)
    }
}

// info
function info(app, val, func = () => { }) {
    if (app.$swal !== undefined) {
        app.$swal({
            title: 'Info!',
            text: val,
            icon: 'info',
            customClass: {
                confirmButton: 'btn btn-primary',
            },
            buttonsStyling: true,
        }).then(func)
    } else {
        Swal.fire({
            title: 'Info!',
            text: val,
            icon: 'info',
            customClass: {
                confirmButton: 'btn btn-primary',
            },
            buttonsStyling: true,
        }).then(func)
    }
}

function apiResponse(app, response, successText, successFunc = () => { }, errFunc = () => { }) {
    if (Object.keys(response).includes('error')) {
        error(app, response.error, errFunc)
    } else {
        success(app, successText, successFunc)
    }
}

function loading(app, val, promise) {
    if (app.$swal !== undefined) {
        app.$swal({
            // title: 'Good job!',
            text: val,
            // icon: 'success',
            // customClass: {
            //   confirmButton: 'btn btn-primary',
            // },
            buttonsStyling: false,
            allowOutsideClick: false,
            didOpen: () => {
                app.$swal.showLoading()
            },
            preConfirm: promise,
        })
    } else {
        Swal.fire({
            // title: 'Good job!',
            text: val,
            // icon: 'success',
            // customClass: {
            //   confirmButton: 'btn btn-primary',
            // },
            buttonsStyling: false,
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading()
            },
            preConfirm: promise,
        })
    }
}

function loadingProcess(app, func, loadingVal, successVal, errorVal, result = undefined, promise = undefined) {
    const localResult = result
    const loadingPromise = new Promise(resolve => {
        // const submissionRes = API.postQuestionGrade(id, answer)
        const res = func()
        resolve(res)
    })

    loadingPromise.then(res => {
        if (res.error === undefined) {
            success(app, successVal)
            if (localResult !== undefined) {
                localResult.value = res
            }
            // alert('제출 성공')
        } else {
            error(app, `${errorVal}:${res.error}`)
            if (localResult !== undefined) {
                localResult.value = res
            }
            // alert('제출 실패: ', submissionRes)
        }
    })

    loading(app, loadingVal, promise)
}

export default {
    success, error, warning, info, apiResponse, loading, loadingProcess,
}

