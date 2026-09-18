export default function Footer() {
  return (
    <footer className="border-t border-border bg-muted/50 px-4 py-6 text-center text-xs text-muted-foreground">
      <p>
        Built by{" "}
        <a
          className="underline text-primary"
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.linkedin.com/in/karl-alexander-meier-mattern-ca-sa-16a3b919a/"
        >
          Karl-Alexander
        </a>{" "}
        with care
      </p>
      <p className="pt-2 italic">
        Data provided by{" "}
        <a
          href="https://www.resbank.co.za/en/home"
          className="underline text-primary"
          target="_blank"
          rel="noopener noreferrer"
        >
          SARB
        </a>
        , updated weekly
      </p>
    </footer>
  );
}
