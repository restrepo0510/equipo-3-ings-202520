import React, { createContext, useContext, useState } from "react";

interface Restaurant {
  id: string;
  name: string;
  imageUrl?: string;
  latitude?: number;
  longitude?: number;
}

type RestaurantsContextType = {
  restaurants: Restaurant[];
  setRestaurants: (data: Restaurant[]) => void;
};

const RestaurantsContext = createContext<RestaurantsContextType>({
  restaurants: [],
  setRestaurants: () => {},
});

export const RestaurantsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  return (
    <RestaurantsContext.Provider value={{ restaurants, setRestaurants }}>
      {children}
    </RestaurantsContext.Provider>
  );
};

export const useRestaurants = () => useContext(RestaurantsContext);
