
import styles from "./Sidebar.module.scss";
import { ISidebarItemProps, SidebarItem } from "./SidebarItem";
import { SidebarTitle } from "./SidebarTitle";
import { motion } from "framer-motion";
import { useState, useContext } from "react";
import { fadeInChildren, fadeInChild } from "utils/motion";
import { Map, ChevronRight, Clients } from "components/icons";
import { AdminContext } from "contexts/admin";


export const Sidebar = () => {
  const [showSidebarMobile, setShowSidebarMobile] = useState(false);

  const { routes } = useContext(AdminContext);

  const toggleSidebarMobile = () => {
    setShowSidebarMobile(!showSidebarMobile);
  };

  const sidebarItems: ISidebarItemProps[] = [
    {
      label: "Plano",
      path: "/admin",
      Icon: Map
    },
    // {
    //   label: "Clientes",
    //   path: `/admin/${routes.clients}`,
    //   Icon: Clients
    // },
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
