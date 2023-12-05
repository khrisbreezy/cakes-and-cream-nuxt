export default function ({app, route, redirect}) {
    if ( !app.$cookies.get('orderType') || !app.$cookies.get('orderMedium') || !app.$cookies.get('customerDetails') || !app.$cookies.get('cakeDetails') ) {
        return redirect('/booking-options');
    }
}