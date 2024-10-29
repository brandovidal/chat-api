db = db.getSiblingDB('admin');
db.auth(
  process.env.DATABASE_ROOT_USERNAME,
  process.env.DATABASE_ROOT_PASSWORD,
);

db = db.getSiblingDB(process.env.DATABASE_NAME);
db.createUser({
  user: process.env.DATABASE_USER,
  pwd: process.env.DATABASE_PASSWORD,
  roles: [
    {
      role: 'readWrite',
      db: process.env.DATABASE_NAME,
    },
  ],
});

const collection = process.env.DATABASE_COLLECTION;
db.createCollection(collection);

db[collection].insertMany([
  {
    title: 'github',
    link: 'https://github.com/',
  },
]);
