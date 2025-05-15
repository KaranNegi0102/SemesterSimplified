interface Course {
  degree: string;
  subjects: string[];
}

export const data: Course[] = [
  {
    degree: "B.Tech",
    subjects: [
      "Computer Science",
      "Information Technology",
      "Electronics",
      "Mechanical",
      "Civil",
      "Electrical"
    ]
  },
  {
    degree: "B.Sc",
    subjects: [
      "Physics",
      "Chemistry",
      "Mathematics",
      "Biology",
      "Computer Science"
    ]
  },
  {
    degree: "B.Com",
    subjects: [
      "Accounting",
      "Business Studies",
      "Economics",
      "Finance",
      "Marketing"
    ]
  }
]; 