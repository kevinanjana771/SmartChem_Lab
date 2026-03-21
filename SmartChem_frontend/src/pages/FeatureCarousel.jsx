"use client";

import React, { useState, useEffect, useCallback } from "react";
import "./FeatureCarousel.css";
import { motion, AnimatePresence } from "framer-motion";
import {
    ShieldCheck,
    BarChart3,
    BookOpen,
    Globe,
    ClipboardList,
    Rotate3d,
    HelpCircle,
} from "lucide-react"; // Using Lucide for consistency
import Practical from "../images/Feature/practicale sutie.png";
import safety from "../images/Feature/Lab-safety.png";
import GC from "../images/Feature/global-community.jpg";
import SQ from "../images/Feature/quiz.jpg";    
import view from "../images/Feature/3D-view.png";
import tracking from "../images/Feature/tracking.jpg";
import theory from "../images/Feature/theory.jpg";
// Chemistry Themed Features
const FEATURES = [
    {
        id: "al-practicals",
        label: "A/L Practical Suite",
        icon: ClipboardList,
        image:
            Practical, // Replace with actual image path
        description: "Access all 42 A/L Chemistry practicals with step-by-step virtual guidance.",
    },
    {
        id: "360-view",
        label: "3D 360° View",
        icon: Rotate3d,
        image:
            view,
        description: "Inspect lab equipment and molecules from every angle with full 360° rotation.",
    },
    {
        id: "safety",
        label: "Safety Protocols",
        icon: ShieldCheck,
        image:
            safety,
        description: "Learn critical safety procedures before entering a real lab.",
    },
    {
        id: "analytics",
        label: "Real-time Analytics",
        icon: BarChart3,
        image:
            tracking,
        description: "Track your experiment accuracy and learning progress instantly.",
    },
    {
        id: "theory",
        label: "Theory & Notes",
        icon: BookOpen,
        image:
            theory,
        description: "Access comprehensive theory notes aligned with your curriculum.",
    },
    {
        id: "quiz",
        label: "Smart Quizzes",
        icon: HelpCircle, 
        image:
            SQ,
        description: "Test your knowledge with AI-generated quizzes tailored to your syllabus.",
    },
    {
        id: "community",
        label: "Global Community",
        icon: Globe,
        image:
            GC,
        description: "Connect with students and educators worldwide to solve problems.",
    },
];

const AUTO_PLAY_INTERVAL = 1500;
const ITEM_HEIGHT = 65;

const wrap = (min, max, v) => {
    const rangeSize = max - min;
    return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

export function FeatureCarousel() {
    const [step, setStep] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    const currentIndex =
        ((step % FEATURES.length) + FEATURES.length) % FEATURES.length;

    const nextStep = useCallback(() => {
        setStep((prev) => prev + 1);
    }, []);

    const handleChipClick = (index) => {
        const diff = (index - currentIndex + FEATURES.length) % FEATURES.length;
        if (diff > 0) setStep((s) => s + diff);
    };

    useEffect(() => {
        if (isPaused) return;
        const interval = setInterval(nextStep, AUTO_PLAY_INTERVAL);
        return () => clearInterval(interval);
    }, [nextStep, isPaused]);

    const getCardStatus = (index) => {
        const diff = index - currentIndex;
        const len = FEATURES.length;

        let normalizedDiff = diff;
        if (diff > len / 2) normalizedDiff -= len;
        if (diff < -len / 2) normalizedDiff += len;

        if (normalizedDiff === 0) return "active";
        if (normalizedDiff === -1) return "prev";
        if (normalizedDiff === 1) return "next";
        return "hidden";
    };

    return (
        <div className="feature-carousel-section">
            <div className="carousel-container">
                {/* Left Panel: Text List */}
                <div className="carousel-panel">
                    <div className="carousel-list-wrapper">
                        {FEATURES.map((feature, index) => {
                            const isActive = index === currentIndex;
                            const distance = index - currentIndex;
                            const wrappedDistance = wrap(
                                -(FEATURES.length / 2),
                                FEATURES.length / 2,
                                distance
                            );
                            const Icon = feature.icon;

                            return (
                                <motion.div
                                    key={feature.id}
                                    style={{
                                        height: ITEM_HEIGHT,
                                        width: "fit-content",
                                    }}
                                    animate={{
                                        y: wrappedDistance * ITEM_HEIGHT,
                                        opacity: 1 - Math.abs(wrappedDistance) * 0.25,
                                    }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 90,
                                        damping: 22,
                                        mass: 1,
                                    }}
                                    className="absolute flex items-center justify-start"
                                >
                                    <button
                                        onClick={() => handleChipClick(index)}
                                        onMouseEnter={() => setIsPaused(true)}
                                        onMouseLeave={() => setIsPaused(false)}
                                        className={`carousel-item-btn ${isActive ? "active" : ""}`}
                                    >
                                        <div className={`transition-colors duration-500 ${isActive ? "text-[#047857]" : "text-black/40"}`}>
                                            <Icon size={18} strokeWidth={2} />
                                        </div>
                                        <span>{feature.label}</span>
                                    </button>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                {/* Right Panel: Image Display */}
                <div className="carousel-display">
                    <div className="relative w-full max-w-[420px] aspect-[4/5] flex items-center justify-center">
                        {FEATURES.map((feature, index) => {
                            const status = getCardStatus(index);
                            const isActive = status === "active";
                            const isPrev = status === "prev";
                            const isNext = status === "next";

                            return (
                                <motion.div
                                    key={feature.id}
                                    initial={false}
                                    animate={{
                                        x: isActive ? 0 : isPrev ? -100 : isNext ? 100 : 0,
                                        scale: isActive ? 1 : isPrev || isNext ? 0.85 : 0.7,
                                        opacity: isActive ? 1 : isPrev || isNext ? 0.4 : 0,
                                        rotate: isPrev ? -3 : isNext ? 3 : 0,
                                        zIndex: isActive ? 20 : isPrev || isNext ? 10 : 0,
                                        pointerEvents: isActive ? "auto" : "none",
                                    }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 260,
                                        damping: 25,
                                        mass: 0.8,
                                    }}
                                    className={`carousel-image-card ${!isActive ? "inactive" : ""}`}
                                >
                                    <img
                                        src={feature.image}
                                        alt={feature.label}
                                        className="carousel-img"
                                    />

                                    <AnimatePresence>
                                        {isActive && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 10 }}
                                                className="carousel-card-content"
                                            >
                                                <div className="carousel-badge">
                                                    {index + 1} • {feature.label}
                                                </div>
                                                <p className="carousel-desc">
                                                    {feature.description}
                                                </p>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FeatureCarousel;