import React from 'react';
import { Search, MapPin, Briefcase, TrendingUp, Users, Zap, ArrowRight, Sparkles, Star, Award } from 'lucide-react';

const HomePage = ({ onNavigate, searchQuery, setSearchQuery, locationFilter, setLocationFilter }) => {
  const handleSearch = () => {
    onNavigate('jobs');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 grid-pattern opacity-20"></div>
      
      {/* Gradient Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute top-40 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>

      {/* Hero Section */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24">
        {/* Badge */}
        <div className="text-center mb-8 animate-fadeIn">
          <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full border border-white/10">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span className="text-sm font-semibold text-gray-300">Trusted by 10,000+ professionals</span>
          </div>
        </div>

        {/* Main Heading */}
        <div className="text-center mb-16 space-y-8">
          <h1 className="text-7xl md:text-8xl lg:text-9xl font-black text-white leading-none tracking-tight">
            <span className="block animate-slideInLeft">Find Your</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 animate-slideInRight" style={{ animationDelay: '0.2s' }}>
              Dream Job
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed animate-fadeIn font-light" style={{ animationDelay: '0.4s' }}>
            Join thousands of professionals who found their perfect career match. 
            Start your journey today.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-4xl mx-auto mb-16 animate-scaleIn" style={{ animationDelay: '0.6s' }}>
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl opacity-50 blur-xl group-hover:opacity-75 transition-opacity"></div>
            
            <div className="relative glass rounded-3xl p-3 border border-white/10">
              <div className="flex flex-col md:flex-row gap-3">
                <div className="flex-1 relative">
                  <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search jobs..."
                    className="w-full pl-14 pr-6 py-5 bg-white/5 text-white text-lg rounded-2xl border border-white/10 focus:border-indigo-500 focus:outline-none transition-all placeholder:text-gray-500 font-medium backdrop-blur-xl"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={handleKeyPress}
                  />
                </div>
                
                <div className="flex-1 relative">
                  <MapPin className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Location..."
                    className="w-full pl-14 pr-6 py-5 bg-white/5 text-white text-lg rounded-2xl border border-white/10 focus:border-purple-500 focus:outline-none transition-all placeholder:text-gray-500 font-medium backdrop-blur-xl"
                    value={locationFilter}
                    onChange={(e) => setLocationFilter(e.target.value)}
                    onKeyPress={handleKeyPress}
                  />
                </div>
                
                <button
                  onClick={handleSearch}
                  className="relative px-10 py-5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl font-bold text-lg shadow-2xl shadow-indigo-500/50 hover:shadow-indigo-500/75 transition-all transform hover:scale-105 flex items-center justify-center gap-3 group/btn overflow-hidden btn-shine"
                >
                  <span className="relative z-10">Search</span>
                  <ArrowRight className="relative z-10 group-hover/btn:translate-x-1 transition-transform" size={20} />
                </button>
              </div>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <span className="text-gray-500 font-medium text-sm">Popular:</span>
            {['Frontend', 'Designer', 'Backend', 'Marketing'].map((term) => (
              <button
                key={term}
                onClick={() => {
                  setSearchQuery(term);
                  handleSearch();
                }}
                className="px-4 py-2 glass rounded-full border border-white/10 text-gray-300 text-sm font-medium hover:border-indigo-500/50 hover:text-white transition-all"
              >
                {term}
              </button>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-32">
          {[
            { icon: Briefcase, number: '1,000+', label: 'Active Jobs', color: 'from-indigo-500 to-purple-600' },
            { icon: TrendingUp, number: '500+', label: 'Companies', color: 'from-purple-500 to-pink-600' },
            { icon: Users, number: '10,000+', label: 'Hired', color: 'from-pink-500 to-red-600' },
          ].map((stat, index) => (
            <div
              key={index}
              className="relative group card-hover"
              style={{ animationDelay: `${0.8 + index * 0.1}s` }}
            >
              <div className={`absolute -inset-1 bg-gradient-to-r ${stat.color} rounded-3xl opacity-30 blur-xl group-hover:opacity-50 transition-opacity`}></div>
              
              <div className="relative glass rounded-3xl p-8 border border-white/10 text-center">
                <div className={`w-16 h-16 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-2xl group-hover:scale-110 transition-transform`}>
                  <stat.icon className="text-white" size={28} />
                </div>
                <div className="text-5xl font-black text-white mb-2">{stat.number}</div>
                <div className="text-gray-400 font-semibold">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Features */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-black text-white mb-4">
              Why Choose Us?
            </h2>
            <p className="text-xl text-gray-400 font-light">Everything you need to succeed</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { 
                icon: Zap, 
                title: 'Lightning Fast', 
                description: 'Apply to jobs in seconds with our streamlined process.',
                color: 'from-yellow-500 to-orange-600'
              },
              { 
                icon: Star, 
                title: 'Top Quality', 
                description: 'All jobs are verified and from reputable companies.',
                color: 'from-indigo-500 to-purple-600'
              },
              { 
                icon: Award, 
                title: 'Best Matches', 
                description: 'AI-powered matching finds your perfect career fit.',
                color: 'from-pink-500 to-red-600'
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="relative group card-hover"
              >
                <div className={`absolute -inset-1 bg-gradient-to-r ${feature.color} rounded-3xl opacity-20 blur-xl group-hover:opacity-40 transition-opacity`}></div>
                
                <div className="relative glass rounded-3xl p-8 border border-white/10 h-full">
                  <div className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 shadow-xl`}>
                    <feature.icon className="text-white" size={24} />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed font-light">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl opacity-50 blur-2xl"></div>
          
          <div className="relative glass rounded-3xl p-16 border border-white/10 text-center">
            <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto font-light">
              Join thousands who found their dream careers
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => onNavigate('register')}
                className="px-10 py-5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl font-bold text-lg shadow-2xl shadow-indigo-500/50 hover:shadow-indigo-500/75 transition-all transform hover:scale-105 btn-shine"
              >
                Sign Up Free
              </button>
              <button
                onClick={() => onNavigate('jobs')}
                className="px-10 py-5 glass border border-white/10 text-white rounded-2xl font-bold text-lg hover:border-white/20 transition-all transform hover:scale-105"
              >
                Browse Jobs
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;