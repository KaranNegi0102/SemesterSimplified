"use client";
import AutoSuggestSearch from "@/components/AutoSuggestSearch";
import NavBar from "@/components/navbar";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";

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
  const [selectedUniversity, setSelectedUniversity] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("");

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

    // Filter by university
    if (selectedUniversity && selectedUniversity !== "all") {
      filtered = filtered.filter(
        (doc) =>
          doc.university &&
          doc.university.toLowerCase() === selectedUniversity.toLowerCase()
      );
    }

    // Filter by categories
    if (selectedCategory) {
      filtered = filtered.filter(
        (doc) =>
          doc.category &&
          doc.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    setFilteredDocs(filtered);
  }, [
    selectedCourse,
    selectedSubject,
    selectedUniversity,
    selectedCategory,
    allDocs,
  ]);

  const handleSelectionChange = (course: string, subject: string) => {
    setSelectedCourse(course);
    setSelectedSubject(subject);
  };

  const handleUniversityChange = (value: string) => {
    setSelectedUniversity(value);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory((prev) => (prev === category ? "" : category));
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
        <div className="w-1/4 h-full bg-gray-100 rounded-lg shadow-md p-3">
          <h2 className="text-lg font-bold mb-3">Filter Notes</h2>

          {/* University Filter */}
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-gray-900 mb-2">
              Universities
            </h3>
            <Select
              value={selectedUniversity}
              onValueChange={handleUniversityChange}
            >
              <SelectTrigger className="w-full text-sm">
                <SelectValue placeholder="All Universities" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Universities</SelectItem>
                {universities.map((university) => (
                  <SelectItem key={university} value={university as string}>
                    {university}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Category Filter */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-2">
              Material Types
            </h3>
            <div className="grid grid-cols-1 gap-2">
              {category.map((category) => (
                <Card
                  key={category}
                  className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                    selectedCategory === category
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "hover:border-blue-200"
                  }`}
                  onClick={() => handleCategoryChange(category)}
                >
                  <CardContent className="p-2">
                    <span className="capitalize text-sm">{category}</span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* First column div */}
        <div className="w-full bg-gray-100 rounded-lg shadow-md p-6">
          <h2 className="text-lg font-bold mb-3">
            All documents related to your Choice...
          </h2>
          <div className="space-y-3">
            {loading ? (
              <p className="text-sm">Loading documents...</p>
            ) : filteredDocs.length > 0 ? (
              filteredDocs.map((doc) => (
                <div
                  key={doc._id}
                  className="border rounded-lg p-3 bg-gray-200 hover:shadow-md transition-shadow duration-200"
                >
                  <h3 className="text-base font-semibold mb-1">{doc.title}</h3>
                  <p className="text-sm text-gray-600 mb-1">
                    {doc.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <div className="text-xs text-gray-500">
                      <span className="mr-2">{doc.course}</span>
                      <span className="mr-2">•</span>
                      <span>{doc.subject}</span>
                    </div>
                    <a
                      href={doc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-xs transition-colors duration-200"
                    >
                      View PDF
                    </a>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm">No documents found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
