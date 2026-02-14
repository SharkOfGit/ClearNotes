// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { 
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// YOUR CONFIG HERE
const firebaseConfig = {
    apiKey: "AIzaSyBMcTpFqm_rmPhcA4Fd1SCmE32UVI1x--o",
    authDomain: "clearnotes-e8451.firebaseapp.com",
    projectId: "clearnotes-e8451",
    storageBucket: "clearnotes-e8451.firebasestorage.app",
    messagingSenderId: "64078987037",
    appId: "1:64078987037:web:6c513b011bcc29bcac6bf4"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// SIGN UP
export async function signup(email, password) {
  const userCred = await createUserWithEmailAndPassword(auth, email, password);
  await sendEmailVerification(userCred.user);
  alert("Verification email sent. Check your inbox.");
}

// LOGIN
export async function login(email, password) {
  const userCred = await signInWithEmailAndPassword(auth, email, password);

  if (!userCred.user.emailVerified) {
    alert("Verify your email before logging in.");
    await signOut(auth);
    return;
  }

  window.location.href = "desk.html";
}

// LOGOUT
export function logout() {
  signOut(auth);
}

// CHECK LOGIN (for dashboard)
export function requireAuth() {
  onAuthStateChanged(auth, user => {
    if (!user || !user.emailVerified) {
      window.location.href = "account.html";
    }
  });
}
