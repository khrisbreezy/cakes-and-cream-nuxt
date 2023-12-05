export const orderLink = (userRole, perPage, status) => {
    switch (userRole) {
        
        case 'cashier':
            return `order/pending-orders?perPage=${perPage}`;

        case 'message writer':
            return `message-writer/get-assigned-orders?perPage=${perPage}`;

        case 'message writer admin':
            return `order/paid-orders?perPage=${perPage}`;
        
        case 'collection officer':
            console.log(perPage);
            if (status === 'pending') {
                return `collection-officer/dashboard/get-pending-pickup-orders?perPage=${perPage}`
            }
            // return `order/completed-pickup-writer-orders?perPage=${perPage}`;

        case 'logistics':
            return `order/completed-delivery-writer-orders?perPage=${perPage}`;

        default:
            return `order/all?perPage=${perPage}`;
    }
}
