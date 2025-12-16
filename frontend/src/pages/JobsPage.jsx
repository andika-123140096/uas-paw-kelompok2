import React, { useState } from "react";
import { Filter, X, Search, MapPin } from "lucide-react";
import JobCard from "../components/jobs/JobCard";

const JobsPage = ({
  jobs,
  currentUser,
  savedJobs,
  applications,
  searchQuery,
  setSearchQuery,
  locationFilter,
  setLocationFilter,
  typeFilter,
  setTypeFilter,
  onToggleSave,
  onViewDetails,
}) => {
  const [showFilters, setShowFilters] = useState(false);

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company_name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLocation =
      !locationFilter ||
      job.location.toLowerCase().includes(locationFilter.toLowerCase());
    const matchesType = !typeFilter || job.type === typeFilter;
    return matchesSearch && matchesLocation && matchesType;
  });

  const clearFilters = () => {
    setSearchQuery("");
    setLocationFilter("");
    setTypeFilter("");
  };

  return (
    <div className="min-h-screen bg-black py-20 sm:py-24">
      {/* Grid Background */}
      <div className="absolute inset-0 grid-pattern opacity-20"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 sm:mb-10 md:mb-12 gap-4 sm:gap-6">
          <div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-2 sm:mb-3">
              Browse{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                Jobs
              </span>
            </h1>
            <p className="text-gray-400 text-base sm:text-lg">
              Discover your next opportunity
            </p>
          </div>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden px-5 sm:px-6 py-2.5 sm:py-3 glass border border-white/10 text-white rounded-lg sm:rounded-xl flex items-center gap-2 font-bold text-sm sm:text-base"
          >
            <Filter size={18} className="sm:w-5 sm:h-5" />
            {showFilters ? "Hide" : "Show"} Filters
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:block ${showFilters ? "block" : "hidden"}`}>
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl sm:rounded-3xl opacity-20 blur-xl"></div>

              <div className="relative glass rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 border border-white/10 lg:sticky lg:top-28 mb-6 lg:mb-0">
                <div className="flex items-center justify-between mb-6 sm:mb-8">
                  <h2 className="text-xl sm:text-2xl font-black text-white">Filters</h2>
                  {(searchQuery || locationFilter || typeFilter) && (
                    <button
                      onClick={clearFilters}
                      className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-lg sm:rounded-xl"
                    >
                      <X size={18} className="sm:w-5 sm:h-5" />
                    </button>
                  )}
                </div>

                <div className="space-y-4 sm:space-y-6">
                  {/* Search */}
                  <div>
                    <label className="block text-gray-400 text-xs sm:text-sm font-bold mb-2 sm:mb-3">
                      Keywords
                    </label>
                    <div className="relative">
                      <Search
                        className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                        size={16}
                      />
                      <input
                        type="text"
                        placeholder="Job title..."
                        className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 glass border border-white/10 text-white text-sm sm:text-base rounded-lg sm:rounded-xl focus:border-indigo-500 focus:outline-none transition-all placeholder:text-gray-600 font-medium"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Location */}
                  <div>
                    <label className="block text-gray-400 text-xs sm:text-sm font-bold mb-2 sm:mb-3">
                      Location
                    </label>
                    <div className="relative">
                      <MapPin
                        className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                        size={16}
                      />
                      <input
                        type="text"
                        placeholder="City..."
                        className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 glass border border-white/10 text-white text-sm sm:text-base rounded-lg sm:rounded-xl focus:border-indigo-500 focus:outline-none transition-all placeholder:text-gray-600 font-medium"
                        value={locationFilter}
                        onChange={(e) => setLocationFilter(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Type */}
                  <div>
                    <label className="block text-gray-400 text-xs sm:text-sm font-bold mb-2 sm:mb-3">
                      Job Type
                    </label>
                    <select
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 glass border border-white/10 text-white text-sm sm:text-base rounded-lg sm:rounded-xl focus:border-indigo-500 focus:outline-none transition-all font-medium"
                      value={typeFilter}
                      onChange={(e) => setTypeFilter(e.target.value)}
                    >
                      <option value="">All Types</option>
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Contract">Contract</option>
                      <option value="Freelance">Freelance</option>
                      <option value="Internship">Internship</option>
                    </select>
                  </div>

                  {/* Clear Button */}
                  {(searchQuery || locationFilter || typeFilter) && (
                    <button
                      onClick={clearFilters}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 glass border border-white/10 text-white text-sm sm:text-base rounded-lg sm:rounded-xl hover:border-white/20 transition-all font-bold"
                    >
                      Clear All
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Job List */}
          <div className="lg:col-span-3">
            {/* Results Count */}
            <div className="mb-4 sm:mb-6 flex items-center justify-between">
              <div className="text-gray-400 font-medium text-sm sm:text-base">
                <span className="text-white font-bold text-lg sm:text-xl">
                  {filteredJobs.length}
                </span>{" "}
                jobs found
              </div>
            </div>

            {/* Jobs */}
            {filteredJobs.length === 0 ? (
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl sm:rounded-3xl opacity-20 blur-xl"></div>
                <div className="relative glass rounded-2xl sm:rounded-3xl p-10 sm:p-16 md:p-20 text-center border border-white/10">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 opacity-50">
                    <Search size={32} className="sm:w-10 sm:h-10 md:w-12 md:h-12 text-white" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-3">
                    No jobs found
                  </h3>
                  <p className="text-sm sm:text-base text-gray-400 mb-4 sm:mb-6">
                    Try adjusting your filters
                  </p>
                  <button
                    onClick={clearFilters}
                    className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl sm:rounded-2xl text-sm sm:text-base font-bold hover:shadow-2xl hover:shadow-indigo-500/50 transition-all transform hover:scale-105 btn-shine"
                  >
                    Clear Filters
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:gap-6">
                {filteredJobs.map((job) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    currentUser={currentUser}
                    savedJobs={savedJobs}
                    applications={applications}
                    onToggleSave={onToggleSave}
                    onViewDetails={onViewDetails}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobsPage;
