import { useRouter } from "next/router";
import styles from "./Sidebar.module.scss";
import { useMemo, FC } from 'react';
import { motion } from "framer-motion";

export interface ISidebarItemProps {
  label: string;
  path: string;
  Icon: FC;
}

export const SidebarItem: React.FC<ISidebarItemProps> = ({
  label,
  path,
  Icon
}) => {
  const router = useRouter();

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  const handleClick = () => {
    router.push(`${path}`);
  };

  const isActive = useMemo(
    () => router.asPath === path,
    [router.asPath, path]
  );

  return (
    <motion.div
      className={`${styles.sidebarItem} ${isActive ? styles.sidebarItemActive : ""
        }`}
      variants={item}
      onClick={handleClick}
    >
      <Icon />
      <p className={styles.label}>{label}</p>
    </motion.div>
  );
};
