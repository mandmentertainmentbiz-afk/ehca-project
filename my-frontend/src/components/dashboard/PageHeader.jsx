export default function PageHeader({
  loading,
  onGenerate,
}) {
  return (
    <div className="d-flex justify-content-between align-items-center mb-4">

      <div>
        <h2 className="fw-bold mb-1">
          Website Content Manager
        </h2>

        <p className="text-muted mb-0">
          Manage your website pages without touching code.
        </p>
      </div>

      <button
        className="btn btn-success"
        onClick={onGenerate}
        disabled={loading}
      >
        {loading
          ? "Generating..."
          : "Generate Website Structure"}
      </button>

    </div>
  );
}