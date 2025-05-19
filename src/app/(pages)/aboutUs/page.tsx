"use client";
import { Card } from "@/components/ui/card";
import NavBar from "@/components/navbar";
import Footer from "@/components/footer";




export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-white">
      <NavBar />

      {/* Hero Section */}
      <div className="relative bg-gray-800 text-white py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
            About Semester Simplified
          </h1>
          <p className="text-xl text-center max-w-3xl mx-auto">
            We&apos;re on a mission to make education more accessible and efficient
            for students worldwide.
          </p>
        </div>
      </div>

      {/* Mission & Vision Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              Our Mission
            </h2>
            <p className="text-gray-600">
              To provide students with a comprehensive platform that simplifies
              their academic journey by offering easy access to study materials,
              notes, and resources. We aim to create a collaborative environment
              where knowledge sharing becomes effortless and effective.
            </p>
          </Card>
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              Our Vision
            </h2>
            <p className="text-gray-600">
              To become the go-to platform for students worldwide, fostering a
              community of learners who support each other in their educational
              pursuits. We envision a future where every student has access to
              quality study materials regardless of their location or
              background.
            </p>
          </Card>
        </div>
      </div>

      {/* Values Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="p-6 bg-gray-800 text-center">
            <h3 className="text-xl font-bold mb-4 text-white">
              Accessibility
            </h3>
            <p className="text-white">
              We believe in making quality education accessible to everyone,
              everywhere.
            </p>
          </Card>
          <Card className="p-6 bg-gray-800 text-center">
            <h3 className="text-xl font-bold mb-4 text-white">Innovation</h3>
            <p className="text-white">
              We continuously strive to improve and innovate our platform to
              better serve students.
            </p>
          </Card>
          <Card className="p-6 bg-gray-800 text-center">
            <h3 className="text-xl font-bold mb-4 text-white">Community</h3>
            <p className="text-white">
              We foster a supportive community where students can learn and grow
              together.
            </p>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
}
