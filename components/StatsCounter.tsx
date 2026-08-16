'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Users, Utensils, Award, Star } from 'lucide-react';

interface StatItemProps {
  icon: React.ElementType;
  value: number;
  suffix: string;
  label: string;
  delay: number;
}

const StatItem: React.FC<StatItemProps> = ({ icon: Icon, value, suffix, label, delay }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2000;
      const stepTime = 30;
      const steps = duration / stepTime;
      const increment = value / steps;

      const timer = setInterval(() => {
        start += increment;
        if (start >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, stepTime);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 25 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center text-center space-y-3"
    >
      <div className="w-14 h-14 rounded-2xl bg-[#c9a263]/10 border border-[#c9a263]/20 flex items-center justify-center text-[#c9a263]">
        <Icon className="w-6 h-6" />
      </div>
      <div className="font-serif-display text-4xl sm:text-5xl font-normal text-[#1c1917] tracking-tight">
        {count}
        <span className="text-[#c9a263]">{suffix}</span>
      </div>
      <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-stone-500">
        {label}
      </div>
    </motion.div>
  );
};

export const StatsCounter: React.FC = () => {
  const stats = [
    { icon: Users, value: 800, suffix: '+', label: 'Happy Guests Daily' },
    { icon: Utensils, value: 40, suffix: '+', label: 'Curated Delicacies' },
    { icon: Award, value: 15, suffix: '+', label: 'Years of Heritage' },
    { icon: Star, value: 5, suffix: '★', label: 'Guest Rating' },
  ];

  return (
    <section className="py-16 bg-white border-t border-b border-[#e8e2d8]">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
          {stats.map((stat, idx) => (
            <StatItem key={idx} {...stat} delay={idx * 0.12} />
          ))}
        </div>
      </div>
    </section>
  );
};
