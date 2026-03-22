import pool from "../config/db.js";

// GET questions for a practical
export const getQuestionsByPracticalId = async (req, res, next) => {
  const { id } = req.params;

  try {
    const result = await pool.query("SELECT * FROM quiz WHERE p_id = $1", [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "No questions found for this practical" });
    }

    // Format questions for frontend
    const formattedQuestions = result.rows.map(q => {
      const options = [
        { id: "correct", text: q.q_correct },
        { id: "wrong1", text: q.q_wrong_1 },
        { id: "wrong2", text: q.q_wrong_2 },
        { id: "wrong3", text: q.q_wrong_3 }
      ].filter(opt => opt.text && opt.text.trim() !== "");

      // Shuffle
      for (let i = options.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [options[i], options[j]] = [options[j], options[i]];
      }

      return {
        id: `q${q.q_id}`,
        question: q.q_question,
        options
      };
    });

    res.json(formattedQuestions);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

// POST – save quiz result
export const saveQuizResult = async (req, res) => {
  const { user_id, p_id, score, total_questions } = req.body;

  if (!user_id || !p_id || score === undefined || score === null) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    await pool.query(
      `INSERT INTO user_quiz_results (user_id, p_id, score, total_questions, completed_at)
       VALUES ($1, $2, $3, $4, NOW())
       ON CONFLICT (user_id, p_id) 
       DO UPDATE SET score = EXCLUDED.score, total_questions = EXCLUDED.total_questions, completed_at = NOW()`,
      [Number(user_id), Number(p_id), Number(score), Number(total_questions)]
    );
    res.json({ message: "Quiz result saved successfully" });
  } catch (err) {
    console.error("Quiz DB error:", err.message);
    res.status(500).json({ error: err.message });
  }
};