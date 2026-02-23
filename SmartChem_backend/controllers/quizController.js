import pool from "../config/db.js";

// Get questions for a specific practical
// GET /api/quizzes/:id
export const getQuestionsByPracticalId = async (req, res, next) => {
    const { id } = req.params; // This is the p_id

    try {
        // Fetch questions from the 'quiz' table
        const result = await pool.query(
            "SELECT * FROM quiz WHERE p_id = $1",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "No questions found for this practical" });
        }

        // Transform database rows to match the frontend structure
        const formattedQuestions = result.rows.map((q) => {
            // Randomize options for a better quiz experience
            const options = [
                { id: "correct", text: q.q_correct },
                { id: "wrong1", text: q.q_wrong_1 },
                { id: "wrong2", text: q.q_wrong_2 },
                { id: "wrong3", text: q.q_wrong_3 }
            ].filter(opt => opt.text && opt.text.trim() !== ""); // Filter out empty options (like for True/False)

            // Shuffle options
            for (let i = options.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [options[i], options[j]] = [options[j], options[i]];
            }

            return {
                id: `q${q.q_id}`,
                question: q.q_question,
                options: options
            };
        });

        res.json(formattedQuestions);

    } catch (error) {
        console.error("Error fetching quiz questions:", error);
        next(error);
    }
};