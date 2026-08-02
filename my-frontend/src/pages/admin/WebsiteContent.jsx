import { useEffect, useState } from "react";

import PageHeader from "../../components/dashboard/PageHeader";
import PageTabs from "../../components/dashboard/PageTabs";
import SectionToolbar from "../../components/dashboard/SectionToolbar";
import SectionList from "../../components/dashboard/SectionList";
import LoadingState from "../../components/dashboard/LoadingState";
import EmptyPageState from "../../components/dashboard/EmptyPageState";

import { pageDefaults } from "../../config/pageDefaults";

import {
  getPageContent,
  createPageContent,
  updateSectionOrder,
} from "../../services/pageContentService";

export default function WebsiteContent() {
  const [activePage, setActivePage] =
    useState("home");

  const [sections, setSections] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [savingOrder, setSavingOrder] =
    useState(false);

  const [error, setError] =
    useState("");

    const [editingSection, setEditingSection] = useState(null);

const editSection = (section) => {
  setEditingSection(section);
};

  /* ===========================
     LOAD PAGE CONTENT
  =========================== */

  const loadPage = async (page) => {
    try {
      setLoading(true);
      setError("");

      const data =
        await getPageContent(page);

      if (Array.isArray(data)) {
        const sorted = [...data].sort(
          (a, b) => a.order - b.order
        );

        setSections(sorted);
      } else {
        setSections([]);
      }
    } catch (err) {
      console.error(err);

      setError(
        "Failed to load page content."
      );

      setSections([]);
    } finally {
      setLoading(false);
    }
  };

  /* ===========================
     MOVE SECTION LOCALLY
  =========================== */

  const moveSection = (
    index,
    direction
  ) => {
    const updated = [...sections];

    if (
      direction === "up" &&
      index > 0
    ) {
      [
        updated[index - 1],
        updated[index],
      ] = [
        updated[index],
        updated[index - 1],
      ];
    }

    if (
      direction === "down" &&
      index < updated.length - 1
    ) {
      [
        updated[index],
        updated[index + 1],
      ] = [
        updated[index + 1],
        updated[index],
      ];
    }

    setSections(updated);
  };

  /* ===========================
     SAVE ORDER TO DATABASE
  =========================== */

  const saveSectionOrder =
    async () => {
      try {
        setSavingOrder(true);

        await updateSectionOrder(
          sections.map(
            (section, index) => ({
              id: section._id,
              order: index,
            })
          )
        );

        await loadPage(activePage);

        alert(
          "Section order saved successfully."
        );
      } catch (err) {
        console.error(err);

        alert(
          "Failed to save section order."
        );
      } finally {
        setSavingOrder(false);
      }
    };

    /* ===========================
     CREATE DEFAULT SECTIONS
  =========================== */

  const createDefaultSections =
    async () => {
      try {
        const pageSections =
          pageDefaults[activePage] || [];

        if (
          pageSections.length === 0
        ) {
          alert(
            "No default sections found for this page."
          );
          return;
        }

        for (const sectionName of pageSections) {
          try {
            await createPageContent({
              page: activePage,
              section: sectionName,
              title: sectionName
                .replace(/-/g, " ")
                .replace(
                  /\b\w/g,
                  (c) => c.toUpperCase()
                ),
              subtitle: "",
              content: "",
              image: "",
              buttonText: "",
              buttonLink: "",
              items: [],
            });
          } catch (err) {
            console.info(
              `${activePage}/${sectionName} already exists`
            );
          }
        }

        alert(
          "Sections created successfully."
        );

        await loadPage(activePage);
      } catch (err) {
        console.error(err);

        alert(
          "Failed to create sections."
        );
      }
    };

  /* ===========================
     HANDLE DRAG & DROP
  =========================== */

  const handleDragEnd = (
    result
  ) => {
    if (!result.destination)
      return;

    const updated = [...sections];

    const [removed] =
      updated.splice(
        result.source.index,
        1
      );

    updated.splice(
      result.destination.index,
      0,
      removed
    );

    setSections(updated);
  };

  /* ===========================
     GENERATE WEBSITE STRUCTURE
  =========================== */

  const generateWebsiteStructure =
    async () => {
      const confirmed =
        window.confirm(
          "Generate all default sections for the entire website?\n\nExisting sections will be skipped."
        );

      if (!confirmed) return;

      try {
        setLoading(true);

        for (const page in pageDefaults) {
          const defaultSections =
            pageDefaults[page];

          for (const sectionName of defaultSections) {
            try {
              await createPageContent({
                page,
                section: sectionName,
                title: sectionName
                  .replace(/-/g, " ")
                  .replace(
                    /\b\w/g,
                    (c) =>
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
              console.info(
                `${page}/${sectionName} already exists`
              );
            }
          }
        }

        alert(
          "Website structure generated successfully."
        );

        await loadPage(activePage);
      } catch (err) {
        console.error(err);

        alert(
          "Failed to generate website."
        );
      } finally {
        setLoading(false);
      }
    };

  /* ===========================
     LOAD WHEN PAGE CHANGES
  =========================== */

  useEffect(() => {
    loadPage(activePage);
  }, [activePage]);

  return (
    <div className="container-fluid py-4">

      {/* ===========================
          PAGE HEADER
      =========================== */}

      <PageHeader
        loading={loading}
        onGenerate={generateWebsiteStructure}
      />

      {/* ===========================
          PAGE TABS
      =========================== */}

      <PageTabs
        activePage={activePage}
        setActivePage={setActivePage}
      />

      <div className="mt-4">

        {/* ===========================
            LOADING STATE
        =========================== */}

        {loading && (
          <LoadingState />
        )}

        {/* ===========================
            ERROR STATE
        =========================== */}

        {!loading && error && (
          <div className="alert alert-danger">
            {error}
          </div>
        )}

        {/* ===========================
            EMPTY PAGE STATE
        =========================== */}

        {!loading &&
          !error &&
          sections.length === 0 && (
            <EmptyPageState
              page={activePage}
              onCreateSections={
                createDefaultSections
              }
            />
          )}

        {/* ===========================
            PAGE CONTENT
        =========================== */}

        {!loading &&
          !error &&
          sections.length > 0 && (
            <>
              <SectionToolbar
                activePage={activePage}
                totalSections={
                  sections.length
                }
                savingOrder={savingOrder}
                onSaveOrder={
                  saveSectionOrder
                }
              />

              <SectionList
  sections={sections}
  activePage={activePage}
  onDragEnd={handleDragEnd}
  onMoveUp={(index) =>
    moveSection(index, "up")
  }
  onMoveDown={(index) =>
    moveSection(index, "down")
  }
  onEdit={editSection}
  onUpdated={() =>
    loadPage(activePage)
  }
  onDeleted={() =>
    loadPage(activePage)
  }
/>


{editingSection && (
  <div className="card shadow mt-4 p-4">

    <h4 className="mb-3">
      Edit Section
    </h4>

    <input
      className="form-control mb-3"
      placeholder="Title"
      value={editingSection.title || ""}
      onChange={(e) =>
        setEditingSection({
          ...editingSection,
          title: e.target.value,
        })
      }
    />

    <textarea
      className="form-control mb-3"
      rows="6"
      placeholder="Content"
      value={editingSection.content || ""}
      onChange={(e) =>
        setEditingSection({
          ...editingSection,
          content: e.target.value,
        })
      }
    />

    <div className="d-flex gap-2">

      <button
        className="btn btn-success"
      >
        Save Changes
      </button>

      <button
        className="btn btn-secondary"
        onClick={() =>
          setEditingSection(null)
        }
      >
        Cancel
      </button>

    </div>

  </div>
)}
            </>
          )}

      </div>
      </div>
  );
}