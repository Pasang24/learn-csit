"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

function SubjectNavBar() {
  const params = useParams();
  const pathname = usePathname();

  const navData = [
    {
      name: "Notes",
      href: `/semester/${params.sem}/${params.subject}`,
    },
    {
      name: "Old Questions",
      href: `/semester/${params.sem}/${params.subject}/oldquestions`,
    },
  ];

  const isActive = (href) => href === pathname;

  return (
    //alll of these css have been copied from tabs component of shadcn
    <div className="self-center inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground">
      {navData.map(({ name, href }, index) => (
        <>
          <Link
            href={href}
            className={`inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 d ${
              isActive(href) ? "bg-background text-foreground shadow" : ""
            }`}
            key={index}
          >
            <span>{name}</span>
          </Link>
        </>
      ))}
    </div>
  );
}

export default SubjectNavBar;
