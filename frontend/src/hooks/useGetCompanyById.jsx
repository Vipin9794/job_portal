import { COMPANY_API_END_POINT } from "@/components/utils/constant";
import { setLoading } from "@/redux/authSlice";
import { setSingleCompany } from "@/redux/companySlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";




const useGetCompanyById = (id) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  

  useEffect(() => {
    const fetchCompanyDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        axios.defaults.withCredentials = true;
        const res = await axios.get(
          `${COMPANY_API_END_POINT}/get/${companyId}`
        );
        if (res.data.success) {
          
          dispatch(setSingleCompany(res.data.company));
        }
      } catch (error) {
        console.log("Error occured while fetching company details", error);
      }finally {
        setLoading(false);
      }
    };
    if (id) { // Ensure id is defined before fetching
      fetchCompanyDetails();
    }
  }, [id, dispatch]);
  return { loading, error };
};
export default useGetCompanyById;
