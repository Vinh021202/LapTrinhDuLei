'use client';

import React, { useEffect, useState } from 'react';
import Loader from '../components/Loader/Loader';
import Header from '../components/Header';
import Heading from '../Utils/Heading';
import { Style } from '../style/stylelogin';
import CourseCard from '../components/Course/CourseCard';
import { useSearchParams } from 'next/navigation';
import { useGetUserAllCoursesQuery } from '@/redux/features/courses/coursesApi';
import { useGetHeroDataQuery } from '@/redux/features/layout/layoutApi';

type Props = {};

const Page: React.FC<Props> = () => {
  const searchParams = useSearchParams();
  const search = searchParams?.get('title');
  const { data, isLoading } = useGetUserAllCoursesQuery(undefined, {});
  const { data: categoriesData } = useGetHeroDataQuery('Categories', {});

  const [route, setRoute] = useState('Login');
  const [open, setOpen] = useState(false);
  const [courses, setCourses] = useState([]);
  const [category, setCategory] = useState('All');

  useEffect(() => {
    if (category === 'All') {
      setCourses(data?.courses);
    }
    if (category !== 'All') {
      setCourses(
        data?.courses.filter((item: any) => item.categories === category)
      );
    }
    if (search) {
      setCourses(
        data?.courses.filter((item: any) =>
          item.name.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  }, [data, category, search]);

  const categories = categoriesData?.layout.categories;

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Header
            route={route}
            setRoute={setRoute}
            open={open}
            setOpen={setOpen}
            activeItem={1}
          />
          <div className="w[95%] md:w-[85%] m-auto min-h-[70vh]">
            <Heading
              title={'Tất cả các khóa học - Elearning'}
              description={'Elearning là một cộng đồng lập trình. '}
              keyword={
                'cộng đồng lập trình, kỹ năng lập trình, hiểu biết chuyên sâu, cộng tác, tăng trưởng'
              }
            />
            <br />
            <div className="w-ful flex items-center flex-wrap">
              <div
                className={`h-[35px] ${
                  category === 'All' ? 'bg-[crimson]' : 'bg-[#5050cb]'
                } m-3 px-3 rounded-[30px] flex items-center justify-center font-Poppins cursor-pointer`}
                onClick={() => setCategory('All')}
              >
                Tất Cả
              </div>
              {categories &&
                categories.map((item: any, index: number) => (
                  <div key={index}>
                    <div
                      className={`h-[35px] ${
                        category === item.title
                          ? 'bg-[crimson]'
                          : 'bg-[#5050cb]'
                      } m-3 px-3 rounded-[30px] flex items-center justify-center font-Poppins cursor-pointer`}
                      onClick={() => setCategory(item.title)}
                    >
                      {item.title}
                    </div>
                  </div>
                ))}
            </div>
            {courses && courses.length === 0 && (
              <p
                className={`${Style.Label} justify-center min-h-[50vh] flex-center`}
              >
                {search
                  ? 'Không tìm thấy khóa học nào!!'
                  : 'Không tìm thấy khóa học nào trong danh mục này. Vui lòng thử khóa học khác!'}
              </p>
            )}  
            <br />
            <br />
            <div className="grid grid-cols-1 gap[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 ls:gap-[25px] 1500px:grid-cols-4 1500px:gap-[35px] mb-12 border-0">
              {courses &&
                courses.map((item: any, index: number) => (
                  <CourseCard item={item} key={index} />
                ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Page;
