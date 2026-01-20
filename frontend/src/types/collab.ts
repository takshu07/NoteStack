export interface CollabUser {
  _id: string;
  name: string;
}

export interface CollabNote {
  _id: string;
  title: string;
  users: CollabUser[];
}
