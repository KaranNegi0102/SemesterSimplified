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
import mainLogo from "../../../../public/mainLogo.jpeg";
import { UploadSidebar } from "@/components/ui/sidebar";
import DataUploadPage from "../dataUploadPage/page";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

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
  const [authChecking, setAuthChecking] = useState(true);
  const { isLoggedIn } = useSelector((state: any) => state.auth);

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

  useEffect(() => {
    if (isLoggedIn) {
      setAuthChecking(false);
    }

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
        toast.error("Failed to fetch documents");
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, [isLoggedIn, router]);

  if (isLoggedIn && authChecking) {
    return (
      <div className="min-h-screen bg-white">
        <NavBar />
        <div className="container mx-auto px-4 py-16">
          <Card className="max-w-md mx-auto p-6 text-center">
            <h2 className="text-2xl font-bold mb-4">Loading...</h2>
            <p className="text-gray-600 mb-6">
              Please wait while we verify your authentication status.
            </p>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-white">
        <NavBar />
        <div className="container mx-auto px-4 py-16">
          <Card className="max-w-md mx-auto p-6 text-center">
            <h2 className="text-2xl font-bold mb-4">Wait for 5 seconds</h2>
            <p className="text-gray-600 mb-6">
              If It Goes Away Then You Are Logged In If Not
            </p>
            <div className="flex justify-center ">
              <svg
                className="animate-bounce w-6 h-6 text-gray-700"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
              </svg>
            </div>
            <Button onClick={() => router.push("/loginPage")}>
              Go to Login
            </Button>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

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

  // console.log("this is user data in dashBoardPage.tsx-> ", userData.data.userId);

  return (
    <div className="relative flex flex-col min-h-screen w-full bg-white">
      <NavBar />

      {/* this div contains auto suggestion part */}
      <div className="flex flex-col md:flex-row justify-center w-full p-4 gap-4">
        <div className="w-full flex flex-col md:flex-row  justify-between items-center gap-4 p-1">
          {/* Logo - Left */}
          <div className="flex-shrink-0 order-1 md:order-1 md:ml-10">
            <Image
              src={mainLogo}
              alt="Semester Simplified Logo"
              width={150}
              height={150}
              className="rounded-full w-[100px] h-[100px] md:w-[150px] md:h-[150px]"
            />
          </div>

          {/* Search - Middle */}
          <div className="flex-1 flex justify-center order-1 md:order-2 w-full md:w-auto">
            <div className="w-full md:w-[600px]">
              <AutoSuggestSearch onSelectionChange={handleSelectionChange} />
            </div>
          </div>

          {/* Buttons - Right */}
          <div className="flex-shrink-0 flex gap-2 order-3">
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
      <div className="flex flex-col lg:flex-row w-full p-2 gap-6 mb-[10%]">
        {/* Second column div - Filters */}
        <div className="w-full  lg:w-1/3 h-full bg-gray-100 rounded-lg shadow-md p-3 mb-4 lg:mb-0">
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
            <div className="grid grid-cols-4 sm:grid-cols-2 lg:grid-cols-1 gap-2">
              {category.map((category) => (
                <Card
                  key={category}
                  className={`border rounded-lg p-3 bg-white hover:shadow-md transition-shadow duration-200 ${
                    selectedCategory === category
                      ? "border-gray-900 bg-gray-900  text-white"
                      : "hover:border-blue-200"
                  }`}
                  onClick={() => handleCategoryChange(category)}
                >
                  <p className="text-sm capitalize truncate">
                    {category === "assignments" ? "Assign" : category}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* First column div */}
        <div className="w-full bg-gray-100 rounded-lg shadow-md p-4 md:p-6">
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
                    <BookOpen className="h-4 w-4 text-gray-600 flex-shrink-0" />
                    <h3 className="text-base font-semibold truncate">
                      {doc.title}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-1 line-clamp-2">
                    Description: {doc.description}
                  </p>
                  <div className="flex flex-col sm:flex-row justify-between font-semibold items-start sm:items-center gap-2">
                    <div className="text-xs text-gray-500 flex flex-wrap gap-x-2">
                      <span>Course: {doc.course}</span>
                      <span>•</span>
                      <span>Subject: {doc.subject}</span>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-7"
                        asChild
                      >
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
