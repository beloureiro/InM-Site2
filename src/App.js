import React, { useState, useEffect, useMemo } from 'react';
import { Mail, Phone, Linkedin, MessageCircle } from 'lucide-react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import './index.css'; // Certifique-se de que o Tailwind CSS está configurado
import logo from './assets/rsz_1design_inmotion_181818.png'; // Ajuste o caminho para o logotipo

const DynamicExpertiseDashboard = () => {
  const [activeArea, setActiveArea] = useState('businessManagement');
  const [animateData, setAnimateData] = useState([]);

  const expertiseAreas = useMemo(() => ({
    businessManagement: {
      title: "Business Management",
      color: "#FF6B6B",
      skills: [
        { name: "Operational Management", value: 90 },
        { name: "Process Improvement", value: 85 },
        { name: "Strategic Planning", value: 80 },
        { name: "Financial Analysis", value: 75 },
        { name: "Project Management", value: 85 }
      ]
    },
    dataAnalysis: {
      title: "Data Analysis & Technology",
      color: "#4ECDC4",
      skills: [
        { name: "Business Intelligence (BI)", value: 85 },
        { name: "Microsoft Power BI", value: 90 },
        { name: "Data Modeling", value: 80 },
        { name: "Python Programming", value: 75 },
        { name: "Advanced Excel", value: 95 }
      ]
    },
    consultingTeaching: {
      title: "Consulting & Teaching",
      color: "#FFA62B",
      skills: [
        { name: "Business Consulting", value: 90 },
        { name: "Problem-Solving Training", value: 85 },
        { name: "Financial Training", value: 80 },
        { name: "Lean Process Management", value: 85 },
        { name: "Strategic Planning", value: 80 }
      ]
    }
  }), []);

  useEffect(() => {
    setAnimateData([]);
    const timer = setTimeout(() => {
      setAnimateData(expertiseAreas[activeArea].skills);
    }, 50);
    return () => clearTimeout(timer);
  }, [activeArea, expertiseAreas]);

  const renderRadarChart = () => {
    return (
      <ResponsiveContainer width="100%" height={300}> {/* Ajuste a altura do gráfico aqui */}
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={animateData}>
          <PolarGrid stroke="#e0e0e0" />
          <PolarAngleAxis dataKey="name" stroke="#ffffff" />
          <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#ffffff" />
          <Radar name={expertiseAreas[activeArea].title} dataKey="value" stroke={expertiseAreas[activeArea].color} fill={expertiseAreas[activeArea].color} fillOpacity={0.6} />
        </RadarChart>
      </ResponsiveContainer>
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex justify-center mb-6">
        {Object.keys(expertiseAreas).map(areaKey => (
          <button
            key={areaKey}
            onClick={() => setActiveArea(areaKey)}
            className={`px-4 py-2 mx-2 rounded transition-all duration-300 transform hover:scale-105 ${
              activeArea === areaKey 
                ? 'bg-black text-white'
                : 'bg-gray-800 hover:bg-gray-700 text-white'
            }`}
          >
            {expertiseAreas[areaKey].title}
          </button>
        ))}
      </div>
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg transition-all duration-500 transform hover:scale-105">
        <h2 className="text-2xl font-bold mb-4 text-center" style={{ color: expertiseAreas[activeArea].color }}>
          {expertiseAreas[activeArea].title}
        </h2>
        {renderRadarChart()}
      </div>
    </div>
  );
};

function App() {
  return (
    <div className="bg-black text-white min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl text-center">
        <h1 className="text-4xl font-bold mb-8">Solution in Business Management</h1>
        
        <div className="mb-12 transform hover:scale-105 transition-transform duration-300">
          <img src={logo} alt="InMotion logo" className="mx-auto" />
          <p className="mt-2 text-gray-400">Your Daily Toolbox for Business Excellence</p>
        </div>
        
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Our Expertise</h2>
          <p className="leading-relaxed">
            Explore our dynamic range of skills across key business domains. Our expertise is 
            tailored to elevate your business performance through innovative solutions and 
            strategic insights.
          </p>
        </div>
        
        <DynamicExpertiseDashboard />
        
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">Transform Your Business Today</h2>
          <div className="flex justify-center space-x-6">
            <a href="mailto:bc@inmotion.today" className="hover:text-green-400 transition-colors duration-300 transform hover:scale-110">
              <Mail size={24} />
            </a>
            <a href="tel:+351915542701" className="hover:text-green-400 transition-colors duration-300 transform hover:scale-110">
              <Phone size={24} />
            </a>
            <a href="https://www.linkedin.com/company/inmotionc" className="hover:text-green-400 transition-colors duration-300 transform hover:scale-110">
              <Linkedin size={24} />
            </a>
            <a href="https://wa.me/351915542701" className="hover:text-green-400 transition-colors duration-300 transform hover:scale-110">
              <MessageCircle size={24} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
