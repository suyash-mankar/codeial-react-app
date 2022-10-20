export * from './constants';

export const getFormBody = (params) => {
    let formBody = [];

    for (let property in params) {
        let encodedKey = encodeURIComponent(property); // 'user name' => 'user%20name'
        let encodedValue = encodeURIComponent(params[property]); // suyash 123 => suyash%20123

        formBody.push(encodedKey + '=' + encodedValue);

    }


    return formBody.join('&'); // 'username=suyash&password=123213'
}
