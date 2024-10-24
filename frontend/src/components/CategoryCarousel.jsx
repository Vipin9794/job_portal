import React from "react";
import { Carousel, CarouselItem, CarouselContent } from "./ui/carousel";
import { CarouselPrevious, CarouselNext } from "./ui/carousel";
import { Button } from "./ui/button";
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
  return (
    <div>
      <Carousel className="w-full max-w-xl mx-auto my-20">
        <CarouselContent>
          {category.map((item, index) => (
            <CarouselItem className="md:basis-1/2 lg:basis-1/3">
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
