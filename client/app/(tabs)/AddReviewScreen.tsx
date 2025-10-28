import React, { useState } from 'react';
import { ChevronDown, ArrowLeft, Home, Heart, FileText, User, Send } from 'lucide-react';
import { BottomNavigation } from "@/components/ui/BottomNavigation";
import { createReviewsNavItems } from "@/utils/navigationHelpers";
import { useRouter } from "expo-router";

const YummiOpiniones = () => {
  const [rating, setRating] = useState(3);
  const [review, setReview] = useState('');
  const router = useRouter();

  const navItems = createReviewsNavItems('reviews', router);

  const renderStars = () => (
    <div style={{ display: 'flex', gap: '4px' }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => setRating(star)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '0'
          }}
        >
          <span style={{
            fontSize: '32px',
            color: '#000',
            display: 'block',
            lineHeight: '1'
          }}>
            {star <= rating ? '★' : '☆'}
          </span>
        </button>
      ))}
    </div>
  );

  return (
    <div style={{
      width: '390px',
      height: '844px',
      backgroundColor: '#F5F1E8',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      position: 'relative',
      margin: '0 auto',
      boxShadow: '0 0 20px rgba(0,0,0,0.1)'
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        padding: '50px 16px 16px 16px',
        backgroundColor: '#F5F1E8',
        borderBottom: '1px solid #000',
      }}>
        <button
          onClick={() => router.back()}
          style={{
            background: 'none',
            border: 'none',
            marginRight: '12px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center'
          }}>
          <ArrowLeft size={24} color="#000" />
        </button>
        <h1 style={{
          fontSize: '20px',
          fontWeight: '400',
          color: '#000',
          margin: 0
        }}>
          <span style={{ fontWeight: '700', letterSpacing: '2px' }}>YUMMI</span> Opiniones
        </h1>
      </div>

      {/* Content */}
      <div style={{
        flex: 1,
        padding: '20px 16px',
        overflowY: 'auto'
      }}>
        {/* Selecciona un restaurante */}
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{
            fontSize: '16px',
            fontWeight: '600',
            color: '#000',
            marginBottom: '12px'
          }}>
            Selecciona un restaurante
          </h2>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#FFF',
            border: '1.5px solid #000',
            borderRadius: '8px',
            padding: '10px 12px',
            cursor: 'pointer'
          }}>
            <span style={{ fontSize: '14px', color: '#000' }}>Capitulos-poblado</span>
            <ChevronDown size={24} color="#000" />
          </div>
        </div>

        {/* Selecciona un producto */}
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{
            fontSize: '16px',
            fontWeight: '600',
            color: '#000',
            marginBottom: '12px'
          }}>
            Selecciona un producto
          </h2>
          <div style={{
            display: 'flex',
            backgroundColor: '#FFF',
            borderRadius: '12px',
            padding: '12px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            <img
              src="https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=400&fit=crop"
              alt="Pizza"
              style={{
                width: '80px',
                height: '80px',
                borderRadius: '8px',
                objectFit: 'cover'
              }}
            />
            <div style={{
              flex: 1,
              marginLeft: '12px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}>
              <h3 style={{
                fontSize: '16px',
                fontWeight: '600',
                color: '#000',
                margin: '0 0 4px 0'
              }}>
                Producto 2
              </h3>
              <p style={{
                fontSize: '12px',
                color: '#666',
                margin: 0,
                lineHeight: '16px'
              }}>
                Detalles del producto...<br />lorem ipsum
              </p>
            </div>
          </div>
        </div>

        {/* Puntua y opina */}
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{
            fontSize: '16px',
            fontWeight: '600',
            color: '#000',
            marginBottom: '12px'
          }}>
            Puntua y opina
          </h2>
          {renderStars()}
        </div>

        {/* Escribe tu reseña */}
        <div style={{
          display: 'flex',
          alignItems: 'flex-end',
          marginBottom: '20px'
        }}>
          <input
            type="text"
            placeholder="Escribe tu reseña..."
            value={review}
            onChange={(e) => setReview(e.target.value)}
            style={{
              flex: 1,
              backgroundColor: '#FFF',
              border: '1.5px solid #000',
              borderRadius: '25px',
              padding: '12px 16px',
              fontSize: '14px',
              color: '#000',
              marginRight: '8px',
              outline: 'none'
            }}
          />
          <button style={{
            backgroundColor: '#000',
            width: '50px',
            height: '50px',
            borderRadius: '25px',
            border: 'none',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
            flexShrink: 0
          }}>
            <Send size={20} color="#FFF" />
          </button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation items={navItems} />
    </div>
  );
};

export default YummiOpiniones;
