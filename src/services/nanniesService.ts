import type { Nanny } from "../types/nannies";

export const getNannies = async (): Promise<Nanny[]> => {
  const res = await fetch('/babysitters.json');
  return res.json();
};

{/*Firebase version     
export const getNannies = async () => {
  const snapshot = await getDocs(collection(db, "nannies"));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};
*/}