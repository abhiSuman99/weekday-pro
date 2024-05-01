import React, { useState, useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobs } from "../redux/actions/jobActions";
import JobCard from "./JobCard";

const JobList = () => {
  const dispatch = useDispatch();
  const { jobs, loading, error, totalCount } = useSelector(
    (state) => state.job
  );
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    dispatch(fetchJobs(12, offset));
  }, [dispatch, offset]);

  const observer = useRef(null);
  const lastElementOberver = useCallback(
    (node) => {
      console.log("++++LOAOAOA", loading, observer.current);
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setOffset((prev) => prev + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading]
  );

  return (
    <div className="job-list">
      <div className="job-card-container">
        {jobs.map((job, index) => {
          if (index === jobs.length - 1) {
            return (
              <div className="job-card" key={index} ref={lastElementOberver}>
                <JobCard job={job} />
              </div>
            );
          }
          return (
            <div className="job-card" key={index} ref={null}>
              <JobCard key={index} job={job} />
            </div>
          );
        })}
      </div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default JobList;
