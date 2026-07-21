import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  getPageContents,
} from "../services/pageContentService";

const PageContentContext =
  createContext();

export const PageContentProvider = ({
  children,
}) => {
  const [contents, setContents] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const refreshContents =
    async () => {
      try {
        setLoading(true);

        const data =
          await getPageContents();

        setContents(data);

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    refreshContents();
  }, []);

  return (
    <PageContentContext.Provider
      value={{
        contents,
        loading,
        refreshContents,
      }}
    >
      {children}
    </PageContentContext.Provider>
  );
};

export const usePageContent =
  () => useContext(
    PageContentContext
  );