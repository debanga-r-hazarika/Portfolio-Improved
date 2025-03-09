import React from 'react';
import { Code2, Palette, Rocket, Zap } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="py-20 bg-gray-50 dark:bg-gray-800/50">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-900 dark:text-white">
          About Me
        </h2>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p className="text-lg text-gray-600 dark:text-gray-300"> 
              I'm a tech entrepreneur with a unique blend of full-stack development, cybersecurity, and business acumen. I specialize in building secure, scalable solutions that bridge the gap between technology innovation and business needs.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Currently pursuing my B.Tech in Computer Science at Assam Engineering College, I combine technical expertise with project management skills to lead innovative ventures. My focus is on creating secure digital solutions that drive business growth and technological advancement.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            {[
              {
                icon: <Code2 className="w-8 h-8" />,
                title: "Tech Leadership",
                description: "Driving innovation and growth"
              },
              {
                icon: <Palette className="w-8 h-8" />,
                title: "Business Strategy",
                description: "Market analysis & planning"
              },
              {
                icon: <Rocket className="w-8 h-8" />,
                title: "Project Management",
                description: "Agile methodologies & execution"
              },
              {
                icon: <Zap className="w-8 h-8" />,
                title: "Innovation",
                description: "Tech-driven solutions"
              }
            ].map((item, index) => (
              <div key={index} className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="text-indigo-600 dark:text-indigo-400 mb-4">
                  {item.icon}
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}