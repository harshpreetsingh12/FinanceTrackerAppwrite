import { Client, Account,OAuthProvider, Databases  } from "appwrite";
import { ID } from 'appwrite';
import { CONF } from "../conf/conf";

export class DbService {
  
  client= new Client()
  account;

  constructor() {
      const {  APPWRITE_ENDPOINT,APPWRITE_PROJECT_ID} =CONF

      this.client
        .setEndpoint(APPWRITE_ENDPOINT)
        .setProject(APPWRITE_PROJECT_ID); 
      this.account= new Account(this.client)
      this.databases = new Databases(client);
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

}

const DbService= new DbService();

export default DbService;

export {ID};

