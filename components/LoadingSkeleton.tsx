import { Skeleton } from "@/components/ui/skeleton";

export function CardOurTeamsSkeleton() {
  return (
    <div className="section-wrapper">
      <div className="mt-[40px] mb-[20px] md:mb-[40px]">
        <Skeleton className=" relative  w-[130px] h-[35px] " />
        <Skeleton className=" mt-2 relative  w-[235px] h-[35px] " />
      </div>
      <div className="hidden lg:flex items-center justify-center md:justify-between ">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="">
            <Skeleton
              className={`relative ${
                index % 2 === 0 ? "h-[280px]" : "h-[330px]"
              } w-[225px]`}
            />
          </div>
        ))}
      </div>

      <div className="hidden md:flex lg:hidden items-center justify-between ">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="">
            <Skeleton
              className={`relative ${
                index % 2 === 0 ? "h-[280px]" : "h-[330px]"
              } w-[225px]`}
            />
          </div>
        ))}
      </div>

      <div className="hidden sm:flex md:hidden items-center justify-between ">
        {[...Array(2)].map((_, index) => (
          <div key={index} className="">
            <Skeleton
              className={`relative ${
                index % 2 === 0 ? "h-[280px]" : "h-[330px]"
              } w-[225px]`}
            />
          </div>
        ))}
      </div>

      <div className="max-sm:flex sm:hidden  justify-center md:justify-between  ">
        {[...Array(1)].map((_, index) => (
          <div key={index} className="">
            <Skeleton
              className={`relative ${
                index % 2 === 0 ? "h-[280px]" : "h-[330px]"
              } w-[225px]`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export function CardGallerySkeleton() {
  return (
    <div className="section-wrapper">
      <div className="mt-[40px] mb-[20px] md:mb-[40px]">
        <Skeleton className=" relative  w-[130px] h-[35px] " />
        <Skeleton className=" mt-2 relative  w-[235px] h-[35px] " />
      </div>
      <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className={` ${index === 1 && "md:col-span-2 "} 
        ${
          index === 2 && "lg:row-span-2  lg:h-[540px] md:w-full md:h-[250px] "
        }`}
          >
            <Skeleton
              className={`relative  md:w-full h-[200px] md:h-[260px] ${
                index === 2 && "lg:h-full"
              }  `}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export function CardProductsSkeleton() {
  return (
    <div className="section-wrapper">
      <div className="mt-[40px] mb-[20px] md:mb-[40px]">
        <Skeleton className=" relative  w-[130px] h-[35px] " />
        <Skeleton className=" mt-2 relative  w-[235px] h-[35px] " />
      </div>
      <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="">
            <Skeleton className=" relative md:w-full h-[160px] sm:h-[260px]" />
            <Skeleton className=" relative mt-3 md:w-full h-[70px] " />
          </div>
        ))}
      </div>
    </div>
  );
}
