import { OAuth2Client } from "google-auth-library";
import pool from "../config/db.js";
import jwt from "jsonwebtoken";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleLogin = async (req, res, next) => {
  try {
    const { token } = req.body;

    //Verify token with Google
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    const { sub, name, email, picture } = payload;

    //Check if user already exists in DB
    const existingUser = await pool.query(
      "SELECT * FROM users WHERE email=$1",
      [email]
    );

    let user;

    //If not exists → Insert new user
    if (existingUser.rows.length === 0) {
      const newUser = await pool.query(
        "INSERT INTO users (google_id, name, email, avatar) VALUES ($1,$2,$3,$4) RETURNING *",
        [sub, name, email, picture]
      );

      user = newUser.rows[0];
    } else {
      user = existingUser.rows[0];
    }

    //Create JWT Token
    const jwtToken = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    //Send response
    res.json({
      user,
      token: jwtToken,
    });
  } catch (error) {
    next(error);
  }
};
