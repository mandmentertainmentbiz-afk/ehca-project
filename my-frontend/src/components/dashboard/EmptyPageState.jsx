export default function EmptyPageState({
  page,
  onCreateSections,
}) {
  return (
    <div className="alert alert-warning text-center py-4">

      <h5 className="fw-bold mb-2">
        No content found
      </h5>

      <p className="text-muted mb-4">
        The <strong>{page}</strong> page does not
        have any sections yet.
      </p>

      <button
        className="btn btn-primary"
        onClick={onCreateSections}
      >
        Create Default Sections
      </button>

    </div>
  );
}