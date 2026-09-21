import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function AdminDashboard() {
    const [stats, setStats] = useState(null)

    useEffect(() => {
        async function getStats() {
            try {
                const token = localStorage.getItem('token')

                const response = await axios.get(
                    'http://localhost:5000/api/admin/stats',
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                )

                setStats(response.data)
            } catch (error) {
                console.log(error)
            }
        }

        getStats()
    }, [])

    if (!stats) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <h1>Admin Dashboard</h1>

            <div>
                <h2>Total Users</h2>
                <p>{stats.totalUsers}</p>
            </div>

            <div>
                <h2>Jobseekers</h2>
                <p>{stats.totalJobseekers}</p>
            </div>

            <div>
                <h2>Recruiters</h2>
                <p>{stats.totalRecruiters}</p>
            </div>

            <div>
                <h2>Total Jobs</h2>
                <p>{stats.totalJobs}</p>
            </div>

            <div>
                <h2>Total Applications</h2>
                <p>{stats.totalApplications}</p>
            </div>
        </div>
    )
}