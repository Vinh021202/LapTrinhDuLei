import React, { useEffect, useState } from "react";
import CourseCard from "../Course/CourseCard";
import { useGetAllCoursesQuery } from "@/redux/features/courses/coursesApi";
import Loader from "../Loader/Loader";

type Props = {};

const Course = (props: Props) => {
  const { data, isLoading, error } = useGetAllCoursesQuery({});
  const [courses, setCourses] = useState<any[]>([]);

  useEffect(() => {
    if (data?.courses) {
      setCourses(data.courses);
    }
  }, [data]);

  console.log("Nhận dữ liệu: ", data?.courses);

  // Xử lý lỗi
  if (error) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <p className="text-red-500 text-lg">
          Đã xảy ra lỗi khi tải dữ liệu khóa học. Vui lòng thử lại sau!
        </p>
      </div>
    );
  }

  return (
    <div className={`w-[90%] md:w-[80%] m-auto`}>
      {/* Tiêu đề */}
      <h1 className="text-center font-Poppins text-[20px] leading-[35px] sm:text-3xl lg:text-4xl dark:text-white md:!leading-[60px] text-[#000] font-[700] tracking-tight">
        Mở rộng sự nghiệp của bạn{" "}
        <span className="text-green-300">Cơ hội</span> <br />
        với các khóa học của chúng tôi
      </h1>
      <br />
      <br />

      {/* Hiển thị loader khi đang tải */}
      {isLoading ? (
        <div className="flex justify-center items-center">
          <Loader />
        </div>
      ) : courses?.length > 0 ? (
        // Hiển thị danh sách khóa học
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] 1500px:grid-cols-4 1500px:gap-[35px]">
          {courses.map((item: any, index: number) => (
            <CourseCard item={item} key={index} />
          ))}
        </div>
      ) : (
        // Không có khóa học
        <div className="flex justify-center items-center">
          <p className="text-gray-600 text-lg dark:text-gray-400">
            Hiện tại chưa có khóa học nào.
          </p>
        </div>
      )}
    </div>
  );
};

export default Course;
