exports.up = (pgm) => {
    pgm.createTable('mx_accounts', {
        id: {
            type: 'uuid',
            primaryKey: true
        },
        name: {
            type: 'varchar(30)',
            notNull: true,
            unique: true,
        },
        password_hash: {
            type: 'varchar(100)',
            notNull: true,
        },
        create_time: {
            type: 'bigint',
            notNull: true,
        },
    });
};

exports.down = (pgm) => {
    pgm.dropTable('mx_accounts');
};