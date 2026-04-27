export default function Loading() {
  return (
    <div style={{ background: '#F5F3EE', minHeight: '100vh' }} className="pt-12 lg:pt-16 pb-20 lg:pb-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="mb-12 max-w-xl">
          <div className="h-3 w-24 bg-gray-200 rounded mb-3 animate-pulse" />
          <div className="h-10 w-48 bg-gray-200 rounded mb-4 animate-pulse" />
          <div className="h-4 w-64 bg-gray-200 rounded animate-pulse" />
        </div>
        <div className="flex gap-8">
          <aside className="hidden lg:block w-56 flex-shrink-0 space-y-6">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i}>
                <div className="h-3 w-16 bg-gray-200 rounded mb-3 animate-pulse" />
                <div className="h-4 w-full bg-gray-100 rounded mb-2 animate-pulse" />
                <div className="h-4 w-5/6 bg-gray-100 rounded mb-2 animate-pulse" />
                <div className="h-4 w-4/6 bg-gray-100 rounded animate-pulse" />
              </div>
            ))}
          </aside>
          <div className="flex-1 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i}>
                <div className="aspect-[4/5] bg-gray-200 rounded mb-3 animate-pulse" />
                <div className="h-3 w-2/3 bg-gray-200 rounded mb-2 animate-pulse" />
                <div className="h-3 w-1/2 bg-gray-100 rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
