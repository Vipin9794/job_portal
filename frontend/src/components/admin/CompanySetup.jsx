import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useSelector } from "react-redux";
import { Button } from "../ui/button";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";
import { COMPANY_API_END_POINT } from "../utils/constant";
import useGetCompanyById from "@/hooks/useGetCompanyById";
import { Loader2 } from "lucide-react";

const CompanySetup = () => {
  const params = useParams();
  const { loading: fetching, error } = useGetCompanyById(params.id);
  useGetCompanyById(params.id); // Fetching company by ID
  const { singleCompany } = useSelector((store) => store.company);
  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);
    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      const res = await axios.put(
        `${COMPANY_API_END_POINT}/update/${params.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/companies");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message);
    }finally {
      setLoading(false); // Reset loading state
    }
  };

  useEffect(() => {
    setInput({
      name: singleCompany?.name || "",
      description: singleCompany?.description || "",
      website: singleCompany?.website || "",
      location: singleCompany?.location || "",
      file: null,
    });
  }, [singleCompany]);

  return (
    <div>
      <Navbar />
      <div className="max-w-xl mx-auto my-10">
        <form onSubmit={submitHandler} className="shadow-lg p-8">
          <div className="flex items-center gap-5 mb-10">
            <Button
              variant="ghost"
              onClick={() => navigate("/admin/companies")}
              className="flex items-center gap-2 text-gray-500 fot-semibold"
            >
              <ArrowLeft />
              <span>Back</span>
            </Button>
            <h1 className="font-bold text-xl">Company Setup</h1>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Company Name</Label>
              <Input
                type="text"
                name="name"
                value={input.name}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label>Description</Label>
              <Input
                type="text"
                name="description"
                value={input.description}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label>Website</Label>
              <Input
                type="text"
                name="website"
                value={input.website}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label>Location</Label>
              <Input
                type="text"
                name="location"
                value={input.location}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label>Logo</Label>
              <Input
                accept="image/*"
                type="file"
                onChange={changeFileHandler}
              />
            </div>
          </div>
          {loading ? (
                <Button className="w-full my-4">
                  <Loader2 className="mr-4 h-4 w-4 animate-spin" />
                  Please wait
                </Button>
              ) : (
          <Button
            type="submit"
            className="w-full mt-8  bg-gray-400 bg-black text-white hover:bg-gray-800"
            disabled={loading}
          >
             {/* Change button text based on loading state */}
            Update
          </Button>
              )
            }
        </form>
      </div>
      
    </div>
  );
};

export default CompanySetup;
