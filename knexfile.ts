const path = require("path");

 const knextfile = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: path.resolve(__dirname, "src", "database", "database.db")
    },
    pool: {
      afterCreate: (conn:any, cb: any) => conn.run("PRAGMA foreign_keys = ON", cb)
    },
    migrations: {
      directory: path.resolve(__dirname, "src", "database", "knex", "migrations")
    },
   

   seeds:{
    extension: "ts",
    directory: path.resolve(__dirname, "src", "database", "seeds")    
   },
   useNullAsDefault: true,
  }

};
export default knextfile;