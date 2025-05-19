"use client";
import AutoSuggestSearch from "@/components/AutoSuggestSearch";
import NavBar from "@/components/navbar";
import React, { Suspense, useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, RefreshCw } from "lucide-react";
import Footer from "@/components/footer";
import Image from "next/image";
import mainLogo from "@/app/asset/mainLogo.jpeg";
import { UploadSidebar } from "@/components/ui/sidebar";
import DataUploadPage from "../dataUploadPage/page";
import toast from "react-hot-toast";

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
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DashboardContent />
    </Suspense>
  );
};

const DashboardContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
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

  const [isUploadSidebarOpen, setIsUploadSidebarOpen] = useState(false);

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

  const handleRefresh = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/document/getDoc");
      if (response.data.success) {
        setAllDocs(response.data.data);
        setFilteredDocs(response.data.data);
        setSelectedCourse("");
        setSelectedSubject("");
        setSelectedUniversity("all");
        setSelectedCategory("");
        router.push("/dashboardPage");
        toast.success("Page refreshed successfully!");
      }
    } catch (error) {
      console.error("Error refreshing documents:", error);
      toast.error("Failed to refresh documents");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex flex-col min-h-screen w-full bg-white">
      <NavBar />

      {/* this div contains auto suggestion part */}
      <div className="flex justify-center w-full p-4">
        <div className="w-full flex justify-between items-center gap-4 p-1">
          {/* Logo - Left */}
          <div className="flex-shrink-0">
            <Image
              src={mainLogo}
              alt="Semester Simplified Logo"
              width={150}
              height={150}
              className="rounded-full"
            />
          </div>

          {/* Search - Middle */}
          <div className="flex-1 flex justify-center">
            <div className="w-[600px]">
              <AutoSuggestSearch onSelectionChange={handleSelectionChange} />
            </div>
          </div>

          {/* Buttons - Right */}
          <div className="flex-shrink-0 flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={handleRefresh}
              className="cursor-pointer hover:bg-gray-100"
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
            <Button
              className="cursor-pointer"
              variant="default"
              size="default"
              onClick={() => setIsUploadSidebarOpen(true)}
            >
              Upload Notes
            </Button>
          </div>
        </div>
      </div>

      {/* in this div there is one big and inside that big div there are two more divs in collumn way  */}
      <div className="flex flex-row w-full p-2 gap-6 mb-[10%]">
        {/* Second column div - Filters */}
        <div className="w-1/3 h-full bg-gray-100 rounded-lg shadow-md p-3">
          <h2 className="text-lg font-bold text-center mb-3">Filter Notes</h2>

          {/* University Filter */}
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-gray-900 mb-2">
              Universities
            </h3>
            <Select
              value={selectedUniversity}
              onValueChange={handleUniversityChange}
            >
              <SelectTrigger className="w-full bg-white text-sm">
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
                      ? "border-gray-900 bg-gray-900  text-white"
                      : "hover:border-blue-200"
                  }`}
                  onClick={() => handleCategoryChange(category)}
                >
                  <p className="text-sm capitalize ms-4">{category}</p>
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
                  <div className="flex items-center gap-2 mb-1">
                    <BookOpen className="h-4 w-4 text-gray-600" />
                    <h3 className="text-base font-semibold">{doc.title}</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">
                    Description: {doc.description}
                  </p>
                  <div className="flex justify-between font-semibold items-center">
                    <div className="text-xs text-gray-500">
                      <span className="mr-2">Course: {doc.course}</span>
                      <span className="mr-2">•</span>
                      <span>Subject: {doc.subject}</span>
                    </div>
                    <Button variant="outline" size="sm" className="h-7" asChild>
                      <a
                        href={doc.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View PDF
                      </a>
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm">No documents found</p>
            )}
          </div>
        </div>
      </div>

      {/* Upload Sidebar */}
      <UploadSidebar
        isOpen={isUploadSidebarOpen}
        onClose={() => setIsUploadSidebarOpen(false)}
      >
        <DataUploadPage />
      </UploadSidebar>

      <Footer />
    </div>
  );
};

export default DashboardPage;
