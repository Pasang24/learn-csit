"use client";

import { memo, useEffect, useState } from "react";
import Container from "./Container";
import { fetchRecentNotices } from "@/actions/fetchNotices";
import { Skeleton } from "../ui/skeleton";
import Link from "next/link";

function RecentNotices() {
  const [recentNotices, setRecentNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  const MemoizedSkeleton = memo(function MemoizedSkeleton() {
    return (
      <>
        {Array(6)
          .fill(0)
          .map((_, index) => (
            <Skeleton className="w-full h-[78px]" key={index} />
          ))}
      </>
    );
  });

  useEffect(() => {
    const fetchNotices = async () => {
      setLoading(true);
      try {
        const notices = await fetchRecentNotices();
        setRecentNotices(notices);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  }, []);

  return (
    <section className="flex justify-center mt-6">
      <Container>
        <h2 className="font-bold text-2xl vvs:text-3xl mb-12">
          Recent Notices
        </h2>
        <div className="grid gap-3 mb-6">
          {loading && <MemoizedSkeleton />}
          {recentNotices.map((notice, index) => (
            <div className="flex flex-col gap-2 p-3 border rounded" key={index}>
              <span className="text-base font-semibold">{notice?.title}</span>
              <span className="text-sm">{notice?.date}</span>
            </div>
          ))}
        </div>
        <Link
          href={"/notices"}
          className="bg-white text-black px-4 py-2 rounded font-semibold "
        >
          View All Notices
        </Link>
      </Container>
    </section>
  );
}

export default RecentNotices;
