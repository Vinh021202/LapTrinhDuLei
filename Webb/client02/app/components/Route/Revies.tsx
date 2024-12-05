import Image from "next/image";
import React from "react";
import avatarReview from "../../../public/asstes/avatar1.jpg";
import { Style } from "@/app/style/stylelogin";
import ReviewCard from "../Review/ReviewCard";

type Props = {};

export const reviews = [
  {
    name: "Verna Santos",
    avatar: "https://i.pinimg.com/550x/f2/28/44/f2284432080f38464d9dade7b606a6c9.jpg",
    profession: "Full stack developer | Quarter ltd.",
    comment:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem.",
  },
  {
    name: "Verna Santos",
    avatar: "https://i.pinimg.com/550x/f2/28/44/f2284432080f38464d9dade7b606a6c9.jpg",
    profession: "Full stack developer | Quarter ltd.",
    comment:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem.",
  },
  {
    name: "Verna Santos",
    avatar: "https://i.pinimg.com/550x/f2/28/44/f2284432080f38464d9dade7b606a6c9.jpg",
    profession: "Full stack developer | Quarter ltd.",
    comment:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem.",
  },
  {
    name: "Verna Santos",
    avatar: "https://i.pinimg.com/550x/f2/28/44/f2284432080f38464d9dade7b606a6c9.jpg",
    profession: "Full stack developer | Quarter ltd.",
    comment:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem.",
  },
  {
    name: "Verna Santos",
    avatar: "https://i.pinimg.com/550x/f2/28/44/f2284432080f38464d9dade7b606a6c9.jpg",
    profession: "Full stack developer | Quarter ltd.",
    comment:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem.",
  },
  {
    name: "Verna Santos",
    avatar: "https://i.pinimg.com/550x/f2/28/44/f2284432080f38464d9dade7b606a6c9.jpg",
    profession: "Full stack developer | Quarter ltd.",
    comment:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem.",
  },
];

const Revies = (props: Props) => {
  return (
    <div className="w-[90%] md:w-[85%] m-auto">
    <div className="w-full flex flex-col md:flex-row items-center md:items-start justify-between ">
      {/* Phần hình ảnh */}
      <div className="md:w-1/2 w-full rounded overflow-hidden ">
        <Image
          src={require("../../../public/asstes/business3.jpg")}
          alt="business"
          width={500}
          height={100}
          className="rounded-md object-cover hero_animation"
        />
      </div>
  
      {/* Phần chữ */}
      <div className="md:w-1/2 w-full">
  <h3 className={`${Style.title} text-3xl md:text-4xl font-bold`}>
    Học sinh của chúng tôi có{" "}
    <span className="text-green-300">Sức mạnh của chúng tôi</span> <br />
    Xem Họ Nói Gì Về Chúng Tôi
  </h3>
  <br />
  <p className={`${Style.Label} text-lg md:text-xl leading-relaxed`}>
    Bản thân công ty đã là một công ty rất thành công. Và vì chúng ta
    xứng đáng với niềm vui, không ai có thể chịu đựng nỗi đau bằng niềm
    vui.
  </p>
</div>
    </div>
    <br />
    <br />
    {/* Danh sách review */}
<div className="grid grid-cols-1 gap-[25px] md:grid-cols-2 md:gap-[25px] lg:gap-[25px] xl:grid-cols-2 xl:gap-[35px] mb-12 border-0 
        md:[&>*:nth-child(3)]:!mt-[-60px] md:[&>*:nth-child(6)]:!mt-[-40px]">
      {reviews &&
        reviews.map((item, index) => (
          <ReviewCard item={item} key={index} />
        ))}
    </div>
  </div>
  
  );
};

export default Revies;
