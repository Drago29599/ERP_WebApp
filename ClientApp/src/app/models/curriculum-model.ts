export interface CurriculumReq {

  curriculumName: string;
  curriculumYearType: string;
  branch: string;
  taggedSub: TaggedSub[];
  createdAdminId: string;
}

export interface TaggedSub {
  taggedSubId: string;
  Subject: string;
  isMandatorySub: number;
}

export interface curriculumSub {
  SubId: string;
  Subject: string;
  Branch: string;
}

//export interface Subject {
//  subId: string;
//  subName: string;
//}

