import { nanoid } from "nanoid";

export const generateCode = () => nanoid(7);


//nanoid is used to generate unique short codes for notes sharing
//user UUID is used for public identification of users instead of MongoDB's _id for security purposes
//we dont use UUid for notes sharing  as notes are private to users also they are short