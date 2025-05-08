import { create } from "zustand"

export const useJobStore = create((set) => ({
    jobs: [],
    setJobs: (jobs) => set({ jobs }),
    createJob: async (newJob) => {
        if (!newJob.title || !newJob.description || !newJob.salary || !newJob.jobType || !newJob.experience || !newJob.skills || !newJob.applyLink || !newJob.lastDate) {
            return {success: false, message: "All fields are required"}
        }
        const res = await fetch("/api/jobs", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newJob),
        })
        const data = await res.json();
        set((state) => ({ jobs: [...state.jobs, data.data] }));
        return {success: true, message: "Job created successfully"}
    },
    fetchJobs: async () => {
        const res = await fetch("/api/jobs");
        const data = await res.json();
        const formattedJobs = data.data.map(job => ({
            ...job,
            lastDate: job.lastDate.split('T')[0], // Extract only the date part
        }));
        set({ jobs: formattedJobs });
    },
    deleteJob: async (jid) => {
        const res = await fetch(`/api/jobs/${jid}`, {
            method: "DELETE",
        })
        const data = await res.json();
        if (!data.success) {
            return {success: false, message: data.message}
        };
        set((state) => ({ jobs: state.jobs.filter((job) => job._id !== jid) }))
        return {success: true, message: data.message}
    },
    updateJob: async (jid, updatedJob) => {
        const res = await fetch(`/api/jobs/${jid}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedJob),
        })
        const data = await res.json()
        if (!data.success) {
            return {success: false, message: data.message}
        };
        set((state) => ({ jobs: state.jobs.map((job) => (job._id === jid ? data.data : job)),
         }));
        return {success: true, message: data.message}
    },
    getJobByUniqueId: async (uniqueId) => {
        const res = await fetch(`/api/jobs/view/${uniqueId}`)
        const data = await res.json()
        if (!data.success) {
            return {success: false, message: data.message}
        };
        return {success: true, job: data.data}
    },

}));
