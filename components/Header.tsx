
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center">
      <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
        Academic Tracker
      </h1>
      <p className="mt-2 text-lg text-slate-400">
        Stay organized with your exams and assignments.
      </p>
    </header>
  );
};

export default Header;
