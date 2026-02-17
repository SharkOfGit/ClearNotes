// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { 
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  onAuthStateChanged,
  signOut,
  updateProfile
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

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
  try {
    const userCred = await createUserWithEmailAndPassword(auth, email, password);
    
    // Grab the name from the input field if you added it to signup.html
    const nameInput = document.getElementById("userName") ? document.getElementById("userName").value : "Student";
    
    // Update Firebase profile with the name
    await updateProfile(userCred.user, { displayName: nameInput });
    
    await sendEmailVerification(userCred.user);
    alert("Verification email sent. Please verify your email, then come back to login!");
    
    // Redirect back to login tab/page after signup
    window.location.reload(); 
  } catch (error) {
    alert(error.message);
  }
}

// LOGIN
export async function login(email, password) {
  try {
    const userCred = await signInWithEmailAndPassword(auth, email, password);

    if (!userCred.user.emailVerified) {
      alert("Verify your email before logging in.");
      await signOut(auth);
      return;
    }

    // SUCCESS: Redirect to dashboard.html, NOT desk.html
    window.location.href = "dashboard.html";
  } catch (error) {
    alert("Login failed: " + error.message);
  }
}

// LOGOUT
export function logout() {
  signOut(auth).then(() => {
    window.location.href = "index.html";
  });
}

// CHECK LOGIN
export function requireAuth() {
  onAuthStateChanged(auth, user => {
    if (!user || !user.emailVerified) {
      // Changed from account.html to signup.html
      window.location.href = "signup.html";
    }
  });
}
