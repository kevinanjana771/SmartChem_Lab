import pool from "../config/db.js";

// Fetch all equipment for the grid
export const getAllEquipment = async (req, res, next) => {
    try {
        const result = await pool.query(
            "SELECT e_id, e_name, img, model_scale FROM equipment ORDER BY e_id ASC"
        );
        res.json(result.rows);
    } catch (error) {
        next(error);
    }
};

// Fetch specific equipment details, parts, and 3D model info
export const getEquipmentById = async (req, res, next) => {
    const { id } = req.params;

    try {
        // 1. Fetch Equipment Details (including 3D model metadata)
        const equipResult = await pool.query(
            "SELECT e_id, e_name, e_description, img, model_filename, model_scale FROM equipment WHERE e_id = $1",
            [id]
        );

        if (equipResult.rows.length === 0) {
            return res.status(404).json({ message: "Equipment not found" });
        }

        // 2. Fetch Parts related to this equipment
        const partsResult = await pool.query(
            "SELECT part_name, part_description FROM parts WHERE e_id = $1",
            [id]
        );

        const equipmentData = equipResult.rows[0];

        // Return structured data
        res.json({
            ...equipmentData,
            image: equipmentData.img && equipmentData.img.length > 0 ? equipmentData.img[0] : null,
            parts: partsResult.rows
        });

    } catch (error) {
        next(error);
    }
};

// Update equipment scale in database
export const updateEquipmentScale = async (req, res, next) => {
    const { id } = req.params;
    const { model_scale } = req.body;

    try {
        const result = await pool.query(
            "UPDATE equipment SET model_scale = $1 WHERE e_id = $2 RETURNING *",
            [model_scale, id]
        );
        
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Equipment not found" });
        }

        res.json({ message: "Scale updated successfully", equipment: result.rows[0] });
    } catch (error) {
        next(error);
    }
};