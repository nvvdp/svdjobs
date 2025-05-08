import mongoose from "mongoose";
import Job from "../models/job.model.js";

export const getAllJobs = async (req, res) => {
    try {
        const jobs = await Job.find({});
        res.status(200).json({ success: true, data: jobs });
    } catch (error) {
        console.error("Error fetching jobs:", error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

export const createJob = async (req, res) => {
    const jobData = req.body;

    const requiredFields = ["title", "company", "location", "image", "description", "salary", "jobType", "experience", "skills", "applyLink", "lastDate"];
    const missingFields = requiredFields.filter(field => !jobData[field]);

    if (missingFields.length) {
        return res.status(400).json({
            success: false,
            message: `Missing required fields: ${missingFields.join(', ')}`
        });
    }

    try {
        const newJob = new Job(jobData);
        await newJob.save();
        res.status(201).json({ success: true, data: newJob });
    } catch (error) {
        console.error("Error creating job:", error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};

export const updateJob = async (req, res) => {
    const { id } = req.params;

    const jobData = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid job ID" });
    }

    try {
        const updatedJob = await Job.findByIdAndUpdate(id, jobData, { new: true });
        res.status(200).json({ success: true, data: updatedJob });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }

};

export const deleteJob = async (req, res) => {
    const { id } = req.params;
    
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid job ID" });
    }
    try {
        await Job.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Job deleted successfully" });
    } catch (error) {
        console.error("Error deleting job:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const getJobById = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid job ID" });
    }

    try {
        const job = await Job.findById(id);
        if (!job) {
            return res.status(404).json({ success: false, message: "Job not found" });
        }
        res.status(200).json({ success: true, data: job });
    } catch (error) {
        console.error("Error fetching job by ID:", error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

export const getJobByUniqueId = async (req, res) => {
    const { uniqueId } = req.params;

    try {
        // Convert uniqueId to a number
        const index = parseInt(uniqueId, 10);

        // Fetch all jobs and find the job at the given index (1-based index)
        const jobs = await Job.find({});
        if (index < 1 || index > jobs.length) {
            return res.status(404).json({ success: false, message: "Job not found" });
        }

        const job = jobs[index - 1]; // Adjust for 0-based array indexing
        res.status(200).json({ success: true, data: job });
    } catch (error) {
        console.error("Error fetching job by unique ID:", error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};
