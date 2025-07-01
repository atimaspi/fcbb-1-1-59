
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

export const LoadingCard = () => (
  <Card>
    <CardHeader>
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-3 w-1/2" />
    </CardHeader>
    <CardContent>
      <div className="space-y-2">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-2/3" />
      </div>
    </CardContent>
  </Card>
);

export const LoadingTable = ({ rows = 5 }: { rows?: number }) => (
  <div className="space-y-3">
    {Array.from({ length: rows }, (_, i) => (
      <div key={i} className="flex space-x-4">
        <Skeleton className="h-12 w-12 rounded" />
        <div className="space-y-2 flex-1">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      </div>
    ))}
  </div>
);

export const LoadingGrid = ({ items = 6 }: { items?: number }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {Array.from({ length: items }, (_, i) => (
      <LoadingCard key={i} />
    ))}
  </div>
);
