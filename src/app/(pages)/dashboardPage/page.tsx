"use client";
import AutoSuggestSearch from "@/components/AutoSuggestSearch";
import NavBar from "@/components/navbar";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

interface Document {
  _id: string;
  title: string;
  description: string;
  course: string;
  subject: string;
  category: string;
  url: string;
  createdAt: string;
}

const DashboardPage = () => {
  const [recentDocs, setRecentDocs] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await axios.get("/api/document/getDoc");
        if (response.data.success) {
          setRecentDocs(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching documents:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, []);

  return (
    <div className="relative flex flex-col min-h-screen w-full bg-white">
      <NavBar />

      {/* this div contains auto suggestion part */}
      <div className="items-start flex justify-between gap-4 p-4">
        <AutoSuggestSearch />
        <Link href="/dataUploadPage">
          <button className="bg-gray-900 hover:bg-gray-800 text-white font-semibold py-2 mt-8 px-[10%] rounded-lg transition-colors duration-200">
            Upload Notes
          </button>
        </Link>
      </div>

      {/* in this div there is one big and inside that big div there are two more divs in collumn way  */}
      <div className="flex flex-row w-full p-4 gap-6">
        {/* First column div */}
        <div className="w-full bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4">Recent Notes</h2>
          <div className="space-y-4">
            {loading ? (
              <p>Loading documents...</p>
            ) : recentDocs.length > 0 ? (
              recentDocs.map((doc) => (
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

        {/* Second column div */}
        <div className="w-full bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4">Popular Notes</h2>
          <div className="space-y-4">
            {/* Add your content for the second column here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
