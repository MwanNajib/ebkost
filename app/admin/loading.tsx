export default function Loading() {
  return (
    <div className="p-4 sm:p-8 animate-pulse text-gray-200">
      <div className="mb-10">
        <div className="h-10 bg-gray-200 rounded w-48 mb-2" />
        <div className="h-4 bg-gray-100 rounded w-full max-w-sm" />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm h-32 flex flex-col justify-center">
            <div className="size-10 bg-gray-100 rounded mb-4" />
            <div className="h-4 bg-gray-100 rounded w-1/2 mb-2" />
            <div className="h-6 bg-gray-200 rounded w-1/4" />
          </div>
        ))}
      </div>

      <div className="bg-white p-10 rounded-3xl border border-gray-100 shadow-sm h-[400px] mb-8" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm h-96" />
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm h-96" />
      </div>
    </div>
  );
}
