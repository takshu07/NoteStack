export interface ClientToServerEvents {
  join: () => void;
}

export interface ServerToClientEvents {
  "note-updated": (note: {
    _id: string;
    title: string;
    content: string;
  }) => void;
}
