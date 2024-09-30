'use client'
import { motion } from 'framer-motion'

const variants = {
  hidden: { opacity: 0 },
  enter: { opacity: 1 },
  exit: { opacity: 0 },
}

function PageLoading() {
  return (
    <motion.main
      variants={variants}
      initial="hidden"
      animate="enter"
      exit="exit"
      transition={{ type: 'linear' }}
      className="flex items-center justify-center h-screen"
    >
      <motion.div
        className="w-12 h-12 bg-black rounded-full"
        animate={{
          y: ["0%", "-50%"], // Increase bounce height
        }}
        transition={{
          duration: 0.5,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
    </motion.main>
  )
}

export default PageLoading;
