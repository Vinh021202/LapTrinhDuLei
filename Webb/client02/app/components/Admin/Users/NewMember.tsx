import React, { useState } from 'react';

interface NewMemberProps {
  onSubmit: (email: string, role: string) => void; // Vai trò có thể là "Admin", "Teacher", hoặc "User"
  onCancel: () => void;
}

const NewMember: React.FC<NewMemberProps> = ({ onSubmit,onCancel }) => {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('Admin'); // Mặc định vai trò là "User"

  const handleSubmit = () => {
    onSubmit(email, role); // Truyền email và vai trò khi submit
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-md shadow-md">
      <h2 className="text-lg font-bold mb-4">Thêm Thành viên mới</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full px-3 py-2 border rounded-md mb-4 dark:bg-gray-700 dark:text-white"
      />
      <div className="flex items-center mb-4">
        <label className="mr-4">
          <input
            type="radio"
            value="Admin"
            checked={role === 'Admin'}
            onChange={(e) => setRole(e.target.value)}
            className="mr-2"
          />
          Admin
        </label>
        <label className="mr-4">
          <input
            type="radio"
            value="Teacher"
            checked={role === 'Teacher'}
            onChange={(e) => setRole(e.target.value)}
            className="mr-2"
          />
          Teacher
        </label>
        <label>
          <input
            type="radio"
            value="User"
            checked={role === 'User'}
            onChange={(e) => setRole(e.target.value)}
            className="mr-2"
          />
          User
        </label>
      </div>
      <div className='flex items-center justify-between'>
      <button
        onClick={handleSubmit}
        className="w-[40%] h-[40px] bg-[#37a39a] text-center justify-center text-[#fff] rounded mt-8 cursor-pointer"
      >
        Thêm
      </button>
      <button onClick={onCancel}
     className="w-[40%] h-[40px] bg-[#37a39a] text-center justify-center text-[#fff] rounded mt-8 cursor-pointer"
      >Huỷ</button>
    </div>
    </div>
  );
};

export default NewMember;
