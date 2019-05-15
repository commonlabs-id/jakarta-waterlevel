const admin = require("firebase-admin");

const sA = require("./service-account");

const config = {
  credential: admin.credential.cert(sA)
};

const getDB = () => {
  try {
    admin.initializeApp(config);
    console.log("Database initialized");
  } catch (err) {
    // we skip the "already exists" message which is
    // not an actual error when we're hot-reloading
    if (!/already exists/.test(err.message)) {
      console.error("Firebase initialization error", err.stack);
    }
  }

  const db = admin.firestore();
  return db;
};

const db = getDB();

module.exports = {
  db
};
