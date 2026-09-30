import {motion} from 'framer-motion'

const CircleCard = () => {
  return (
    <>
    <motion.div className="circle-container" animate={{
        y: [0, -100, 0], // bounce up and down
        backgroundColor: ["#ff0000", "#00ff00", "#0000ff"], // color cycle
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      >
        </motion.div></>
  )
}

export default CircleCard
