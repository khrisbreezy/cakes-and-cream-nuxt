export default function ({ $axios, store, app}) {
    $axios.onRequest((config => {
        config.headers.common['Authorization'] = ('Bearer ' + app.$cookies.get('token')) || null;
    }))

    // const api = $axios.create({
    //     headers: {
    //       common: {
    //         Accept: 'text/plain, */*',
    //         Authorization: ('Bearer ' + app.$cookies.get('token')) || null
    //       }
    //     }
    //   })
    //   inject('api', api);
}