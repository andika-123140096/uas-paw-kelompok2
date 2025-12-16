import React from "react";
import {
  MapPin,
  DollarSign,
  Clock,
  Bookmark,
  BookmarkCheck,
  Building2,
  ArrowLeft,
} from "lucide-react";

const JobDetailPage = ({
  job,
  currentUser,
  savedJobs,
  applications,
  onToggleSave,
  onApply,
  onNavigate,
}) => {
  const hasApplied = applications.find((app) => app.job_id === job.id);
  const isSaved = savedJobs.includes(job.id);

  const handleApply = () => {
    onApply(job.id);
    onNavigate("applications");
  };

  return (
    <div className="relative min-h-screen bg-black py-24 flex flex-col items-center">
      {/* Grid Background */}
      <div className="absolute inset-0 grid-pattern opacity-20"></div>

      <div
        className="relative w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8"
        style={{ marginTop: "6rem" }}
      >
        {/* Back Button */}
        <button
          onClick={() => onNavigate("jobs")}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 font-semibold"
        >
          <ArrowLeft size={20} />
          Back to Jobs
        </button>

        {/* Job Card */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl opacity-30 blur-2xl"></div>

          <div className="relative glass rounded-3xl p-16 border border-white/10">
            {/* Header */}
            <div className="flex items-start justify-between mb-8">
              <div className="flex gap-6 flex-1">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl blur-xl opacity-75"></div>
                  <div className="relative w-20 h-20 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl flex-shrink-0">
                    <span className="text-3xl font-black text-white">
                      {job.company_name[0].toUpperCase()}
                    </span>
                  </div>
                </div>

                <div className="flex-1">
                  <h1 className="text-4xl md:text-5xl font-black text-white mb-3 leading-tight">
                    {job.title}
                  </h1>
                  <div className="flex items-center gap-2 text-gray-400 text-lg mb-4">
                    <Building2 size={20} />
                    <span className="font-semibold">{job.company_name}</span>
                  </div>
                </div>
              </div>

              {currentUser && currentUser.role === "seeker" && (
                <button
                  onClick={() => onToggleSave(job.id)}
                  className="text-gray-400 hover:text-indigo-400 transition-all p-3 hover:bg-indigo-500/10 rounded-xl"
                >
                  {isSaved ? (
                    <BookmarkCheck size={28} className="text-indigo-400" />
                  ) : (
                    <Bookmark size={28} />
                  )}
                </button>
              )}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-3 mb-10">
              <span className="px-5 py-2.5 glass border border-indigo-500/30 text-indigo-300 rounded-xl font-bold">
                {job.type}
              </span>
              <span className="px-5 py-2.5 glass border border-white/10 text-gray-300 rounded-xl font-semibold flex items-center gap-2">
                <MapPin size={16} />
                {job.location}
              </span>
              <span className="px-5 py-2.5 glass border border-emerald-500/30 text-emerald-300 rounded-xl font-bold flex items-center gap-2">
                <DollarSign size={16} />
                {job.salary}
              </span>
              <span className="px-5 py-2.5 glass border border-white/10 text-gray-400 rounded-xl font-medium flex items-center gap-2">
                <Clock size={16} />
                Posted {new Date(job.created_at).toLocaleDateString()}
              </span>
            </div>

            {/* Description */}
            <div className="mb-10">
              <h2 className="text-2xl font-black text-white mb-4">
                About the Role
              </h2>
              <p className="text-gray-400 leading-relaxed text-lg">
                {job.description}
              </p>
            </div>

            {/* Requirements */}
            <div className="mb-10">
              <h2 className="text-2xl font-black text-white mb-4">
                Requirements
              </h2>
              <div className="flex flex-wrap gap-3">
                {job.requirements.map((req, idx) => (
                  <span
                    key={idx}
                    className="px-4 py-2.5 glass border border-white/10 text-gray-300 rounded-xl font-semibold"
                  >
                    {req}
                  </span>
                ))}
              </div>
            </div>

            {/* Apply Button */}
            {currentUser && currentUser.role === "seeker" && (
              <button
                onClick={handleApply}
                disabled={hasApplied}
                className={`w-full py-5 rounded-2xl font-black text-lg transition-all ${
                  hasApplied
                    ? "glass border border-emerald-500/30 text-emerald-300 cursor-not-allowed"
                    : "bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-2xl hover:shadow-indigo-500/50 transform hover:scale-105 btn-shine"
                }`}
              >
                {hasApplied ? "✓ Already Applied" : "Apply Now"}
              </button>
            )}

            {!currentUser && (
              <button
                onClick={() => onNavigate("login")}
                className="w-full py-5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl font-black text-lg hover:shadow-2xl hover:shadow-indigo-500/50 transition-all transform hover:scale-105 btn-shine"
              >
                Login to Apply
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailPage;
