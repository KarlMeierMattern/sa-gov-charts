export default function Footer() {
  return (
    <footer>
      <div className="fixed bottom-0 left-0 text-xs w-full bg-slate-700 text-white p-4 text-center opacity-90">
        <p>
          Built by{" "}
          <a
            className="underline text-blue-500"
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.linkedin.com/in/karl-alexander-meier-mattern-ca-sa-16a3b919a/"
          >
            Karl-Alexander
          </a>{" "}
          with 💜
        </p>
        <p className="text-gray-500 italic pt-2">
          Data provided by{" "}
          <a
            href="https://www.resbank.co.za/en/home"
            className=" underline text-blue-500"
            target="_blank"
            rel="noopener noreferrer"
          >
            SARB
          </a>
          , updated weekly
        </p>
      </div>
    </footer>
  );
}
