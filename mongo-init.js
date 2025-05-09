db = db.getSiblingDB('admin');

db.createUser({
  user: "admin",
  pwd: "pass123",
  roles: [ { role: "root", db: "admin" } ]
});
