export default function Loading() {
  return (
    <div style={{ background: '#F5F3EE', minHeight: '100vh' }} className="pt-28 lg:pt-36 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-10 lg:gap-16">
          <div className="aspect-[4/5] bg-gray-200 rounded animate-pulse" />
          <div className="space-y-4">
            <div className="h-3 w-24 bg-gray-200 rounded animate-pulse" />
            <div className="h-8 w-3/4 bg-gray-200 rounded animate-pulse" />
            <div className="h-6 w-20 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-full bg-gray-100 rounded animate-pulse" />
            <div className="h-4 w-5/6 bg-gray-100 rounded animate-pulse" />
            <div className="h-12 w-full bg-gray-900 rounded animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  )
}
