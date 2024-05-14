"use client";
import ResultCard from "@/components/ResultCard";
import React, { useState } from "react";

const inputInit = {
  id: 0,
  name: 1,
  quantity: 0,
  price: 0,
  count: 1,
  average: 0,
};

const sumAvg = (qty: number, price: number, count: number) => {
  const newVal = (qty * count) / price;
  return newVal.toFixed(2);
};

const Home = () => {
  const [inputs, setInputs] = useState(inputInit);
  const [itemName, setItemName] = useState(1);
  const [items, setItems] = useState<any>([]);

  const handleChange = (event: any) => {
    const name = event.target.name;
    const value = event.target.value;

    const d = Date.now();
    const genId = d.toString().slice(-5);
    setInputs((values: any) => ({ ...values, [name]: value, id: genId }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const avgPrice = sumAvg(inputs.quantity, inputs.price, inputs.count);

    const newItem = {
      id: inputs.id,
      name: itemName,
      quantity: inputs.quantity,
      price: inputs.price,
      count: inputs.count,
      average: avgPrice,
    };
    setItems((v: any) => [...v, newItem]);
    setInputs(inputInit);
    setItemName((prev) => prev + 1);
  };

  const handleRemove = (e: any) => {
    setItems((prev: any) => prev.filter((data: any) => data.id !== e.id));
  };

  return (
    <article className="relative max-w-[425px] min-h-dvh mx-auto">
      <div className="bg-white absolute w-full h-screen sm:h-3/4 sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-xl overflow-clip shadow-2xl">
        <div className="bg-accent w-full h-24 relative">
          <div className="hidden sm:flex justify-end p-3">
            <button
              className="flex flex-col items-center justify-center"
              onClick={() => setItems([])}
            >
              <div className="hover:rotate-180 duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3"
                  />
                </svg>
              </div>
            </button>
          </div>

          <div className="absolute top-[48px] left-1/2 -translate-x-1/2 flex">
            <div className="bg-white rounded-md shadow-xl p-3">
              <ResultCard items={items} />
            </div>
          </div>
        </div>

        <section className="mt-16 h-full">
          <div
            id="container"
            className="h-3/4 sm:pb-16 pb-4 overflow-y-scroll shadow-inner"
          >
            {items.length !== 0 ? (
              <div>
                <ul>
                  {items.map((item: any, idx: number) => (
                    <li key={idx} className="m-4">
                      <div className="bg-white rounded-md p-3 shadow-md border-l-2 border-l-primary hover:shadow-lg transition-all">
                        <div className="flex gap-4 items-center justify-between">
                          <div className="text-center ml-1 min-[375px]:ml-4">
                            <p className="text-lg font-medium">{item.name}</p>
                            <p className="text-xs text-secondary">Item</p>
                          </div>
                          <div className="text-center">
                            <p className="text-lg font-medium">
                              {item.quantity}
                            </p>
                            <p className="text-xs text-secondary">quantity</p>
                          </div>
                          <div className="text-center">
                            <p className="text-lg font-medium">{item.price}</p>
                            <p className="text-xs text-secondary">price</p>
                          </div>
                          <div className="text-center">
                            <p className="text-lg font-medium">{item.count}</p>
                            <p className="text-xs text-secondary">count</p>
                          </div>
                          <div className="text-center">
                            <p className="text-lg font-medium">
                              {item.average}
                            </p>
                            <p className="text-xs text-secondary">average</p>
                          </div>
                          <div>
                            <button
                              className="text-error p-2"
                              onClick={(e) => handleRemove(item)}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1}
                                stroke="currentColor"
                                className="w-5 h-5"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="w-full h-full flex justify-center items-center">
                <div className="border border-secondary border-dashed rounded-md p-10">
                  <span className="text-center text-lg font-medium">
                    No data to show
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="absolute bottom-0 w-full max-w-[425px]">
            <div className="bg-primary p-2 w-full">
              <div className="flex justify-center items-end gap-3">
                <label>
                  <p className="text-sm text-center text-white font-medium mb-1">
                    Quantity
                  </p>

                  <input
                    type="number"
                    name="quantity"
                    value={inputs.quantity || ""}
                    onChange={handleChange}
                    required
                    placeholder="1950"
                    className="h-12 w-full text-center outline-none rounded focus-within:ring-2 focus-within:ring-accent"
                  />
                </label>

                <label>
                  <p className="text-sm text-center text-white font-medium mb-1">
                    Price
                  </p>
                  <input
                    type="number"
                    name="price"
                    value={inputs.price || ""}
                    onChange={handleChange}
                    required
                    placeholder="27"
                    className="h-12 w-full text-center outline-none rounded focus-within:ring-2 focus-within:ring-accent"
                  />
                </label>

                <label>
                  <p className="text-sm text-center text-white font-medium mb-1">
                    Count
                  </p>
                  <input
                    type="number"
                    name="count"
                    value={inputs.count || ""}
                    onChange={handleChange}
                    required
                    placeholder="1"
                    className="h-12 w-full text-center outline-none rounded focus-within:ring-2 focus-within:ring-accent"
                  />
                </label>

                <label>
                  <button
                    className="bg-accent p-2.5 rounded text-white"
                    onClick={handleSubmit}
                  >
                    <p className="text-lg font-medium">ADD</p>
                  </button>
                </label>
              </div>
            </div>
          </div>
        </section>
      </div>
    </article>
  );
};

export default Home;
