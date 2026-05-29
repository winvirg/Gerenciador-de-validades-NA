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
});

module.exports = db;