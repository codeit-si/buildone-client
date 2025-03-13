import { motion } from "motion/react";

export default function LoadingText() {
  const text = "프로필 카드를 만드는 중...";

  const pullUpVariant = {
    initial: { y: 10, opacity: 0 },
    animate: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.05,
      },
    }),
  };

  return (
    <div className="flex items-center justify-center text-xl font-bold text-white">
      {text.split("").map((current, i) => (
        <motion.div
          key={`${current}-${i * 1}`}
          variants={pullUpVariant}
          initial="initial"
          animate="animate"
          custom={i}
        >
          {current === " " ? <span>&nbsp;</span> : current}
        </motion.div>
      ))}
    </div>
  );
}
