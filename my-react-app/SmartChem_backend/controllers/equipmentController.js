import pool from "../config/db.js";

export const getEquipmentById = async (req, res, next) => {
    const { id } = req.params;

    try {
        // 1. Fetch Equipment Details
        const equipResult = await pool.query(
            "SELECT e_id, e_name, e_description FROM equipment WHERE e_id = $1",
            [id]
        );

        if (equipResult.rows.length === 0) {
            return res.status(404).json({ message: "Equipment not found" });
        }

        // 2. Fetch Parts related to this equipment using e_id
        // We use the id (e_id) from the URL to find matching parts
        const partsResult = await pool.query(
            "SELECT part_name, part_description FROM parts WHERE e_id = $1",
            [id]
        );

        // 3. Combine the data into a single response object
        const equipmentData = equipResult.rows[0];
        const partsData = partsResult.rows;

        // Return equipment data + a 'parts' array
        res.json({
            ...equipmentData,
            parts: partsData
        });

    } catch (error) {
        next(error);
    }
};