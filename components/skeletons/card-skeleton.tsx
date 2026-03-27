const CardSkeleton = () => {
  return (
    <div className="bg-white shadow-lg rounded-sm flex flex-col animate-pulse">
      <div className="h-[240px] w-full bg-gray-200 rounded-t-sm" />
      <div className="p-6 md:p-8 flex flex-col flex-1 space-y-4">
        <div className="h-8 bg-gray-200 rounded w-3/4 mb-1" />
        
        <div className="flex gap-2">
          <div className="h-6 bg-gray-100 rounded-full w-20" />
          <div className="h-6 bg-gray-100 rounded-full w-24" />
          <div className="h-6 bg-gray-100 rounded-full w-16" />
        </div>

        <div className="space-y-2">
          <div className="h-4 bg-gray-100 rounded w-full" />
          <div className="h-4 bg-gray-100 rounded w-5/6" />
          <div className="h-4 bg-gray-100 rounded w-4/6" />
        </div>

        <div className="h-8 bg-gray-200 rounded w-1/2 mt-auto" />

        <div className="flex items-center justify-between border-t border-gray-100 pt-5 mt-auto">
          <div className="h-6 bg-gray-100 rounded w-1/3" />
          <div className="h-10 bg-gray-200 rounded-lg w-1/3" />
        </div>
      </div>
    </div>
  );
};

export default CardSkeleton;

export const CardGridSkeleton = () => {
    return (
        <div className="max-w-7xl py-6 pb-20 px-4 mx-auto">
            <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
                {[...Array(3)].map((_, i) => (
                    <CardSkeleton key={i} />
                ))}
            </div>
        </div>
    )
}
