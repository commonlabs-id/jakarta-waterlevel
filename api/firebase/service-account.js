if (process.env.NODE_ENV !== "production") {
  require("now-env");
}

const credential = {
  type: "service_account",
  project_id: process.env.JW_F_project_id,
  private_key_id: process.env.JW_F_private_key_id,
  private_key: Buffer.from(process.env.JW_F_private_key, "base64").toString(),
  client_email: process.env.JW_F_client_email,
  client_id: process.env.JW_F_client_id,
  auth_uri: process.env.JW_F_auth_uri,
  token_uri: process.env.JW_F_token_uri,
  auth_provider_x509_cert_url: process.env.JW_F_auth_provider_x509_cert_url,
  client_x509_cert_url: process.env.JW_F_client_x509_cert_url
};

module.exports = credential;
