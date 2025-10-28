import React from "react";
import { ArrowLeft } from "lucide-react";
import { BottomNavigation } from "@/components/ui/BottomNavigation";
import { createReviewsNavItems } from "@/utils/navigationHelpers";
import { useRouter } from "expo-router";

const YummiReviews = () => {
  const router = useRouter();
  const navItems = createReviewsNavItems("reviews", router);

  const reviews = [
    {
      id: "1",
      userName: "Maria S.",
      comment:
        "No me gustó la textura después de haberlo calentado en mi casa. Supongo que es por el tiempo que estuvo en el local.",
      rating: 3, 
    },
  ];

  const renderStars = (rating: number) => {
    return (
      <div style={{ display: "flex", gap: "2px" }}>
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            style={{
              fontSize: "20px",
              color: "#000",
              lineHeight: "1",
            }}
          >
            {star <= rating ? "★" : "☆"}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div
      style={{
        width: "390px",
        height: "844px",
        backgroundColor: "#F5F1E8",
        display: "flex",
        flexDirection: "column",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        position: "relative",
        margin: "0 auto",
        boxShadow: "0 0 20px rgba(0,0,0,0.1)",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: "50px 16px 16px 16px",
          backgroundColor: "#F5F1E8",
          borderBottom: "1px solid #000",
        }}
      >
        <button
          onClick={() => router.back()}
          style={{
            background: "none",
            border: "none",
            marginRight: "12px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
          }}
        >
          <ArrowLeft size={24} color="#000" />
        </button>
        <h1
          style={{
            fontSize: "20px",
            fontWeight: "400",
            color: "#000",
            margin: 0,
          }}
        >
          <span style={{ fontWeight: "700", letterSpacing: "2px" }}>YUMMI</span>{" "}
          Opiniones
        </h1>
      </div>

      {/* Content */}
      <div
        style={{
          flex: 1,
          padding: "0 16px",
          overflowY: "auto",
          paddingBottom: "100px",
        }}
      >
        {/* Rating Stars */}
        <div style={{ paddingTop: "16px", paddingBottom: "16px" }}>
          {renderStars(3)}
        </div>

        {/* Product Card */}
        <div
          style={{
            backgroundColor: "#FFF",
            borderRadius: "12px",
            padding: "12px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            marginBottom: "20px",
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=400&fit=crop"
            alt="Pizza"
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "8px",
              objectFit: "cover",
              marginBottom: "8px",
            }}
          />
          <div style={{ marginBottom: "12px" }}>
            <h3
              style={{
                fontSize: "16px",
                fontWeight: "600",
                color: "#000",
                margin: "0 0 4px 0",
              }}
            >
              Producto 2
            </h3>
            <p
              style={{
                fontSize: "12px",
                color: "#666",
                margin: 0,
                lineHeight: "16px",
              }}
            >
              Detalles del producto...
              <br />
              lorem ipsum
            </p>
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button
              style={{
                backgroundColor: "#6B8E4E",
                borderRadius: "6px",
                padding: "8px 16px",
                border: "none",
                cursor: "pointer",
              }}
            >
              <span
                style={{
                  color: "#FFF",
                  fontSize: "13px",
                  fontWeight: "600",
                }}
              >
                Ver restaurant
              </span>
            </button>
          </div>
        </div>

        {/* Reviews */}
        {reviews.map((review) => (
          <div
            key={review.id}
            style={{
              backgroundColor: "#FFF",
              borderRadius: "12px",
              padding: "16px",
              marginBottom: "12px",
              boxShadow: "0 1px 2px rgba(0,0,0,0.08)",
            }}
          >
            <h4
              style={{
                fontSize: "15px",
                fontWeight: "600",
                color: "#000",
                margin: "0 0 8px 0",
              }}
            >
              {review.userName}
            </h4>
            {/* Muestra las estrellas del review */}
            <div style={{ marginBottom: "8px" }}>
              {renderStars(review.rating)}
            </div>
            <p
              style={{
                fontSize: "14px",
                color: "#333",
                margin: 0,
                lineHeight: "20px",
              }}
            >
              {review.comment}
            </p>
          </div>
        ))}
      </div>

      {/* ✅ Bottom Navigation igual al de ReviewScreen */}
      <BottomNavigation items={navItems} />
    </div>
  );
};

export default YummiReviews;
