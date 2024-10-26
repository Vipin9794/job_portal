import { JOB_API_END_POINT } from "@/components/utils/constant";
import { setAllJobs } from "@/redux/jobSlice";
import axios from "axios"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux";
import { useState } from "react";

const useGetAllJobs = () => {
    const dispatch = useDispatch();

   // const { searchText } = useSelector(store => store.job);
  

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                axios.defaults.withCredentials = true;
                const res = await axios.get(`${JOB_API_END_POINT}/get`, {withCredentials:true});
               
                if (res.data.success) {
                    dispatch(setAllJobs(res.data.jobs));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchJobs();
    }, [])
}
export default useGetAllJobs;