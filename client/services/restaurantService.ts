// client/services/restaurantService.ts
// ✅ Servicio FRONTEND limpio y funcional según tu API REST
// Se comunica con tu backend NestJS (http://192.168.20.1:3000/restaurants)

const API_URL = __DEV__
  ? 'http://192.168.20.22:3000/restaurants' // Cambia IP si tu backend corre en otra
  : 'https://tu-api-production.com/restaurants';

// --- Tipos de datos ---
export interface Restaurant {
  id: string;
  name: string;
  description?: string;
  latitude: number;
  longitude: number;
  imageUrl?: string;
  isActive: boolean;
  distance?: number; // opcional, usado en nearby
}

export interface NearbyRestaurantsDto {
  latitude: number;
  longitude: number;
  radius?: number;
  limit?: number;
}

// --- Servicio ---
export const restaurantService = {
  /** 🔹 Obtener todos los restaurantes */
  async getAll(): Promise<Restaurant[]> {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error('Error al obtener restaurantes');
    return await res.json();
  },

  /** 🔹 Obtener un restaurante por su ID */
  async getById(id: string): Promise<Restaurant> {
    const res = await fetch(`${API_URL}/${id}`);
    if (!res.ok) throw new Error(`Restaurante con ID ${id} no encontrado`);
    return await res.json();
  },

  /** 🔹 Buscar restaurantes cercanos (usa latitud y longitud del usuario) */
  async getNearby(dto: NearbyRestaurantsDto): Promise<Restaurant[]> {
    const params = new URLSearchParams({
      latitude: dto.latitude.toString(),
      longitude: dto.longitude.toString(),
      radius: dto.radius?.toString() || '100',
      limit: dto.limit?.toString() || '20',
    });

    const res = await fetch(`${API_URL}/nearby?${params}`);
    if (!res.ok) throw new Error('Error al obtener restaurantes cercanos');
    return await res.json();
  },

  /** 🔹 Crear un nuevo restaurante */
  async create(data: Omit<Restaurant, 'id'>): Promise<Restaurant> {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Error al crear restaurante');
    return await res.json();
  },

  /** 🔹 Actualizar un restaurante existente */
  async update(id: string, data: Partial<Restaurant>): Promise<Restaurant> {
    const res = await fetch(`${API_URL}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Error al actualizar restaurante');
    return await res.json();
  },

  /** 🔹 Eliminar un restaurante */
  async remove(id: string): Promise<void> {
    const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Error al eliminar restaurante');
  },
};
