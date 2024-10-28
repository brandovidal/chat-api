db = db.getSiblingDB('admin');
db.auth(
  process.env.MONGO_INITDB_ROOT_USERNAME,
  process.env.MONGO_INITDB_ROOT_PASSWORD,
);

db = db.getSiblingDB(process.env.MONGO_INITDB_DATABASE);
db.createUser({
  user: process.env.MONGO_USER,
  pwd: process.env.MONGO_PASSWORD,
  roles: [
    {
      role: 'readWrite',
      db: process.env.MONGO_INITDB_DATABASE,
    },
  ],
});

const collection = process.env.MAIN_DB_COLLECTION;
db.createCollection(collection);

db[collection].insertMany([
  {
    title: 'github',
    link: 'https://github.com/',
  },
]);
