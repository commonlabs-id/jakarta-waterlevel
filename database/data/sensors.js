require("dotenv").config();
const { db } = require("../api/firebase/firestore");

db.collection("sensors")
  .get()
  .then(snapshot => {
    const res = [];
    snapshot.forEach(doc => {
      res.push({
        ...doc.data(),
        name: doc.id
      });
    });
    return res;
  })
  .then(console.log);
