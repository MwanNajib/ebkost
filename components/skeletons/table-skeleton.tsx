const TableSkeleton = ({ rows = 5 }: { rows?: number }) => {
  return (
    <div className="bg-white p-8 rounded-xl shadow-xs border border-gray-100 animate-pulse">
      <div className="flex items-center justify-between mb-8">
        <div className="h-10 bg-gray-200 rounded w-1/4" />
        <div className="h-10 bg-gray-200 rounded w-32" />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-y border-gray-100 uppercase text-xs font-bold text-gray-500 tracking-wider">
              <th className="py-4 px-4 whitespace-nowrap"><div className="h-4 bg-gray-100 rounded w-16" /></th>
              <th className="py-4 px-4 whitespace-nowrap"><div className="h-4 bg-gray-100 rounded w-32" /></th>
              <th className="py-4 px-4 whitespace-nowrap"><div className="h-4 bg-gray-100 rounded w-20" /></th>
              <th className="py-4 px-4 whitespace-nowrap"><div className="h-4 bg-gray-100 rounded w-24" /></th>
              <th className="py-4 px-4 whitespace-nowrap text-center"><div className="h-4 bg-gray-100 rounded w-20 mx-auto" /></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {[...Array(rows)].map((_, i) => (
              <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                <td className="py-4 px-4">
                  <div className="size-16 bg-gray-100 rounded-lg" />
                </td>
                <td className="py-4 px-4">
                  <div className="h-5 bg-gray-100 rounded w-48 mb-2" />
                  <div className="h-3 bg-gray-50 rounded w-20" />
                </td>
                <td className="py-4 px-4">
                  <div className="h-5 bg-gray-100 rounded w-24" />
                </td>
                <td className="py-4 px-4 text-gray-500 text-sm">
                  <div className="h-5 bg-gray-100 rounded w-32" />
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center justify-center gap-4 text-gray-200">
                    <div className="size-5 bg-gray-100 rounded" />
                    <div className="size-5 bg-gray-100 rounded" />
                    <div className="size-5 bg-gray-100 rounded" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableSkeleton;
