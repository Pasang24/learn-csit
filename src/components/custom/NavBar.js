import Logo from "./Logo";
import Container from "./Container";
import MenuBar from "./MenuBar";

function NavBar() {
  return (
    <nav className="flex justify-center">
      <Container className="flex justify-between items-center">
        <Logo />
        <div className="flex items-center">
          <MenuBar />
        </div>
      </Container>
    </nav>
  );
}

export default NavBar;
