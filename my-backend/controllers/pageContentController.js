import PageContent from "../models/PageContent.js";

/* ==========================================
   GET ALL PAGE CONTENT
========================================== */

export const getPageContents = async (req, res) => {
  try {
    const contents = await PageContent.find()
      .sort({
        page: 1,
        order: 1,
      });

    res.status(200).json(contents);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to fetch page contents.",
    });
  }
};

/* ==========================================
   GET CONTENT BY PAGE
========================================== */

export const getPageContent = async (req, res) => {
  try {
    const contents = await PageContent.find({
      page: req.params.page,
      isActive: true,
    }).sort({
      order: 1,
    });

    res.status(200).json(contents);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to fetch page content.",
    });
  }
};

/* ==========================================
   CREATE CONTENT
========================================== */

export const createPageContent = async (req, res) => {
  try {
    const exists = await PageContent.findOne({
      page: req.body.page,
      section: req.body.section,
    });

    if (exists) {
      return res.status(400).json({
        message: "Section already exists.",
      });
    }

    const content = await PageContent.create(req.body);

    res.status(201).json({
      message: "Content created successfully.",
      content,
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to create content.",
    });
  }
};

/* ==========================================
   UPDATE CONTENT
========================================== */

export const updatePageContent = async (req, res) => {
  try {
    const updated = await PageContent.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updated) {
      return res.status(404).json({
        message: "Content not found.",
      });
    }

    res.status(200).json({
      message: "Content updated successfully.",
      content: updated,
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to update content.",
    });
  }
};

/* ==========================================
   DELETE CONTENT
========================================== */

export const deletePageContent = async (req, res) => {
  try {
    const deleted = await PageContent.findByIdAndDelete(
      req.params.id
    );

    if (!deleted) {
      return res.status(404).json({
        message: "Content not found.",
      });
    }

    res.status(200).json({
      message: "Content deleted successfully.",
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to delete content.",
    });
  }
};

/* ==========================================
   UPDATE SECTION ORDER
========================================== */

export const updateSectionOrder = async (req, res) => {
  try {
    const { sections } = req.body;

    if (!Array.isArray(sections)) {
      return res.status(400).json({
        message: "Sections array is required.",
      });
    }

    for (const item of sections) {
      await PageContent.findByIdAndUpdate(
        item.id,
        {
          order: item.order,
        }
      );
    }

    res.status(200).json({
      message: "Section order updated successfully.",
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to update section order.",
    });
  }
};