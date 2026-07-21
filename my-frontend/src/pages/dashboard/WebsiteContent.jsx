import { useEffect, useState } from "react";
import PageTabs from "../../components/dashboard/PageTabs";
import SectionCard from "../../components/dashboard/SectionCard";
import { pageDefaults } from "../../config/pageDefaults";
import {
  getPageContent,
  createPageContent,
} from "../../services/pageContentService";
import {
  getPageContent,
  createPageContent,
  updateSectionOrder,
} from "../../services/pageContentService";

import {
  DragDropContext,
  Droppable,
  Draggable,
} from "@hello-pangea/dnd";

export default function WebsiteContent() {
  const [activePage, setActivePage] = useState("home");
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* ================= LOAD PAGE ================= */

  const loadPage = async (page) => {
    try {
      setLoading(true);
      setError("");

      const data = await getPageContent(page);

      if (Array.isArray(data)) {
        setSections(data);
      } else {
        setSections([]);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to load page content.");
      setSections([]);
    } finally {
      setLoading(false);
    }
  };

  /* ================= CREATE DEFAULT SECTIONS ================= */

  const createDefaultSections = async () => {
  try {
    const pageSections =
      pageDefaults[activePage] || [];

    if (pageSections.length === 0) {
      alert("No default sections found for this page.");
      return;
    }

    for (const sectionName of pageSections) {
      try {
        await createPageContent({
          page: activePage,
          section: sectionName,
          title: sectionName
            .replace(/-/g, " ")
            .replace(/\b\w/g, (c) => c.toUpperCase()),
          subtitle: "",
          content: "",
          image: "",
          buttonText: "",
          buttonLink: "",
          items: [],
        });
      } catch (err) {
        // Skip sections that already exist
        console.log(
          `${activePage}/${sectionName} already exists`
        );
      }
    }

    alert("Sections created successfully.");

    loadPage(activePage);

  } catch (err) {
    console.error(err);
    alert("Failed to create sections.");
  }
};


/* ================= handleDragEnd ===== */
const handleDragEnd = async (result) => {
  if (!result.destination) return;

  const reordered = [...sections];

  const [removed] = reordered.splice(
    result.source.index,
    1
  );

  reordered.splice(
    result.destination.index,
    0,
    removed
  );

  setSections(reordered);

  try {
    await updateSectionOrder(
      reordered.map((section, index) => ({
        id: section._id,
        order: index,
      }))
    );
  } catch (err) {
    console.error(err);

    alert("Failed to save order.");
  }
};

  /* ================= GENERATE WEBSITE STRUCTURE ================= */

const generateWebsiteStructure = async () => {
  const confirmed = window.confirm(
    "Generate all default sections for the entire website?\n\nExisting sections will be skipped."
  );

  if (!confirmed) return;
  try {
    setLoading(true);

    for (const page in pageDefaults) {
      const sections = pageDefaults[page];

      for (const sectionName of sections) {
        try {
          await createPageContent({
            page,
            section: sectionName,
            title: sectionName
              .replace(/-/g, " ")
              .replace(/\b\w/g, (c) =>
                c.toUpperCase()
              ),
            subtitle: "",
            content: "",
            image: "",
            buttonText: "",
            buttonLink: "",
            items: [],
          });
        } catch (err) {
          // Ignore duplicates if section already exists
          console.log(
            `${page}/${sectionName} already exists`
          );
        }
      }
    }

    alert(
      "Website structure generated successfully."
    );

    loadPage(activePage);

  } catch (err) {
    console.error(err);
    alert("Failed to generate website.");
  } finally {
    setLoading(false);
  }
};


  /* ================= LOAD WHEN PAGE CHANGES ================= */

  useEffect(() => {
    loadPage(activePage);
  }, [activePage]);

  return (
    <div className="container-fluid py-4">

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
  onClick={generateWebsiteStructure}
  disabled={loading}
>
  {loading
    ? "Generating..."
    : "Generate Website Structure"}
</button>

</div>

      <PageTabs
        activePage={activePage}
        setActivePage={setActivePage}
      />

     <div className="mt-4">

  {loading && (
    <div className="text-center py-5">
      <div
        className="spinner-border text-primary"
        role="status"
      ></div>

      <p className="mt-3">
        Loading content...
      </p>
    </div>
  )}

  {error && (
    <div className="alert alert-danger">
      {error}
    </div>
  )}

  {!loading &&
    !error &&
    sections.length === 0 && (
      <div className="alert alert-warning">

        <p className="mb-3">
          No content found for this page.
        </p>

        <button
          className="btn btn-primary"
          onClick={createDefaultSections}
        >
          Create Sections
        </button>

      </div>
    )}

  {!loading &&
    sections.length > 0 && (
      <>

        {/* ===== Reorder Button ===== */}

        <div className="d-flex justify-content-end mb-3">
          <button
            className="btn btn-outline-primary"
            onClick={saveSectionOrder}
          >
            💾 Save Section Order
          </button>
        </div>

        {/* ===== Section Cards ===== */}

        {sections.map((section, index) => (
          <SectionCard
            key={section._id}
            section={section}
            index={index}
            total={sections.length}

            onMoveUp={() =>
              moveSection(index, "up")
            }

            onMoveDown={() =>
              moveSection(index, "down")
            }

            onUpdated={() =>
              loadPage(activePage)
            }
          />
        ))}

      </>
    )}

</div>

    </div>
  );
}