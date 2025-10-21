"use client";

import {
  Section,
  Cell,
  Image,
  List,
  Card,
  Text,
  Title,
  Button,
} from "@telegram-apps/telegram-ui";
import { useTranslations } from "next-intl";
import { useState } from "react";

import { Page } from "@/components/Page";

// Mock images - replace with your actual images
const productImages = {
  1: "/images/cake.png",
  2: "/images/burger.webp",
  3: "/images/pizza.jpg",
  4: "/images/fries.jpg",
  5: "/images/salad.webp",
  6: "/images/coffee.webp",
};

const burgers = [
  {
    id: 1,
    name: "Cake",
    price: 10,
    image: productImages[1],
  },
  {
    id: 2,
    name: "Burger",
    price: 15,
    image: productImages[2],
  },
  {
    id: 3,
    name: "Pizza",
    price: 20,
    image: productImages[3],
  },
  {
    id: 4,
    name: "Fries",
    price: 5,
    image: productImages[4],
  },
  {
    id: 5,
    name: "Salad",
    price: 12,
    image: productImages[5],
  },
  {
    id: 6,
    name: "Coffee",
    price: 4,
    image: productImages[6],
  },
];

export default function Home() {
  const t = useTranslations("i18n");
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});

  const increaseQuantity = (productId: number) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1,
    }));
  };

  const decreaseQuantity = (productId: number) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: Math.max(0, (prev[productId] || 0) - 1),
    }));
  };

  const getQuantity = (productId: number) => {
    return quantities[productId] || 0;
  };

  return (
    <Page back={false}>
      {/* Product Cards Section */}
      <Section>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "12px",
            padding: "16px",
          }}
        >
          {burgers.map((burger) => {
            const quantity = getQuantity(burger.id);

            return (
              <Card key={burger.id}>
                <div
                  style={{
                    padding: "8px",
                    textAlign: "center",
                  }}
                >
                  {/* Product Image */}
                  <div
                    style={{
                      width: "100%",
                      height: "150px",
                      backgroundColor: "var(--tg-theme-secondary-bg-color)",
                      borderRadius: "8px",
                      marginBottom: "8px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      overflow: "hidden",
                    }}
                  >
                    {burger.image ? (
                      <img
                        src={burger.image}
                        alt={burger.name}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                        }}
                      />
                    ) : (
                      <Text
                        style={{
                          color: "var(--tg-theme-hint-color)",
                          fontSize: "12px",
                        }}
                      >
                        No Image
                      </Text>
                    )}
                  </div>

                  {/* Product Name */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <Text
                      style={{
                        color: "var(--tg-theme-text-color)",
                        fontSize: "14px",
                        fontWeight: "600",
                        marginBottom: "8px",
                      }}
                    >
                      {burger.name}
                    </Text>

                    {/* Product Price */}
                    <Text
                      style={{
                        color: "var(--tg-theme-text-color)",
                        fontSize: "14px",
                        fontWeight: "600",
                        marginBottom: "8px",
                      }}
                    >
                      ${burger.price}
                    </Text>
                  </div>

                  {/* Quantity Controls */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                      marginBottom: "4px",
                    }}
                  >
                    <Button
                      size="s"
                      mode="bezeled"
                      onClick={() => decreaseQuantity(burger.id)}
                      disabled={quantity === 0}
                      style={{
                        width: "50px",
                        height: "30px",
                        padding: "0",
                        fontSize: "20px",
                      }}
                    >
                      -
                    </Button>

                    <Text
                      style={{
                        fontSize: "14px",
                        fontWeight: "500",
                        minWidth: "20px",
                        textAlign: "center",
                      }}
                    >
                      {quantity}
                    </Text>

                    <Button
                      size="s"
                      mode="bezeled"
                      onClick={() => increaseQuantity(burger.id)}
                      style={{
                        width: "50px",
                        height: "30px",
                        padding: "0",
                        fontSize: "12px",
                      }}
                    >
                      +
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </Section>
    </Page>
  );
}
