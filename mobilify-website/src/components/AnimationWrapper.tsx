'use client';

import { motion, MotionProps } from 'framer-motion';
import { useEffect, useState } from 'react';

interface AnimationWrapperProps extends MotionProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

const AnimationWrapper = ({ children, fallback = null, ...motionProps }: AnimationWrapperProps) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return <div {...(motionProps as any)}>{fallback || children}</div>;
  }

  return <motion.div {...motionProps}>{children}</motion.div>;
};

export default AnimationWrapper;
