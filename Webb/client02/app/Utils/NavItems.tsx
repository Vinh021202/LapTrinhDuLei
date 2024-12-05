'use client'; // Đảm bảo chính xác
import Link from "next/link";
import React from "react";

export const navItemsData = [
    { name: "Trang Chủ", url: "/" },
    { name: "Khóa học", url: "/courses" },
    { name: "Về Chúng tôi", url: "/about" },
    { name: "Chính sách", url: "/policy" },
    { name: "Câu hỏi thường gặp", url: "/faq" },
];

type Props = {
    activeItem: number;
    isMobile: boolean;
}

const NavItems: React.FC<Props> = ({ activeItem, isMobile }) => {
    return (
        <>
            {/* Hiển thị navItems nếu isMobile là true */}
            {isMobile ? (
                <div className="md:hidden mt-5"> {/* Chỉ hiển thị khi là di động */}
                    <div className="w-full text-center py-6">
                        <Link href="/" passHref>
                        <span className={`text-[25px] font-Poppins font-[500] text-black dark:bg-white`}>
                               Học trực tuyến
                            </span>
                            
                        </Link>
                    </div>
                        {navItemsData && navItemsData.map((item, index) => (
                            <Link href={item.url} key={index}>
                                <span 
                                    className={`${
                                        activeItem === index
                                            ? "dark:text-[#37a39a] text-[crimson]"
                                            : "dark:text-white text-black"
                                    } block py-5 text-[18px] px-6 font-Poppins font-[400]`}
                                >
                                    {item.name}
                                </span>
                            </Link>
                        ))}
                    </div>
            ) : (
                <div className="hidden md:flex"> {/* Chỉ hiển thị khi không phải di động */}
                    {navItemsData && navItemsData.map((item, index) => (
                        <Link href={item.url} key={index}>
                            <span 
                                className={`${
                                    activeItem === index
                                        ? "dark:text-[#37a39a] text-[crimson]"
                                        : "dark:text-white text-black"
                                } text-[18px] px-6 font-Poppins font-[400]`}
                            >
                                {item.name}
                            </span>
                        </Link>
                    ))}
                </div>
            )}
        </>
    );
}

export default NavItems;
