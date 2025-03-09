import React from 'react';

export default function Logo({ className = '' }: { className?: string }) {
  return (
    <div className={`relative font-bold tracking-wider ${className}`}>
      <div className="flex items-center text-4xl font-black">
        <span className="text-gray-900 dark:text-white">D</span>
        <span className="text-gray-900 dark:text-white ml-4">R</span>
      </div>
      <div className="text-[0.6rem] tracking-[0.3em] mt-1 text-gray-900 dark:text-white">
        DEBANGA RAZ
      </div>
    </div>
  );
}