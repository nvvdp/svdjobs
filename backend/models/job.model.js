import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please add a job title"],
  },
  company: {
    type: String,
    required: [true, "Please add a company name"],
  },
  location: {
    type: String,
    required: [true, "Please add a location"],
    enum: {
      values: ["Remote", "On-site", "Hybrid"],
      message: "Location must be either 'Remote', 'On-site', or 'Hybrid'",
    },
  },
  image: {
    type: String,
    required: [true, "Please add an image"],
  },
  description: {
    type: String,
    required: [true, "Please add a description"],
  },
  salary: {
    type: String,
    required: [true, "Please add a salary"],
  },
  jobType: {
    type: String,
    required: [true, "Please add a job type"],
    enum: {
      values: ["Full-time", "Part-time", "Contract", "Internship", "Freelance"],
      message: "Job type must be one of: Full-time, Part-time, Contract, Internship, Freelance",
    },
  },
  experience: {
    type: String,
    required: [true, "Please add experience"],
  },
  skills: {
    type: [String],
    required: [true, "Please add skills"],
  },
  applyLink: {
    type: String,
    required: [true, "Please add an apply link"],
    validate: {
      validator: function (v) {
        return /^(ftp|http|https):\/\/[^ "]+$/.test(v);
      },
      message: (props) => `${props.value} is not a valid URL`,
    },
  },
  lastDate: {
    type: Date,
    required: [true, "Please add a last date"],
  },
}, {
  timestamps: true,
});

const Job = mongoose.model("Job", jobSchema);

export default Job;
