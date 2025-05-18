import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, ChevronUp, ShoppingCart, User } from "lucide-react";
import { Link } from "react-router-dom";

export default function HomePage() {
  const [email, setEmail] = useState("");
  const [search, setSearch] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Thay đổi trong phần state & data
  const product = [
    {
      id: 1,
      name: "Head & Shoulders Classic Clean Shampoo",
      price: {
        "50ml": 100,
        "300ml": 200,
        "500ml": 300,
      },
      original: {
        "50ml": 150,
        "300ml": 250,
        "500ml": 350,
      },
      rating: 4.5,
      image:
        "https://i5.walmartimages.com/seo/Head-and-Shoulders-Dandruff-Shampoo-Classic-Clean-8-45-fl-oz_216cf88e-960a-41e0-b221-3cd78061db26.8a830739f18cc9dab17956d7ac7918d9.jpeg",
    },
    {
      id: 2,
      name: "Head & Shoulders Classic Refill Shampoo",
      price: 100,
      original: 150,
      rating: 4.5,
      image:
        "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSNEXUgv0PkFthmXGA1V2-no1wPf-qZZw0PYucwHeKDc-UTO61qSVexxd2EHWJXg6mHdUd2h4RhKNrMZvWUh5u52mM5_nkG4AIWbssixJn0XwX84QkCsa_gig",
    },
  ];

  const customers = [
    {
      name: "Alice W.",
      comment: "Great quality and fast delivery!",
      rating: 5,
    },
    {
      name: "Max O.",
      comment: "Stylish products and easy checkout.",
      rating: 4,
    },
    { name: "James L.", comment: "Affordable and trendy clothing!", rating: 5 },
  ];

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
    <div className="font-sans text-gray-800">
      {/* Hero Section */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Text Content */}
          <div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight text-gray-900">
              FIND SHAMPOO THAT <br /> MATCHES YOUR STYLE
            </h1>
            <p className="mt-4 text-gray-600 text-lg">
              Shop the latest from the best brands
            </p>
            <Button className="mt-6 px-6 py-3 text-base">Shop Now</Button>

            {/* Stats */}
            <div className="flex gap-10 mt-10 text-sm justify-center">
              <div>
                <span className="font-bold text-xl text-black">200+</span>
                <p className="text-gray-600">Brands</p>
              </div>
              <div>
                <span className="font-bold text-xl text-black">2,000+</span>
                <p className="text-gray-600">Products</p>
              </div>
              <div>
                <span className="font-bold text-xl text-black">30,000+</span>
                <p className="text-gray-600">Customers</p>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="w-full">
            <img
              src="https://img.freepik.com/free-photo/closeup-portrait-joyful-girl-posing-without-makeup-white-wall-woman-chose-which-shampoo-is-best-use_197531-13865.jpg?semt=ais_hybrid&w=740"
              alt="Happy girl with shampoo"
              className="w-full h-auto rounded-xl object-cover shadow-lg"
            />
          </div>
        </div>
      </section>
      {/* Brand logos */}
      <div className="bg-black py-4 flex justify-center gap-10 flex-wrap">
        {["VERSACE", "ZARA", "GUCCI", "PRADA", "Calvin Klein"].map((brand) => (
          <span
            key={brand}
            className="text-white text-xl font-semibold tracking-wide"
          >
            {brand}
          </span>
        ))}
      </div>
      {/* Product */}
      <section className="px-6 py-10">
        <h2 className="text-3xl font-extrabold text-center my-8 tracking-wide">
          PRODUCT
        </h2>

        <div className="flex justify-center gap-6 mb-6">
          {product.map((item) => (
            <Link
              key={item.id}
              to={`/product/${item.id}`}
              state={{ products: product }}
            >
              <div className="bg-[#f5f1ef] p-4 rounded-xl w-56 text-center hover:shadow-lg cursor-pointer transition">
                <img
                  src={item.image}
                  alt={item.name}
                  className="mb-3 w-full h-48 object-containt rounded-md"
                />
                <h3 className="text-sm font-semibold mb-1">{item.name}</h3>
                <div className="flex justify-center items-center gap-1 mb-1">
                  <StarRating rating={item.rating} />
                  <span className="text-black text-xs">{item.rating}/5</span>
                </div>
                <div className="text-base font-bold text-red-600">
                  $
                  {typeof item.price === "object"
                    ? item.price["300ml"]
                    : item.price}
                  <span className="text-sm text-gray-500 line-through ml-2">
                    $
                    {typeof item.original === "object"
                      ? item.original["300ml"]
                      : item.original}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
      {/* Dress Style */}
      {/* <section className="px-6 py-10">
        <h2 className="text-2xl font-bold mb-6">BROWSE BY DRESS STYLE</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {styles.map((style) => (
            <div
              key={style}
              className="bg-gray-200 h-32 flex items-center justify-center font-semibold"
            >
              {style}
            </div>
          ))}
        </div>
      </section> */}
      {/* Customer Reviews */}
      <section className="px-6 py-10 bg-white-50">
        <h2 className="text-2xl font-bold mb-6">OUR HAPPY CUSTOMERS</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {customers.map((c) => (
            <div key={c.name} className="p-4 border bg-white rounded shadow">
              <p className="text-yellow-500">{"★".repeat(c.rating)}</p>
              <p className="mt-2">{c.comment}</p>
              <p className="mt-4 font-semibold">- {c.name}</p>
            </div>
          ))}
        </div>
      </section>
      {/* Newsletter */}
      <section className="bg-black text-white text-center py-10 px-6">
        <h2 className="text-2xl font-bold">
          STAY UP TO DATE ABOUT OUR LATEST OFFERS
        </h2>
        <div className="mt-4 max-w-md mx-auto flex gap-2">
          <Input
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1"
          />
          <Button className="bg-white text-black hover:bg-gray-200">
            Subscribe
          </Button>
        </div>
      </section>
    </div>
  );
}
