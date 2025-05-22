"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { data } from "@/data/courses";
import { UniversitiesList } from "@/data/universities";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import toast from "react-hot-toast";
import Image from "next/image";
interface FormData {
  title: string;
  description: string;
  course: string;
  subject: string;
  category: string;
  uploadedBy: string;
  university: string;
}

const ALLOWED_FILE_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/jpg",
];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

const UploadPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Form data state
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    course: "",
    subject: "",
    category: "select",
    uploadedBy: "",
    university: "",
  });

  // State to store subjects based on selected course
  const [subjects, setSubjects] = useState<string[]>([]);

  // Handle input changes for the form fields
  const changeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // When course is changed, update the subjects accordingly
    if (name === "course") {
      const selectedDegree = data.find((d) => d.degree === value);
      setSubjects(selectedDegree ? selectedDegree.subjects : []);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (!selectedFile) {
      setFile(null);
      setPreviewUrl(null);
      return;
    }

    // Validate file type
    if (!ALLOWED_FILE_TYPES.includes(selectedFile.type)) {
      toast.error(
        "Invalid file type. Only PDF and images (JPEG, PNG) are allowed."
      );
      e.target.value = "";
      return;
    }

    // Validate file size
    if (selectedFile.size > MAX_FILE_SIZE) {
      toast.error("File size should be less than 10MB");
      e.target.value = "";
      return;
    }

    setFile(selectedFile);

    // Create preview URL for images
    if (selectedFile.type.startsWith("image/")) {
      const url = URL.createObjectURL(selectedFile);
      setPreviewUrl(url);
    } else {
      setPreviewUrl(null);
    }
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!file) {
      toast.error("Please select a file");
      return;
    }

    setUploading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("file", file);

      // Log the file details for debugging
      console.log("File being uploaded:", {
        name: file.name,
        type: file.type,
        size: file.size,
      });

      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });

      const res = await axios.post("/api/document/uploadDoc", formDataToSend, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total!
          );
          console.log(`Upload Progress: ${percentCompleted}%`);
        },
      });

      if (res.data.success) {
        toast.success("File uploaded successfully!");
        setFile(null);
        setPreviewUrl(null);
        setFormData({
          title: "",
          description: "",
          course: "",
          subject: "",
          category: "select",
          uploadedBy: "",
          university: "",
        });
      } else {
        toast.error("Failed to upload file. Please try again.");
      }
    } catch (error: any) {
      console.error(
        "Error uploading file:",
        error.response?.data || error.message
      );
      toast.error(
        error.response?.data?.message || "An error occurred during file upload."
      );
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <form
        onSubmit={submitHandler}
        className="bg-gray-200 shadow-xl p-6 rounded-lg w-full max-w-xl mx-auto space-y-6"
      >
        <div className="text-left mb-6">
          <h1 className="text-2xl font-bold text-black text-center">
            Upload Material
          </h1>
        </div>

        <div className="flex flex-col space-y-2">
          <label
            htmlFor="title"
            className="block text-lg  text-black font-semibold"
          >
            Title
          </label>
          <Input
            type="text"
            name="title"
            id="title"
            value={formData.title}
            onChange={changeHandler}
            placeholder="Enter Title"
            className="bg-white text-black"
            required
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label
            htmlFor="description"
            className="block text-lg text-black font-semibold"
          >
            Description
          </label>
          <textarea
            name="description"
            id="description"
            value={formData.description}
            onChange={changeHandler}
            placeholder="Enter Description"
            className="p-3 rounded-md bg-white text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label
            htmlFor="course"
            className="block text-lg text-black font-semibold"
          >
            Course
          </label>
          <Select
            name="course"
            value={formData.course}
            onValueChange={(value) =>
              changeHandler({ target: { name: "course", value } } as any)
            }
          >
            <SelectTrigger className="w-full bg-white text-black">
              <SelectValue placeholder="Select Course" />
            </SelectTrigger>
            <SelectContent>
              {data.map((degree, index) => (
                <SelectItem key={index} value={degree.degree}>
                  {degree.degree}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col space-y-2">
          <label
            htmlFor="subject"
            className="block text-lg text-black font-semibold"
          >
            Subject
          </label>
          <Select
            name="subject"
            value={formData.subject}
            onValueChange={(value) =>
              changeHandler({ target: { name: "subject", value } } as any)
            }
            disabled={!formData.course}
          >
            <SelectTrigger className="w-full bg-white text-black">
              <SelectValue placeholder="Select Subject" />
            </SelectTrigger>
            <SelectContent>
              {subjects.map((subject, index) => (
                <SelectItem key={index} value={subject}>
                  {subject}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col space-y-2">
          <label
            htmlFor="category"
            className="block text-lg text-black font-semibold"
          >
            Category
          </label>
          <Select
            name="category"
            value={formData.category}
            onValueChange={(value) =>
              changeHandler({ target: { name: "category", value } } as any)
            }
          >
            <SelectTrigger className="w-full bg-white text-black">
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="assignments">Assignment</SelectItem>
              <SelectItem value="notes">Notes</SelectItem>
              <SelectItem value="books">Books</SelectItem>
              <SelectItem value="papers">Previous Year Papers</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col space-y-2">
          <label
            htmlFor="university"
            className="block text-lg text-black font-semibold"
          >
            University
          </label>
          <Select
            name="university"
            value={formData.university}
            onValueChange={(value) =>
              changeHandler({ target: { name: "university", value } } as any)
            }
          >
            <SelectTrigger className="w-full bg-white text-black">
              <SelectValue placeholder="Select University" />
            </SelectTrigger>
            <SelectContent>
              {UniversitiesList.map((university, index) => (
                <SelectItem key={index} value={university.fullName}>
                  {university.fullName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col space-y-2">
          <label
            htmlFor="file"
            className="block text-lg text-black font-semibold"
          >
            File Upload
          </label>
          <Input
            type="file"
            name="file"
            id="file"
            onChange={handleFileChange}
            accept=".pdf,.jpg,.jpeg,.png"
            required
            className="bg-white text-black"
          />
          <p className="text-sm text-gray-600">
            Supported formats: PDF, JPEG, PNG (Max size: 10MB)
          </p>
          {previewUrl && (
            <div className="mt-2">
              <Image
                src={previewUrl}
                alt="Preview"
                width={100}
                height={100}
                className="max-w-full h-auto max-h-48 rounded-lg shadow-md object-contain"
              />
            </div>
          )}
        </div>

        <div>
          <button
            type="submit"
            disabled={uploading}
            className={`w-full bg-blue-600 text-white font-semibold py-3 rounded-md transition-colors duration-200 ${
              uploading ? "bg-gray-400 cursor-not-allowed" : "hover:bg-blue-700"
            }`}
          >
            {uploading ? "Uploading..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UploadPage;
