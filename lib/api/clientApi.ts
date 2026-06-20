import { NewNoteBody, Note } from "@/types/note";
import axios from "axios";
import { api } from "../api";
import { User } from "@/types/user";

axios.defaults.baseURL = "https://notehub-public.goit.study/api";

interface Notes {
  notes: Note[];
  totalPages: number;
}

export type RegisterRequest = {
  email: string;
  password: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type UpdateUserRequest = {
  username?: string;
  avatar?: string;
};

type SessionResponse = {
  success: boolean;
  user?: User;
};

export const fetchNotes = async (
  search: string,
  page: number,
  tag: string | undefined
): Promise<Notes> => {
  const res = await api.get<Notes>("/notes", {
    params: {
      search,
      page,
      perPage: 12,
      tag: tag || undefined,
    },
  });
  return res.data;
};

export const deleteNote = async (noteId: string): Promise<Note> => {
  const res = await api.delete<Note>(`/notes/${noteId}`, {});

  return res.data;
};

export const createNote = async (newNote: NewNoteBody): Promise<Note> => {
  const res = await api.post<Note>("/notes", newNote, {});

  return res.data;
};

export const fetchNoteById = async (noteId: string): Promise<Note> => {
  const res = await api.get<Note>(`/notes/${noteId}`, {});

  return res.data;
};

export const register = async (payload: RegisterRequest): Promise<User> => {
  const { data } = await api.post<User>("/auth/register", payload);
  return data;
};

export const login = async (payload: LoginRequest): Promise<User> => {
  const { data } = await api.post<User>("/auth/login", payload);
  return data;
};

export const logout = async (): Promise<void> => {
  await api.post("/auth/logout");
};

export const checkSession = async (): Promise<boolean> => {
  const { data } = await api.get<SessionResponse>("/auth/session");
  return data.success;
};

export const getMe = async () => {
  const { data } = await api.get("/users/me", {
    withCredentials: true,
  });

  return data;
};

export const updateMe = async (payload: UpdateUserRequest): Promise<User> => {
  const { data } = await api.patch<User>("/users/me", payload);
  return data;
};
