import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { curriculumSub } from '../models/curriculum-model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(public http: HttpClient) { }

  //getAllSubjects(): Observable<curriculumSub[]> {
  //  return this.http.get<curriculumSub[]>('api/Admin/GetAllSubject')
  //    .pipe(
  //      map((data: any) => {
  //        // Map the backend data to the frontend format
  //        return data.map(subject => ({
  //          SubId: subject.SubId.toString(),  // Convert Guid (or keep as string if needed)
  //          Subject: subject.Subject,
  //          Branch: subject.Branch
  //        }));
  //      })
  //    );
  //}


  CreateCurriculum(curriculumObj: any): Observable<string> {
    return this.http.post<string>('api/Admin/CreateCurriculum', curriculumObj)
      .pipe(map((data: any) => data));
  }
}
