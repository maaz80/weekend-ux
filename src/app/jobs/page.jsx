"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useUserAuth } from "@/context/UserAuthContext";
import { getUserToken } from "@/utils/auth";
import {
  Briefcase,
  Search,
  MapPin,
  Building2,
  ExternalLink,
  Clock,
  Filter,
  Lock,
  ArrowLeft,
  Calendar,
  DollarSign,
  Globe,
  RefreshCw,
  X,
  Sparkles,
  CheckCircle2,
  Tag,
  BookOpen,
  ChevronRight,
  ChevronLeft
} from "lucide-react";

// Base API helper
const getApiBase = () => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "";
  return baseUrl ? `${baseUrl.replace(/\/$/, "")}/api` : "/api";
};

export default function JobsPage() {
  const { user, isLoggedIn, loading: authLoading } = useUserAuth();

  // Jobs state
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter & Search State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("ALL");
  const [remoteOnly, setRemoteOnly] = useState(false);
  const [sortBy, setSortBy] = useState("newest"); // "newest" | "oldest"

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 10;

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedLocation, remoteOnly, sortBy]);

  // Modal State
  const [selectedJob, setSelectedJob] = useState(null);

  // Check if user has enrolled in at least 1 course
  const unlockedCoursesCount = user?.enrolledCourses?.length || 0;
  const isEnrolledStudent = unlockedCoursesCount > 0;

  // Auto-trigger login modal if guest lands on /jobs
  useEffect(() => {
    if (!authLoading && !isLoggedIn) {
      window.dispatchEvent(new CustomEvent("openAuthModal"));
    }
  }, [authLoading, isLoggedIn]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedJob) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedJob]);

  // Fetch Jobs from backend GET /api/jobs
  const fetchJobs = async () => {
    setLoading(true);
    setError(null);
    try {
      const API = getApiBase();
      const res = await fetch(`${API}/jobs`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error(`Failed to load jobs (${res.status})`);
      }

      const data = await res.json();
      if (data.jobs && Array.isArray(data.jobs)) {
        setJobs(data.jobs);
      } else {
        setJobs([]);
      }
    } catch (err) {
      console.error("Error fetching jobs:", err);
      setError(err.message || "Failed to load job listings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isLoggedIn && isEnrolledStudent) {
      fetchJobs();
    }
  }, [isLoggedIn, isEnrolledStudent]);

  // Unique locations for dropdown
  const uniqueLocations = useMemo(() => {
    const locSet = new Set();
    jobs.forEach((j) => {
      if (j.location && typeof j.location === "string" && j.location.trim()) {
        locSet.add(j.location.trim());
      }
    });
    return Array.from(locSet).slice(0, 20);
  }, [jobs]);

  // Filter & Sort jobs
  const filteredJobs = useMemo(() => {
    let result = [...jobs];

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter((j) => {
        const title = (j.title || "").toLowerCase();
        const company = (j.company || "").toLowerCase();
        const location = (j.location || "").toLowerCase();
        const description = (j.description || "").toLowerCase();
        const jobId = (j.jobId || "").toLowerCase();

        return (
          title.includes(q) ||
          company.includes(q) ||
          location.includes(q) ||
          description.includes(q) ||
          jobId.includes(q)
        );
      });
    }

    // Location Filter
    if (selectedLocation !== "ALL") {
      result = result.filter(
        (j) => (j.location || "").toLowerCase() === selectedLocation.toLowerCase()
      );
    }

    // Remote Only Toggle
    if (remoteOnly) {
      result = result.filter((j) => {
        const loc = (j.location || "").toLowerCase();
        const title = (j.title || "").toLowerCase();
        const desc = (j.description || "").toLowerCase();
        return (
          loc.includes("remote") ||
          title.includes("remote") ||
          desc.includes("remote") ||
          j.isRemote === true
        );
      });
    }

    // Sort By Date
    result.sort((a, b) => {
      const dateA = new Date(a.createdAt || a.date || 0).getTime();
      const dateB = new Date(b.createdAt || b.date || 0).getTime();
      return sortBy === "newest" ? dateB - dateA : dateA - dateB;
    });

    return result;
  }, [jobs, searchQuery, selectedLocation, remoteOnly, sortBy]);

  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 4) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
      return pages;
    }
    const start = Math.max(1, Math.min(currentPage, totalPages - 2));
    const actualStart = currentPage < 3 ? 1 : start;
    const end = Math.min(totalPages, actualStart + (currentPage < 3 ? 2 : 2));
    for (let i = actualStart; i <= end; i++) pages.push(i);
    const lastPageInWindow = pages[pages.length - 1];
    if (lastPageInWindow < totalPages) {
      if (totalPages - lastPageInWindow > 1) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  };

  const displayedJobs = useMemo(() => {
    return filteredJobs.slice((currentPage - 1) * jobsPerPage, currentPage * jobsPerPage);
  }, [filteredJobs, currentPage, jobsPerPage]);

  // Format Helper for Salary
  const formatSalary = (salary) => {
    if (!salary) return "Not Specified";
    if (typeof salary === "string") return salary;
    if (typeof salary === "object") {
      return salary.text || salary.formatted || salary.amount || JSON.stringify(salary);
    }
    return String(salary);
  };

  // Format Helper for Objects, Addresses, & Metadata Values
  const formatValue = (val) => {
    if (val === null || val === undefined) return "";
    if (typeof val === "string") return val;
    if (typeof val === "number" || typeof val === "boolean") return String(val);

    if (Array.isArray(val)) {
      if (val.length === 0) return "None";
      return val.map((v) => (typeof v === "object" ? formatValue(v) : String(v))).filter(Boolean).join(", ");
    }

    if (typeof val === "object") {
      // PostalAddress / Address object check
      if (val.addressLocality || val.addressRegion || val.addressCountry || val.city || val.state || val.country) {
        const parts = [
          val.streetAddress || val.addressLine1,
          val.addressLocality || val.city || val.locality,
          val.addressRegion || val.state || val.region,
          val.postalCode || val.zipCode,
          val.addressCountry || val.country
        ].filter(Boolean);
        return parts.join(", ");
      }

      // General object formatting
      const keys = Object.keys(val).filter((k) => k !== "type" && k !== "@type");
      if (keys.length === 0) return "";
      return keys
        .map((k) => {
          const valStr = typeof val[k] === "object" ? formatValue(val[k]) : String(val[k]);
          return `${k.replace(/([A-Z])/g, " $1").toLowerCase()}: ${valStr}`;
        })
        .join(" • ");
    }

    return String(val);
  };

  // Helper to extract clean location string from job / address object
  const getLocationText = (job) => {
    if (job.location && typeof job.location === "string" && job.location.trim() && job.location !== "Remote / Unspecified") {
      return job.location;
    }
    if (job.companyAddress) {
      const formattedAddr = formatValue(job.companyAddress);
      if (formattedAddr) return formattedAddr;
    }
    return job.jobLocation || "Remote / Unspecified";
  };

  // Format Relative Time
  const formatTimeAgo = (dateStr) => {
    if (!dateStr) return "Recently added";
    try {
      const date = new Date(dateStr);
      const now = new Date();
      const diffMs = now - date;
      const diffMins = Math.floor(diffMs / (1000 * 60));
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

      if (diffMins < 60) return `${Math.max(1, diffMins)}m ago`;
      if (diffHours < 24) return `${diffHours}h ago`;
      if (diffDays < 30) return `${diffDays}d ago`;
      return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    } catch {
      return "Recently added";
    }
  };

  // 1. Loading Auth State
  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#FCFBF7] flex items-center justify-center pt-28 font-urbanist">
        <div className="text-center space-y-3">
          <div className="w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs text-zinc-500 font-semibold">Verifying student access...</p>
        </div>
      </div>
    );
  }

  // 2. Auth Gate: Must be logged in
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#FCFBF7] text-neutral font-urbanist flex flex-col justify-between pt-32 pb-44">
        <main className="grow py-16">
          <div className="custom-width px-4 max-w-md mx-auto text-center space-y-6 bg-white p-8 md:p-10 rounded-3xl border border-zinc-200 shadow-sm">
            <div className="w-16 h-16 bg-amber-500/10 text-amber-600 rounded-2xl flex items-center justify-center mx-auto border border-amber-500/20">
              <Briefcase size={32} />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-zinc-900">Student Job Portal</h2>
              <p className="text-xs md:text-sm text-zinc-500 leading-relaxed font-medium">
                Please log in to your student account to access curated design & tech job postings.
              </p>
            </div>
            <button
              onClick={() => window.dispatchEvent(new CustomEvent("openAuthModal"))}
              className="w-full py-3.5 bg-official text-neutral font-bold rounded-xl text-sm hover:opacity-90 transition cursor-pointer shadow-md"
            >
              Log In / Sign Up
            </button>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-500 hover:text-zinc-900 pt-2"
            >
              <ArrowLeft size={14} /> Back to Dashboard
            </Link>
          </div>
        </main>
      </div>
    );
  }

  // 3. Course Lock Gate: Must have enrolled in at least 1 course
  if (!isEnrolledStudent) {
    return (
      <div className="min-h-screen bg-[#FCFBF7] text-neutral font-urbanist flex flex-col justify-between pt-28 pb-44">
        <main className="grow py-12 sm:py-16">
          <div className="custom-width px-4 max-w-lg mx-auto text-center space-y-6 bg-white p-8 sm:p-10 rounded-3xl border border-zinc-200 shadow-md relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-amber-500 text-neutral font-extrabold text-[10px] uppercase px-4 py-1.5 rounded-bl-xl tracking-wider">
              Student Exclusive
            </div>

            <div className="w-20 h-20 bg-amber-500/10 text-amber-600 rounded-3xl flex items-center justify-center mx-auto border border-amber-500/20 shadow-inner">
              <Lock size={38} />
            </div>

            <div className="space-y-3">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900">
                Job Board Access Locked 🔒
              </h1>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-medium">
                The Weekend UX Job Portal is reserved exclusively for enrolled students. Enroll in any course track to unlock instant access to curated UX/UI & tech job opportunities from Make.com & LinkedIn automation!
              </p>
            </div>

            <div className="bg-zinc-50 rounded-2xl p-4 border border-zinc-200/80 text-left space-y-2">
              <div className="text-xs font-bold text-zinc-900 flex items-center gap-2">
                <Sparkles size={14} className="text-amber-500" /> Unlock Student Benefits:
              </div>
              <ul className="text-xs text-zinc-600 space-y-1.5 font-medium pl-5 list-disc">
                <li>Real-time automated job alerts & scraper leads</li>
                <li>Direct application links & hiring details</li>
                <li>Full course curriculum & video session recordings</li>
              </ul>
            </div>

            <div className="pt-2 space-y-3">
              <Link
                href="/courses"
                className="w-full py-3.5 bg-official text-neutral font-bold rounded-xl text-sm hover:opacity-90 transition flex items-center justify-center gap-2 shadow-md cursor-pointer"
              >
                <BookOpen size={16} /> Explore Enrolled Courses
              </Link>
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-500 hover:text-zinc-900 pt-1"
              >
                <ArrowLeft size={14} /> Return to Dashboard
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // 4. Main Job Board Page (Enrolled Students)
  return (
    <div className="min-h-screen bg-[#FCFBF7] text-neutral font-urbanist flex flex-col justify-between pt-32 sm:pt-32 pb-66">
      <main className="grow">
        <div className="custom-width px-3.5 sm:px-6 lg:px-10 max-w-7xl mx-auto">
          
          {/* TOP BREADCRUMB & HEADER */}
          <div className="mb-6 sm:mb-8 space-y-3">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-500 hover:text-zinc-900 transition bg-white px-3 py-1.5 rounded-lg border border-zinc-200 shadow-2xs"
            >
              <ArrowLeft size={14} /> Dashboard
            </Link>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-2xl">💼</span>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 tracking-tight">
                    Exclusive Job Portal
                  </h1>
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] sm:text-xs font-bold px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Live Feed
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-zinc-500 font-medium">
                  Curated design, product, and developer positions updated automatically via Make.com.
                </p>
              </div>

              <button
                onClick={fetchJobs}
                disabled={loading}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-zinc-200 rounded-xl text-xs font-bold text-zinc-700 hover:bg-zinc-50 transition shadow-2xs cursor-pointer disabled:opacity-50 shrink-0"
              >
                <RefreshCw size={14} className={loading ? "animate-spin text-amber-500" : ""} />
                <span>Refresh Jobs</span>
              </button>
            </div>
          </div>

          {/* SEARCH & FILTER CONTROLS BAR */}
          <div className="bg-white border border-zinc-200/90 rounded-2xl p-4 sm:p-5 shadow-sm mb-6 sm:mb-8 space-y-4">
            
            {/* Search Input Row */}
            <div className="relative w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
              <input
                type="text"
                placeholder="Search jobs by title, company, skills, or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-10 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-xs sm:text-sm font-medium text-zinc-900 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:bg-white transition"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700 cursor-pointer"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Filter Pills & Dropdowns */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-1 border-t border-zinc-100">
              
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                {/* Location Filter Dropdown */}
                <div className="flex items-center gap-1.5 bg-zinc-50 border border-zinc-200 px-3 py-2 rounded-xl text-xs font-medium text-zinc-700">
                  <MapPin size={14} className="text-zinc-500" />
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="bg-transparent text-xs font-semibold text-zinc-800 focus:outline-none cursor-pointer pr-1"
                  >
                    <option value="ALL">All Locations</option>
                    {uniqueLocations.map((loc) => (
                      <option key={loc} value={loc}>
                        {loc}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Remote Only Toggle Pill */}
                <button
                  onClick={() => setRemoteOnly(!remoteOnly)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer border ${
                    remoteOnly
                      ? "bg-amber-500 text-neutral border-amber-400 shadow-2xs"
                      : "bg-zinc-50 text-zinc-700 border-zinc-200 hover:bg-zinc-100"
                  }`}
                >
                  <Globe size={14} />
                  <span>Remote Only</span>
                </button>

                {/* Sort Order Dropdown */}
                <div className="flex items-center gap-1.5 bg-zinc-50 border border-zinc-200 px-3 py-2 rounded-xl text-xs font-medium text-zinc-700">
                  <Filter size={14} className="text-zinc-500" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-transparent text-xs font-semibold text-zinc-800 focus:outline-none cursor-pointer"
                  >
                    <option value="newest">Latest Posted</option>
                    <option value="oldest">Oldest First</option>
                  </select>
                </div>
              </div>

              {/* Clear Filters Button */}
              {(searchQuery || selectedLocation !== "ALL" || remoteOnly) && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedLocation("ALL");
                    setRemoteOnly(false);
                  }}
                  className="text-xs font-bold text-amber-600 hover:text-amber-700 underline cursor-pointer shrink-0"
                >
                  Clear Filters
                </button>
              )}
            </div>

            {/* Results Counter Bar */}
            <div className="flex items-center justify-between text-xs text-zinc-500 font-medium pt-1">
              <span>
                Showing <strong className="text-zinc-900 font-bold">{filteredJobs.length}</strong> {filteredJobs.length === 1 ? 'opportunity' : 'opportunities'}
              </span>
              {jobs.length > 0 && (
                <span>Total Jobs in Database: {jobs.length}</span>
              )}
            </div>
          </div>

          {/* MAIN CONTENT AREA */}
          {loading ? (
            // Loading Skeletons Grid
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {[1, 2, 3, 4, 5, 6].map((idx) => (
                <div
                  key={idx}
                  className="bg-white border border-zinc-200/90 rounded-2xl p-6 shadow-2xs space-y-4 animate-pulse"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-zinc-200" />
                    <div className="space-y-2 grow">
                      <div className="h-4 bg-zinc-200 rounded w-3/4" />
                      <div className="h-3 bg-zinc-100 rounded w-1/2" />
                    </div>
                  </div>
                  <div className="h-16 bg-zinc-50 rounded-xl" />
                  <div className="flex justify-between items-center pt-2">
                    <div className="h-4 bg-zinc-200 rounded w-1/4" />
                    <div className="h-8 bg-zinc-200 rounded-xl w-28" />
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            // Error State
            <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center space-y-3">
              <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto">
                <X size={24} />
              </div>
              <h3 className="text-lg font-bold text-red-900">Failed to Load Job Board</h3>
              <p className="text-xs text-red-600 font-medium">{error}</p>
              <button
                onClick={fetchJobs}
                className="px-4 py-2 bg-red-600 text-white rounded-xl text-xs font-bold hover:bg-red-700 transition cursor-pointer"
              >
                Try Again
              </button>
            </div>
          ) : filteredJobs.length === 0 ? (
            // Empty State
            <div className="bg-white border border-zinc-200/90 rounded-3xl p-12 text-center space-y-4 shadow-2xs">
              <div className="w-16 h-16 bg-amber-500/10 text-amber-600 rounded-2xl flex items-center justify-center mx-auto border border-amber-500/20">
                <Briefcase size={32} />
              </div>
              <div className="space-y-1 max-w-sm mx-auto">
                <h3 className="text-xl font-bold text-zinc-900">No Matching Jobs Found</h3>
                <p className="text-xs text-zinc-500 font-medium leading-relaxed">
                  We couldn't find any job postings matching your current search or filters. Try adjusting your search query.
                </p>
              </div>
              {(searchQuery || selectedLocation !== "ALL" || remoteOnly) && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedLocation("ALL");
                    setRemoteOnly(false);
                  }}
                  className="px-5 py-2.5 bg-official text-neutral rounded-xl text-xs font-bold shadow-2xs hover:opacity-90 transition cursor-pointer"
                >
                  Reset All Filters
                </button>
              )}
            </div>
          ) : (
            // Job Cards Grid
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {displayedJobs.map((job) => {
                  const jobTitle = job.title || job.jobTitle || job.position || "Design & Tech Position";
                  const companyName = job.company || job.companyName || "Top Tech Company";
                  const logoUrl = job.companyLogo || job.logo || job.company_logo || "";
                  const locationText = getLocationText(job);
                  const salaryText = formatSalary(job.salary || job.salaryRange || job.compensation);
                  const timeAgo = formatTimeAgo(job.createdAt || job.postedAt || job.date);
                  const applyUrl = job.url || job.jobUrl || job.link || job.applyUrl || job.inputUrl || "";

                  return (
                    <div
                      key={job._id || job.jobId || Math.random()}
                      className="bg-white border border-zinc-200/90 rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md hover:border-amber-400 transition-all flex flex-col justify-between gap-4 group relative"
                    >
                      {/* Card Top: Avatar & Headers */}
                      <div className="space-y-3">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-center gap-3">
                            {/* Company Logo or Initial Badge */}
                            {logoUrl ? (
                              <img
                                src={logoUrl}
                                alt={companyName}
                                className="w-11 h-11 object-contain rounded-xl bg-white p-1 border border-zinc-200 shadow-2xs shrink-0"
                                onError={(e) => {
                                  e.currentTarget.style.display = "none";
                                }}
                              />
                            ) : (
                              <div className="w-11 h-11 rounded-xl bg-linear-to-br from-amber-400 to-amber-600 text-neutral font-extrabold text-base flex items-center justify-center shrink-0 shadow-2xs uppercase">
                                {companyName.charAt(0)}
                              </div>
                            )}
                            <div>
                              <h3
                                onClick={() => setSelectedJob(job)}
                                className="text-base sm:text-lg font-bold text-zinc-900 hover:text-amber-600 transition cursor-pointer line-clamp-1 group-hover:text-amber-600"
                              >
                                {jobTitle}
                              </h3>
                              <div className="flex items-center gap-2 text-xs text-zinc-500 font-semibold pt-0.5">
                                <span className="flex items-center gap-1 text-zinc-700">
                                  <Building2 size={13} className="text-zinc-400" /> {companyName}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Relative Time Badge */}
                          <span className="text-[10px] font-bold text-zinc-600 bg-zinc-100 px-2 py-1 rounded-md shrink-0 flex items-center gap-1">
                            <Clock size={11} /> {timeAgo}
                          </span>
                        </div>

                        {/* Key Badges (Location, Salary, Source) */}
                        <div className="flex flex-wrap items-center gap-2 pt-1">
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-zinc-600 bg-zinc-100 px-2.5 py-1 rounded-lg border border-zinc-200">
                            <MapPin size={12} className="text-zinc-500" /> {locationText}
                          </span>

                          {salaryText && salaryText !== "Not Specified" && (
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                              <DollarSign size={12} /> {salaryText}
                            </span>
                          )}

                          {job.source && (
                            <span className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md border border-purple-200">
                              <Tag size={10} /> {job.source}
                            </span>
                          )}
                        </div>

                        {/* Brief Description Snippet */}
                        {job.description && (
                          <p className="text-xs text-zinc-500 line-clamp-2 leading-relaxed font-medium pt-1">
                            {job.description.replace(/<[^>]*>?/gm, "")}
                          </p>
                        )}
                      </div>

                      {/* Card Actions Footer */}
                      <div className="flex items-center justify-between gap-2 pt-3 border-t border-zinc-100 mt-auto">
                        <button
                          onClick={() => setSelectedJob(job)}
                          className="text-xs font-bold text-zinc-700 hover:text-zinc-900 bg-zinc-100 hover:bg-zinc-200 px-3.5 py-2 rounded-xl transition cursor-pointer"
                        >
                          View Details
                        </button>

                        {applyUrl ? (
                          <a
                            href={applyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs font-bold bg-official text-neutral hover:opacity-90 px-4 py-2 rounded-xl transition flex items-center gap-1.5 cursor-pointer shadow-2xs"
                          >
                            <span>Apply Now</span>
                            <ExternalLink size={13} />
                          </a>
                        ) : (
                          <button
                            onClick={() => setSelectedJob(job)}
                            className="text-xs font-bold bg-zinc-800 text-white hover:bg-zinc-900 px-4 py-2 rounded-xl transition flex items-center gap-1 cursor-pointer"
                          >
                            <span>Details</span>
                            <ChevronRight size={13} />
                          </button>
                        )}
                      </div>

                    </div>
                  );
                })}
              </div>

              {/* Courses-style Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-8 md:mt-12">
                  <button
                    onClick={() => {
                      setCurrentPage((prev) => Math.max(prev - 1, 1));
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    aria-label="Previous Page"
                    disabled={currentPage === 1}
                    className={`w-10 h-10 rounded-xl border flex items-center justify-center text-sm font-semibold transition-all cursor-pointer ${
                      currentPage === 1
                        ? "border-zinc-200 text-zinc-300 bg-zinc-50 cursor-not-allowed"
                        : "border-zinc-200 text-zinc-700 bg-white hover:bg-zinc-50 hover:text-neutral"
                    }`}
                  >
                    <ChevronLeft size={18} />
                  </button>

                  {getPageNumbers().map((item, idx) => {
                    if (item === "...") {
                      return (
                        <span
                          key={`ellipsis-${idx}`}
                          className="w-10 h-10 flex items-center justify-center text-sm font-semibold text-zinc-400 select-none"
                        >
                          ...
                        </span>
                      );
                    }
                    return (
                      <button
                        key={`page-${item}`}
                        onClick={() => {
                          setCurrentPage(item);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        className={`w-10 h-10 rounded-xl border text-sm font-semibold transition-all cursor-pointer ${
                          currentPage === item
                            ? "bg-official text-neutral border-transparent shadow-sm font-extrabold"
                            : "border-zinc-200 text-zinc-700 bg-white hover:bg-zinc-50 hover:text-neutral"
                        }`}
                      >
                        {item}
                      </button>
                    );
                  })}

                  <button
                    onClick={() => {
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages));
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    aria-label="Next Page"
                    disabled={currentPage === totalPages}
                    className={`w-10 h-10 rounded-xl border flex items-center justify-center text-sm font-semibold transition-all cursor-pointer ${
                      currentPage === totalPages
                        ? "border-zinc-200 text-zinc-300 bg-zinc-50 cursor-not-allowed"
                        : "border-zinc-200 text-zinc-700 bg-white hover:bg-zinc-50 hover:text-neutral"
                    }`}
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              )}
            </div>
          )}

        </div>
      </main>

      {/* JOB DETAILS MODAL (Overlays above navbar with z-[99999]) */}
      {selectedJob && (() => {
        const companyName = selectedJob.company || selectedJob.companyName || "Company";
        const logoUrl = selectedJob.companyLogo || selectedJob.logo || selectedJob.company_logo || "";
        const rawDesc = selectedJob.description || selectedJob.descriptionHtml || selectedJob.descriptionText || selectedJob.jobDescription || "";
        const hasHtmlDesc = /<[a-z][\s\S]*>/i.test(rawDesc);
        
        const IGNORED_METADATA_KEYS = new Set([
          "_id",
          "jobId",
          "id",
          "job_id",
          "linkedinJobId",
          "linkedin_job_id",
          "title",
          "jobTitle",
          "position",
          "company",
          "companyName",
          "location",
          "jobLocation",
          "description",
          "descriptionHtml",
          "descriptionText",
          "jobDescription",
          "salary",
          "salaryRange",
          "compensation",
          "url",
          "jobUrl",
          "link",
          "applyUrl",
          "inputUrl",
          "source",
          "companyLogo",
          "logo",
          "company_logo",
          "createdAt",
          "updatedAt",
          "__v",
          "__IMTLENGTH__",
          "__IMTINDEX__",
          "trackingId",
          "refId",
          "benefits"
        ]);

        const extraKeys = Object.keys(selectedJob).filter(
          (key) => !IGNORED_METADATA_KEYS.has(key) && selectedJob[key] !== null && selectedJob[key] !== ""
        );

        return (
          <div className="fixed inset-0 z-99999 bg-black/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fadeIn font-urbanist">
            <div className="bg-white rounded-3xl border border-zinc-200 max-w-3xl w-full shadow-2xl relative my-auto max-h-[92vh] flex flex-col overflow-hidden">
              
              {/* Top Amber Accent Bar */}
              <div className="h-2 bg-linear-to-r from-amber-400 via-amber-500 to-amber-600 w-full shrink-0" />

              {/* Modal Header */}
              <div className="p-5 sm:p-7 border-b border-zinc-100 bg-white shrink-0">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    {/* Company Logo or Avatar */}
                    {logoUrl ? (
                      <img
                        src={logoUrl}
                        alt={companyName}
                        className="w-14 h-14 object-contain rounded-2xl bg-white p-1.5 border border-zinc-200 shadow-2xs shrink-0"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    ) : (
                      <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-amber-400 to-amber-600 text-neutral font-extrabold text-2xl flex items-center justify-center shrink-0 shadow-md uppercase">
                        {companyName.charAt(0)}
                      </div>
                    )}

                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="bg-amber-100 text-amber-900 text-[10px] sm:text-xs font-extrabold px-2.5 py-0.5 rounded-md uppercase tracking-wider">
                          {selectedJob.source || "Make.com Verified"}
                        </span>
                        {(selectedJob.createdAt || selectedJob.postedAt) && (
                          <span className="text-[11px] text-zinc-400 font-semibold flex items-center gap-1">
                            <Clock size={12} /> {formatTimeAgo(selectedJob.createdAt || selectedJob.postedAt)}
                          </span>
                        )}
                      </div>

                      <h2 className="text-xl sm:text-2xl font-extrabold text-zinc-900 leading-snug">
                        {selectedJob.title || selectedJob.jobTitle || "Job Position Details"}
                      </h2>

                      <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-600 font-semibold pt-1">
                        <span className="flex items-center gap-1.5 text-zinc-800 font-bold">
                          <Building2 size={15} className="text-amber-500" /> {companyName}
                        </span>
                        <span className="text-zinc-300">•</span>
                        <span className="flex items-center gap-1.5 text-zinc-600">
                          <MapPin size={15} className="text-zinc-400" /> {getLocationText(selectedJob)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedJob(null)}
                    className="p-2 text-zinc-400 hover:text-zinc-900 bg-zinc-100 hover:bg-zinc-200 rounded-full transition cursor-pointer shrink-0"
                    aria-label="Close modal"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              {/* Scrollable Modal Content */}
              <div className="p-5 sm:p-7 overflow-y-auto space-y-6 text-xs sm:text-sm text-zinc-700 leading-relaxed font-medium grow bg-[#FCFBF7]">
                
                {/* Key Metrics Grid Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="bg-white p-3.5 rounded-2xl border border-zinc-200/90 shadow-2xs">
                    <div className="text-[10px] font-extrabold uppercase text-zinc-400 tracking-wider flex items-center gap-1">
                      <DollarSign size={12} className="text-emerald-500" /> Salary / Pay
                    </div>
                    <div className="text-xs sm:text-sm font-extrabold text-emerald-600 truncate pt-1">
                      {formatSalary(selectedJob.salary || selectedJob.salaryRange || selectedJob.compensation)}
                    </div>
                  </div>

                  <div className="bg-white p-3.5 rounded-2xl border border-zinc-200/90 shadow-2xs">
                    <div className="text-[10px] font-extrabold uppercase text-zinc-400 tracking-wider flex items-center gap-1">
                      <MapPin size={12} className="text-amber-500" /> Location
                    </div>
                    <div className="text-xs font-bold text-zinc-800 truncate pt-1">
                      {getLocationText(selectedJob)}
                    </div>
                  </div>

                  <div className="bg-white p-3.5 rounded-2xl border border-zinc-200/90 shadow-2xs">
                    <div className="text-[10px] font-extrabold uppercase text-zinc-400 tracking-wider flex items-center gap-1">
                      <Tag size={12} className="text-purple-500" /> Source
                    </div>
                    <div className="text-xs font-bold text-purple-600 truncate pt-1">
                      {selectedJob.source || "Make.com"}
                    </div>
                  </div>

                  <div className="bg-white p-3.5 rounded-2xl border border-zinc-200/90 shadow-2xs">
                    <div className="text-[10px] font-extrabold uppercase text-zinc-400 tracking-wider flex items-center gap-1">
                      <Sparkles size={12} className="text-blue-500" /> Job ID
                    </div>
                    <div className="text-xs font-bold text-zinc-800 truncate pt-1">
                      {selectedJob.jobId || selectedJob._id || "N/A"}
                    </div>
                  </div>
                </div>

                {/* Full Description Box */}
                <div className="bg-white p-5 sm:p-6 rounded-2xl border border-zinc-200/90 shadow-2xs space-y-3">
                  <h3 className="font-extrabold text-zinc-900 text-sm uppercase tracking-wider flex items-center gap-2">
                    <Briefcase size={16} className="text-amber-500" /> Full Job Description
                  </h3>

                  {rawDesc ? (
                    <div
                      className="prose prose-sm max-w-none text-zinc-700 space-y-3 leading-relaxed font-medium pt-1 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1 [&_li]:text-zinc-700 [&_strong]:text-zinc-900 [&_strong]:font-bold"
                      dangerouslySetInnerHTML={{
                        __html: hasHtmlDesc
                          ? rawDesc
                          : rawDesc.replace(/\n/g, "<br/>")
                      }}
                    />
                  ) : (
                    <p className="italic text-zinc-400 py-4 text-center">
                      No detailed description text provided for this job listing.
                    </p>
                  )}
                </div>

                {/* Additional Payload Metadata (If Present) */}
                {extraKeys.length > 0 && (
                  <div className="bg-white p-5 rounded-2xl border border-zinc-200/90 shadow-2xs space-y-3">
                    <h4 className="font-extrabold text-xs uppercase tracking-wider text-amber-600 flex items-center gap-1.5">
                      <Sparkles size={14} /> Additional Information & Attributes
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      {extraKeys.map((key) => {
                        const val = selectedJob[key];
                        const formattedKey = key
                          .replace(/([A-Z])/g, " $1")
                          .replace(/^./, (str) => str.toUpperCase());

                        const isLink = typeof val === "string" && (val.startsWith("http://") || val.startsWith("https://"));

                        return (
                          <div key={key} className="bg-zinc-50 p-3 rounded-xl border border-zinc-200 flex flex-col gap-1">
                            <span className="font-extrabold text-zinc-500 uppercase text-[10px] tracking-wider">
                              {formattedKey}
                            </span>
                            {isLink ? (
                              <a
                                href={val}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-amber-600 font-bold hover:underline flex items-center gap-1 truncate"
                              >
                                <span>{val}</span>
                                <ExternalLink size={12} />
                              </a>
                            ) : (
                              <span className="text-zinc-900 font-bold wrap-break-word">
                                {formatValue(val)}
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

              </div>

              {/* Sticky Bottom Action Footer */}
              <div className="p-4 sm:p-5 bg-white border-t border-zinc-200 flex items-center justify-between gap-3 shrink-0">
                <button
                  onClick={() => setSelectedJob(null)}
                  className="px-5 py-2.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 rounded-xl text-xs font-bold transition cursor-pointer"
                >
                  Close
                </button>

                {(selectedJob.url || selectedJob.jobUrl || selectedJob.link || selectedJob.applyUrl || selectedJob.inputUrl) ? (
                  <a
                    href={selectedJob.url || selectedJob.jobUrl || selectedJob.link || selectedJob.applyUrl || selectedJob.inputUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 sm:px-8 py-3 bg-official text-neutral hover:opacity-90 rounded-xl text-xs sm:text-sm font-extrabold transition flex items-center gap-2 shadow-md cursor-pointer"
                  >
                    <span>Apply For This Position</span>
                    <ExternalLink size={16} />
                  </a>
                ) : (
                  <span className="text-xs text-zinc-400 italic">No external apply link provided</span>
                )}
              </div>

            </div>
          </div>
        );
      })()}
    </div>
  );
}
