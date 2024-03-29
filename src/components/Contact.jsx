import React, { useState } from "react";

const EMAIL = `sakibhasan200176@gmail.com`;
export default function Contact() {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const handleSubjectChange = (e) => {
    setSubject(e.target.value);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSendEmail = () => {
    // const email={`mailto:${EMAIL}?subject=${subject}&body=${message}`}
    const email = `mailto:${EMAIL}?subject=${subject}&body=${message}`;
    window.location.href = email;
  };
  return (
    <div className="max-w-4xl mx-auto my-12">
      <h1 className="text-center font-semibold text-4xl">Contact</h1>
      <p className="text-xl text-slate-800">
        For more information, please contact with me at:
      </p>
      <address>
        <p>Phone: ++00000</p>
        <div
          data-aos="zoom-in"
          className="max-w-md mx-auto my-12 p-6 bg-white rounded-lg shadow-lg shadow-blue-300"
        >
          <h1 className="text-center text-3xl font-semibold text-gray-800 mb-6">
            Contact Me
          </h1>
          <form className="flex flex-col gap-4">
            <div>
              <label htmlFor="subject" className="text-gray-700">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={subject}
                onChange={handleSubjectChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="message" className="text-gray-700">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={message}
                onChange={handleMessageChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                rows={6}
              />
            </div>

            <button
              onClick={handleSendEmail}
              className="bg-green-700 text-white font-bold uppercase px-4 py-2 rounded-md"
            >
              Send Message
            </button>
          </form>
        </div>

        <p>
          Email:{" "}
          <a href="mailto:sakibhasan200176@gmail.com">
            sakibhasan200176@gmail.com
          </a>
        </p>
        <p>
          Github :{" "}
          <a
            className="text-blue-500 hover:underline"
            href="https://github.com/sakibhasan-24"
            target="_blank"
          >
            https://github.com/sakibhasan-24
          </a>
        </p>
      </address>
    </div>
  );
}
