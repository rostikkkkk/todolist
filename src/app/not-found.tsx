import Link from 'next/link';
import React from 'react';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen">
      <h2 className="text-2xl mb-3">Not Found</h2>
      <p className="text-lg mb-6">Could not find requested resource</p>
      <Link
        href="/"
        className="bg-green-200 py-2 px-4 rounded-lg text-green-950 transition-colors duration-200 hover:bg-green-300 hover:text-green-900"
      >
        Return Home
      </Link>
    </div>
  );
};

export default NotFound;
