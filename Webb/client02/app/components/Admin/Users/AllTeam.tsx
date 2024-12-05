import React, { useState, FC, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";
import { AiOutlineDelete, AiOutlineMail } from "react-icons/ai";
import { useTheme } from "next-themes";
import Loader from "../../Loader/Loader";
import { format } from "timeago.js";
import { useDeleteUsersMutation, useGetAllUsersQuery, useUpdateUsersRoleMutation } from "@/redux/features/user/userApi";
import { Style } from "@/app/style/stylelogin";
import NewMember from './NewMember';
import toast from "react-hot-toast";

type Props = {
  isTeam: boolean;
};

const AllTeam: FC<Props> = ({ isTeam }) => {
  const { theme } = useTheme();
  const [open, setOpen] = useState(false); // Trạng thái mở/đóng NewMember
  const { isLoading, data, error,refetch} = useGetAllUsersQuery({},{refetchOnMountOrArgChange: true});
  const [email, setEmail] = useState(false);
  const [active, setActive]= useState(false);
  const [userId, setUserID] = useState("");
  const [updateUserRole, {error: updateError, isSuccess}] = useUpdateUsersRoleMutation();
  const [deleteUser, {isSuccess: deleteSuccess, error:deleteError}] = useDeleteUsersMutation({});


  useEffect(() => {
    if(updateError){
      if("data" in updateError){
        const errorMessage = updateError as any;
        toast.error(errorMessage.data.message);
      }
    }
    if(isSuccess){
      refetch();
      toast.error("User role update successfully");
    }
    if(deleteSuccess){
      refetch();
      toast.error("Delete User successfully");
      setOpen(false);
    }
    if(deleteError){
      if("data" in deleteError){
        const errorMessage = deleteError as any;
        toast.error(errorMessage.data.message);
      }
    }
  },[updateError, isSuccess, deleteSuccess, deleteError]);

  const handleNewMemberSubmit = async (email: string, isAdmin: boolean) => {
    try {
      await updateUserRole({ email, role: isAdmin ? "admin" : "user" }).unwrap();
      toast.success("Thêm thành viên thành công");
      refetch(); // Cập nhật danh sách
    } catch (error) {
      toast.error("Không thể thêm thành viên");
    }
    setOpen(false);
  };
  


  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "role", headerName: "Role", flex: 0.7 },
    { field: "courses", headerName: "Purchased Courses", flex: 0.8 },
    { field: "created_at", headerName: "Created At", flex: 0.7 },
    {
      field: "",
      headerName: "Delete",
      flex: 0.5,
      renderCell: (params: any) => (
        <Button variant="outlined" color="error">
          <AiOutlineDelete className="dark:text-white text-black" />
        </Button>
      ),
    },
    {
      field: " ",
      headerName: "Email",
      flex: 0.5,
      renderCell: (params: any) => (
        <a
          href={`mailto:${params.row.email}`}
          className="flex items-center justify-center w-full h-full"
          style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
        >
          <AiOutlineMail className="dark:text-white text-black" />
        </a>
      ),
    },
  ];

  const rows: any = [];

  if (isTeam) {
    const newData = data && data.users.filter((item: any) => item.role === "admin");
    if (newData) {
      newData.forEach((item: any) => {
        rows.push({
          id: item._id,
          name: item.name,
          email: item.email,
          role: item.role,
          courses: item.courses.length,
          created_at: format(item.createdAt),
        });
      });
    }
  } else {
    if (data && data.users) {
      data.users.forEach((item: any) => {
        rows.push({
          id: item._id,
          name: item.name,
          email: item.email,
          role: item.role,
          courses: item.courses.length,
          created_at: format(item.createdAt),
        });
      });
    }
  }


  return (
    <div className="mt-[120px]">
      {isLoading ? (
        <Loader />
      ) : (
        <Box m="20px">
          <div className="w-full flex justify-end">
            <div
              className={`${Style.button} !w-[200px] dark:bg-[#57c7a3] !h-[35px] dark:border dark:border-[#ffffff6c]`}
              onClick={() => setOpen(true)} // Mở NewMember
            >
              Thêm thành viên
            </div>
          </div>
          {open && <NewMember onSubmit={handleNewMemberSubmit} onCancel={() => setOpen(false)} />}
          <Box
            m="40px 0 0 0"
            height="80vh"
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
                outline: "none",
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              },
              "& .MuiDataGrid-columnHeaders": {
                fontWeight: "bold",
                borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: theme === "dark" ? "#1F2A40" : "#F8F9FF",
              },
              "& .MuiDataGrid-row": {
                "&:hover": {
                  backgroundColor: theme === "dark" ? "#2A3E5B" : "#F0F4FF",
                  cursor: "pointer",
                },
                borderBottom:
                  theme === "dark"
                    ? "1px solid rgba(255, 255, 255, 0.1)"
                    : "1px solid rgba(0, 0, 0, 0.1)",
              },
              "& .MuiDataGrid-cell": {
                color: theme === "dark" ? "#fff" : "#000",
                padding: "10px", // Thêm padding cho ô
              },
              "& .MuiDataGrid-footerContainer": {
                background:
                  theme === "dark"
                    ? "linear-gradient(90deg, #3e4396, #6a74d1)"
                    : "linear-gradient(90deg, #A4A9FC, #D3D8FF)",
                color: theme === "dark" ? "#fff" : "#000",
                borderTop: "1px solid rgba(255, 255, 255, 0.2)",
              },
              "& .MuiCheckbox-root": {
                color:
                  theme === "dark"
                    ? `rgba(183, 235, 222, 1) !important`
                    : `rgba(0, 0, 0, 0.7) !important`,
              },
              "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                color: theme === "dark" ? "#fff !important" : "#000 !important",
              },
            }}
          >
            <DataGrid checkboxSelection rows={rows} columns={columns} />
          </Box>
        </Box>
      )}
    </div>
  );
};

export default AllTeam;
