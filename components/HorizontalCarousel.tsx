// components/HorizontalCarousel.tsx
import React from 'react';
import { ScrollView } from 'react-native';

interface HorizontalCarouselProps {
  children: React.ReactNode;
}

const HorizontalCarousel: React.FC<HorizontalCarouselProps> = ({ children }) => (
  <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={{ paddingHorizontal: 12, gap: 8 }}
  >
    {children}
  </ScrollView>
);

export default HorizontalCarousel;
