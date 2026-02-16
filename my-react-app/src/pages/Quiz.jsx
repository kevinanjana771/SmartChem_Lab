import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import './Quiz.css';
import Footer from '../components/Footer';
import certBg from '../images/Quiz/certificate.jpeg';
import bannerImg from '../images/Quiz/QuizF.jpg';

const Quiz = () => {
    const navigate = useNavigate();
    const [started, setStarted] = useState(false);

    const questions = [
        {
            id: "q1",
            question: "What is the primary function of a conical flask?",
            options: [
                { id: "correct", text: "To hold liquids and perform mixing/titration" },
                { id: "wrong1", text: "To measure precise volumes" },
                { id: "wrong2", text: "To heat substances to high temperatures" },
                { id: "wrong3", text: "To store acids only" }
            ]
        },
        {
            id: "q2",
            question: "Which equipment is best used to transfer small amounts of liquid?",
            options: [
                { id: "wrong1", text: "Beaker" },
                { id: "correct", text: "Dropper" },
                { id: "wrong2", text: "Funnel" },
                { id: "wrong3", text: "Test tube" }
            ]
        },
        {
            id: "q3",
            question: "Always wear safety goggles when handling chemicals.",
            options: [
                { id: "correct", text: "True" },
                { id: "wrong", text: "False" }
            ]
        },
    ];

    const totalTime = 120;
    const [timeLeft, setTimeLeft] = useState(totalTime);
    const [timeSpent, setTimeSpent] = useState(0);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [score, setScore] = useState(0);
    const [showFeedback, setShowFeedback] = useState(false);

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
            if (answers[q.id] === "correct") newScore++;
        });
        setScore(newScore);
        setSubmitted(true);
        setShowFeedback(true);
    };

    const currentQuestion = questions[currentIndex];

    /* ================= START PAGE ================= */
    if (!started) {
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
    if (submitted && showFeedback) {
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
                        onClick={() => setShowFeedback(false)}
                        style={{ marginLeft: "10px" }}
                    >
                        View Certificate
                    </button>
                </div>

                <Footer />
            </div>
        );
    }

    /* ================= CERTIFICATE PAGE ================= */
    if (submitted && !showFeedback) {
        const minutes = Math.floor(timeSpent / 60);
        const seconds = timeSpent % 60;

        return (
            <div
                className="certificate"
                style={{
                    backgroundImage: `url(${certBg})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    padding: "220px 20px",
                    textAlign: "center",
                    minHeight: "100vh",
                    fontFamily: "'Playfair Display', serif"
                }}
            >
                <h1 style={{
                    fontSize: "60px",
                    fontWeight: "bold",
                    letterSpacing: "3px",
                    marginBottom: "20px",
                    color: "#2c3e50",
                    textTransform: "uppercase"
                }}>
                    Certificate of Completion
                </h1>

                <p style={{ fontSize: "22px", marginBottom: "15px" }}>
                    This is to certify that you have successfully completed the quiz.
                </p>

                <h2 style={{ fontSize: "30px", margin: "20px 0" }}>
                    Score: {score} / {questions.length}
                </h2>

                <p style={{ fontSize: "20px" }}>
                    Time Spent: {minutes} min {seconds} sec
                </p>

                <br />

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
                <h4>{currentIndex + 1}. {currentQuestion.question}</h4>

                {currentQuestion.options.map(opt => (
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