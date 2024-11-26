import { Component, OnDestroy, OnInit } from '@angular/core';
import { CurriculumReq, TaggedSub, curriculumSub } from '../models/curriculum-model';
import { AdminService } from '../services/admin.service';
import { Subscription } from 'rxjs';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-create-curriculum',
  templateUrl: './create-curriculum.component.html',
  styleUrls: ['./create-curriculum.component.css']
})
export class CreateCurriculumComponent implements OnInit, OnDestroy {
  curriculum: CurriculumReq = {
    curriculumName: '',
    branch:'',
    curriculumYearType: '',
    taggedSub: [],
    createdAdminId : ''
  };

  isLoading = false;
  subjectList: [] = []; // List to hold available subjects

  availableSubjects: curriculumSub[] = []; // List to be populated via the adminService
  // Static list of subjects for testing
  //availableSubjects: Subject[] = [
  //  { subId: '1', subName: 'Mathematics' },
  //  { subId: '2', subName: 'Science' },
  //  { subId: '3', subName: 'History' },
  //  { subId: '4', subName: 'Geography' },
  //  { subId: '5', subName: 'Literature' },
  //  { subId: '6', subName: 'Biology' },
  //  { subId: '7', subName: 'Chemistry' },
  //  { subId: '8', subName: 'Physics' },
  //  { subId: '9', subName: 'English' },
  //  { subId: '10', subName: 'Philosophy' },
  //];
  private subjectsSubscription: Subscription | undefined;

  selectedSubject: curriculumSub | undefined;

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    // Call admin method to get all subjects list
    this.getAllSubjects();
  }

  // Fetch tagged subjects from the service
  getAllSubjects(): void {
    this.isLoading = true;
    //this.subjectsSubscription = this.adminService.getAllSubjects().subscribe(
    //  (subjects: curriculumSub[]) => {
    //    this.availableSubjects = subjects;  // Populate the available subjects list
    //    this.isLoading = false;
    //    console.log(this.availableSubjects);
    //  },
    //  (error) => {
    //    console.error('Error fetching tagged subjects:', error);
    //    this.isLoading = false;
    //  }
    //);
  }

  // Getter to filter the mandatory subjects
  get mandatorySubjects(): TaggedSub[] {
    return this.curriculum.taggedSub.filter(sub => sub.isMandatorySub === 1);
  }

  // Getter to filter the optional subjects
  get optionalSubjects(): TaggedSub[] {
    return this.curriculum.taggedSub.filter(sub => sub.isMandatorySub === 0);
  }

  // Getter to check if max mandatory subjects (5) have been selected
  get isMandatorySubjectLimitReached(): boolean {
    return this.mandatorySubjects.length >= 5;
  }

  // Getter to check if max optional subjects (2) have been selected
  get isOptionalSubjectLimitReached(): boolean {
    return this.optionalSubjects.length >= 2;
  }

  // Function to handle subject selection
  onSubjectSelected(event: MatAutocompleteSelectedEvent, isMandatory: boolean): void {
    const selectedSubject = event.option.value;
    const existingSubject = this.curriculum.taggedSub.find(sub => sub.taggedSubId === selectedSubject.subId);

    // Only add the subject if it isn't already added
    if (!existingSubject) {
      this.curriculum.taggedSub.push({
        taggedSubId: selectedSubject.subId,
        isMandatorySub: isMandatory ? 1 : 0,
        Subject: selectedSubject.Subject // Add the subject name to the model
      });
    }
  }

  // Function to remove a subject from the taggedSub list
  removeSubject(subjectId: string): void {
    const index = this.curriculum.taggedSub.findIndex(sub => sub.taggedSubId === subjectId);
    if (index !== -1) {
      this.curriculum.taggedSub.splice(index, 1);  // Remove from the taggedSub list
    }
  }

  // Function to handle form submission
  onSubmit(): void {
    this.adminService.CreateCurriculum(this.curriculum).subscribe((response) => {
      if (response === "Success") {
        console.log("Curriculum added Successfuly!!!")
      } else {
        console.log("Operation failed!!!")
      }
    })
  }

  ngOnDestroy(): void {
    if (this.subjectsSubscription) {
      this.subjectsSubscription.unsubscribe();
    }
  }
}
