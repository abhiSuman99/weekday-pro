import React, { useState } from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";

const JobCard = ({ job }) => {
  const [expanded, setExpanded] = useState(false);

  // Function to toggle expand state
  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  // Determine toggle expand button text based on expanded state
  const toggleExpandText = expanded ? "Read Less" : "Read More";

  return (
    <Card style={{ width: "100%", marginBottom: 10, borderRadius: 8 }}>
      <CardContent>
        {/* Title for job role, centered */}
        <Typography variant="h6" style={{ fontSize: "1.2rem", marginBottom: 5, textAlign: "center" }}>
         Role: {job.jobRole}
        </Typography>
        {/* Company name, centered */}
        <Typography variant="subtitle1" style={{ fontSize: "1rem", marginBottom: 5, textAlign: "center" }}>
          Company Name: {job.companyName || "Data not given"}
        </Typography>
        {/* Location, centered */}
        <Typography variant="subtitle2" style={{ fontSize: "0.9rem", marginBottom: 10, textAlign: "center" }}>
         Location: {job.location}
        </Typography>

        {/* Job description */}
        <div className="job-description">
          <Card
            variant="outlined"
            style={{
              width: "100%",
              minHeight: 150,
              borderRadius: 20,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "10px",
            }}
          >
            <Typography style={{ fontSize: "0.9rem" }}>
              {expanded
                ? job.jobDetailsFromCompany
                : job.jobDetailsFromCompany.substring(0, 200)}
              {/* Append Read More/Read Less button if job details are long enough */}
              {job.jobDetailsFromCompany.length > 200 && (
                <Button size="small" onClick={toggleExpand}>{toggleExpandText}</Button>
              )}
            </Typography>
          </Card>
        </div>

        {/* Experience required */}
        <Typography variant="body2" style={{ fontSize: "0.9rem", marginTop: 10 }}>
          Experience Required: {job.minExp} - {job.maxExp} years
        </Typography>

        {/* Salary and Currency */}
        <Typography variant="body2" style={{ fontSize: "0.9rem", marginTop: 10 }}>
          Salary: {job.minJdSalary} {job.salaryCurrencyCode}
        </Typography>

        {/* Apply button */}
        <Button
          variant="contained"
          color="primary"
          href={job.jdLink}
          style={{ width: "100%", marginTop: 10, fontSize: "0.9rem" }}
          target="_blank"
          rel="noopener noreferrer"
        >
          Apply Now
        </Button>
      </CardContent>
    </Card>
  );
};

export default JobCard;
