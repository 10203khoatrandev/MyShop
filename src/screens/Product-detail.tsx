import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useParams, useLocation } from "react-router-dom";
import { useCart } from "@/context/CartContext";

const reviews = [
  {
    name: "Samantha D.",
    comment:
      "The design is unique and the fabric feels luxurious. Perfect for a weekend outing!",
    date: "August 24, 2023",
    rating: 5,
  },
  {
    name: "Alex M.",
    comment:
      "Great value for the price. I love the attention to detail in the stitching.",
    date: "August 21, 2023",
    rating: 4,
  },
  {
    name: "Ethan R.",
    comment:
      "It's a great pick for casual days. Especially love the soft texture!",
    date: "August 19, 2023",
    rating: 4,
  },
  {
    name: "Olivia K.",
    comment: "Loved it. Versatile and incredibly comfortable. Will buy again.",
    date: "August 17, 2023",
    rating: 5,
  },
  {
    name: "Liam H.",
    comment:
      "The fabric is soft, and the design is modern. Just what I was looking for!",
    date: "August 16, 2023",
    rating: 4,
  },
  {
    name: "Ava H.",
    comment:
      "Nice shirt for casual wear. Fits well and looks exactly like the pictures.",
    date: "August 14, 2023",
    rating: 5,
  },
];

export default function ProductDetailPage() {
  const [size, setSize] = useState("300ml");
  const [quantity, setQuantity] = useState(1);

  const { id } = useParams();
  const location = useLocation();
  const { products } = location.state;

  const product = products.find((p: { id: any }) => String(p.id) === id);

  if (!product) {
    return <div className="p-6">Product not found.</div>;
  }

  const currentPrice = product.price[size];
  const originalPrice =
    typeof product.original === "object"
      ? product.original[size]
      : product.original;

  const discount = Math.round(
    ((originalPrice - currentPrice) / originalPrice) * 100
  );

  const { addToCart } = useCart();

  const StarRating = ({ rating }: { rating: number }) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg
          key={`full-${i}`}
          className="w-4 h-4 fill-yellow-400"
          viewBox="0 0 20 20"
        >
          <path d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.561-.955L10 0l2.951 5.955 6.561.955-4.756 4.635 1.122 6.545z" />
        </svg>
      );
    }

    if (halfStar) {
      stars.push(
        <svg key="half" className="w-4 h-4 fill-yellow-400" viewBox="0 0 20 20">
          <defs>
            <linearGradient id="halfGrad">
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="transparent" stopOpacity="1" />
            </linearGradient>
          </defs>
          <path
            d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.561-.955L10 0l2.951 5.955 6.561.955-4.756 4.635 1.122 6.545z"
            fill="url(#halfGrad)"
          />
        </svg>
      );
    }

    return <div className="flex items-center gap-1">{stars}</div>;
  };

  return (
    <div className="px-6 py-10 max-w-6xl mx-auto">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-4 text-left">
        Home {">"} Shampoo {">"} {product.name}
      </nav>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Images */}
        <div className="flex flex-col gap-4">
          <img
            src={product.image}
            alt={product.name}
            className="rounded-lg w-full object-cover"
          />
          <div className="flex gap-2">
            {[1, 2, 3].map((i) => (
              <img
                key={i}
                src="https://i5.walmartimages.com/seo/Head-and-Shoulders-Dandruff-Shampoo-Classic-Clean-8-45-fl-oz_216cf88e-960a-41e0-b221-3cd78061db26.8a830739f18cc9dab17956d7ac7918d9.jpeg"
                alt="thumb"
                className="w-20 h-20 object-cover rounded-md border"
              />
            ))}
          </div>
        </div>

        {/* Info */}
        <div>
          <h1 className="text-2xl font-bold mb-2 text-left">{product.name}</h1>
          <div className="flex items-center gap-2 mb-4">
            {StarRating({ rating: product.rating })}
            <span className="text-sm text-gray-500">{product.rating}/5</span>
          </div>
          <div className="flex items-center gap-2 text-xl font-bold mb-2 text-black">
            ${currentPrice}
            <span className="line-through text-gray-400 text-base">
              ${originalPrice}
            </span>
            <span className="text-sm text-red-600 font-semibold bg-red-100 px-2 py-1 rounded">
              -{discount}%
            </span>
          </div>

          <p className="text-gray-600 mb-4 text-left">
            The graphic t-shirt is perfect for any occasion. Crafted from a soft
            and breathable fabric with superior comfort and style.
          </p>

          <div className="mb-4">
            <span className="font-medium text-gray-700">Choose Size</span>
            <div className="flex justify-center gap-2 mt-2">
              {["50ml", "300ml", "500ml"].map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`px-4 py-2 border rounded-full text-sm ${
                    size === s ? "bg-black text-white" : "bg-white text-black"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-4 items-center mt-4">
            <div className="flex items-center gap-2 border rounded-full px-2 py-1">
              <Button
                onClick={() => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))}
                disabled={quantity === 1}
                variant="ghost"
                className="px-2"
              >
                -
              </Button>
              <span className="text-base font-medium">{quantity}</span>
              <Button
                onClick={() => setQuantity((prev) => prev + 1)}
                variant="ghost"
                className="px-2"
              >
                +
              </Button>
            </div>

            <Button
              className="flex-1 py-3 text-base rounded-full"
              onClick={() => {
                addToCart({
                  ...product,
                  quantity,
                  size,
                  price: currentPrice,
                  original: originalPrice,
                  id: String(product.id),
                });
                document.dispatchEvent(new CustomEvent("cart-add-animation"));
              }}
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </div>

      {/* Reviews */}
      <section className="mt-10">
        <h2 className="text-xl font-semibold mb-4">Rating & Reviews</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {reviews.map((r, idx) => (
            <div key={idx} className="border p-4 rounded bg-white">
              <div className="flex justify-center items-center gap-1">
                {StarRating({ rating: r.rating })}
              </div>
              <p className="text-sm text-gray-700 mt-2">{r.comment}</p>
              <p className="text-sm text-gray-500 mt-4">- {r.name}</p>
              <p className="text-xs text-gray-400">Posted on {r.date}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
