import React from "react";
import { Carousel, CarouselItem, CarouselContent, CarouselPrevious, CarouselNext } from "./ui/carousel";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchText } from "@/redux/jobSlice";



const category = [
  "Frontend Developer",
  "Backend Developer",
  "Data Engineer",
  "Data Science",
  "Graphic Designer",
  "UI Developer",
  "Wordpress Developer",
];

const CategoryCarousel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div>
      <Carousel className="w-full max-w-xl mx-auto my-20">
        <CarouselContent>
          {category.map((item, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <div className="p-1">
                <Button
                  onClick={() => {
                    dispatch(setSearchText(item));
                    navigate("/browse");
                  }}
                  variant="outline"
                  className="rounded-full "
                >
                  {item}
                </Button>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;
