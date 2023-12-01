import { alice, allison } from "../ui/fonts";

export function HeadingSection({
  title,
  textColor,
}: {
  title: string;
  textColor?: string;
}) {
  return (
    <div className="max-w-[1440px]  mt-[40px] mb-[20px] md:mb-[40px]">
      <h1
        className={`${allison.className}  text-red-500  text-[30px] md:text-[40px] ml-6`}
      >
        Barbersquad
      </h1>

      <h1
        className={`${alice.className}  ${textColor} text-[32px]  md:text-[48px] md:-mt-7 -mt-6`}
      >
        {title}
      </h1>
    </div>
  );
}
