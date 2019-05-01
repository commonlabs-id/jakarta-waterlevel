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

const updateLevelsOnDate = async (date, doc) => {
  try {
    await db
      .collection("levels")
      .doc(date)
      .set(doc);
  } catch (e) {
    console.error(e);
    throw new Error(`Failed to update levels on date ${date}`);
  }
};

const readLevelsOnDate = async date => {
  try {
    const doc = await db
      .collection("levels")
      .doc(date)
      .get();
    return doc.data();
  } catch (e) {
    console.error(e);
    throw new Error(`Can't read levels on date ${date}`);
  }
};

const db = getDB();

module.exports = {
  db,
  updateLevelsOnDate,
  readLevelsOnDate
};
