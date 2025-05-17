"use client";
import AutoSuggestSearch from "@/components/AutoSuggestSearch";
import NavBar from "@/components/navbar";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface Document {
  _id: string;
  title: string;
  description: string;
  course: string;
  subject: string;
  category: string;
  url: string;
  createdAt: string;
  university?: string;
}

const DashboardPage = () => {
  const searchParams = useSearchParams();
  const [allDocs, setAllDocs] = useState<Document[]>([]);
  const [filteredDocs, setFilteredDocs] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState(
    searchParams.get("course") || ""
  );
  const [selectedSubject, setSelectedSubject] = useState(
    searchParams.get("subject") || ""
  );

  // Filter states
  const [selectedUniversities, setSelectedUniversities] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // Get unique universities and categories from documents
  const universities = Array.from(
    new Set(allDocs.map((doc) => doc.university).filter(Boolean))
  );

  const category = Array.from(
    new Set(allDocs.map((doc) => doc.category).filter(Boolean))
  );
  // const category = ["assignments", "notes", "papers", "books"];

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await axios.get("/api/document/getDoc");
        console.log(
          "this is response data in dashBoardPage.tsx-> ",
          response.data.data
        );

        if (response.data.success) {
          setAllDocs(response.data.data);
          setFilteredDocs(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching documents:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, []);

  useEffect(() => {
    let filtered = allDocs;

    // Filter by course and subject
    if (selectedCourse || selectedSubject) {
      filtered = filtered.filter((doc) => {
        const courseMatch =
          !selectedCourse ||
          doc.course.toLowerCase() === selectedCourse.toLowerCase();
        const subjectMatch =
          !selectedSubject ||
          doc.subject.toLowerCase() === selectedSubject.toLowerCase();
        return courseMatch && subjectMatch;
      });
    }

    // Filter by universities
    if (selectedUniversities.length > 0) {
      filtered = filtered.filter(
        (doc) =>
          doc.university &&
          selectedUniversities.includes(doc.university as string)
      );
    }

    // Filter by categories
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(
        (doc) =>
          doc.category &&
          selectedCategories.includes(doc.category.toLowerCase())
      );
    }

    setFilteredDocs(filtered);
  }, [
    selectedCourse,
    selectedSubject,
    selectedUniversities,
    selectedCategories,
    allDocs,
  ]);

  const handleSelectionChange = (course: string, subject: string) => {
    setSelectedCourse(course);
    setSelectedSubject(subject);
  };

  const handleUniversityChange = (university: string) => {
    setSelectedUniversities((prev) =>
      prev.includes(university)
        ? prev.filter((u) => u !== university)
        : [...prev, university]
    );
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  return (
    <div className="relative flex flex-col min-h-screen w-full bg-white">
      <NavBar />

      {/* this div contains auto suggestion part */}
      <div className="items-start flex justify-between gap-4 p-4">
        <AutoSuggestSearch onSelectionChange={handleSelectionChange} />
        <Link href="/dataUploadPage">
          <button className="bg-gray-900 hover:bg-gray-800 text-white font-semibold py-2 mt-8 px-[10%] rounded-lg transition-colors duration-200">
            Upload Notes
          </button>
        </Link>
      </div>

      {/* in this div there is one big and inside that big div there are two more divs in collumn way  */}
      <div className="flex flex-row w-full p-4 gap-6">

        {/* Second column div - Filters */}
        <div className="w-1/2 border-4 border-black bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4">Filter Notes</h2>

          {/* University Filter */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Universities</h3>
            <div className="space-y-2">
              {universities.map((university) => (
                <label key={university} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedUniversities.includes(
                      university as string
                    )}
                    onChange={() =>
                      handleUniversityChange(university as string)
                    }
                    className="form-checkbox h-4 w-4 text-blue-600 rounded"
                  />
                  <span className="text-gray-700">{university}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Category Filter */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Note Types</h3>
            <div className="space-y-2">
              {category.map((category) => (
                <label key={category} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category)}
                    onChange={() => handleCategoryChange(category)}
                    className="form-checkbox h-4 w-4 text-blue-600 rounded"
                  />
                  <span className="text-gray-700 capitalize">{category}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* First column div */}
        <div className="w-full bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4">Recent Notes</h2>
          <div className="space-y-4">
            {loading ? (
              <p>Loading documents...</p>
            ) : filteredDocs.length > 0 ? (
              filteredDocs.map((doc) => (
                <div
                  key={doc._id}
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
                >
                  <h3 className="text-lg font-semibold mb-2">{doc.title}</h3>
                  <p className="text-gray-600 mb-2">{doc.description}</p>
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-500">
                      <span className="mr-2">{doc.course}</span>
                      <span className="mr-2">•</span>
                      <span>{doc.subject}</span>
                    </div>
                    <a
                      href={doc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm transition-colors duration-200"
                    >
                      View PDF
                    </a>
                  </div>
                </div>
              ))
            ) : (
              <p>No documents found</p>
            )}
          </div>
        </div>

        
      </div>
    </div>
  );
};

export default DashboardPage;
