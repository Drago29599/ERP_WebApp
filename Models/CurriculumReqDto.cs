namespace LogInSingUpWebApp.Models
{
    public class CurriculumReqDto
    {
        public string CurriculumName { get; set; }

        public string CurriculumYearType { get; set; } //e.g FE/SE/TE

        public string Branch { get; set; }

        public List<TaggedSubReqDto> TaggedSub { get; set; }

        public Guid CreatedAdminId { get; set; }
    }

    public class TaggedSubReqDto
    {
        public Guid TaggedSubId { get; set; }

        public string Subject { get; set; }
        public int IsMandatorySub { get; set; } // 1 mantory , 0 optional 
    }
}
