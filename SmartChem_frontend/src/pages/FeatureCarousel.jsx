"use client";

import React, { useState, useEffect, useCallback } from "react";
import "./FeatureCarousel.css";
import { motion, AnimatePresence } from "framer-motion";
import {
    FlaskConical,
    Atom,
    ShieldCheck,
    BarChart3,
    Microscope,
    Zap,
    BookOpen,
    Globe
} from "lucide-react"; // Using Lucide for consistency

// Chemistry Themed Features
const FEATURES = [
    {
        id: "titration",
        label: "Virtual Titration",
        icon: FlaskConical,
        image:
            "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80",
        description: "Master acid-base titration with precise virtual burettes and indicators.",
    },
    {
        id: "modeling",
        label: "3D Molecular Modeling",
        icon: Atom,
        image:
            "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=800&q=80",
        description: "Visualize complex molecular structures in interactive 3D space.",
    },
    {
        id: "safety",
        label: "Safety Protocols",
        icon: ShieldCheck,
        image:
            "https://images.unsplash.com/photo-1582719471137-c3967ffb1c42?auto=format&fit=crop&w=800&q=80",
        description: "Learn critical safety procedures before entering a real lab.",
    },
    {
        id: "analytics",
        label: "Real-time Analytics",
        icon: BarChart3,
        image:
            "https://images.unsplash.com/photo-1551288049-bbda38a10ad5?auto=format&fit=crop&w=800&q=80",
        description: "Track your experiment accuracy and learning progress instantly.",
    },
    {
        id: "microscope",
        label: "Digital Microscopy",
        icon: Microscope,
        image:
            "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=800&q=80",
        description: "Explore cellular structures with high-definition digital slides.",
    },
    {
        id: "reactions",
        label: "Reaction Simulation",
        icon: Zap,
        image:
            "https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?auto=format&fit=crop&w=800&q=80",
        description: "Observe chemical reactions safely without hazardous materials.",
    },
    {
        id: "theory",
        label: "Theory & Notes",
        icon: BookOpen,
        image:
            "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=800&q=80",
        description: "Access comprehensive theory notes aligned with your curriculum.",
    },
    {
        id: "community",
        label: "Global Community",
        icon: Globe,
        image:
            "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=800&q=80",
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
                    <div className="carousel-panel-gradient-top" />
                    <div className="carousel-panel-gradient-bottom" />

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
                                        <div className={`transition-colors duration-500 ${isActive ? "text-[#047857]" : "text-white/40"}`}>
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