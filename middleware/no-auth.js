export default function ({app, route, redirect}) {
    if (!app.$cookies.get('token')) {
        let path = route.path;
        if (path === '/delivery-method') {
            path = '/booking-options';
        } else if  (path === '/cake-details') {
            path = '/booking-options';
        } else if (path === '/customer-details') {
            path = '/booking-options';
        } else if (path === '/additional-information') {
            path = '/booking-options';
        }
        
        app.$cookies.set('intended_url', path);
        return redirect('/');
    }
}