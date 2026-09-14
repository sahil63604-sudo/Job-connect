import React from 'react'
import { Link } from 'react-router-dom'
import jobseeker from '../assets/jobseeker.jpg'
import recruiter from '../assets/recruiter.jpg'
import hero from '../assets/hero.jpg'

export const Home = () => {
    return (
        <div className='min-h-screen bg-gray-50 px-6 md:px-10'>

            {/* Hero Section */}
            <section>

            <div className='pt-16 pb-10 text-center'>

                <h1 className='text-4xl md:text-5xl font-bold'>
                    Find Your Next{' '}
                    <span className='text-blue-700'>Opportunity</span> 🚀
                </h1>

                <p className='mt-4 text-gray-600 text-lg'>
                    Discover jobs that match your skills and career goals
                </p>

                {/* Search */}
                <div className='flex justify-center mt-10'>
                    <div className='w-full max-w-3xl bg-white p-4 rounded-2xl shadow-lg flex flex-col md:flex-row gap-3'>

                        <input
                            className='flex-1 border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500'
                            type='text'
                            placeholder='Job title or keyword'
                            />

                        <input
                            className='flex-1 border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500'
                            type='text'
                            placeholder='Location'
                            />

                        <button
                            className='bg-blue-600 hover:bg-blue-700 transition px-6 py-3 rounded-xl text-white font-medium'
                            type='button'
                            >
                            Search Jobs
                        </button>

                    </div>
                </div>
            </div>
                            </section>


            {/* Feature Cards */}
            <section className='flex flex-col md:flex-row justify-center gap-8 pb-16'>

                {/* Job Seeker Card */}
                <div className='w-full max-w-md bg-white shadow-md hover:shadow-xl transition duration-300 p-7 rounded-2xl'>

                    <div className='flex justify-center'>
                        <div className='rounded-full h-48 w-48 flex items-center justify-center shadow-md p-2'>
                            <img
                                className='h-full w-full rounded-full object-cover'
                                src={jobseeker}
                                alt='Job seeker'
                            />
                        </div>
                    </div>

                    <h2 className='mt-6 text-xl font-semibold'>
                        Find Your Dream Job 👨‍💻
                    </h2>

                    <p className='mt-3 text-gray-600 leading-7'>
                        Search thousands of opportunities and apply to jobs
                        that match your skills.
                    </p>

                    <div className='flex justify-end mt-5'>
                        <Link
                            to='/jobs'
                            className='bg-blue-600 hover:bg-blue-700 transition px-5 py-2.5 rounded-xl text-white'
                        >
                            Explore Jobs
                        </Link>
                    </div>

                </div>


                {/* Recruiter Card */}
                <div className='w-full max-w-md bg-white shadow-md hover:shadow-xl transition duration-300 p-7 rounded-2xl'>

                    <div className='flex justify-center'>
                        <div className='rounded-full h-48 w-48 flex items-center justify-center shadow-md p-2'>
                            <img
                                className='h-full w-full rounded-full object-cover'
                                src={recruiter}
                                alt='Recruiter'
                            />
                        </div>
                    </div>

                    <h2 className='mt-6 text-xl font-semibold'>
                        Hire Great Talent 🏢
                    </h2>

                    <p className='mt-3 text-gray-600 leading-7'>
                        Post job openings and manage applications from
                        qualified candidates.
                    </p>

                    <div className='flex justify-end mt-5'>
                        <Link
                            to='/post-job'
                            className='bg-blue-600 hover:bg-blue-700 transition px-5 py-2.5 rounded-xl text-white'
                        >
                            Post a Job
                        </Link>
                    </div>

                </div>

            </section>

        </div>
    )
}