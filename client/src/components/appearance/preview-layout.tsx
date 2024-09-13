import { cn } from "@/lib/utils";

const PreviewLayout = ({
  children,
  className,
  bg,
}: {
  children: React.ReactNode;
  className?: string;
  bg?: string;
}) => {
  return (
    <div
      className={cn(
        "w-[40%] lg:flex hidden p-6 rounded-xl bg-white  justify-center items-center",
        className
      )}
    >
      <div className="lg:max-h-[calc(100vh-200px)] overflow-y-auto overflow-x-hidden w-full flex justify-center items-center">
        <div className="border-[1px] border-gray-dark rounded-[56px] h-[631px] p-[11px] relative w-full max-w-[374px]">
          <div
            className={cn(
              "border border-gray-dark rounded-[45px] w-full h-full overflow-y-auto",
              bg
            )}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
export default PreviewLayout;
