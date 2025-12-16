import React from "react";
import {
  Briefcase,
  TrendingUp,
  Users,
  Zap,
  ArrowRight,
  Sparkles,
  Star,
  Award,
} from "lucide-react";

const HomePage = ({
  onNavigate,
  searchQuery,
  setSearchQuery,
  locationFilter,
  setLocationFilter,
}) => {
  const handleSearch = () => {
    onNavigate("jobs");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute inset-0 grid-pattern opacity-5"></div>
        <div className="absolute top-20 left-20 w-96 h-96 bg-indigo-600/5 rounded-full blur-3xl"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl"></div>
      </div>

      {/* Main Content */}
      <div className="relative">
        <div className="w-full" style={{paddingTop: '120px', paddingBottom: '80px'}}>
          
          {/* Badge */}
          <div className="flex justify-center mb-16">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/5 rounded-full border border-white/20">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span className="text-sm font-semibold text-white">
                Trusted by 10,000+ professionals
              </span>
            </div>
          </div>

          {/* Hero Heading */}
          <div className="flex flex-col items-center justify-center mb-20 px-4">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black leading-tight text-center">
              <div className="text-white mb-3">Find Your</div>
              <div className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                Dream Job
              </div>
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl text-center mt-8">
              Join thousands of professionals who found their perfect career match. Start your journey today.
            </p>
          </div>

          {/* Search Section */}
          <div className="flex justify-center mb-32 px-4">
            <div className="w-full max-w-4xl">
              <div className="glass rounded-2xl p-6 border border-white/10">
                <div className="flex flex-col md:flex-row gap-4">
                  <input
                    type="text"
                    placeholder="Search jobs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="flex-1 px-5 py-4 bg-white/5 text-white rounded-xl border border-white/10 focus:border-indigo-500 focus:outline-none transition-colors"
                  />
                  <input
                    type="text"
                    placeholder="Location..."
                    value={locationFilter}
                    onChange={(e) => setLocationFilter(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="flex-1 px-5 py-4 bg-white/5 text-white rounded-xl border border-white/10 focus:border-indigo-500 focus:outline-none transition-colors"
                  />
                  <button
                    onClick={handleSearch}
                    className="px-10 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold hover:opacity-90 transition-all flex items-center justify-center gap-2 whitespace-nowrap"
                  >
                    <span>Search</span>
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>

              {/* Popular Keywords */}
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <span className="text-gray-500 text-sm mr-2">Popular:</span>
                {["Frontend", "Designer", "Backend", "Marketing"].map((term) => (
                  <button
                    key={term}
                    onClick={() => {
                      setSearchQuery(term);
                      handleSearch();
                    }}
                    className="px-6 py-2.5 glass rounded-full border border-white/10 text-gray-300 text-sm hover:border-indigo-500/50 hover:text-white transition-all"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="flex justify-center mb-40 px-4">
            <div className="w-full max-w-5xl">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { icon: Briefcase, number: "1,000+", label: "Active Jobs", color: "from-indigo-500 to-purple-600" },
                  { icon: TrendingUp, number: "500+", label: "Companies", color: "from-purple-500 to-pink-600" },
                  { icon: Users, number: "10,000+", label: "Hired", color: "from-pink-500 to-red-600" },
                ].map((stat, index) => (
                  <div key={index} className="glass rounded-2xl p-8 border border-white/10 text-center">
                    <div className={`w-16 h-16 mx-auto mb-6 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center`}>
                      <stat.icon className="text-white" size={28} />
                    </div>
                    <div className="text-5xl font-black text-white mb-2">{stat.number}</div>
                    <div className="text-gray-400">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="flex justify-center mb-40 px-4">
            <div className="w-full max-w-5xl">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Why Choose Us?</h2>
                <p className="text-lg text-gray-400">Everything you need to succeed</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { icon: Zap, title: "Lightning Fast", description: "Apply to jobs in seconds with our streamlined process.", color: "from-yellow-500 to-orange-600" },
                  { icon: Star, title: "Top Quality", description: "All jobs are verified and from reputable companies.", color: "from-indigo-500 to-purple-600" },
                  { icon: Award, title: "Best Matches", description: "AI-powered matching finds your perfect career fit.", color: "from-pink-500 to-red-600" },
                ].map((feature, index) => (
                  <div key={index} className="glass rounded-2xl p-8 border border-white/10 text-center">
                    <div className={`w-14 h-14 mb-6 mx-auto bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center`}>
                      <feature.icon className="text-white" size={24} />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
                    <p className="text-gray-400">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="flex justify-center px-4">
            <div className="w-full max-w-4xl">
              <div className="glass rounded-2xl p-12 border border-white/10 text-center">
                <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Ready to Get Started?</h2>
                <p className="text-lg text-gray-400 mb-10 justify-center">Join thousands who found their dream careers</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={() => onNavigate("register")}
                    className="px-10 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold hover:opacity-90 transition-all"
                  >
                    Sign Up Free
                  </button>
                  <button
                    onClick={() => onNavigate("jobs")}
                    className="px-10 py-4 glass border border-white/10 text-white rounded-xl font-bold hover:border-white/20 transition-all"
                  >
                    Browse Jobs
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default HomePage;
