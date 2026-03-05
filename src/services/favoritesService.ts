/*import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from "./firebase";
import { getAuth } from "firebase/auth";

export const toggleFavoriteInFirebase = async (nannyId: string, isFavorite: boolean) => {
  const user = getAuth().currentUser;

  if (!user) return;

  const userRef = doc(db, "users", user.uid);

  if (isFavorite) {
    await updateDoc(userRef, {
      favorites: arrayRemove(nannyId)
    });
  } else {
    await updateDoc(userRef, {
      favorites: arrayUnion(nannyId)
    });
  }
};*/