import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { useNavigate, useParams } from 'react-router-dom'; // Import useParams
import './Quiz.css';
import Footer from '../components/Footer';
import bannerImg from '../images/Quiz/QuizF.jpg';

const Quiz = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // Get the p_id from the URL (e.g., /quiz/1)

    const [started, setStarted] = useState(false);

    // States for Data Fetching
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Quiz Logic States
    const totalTime = 120;
    const [timeLeft, setTimeLeft] = useState(totalTime);
    const [timeSpent, setTimeSpent] = useState(0);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [score, setScore] = useState(0);

    // Fetch Questions on Component Mount
    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await fetch(`http://localhost:5001/api/quizzes/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch questions');
                }
                const data = await response.json();
                setQuestions(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchQuestions();
    }, [id]);

    // Timer Logic
    useEffect(() => {
        let timer;
        if (started && timeLeft > 0 && !submitted) {
            timer = setTimeout(() => {
                setTimeLeft(timeLeft - 1);
                setTimeSpent(timeSpent + 1);
            }, 1000);
        } else if (timeLeft === 0 && !submitted) {
            handleSubmit();
        }
        return () => clearTimeout(timer);
    }, [timeLeft, submitted, started, timeSpent]);

    const handleSelect = (qId, oId) => {
        if (!submitted) {
            setAnswers({ ...answers, [qId]: oId });
        }
    };

    const goNext = () => {
        if (currentIndex < questions.length - 1)
            setCurrentIndex(currentIndex + 1);
    };

    const goPrevious = () => {
        if (currentIndex > 0)
            setCurrentIndex(currentIndex - 1);
    };

    const handleSubmit = () => {
        let newScore = 0;
        questions.forEach(q => {
            // The logic relies on the option ID being "correct"
            if (answers[q.id] === "correct") newScore++;
        });
        setScore(newScore);
        setSubmitted(true);
    };

    const currentQuestion = questions[currentIndex];

    /* ================= START PAGE (WITH LOADING) ================= */
    if (!started) {
        if (loading) {
            return (
                <div className="quiz-start" style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white' }}>
                    <h2>Loading Quiz Questions...</h2>
                </div>
            );
        }

        if (error) {
            return (
                <div className="quiz-start" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: 'white' }}>
                    <h2>Error: {error}</h2>
                    <button className="start-btn" onClick={() => navigate(-1)}>Go Back</button>
                </div>
            );
        }

        return (
            <div
                className="quiz-start"
                style={{
                    backgroundImage: `url(${bannerImg})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    minHeight: "100vh",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    position: "relative"
                }}
            >
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        background: "rgba(0,0,0,0.35)"
                    }}
                />

                <div style={{ position: "relative", zIndex: 2 }}>
                    <h1 style={{
                        color: "#ffffff",
                        fontSize: "40px",
                        fontWeight: "bold",
                        marginBottom: "40px",
                        textShadow: "4px 4px 10px rgba(0,0,0,0.7)"
                    }}>
                        Welcome to the Advanced Chemistry Quiz
                    </h1>

                    <button
                        className="start-btn"
                        onClick={() => setStarted(true)}
                        style={{ marginRight: "15px" }}
                    >
                        Start Quiz
                    </button>

                    <button
                        className="start-btn"
                        onClick={() => navigate(-1)}
                    >
                        Exit Quiz
                    </button>
                </div>
            </div>
        );
    }

    /* ================= FEEDBACK PAGE ================= */
    if (submitted) {
        return (
            <div className="quiz-feedback-page">
                <h2 style={{ textAlign: "center", marginBottom: "30px" }}>
                    Quiz Feedback
                </h2>

                <div className="feedback-container">
                    {questions.map((q, idx) => {
                        const userAnswer = answers[q.id];

                        return (
                            <div key={q.id} className="question-card">
                                <h4>{idx + 1}. {q.question}</h4>

                                {q.options.map(opt => {
                                    let symbol = "";
                                    let className = "option";

                                    if (opt.id === "correct") {
                                        symbol = "✅";
                                        if (userAnswer === opt.id) {
                                            className += " correct-selected";
                                        } else {
                                            className += " correct-missed";
                                        }
                                    } else if (userAnswer === opt.id) {
                                        symbol = "❌";
                                        className += " wrong-selected";
                                    }

                                    return (
                                        <div key={opt.id} className={className}>
                                            {symbol} {opt.text}
                                        </div>
                                    );
                                })}
                            </div>
                        );
                    })}
                </div>

                <div style={{ textAlign: "center", marginTop: "20px" }}>
                    <button
                        className="start-btn"
                        onClick={() => window.location.reload()}
                    >
                        Retry Quiz
                    </button>

                    <button
                        className="start-btn"
                        onClick={() => navigate(-1)}
                        style={{ marginLeft: "10px" }}
                    >
                        Exit Quiz
                    </button>
                </div>

                <Footer />
            </div>
        );
    }

    /* ================= QUIZ BODY ================= */
    return (
        <motion.div
            className="quiz-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            <div className="timer">⏱️ Time Left: {timeLeft}s</div>

            <div className="question-card">
                <h4>{currentIndex + 1}. {currentQuestion?.question}</h4>

                {currentQuestion?.options.map(opt => (
                    <div
                        key={opt.id}
                        className={`option ${answers[currentQuestion.id] === opt.id ? "selected" : ""}`}
                        onClick={() => handleSelect(currentQuestion.id, opt.id)}
                    >
                        {opt.text}
                    </div>
                ))}

                <div className="navigation-buttons">
                    <button onClick={goPrevious} disabled={currentIndex === 0}>
                        Previous
                    </button>

                    {currentIndex < questions.length - 1 ? (
                        <button onClick={goNext}>Next</button>
                    ) : (
                        <button onClick={handleSubmit}>Submit</button>
                    )}
                </div>
            </div>

            <Footer />
        </motion.div>
    );
};

export default Quiz;