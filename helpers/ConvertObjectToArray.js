export const convertObjectToArray = (arr) => {
    return Object.keys(arr).map(key => {
        return {
            ...arr[key]
        }
    });
}