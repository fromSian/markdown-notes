export type NoteNavigationType = {
  id: string | number;
  title: string;
  created: string;
  updated: string;
  summary: string;
};

export type NoteContentType = {
  id: string | number;
  content: string;
  created: string;
  updated: string;
  type: "new" | "exist";
};

export enum NoteChaptersStatusType {
  "nochanges",
  "new",
  "saved",
  "saving",
  "saveFailed",
}

export type NoteChaptersType = {
  id: string | number;
  summary: string;
  status: keyof typeof NoteChaptersStatusType;
};
