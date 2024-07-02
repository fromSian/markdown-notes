import { Skeleton } from "@/components/ui/skeleton";
const ContentLoader = () => {
  return (
    <div className="mb-6">
      <Skeleton className="w-full h-24 mb-2" />
      <Skeleton className="w-full h-8 mb-2" />
      <Skeleton className="w-full h-8 mb-2" />
      <div className="divider w-full border my-2"></div>
      <Skeleton className="w-[40%] h-8" />
    </div>
  );
};

export default ContentLoader;
