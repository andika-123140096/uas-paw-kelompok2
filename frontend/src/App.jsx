import React, { useState, useEffect } from "react";
import Navbar from "./components/common/Navbar";
import HomePage from "./pages/HomePage";
import JobsPage from "./pages/JobsPage";
import JobDetailPage from "./pages/JobDetailPage";
import LoginPage from "./components/auth/LoginPage";
import RegisterPage from "./components/auth/RegisterPage";
import PostJobPage from "./pages/PostJobPage";

const mockJobs = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company_name: "TechCorp",
    description:
      "We are looking for an experienced Frontend Developer to join our team. You will be responsible for building beautiful, responsive web applications using modern technologies like React, TypeScript, and Tailwind CSS.",
    requirements: ["React", "TypeScript", "Tailwind CSS", "Redux", "Git"],
    salary: "$80k-$120k",
    location: "Remote",
    type: "Full-time",
    created_at: new Date().toISOString(),
  },
  {
    id: 2,
    title: "UI/UX Designer",
    company_name: "DesignHub",
    description:
      "Join our creative team to design amazing user experiences. We value creativity and attention to detail. You will work on exciting projects for various clients.",
    requirements: ["Figma", "Adobe XD", "Prototyping", "User Research"],
    salary: "$60k-$90k",
    location: "Jakarta",
    type: "Full-time",
    created_at: new Date().toISOString(),
  },
  {
    id: 3,
    title: "Backend Developer",
    company_name: "DataFlow",
    description:
      "Build scalable backend systems and APIs. Work with cutting-edge technologies in a fast-paced environment.",
    requirements: ["Node.js", "PostgreSQL", "Docker", "AWS", "REST API"],
    salary: "$70k-$100k",
    location: "Bandung",
    type: "Contract",
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 4,
    title: "Mobile App Developer",
    company_name: "AppMakers",
    description:
      "Create beautiful mobile applications for iOS and Android using React Native.",
    requirements: ["React Native", "iOS", "Android", "JavaScript", "Firebase"],
    salary: "$75k-$110k",
    location: "Remote",
    type: "Full-time",
    created_at: new Date().toISOString(),
  },
  {
    id: 5,
    title: "DevOps Engineer",
    company_name: "CloudTech",
    description:
      "Manage our cloud infrastructure and deployment pipelines. Help us scale our applications efficiently.",
    requirements: ["AWS", "Docker", "Kubernetes", "CI/CD", "Linux"],
    salary: "$90k-$130k",
    location: "Remote",
    type: "Full-time",
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 6,
    title: "Product Manager",
    company_name: "InnovateLab",
    description:
      "Lead product strategy and roadmap. Work with cross-functional teams to deliver innovative products.",
    requirements: [
      "Product Strategy",
      "Agile",
      "Data Analysis",
      "Communication",
    ],
    salary: "$100k-$140k",
    location: "Singapore",
    type: "Full-time",
    created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [currentUser, setCurrentUser] = useState(null);
  const [jobs, setJobs] = useState(mockJobs);
  const [savedJobs, setSavedJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");

  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (email, password, role) => {
    const user = {
      id: 1,
      name: email.split("@")[0],
      email,
      role,
    };
    setCurrentUser(user);
    localStorage.setItem("currentUser", JSON.stringify(user));
    setCurrentPage("jobs");
  };

  const handleRegister = (name, email, password, role) => {
    const user = {
      id: 1,
      name,
      email,
      role,
    };
    setCurrentUser(user);
    localStorage.setItem("currentUser", JSON.stringify(user));
    setCurrentPage("jobs");
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
    setCurrentPage("home");
    setSavedJobs([]);
    setApplications([]);
  };

  const toggleSaveJob = (jobId) => {
    if (savedJobs.includes(jobId)) {
      setSavedJobs(savedJobs.filter((id) => id !== jobId));
    } else {
      setSavedJobs([...savedJobs, jobId]);
    }
  };

  const applyToJob = (jobId) => {
    if (!applications.find((app) => app.job_id === jobId)) {
      const newApplication = {
        id: applications.length + 1,
        job_id: jobId,
        status: "pending",
        applied_date: new Date().toISOString(),
      };
      setApplications([...applications, newApplication]);
    }
  };

  const createJob = (jobData) => {
    const newJob = {
      id: jobs.length + 1,
      ...jobData,
      created_at: new Date().toISOString(),
    };
    setJobs([newJob, ...jobs]);
    setCurrentPage("jobs");
  };

  const handleViewDetails = (job) => {
    setSelectedJob(job);
    setCurrentPage("job-detail");
  };

  const handleNavigate = (page) => {
    setCurrentPage(page);
  };

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return (
          <HomePage
            onNavigate={handleNavigate}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            locationFilter={locationFilter}
            setLocationFilter={setLocationFilter}
          />
        );

      case "jobs":
        return (
          <JobsPage
            jobs={jobs}
            currentUser={currentUser}
            savedJobs={savedJobs}
            applications={applications}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            locationFilter={locationFilter}
            setLocationFilter={setLocationFilter}
            typeFilter={typeFilter}
            setTypeFilter={setTypeFilter}
            onToggleSave={toggleSaveJob}
            onViewDetails={handleViewDetails}
          />
        );

      case "job-detail":
        return (
          <JobDetailPage
            job={selectedJob}
            currentUser={currentUser}
            savedJobs={savedJobs}
            applications={applications}
            onToggleSave={toggleSaveJob}
            onApply={applyToJob}
            onNavigate={handleNavigate}
          />
        );

      case "login":
        return <LoginPage onLogin={handleLogin} onNavigate={handleNavigate} />;

      case "register":
        return (
          <RegisterPage
            onRegister={handleRegister}
            onNavigate={handleNavigate}
          />
        );

      case "saved":
        const savedJobsList = jobs.filter((job) => savedJobs.includes(job.id));
        return (
          <div className="min-h-screen bg-black py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h1 className="text-5xl font-black text-white mb-12">
                Saved{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                  Jobs
                </span>
              </h1>
              {savedJobsList.length === 0 ? (
                <div className="glass rounded-3xl p-20 text-center border border-white/10">
                  <p className="text-gray-400 text-xl mb-6">
                    No saved jobs yet
                  </p>
                  <button
                    onClick={() => handleNavigate("jobs")}
                    className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl font-bold hover:shadow-2xl hover:shadow-indigo-500/50 transition-all transform hover:scale-105"
                  >
                    Browse Jobs
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-6">
                  {savedJobsList.map((job) => (
                    <JobsPage
                      key={job.id}
                      jobs={[job]}
                      currentUser={currentUser}
                      savedJobs={savedJobs}
                      applications={applications}
                      searchQuery=""
                      setSearchQuery={() => {}}
                      locationFilter=""
                      setLocationFilter={() => {}}
                      typeFilter=""
                      setTypeFilter={() => {}}
                      onToggleSave={toggleSaveJob}
                      onViewDetails={handleViewDetails}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        );

      case "applications":
        const myApplications = applications.map((app) => ({
          ...app,
          job: jobs.find((j) => j.id === app.job_id),
        }));

        return (
          <div className="min-h-screen bg-black py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h1 className="text-5xl font-black text-white mb-12">
                My{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                  Applications
                </span>
              </h1>
              {myApplications.length === 0 ? (
                <div className="glass rounded-3xl p-20 text-center border border-white/10">
                  <p className="text-gray-400 text-xl mb-6">
                    No applications yet
                  </p>
                  <button
                    onClick={() => handleNavigate("jobs")}
                    className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl font-bold hover:shadow-2xl hover:shadow-indigo-500/50 transition-all transform hover:scale-105"
                  >
                    Browse Jobs
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {myApplications.map((app) => (
                    <div
                      key={app.id}
                      className="glass rounded-3xl p-8 border border-white/10 card-hover"
                    >
                      <div className="flex items-start justify-between gap-6">
                        <div className="flex gap-6 flex-1">
                          <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-indigo-500/50 flex-shrink-0">
                            <span className="text-2xl font-black text-white">
                              {app.job.company_name[0]}
                            </span>
                          </div>
                          <div className="flex-1">
                            <h3 className="text-2xl font-bold text-white mb-2">
                              {app.job.title}
                            </h3>
                            <p className="text-gray-400 mb-4 font-medium">
                              {app.job.company_name}
                            </p>
                            <div className="flex flex-wrap gap-2">
                              <span className="px-4 py-1.5 bg-white/5 border border-white/10 text-gray-300 rounded-full text-sm font-medium">
                                {app.job.type}
                              </span>
                              <span className="px-4 py-1.5 bg-white/5 border border-white/10 text-gray-300 rounded-full text-sm font-medium">
                                {app.job.location}
                              </span>
                              <span className="px-4 py-1.5 bg-yellow-500/10 border border-yellow-500/30 text-yellow-300 rounded-full text-sm font-bold">
                                {app.status.charAt(0).toUpperCase() +
                                  app.status.slice(1)}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-gray-500 mb-2 font-medium">
                            Applied on
                          </p>
                          <p className="text-sm text-gray-300 font-semibold">
                            {new Date(app.applied_date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );

      case "post-job":
        return <PostJobPage onCreateJob={createJob} />;

      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <Navbar
        currentUser={currentUser}
        onLogout={handleLogout}
        onNavigate={handleNavigate}
      />
      {renderPage()}
    </div>
  );
}

export default App;
