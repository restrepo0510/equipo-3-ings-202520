// ✅ contexts/ReviewsContext.tsx
import React, { createContext, useContext, useState } from "react";

// --- Tipo de dato para cada reseña ---
export interface Review {
  id: string;
  restaurant: string;
  product: string;
  rating: number;
  text: string;
  namep?: string;
  image?: any; // Puede ser require() o { uri: string }
}

// --- Tipo del contexto ---
type ReviewsContextType = {
  reviews: Review[];
  addReview: (review: Review) => void;
};

// --- Creación del contexto ---
const ReviewsContext = createContext<ReviewsContextType>({
  reviews: [],
  addReview: () => {},
});

// --- Proveedor ---
export const ReviewsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [reviews, setReviews] = useState<Review[]>([]);

  const addReview = (newReview: Review) => {
    setReviews((prev) => [...prev, newReview]);
  };

  return (
    <ReviewsContext.Provider value={{ reviews, addReview }}>
      {children}
    </ReviewsContext.Provider>
  );
};

// --- Hook personalizado ---
export const useReviews = () => useContext(ReviewsContext);
