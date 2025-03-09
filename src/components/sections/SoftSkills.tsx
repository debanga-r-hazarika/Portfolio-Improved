import React from 'react';
import { Users, Brain, MessageSquare, Target } from 'lucide-react';

const softSkills = [
  {
    icon: <Brain className="w-8 h-8" />,
    name: "Strategic Thinking",
    description: "Business analysis and solution architecture"
  },
  {
    icon: <MessageSquare className="w-8 h-8" />,
    name: "Leadership",
    description: "Team management and project coordination"
  },
  {
    icon: <Users className="w-8 h-8" />,
    name: "Business Acumen",
    description: "Market understanding and growth strategies"
  },
  {
    icon: <Target className="w-8 h-8" />,
    name: "Innovation",
    description: "Identifying opportunities and driving change"
  }
];

export default function SoftSkills() {
  return (
    <section id="soft-skills" className="py-20 bg-gray-50 dark:bg-gray-800/50">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-900 dark:text-white">
          Soft Skills
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {softSkills.map((skill, index) => (
            <div key={index} className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="text-indigo-600 dark:text-indigo-400 mb-4">
                {skill.icon}
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                {skill.name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {skill.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}