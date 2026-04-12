"use client";

import { motion, Variants } from "framer-motion";
import React from "react";

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.19, 1, 0.22, 1],
    },
  },
};

export function StaggeredEntry({
  children,
  className = "w-full space-y-16",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className={className}
    >
      {React.Children.map(children, (child) => {
        if (!child) return null;
        return <motion.div variants={item}>{child}</motion.div>;
      })}
    </motion.div>
  );
}

export function StaggeredItem({ children }: { children: React.ReactNode }) {
  return <motion.div variants={item}>{children}</motion.div>;
}
