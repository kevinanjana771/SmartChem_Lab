import pool from "../config/db.js";

// Get all practicals
// GET /api/practicals
export const getAllPracticals = async (req, res, next) => {
    try {
        const result = await pool.query("SELECT * FROM practical ORDER BY p_id ASC");
        res.json(result.rows);
    } catch (error) {
        next(error);
    }
};

// Get a single practical by ID
// GET /api/practicals/:id
export const getPracticalById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const result = await pool.query("SELECT * FROM practical WHERE p_id = $1", [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Practical not found" });
        }

        res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
};