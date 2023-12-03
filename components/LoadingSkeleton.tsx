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

export function ModalDetailGallerySkeleton() {
  return (
    <div className="flex justify-between  max-md:flex-col max-md:gap-y-3  gap-x-3">
      <Skeleton className=" relative w-full md:w-[600px] h-[220px]  md:h-[550px] " />
      <div className="max-md:flex-row flex flex-col items-center max-md:gap-x-3 gap-y-3">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="">
            <Skeleton className="h-[65px] w-[65px] md:h-[100px] md:w-[100px]" />
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

export function ModalDetailProductsSkeleton() {
  return (
    <div className="">
      <div className="flex  max-md:flex-col max-sm:gap-y-3  gap-x-5">
        <div className="flex flex-col gap-y-3">
          <Skeleton className=" relative w-full md:w-[360px] h-[160px]  md:h-[320px]" />

          <div className="flex items-center gap-x-3 overflow-x-auto">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="">
                <Skeleton
                  className={`h-[65px] w-[65px] md:h-[80px] md:w-[80px]`}
                />
              </div>
            ))}
          </div>
        </div>

        <div className=" flex flex-1 flex-col justify-between">
          <div className="w-full">
            <Skeleton className="h-8 w-[250px] my-3" />
            <Skeleton className="h-8 w-[200px] my-3" />
            <Skeleton className="h-8 w-[150px] my-3 mb-3 md:mb-8" />

            {[...Array(3)].map((_, index) => (
              <div key={index} className="">
                <Skeleton className={`h-3 w-[250px] my-3`} />
                <Skeleton className={`hidden md:block h-3 w-[300px]`} />
              </div>
            ))}
          </div>

          <Skeleton className="h-10 w-[300px] md:w-[320px]" />
        </div>
      </div>
    </div>
  );
}
