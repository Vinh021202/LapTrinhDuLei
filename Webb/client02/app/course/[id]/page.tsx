'use client'
import React from 'react'
import CourseDetailsPage from "../../components/Course/CourseDetailsPage"

const Page = ({ params }: any) => {
    // Use React.use() to unwrap the params promise

    return ( 
        <div>
            <CourseDetailsPage id={params.id} />
        </div>
    )
}

export default Page
