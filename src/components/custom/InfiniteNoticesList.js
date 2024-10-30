"use client";

import { fetchNextPage } from "@/actions/fetchNotice";
import { useEffect, useRef, useState } from "react";

function InfiniteNoticesList({
  initialNotices,
  initialLastSequenceNum,
  perPage,
}) {
  const [notices, setNotices] = useState(initialNotices);
  const [lastSequenceNum, setLastSequenceNum] = useState(
    initialLastSequenceNum
  );
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const observerTarget = useRef(null);

  const loadNextPage = async () => {
    if (!lastSequenceNum || !hasMore || loading) return;

    setLoading(true);
    try {
      const { notices, newLastSequenceNum } = await fetchNextPage(
        perPage,
        lastSequenceNum
      );
      setNotices((prevNotices) => [...prevNotices, ...notices]);
      setLastSequenceNum(newLastSequenceNum);
      setHasMore(notices.length === perPage);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadNextPage();
        }
      },
      {
        threshold: 1.0,
      }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [hasMore, loading, lastSequenceNum]);

  useEffect(() => {
    console.log(lastSequenceNum);
  }, [lastSequenceNum]);
  return (
    <>
      <div className="grid gap-3 mb-6">
        {notices.map((notice, index) => (
          <div className="flex flex-col gap-2 p-3 border rounded" key={index}>
            <span className="text-base font-semibold">{notice?.title}</span>
            <span className="text-sm">{notice?.date}</span>
          </div>
        ))}
      </div>
      {loading && "Loading..."}
      <div ref={observerTarget} className="h-5" />
    </>
  );
}

export default InfiniteNoticesList;
