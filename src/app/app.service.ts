import {HttpClient} from '@angular/common/http'
import { Injectable } from '@angular/core'

@Injectable({providedIn:'root'})
export class AppService{

    constructor (private http: HttpClient){}

    host = 'secret';
    uploadEndpoint   = 'secret';
    downloadEndpoint = 'secret';
    bucketName = 'secret'
    token = 'secret'
    accessKey = 'secret';
    secretKey = 'secret'

    uploadFile(path:string, file: File){
        let data = new FormData();
        data.append('file', file);
        let observable = this.http
        .post(
            this.host+this.uploadEndpoint+this.bucketName+'?remoto_file_path='+path,
            data,
            {headers: {
                Accept: 'application/json',
                "Authorization": "Bearer " + this.token,
                'access-key':this.accessKey,
                'secret-key':this.secretKey  
            }})
        .subscribe({
            next: success => console.log(success),
            error: fail => console.log(fail)
        })
    }

    async downloadFile(path: string): Promise<string>{
        return new Promise(
            (resolve, reject) => {
                let observable = this.http
                .post(
                    this.host+this.downloadEndpoint+this.bucketName+'?remoto_file_path='+path,
                    {},
                    {headers: {
                        Accept: 'application/json',
                        "Authorization": "Bearer " + this.token,
                        'access-key':this.accessKey,
                        'secret-key':this.secretKey  
                    }})
                .subscribe({
                    next: success => {console.log(success);resolve((success as {conteudo_base64:string}).conteudo_base64)},
                    error: fail =>  reject(fail)
            })
        })
    }


}