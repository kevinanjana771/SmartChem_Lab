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

// Get steps for a specific practical
// GET /api/practicals/:id/steps
export const getPracticalSteps = async (req, res, next) => {
    const { id } = req.params;
    try {
        const result = await pool.query(
            "SELECT * FROM practical_steps WHERE p_id = $1 ORDER BY step_num ASC",
            [id]
        );

        res.json(result.rows);
    } catch (error) {
        next(error);
    }
};

// Get equipments for a specific practical (RESTORED LOGIC)
// GET /api/practicals/:id/equipments
export const getPracticalEquipments = async (req, res, next) => {
    const { id } = req.params;
    try {
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
        next(error);
    }
};