exports.up = (pgm) => {
    pgm.createTable('mx_accounts', {
        id: {
            type: 'uuid',
            primaryKey: true
        },
        name: {
            type: 'varchar(30)'
        },
        password_hash: {
            type: 'char(100)'
        },
        create_time: {
            type: 'bigint'
        }
    });
};

exports.down = (pgm) => {
    pgm.dropTable('mx_accounts');
};