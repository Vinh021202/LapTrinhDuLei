import React, { useState, useEffect, FC } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Modal } from "@mui/material";
import { AiOutlineDelete, AiOutlineMail } from "react-icons/ai";
import { useTheme } from "next-themes";
import Loader from "../../Loader/Loader";
import { format } from "timeago.js";
import { useDeleteUsersMutation, useGetAllUsersQuery } from "@/redux/features/user/userApi";
import { Style } from "@/app/style/stylelogin";
import toast from "react-hot-toast";


type Props = {
};

const AllUsers:FC<Props> = ({props}) => {
  const { theme } = useTheme();
  const { isLoading, data, error ,refetch} = useGetAllUsersQuery({},{refetchOnMountOrArgChange: true});
  const [userId, setUserID] = useState("");
  const [open, setOpen] = useState(false);
  const [deleteUser, { isSuccess, error: deleteError }] = useDeleteUsersMutation();  

  const [rows, setRows] = useState<any[]>([]);

  useEffect(() => {
    if (data?.users && Array.isArray(data.users)) {
      const newRows = data.users.map((item: any) => ({
        id: item._id,
        name: item.name,
        email: item.email,
        role: item.role,
        courses: item.courses.length,
        created_at: format(item.createdAt),
      }));
      setRows(newRows);
    } else {
      console.error("Dữ liệu users không tồn tại hoặc không phải là mảng");
    }
  }, [data]);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "role", headerName: "Role", flex: 0.7 },
    { field: "courses", headerName: "Purchased Courses", flex: 0.8 },
    { field: "created_at", headerName: "Created At", flex: 0.7 },
    {
      field: "delete",
      headerName: "Delete",
      flex: 0.5,
      renderCell: (params: any) => {
        return (
          <Button variant="outlined" color="error"
          onClick={() => {
            setOpen(!open);
            setUserID(params.row.id);
          }}
          >
            <AiOutlineDelete className="dark:text-white text-black" />
          </Button>
        );
      },
    },
    {
      field: "emailLink",
      headerName: "Email",
      flex: 0.5,
      renderCell: (params: any) => {
        return (
          <a
            href={`mailto:${params.row.email}`}
            className="flex items-center justify-center w-full h-full "
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          >
            <AiOutlineMail className="dark:text-white text-black" />
          </a>
        );
      },
    }
  ];

  useEffect(() => {
    if (isSuccess) {
      setOpen(false);
      refetch();
      toast.success("Course Deleted Successfully");
    }
    if (deleteError) {  // Sử dụng deleteError thay vì error
      if ("data" in deleteError) {
        const errorMessage = deleteError as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [isSuccess, deleteError, refetch]);

  const handleDelete = async () => {
    const id = userId;
    await deleteUser(id);
  };

  return (
    <div className="mt-[120px]">
      {isLoading ? (
        <Loader />
      ) : (
        <Box m="20px">
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
          {open && (
            <Modal
              open={open}
              onClose={() => setOpen(!open)}
              aria-labelledby="modal-modal-title" // Sửa thành aria-labelledby
              aria-describedby="modal-modal-description" // Sửa thành aria-describedby
            >
              <Box className="absolute top-[50%] left-[50%] -translate-x-1/2">
                <h1 className={`${Style.title}`} id="modal-modal-title">
                  Bạn có chắc chắn muốn xóa khóa học này không?
                </h1>
                <div className="flex w-full items-center justify-between mb-6">
                  <div
                    className={`${Style.button} !w-[120px] h-[30px] bg-[#57c7a3]`}
                    onClick={() => setOpen(!open)}
                  >
                    Hủy
                  </div>
                  <div
                    className={`${Style.button} !w-[120px] h-[30px] bg-[#d63f]`}
                    onClick={handleDelete}
                  >
                    Xoá
                  </div>
                </div>
              </Box>
            </Modal>
          )}
        </Box>
      )}
    </div>
  );
};

export default AllUsers;
