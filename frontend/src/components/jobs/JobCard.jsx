import React from "react";
import {
  MapPin,
  DollarSign,
  Clock,
  Bookmark,
  BookmarkCheck,
  Building2,
  ArrowRight,
} from "lucide-react";

const JobCard = ({
  job,
  currentUser,
  savedJobs,
  applications,
  onToggleSave,
  onViewDetails,
}) => {
  const isSaved = savedJobs.includes(job.id);
  const hasApplied = applications.find((app) => app.job_id === job.id);
  const isNew =
    new Date(job.created_at).getTime() > Date.now() - 7 * 24 * 60 * 60 * 1000;

  return (
    <div
      className="relative group card-hover cursor-pointer"
      onClick={() => onViewDetails(job)}
    >
      {/* Glow Effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl opacity-0 blur-xl group-hover:opacity-40 transition-opacity"></div>

      {/* Card */}
      <div className="relative glass rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 border border-white/10 group-hover:border-white/20 transition-all">
        {/* Header */}
        <div className="flex items-start justify-between mb-4 sm:mb-6">
          <div className="flex gap-3 sm:gap-4 md:gap-5 flex-1">
            {/* Company Logo */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl sm:rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
              <div className="relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-2xl flex-shrink-0">
                <span className="text-lg sm:text-xl md:text-2xl font-black text-white">
                  {job.company_name[0].toUpperCase()}
                </span>
              </div>

              {/* New Badge */}
              {isNew && (
                <div className="absolute -top-2 -right-2 bg-gradient-to-r from-emerald-500 to-green-500 text-white text-xs px-2.5 py-1 rounded-full font-black shadow-lg animate-pulse">
                  NEW
                </div>
              )}
            </div>

            {/* Job Info */}
            <div className="flex-1 min-w-0">
              <h3 className="text-lg sm:text-xl md:text-2xl font-black text-white mb-1.5 sm:mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-400 group-hover:to-purple-400 transition-all line-clamp-2">
                {job.title}
              </h3>
              <div className="flex items-center gap-1.5 sm:gap-2 text-gray-400 mb-2 sm:mb-3">
                <Building2 size={14} className="flex-shrink-0" />
                <span className="font-semibold text-sm sm:text-base truncate">{job.company_name}</span>
              </div>
            </div>
          </div>

          {/* Save Button */}
          {currentUser && currentUser.role === "seeker" && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleSave(job.id);
              }}
              className="text-gray-400 hover:text-indigo-400 transition-all p-2 sm:p-3 hover:bg-indigo-500/10 rounded-lg sm:rounded-xl flex-shrink-0"
            >
              {isSaved ? (
                <BookmarkCheck size={20} className="text-indigo-400 sm:w-6 sm:h-6" />
              ) : (
                <Bookmark size={20} className="sm:w-6 sm:h-6" />
              )}
            </button>
          )}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 sm:gap-2.5 mb-4 sm:mb-5">
          <span className="px-3 sm:px-4 py-1.5 sm:py-2 glass border border-indigo-500/30 text-indigo-300 rounded-lg sm:rounded-xl text-xs sm:text-sm font-bold">
            {job.type}
          </span>
          <span className="px-3 sm:px-4 py-1.5 sm:py-2 glass border border-white/10 text-gray-300 rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-1.5 sm:gap-2">
            <MapPin size={12} className="sm:w-3.5 sm:h-3.5 flex-shrink-0" />
            <span className="truncate max-w-[120px] sm:max-w-none">{job.location}</span>
          </span>
          <span className="px-3 sm:px-4 py-1.5 sm:py-2 glass border border-emerald-500/30 text-emerald-300 rounded-lg sm:rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 sm:gap-2">
            <DollarSign size={12} className="sm:w-3.5 sm:h-3.5" />
            {job.salary}
          </span>
        </div>

        {/* Description */}
        <p className="text-gray-400 text-sm sm:text-base mb-4 sm:mb-5 line-clamp-2 leading-relaxed">
          {job.description}
        </p>

        {/* Skills */}
        <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-5 sm:mb-6">
          {job.requirements.slice(0, 4).map((skill, idx) => (
            <span
              key={idx}
              className="px-2.5 sm:px-3 py-1 sm:py-1.5 glass border border-white/10 text-gray-300 rounded-md sm:rounded-lg text-xs font-semibold hover:border-indigo-500/30 transition-all"
            >
              {skill}
            </span>
          ))}
          {job.requirements.length > 4 && (
            <span className="px-2.5 sm:px-3 py-1 sm:py-1.5 glass text-gray-500 rounded-md sm:rounded-lg text-xs font-semibold">
              +{job.requirements.length - 4}
            </span>
          )}
        </div>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-4 sm:pt-5 border-t border-white/10 gap-3 sm:gap-0">
          <span className="text-xs sm:text-sm text-gray-500 flex items-center gap-1.5 sm:gap-2 font-medium">
            <Clock size={14} className="sm:w-4 sm:h-4 flex-shrink-0" />
            {new Date(job.created_at).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })}
          </span>

          {currentUser && currentUser.role === "seeker" && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onViewDetails(job);
              }}
              className={`relative px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-bold text-xs sm:text-sm transition-all transform hover:scale-105 flex items-center gap-1.5 sm:gap-2 overflow-hidden group/btn w-full sm:w-auto justify-center ${
                hasApplied
                  ? "glass border border-emerald-500/30 text-emerald-300"
                  : "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-2xl shadow-indigo-500/50 hover:shadow-indigo-500/75 btn-shine"
              }`}
            >
              <span className="relative z-10">
                {hasApplied ? "✓ Applied" : "Apply"}
              </span>
              {!hasApplied && (
                <ArrowRight
                  className="relative z-10 group-hover/btn:translate-x-1 transition-transform"
                  size={16}
                />
              )}
            </button>
          )}

          {currentUser && currentUser.role === "employer" && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onViewDetails(job);
              }}
              className="px-4 sm:px-6 py-2.5 sm:py-3 glass border border-white/10 text-white rounded-lg sm:rounded-xl hover:border-white/20 transition-all text-xs sm:text-sm font-bold w-full sm:w-auto"
            >
              Manage
            </button>
          )}

          {!currentUser && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onViewDetails(job);
              }}
              className="relative px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg sm:rounded-xl font-bold text-xs sm:text-sm shadow-2xl shadow-indigo-500/50 hover:shadow-indigo-500/75 transform hover:scale-105 flex items-center gap-1.5 sm:gap-2 overflow-hidden group/btn btn-shine w-full sm:w-auto justify-center"
            >
              <span className="relative z-10">View</span>
              <ArrowRight
                className="relative z-10 group-hover/btn:translate-x-1 transition-transform"
                size={16}
              />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobCard;
