export default function Footer() {
  return (
    <footer className="mt-16 border-t py-6 text-center text-xs text-muted-foreground">
      <p>
        Data from{" "}
        <a
          href="https://www.resbank.co.za/en/home"
          className="hover:text-foreground hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          SARB
        </a>
        , updated weekly · Built by{" "}
        <a
          href="https://www.linkedin.com/in/karl-alexander-meier-mattern-ca-sa-16a3b919a/"
          className="hover:text-foreground hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Karl-Alexander
        </a>
      </p>
    </footer>
  );
}
