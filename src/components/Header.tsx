import { ThemeToggler } from "@/components/ui/ThemeToggler";

function Header() {
  return (
    <header className="flex justify-between">
      <div>Logo</div>
      <ThemeToggler />
    </header>
  );
}

export default Header;
