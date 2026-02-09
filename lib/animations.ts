export const animations = {
    coinShower: {
        initial: { y: -100, rotate: 0, opacity: 1 },
        animate: { y: 400, rotate: 360, opacity: 0 },
        transition: { duration: 2, ease: "easeIn" }
    },
    cardEntrance: {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5, staggerChildren: 0.1 }
    },
    glowPulse: {
        animate: {
            boxShadow: [
                "0 0 10px rgba(0, 217, 163, 0.3)",
                "0 0 25px rgba(0, 217, 163, 0.6)",
                "0 0 10px rgba(0, 217, 163, 0.3)"
            ]
        },
        transition: { duration: 2, repeat: Infinity }
    },
    buttonPress: {
        whileTap: { scale: 0.95 },
        transition: { type: "spring", stiffness: 400, damping: 10 }
    }
}
