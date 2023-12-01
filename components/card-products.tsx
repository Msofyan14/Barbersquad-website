"use client";

import Image from "next/image";
import { ChevronDown, ChevronUp, Eye } from "lucide-react";
import { IProducts } from "@/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDetailProducts } from "@/hooks/use-detail-products";
import { getProductByid } from "@/lib/actions/products.actions";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { alice } from "./ui/fonts";

interface IProductsProps {
  data: IProducts[];
  totalProducts: number;
}

export function CardProducts({ data, totalProducts }: IProductsProps) {
  const { onOpen, setDetailProduct } = useDetailProducts();

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const valueProducts = data.length;

  const params = new URLSearchParams(searchParams);
  const productsParams = params.get("products");

  const handleShowMore = async () => {
    if (!productsParams || +productsParams < totalProducts) {
      params.set("products", (valueProducts + 4).toString());
    } else {
      params.delete("products");

      const nextSection = document.getElementById("products");
      if (nextSection) {
        nextSection?.classList.add("scroll-mt-[120px]");
        nextSection?.scrollIntoView({ behavior: "smooth" });
      }
    }

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleOpenDetailProducts = async (id: string | undefined) => {
    onOpen();
    try {
      const detailGallery = await getProductByid(id);

      if (!detailGallery) {
        toast.error("failed retrieve details gallery");
      }

      setDetailProduct(detailGallery);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex flex-col gap-y-[40px] items-center">
      <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
        {data.map((product, index) => (
          <div key={index} className="border rounded-lg p-1 md:p-3">
            <div
              className={`
          group relative cursor-pointer items-center justify-center overflow-hidden transition-shadow hover:shadow-xl hover:shadow-black/30 rounded-md shadow-lg`}
            >
              <div
                className={` 
       relative  md:w-full h-[160px] sm:h-[260px]  `}
              >
                <Image
                  className="object-cover transition-transform duration-500 group-hover:rotate-3 group-hover:scale-125 overflow-hidden"
                  src={product.images[0]}
                  fill
                  alt="gallery"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>

              <div className="absolute inset-0 transition-all duration-500 group-hover:bg-neutral-950/30"></div>
              <div className="absolute inset-0 flex translate-y-[60%] flex-col items-center justify-center px-9 text-center transition-all duration-500 group-hover:translate-y-0 ">
                <Button
                  onClick={() => handleOpenDetailProducts(product._id)}
                  className="text-white rounded-full "
                >
                  <Eye className="mr-1" />
                  Details
                </Button>
              </div>
            </div>
            <div
              className={`mt-3 ${alice.className} text-center bg-[#D9D9D9] 
              rounded-b-lg py-1 `}
            >
              <h1 className=" text-sm md:text-xl">{product.name}</h1>
              <h1 className=" text-sm md:text-xl">Rp. {product.price}</h1>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col items-center justify-center gap-y-2">
        {totalProducts > data.length && (
          <>
            <Button onClick={handleShowMore}>Show More</Button>
            <ChevronDown />
          </>
        )}
        {totalProducts === data.length && productsParams && (
          <>
            <ChevronUp />
            <p className="text-slate-500"> All products already shown</p>
            <Button onClick={handleShowMore}>Show Less</Button>
          </>
        )}
      </div>
    </div>
  );
}
