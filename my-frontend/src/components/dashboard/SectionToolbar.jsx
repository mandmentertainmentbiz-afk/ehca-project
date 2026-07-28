export default function SectionToolbar({
  activePage,
  totalSections,
  savingOrder,
  onSaveOrder,
}) {
  return (
    <div className="d-flex justify-content-between align-items-center mb-3">

      <div>
        <h5 className="fw-bold mb-1">
          {activePage.toUpperCase()} Sections
        </h5>

        <small className="text-muted">
          {totalSections} section
          {totalSections !== 1 ? "s" : ""}
        </small>
      </div>

      <button
        className="btn btn-success"
        onClick={onSaveOrder}
        disabled={savingOrder}
      >
        {savingOrder
          ? "Saving..."
          : "💾 Save Section Order"}
      </button>

    </div>
  );
}