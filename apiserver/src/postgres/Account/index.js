
const insertSql='insert into mx_accounts (id, name, password_hash,create_time) values ($1,$2,$3,$4)';
const querySql='select id, password_hash from mx_accounts where name=$1';

class AccountClient {
    constructor(pool) {
        this.pool = pool;
    }

    addAccount(id, name, passwordHash,createTime) {
        return this.pool.query(insertSql,[id,name,passwordHash,createTime])
    }

    queryAccount(name) {
        return this.pool.query(querySql,[name]);
    }
}

module.exports = AccountClient;