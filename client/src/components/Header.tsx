import { ModeToggle } from "./ModeToggle";

export default function Header() {
  return (
    <header className="bg-background border-b border-border p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-foreground">
        South African Government Data Visualisation
      </h1>
      <ModeToggle />
    </header>
  );
}
