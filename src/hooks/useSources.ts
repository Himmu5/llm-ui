"use client";

import { useState, useCallback, useMemo } from "react";
import { Source } from "@/types";
import { generateId, getFileType } from "@/utils";

interface UseSourcesReturn {
  sources: Source[];
  selectedSourceIds: string[];
  selectedFileNames: string[];
  addSource: (fileName: string) => void;
  removeSource: (id: string) => void;
  toggleSource: (id: string) => void;
  selectAll: () => void;
  getSourceById: (id: string) => Source | undefined;
}

export function useSources(): UseSourcesReturn {
  const [sources, setSources] = useState<Source[]>([]);
  const [selectedSourceIds, setSelectedSourceIds] = useState<string[]>([]);

  const addSource = useCallback((fileName: string) => {
    const newSource: Source = {
      id: generateId(),
      name: fileName,
      type: getFileType(fileName),
    };
    setSources((prev) => [...prev, newSource]);
    setSelectedSourceIds((prev) => [...prev, newSource.id]);
  }, []);

  const removeSource = useCallback((id: string) => {
    setSources((prev) => prev.filter((s) => s.id !== id));
    setSelectedSourceIds((prev) => prev.filter((sid) => sid !== id));
  }, []);

  const toggleSource = useCallback((id: string) => {
    setSelectedSourceIds((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  }, []);

  const selectAll = useCallback(() => {
    setSelectedSourceIds((prev) =>
      prev.length === sources.length ? [] : sources.map((s) => s.id)
    );
  }, [sources]);

  const getSourceById = useCallback(
    (id: string) => sources.find((s) => s.id === id),
    [sources]
  );

  const selectedFileNames = useMemo(
    () =>
      sources
        .filter((s) => selectedSourceIds.includes(s.id))
        .map((s) => s.name),
    [sources, selectedSourceIds]
  );

  return {
    sources,
    selectedSourceIds,
    selectedFileNames,
    addSource,
    removeSource,
    toggleSource,
    selectAll,
    getSourceById,
  };
}

