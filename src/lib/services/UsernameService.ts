import { doc, getDoc } from 'firebase/firestore'
import { db } from '$lib/firebase'

export const usernameExists = async (username: string): Promise<boolean> => {
  const ref = doc(db, 'usernames', username)
  const exists = await getDoc(ref).then(doc => doc.exists())
  return exists
}
