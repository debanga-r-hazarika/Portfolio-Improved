import React from 'react';

const skills = {
  "Technical": [
    { name: "Full Stack Development", level: 90 },
    { name: "Cybersecurity", level: 85 },
    { name: "Data Structures & Algorithms", level: 85 },
    { name: "Cloud Solutions", level: 80 },
    { name: "Database Management", level: 85 }
  ],
  "Business & Leadership": [
    { name: "Project Management", level: 90 },
    { name: "Business Strategy", level: 85 },
    { name: "Team Leadership", level: 85 },
    { name: "Market Analysis", level: 80 },
    { name: "Risk Management", level: 80 }
  ]
};

export default function Skills() {
  return (
    <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-800/50">
      <div className="container mx-auto px-6 flex flex-col items-center relative">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/30 to-transparent dark:from-indigo-900/10 pointer-events-none" />
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-900 dark:text-white">
          Skills & Expertise
        </h2>
        
        <div className="grid md:grid-cols-2 gap-x-20 gap-y-16 w-full max-w-6xl">
          {Object.entries(skills).map(([category, items]) => (
            <div key={category} className="flex flex-col items-center backdrop-blur-sm bg-white/50 dark:bg-gray-800/50 rounded-2xl p-8 shadow-xl dark:shadow-gray-900/30">
              <h3 className="text-2xl font-bold mb-10 bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
                {category}
              </h3>
              <div className="space-y-8 w-full">
                {items.map((skill, index) => (
                  <div key={index} className="group">
                    <div className="flex justify-between mb-3">
                      <span className="text-gray-700 dark:text-gray-300 font-medium group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {skill.name}
                      </span>
                      <span className="text-gray-500 dark:text-gray-400 font-mono group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="h-2.5 bg-gray-200/70 dark:bg-gray-700/50 rounded-full overflow-hidden shadow-inner group-hover:bg-gray-300/70 dark:group-hover:bg-gray-600/50 transition-colors">
                      <div 
                        className="h-full bg-gradient-to-r from-indigo-600 to-blue-500 dark:from-indigo-400 dark:to-blue-400 rounded-full transition-all duration-500 ease-out shadow group-hover:shadow-lg group-hover:scale-[1.02] origin-left"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}