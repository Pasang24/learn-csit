"use client";

import Logo from "./Logo";
import Container from "./Container";
import Link from "next/link";
import semData from "@/data/semData";
import { usePathname } from "next/navigation";

function Footer() {
  const pathname = usePathname();

  // Check if the pathname has a unit number
  let unit = Number(pathname.split("/")[4]);

  // If the unit is not a number, render the footer
  return isNaN(unit) ? (
    <footer className="flex justify-center border-t border-accent mt-6">
      <Container className="flex flex-col gap-6">
        <div className="flex flex-wrap gap-10 w-full">
          <div className="flex flex-col gap-3 w-full sm:w-1/2">
            <Logo />
            <p>
              CSIT Info is a website that provides a complete set of reference
              materials like notes, syllabus, question banks, solutions, and
              many more for CSIT students.
            </p>
          </div>
          <div className="w-36">
            <h3 className="font-semibold mb-3">Semester</h3>
            <div className="flex flex-col gap-1">
              {semData.map(({ name, href }, index) => (
                <Link
                  href={href}
                  className="text-sm hover:text-slate-400"
                  key={index}
                >
                  {name}
                </Link>
              ))}
            </div>
          </div>
          <div className="w-36">
            <h3 className="font-semibold mb-3">Quick Links</h3>
            <div className="flex flex-col gap-1">
              <Link href={"/entrance"} className="text-sm hover:text-slate-400">
                Entrance
              </Link>
              <Link href={"/notices"} className="text-sm hover:text-slate-400">
                Notices
              </Link>
              <Link
                href={"/coursedetails"}
                className="text-sm hover:text-slate-400"
              >
                Course Details
              </Link>
            </div>
          </div>
        </div>
        <hr />
        <span className="self-center text-center">
          © 2024-2026 . CSIT Info . All Rights Reserved
        </span>
      </Container>
    </footer>
  ) : null;
}

export default Footer;
