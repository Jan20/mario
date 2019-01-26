import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CloudService {

  constructor(

    private http: HttpClient,

  ) {}

  public async normalizeUserData(userKey: string): Promise<any> {
    
    const url: string = `${environment.cloudBackend.backend}/normalization_cloud_function`
    let result: any

    const params: HttpParams = new HttpParams().set('user_key', userKey);
  
    await this.http.get(url, { params: params, responseType: 'text'}).toPromise().then(resturnValue => {

      result = resturnValue
    
    }).catch(error => {

      result = `An unexpected error has occurred: ${error}`

    })
    
    return new Promise<any>(resolve => resolve(result))

  }
  
  public async createClusters(): Promise<any> {

    const url: string = `${environment.cloudBackend.backend}/cluster_cloud_function`
    let result: any
    
    await this.http.get(url, {responseType: 'text'}).toPromise().then(resturnValue => {

      result = resturnValue
    
    }).catch(error => {

      result = `An unexpected error has occurred: ${error}`

    })

    return new Promise<any>(resolve => resolve(result))

  }

  public async evolveLevel(userKey: string): Promise<any> {

    const url: string = `${environment.cloudBackend.backend}/evolution_cloud_function`
    let result: any

    let params: HttpParams = new HttpParams().set('user_key', userKey)
    
    await this.http.get(url, {params: params, responseType: 'text'}).toPromise().then(resturnValue => {
      
      result = resturnValue
    
    }).catch(error => {

      result = `An unexpected error has occurred: ${error}`

    })

    return new Promise<any>(resolve => resolve(result))

  }

}
