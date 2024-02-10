import pkg from 'firebase-admin'
import { getAuth } from 'firebase-admin/auth'
import { getFirestore } from 'firebase-admin/firestore'
import { FB_PROJECT_ID, FB_CLIENT_EMAIL, FB_PRIVATE_KEY } from '$env/static/private'

try {
  pkg.initializeApp({
    credential: pkg.credential.cert({
      projectId: FB_PROJECT_ID,
      clientEmail: FB_CLIENT_EMAIL,
      privateKey: FB_PRIVATE_KEY
    })
  })
} catch (err: any) {
  if ((err.message as string).includes('already exists')) {
    console.error('Firebase Admin Error: ', err.stack)
  }
}

export const adminDb = getFirestore()
export const adminAuth = getAuth()
