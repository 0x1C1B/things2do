export default function Footer() {
  return (
    <div className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white text-sm text-center p-4">
      &copy; {new Date().getFullYear()}
      &nbsp;
      <a
        className="text-emerald-500 hover:text-emerald-400"
        target="_blank"
        rel="noreferrer"
        href="https://github.com/0x1C1B"
      >
        Constantin Müller
      </a>
      ,&nbsp;
      <a
        className="text-emerald-500 hover:text-emerald-400"
        target="_blank"
        rel="noreferrer"
        href="https://github.com/mchris579"
      >
        Christian Müller
      </a>
      ,&nbsp;
      <a
        className="text-emerald-500 hover:text-emerald-400"
        target="_blank"
        rel="noreferrer"
        href="https://github.com/imahleer"
      >
        Kemal Celik
      </a>
    </div>
  );
}
