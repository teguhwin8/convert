"use client";

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { FaTimes } from 'react-icons/fa';
import { jsPDF } from 'jspdf';

const HomePage: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setSelectedFiles(Array.from(files));
    }
  };

  const handleRemoveImage = (index: number) => {
    setSelectedFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
  };

  const handleConvertToPDF = async () => {
    setLoading(true);

    const pdf = new jsPDF();

    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];
      const imageUrl = URL.createObjectURL(file);
      const img = await loadImage(imageUrl);

      const width = img.width;
      const height = img.height;
      pdf.internal.pageSize.setWidth(width);
      pdf.internal.pageSize.setHeight(height);

      pdf.addImage(img, 'JPEG', 0, 0, width, height);

      if (i < selectedFiles.length - 1) {
        pdf.addPage();
      }
    }

    pdf.save('converted.pdf');
    setLoading(false);
  };

  const loadImage = (url: string): Promise<HTMLImageElement> => {
    return new Promise((resolve) => {
      const img = new window.Image(); // Ensure it's recognized in the TypeScript context
      img.src = url;
      img.onload = () => resolve(img);
    });
  };

  return (
    <div>
      <header className="flex flex-col md:flex-row justify-between items-center p-4 border-b border-gray-300">
        <div className="text-2xl md:text-4xl font-bold mb-2 md:mb-0">I ❤️ PDF</div>
        <nav className="flex flex-wrap justify-center space-x-4 mb-2 md:mb-0">
          <a href="#" className="text-black">MERGE PDF</a>
          <a href="#" className="text-black">SPLIT PDF</a>
          <a href="#" className="text-black">COMPRESS PDF</a>
          <a href="#" className="text-black">CONVERT PDF</a>
          <a href="#" className="text-black">ALL PDF TOOLS</a>
        </nav>
        <div className="flex space-x-2">
          <button className="px-3 py-1 border border-gray-300 rounded bg-gray-200">Login</button>
          <button className="px-3 py-1 border border-gray-300 rounded bg-gray-200">Sign up</button>
        </div>
      </header>
      <main className="text-center py-12 px-4">
        <h1 className="text-3xl md:text-5xl mb-4">JPG to PDF</h1>
        <p className="mb-6 text-lg md:text-xl">Convert JPG images to PDF in seconds. Easily adjust orientation and margins.</p>
        <button 
          className="px-6 py-3 bg-red-500 text-white text-lg rounded" 
          onClick={handleButtonClick}
        >
          Select JPG images
        </button>
        <input
          type="file"
          ref={fileInputRef}
          accept="image/jpeg"
          className="hidden"
          multiple
          onChange={handleFileChange}
        />
        <p className="mt-2 text-sm md:text-base">or drop JPG images here</p>
        {selectedFiles.length > 0 && (
          <div>
            <div className="mt-4 flex flex-wrap gap-3 justify-center">
              {selectedFiles.map((file, index) => {
                const imageUrl = URL.createObjectURL(file);
                return (
                  <div key={index} className="relative h-32 w-32">
                    <Image
                      src={imageUrl}
                      alt={`Selected Image ${index + 1}`}
                      layout="fill"
                      objectFit="cover"
                      className="rounded"
                    />
                    <button
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 hover:bg-red-700 transition-colors"
                      onClick={() => handleRemoveImage(index)}
                    >
                      <FaTimes />
                    </button>
                  </div>
                );
              })}
            </div>
            <button
              className={`mt-6 px-6 py-3 bg-blue-500 text-white text-lg rounded ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={handleConvertToPDF}
              disabled={loading}
            >
              {loading ? 'Converting...' : 'Convert the Images into PDF'}
            </button>
          </div>
        )}
      </main>
      <footer className="text-center py-4 border-t border-gray-300 text-sm md:text-base">
        © iLovePDF 2024 • Your PDF Editor
      </footer>
    </div>
  );
}

export default HomePage;
