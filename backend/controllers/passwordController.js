const { pool } = require('../config/db')
const cryptojs = require('crypto-js')

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY

const getPasswords = async (req, res) => {
  try {
    const userId = req.user.id;
    const result = await pool.query(
      "SELECT id, site, username, password_encrypted FROM passwords WHERE user_id=$1",
      [userId]
    )

    const passwords = result.rows.map(p => ({
      id: p.id,
      site: p.site,
      username: p.username,
      password: cryptojs.AES.decrypt(p.password_encrypted, ENCRYPTION_KEY)
        .toString(cryptojs.enc.Utf8)
    }))

    res.json(passwords)
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch passwords" })
  }
}

const addPassword = async (req, res) => {
  try {
    const userId = req.user.id;
    const { site, username, password } = req.body;

    const encrypted = cryptojs.AES.encrypt(password, ENCRYPTION_KEY).toString();
    await pool.query(
      "INSERT INTO passwords (user_id, site, username, password_encrypted) VALUES ($1,$2,$3,$4)",
      [userId, site, username, encrypted]
    );

    res.json({ message: "Password added successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to add password" });
  }
};

const updatePassword = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const { site, username, password } = req.body;

    const encrypted = cryptojs.AES.encrypt(password, ENCRYPTION_KEY).toString();

    const result = await pool.query(
      "UPDATE passwords SET site=$1, username=$2, password_encrypted=$3 WHERE id=$4 AND user_id=$5 RETURNING *",
      [site, username, encrypted, id, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Password not found" });
    }

    res.json({ message: "Password updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update password" });
  }
};

const deletePassword = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    await pool.query("DELETE FROM passwords WHERE id=$1 AND user_id=$2", [id, userId]);
    res.json({ message: "Password deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete password" });
  }
};

module.exports = { getPasswords, addPassword, updatePassword, deletePassword };