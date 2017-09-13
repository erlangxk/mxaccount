export function createAccountClient({
    query
}) {
    const insertSql = 'insert into mx_accounts (id, name, password_hash,create_time) values ($1,$2,$3,$4)';
    const querySql = 'select id, password_hash from mx_accounts where name=$1';
    return {

        addAccount: (id, name, passwordHash, createTime) => {
            return query(insertSql, [id, name, passwordHash, createTime])
        },

        queryAccount: (name) => {
            return query(querySql, [name]);
        }
    }
}