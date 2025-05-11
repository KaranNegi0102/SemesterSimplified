import React from "react";

interface Course {
  name: string;
  description: string;
}

interface CoursesListedProps {
  course: Course;
}

const CoursesListed: React.FC<CoursesListedProps> = ({ course }) => {
  return (
    <div className="flex flex-col p-6 bg-white rounded-lg shadow-md m-4 w-64">
      <h3 className="text-xl font-bold mb-2">{course.name}</h3>
      <p className="text-gray-600">{course.description}</p>
      <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
        Learn More
      </button>
    </div>
  );
};

export default CoursesListed;
