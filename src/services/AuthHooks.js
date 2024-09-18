import { Client, Account } from "appwrite";

const client = new Client();
const account = new Account(client);

client
  .setEndpoint(process.env.REACT_APP_API_ENDPOINT)
  .setProject(process.env.REACT_APP_PROJECT_ID); 

const signUp = async (email, password, name) => {
  try {
    const response = await account.create("[USER_ID]", email, password, name);
    console.log("User registered:", response);
  } catch (error) {
    console.error("Error registering user:", error.message);
  }
};

// signUp("test@example.com", "password123", "John Doe");


const login = async (email, password) => {
    try {
      const session = await account.createSession(email, password);
      console.log('User logged in:', session);
    } catch (error) {
      console.error('Login failed:', error.message);
    }
  };
  
// login('test@example.com', 'password123');
  
const getCurrentUser = async () => {
    try {
      const user = await account.get();
      console.log('Current user:', user);
    } catch (error) {
      console.error('No user logged in:', error.message);
    }
  };
  
  
  const logout = async () => {
    try {
      await account.deleteSession('current');
      console.log('User logged out');
    } catch (error) {
      console.error('Logout failed:', error.message);
    }
  };
 
  
  const loginWithOAuth = async () => {
    account.createOAuth2Session('google', 'http://localhost:3000/success', 'http://localhost:3000/failure');
  };
  