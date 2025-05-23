"use client";
import React, { useState, useRef } from "react";
import { data } from "../app/asset/suggestion";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

interface AutoSuggestSearchProps {
  onSelectionChange: (course: string, subject: string) => void;
}

export default function AutoSuggestSearch({
  onSelectionChange,
}: AutoSuggestSearchProps) {
  const [selectedCourse, setSelectedCourse] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  function handleCourseChange(value: string) {
    setSelectedCourse(value);
    setInputValue("");
    setSuggestions([]);
    setShowSuggestions(false);
    onSelectionChange(value === "all" ? "" : value, "");
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    setInputValue(value);

    // Find the selected course
    const selectedCourseData = data.find(
      (course) => course.degree === selectedCourse
    );

    // Filter subjects for the selected course
    const filteredSuggestions = selectedCourseData
      ? selectedCourseData.subjects.filter((subject) =>
          subject.toLowerCase().includes(value.toLowerCase())
        )
      : [];
    setSuggestions(filteredSuggestions);
    setShowSuggestions(value.length > 0 && filteredSuggestions.length > 0);
  }

  function handleSuggestionClick(subject: string) {
    setInputValue(subject);
    setSuggestions([]);
    setShowSuggestions(false);
    onSelectionChange(selectedCourse, subject);
  }

  return (
    <div
      className="w-full max-w-[280px] sm:max-w-md mx-auto p-2 sm:p-4 relative"
      ref={suggestionsRef}
    >
      <div className="mb-3 sm:mb-4">
        <Select value={selectedCourse} onValueChange={handleCourseChange}>
          <SelectTrigger className="w-full text-sm sm:text-base">
            <SelectValue placeholder="Select a course" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all" className="text-sm sm:text-base">
              Select a course
            </SelectItem>
            {data.map((course) => (
              <SelectItem
                key={course.degree}
                value={course.degree}
                className="text-sm sm:text-base"
              >
                {course.degree}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="relative">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder={
            selectedCourse ? "Search subjects..." : "Select a course first"
          }
          disabled={!selectedCourse}
          className={`w-full p-2 text-sm sm:text-base border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            !selectedCourse ? "bg-gray-100 cursor-not-allowed" : ""
          }`}
        />

        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-48 sm:max-h-60 overflow-y-auto">
            {suggestions.map((subject, index) => (
              <div
                key={`${selectedCourse}-${index}`}
                className="px-3 sm:px-4 py-1.5 sm:py-2 hover:bg-gray-100 text-black cursor-pointer text-sm sm:text-base"
                onClick={() => handleSuggestionClick(subject)}
              >
                {subject}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
