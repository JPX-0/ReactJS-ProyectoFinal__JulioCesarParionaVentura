// Import required functions 
import { collection, getDocs, query, orderBy, where, doc, getDoc } from "firebase/firestore";
import db from "./firebaseConfig";

// firestoreFetchAll -- Trae los datos de Firebase dependiendo el ID solicitado.
// firestoreFetchAll -- Brings the data from Firebase depending on the requested ID.
export const firestoreFetchAll = async (idCategory) => {
  let q;
  if(idCategory) {
    // se reemplaza el ID que viene por URL, y se transforma a un ID existente en Firebase.
    // the ID that comes in is replaced by URL, and it is transformed to an existing ID in Firebase.
    let replaceId = idCategory.replace(/-/g, " ").split(" ").map(e => e[0].toUpperCase() + e.slice(1)).join(" ");
    q = query(collection(db, "data"), where("categoryId", "==", replaceId));
  } else {
    q = query(collection(db, "data"), orderBy("title"));
  }
  const querySnapshot = await getDocs(q);
  let firestoreData = querySnapshot.docs.map(document => ({
    id: document.id,
    ...document.data()
  }));
  if(firestoreData.length > 0) return firestoreData;
}

// firestoreFetchOne -- Trae los datos en oferta de Firebase.
// firestoreFetchOne -- Bring the data in offer from Firebase.
export const firestoreFetchSale = async () => {
  let q = query(collection(db, "data"), where("offer", "==", true));
  const querySnapshot = await getDocs(q);
  let firestoreData = querySnapshot.docs.map(document => ({
    id: document.id,
    ...document.data()
  }));
  return firestoreData;
}

// firestoreFetchOne -- Trae un dato de Firebase dependiendo el ID solicitado.
// firestoreFetchOne -- Bring a data from Firebase depending on the requested ID.
export const firestoreFetchOne = async (idProduct) => {
  const docRef = doc(db, "data", idProduct);
  const docSnap = await getDoc(docRef);
  if(docSnap.exists()) {
    return {
      id: idProduct,
      ...docSnap.data()
    }
  }
}