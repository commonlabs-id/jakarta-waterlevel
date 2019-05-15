if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const credential = {
  projectId: process.env.JW_F_project_id,
  privateKey: Buffer.from(process.env.JW_F_private_key, "base64").toString(),
  clientEmail: process.env.JW_F_client_email
};

module.exports = credential;
