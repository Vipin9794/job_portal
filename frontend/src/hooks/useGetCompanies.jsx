import { setCompanies } from "@/redux/companySlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { COMPANY_API_END_POINT } from "@/components/utils/constant";

const useGetCompanies = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchCompany = async () => {
            try {
                axios.defaults.withCredentials = true;
                const res = await axios.get(`${COMPANY_API_END_POINT}/companies/` , {withCredentials: true});
                console.log(res.data);
                dispatch(setCompanies(res.data.companies));
            } catch (error) {
                console.log(error);
            }
        }
        fetchCompany();
    }, []);
};
export default useGetCompanies;
