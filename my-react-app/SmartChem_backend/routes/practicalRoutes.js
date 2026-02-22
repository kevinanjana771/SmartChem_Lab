import express from "express";
import pool from "../config/db.js";

const router = express.Router();

/* =========================================
   GET ALL PRACTICALS
   GET /api/practicals
========================================= */
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM practical ORDER BY p_id ASC"
    );

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

/* =========================================
   GET EQUIPMENTS FOR PRACTICAL
   GET /api/practicals/:id/equipments
========================================= */
router.get("/:id/equipments", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `
      SELECT e.*, pe.zone_id, pe.shelf_order
      FROM practical_equipments pe
      JOIN equipment e ON pe.e_id = e.e_id
      WHERE pe.p_id = $1
      ORDER BY pe.shelf_order ASC
      `,
      [id]
    );

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});


/* =========================================
   GET SINGLE PRACTICAL
   GET /api/practicals/:id
========================================= */
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "SELECT * FROM practical WHERE p_id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Practical not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});



export default router;
