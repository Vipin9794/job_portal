import { JOB_API_END_POINT } from "@/components/utils/constant";
import { setAdminJobs } from "@/redux/jobSlice";
import axios from "axios";
import { useEffect } from "react";
import { setSearchText } from "@/redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";

const useGetAllAdminJobs = () => {
    const dispatch = useDispatch();
    const {setSearchText} = useSelector(store => store.job);
    useEffect(() => {
        const fetchAdminJobs = async () => {
            try {
                axios.defaults.withCredentials = true;
                const res = await axios.get(`${JOB_API_END_POINT}/get?keyword=${setSearchText}` , {withCredentials :true});
                if(res.data.success){ 
                    dispatch(setAdminJobs(res.data.jobs));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAdminJobs();
    }, []);
}
export default useGetAllAdminJobs;