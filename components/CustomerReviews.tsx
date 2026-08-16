'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

export const CustomerReviews: React.FC = () => {
  const reviews = [
    {
      name: 'Rohan Sharma',
      image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=100',
      rating: 5,
      text: 'Absolutely fantastic dining experience! The ambiance is stunning and the authentic Maharashtrian thali was the best I have ever had. A must-visit for family dinners.',
      date: '2 weeks ago'
    },
    {
      name: 'Sneha Patil',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100',
      rating: 5,
      text: 'We celebrated our anniversary here and the staff made us feel like royalty. The Dal Makhani and Garlic Naan were out of this world. Five stars without a doubt!',
      date: '1 month ago'
    },
    {
      name: 'Amit Deshmukh',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100',
      rating: 5,
      text: 'Great restaurant, easily accessible with valet parking. The food is consistently delicious and the premium interior makes it perfect for business lunches.',
      date: '3 weeks ago'
    }
  ];

  return (
    <section className="relative py-20 bg-[#faf8f5] overflow-hidden">
      {/* Background Texture */}
      <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #c9a263 1px, transparent 0)', backgroundSize: '40px 40px' }} />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-2xl mx-auto mb-14 space-y-4"
        >
          <div className="flex items-center justify-center space-x-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#a8874d]">
            <div className="w-8 h-px bg-[#c9a263]/50" />
            <span>Testimonials</span>
            <div className="w-8 h-px bg-[#c9a263]/50" />
          </div>
          <h2 className="font-serif-display text-4xl sm:text-5xl font-normal text-[#1c1917]">
            Guest <span className="italic text-[#a8874d]">Experiences</span>
          </h2>
        </motion.div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.12 }}
              className="relative bg-white p-7 rounded-3xl border border-[#e8e2d8] hover:border-[#c9a263]/40 hover:shadow-xl transition-all duration-500 group"
            >
              
              {/* Quote Icon */}
              <div className="absolute -top-4 right-6 w-9 h-9 bg-[#1c1917] text-[#c9a263] rounded-xl flex items-center justify-center shadow-lg group-hover:bg-[#c9a263] group-hover:text-white transition-all">
                <Quote className="w-4 h-4 fill-current" />
              </div>

              {/* Rating */}
              <div className="flex space-x-0.5 text-[#c9a263] mb-5">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>

              {/* Text */}
              <p className="text-stone-600 font-light italic leading-relaxed text-sm mb-7">
                "{review.text}"
              </p>

              {/* User Profile */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <img
                    src={review.image}
                    alt={review.name}
                    className="w-10 h-10 rounded-full object-cover border-2 border-[#e8e2d8]"
                  />
                  <div>
                    <h4 className="font-medium text-sm text-[#1c1917]">
                      {review.name}
                    </h4>
                    <div className="text-[10px] text-stone-400 font-light">
                      {review.date}
                    </div>
                  </div>
                </div>
                <div className="text-[9px] font-semibold uppercase tracking-widest text-[#a8874d] bg-[#c9a263]/10 px-2.5 py-1 rounded-full">
                  Verified
                </div>
              </div>

            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
