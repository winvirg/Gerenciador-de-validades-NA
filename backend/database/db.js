const sqlite3 =
    require('sqlite3').verbose();

const db = new sqlite3.Database(
    './database.db',
    err => {

        if(err){

            console.error(err);

        }else{

            console.log(
                'Banco SQLite conectado.'
            );
        }
    }
);

db.serialize(() => {

    db.run(`

        CREATE TABLE IF NOT EXISTS produtos (

            id INTEGER PRIMARY KEY AUTOINCREMENT,

            nome TEXT NOT NULL,

            local TEXT NOT NULL,

            qtd INTEGER,

            lote TEXT,

            status TEXT,

            validade TEXT,

            recebido TEXT
        )
    `);

    db.all(

        `PRAGMA table_info(produtos)`,

        [],

        (err, columns) => {

            if(err){

                console.error(err);

                return;
            }

            const existeTipo =
                columns.some(

                    coluna =>

                        coluna.name ===
                        'tipo'
                );

            if(!existeTipo){

                db.run(

                    `ALTER TABLE produtos
                     ADD COLUMN tipo TEXT`,

                    err => {

                        if(err){

                            console.error(
                                'Erro ao criar coluna tipo:',
                                err
                            );

                        }else{

                            console.log(
                                'Coluna tipo criada.'
                            );
                        }
                    }
                );
            }
        }
    );

    db.run(`

        CREATE TABLE IF NOT EXISTS destinatarios (

            id INTEGER PRIMARY KEY AUTOINCREMENT,

            email TEXT NOT NULL UNIQUE,

            alerta_crc INTEGER NOT NULL DEFAULT 1,

            alerta_picking INTEGER NOT NULL DEFAULT 1,

            alerta_pulmao INTEGER NOT NULL DEFAULT 1
        )
    `);

    db.run(`

        CREATE TABLE IF NOT EXISTS usuarios (

            id INTEGER PRIMARY KEY AUTOINCREMENT,

            usuario TEXT NOT NULL UNIQUE,

            senha_hash TEXT NOT NULL
        )
    `);
});

module.exports = db;