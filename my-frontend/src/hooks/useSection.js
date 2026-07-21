import {
  usePageContent,
} from "../context/PageContentContext";

export default function useSection(
  page,
  section
) {
  const { contents } =
    usePageContent();

  return contents.find(
    (item) =>
      item.page === page &&
      item.section === section
  );
}