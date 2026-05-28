import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

import { MotionGrid } from "@/components/MotionGrid";
import { ProjectCard } from "./ProjectCard";

import type { Project } from "../types";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

export function ProjectsCarousel({ projects }: { projects: Project[] }) {
  const [api, setApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCanScrollPrev(api.canScrollPrev());
    setCanScrollNext(api.canScrollNext());

    api.on("select", () => {
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    });
  }, [api]);
  return (
    <Carousel
      setApi={setApi}
      opts={{
        align: "start",
        loop: true,
      }}
      className="w-full"
    >
      <CarouselContent className="-ml-4">
        {projects.map((project) => (
          <CarouselItem
            key={project.id}
            className="
              pl-4
              basis-[85%]
              sm:basis-1/2
              lg:basis-1/3
              xl:basis-1/3
            "
          >
            <MotionGrid>
              <div className="h-full">
                <ProjectCard project={project} />
              </div>
            </MotionGrid>
          </CarouselItem>
        ))}
      </CarouselContent>

      {/* Floating Bottom Center Arrows */}
      <div className="mt-4 flex justify-center gap-3">
        <Button
          variant="outline"
          size="icon"
          onClick={() => api?.scrollPrev()}
          disabled={!canScrollPrev}
          className="h-10 w-10 rounded-full bg-background shadow-sm border-muted-foreground/20 hover:bg-background hover:scale-105 active:scale-95 transition-all disabled:opacity-40 cursor-pointer"
        >
          <ChevronLeft className="h-5 w-5" />
          <span className="sr-only">Previous slide</span>
        </Button>

        <Button
          variant="outline"
          size="icon"
          onClick={() => api?.scrollNext()}
          disabled={!canScrollNext}
          className="h-10 w-10 rounded-full bg-background shadow-sm border-muted-foreground/20 hover:bg-background hover:scale-105 active:scale-95 transition-all disabled:opacity-40 cursor-pointer"
        >
          <ChevronRight className="h-5 w-5" />
          <span className="sr-only">Next slide</span>
        </Button>
      </div>
    </Carousel>
  );
}
