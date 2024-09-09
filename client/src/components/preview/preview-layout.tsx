export default function PreviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`w-[40vw] lg:flex hidden p-6 rounded-xl bg-white  justify-center items-center`}
    >
      <div className="lg:max-h-[calc(100vh-192px)] overflow-y-auto overflow-x-hidden">
        <div className="border-[1px] border-gray-dark rounded-[56px] max-w-[100vw] sm:w-[307px] h-[631px] p-[11px] relative">
          <div className="border-[1px] border-gray-dark rounded-[45px] w-full h-full pt-[53px] flex flex-col items-center gap-14 overflow-y-auto">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
