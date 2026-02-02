import { Skeleton } from "../style";

export default function StorySkeleton() {
  return (
    <>
      <Skeleton className="title"></Skeleton>
      <Skeleton className="title half"></Skeleton>
      <Skeleton className="thumbnail"></Skeleton>
      <Skeleton className="paragraph"></Skeleton>
      <Skeleton className="paragraph"></Skeleton>
      <Skeleton className="paragraph"></Skeleton>
      <Skeleton className="paragraph"></Skeleton>
      <Skeleton className="paragraph"></Skeleton>
      <Skeleton className="paragraph"></Skeleton>
      <Skeleton className="paragraph"></Skeleton>
      <Skeleton className="paragraph"></Skeleton>
    </>
  );
}
