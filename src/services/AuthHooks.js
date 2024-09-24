import { Client, Account,OAuthProvider  } from "appwrite";
import { ID } from 'appwrite';
import { CONF } from "../conf/conf";

export class AuthService {
  
  client= new Client()
  account;

  constructor() {
      const {  APPWRITE_ENDPOINT,APPWRITE_PROJECT_ID} =CONF
      if (APPWRITE_PROJECT_ID==='undefined') {
        throw new Error("Missing required environment variables");
      }

      this.client
        .setEndpoint(APPWRITE_ENDPOINT)
        .setProject(APPWRITE_PROJECT_ID); 
      this.account= new Account(this.client)
  }

  async createAccount({email, password, name}){
    try{
      const response = await this.account.create(ID.unique(), email, password, name);
      if(response){
        await this.loginUser({email, password})
      }
      else{
        return response
      }
    }
    catch(error){
      console.error("Error registering user:", error.message);
    }
  }

  async loginUser({email, password}){
    try{
      return await this.account.createEmailPasswordSession(email, password);
    }
    catch(error){
      throw error;
    }
  }

  async getUser(){
    try{
      return await this.account.get();
    }
    catch(error){
      throw error;
    }
  }

  async logout(){
    try{
     return  await this.account.deleteSession('current');
    }
    catch(error){
      throw error;
    }
  }
    
  async loginWithGoogle() {
      this.account.createOAuth2Session( OAuthProvider.Google, 'http://localhost:3000', 'http://localhost:3000',['user']);
  };

}

const authService= new AuthService();

export default authService;

export {ID};

