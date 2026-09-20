import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

export default function Applicants() {
    const { jobId } = useParams()
    const [applicants, setApplicants] = useState(null);
    
    useEffect(() => {
        async function getApplicants() {
            let token = localStorage.getItem('token')
            let response = await axios.get('http://localhost:5000/api/apply/getapplicants', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            let selectedJobApplicants = response.data.filteredApplicants.filter((applicant) => (applicant.job._id === jobId))
            setApplicants(selectedJobApplicants)
            console.log(selectedJobApplicants.map((id) => (id.applicant.name)));

        }
        getApplicants();
    }, [jobId])
    const updateStatus = async (applicationId, status) => {
        const token = localStorage.getItem("token")

        let response= await axios.patch(`http://localhost:5000/api/apply/updateApplication/${applicationId}`,{
            status
        },{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        
        console.log(response.data.message);
    }
    if (!applicants) {
        return (
            <>
                <div>loading.....</div></>
        )
    }
    return (
        <div>
            <h1>Applicants</h1>

            {applicants.map((application) => (
                <div key={application._id}>
                    <h2>{application.applicant.name}</h2>
                    <p>{application.applicant.email}</p>
                    <p>Status: {application.status}</p>
                    <div>
                        <select value={application.status}
                        onChange={(e)=>updateStatus(application._id,e.target.value)}>
                            <option value="applied">Applied</option>
                            <option value="interview">Interview</option>
                            <option value="accepted">Accepted</option>
                            <option value="rejected">Rejected</option>
                        </select>
                    </div>
                </div>
            ))}
        </div>
    )
}
