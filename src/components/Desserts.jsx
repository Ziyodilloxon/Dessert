import React, { useState } from "react";

const dessertsData = [
  {
    id: 1,
    name: "Waffle with Berries",
    price: 6.5,
    imgSrc:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQp1sJfpCwNwlbUE5ONaN5MBLfyzTtHFisTcQ&s",
  },
  {
    id: 2,
    name: "Vanilla Bean Crème Brûlée",
    price: 7.0,
    imgSrc:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSA9dkYJOYByEuFCFjcQda0uLzlMddHAQUTeQ&s",
  },
  {
    id: 3,
    name: "Macaron Mix of Five",
    price: 8.0,
    imgSrc:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwPip0g1df_6GEahjWYeJUGUo9nQNP2KhXHg&s",
  },
  {
    id: 4,
    name: "Classic Tiramisu",
    price: 5.5,
    imgSrc:
      "https://www.southernliving.com/thmb/ChVndNdUY-s3Ig0P6p90Ug3jpdE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Strawberry_Cake_Batch-60_-Beauty_04-e695c05658574b15a54de74a479658e0.jpg",
  },
  {
    id: 5,
    name: "Pistachio Baklava",
    price: 4.0,
    imgSrc:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGDoD-3hYF9au9hDQSqAKgcmNtyTsd9Ajsug&s",
  },
  {
    id: 6,
    name: "Lemon Meringue Pie",
    price: 5.0,
    imgSrc:
      "https://preppykitchen.com/wp-content/uploads/2022/06/Lemon-Cake-Recipe.jpg",
  },
  {
    id: 7,
    name: "Red Velvet Cake",
    price: 4.5,
    imgSrc:
      "https://www.barleyandsage.com/wp-content/uploads/2022/05/roasted-berry-sheet-cake-1200x1200-1.jpg",
  },
  {
    id: 8,
    name: "Salted Caramel Brownie",
    price: 5.5,
    imgSrc:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxLTEOQ0gVKfQNc6pXchcN-KGm8F7_qhKzHA&s",
  },
  {
    id: 9,
    name: "Vanilla Panna Cotta",
    price: 6.5,
    imgSrc: "https://houseofyumm.com/wp-content/uploads/2015/11/4-2.jpg",
  },
];

function Desserts() {
  const [cart, setCart] = useState([]);

  const addToCart = (dessert) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === dessert.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === dessert.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...dessert, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (dessert) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === dessert.id);
      if (existingItem.quantity === 1) {
        return prevCart.filter((item) => item.id !== dessert.id);
      } else {
        return prevCart.map((item) =>
          item.id === dessert.id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      }
    });
  };

  const totalAmount = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="flex flex-col lg:flex-row">
      <div className="w-full lg:w-3/4 p-4">
        <h1 className="text-3xl font-bold mb-4">Desserts</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {dessertsData.map((dessert) => (
            <div key={dessert.id} className="border rounded-lg p-4 shadow-lg">
              <img
                src={dessert.imgSrc}
                alt={dessert.name}
                className="w-full h-32 object-cover mb-2"
              />
              <h2 className="text-xl font-semibold">{dessert.name}</h2>
              <p className="text-gray-600">${dessert.price.toFixed(2)}</p>
              <button
                className="mt-2 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
                onClick={() => addToCart(dessert)}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full lg:w-1/4 p-4 border-l">
        <h2 className="text-2xl font-bold mb-4">Your Cart ({cart.length})</h2>
        {cart.length === 0 ? (
          <p className="text-gray-600">Your added items will appear here</p>
        ) : (
          <div>
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center mb-2"
              >
                <div>
                  <p className="text-lg">{item.name}</p>
                  <p className="text-gray-600">
                    ${item.price.toFixed(2)} x {item.quantity}
                  </p>
                </div>
                <div className="flex items-center">
                  <button
                    className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    onClick={() => removeFromCart(item)}
                  >
                    -
                  </button>
                  <span className="px-2">{item.quantity}</span>
                  <button
                    className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                    onClick={() => addToCart(item)}
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
            <div className="mt-4">
              <p className="text-xl font-bold">
                Order Total: ${totalAmount.toFixed(2)}
              </p>
              <button className="mt-2 w-full px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600">
                Confirm Order
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Desserts;
