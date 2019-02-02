import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CloudService {

  //////////////////
  // Constructors //
  //////////////////

  /**
   * 
   *  Default constructor.
   * 
   * @param http: Injects a http client for enabling backend calls.
   * 
   */
  constructor(

    private http: HttpClient,

  ) {}


  ///////////////
  // Functions //
  ///////////////

  /**
   * 
   * 
   * 
   * @param userKey 
   * 
   */
  public async evolveLevel(userKey: string): Promise<any> {

    // Defines a URL via which the opponent generation
    // process is invoked at the backend.
    const url: string = `${environment.cloudBackend.backend}/evolution_cloud_function`
    
    // Variable intended to store the backend's respond.
    let result: any

    // Defines a set of parameters which are send to the
    // backend server.
    const params: HttpParams = new HttpParams().set('user_key', userKey)
    
    // Sends a http request to the backend.
    await this.http.get(url, {params: params, responseType: 'text'}).toPromise().then(resturnValue => {
      
      result = resturnValue
    
    }).catch(error => {

      result = `An unexpected error has occurred: ${error}`

    })

    // Returns a promise which is resolved as soon as 
    // the backend sends a respond.
    return new Promise<any>(resolve => resolve(result))

  }

}
