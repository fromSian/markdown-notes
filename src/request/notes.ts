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
