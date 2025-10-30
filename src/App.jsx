import { useState } from 'react';
import { motion } from 'framer-motion';
import './App.css';
import { useTheme } from './theme-context';
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: "AIzaSyD494DPISQJBmIHq-OfV674RStgZeswy7w" }); 

function App() {
  const { theme, toggleTheme } = useTheme();
  const [form, setForm] = useState({ name: '', email: '', company: '', license: '', message: '' });
  const [showChat, setShowChat] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { sender: 'bot', text: 'Welcome! Ask me anything about selling your license.' }
  ]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Form submitted succesfully');
  };

  const handleChatInputChange = (e) => {
    setChatInput(e.target.value);
  };

  const sendMessage = async () => {
    if (!chatInput.trim()) return;
    const userMessage = { sender: 'user', text: chatInput.trim() };
    setChatMessages((prev) => [...prev, userMessage]);
    setChatInput('');
    setLoading(true);

    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: userMessage.text,
      });
      const botMessage = { sender: 'bot', text: response.text || 'Sorry, no response from the API.' };
      setChatMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      const errorMessage = { sender: 'bot', text: 'Error contacting API. Please try again later.' };
      setChatMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className={`${theme === 'dark' ? 'dark' : ''}`}>
      <div className="min-h-screen font-sans transition-colors bg-white dark:bg-black text-gray-900 dark:text-white">

        {/* Header */}
        <header className="p-4 flex justify-between items-center shadow-md bg-gray-50 dark:bg-gray-800">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="SoftSell Logo" className="h-8" />
            <h1 className="text-2xl font-bold">Soft Sell</h1>
          </div>
          <button
            onClick={toggleTheme}
            className="bg-gray-100 dark:bg-gray-700 p-2 rounded-full hover:ring-2 ring-blue-400 transition"
            aria-label="Toggle dark mode"
          >
            {theme === 'dark' ? '🌙' : '🌞'}
          </button>
        </header>

        {/* Hero Section */}
        <section className="text-center py-20 px-4 bg-gradient-to-br from-blue-100 to-blue-50 dark:from-gray-800 dark:to-gray-900">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4">Turn Unused Software Into Cash</h2>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            Resell your unused software licenses securely, quickly, and profitably.
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 transition text-white px-8 py-3 rounded-lg shadow-md">
            Sell My Licenses
          </button>
        </section>

        {/* How It Works */}
        <section className="py-20 px-6 text-center">
          <h3 className="text-3xl font-bold mb-12">How It Works</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {['Upload License', 'Get Valuation', 'Get Paid'].map((step, i) => (
              <motion.div
                key={i}
                className="p-6 border rounded-lg shadow-md bg-white dark:bg-gray-800"
                whileHover={{ scale: 1.05 }}
              >
                <img src={
                          i === 0
                          ? 'https://static.vecteezy.com/system/resources/previews/022/009/942/non_2x/certificate-icon-in-flat-style-license-badge-illustration-on-white-isolated-background-winner-medal-business-concept-free-vector.jpg'
                          : i === 1
                          ? 'https://static.vecteezy.com/system/resources/previews/016/622/428/original/valuation-icon-design-free-vector.jpg'
                          : 'https://cdn1.iconfinder.com/data/icons/business-finance-1-1/128/buy-with-cash-1024.png'
                          }
                          className="mx-auto mb-4 h-20 w-20 object-contain"
                          alt={step}
                />
                <h4 className="text-xl font-medium">{step}</h4>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20 px-6 text-center bg-gray-100 dark:bg-gray-800">
          <h3 className="text-3xl font-bold mb-12">Why Choose Us</h3>
          <div className="grid md:grid-cols-4 gap-6">
            {["Secure Process", "Instant Valuation", "Trusted by Companies", "Top Payouts"].map((reason, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                className="p-6 border rounded-lg shadow-sm bg-black dark:bg-gray-800">
                <img src={
                          i === 0
                          ? 'https://img.freepik.com/premium-vector/secure-ssl-encryption-logo-secure-connection-icon-vector-illustration-ssl-certificate-icon_526569-863.jpg'
                          : i === 1
                          ? 'https://static.vecteezy.com/system/resources/previews/027/457/319/original/property-valuation-icon-in-illustration-vector.jpg'
                          : i === 2
                          ? 'https://png.pngtree.com/png-clipart/20220602/original/pngtree-trust-badges-with-red-ribbon-png-image_7885135.png'
                          : 'https://static.vecteezy.com/system/resources/previews/034/793/995/original/payout-illustration-design-free-png.png'
                        }
                          className="mx-auto mb-2" alt="icon" />
                <p className="font-semibold">{reason}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 px-6 text-center">
          <h3 className="text-3xl font-bold mb-12">What Our Customers Say</h3>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                quote: "SoftSell made the license resale process effortless. We recovered value from dormant software in less than a week.",
                name: "Alice Smith",
                role: "IT Manager",
                company: "TechCorp"
              },
              {
                quote: "Fast, secure, and reliable. SoftSell helped us clear unused software and boost our procurement efficiency.",
                name: "John Doe",
                role: "Procurement Lead",
                company: "InnovateX"
              }
            ].map((t, i) => (
              <div key={i} className="p-6 border rounded shadow-md bg-blue-400 dark:bg-gray-800 text-amber-50">
                <p className="italic">"{t.quote}"</p>
                <p className="mt-4 font-semibold">– {t.name}, {t.role} at {t.company}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-20 px-6 text-center bg-gray-50 dark:bg-gray-900">
          <h3 className="text-3xl font-bold mb-12">Get In Touch</h3>
          <form onSubmit={handleSubmit} className="max-w-xl mx-auto text-left space-y-4">
            <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Name" required className="w-full p-3 border rounded dark:bg-gray-800" />
            <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email" required className="w-full p-3 border rounded dark:bg-gray-800" />
            <input type="text" name="company" value={form.company} onChange={handleChange} placeholder="Company" required className="w-full p-3 border rounded dark:bg-gray-800" />
            <select name="license" value={form.license} onChange={handleChange} required className="w-full p-3 border rounded dark:bg-gray-800">
              <option value="">Select License Type</option>
              <option value="office">Microsoft Office</option>
              <option value="adobe">Adobe Suite</option>
              <option value="autocad">AutoCAD</option>
            </select>
            <textarea name="message" value={form.message} onChange={handleChange} placeholder="Your Message" required className="w-full p-3 border rounded dark:bg-gray-800"></textarea>
            <button type="submit" className="bg-green-600 hover:bg-green-700 transition text-white px-6 py-3 rounded-lg shadow">
              Send Message
            </button>
          </form>
        </section>

        {/* Mock Chat Widget */}
        <div className="fixed bottom-4 right-4 z-50 w-72">
          <button
            onClick={() => setShowChat(!showChat)}
            className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg w-full"
          >
            💬 Customer Support
          </button>
          {showChat && (
            <div className="bg-white dark:bg-gray-800 text-sm p-4 mt-2 rounded shadow-xl flex flex-col h-96">
              <p className="font-semibold mb-2">AI Assistant</p>
              <div className="flex-1 overflow-y-auto mb-2">
                {chatMessages.map((msg, index) => (
                  <div
                    key={index}
                    className={`mb-2 p-2 rounded ${
                      msg.sender === 'user' ? 'bg-blue-100 text-right' : 'bg-gray-200 dark:bg-gray-700 text-left'
                    }`}
                  >
                    {msg.text}
                  </div>
                ))}
                {loading && <p>Loading...</p>}
              </div>
              <textarea
                value={chatInput}
                onChange={handleChatInputChange}
                onKeyDown={handleKeyDown}
                placeholder="Type your message..."
                className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white resize-none"
                rows={2}
              />
              <button
                onClick={sendMessage}
                disabled={loading}
                className="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded disabled:opacity-50"
              >
                Send
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
