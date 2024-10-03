import Link from "next/link";
import Container from "./Container";
import MenuBar from "./MenuBar";

import dynamic from "next/dynamic";

function NavBar() {
  return (
    <nav className="flex justify-center">
      <Container className="flex justify-between items-center">
        <Link href={"/"} className="font-bold text-2xl">
          CSIT Info
        </Link>
        <div className="flex items-center">
          <MenuBar />
        </div>
      </Container>
    </nav>
  );
}

// don't know what this does but it fixed that thing called hydration error which I had never heard before
export default dynamic(() => Promise.resolve(NavBar), { ssr: false });
