export const dashboard = (userRole) => {
    switch (userRole) {
        case 'customer service':
            return {
                image: require('assets/images/order.svg'),
                text: 'Orders',
                allIcon: {
                    image: require('assets/images/all2.svg'),
                    text: 'All'
                },
                pendingIcon: {
                    image: require('assets/images/clock.svg'),
                    text: 'Pending'
                },
                ongoingIcon: {
                    image: require('assets/images/ongo.svg'),
                    text: 'Ongoing'
                },
                completedIcon: {
                    image: require('assets/images/tick-green.svg'),
                    text: 'Completed'
                },
                dropDownText: {
                    all: 'All Orders',
                    pending: 'Pending Orders',
                    ongoing: 'Ongoing Orders',
                    completed: 'Completed Orders'
                }
            };
        case 'cashier':
            return {
                image: require('assets/images/wallet.svg'),
                text: 'Payments',
                allIcon: {
                    image: require('assets/images/payment-wallet-blue.svg'),
                    text: 'All'
                },
                 pendingIcon: {
                    image: require('assets/images/clock.svg'),
                    text: 'Pending'
                },
                ongoingIcon: {
                    image: require('assets/images/ongo.svg'),
                    text: 'Outstanding'
                },
                completedIcon: {
                    image: require('assets/images/tick-green.svg'),
                    text: 'Paid'
                },
                dropDownText: {
                    all: 'All Payments',
                    pending: 'Pending Payments',
                    ongoing: 'Outstanding Payments',
                    completed: 'Completed Payments'
                }
            };
        case 'message writer':
            return {
                image: require('assets/images/pen.svg'),
                text: 'Messages',
                allIcon: {
                    image: require('assets/images/pen.svg'),
                    text: 'All'
                },
                 pendingIcon: {
                    image: require('assets/images/clock.svg'),
                    text: 'Pending'
                },
                ongoingIcon: {
                    image: require('assets/images/assign.svg'),
                    text: 'Assigned'
                },
                completedIcon: {
                    image: require('assets/images/tick-green.svg'),
                    text: 'Completed'
                },
                dropDownText: {
                    all: 'All Messages',
                    pending: 'Pending Messages',
                    ongoing: 'Ongoing Messages',
                    completed: 'Completed Messages'
                }
            };
        case 'message writer admin':
            return {
                image: require('assets/images/pen.svg'),
                text: 'Messages',
                allIcon: {
                    image: require('assets/images/pen.svg'),
                    text: 'All'
                },
                 pendingIcon: {
                    image: require('assets/images/clock.svg'),
                    text: 'Pending'
                },
                ongoingIcon: {
                    image: require('assets/images/assign.svg'),
                    text: 'Assigned'
                },
                completedIcon: {
                    image: require('assets/images/tick-green.svg'),
                    text: 'Completed'
                },
                dropDownText: {
                    all: 'All Messages',
                    pending: 'Pending Messages',
                    ongoing: 'Assigned Messages',
                    completed: 'Completed Messages'
                }
            };
        case 'collection officer':
            return {
                image: require('assets/images/collection-box.svg'),
                text: 'Collection',
                 allIcon: {
                    image: require('assets/images/collection-box-blue.svg'),
                    text: 'All'
                },
                 pendingIcon: {
                    image: require('assets/images/clock.svg'),
                    text: 'Pending'
                },
                ongoingIcon: {
                    image: require('assets/images/assign.svg'),
                    text: 'Assigned'
                },
                completedIcon: {
                    image: require('assets/images/tick-green.svg'),
                    text: 'Completed'
                },
                dropDownText: {
                    all: 'All Collections',
                    pending: 'Pending Collections',
                    ongoing: 'Assigned Collections',
                    completed: 'Completed Collections'
                }
            };
        case 'logistics':
            return {
                image: require('assets/images/delivery.svg'),
                text: 'Logistics',
                 allIcon: {
                    image: require('assets/images/delivery.svg'),
                    text: 'All'
                },
                 pendingIcon: {
                    image: require('assets/images/clock.svg'),
                    text: 'Pending'
                },
                ongoingIcon: {
                    image: require('assets/images/assign.svg'),
                    text: 'Assigned'
                },
                completedIcon: {
                    image: require('assets/images/tick-green.svg'),
                    text: 'Completed'
                },
                dropDownText: {
                    all: 'All Collections',
                    pending: 'Pending Collections',
                    ongoing: 'Ongoing Collections',
                    completed: 'Completed Collections'
                }
            };
        default:
            return {
                image: '',
                text: '',
                allIcon: {
                    image: '',
                    text: ''
                },
                 pendingIcon: {
                    image: '',
                    text: ''
                },
                ongoingIcon: {
                    image: '',
                    text: ''
                },
                completedIcon: {
                    image: '',
                    text: ''
                },
                dropDownText: {
                    all: '',
                    pending: '',
                    ongoing: '',
                    completed: ''
                }
            };
    }
}
