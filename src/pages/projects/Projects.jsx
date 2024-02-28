import React from "react";

export default function Projects() {
  return (
    <div
      data-aos="fade-left"
      data-aos-anchor="#example-anchor"
      data-aos-offset="500"
      data-aos-duration="500"
      className="my-12 p-4 max-w-4xl mx-auto overflow-hidden rounded-lg shadow-lg bg-white"
    >
      <h1 className="text-slate-900 text-4xl text-center font-semibold my-6">
        Projects
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
        <div
          data-aos="flip-up"
          data-aos-delay="200"
          data-aos-duration="600"
          className="bg-gradient-to-b from-purple-600 to-indigo-700 rounded-lg shadow-lg text-white"
        >
          <div className="p-8">
            <h2 className="text-3xl mb-6 font-semibold">Seller And Buyer</h2>
            <div className="mb-6">
              <p className="text-lg mb-2">
                <span className="font-semibold text-gray-300">Live Link:</span>{" "}
                <a
                  className="text-blue-200 hover:text-blue-300 transition-colors duration-300"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://seller-buyer-2ccd0.firebaseapp.com/"
                >
                  Seller and Buyer
                </a>
              </p>
              <p className="text-lg mb-2">
                <span className="font-semibold text-gray-300">Code Link:</span>{" "}
                <a
                  className="text-blue-200 hover:text-blue-300 transition-colors duration-300"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://github.com/sakibhasan-24/seller-buyer"
                >
                  Seller and Buyer
                </a>
              </p>
            </div>
            <p className="text-lg text-gray-300 font-semibold">
              Tools: React.js, Firebase (Hosting)
            </p>
          </div>
        </div>
        <div
          data-aos="flip-up"
          data-aos-duration="1000"
          className="bg-gray-100 rounded-lg shadow-lg overflow-hidden"
        >
          <div className="p-6">
            <h2 className="text-2xl mb-4 font-bold text-gray-800">Book Swap</h2>
            <div className="mb-6">
              <p className="text-lg mb-2 text-gray-700">
                <span className="font-semibold">Live Link:</span>{" "}
                <a
                  className="text-blue-600 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://book-swap-64d94.web.app/"
                >
                  Book Swap
                </a>
              </p>
              <p className="text-lg mb-2 text-gray-700">
                <span className="font-semibold">Client Code Link:</span>{" "}
                <a
                  className="text-blue-600 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://github.com/sakibhasan-24/book-swap-client"
                >
                  Client
                </a>
              </p>
              <p className="text-lg mb-2 text-gray-700">
                <span className="font-semibold">Server Code Link:</span>{" "}
                <a
                  className="text-blue-600 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://github.com/sakibhasan-24/book-swap-server"
                >
                  Server
                </a>
              </p>
            </div>
            <p className="text-lg font-semibold text-gray-700">
              Tools: React.js, Firebase,mongodb ,express js,node js
            </p>
          </div>
        </div>
        <div
          data-aos="fade-up-left"
          className="bg-orange-100 rounded-lg overflow-hidden shadow-lg"
        >
          <div className="p-6">
            <h2 className="text-2xl mb-4 font-bold text-gray-800">
              Home service
            </h2>
            <div className="mb-6">
              <p className="text-lg mb-2 text-gray-700">
                <span className="font-semibold">Live Link:</span>{" "}
                <a
                  className="text-blue-600 hover:text-blue-700 transition-colors duration-300"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://home-services-e9d30.web.app/"
                >
                  Home Service
                </a>
              </p>
              <p className="text-lg mb-2 text-gray-700">
                <span className="font-semibold">Client Code Link:</span>{" "}
                <a
                  className="text-blue-600 hover:text-blue-700 transition-colors duration-300"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://github.com/sakibhasan-24/home-helping-client"
                >
                  Client
                </a>
              </p>
              <p className="text-lg mb-2 text-gray-700">
                <span className="font-semibold">Server Code Link:</span>{" "}
                <a
                  className="text-blue-600 hover:text-blue-700 transition-colors duration-300"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://github.com/sakibhasan-24/Home-helping-server"
                >
                  server
                </a>
              </p>
            </div>
            <p className="text-lg font-semibold text-gray-700">
              Tools: React.js, Firebase,mongodb ,express js,node js
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
