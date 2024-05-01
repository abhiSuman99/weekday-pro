import React, { useState, useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobs } from "../redux/actions/jobActions";
import JobCard from "./JobCard";

const JobList = () => {
  const dispatch = useDispatch();
  const { jobs, loading, error } = useSelector((state) => state.job); // Select jobs, loading, and error state from Redux store
  const [offset, setOffset] = useState(0); // State to track pagination offset
  const [filters, setFilters] = useState({ // State to hold filter values
    minExperience: "",
    companyName: "",
    location: "",
    techStack: "",
    role: "",
    minBasePay: "",
  });

  useEffect(() => {
    // Fetch jobs when component mounts or offset changes
    dispatch(fetchJobs(12, offset)); // Dispatch fetchJobs action with pagination parameters
  }, [dispatch, offset]);

  const observer = useRef(null); // Ref for IntersectionObserver
  const lastElementObserver = useCallback(
    (node) => {
      // Callback for last element ref
      if (loading) return; // If loading, return early
      if (observer.current) observer.current.disconnect(); // Disconnect previous observer

      // Create new IntersectionObserver
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setOffset((prev) => prev + 1); // If last element is intersecting, increment offset for pagination
        }
      });

      if (node) observer.current.observe(node); // Observe the last element node
    },
    [loading]
  );

  // Filter jobs based on filter values
  const filteredJobs = jobs.filter(job => {
    const meetsMinExperience = !filters.minExperience || job.minExp >= parseInt(filters.minExperience);
    const matchesCompanyName = !filters.companyName || job.companyName.toLowerCase().includes(filters.companyName.toLowerCase());
    const matchesLocation = !filters.location || job.location.toLowerCase().includes(filters.location.toLowerCase());
    const matchesTechStack = !filters.techStack || job.techStack.toLowerCase().includes(filters.techStack.toLowerCase());
    const matchesRole = !filters.role || (job.role && job.role.toLowerCase().includes(filters.role.toLowerCase()));
    const meetsMinBasePay = !filters.minBasePay || job.minBasePay >= parseInt(filters.minBasePay);
  
    // Return true if job passes all filter conditions
    return meetsMinExperience && matchesCompanyName && matchesLocation && matchesTechStack && matchesRole && meetsMinBasePay;
  });
  
  // Handler for filter input change
  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    // Update filters state with new filter value
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  return (
    <div className="job-list">
      {/* Filter inputs */}
      <div className="filters">
        <input type="text" name="minExperience" placeholder="Min Experience" value={filters.minExperience} onChange={handleFilterChange} />
        <input type="text" name="companyName" placeholder="Company Name" value={filters.companyName} onChange={handleFilterChange} />
        <input type="text" name="location" placeholder="Location" value={filters.location} onChange={handleFilterChange} />
        <input type="text" name="techStack" placeholder="Tech Stack" value={filters.techStack} onChange={handleFilterChange} />
        <input type="text" name="role" placeholder="Role" value={filters.role} onChange={handleFilterChange} />
        <input type="text" name="minBasePay" placeholder="Min Base Pay" value={filters.minBasePay} onChange={handleFilterChange} />
      </div>
      {/* Job cards */}
      <div className="job-card-container">
        {filteredJobs.map((job, index) => {
          if (index === Object.keys(filteredJobs).length - 1) {
            // If it's the last job, attach lastElementObserver ref
            return (
              <div className="job-card" key={index} ref={lastElementObserver}>
                <JobCard job={job} />
              </div>
            );
          }
          // Otherwise, render job card without ref
          return (
            <div className="job-card" key={index}>
              <JobCard job={job} />
            </div>
          );
        })}
      </div>
      {/* Loading and error indicators */}
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default JobList;
