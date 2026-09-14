import { initializeApp, getApps } from "firebase/app";
import { getFirestore, doc, getDocFromServer } from "firebase/firestore";
import firebaseConfig from "../../firebase-applet-config.json";

export const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId || "(default)");

// Verifikasi koneksi ke Firestore
export async function testConnection() {
  try {
    await getDocFromServer(doc(db, "stations", "ketapang"));
    console.log("Terhubung ke Firebase Firestore");
  } catch (error) {
    if (error instanceof Error && error.message.includes("the client is offline")) {
      console.warn("Koneksi Firestore offline atau dalam mode lokal.");
    }
  }
}

testConnection();
