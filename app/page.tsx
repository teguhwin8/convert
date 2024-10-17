import React from 'react';

const HomePage = () => {
  return (
    <div>
      <header className="flex justify-between items-center p-4 border-b border-gray-300">
        <div className="text-2xl font-bold">I ❤️ PDF</div>
        <nav className="flex space-x-4">
          <a href="#" className="text-black">MERGE PDF</a>
          <a href="#" className="text-black">SPLIT PDF</a>
          <a href="#" className="text-black">COMPRESS PDF</a>
          <a href="#" className="text-black">CONVERT PDF</a>
          <a href="#" className="text-black">ALL PDF TOOLS</a>
        </nav>
        <div className="flex space-x-2">
          <button className="px-3 py-1 border border-gray-300 rounded">Login</button>
          <button className="px-3 py-1 border border-gray-300 rounded">Sign up</button>
        </div>
      </header>
      <main className="text-center py-12">
        <h1 className="text-4xl mb-4">JPG to PDF</h1>
        <p className="mb-6">Convert JPG images to PDF in seconds. Easily adjust orientation and margins.</p>
        <button className="px-6 py-2 bg-red-500 text-white rounded">Select JPG images</button>
        <p className="mt-2">or drop JPG images here</p>
      </main>
      <footer className="text-center py-4 border-t border-gray-300">
        © iLovePDF 2024 • Your PDF Editor
      </footer>
    </div>
  );
};

export default HomePage;
