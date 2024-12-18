import Container from "./Container";
import Link from "next/link";
import { unstable_cache } from "next/cache";
import { db } from "@/app/firebaseConfig";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";

async function RecentNotices() {
  const getRecentNotices = unstable_cache(
    async () => {
      const noticesSnapshot = await getDocs(
        query(
          collection(db, "notices"),
          orderBy("timestamp", "desc"),
          limit(12)
        )
      );
      let recentNotices = [];
      noticesSnapshot.forEach((notice) => {
        const { title, date, link } = notice.data();
        recentNotices.push({ title, date, link });
      });
      return recentNotices;
    },
    ["notices"],
    { tags: ["notices"] }
  );

  const recentNotices = await getRecentNotices();
  return (
    <section className="flex justify-center mt-6">
      <Container>
        <h2
          className="font-bold text-2xl vvs:text-3xl mb-4"
          id="recent-notices-heading"
        >
          Recent Notices
        </h2>
        <div className="grid mb-6" id="receent-notices-container">
          {recentNotices.map((notice, index) => (
            <a
              href={notice?.link}
              target="_blank"
              className="flex flex-col gap-2 p-4 border-b rounded hover:bg-accent"
              style={{ transition: "0.1s all ease" }}
              key={index}
            >
              <span className="text-base font-semibold">{notice?.title}</span>
              <span className="text-sm">{notice?.date}</span>
            </a>
          ))}
        </div>
        <Link
          href={"/notices"}
          className="bg-white text-black px-4 py-2 rounded font-semibold"
          id="all-noticces-btn"
        >
          View All Notices
        </Link>
      </Container>
    </section>
  );
}

export default RecentNotices;
