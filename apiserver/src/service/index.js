import {
    hashPasswd,
    verifyPasswd
} from '../utils/hash';

import uuid from 'uuid/v1';

import {
    AccountService
} from './AccountService';

function currentMillis() {
    return (new Date).getTime();
}

export default function (accountClient) {
    return new AccountService({ ...accountClient,
        hashPasswd,
        verifyPasswd,
        uuid,
        currentMillis
    });
}