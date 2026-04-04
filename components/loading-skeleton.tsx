/**
 * Reusable loading skeleton components.
 */

export function PackListSkeleton() {
  return (
    <div className="space-y-3">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="animate-pulse flex items-center justify-between p-4 bg-white border rounded-lg"
        >
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-40" />
            <div className="h-3 bg-gray-100 rounded w-24" />
          </div>
          <div className="h-6 bg-gray-200 rounded-full w-16" />
        </div>
      ))}
    </div>
  );
}

export function PackDetailSkeleton() {
  return (
    <div className="max-w-3xl mx-auto py-8 px-4 animate-pulse">
      <div className="h-4 bg-gray-200 rounded w-32 mb-4" />
      <div className="h-8 bg-gray-200 rounded w-64 mb-6" />

      <div className="bg-gray-50 rounded-lg p-5 mb-6 space-y-3">
        <div className="h-4 bg-gray-200 rounded w-40" />
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex justify-between">
            <div className="h-3 bg-gray-200 rounded w-24" />
            <div className="h-3 bg-gray-200 rounded w-32" />
          </div>
        ))}
      </div>

      <div className="bg-gray-50 rounded-lg p-5 mb-6 space-y-3">
        <div className="h-4 bg-gray-200 rounded w-32" />
        <div className="h-3 bg-gray-200 rounded w-full" />
        <div className="h-3 bg-gray-200 rounded w-3/4" />
      </div>

      <div className="bg-gray-50 rounded-lg p-5 mb-6 space-y-3">
        <div className="h-4 bg-gray-200 rounded w-28" />
        <div className="h-10 bg-gray-200 rounded" />
        <div className="h-10 bg-gray-200 rounded" />
      </div>
    </div>
  );
}

export function GenerationSkeleton() {
  return (
    <div className="text-center py-6 animate-pulse">
      <div className="h-5 bg-gray-200 rounded w-48 mx-auto mb-3" />
      <div className="h-2 bg-gray-200 rounded w-32 mx-auto" />
    </div>
  );
}

export function FormSkeleton() {
  return (
    <div className="max-w-2xl mx-auto py-8 px-4 animate-pulse space-y-4">
      <div className="h-8 bg-gray-200 rounded w-48" />
      <div className="h-4 bg-gray-200 rounded w-64" />
      <div className="space-y-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i}>
            <div className="h-3 bg-gray-200 rounded w-28 mb-2" />
            <div className="h-10 bg-gray-200 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}
