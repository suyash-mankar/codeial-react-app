export * from './constants';

export const setItemInLocalStorage = (key, value) => {
    if (!key || !value) {
        console.error('cannot store in local storage');
        return;
    }
    const valueToStore = typeof value !== 'string' ? JSON.stringify(value) : value;
    localStorage.setItem(key, valueToStore);
}


export const getItemFromLocalStorage = (key) => {
    if (!key) {
        console.error('cannot get the value from local storage');
        return;
    }
    return localStorage.getItem(key);
}


export const removeItemFromLocalStorage = (key) => {
    if (!key) {
        console.error('cannot remove the value from local storage');
        return;
    }
    localStorage.removeItem(key);
}


export const getFormBody = (params) => {
    let formBody = [];

    for (let property in params) {
        let encodedKey = encodeURIComponent(property); // 'user name' => 'user%20name'
        let encodedValue = encodeURIComponent(params[property]); // suyash 123 => suyash%20123

        formBody.push(encodedKey + '=' + encodedValue);

    }


    return formBody.join('&'); // 'username=suyash&password=123213'
}
