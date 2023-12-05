export const dashboardLink = (userRole, perPage) => {
    switch (userRole) {
        case 'customer service':
            return `customer-service/dashboard?perPage=${perPage}`;

        case 'cashier':
            return `cashier/dashboard?perPage=${perPage}`;

        case 'message writer admin':
            return `message-writer/admin/dashboard?perPage=${perPage}`;

        case 'message writer':
            return `message-writer/dashboard?perPage=${perPage}`;

        case 'collection officer':
            return `collection-officer/dashboard?perPage=${perPage}`;

        case 'logistics':
            return `logistics/dashboard?perPage=${perPage}`;

        default:
            return ``;
    }
}
