import React from "react";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User2 } from "lucide-react";
import { LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_END_POINT } from "../utils/constant";
import { setAuthUser } from "@/redux/authSlice";

const Navbar = () => {
  // const user = true;
  const { authUser } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setAuthUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="bg-white">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
        <div>
          <h1 className="text-2xl font-bold">
            Job<span className="text-[#F83002]">Hunt</span>
          </h1>
        </div>
        <div className="flex items-center gap-12">
          <ul className="flex font-medium items-center gap-5">
            {authUser && authUser.role === "recruiter" ? (
              <>
                <li className="hover:text-[#6A38C2] cursor-pointer">
                  <Link to={"/admin/companies"}>Companies</Link>
                </li>
                <li className="hover:text-[#6A38C2] cursor-pointer">
                  <Link to={"/admin/jobs"}>Jobs</Link>
                </li>
              </>
            ) : (
              <>
                <li className="hover:text-[#6A38C2] cursor-pointer">
                  <Link to={"/"}>Home</Link>
                </li>
                <li className="hover:text-[#6A38C2] cursor-pointer">
                  <Link to={"/jobs"}>Jobs</Link>
                </li>
                <li className="hover:text-[#6A38C2] cursor-pointer">
                  <Link to={"/browse"}>Browse</Link>
                </li>
              </>
            )}
          </ul>
          {!authUser ? (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant={"outline"}>Login</Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-[#6A38C2] hover:bg-[#5f32ad]">
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            // <ProfilePopover />
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer ">
                  <AvatarImage
                    src={authUser?.profile?.profilePhoto}
                    alt="@shadcn"
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80 rounded-md border bg-white shadow-md  ">
                <div className="flex gap-4 space-y-2 bg-white">
                  <Avatar className="cursor-pointer">
                    <AvatarImage
                      src={authUser?.profile?.profilePhoto}
                      alt="@shadcn"
                    />
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{authUser?.fullname}</h4>
                    {authUser && authUser?.role === "student" && (
                      <p className="text-sm text-muted-foreground">
                        {authUser?.profile.bio}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex flex-col my-2 text-gray-600">
                  {authUser && authUser?.role === "student" && (
                    <div className="flex w-fit items-center gap-2 cursor-pointer ">
                      <User2 />
                      <Button>
                        <Link to="/profile">Vew Profile</Link>
                      </Button>
                    </div>
                  )}
                  
                  <div className="flex w-fit items-center gap-2 cursor-pointer ">
                    <LogOut />
                    <Button onClick={logoutHandler}>Logout</Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;