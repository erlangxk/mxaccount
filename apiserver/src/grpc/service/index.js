function addNewUserImpl(register) {
    return async function (call, callback) {
        const name = call.request.name;
        const password = call.request.password;
        let result;
        try {
            const id = await register(name, password);
            result = {
                code: 0,
                userId: id
            };
        } catch (err) {
            result = {
                code: 1
            };
        }
        callback(null, result);
    };
}

export default function ({
    register
}) {
    return {
        addNewUser: addNewUserImpl(register),
    };
}