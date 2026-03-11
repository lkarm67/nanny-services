import { ref, get } from "firebase/database";
import { database } from "../firebase";
import type { Nanny } from "../types/nannies";

export const getNannies = async (): Promise<Nanny[]> => {
  const snapshot = await get(ref(database, "nannies"));

  if (!snapshot.exists()) {
    return [];
  }

  const data = snapshot.val();
  console.log("NANNIES DATA:", data);
  console.log(snapshot.val());

  return Object.entries(data).map(([id, nanny]) => ({
    id,
    ...(nanny as Omit<Nanny, "id">),
    
  }));
};



/*import type { Nanny } from "../types/nannies";

export const getNannies = async (): Promise<Nanny[]> => {
  const res = await fetch('/babysitters.json');
  return res.json();
};*/

{/*Firebase version     
export const getNannies = async () => {
  const snapshot = await getDocs(collection(db, "nannies"));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};
*/}