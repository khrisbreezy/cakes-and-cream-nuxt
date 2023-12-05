export default function ({app, route, redirect}) {
    if (app.$cookies.get('token')) {
        return redirect('/dashboard');
    }
}