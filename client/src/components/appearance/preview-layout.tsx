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
      // className={`lg:flex p-6 rounded-xl bg-white justify-center items-center sm:h-[calc(100vh-152px)] h-[calc(100vh-96.37px)] `}
    >
      <div className="lg:max-h-[calc(100vh-200px)] overflow-y-auto overflow-x-hidden">
        <div className="border-[1px] border-gray-dark rounded-[56px] max-w-[100vw] sm:w-[307px] h-[631px] p-[11px] relative">
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
