// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      host: process.env.host || 'localhost',
      database: process.env.database || 'final_project',
      user:     process.env.user || 'postgres',
      password: process.env.password || '1234',
      port: process.env.port || 5432
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './db/migrations',
      tableName: 'knex_migrations'
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './db/migrations',
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      host: process.env.host || 'localhost',
      database: process.env.database || 'final_project',
      user:     process.env.user || 'postgres',
      password: process.env.password || '1234',
      port: process.env.port || 5432
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './db/migrations',
      tableName: 'knex_migrations'
    }
  }

};
