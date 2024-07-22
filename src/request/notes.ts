import {
  MarkdownContent,
  NoteContentItemType,
  NoteNavigationType,
  PageResponse,
} from "@/types/notes";
import request from "./request";
export const queryNoteNavigation = async (
  {
    start = "",
    end = "",
    since_id = "",
    size = 10,
  }: {
    start?: string;
    end?: string;
    since_id?: string | number;
    size?: number;
  },
  signal: AbortSignal
) => {
  const params = new URLSearchParams();
  params.append("start", start);
  params.append("end", end);
  params.append("size", size + "");
  params.append("since_id", since_id + "");

  const url = `/note/navigation/?${params.toString()}`;
  const response: PageResponse<NoteNavigationType> = await request.get(url, {
    signal: signal,
  });

  return response;
};

export const queryNoteInfo = async (id: string | number) => {
  const url = `/note/navigation/${id}/`;
  const response: NoteNavigationType = await request.get(url);

  return response;
};

export const addNote = async () => {
  const url = "/note/navigation/";
  const response: NoteNavigationType = await request.post(url, {
    title: "",
    summary: "",
  });

  return response;
};

export const deleteNote = async (id: string | number | undefined) => {
  const url = `/note/navigation/${id}/`;
  await request.delete(url);
};

export const updateTitle = async (id: string | number, title: string) => {
  const url = `/note/navigation/${id}/`;
  const response = await request.patch(url, {
    title,
  });
  return response;
};

export const queryNoteContents = async (
  {
    id,
    order = "-updated",
    since_id = "",
    size = 10,
  }: {
    id: string | number;
    order?: string;
    since_id?: string | number;
    size?: number;
  },
  signal: AbortSignal
) => {
  const params = new URLSearchParams();
  params.append("note", id + "");
  params.append("order", order);
  params.append("since_id", since_id + "");
  params.append("size", size + "");

  const url = `/note/content/?${params.toString()}`;
  const response: PageResponse<NoteContentItemType> = await request.get(url, {
    signal: signal,
  });

  return response;
};

export const updateNoteContent = async (
  id: string | number,
  content: string,
  summary: string
) => {
  const url = `/note/content/${id}/`;
  const response: NoteContentItemType = await request.patch(url, {
    content,
    summary,
  });
  return response;
};

export const addNoteContent = async (
  id: string | number,
  content: string,
  summary: string
) => {
  const url = `/note/content/`;
  const response: NoteContentItemType = await request.post(url, {
    note: id,
    content,
    summary,
  });
  return response;
};

export const deleteNoteContent = async (id: string | number) => {
  const url = `/note/content/${id}/`;
  await request.delete(url);
};

export const exportToMarkdown = async (id: string | number) => {
  const url = "/note/markdown/";
  const response: MarkdownContent = await request.post(url, {
    id,
  });
  return response.content;
};

export const downloadFile = async (id: string | number) => {
  const content = await exportToMarkdown(id);
  const blob = new Blob([content], { type: "text/markdown" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.download = "content.md";
  link.href = url;
  link.click();
};
