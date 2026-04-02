import pool from "../config/db.js";

// GET /api/reports/user/:userId
export const getUserReport = async (req, res, next) => {
    const { userId } = req.params;

    try {
        // 1. Total Equipment vs Viewed Equipment
        const totalEquipResult = await pool.query("SELECT COUNT(*) FROM equipment");
        const totalEquipment = parseInt(totalEquipResult.rows[0].count, 10);

        const viewedEquipResult = await pool.query(
            "SELECT COUNT(DISTINCT e_id) FROM user_equipment_views WHERE user_id = $1",
            [userId]
        );
        const viewedEquipment = parseInt(viewedEquipResult.rows[0].count, 10);

        // 2. Completed Practicals (IDs)
        const completedPracticalsResult = await pool.query(
            "SELECT DISTINCT p_id FROM user_completed_practicals WHERE user_id = $1 ORDER BY p_id ASC",
            [userId]
        );
        const completedPracticals = completedPracticalsResult.rows.map(row => Number(row.p_id));

        // 3. Quiz Scores (ordered by practical ID or completion date for chart)
        // We will fetch scores ordered by p_id to match the practical number graph
        const quizScoresResult = await pool.query(
            "SELECT p_id, score, total_questions FROM user_quiz_results WHERE user_id = $1 ORDER BY p_id ASC",
            [userId]
        );

        // Prepare arrays for the chart: it expects scores mapped closely to practicals
        // Let's create an array of scores. We can map `p_id` to its score.
        // Frontend expects just an array of `quizScores`. We will return a structured list.
        const quizScoresData = quizScoresResult.rows.map(row => {
            const score = parseFloat(row.score);
            const total = parseFloat(row.total_questions);
            return {
                p_id: row.p_id,
                score: score,
                total_questions: total,
                chart_score: total > 0 ? Math.round((score / total) * 10) : 0
            };
        });

        res.json({
            equipment: {
                total: totalEquipment,
                viewed: viewedEquipment
            },
            completedPracticals,
            quizScores: quizScoresData
        });

    } catch (error) {
        console.error("Error fetching user report:", error);
        next(error);
    }
};

// DELETE /api/reports/reset/:userId
export const resetUserProgress = async (req, res, next) => {
    const { userId } = req.params;

    try {
        await pool.query("DELETE FROM user_equipment_views WHERE user_id = $1", [userId]);
        await pool.query("DELETE FROM user_completed_practicals WHERE user_id = $1", [userId]);
        await pool.query("DELETE FROM user_quiz_results WHERE user_id = $1", [userId]);

        res.json({ message: "User progress reset successfully" });
    } catch (error) {
        console.error("Error resetting user progress:", error);
        next(error);
    }
};