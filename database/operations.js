const { db } = require("./firestore");

const updateLevelsOnDate = async (date, doc) => {
  try {
    const ref = await db
      .collection("daily")
      .doc(date)
      .set(doc);
    return ref;
  } catch (e) {
    console.error(e);
    throw new Error(`Failed to update levels on date ${date}`);
  }
};

const readLevelsOnDate = async date => {
  try {
    const doc = await db
      .collection("daily")
      .doc(date)
      .get();
    return doc.data();
  } catch (e) {
    console.error(e);
    throw new Error(`Can't read levels on date ${date}`);
  }
};

module.exports = {
  updateLevelsOnDate,
  readLevelsOnDate
};
