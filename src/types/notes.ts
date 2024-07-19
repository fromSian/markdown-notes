export type NoteNavigationType = {
  id: string | number;
  title: string;
  created: string;
  updated: string;
  summary: string;
  count: number;
};

export type NoteContentItemType = {
  id: string | number;
  content: string;
  created: string;
  updated: string;
  summary: string;
};

export interface PageResponse<T> {
  count: number;
  hasNext: boolean;
  results: T[];
}

export type MarkdownContent = {
  content: string;
};

export type SortInfo = "updated" | "-updated" | "created" | "-created" | "";
