// services/restaurantService.ts
// VERSIÓN SIN AXIOS - USA FETCH NATIVO

// Reemplaza con tu IP real (ejemplo: 192.168.1.100)
const API_URL = __DEV__ 
  ? 'http://192.168.20.1:3000/restaurants'
  : 'https://tu-api-production.com/restaurants';

export interface Restaurant {
  id: string;
  name: string;
  description?: string;
  address: string;
  latitude: number;
  longitude: number;
  category?: string;
  phone?: string;
  isActive: boolean;
  imageUrl?: string;
  openingTime?: string;
  closingTime?: string;
  distance?: number;
}

export interface NearbyParams {
  latitude: number;
  longitude: number;
  radius?: number;
  limit?: number;
}

// Datos mock para desarrollo
const getMockRestaurants = (): Restaurant[] => {
  return [
    {
      id: '1',
      name: 'Restaurante Donde Juan',
      description: 'Comida típica paisa con productos cercanos al vencimiento',
      address: 'Carrera 43A #3-60, El Poblado',
      latitude: 6.2088,
      longitude: -75.5671,
      category: 'Restaurante',
      phone: '3001234567',
      isActive: true,
      imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400',
      openingTime: '08:00',
      closingTime: '20:00',
      distance: 0.5,
    },
    {
      id: '2',
      name: 'Mercado Orgánico Verde',
      description: 'Frutas y verduras orgánicas de pequeños productores',
      address: 'Calle 10 #43F-12, El Poblado',
      latitude: 6.2095,
      longitude: -75.5681,
      category: 'Mercado',
      phone: '3009876543',
      isActive: true,
      imageUrl: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=400',
      openingTime: '07:00',
      closingTime: '19:00',
      distance: 1.2,
    },
    {
      id: '3',
      name: 'Panadería El Buen Pan',
      description: 'Pan artesanal del día anterior a precios solidarios',
      address: 'Carrera 37 #8A-32, El Poblado',
      latitude: 6.2112,
      longitude: -75.5689,
      category: 'Panadería',
      phone: '3002345678',
      isActive: true,
      imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400',
      openingTime: '06:00',
      closingTime: '18:00',
      distance: 2.1,
    },
    {
      id: '4',
      name: 'Frutería Las Tres Esquinas',
      description: 'Frutas y verduras frescas con descuento',
      address: 'Circular 1 #70-25, Laureles',
      latitude: 6.2447,
      longitude: -75.5897,
      category: 'Frutería',
      phone: '3003456789',
      isActive: true,
      imageUrl: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400',
      openingTime: '07:00',
      closingTime: '20:00',
      distance: 3.5,
    },
    {
      id: '5',
      name: 'Restaurante No Disponible',
      description: 'Temporalmente cerrado',
      address: 'Calle 50 #50-50, Centro',
      latitude: 6.2450,
      longitude: -75.5650,
      category: 'Restaurante',
      isActive: false,
      distance: 4.2,
    },
  ];
};

export const restaurantService = {
  getNearbyRestaurants: async (params: NearbyParams): Promise<Restaurant[]> => {
    try {
      const queryParams = new URLSearchParams({
        latitude: params.latitude.toString(),
        longitude: params.longitude.toString(),
        radius: (params.radius || 10).toString(),
        limit: (params.limit || 20).toString(),
      });

      const response = await fetch(`${API_URL}/nearby?${queryParams}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.log('⚠️ No se pudo conectar al servidor, usando datos mock');
      console.log('Error:', error);
      // Retornar datos mock si falla
      return getMockRestaurants();
    }
  },

  getAllRestaurants: async (): Promise<Restaurant[]> => {
    try {
      const response = await fetch(API_URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.log('⚠️ Usando datos mock');
      return getMockRestaurants();
    }
  },

  getRestaurantById: async (id: string): Promise<Restaurant> => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching restaurant:', error);
      throw error;
    }
  },
};