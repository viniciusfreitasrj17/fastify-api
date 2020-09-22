if( !process.env.NODE_ENV || process.env.NODE_ENV === 'development' ) {
	require('dotenv').config()
}

module.exports = {
  dialect: process.env.CORE_DB_DIALECT || 'mysql',
  USER: process.env.CORE_MYSQL_USER,
  PASSWORD: process.env.CORE_MYSQL_PASSWORD,
  DB: process.env.CORE_MYSQL_DATABASE,
  HOST: process.env.CORE_MYSQL_HOST,
  PORT: parseInt(process.env.CORE_MYSQL_PORT),
  pool: {
    min: parseInt(process.env.CORE_MYSQL_POOL_MIN || 1),
    max: parseInt(process.env.CORE_MYSQL_POOL_MAX || 5)
  }

  // pool: {
  //   acquire: 30000,
  //   idle: 10000,
  // },

  // storage: process.env.CORE_SQLITE_FILENAME,
};
