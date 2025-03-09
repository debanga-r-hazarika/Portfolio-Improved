import React from 'react';
import { BookOpen, Code, Database, Network } from 'lucide-react';

const courses = [
  {
    icon: <Code className="w-6 h-6" />,
    name: "Network Security",
    description: "Network protocols, security measures, and threat detection"
  },
  {
    icon: <Database className="w-6 h-6" />,
    name: "Cryptography",
    description: "Encryption algorithms, digital signatures, and secure protocols"
  },
  {
    icon: <Network className="w-6 h-6" />,
    name: "Ethical Hacking",
    description: "Penetration testing, vulnerability assessment, and security auditing"
  },
  {
    icon: <BookOpen className="w-6 h-6" />,
    name: "System Security",
    description: "OS hardening, access control, and security policies"
  }
];

export default function Coursework() {
  return (
    <section id="coursework" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-900 dark:text-white">
          Relevant Coursework
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {courses.map((course, index) => (
            <div key={index} className="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl hover:shadow-lg transition-shadow">
              <div className="text-indigo-600 dark:text-indigo-400 mb-4">
                {course.icon}
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                {course.name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {course.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}