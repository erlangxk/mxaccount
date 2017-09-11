import {
    hashPasswd,
    verifyPasswd
} from '../utils/hash';

import uuid from 'uuid/v1';

import {
    createAccountService
} from './AccountService';

function currentMillis() {
    return (new Date).getTime();
}

export default function (accountClient) {
    return createAccountService({ ...accountClient,
        hashPasswd,
        verifyPasswd,
        uuid,
        currentMillis
    });
}