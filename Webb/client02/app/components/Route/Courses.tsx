import React, { useEffect, useState } from "react";
import CourseCard from "../Course/CourseCard";
import { useGetAllCoursesQuery } from "@/redux/features/courses/coursesApi";

type Props = {};

const Course = (props: Props) => {
  const { data, isLoading } = useGetAllCoursesQuery({});
  const [courses, setCourses] = useState<any[]>([]);

  useEffect(() => {
    setCourses(data?.courses);
  }, [data]);

  console.log("nhận dữ liệu ", data?.courses);
  


  return (
    <>
      <div className={`w-[90%] 800px:w-[80%] m-auto`}>
        <h1 className="text-center font-Poppins text-[20px] leading-[35px] sm:text-3xl lg:text-4xl dark:text-white 800px:!leading-[60px] text-[#000] font-[700] tracking-tight">
          Mở rộng sự nghiệp của bạn{" "}
          <span className="text-green-300 ">Cơ hội</span> <br />
          với các khóa học của chúng tôi
        </h1>
        <br />
        <br />
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] 1500px:grid-cols-4 1500px:gap-[35px] md-12 border-0">
          {courses &&
            courses.map((item: any, index: number) => (
              <CourseCard item={item} key={index} />
            ))}
        </div>
      </div>
    </>
  );
};

export default Course;
