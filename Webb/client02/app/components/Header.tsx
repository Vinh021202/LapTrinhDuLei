"use client";

import Link from "next/link";
import React, { FC, useEffect, useState } from "react";
import NavItems from "../Utils/NavItems";
import { ThemeSwitcher } from "../Utils/ThemeSwitcher";
import { HiOutlineMenuAlt3, HiOutlineUserCircle } from "react-icons/hi";
import CustomModal from "../Utils/CustomModal";
import Login from "../components/Auth/Login";
import SignUp from "../components/Auth/SignUp";
import Verification from "./Auth/Verification";
import { useSelector } from "react-redux";
import Image from "next/image";
import avatar from "../../public/asstes/avatar.png";
import { useSession } from "next-auth/react";
import {
  useLogOutQuery,
  useSocialAuthMutation,
} from "@/redux/features/auth/authApi";
import toast from "react-hot-toast";
import { useLoadUserQuery } from "@/redux/features/api/apiSilce";
import Loader from "./Loader/Loader";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  activeItem: number;
  route: string;
  setRoute: (route: string) => void;
};

const Header: FC<Props> = ({ activeItem, setOpen, setRoute, open, route }) => {
  const [active, setActive] = useState(false);
  const [openSideabr, setOpenSideabr] = useState(false);
//   const { user } = useSelector((state: any) => state.auth);
  const { data } = useSession();
  const [socialAuth, { isSuccess, error }] = useSocialAuthMutation();
  const {
    data: userData,
    isLoading,
    refetch,
  } = useLoadUserQuery(undefined, {});

  const [logout, setLogout] = useState(false);
  const {} = useLogOutQuery(undefined, {
    skip: !logout ? true : false,
  });

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 80) {
        setActive(true);
      } else {
        setActive(false);
      }
    });
  }

//   useEffect(() => {
//     if (!user) {
//       if (data) {
//         socialAuth({
//           email: data?.user?.email,
//           name: data?.user?.name,
//           avatar: data?.user?.image,
//         });
//       }
//     }
//     if (data === null) {
//       if (isSuccess) {
//         toast.success("Login Successfully");
//       }
//     }
//     // if (data === null) {
//     //   setLogout(true);
//     // }
//   }, [user, data]);

  useEffect(() => {
      if (!isLoading) {
          // Nếu đã có userData
          if (!userData) {
              if (data) {
                  socialAuth({
                      email: data?.user?.email,
                      name: data?.user?.name,
                      avatar: data?.user?.image,
                  });
                  refetch(); // Gọi lại API để làm mới dữ liệu
              }
          }

          // Nếu dữ liệu là null nhưng thao tác login thành công
          if (data === null ) {
              if(isSuccess){
                  toast.success("Login Successfully");
              }
          }

          // Nếu không có dữ liệu và không có userData => logout
          if (data === null && !isLoading && !userData) {
              setLogout(true);
          }
      }
  }, [data, userData, isLoading, isSuccess]);

  const handleClose = (e: any) => {
    if (e.target.id === "screen") {
      setOpenSideabr(false);
    }
  };


  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full relative">
          <div
            className={` ${
              active
                ? "dark:bg-opacity-50 dark:bg-gradient-to-b dark:from-gray-900 dark:to-black fixed top-0 left-0 w-full h-[80px] z-[80] border-b dark:border-[#ffffff1c] shadow-xl transition duration-500"
                : "w-full border-b dark:border-[#ffffff1c] h-[80px] z-[80px] dark:shadow"
            }`}
          >
            <div className="w-[95%] 800px:w-[92%] m-auto py-2 h-full">
              <div className="w-full h-[80px] flex items-center justify-between p-3">
                <div>
                  <Link
                    href={"/"}
                    className={`text-[25px] font-Poppins font-[500] text-black dark:text-white`}
                  >
                    Học Trực Tuyến
                  </Link>
                </div>
                <div className="flex items-center">
                  <NavItems
                    activeItem={activeItem} // Truyền activeItem chính xác
                    isMobile={false} // Truyền giá trị isMobile
                  />
                  <ThemeSwitcher />
                  {/* only for mobile */}
                  <div className="md:hidden">
                    <HiOutlineMenuAlt3
                      size={25}
                      className="cursor-pointer dark:text-white text-black"
                      onClick={() => setOpenSideabr(true)}
                    />
                  </div>
                  {userData ? (
                    <Link href={"/profile"}>
                      <Image
                        src={userData.user.avatar ? userData.user.avatar.url : avatar}
                        alt=""
                        height={30}
                        width={30}
                        className="w-[30px] h-[30px] rounded-full ml-[20px] cursor-pointer"
                        style={{
                          border:
                            activeItem == 5 ? "2px solid #ffc107" : "none",
                        }}
                      />
                    </Link>
                  ) : (
                    <HiOutlineUserCircle
                      size={25}
                      className="cursor-pointer hidden md:block dark:text-white text-black"
                      onClick={() => {
                        // setRoute("Login");
                        setOpen(true);
                      }}
                    />
                  )}
                </div>
              </div>
            </div>

            {/* mobile sidebar */}
            {openSideabr && (
              <div
                className="fixed w-full h-screen top-0 left-0 z-[99999] dark:bg-[unset] bg-[#00000024]"
                onClick={handleClose}
                id="screen"
              >
                <div className="w-[70%] fixed z-[999999999] h-screen bg-white dark:bg-slate-900 dark:bg-opacity-90 top-0 right-0 ">
                  <NavItems activeItem={activeItem} isMobile={true} />
                  {userData ? (
                    <Link href={"/profile"}>
                      <Image
                        src={userData.user.avatar ? userData.user.avatar.url : avatar}
                        alt=""
                        height={30}
                        width={30}
                        className="w-[30px] h-[30px] rounded-full cursor-pointer"
                        style={{
                          border:
                            activeItem == 5 ? "2px solid #ffc107" : "none",
                        }}
                      />
                    </Link>
                  ) : (
                    <HiOutlineUserCircle
                      size={25}
                      className="cursor-pointer hidden md:block dark:text-white text-black"
                      onClick={() => {
                        // setRoute("Login");
                        setOpen(true);
                      }}
                    />
                  )}
                  <br />
                  <br />
                  <p className="text-[16px] px-2 pl-5 text-black dark:text-white">
                    Đại Học Công Nghiệp IUH
                  </p>
                </div>
              </div>
            )}
          </div>
          {route === "Login" && (
            <>
              {open && (
                <CustomModal
                  open={open}
                  setOpen={setOpen}
                  setRoute={setRoute}
                  activeItem={activeItem}
                  component={Login}
                  refetch={refetch}
                />
              )}
            </>
          )}
          {route === "Sign-Up" && (
            <>
              {open && (
                <CustomModal
                  open={open}
                  setOpen={setOpen}
                  setRoute={setRoute}
                  activeItem={activeItem}
                  component={SignUp}
                />
              )}
            </>
          )}
          {route === "Verification" && (
            <>
              {open && (
                <CustomModal
                  open={open}
                  setOpen={setOpen}
                  setRoute={setRoute}
                  activeItem={activeItem}
                  component={Verification}
                />
              )}
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Header;
