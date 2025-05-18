import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { cart, increment, decrement, removeFromCart } = useCart();

  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const discount = subtotal * 0.2;
  const deliveryFee = 15;
  const total = subtotal - discount + deliveryFee;

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-left">Your Cart</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-4">
          {cart.map((item) => (
            <Card key={`${item.id}-${item.size}`} className="p-4">
              <div className="flex justify-between">
                {/* Bên trái: Hình ảnh + thông tin sản phẩm */}
                <div className="flex space-x-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div className="space-y-1">
                    <h2 className="font-semibold text-lg">{item.name}</h2>
                    <p className="text-sm text-gray-500">Size: {item.size}</p>
                    <div className="flex items-center space-x-2">
                      {item.original && (
                        <span className="text-sm text-gray-400 line-through">
                          ${item.original.toFixed(2)}
                        </span>
                      )}
                      <span className="text-base font-bold text-black">
                        ${item.price.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Nút xoá ở góc trên bên phải */}
                <div className="flex flex-col items-end justify-between">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-red-500 self-end"
                    onClick={() => removeFromCart(item.id, item.size)}
                  >
                    <Trash2 size={18} />
                  </Button>

                  {/* Ô chọn số lượng ở góc dưới bên phải */}
                  <div className="flex items-center space-x-2 mt-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => decrement(item.id, item.size)}
                    >
                      <Minus size={16} />
                    </Button>
                    <span>{item.quantity}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => increment(item.id, item.size)}
                    >
                      <Plus size={16} />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Card className="p-6 space-y-4">
          <h2 className="text-lg font-semibold">Order Summary</h2>
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-red-500">
            <span>Discount (-20%)</span>
            <span>-${discount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Delivery Fee</span>
            <span>${deliveryFee.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <div className="flex space-x-2">
            <Input placeholder="Add promo code" className="flex-1" />
            <Button>Apply</Button>
          </div>
          <Button className="w-full text-white bg-black hover:bg-gray-800">
            Go to Checkout →
          </Button>
        </Card>
      </div>
    </div>
  );
}
