export interface CurriculumReq {
  
  curriculumName: string;
  curriculumYearType: string;
  taggedSub: TaggedSub;
  createdAdminId: string;
}

export interface TaggedSub {
  taggedSubId: string;
  isMandatorySub: string;
}


