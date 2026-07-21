const pages = [
  {
    id: "home",
    label: "Home",
  },
  {
    id: "about",
    label: "About",
  },
  {
    id: "contact",
    label: "Contact",
  },
  {
    id: "donate",
    label: "Donate",
  },
];

export default function PageTabs({ activePage, setActivePage }) {
  return (
    <div className="card shadow-sm border-0 mb-4">
      <div className="card-body">

        <div
          className="btn-group flex-wrap"
          role="group"
        >
          {pages.map((page) => (
            <button
              key={page.id}
              type="button"
              onClick={() => setActivePage(page.id)}
              className={`btn ${
                activePage === page.id
                  ? "btn-primary"
                  : "btn-outline-primary"
              }`}
            >
              {page.label}
            </button>
          ))}
        </div>

      </div>
    </div>
  );
}