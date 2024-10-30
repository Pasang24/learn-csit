import Container from "@/components/custom/Container";
import InfiniteNoticesList from "@/components/custom/InfiniteNoticesList";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { unstable_cache } from "next/cache";

async function page() {
  const perPage = 10;
  const fetchInitialNotices = unstable_cache(
    async () => {
      const noticesSnapshot = await getDocs(
        query(
          collection(db, "notices"),
          orderBy("timestamp", "desc"),
          limit(perPage)
        )
      );
      let recentNotices = [];
      noticesSnapshot.forEach((notice) => {
        const { title, date, link } = notice.data();
        recentNotices.push({ title, date, link });
      });

      let lastSequenceNum =
        noticesSnapshot.docs[noticesSnapshot.docs.length - 1].get(
          "sequenceNumber"
        );

      return { recentNotices, lastSequenceNum };
    },
    ["initial-notices"],
    { tags: ["initial-notices"] }
  );

  const { recentNotices, lastSequenceNum } = await fetchInitialNotices();
  // console.log(lastVisible);

  return (
    <div className="flex justify-center">
      <Container>
        <InfiniteNoticesList
          initialNotices={recentNotices}
          initialLastSequenceNum={lastSequenceNum}
          perPage={perPage}
        />
      </Container>
    </div>
  );
}

export default page;
