import Image from "next/image";
import styles from "./Sidebar.module.scss";
import { ISidebarItemProps, SidebarItem } from "./SidebarItem";
import { SidebarTitle } from "./SidebarTitle";
import { motion } from "framer-motion";
import { useState } from "react";
import { fadeInChildren, fadeInChild } from "utils/motion";
import { Map, ChevronRight } from "components/icons";


export const Sidebar = () => {
  const [showSidebarMobile, setShowSidebarMobile] = useState(false);

  const toggleSidebarMobile = () => {
    setShowSidebarMobile(!showSidebarMobile);
  };

  const sidebarItems: ISidebarItemProps[] = [
    {
      label: "Plano",
      path: "/admin",
      Icon: Map
    },
  ];

  return (
    <motion.div
      className={`${styles.container} ${showSidebarMobile ? styles.showSidebarMobile : styles.hideSidebarMobile
        }
        `}
      variants={fadeInChildren()}
      initial="hidden"
      animate="visible"
    >
      <div className={styles.sidebarItems}>
        <SidebarTitle isOpen={showSidebarMobile} />
        {sidebarItems.map((item) => (
          <SidebarItem
            {...item}
            key={item.label}
          />
        ))}
      </div>

      {/* <motion.div variants={fadeInChild()}>
        <Line />
      </motion.div> */}

      <motion.div
        variants={fadeInChild()}
        className={styles.rightArrow}
        onClick={toggleSidebarMobile}
      >
        <ChevronRight />
      </motion.div>
    </motion.div>
  );
};
