import pool from "./config/db.js";

async function checkData() {
    try {
        const res = await pool.query("SELECT * FROM equipment WHERE e_id = 1");
        console.log("Equipment ID 1 Data:");
        console.table(res.rows);
    } catch (err) {
        console.error(err);
    } finally {
        pool.end();
    }
}

checkData();
