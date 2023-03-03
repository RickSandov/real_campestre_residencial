import styles from "./Sidebar.module.scss";
import { motion } from "framer-motion";
import { fadeInChild, toogleRotate } from "utils/motion";
import { Flower } from "components/icons";



export const SidebarTitle = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <motion.div className={styles.title} variants={fadeInChild()}>
      {/* Logo */}
      <Flower />
      <p>Real Campestre</p>
    </motion.div>
  );
};
