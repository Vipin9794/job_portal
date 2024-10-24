import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate,useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import JobTable from './JobTable'
import { setSearchCompanyByText } from '@/redux/companySlice'
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs'

const AdminJobs = () => {
    useGetAllAdminJobs();
    const [text, setText] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

     useEffect(()=>{
         dispatch(setSearchCompanyByText(text));
    
    
     },[text]);

    return (
        <div>
            <Navbar />
            <div className='max-w-6xl mx-auto my-10'>
                <div className='flex items-center justify-between my-5'>
                    <Input value={text} onChange={(e) => setText(e.target.value)} className="w-[30%] " placeholder="Filter by name" />
                    <Button onClick={() => navigate("/admin/jobs/create")} className="bg-black text-white hover:bg-gray-800" >New Job</Button>
                </div>
                <JobTable />
            </div>
        </div>
    )
}

export default AdminJobs;