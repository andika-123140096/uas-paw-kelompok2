import React, { useState } from 'react';
import { Briefcase, Building2, DollarSign, MapPin, FileText, Tag } from 'lucide-react';

const PostJobPage = ({ onCreateJob }) => {
  const [title, setTitle] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [description, setDescription] = useState('');
  const [requirements, setRequirements] = useState('');
  const [salary, setSalary] = useState('');
  const [location, setLocation] = useState('');
  const [type, setType] = useState('Full-time');

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreateJob({
      title,
      company_name: companyName,
      description,
      requirements: requirements.split(',').map(r => r.trim()).filter(r => r),
      salary,
      location,
      type,
    });
    
    setTitle('');
    setCompanyName('');
    setDescription('');
    setRequirements('');
    setSalary('');
    setLocation('');
    setType('Full-time');
  };

  return (
    <div className="min-h-screen bg-black py-24">
      {/* Grid Background */}
      <div className="absolute inset-0 grid-pattern opacity-20"></div>
      
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl md:text-6xl font-black text-white mb-4 text-center">
          Post a <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Job</span>
        </h1>
        <p className="text-gray-400 text-center mb-12 text-lg">Fill in the details below</p>
        
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl opacity-30 blur-xl"></div>
          
          <form onSubmit={handleSubmit} className="relative glass rounded-3xl p-10 border border-white/10 space-y-6">
            {/* Title */}
            <div>
              <label className="block text-gray-400 text-sm font-bold mb-3 flex items-center gap-2">
                <Briefcase size={16} />
                Job Title *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-5 py-4 glass border border-white/10 text-white rounded-xl focus:border-indigo-500 focus:outline-none transition-all placeholder:text-gray-600 font-medium text-lg"
                placeholder="e.g. Senior Frontend Developer"
                required
              />
            </div>

            {/* Company */}
            <div>
              <label className="block text-gray-400 text-sm font-bold mb-3 flex items-center gap-2">
                <Building2 size={16} />
                Company Name *
              </label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full px-5 py-4 glass border border-white/10 text-white rounded-xl focus:border-indigo-500 focus:outline-none transition-all placeholder:text-gray-600 font-medium text-lg"
                placeholder="e.g. TechCorp"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-gray-400 text-sm font-bold mb-3 flex items-center gap-2">
                <FileText size={16} />
                Description *
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-5 py-4 glass border border-white/10 text-white rounded-xl focus:border-indigo-500 focus:outline-none h-40 resize-none transition-all placeholder:text-gray-600 font-medium"
                placeholder="Describe the role and responsibilities..."
                required
              />
            </div>

            {/* Requirements */}
            <div>
              <label className="block text-gray-400 text-sm font-bold mb-3 flex items-center gap-2">
                <Tag size={16} />
                Requirements *
              </label>
              <input
                type="text"
                value={requirements}
                onChange={(e) => setRequirements(e.target.value)}
                className="w-full px-5 py-4 glass border border-white/10 text-white rounded-xl focus:border-indigo-500 focus:outline-none transition-all placeholder:text-gray-600 font-medium"
                placeholder="e.g. React, TypeScript, Node.js (comma separated)"
                required
              />
              <p className="text-gray-500 text-xs mt-2">Separate each skill with a comma</p>
            </div>

            {/* Salary & Location */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-400 text-sm font-bold mb-3 flex items-center gap-2">
                  <DollarSign size={16} />
                  Salary Range *
                </label>
                <input
                  type="text"
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                  className="w-full px-5 py-4 glass border border-white/10 text-white rounded-xl focus:border-indigo-500 focus:outline-none transition-all placeholder:text-gray-600 font-medium"
                  placeholder="e.g. $80k-$120k"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-400 text-sm font-bold mb-3 flex items-center gap-2">
                  <MapPin size={16} />
                  Location *
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-5 py-4 glass border border-white/10 text-white rounded-xl focus:border-indigo-500 focus:outline-none transition-all placeholder:text-gray-600 font-medium"
                  placeholder="e.g. Remote, Jakarta"
                  required
                />
              </div>
            </div>

            {/* Job Type */}
            <div>
              <label className="block text-gray-400 text-sm font-bold mb-3">
                Job Type *
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full px-5 py-4 glass border border-white/10 text-white rounded-xl focus:border-indigo-500 focus:outline-none transition-all font-medium"
                required
              >
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Freelance">Freelance</option>
                <option value="Internship">Internship</option>
              </select>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-black text-lg hover:shadow-2xl hover:shadow-indigo-500/50 transition-all transform hover:scale-105 btn-shine"
            >
              Post Job
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostJobPage;