import axios from 'axios';
import React, { useState } from 'react'

function CreateJob() {
    const [formData, setFormData] = useState({
        title: "",
        company: "",
        description: "",
        location: "",
        salary: "",
        jobType: "",
        skills: ""
    })
    function handelChanges(e) {

        const { name, value } = e.target;
        setFormData((form) => ({ ...form, [name]: value }))

    }
    async function submitForm(e) {
        e.preventDefault();
        let token = localStorage.getItem('token');
        let data = {
            ...formData,
            skills: formData.skills.split(',').map(skill => skill.trim())
        }
        let response = await axios.post(
            "http://localhost:5000/api/job/CreateJob",
            data,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
    }
    return (
        <>
            <div>CreateJob</div>
            <form action="" onSubmit={(e) => submitForm(e)}>
                <label htmlFor="title">Title</label>
                <input onChange={handelChanges}
                    type="text"
                    id="title"
                    name='title'
                    placeholder="Enter title here"
                />

                <label htmlFor="company">Company</label>
                <input onChange={handelChanges}
                    type="text"
                    name="company"
                    placeholder="Enter company name here"
                />

                <label htmlFor="description">Description</label>
                <input onChange={handelChanges}
                    type="text"
                    name="description"
                    placeholder="Enter description here"
                />

                <label htmlFor="location">Location</label>
                <input onChange={handelChanges}
                    type="text"
                    name="location"
                    placeholder="Enter job location"
                />

                <label htmlFor="salary">Salary</label>
                <input onChange={handelChanges}
                    type="number"
                    name="salary"
                    placeholder="Enter salary"
                />

                <label htmlFor="jobType">Job Type</label>
                <select onChange={handelChanges} name="jobType">
                    <option value="">Select job type</option>
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Internship">Internship</option>
                    <option value="Contract">Contract</option>
                </select>

                <label htmlFor="skills">Skills</label>
                <input onChange={handelChanges}
                    type="text"
                    name="skills"
                    placeholder="Enter skills (React, Node.js, MongoDB)"
                />

                <button type="submit">Create Job</button>
            </form>
        </>
    )
}

export default CreateJob