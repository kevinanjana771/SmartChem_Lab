import pool from "../config/db.js";

export const getEquipmentById = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "SELECT e_name, e_description FROM equipment WHERE e_id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Equipment not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
