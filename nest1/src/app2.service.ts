import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class App2Service {
  async callApp2(): Promise<string> {
    try {
      const response = await axios.get('http://nestapp2:3000/deepcalls'); // use internal port and not exposed one
      return response.data.toString();
    } catch (error) {
      // Handle errors
      console.error('Error fetching data:', error.message);
      throw error;
    }
  }
}
