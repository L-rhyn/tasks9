import { auth, db, storage } from "./config";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  DocumentData,
  CollectionReference,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export async function signIn(email: string, password: string) {
  return signInWithEmailAndPassword(auth, email, password);
}

export async function signUp(email: string, password: string) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export async function signOut() {
  return firebaseSignOut(auth);
}

export function onAuthChange(cb: (user: User | null) => void) {
  return onAuthStateChanged(auth, cb);
}

export async function addDocument<T = DocumentData>(collectionPath: string, data: T) {
  const colRef = collection(db, collectionPath) as CollectionReference<T>;
  return addDoc(colRef, data as any);
}

export async function getCollection<T = DocumentData>(collectionPath: string) {
  const colRef = collection(db, collectionPath) as CollectionReference<T>;
  const snap = await getDocs(colRef);
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as T) }));
}

export async function uploadFile(path: string, file: Blob | Uint8Array | ArrayBuffer) {
  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, file as any);
  return getDownloadURL(storageRef);
}

export async function queryCollection<T = DocumentData>(collectionPath: string, field: string, op: any, value: any) {
  const q = query(collection(db, collectionPath), where(field, op, value));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as T) }));
}
