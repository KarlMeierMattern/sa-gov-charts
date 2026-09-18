export default function Footer() {
  return (
    <footer className="mt-16 pt-8 text-center text-xs text-muted-foreground">
      <p>
        Built by{" "}
        <a
          className="underline underline-offset-4 hover:text-foreground transition-colors"
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.linkedin.com/in/karl-alexander-meier-mattern-ca-sa-16a3b919a/"
        >
          Karl-Alexander
        </a>
      </p>
      <p className="mt-2">
        Data from{" "}
        <a
          href="https://www.resbank.co.za/en/home"
          className="underline underline-offset-4 hover:text-foreground transition-colors"
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
