import request from "./request";
export const queryNoteNavigation = async (
  { start = "", end = "", page = 1, size = 10 },
  signal: AbortSignal
) => {
  const params = new URLSearchParams();
  params.append("start", start);
  params.append("end", end);
  params.append("page", page + "");
  params.append("size", size + "");

  const url = `/note/navigation/?${params.toString()}`;
  const response = await request.get(url, {
    signal: signal,
  });

  if (response.data) {
    if (response.data.success) {
      return response.data;
    } else {
      throw new Error(response.data.message);
    }
  } else {
    throw new Error("Failed to fetch note navigation");
  }
};

export const addNote = async () => {
  const url = "/note/navigation/";
  const response = await request.post(url);

  if (response.data) {
    const { success, ...rest } = response.data;

    if (success) {
      return rest;
    } else {
      throw new Error(response.data.message);
    }
  } else {
    throw new Error("Failed to add note");
  }
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
  if (response.data) {
    const { success, ...rest } = response.data;

    if (success) {
      return rest;
    } else {
      throw new Error(response.data.message);
    }
  } else {
    throw new Error("Failed to update note title");
  }
};

export const queryNoteContents = async (
  {
    id,
    order = "-updated",
    page = 1,
    size = 10,
  }: {
    id: string | number;
    order?: string;
    page?: number;
    size?: number;
  },
  signal: AbortSignal
) => {
  const params = new URLSearchParams();
  params.append("note", id + "");
  params.append("order", order);
  params.append("page", page + "");
  params.append("size", size + "");

  const url = `/note/content/?${params.toString()}`;
  const response = await request.get(url, {
    signal: signal,
  });

  if (response.data) {
    if (response.data.success) {
      return response.data;
    } else {
      throw new Error(response.data.message);
    }
  } else {
    throw new Error("Failed to fetch note navigation");
  }
};

export const updateNoteContent = async (
  id: string | number,
  content: string,
  summary: string
) => {
  const url = `/note/content/${id}/`;
  const response = await request.patch(url, {
    content,
    summary,
  });
  if (response.data) {
    const { success, ...rest } = response.data;

    if (success) {
      return rest;
    } else {
      throw new Error(response.data.message);
    }
  } else {
    throw new Error("Failed to update note content");
  }
};

export const addNoteContent = async (
  id: string | number,
  content: string,
  summary: string
) => {
  const url = `/note/content/`;
  const response = await request.post(url, {
    note: id,
    content,
    summary,
  });

  if (response.data) {
    const { success, ...rest } = response.data;

    if (success) {
      return rest;
    } else {
      throw new Error(response.data.message);
    }
  } else {
    throw new Error("Failed to add note content");
  }
};

export const deleteNoteContent = async (id: string | number) => {
  const url = `/note/content/${id}/`;
  await request.delete(url);
};

export const exportToMarkdown = async (id: string | number) => {
  const url = "/note/markdown/";
  const response = await request.post(url, {
    id,
  });
  if (response.data) {
    if (response.data.success) {
      return response.data.content;
    } else {
      throw new Error(response.data.message);
    }
  } else {
    throw new Error("Failed to export markdown content");
  }
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
