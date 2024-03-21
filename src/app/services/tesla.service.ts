import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Config } from '../interfaces/config.interface';
import { Model } from '../interfaces/model.interface';

@Injectable({
  providedIn: 'root',
})
export class TeslaService {
  constructor(private http: HttpClient) {}

  /**
   * Get models in api
   * @returns Observable<Model[]>
   */
  getModels(): Observable<Model[]> {
    return this.http.get<Model[]>('/models');
  }

  /**
   * Get car configs available by modelCode
   * @param modelCode 
   * @returns Observable<Config>
   */
  getConfigsAndOptions(modelCode: string): Observable<Config> {
    return this.http.get<Config>(`/options/${modelCode}`);
  }
}
