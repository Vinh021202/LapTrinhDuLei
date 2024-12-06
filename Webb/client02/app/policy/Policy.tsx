import React from "react";
import { Style } from "../style/stylelogin";

type Props = {};

const Policy = (props: Props) => {
  return (
    <div>
      <div className={`w-[95%] md:w-[92%] m-auto py-2 text-black px-3 dark:text-white `}>
        <h1 className={`${Style.title} !text-start pt-2 items-center justify-center`}>
          Điều khoản và điều kiện của nền tảng
        </h1>
        <ul style={{ listStyle: "unset", marginLeft: "15px" }}>
          <h1 className="font-Poppins text-[18px]">1. Giới thiệu</h1>
          <br />
          <p className="py-2 ml-[-15px] text-[16px] font-Poppins leading-8 whitespace-pre-line ">
            Chào mừng bạn đến với nền tảng quản lý khóa học trực tuyến. Bằng
            cách sử dụng nền tảng của chúng tôi, bạn đồng ý tuân thủ các điều
            khoản và điều kiện sau đây. Nếu không đồng ý với bất kỳ phần nào của
            các điều khoản này, vui lòng không sử dụng dịch vụ của chúng tôi.
          </p>
          <br />
          <h1 className="font-Poppins text-[18px]">2. Tài khoản người dùng</h1>
          <br />
          <p className="py-2 ml-[-15px] text-[16px] font-Poppins leading-8 whitespace-pre-line ">
            Người dùng phải cung cấp thông tin chính xác và cập nhật khi đăng ký
            tài khoản. Người dùng chịu trách nhiệm bảo mật thông tin tài khoản
            của mình và thông báo ngay lập tức nếu phát hiện có dấu hiệu truy
            cập trái phép. Nền tảng có quyền tạm ngưng hoặc hủy tài khoản nếu
            phát hiện người dùng vi phạm quy định.
          </p>
          <br />
          <h1 className="font-Poppins text-[18px]">
            3.Quyền và nghĩa vụ của người dùng
          </h1>
          <br />
          <p className="py-2 ml-[-15px] text-[16px] font-Poppins leading-8 whitespace-pre-line ">
            Người dùng có quyền: Truy cập và sử dụng các khóa học đã đăng ký.
            Đưa ra phản hồi hoặc đánh giá về khóa học. Người dùng có nghĩa vụ:
            Không sử dụng nền tảng cho mục đích gian lận, vi phạm pháp luật,
            hoặc phát tán nội dung không phù hợp. Thanh toán đầy đủ chi phí (nếu
            có) để truy cập các dịch vụ hoặc khóa học trên nền tảng.
          </p>
          <br />
          <h1 className="font-Poppins text-[18px]">
            4. Quyền và trách nhiệm của nền tảng
          </h1>
          <br />
          <p className="py-2 ml-[-15px] text-[16px] font-Poppins leading-8 whitespace-pre-line ">
            Nền tảng có quyền: Chỉnh sửa, cập nhật hoặc gỡ bỏ nội dung hoặc khóa
            học bất kỳ lúc nào. Thu hồi quyền truy cập của người dùng nếu vi
            phạm điều khoản sử dụng. Nền tảng có trách nhiệm: Đảm bảo chất lượng
            dịch vụ, khóa học và hỗ trợ người dùng. Bảo mật thông tin cá nhân
            của người dùng theo chính sách bảo mật.
          </p>
          <br />
          <h1 className="font-Poppins text-[18px]">
            5. Chính sách thanh toán và hoàn tiền
          </h1>
          <br />
          <p className="py-2 ml-[-15px] text-[16px] font-Poppins leading-8 whitespace-pre-line ">
            Người dùng có thể thanh toán qua các phương thức được cung cấp trên
            nền tảng. Nền tảng không hoàn tiền trong các trường hợp: Người dùng
            đã hoàn thành khóa học. Vi phạm điều khoản sử dụng. Hoàn tiền chỉ áp
            dụng nếu khóa học không được cung cấp như cam kết hoặc phát sinh lỗi
            từ phía nền tảng.
          </p>
          <br />
          <h1 className="font-Poppins text-[18px]">6. Quy định về nội dung</h1>
          <br />
          <p className="py-2 ml-[-15px] text-[16px] font-Poppins leading-8 whitespace-pre-line ">
            Mọi nội dung trên nền tảng (bao gồm khóa học, tài liệu, hình ảnh,
            video,...) thuộc sở hữu trí tuệ của nền tảng hoặc các bên hợp tác.
            Người dùng không được sao chép, phân phối hoặc sử dụng nội dung cho
            mục đích thương mại khi chưa có sự đồng ý bằng văn bản.
          </p>
          <br />
          <h1 className="font-Poppins text-[18px]">7. Giới hạn trách nhiệm</h1>
          <br />
          <p className="py-2 ml-[-15px] text-[16px] font-Poppins leading-8 whitespace-pre-line ">
            Nền tảng không chịu trách nhiệm cho bất kỳ tổn thất, thiệt hại nào
            phát sinh từ việc sử dụng dịch vụ, trừ khi có lỗi trực tiếp từ phía
            nền tảng. Người dùng tự chịu trách nhiệm với các hành động hoặc
            quyết định học tập dựa trên nội dung khóa học.
          </p>
          <br />
          <h1 className="font-Poppins text-[18px]">8. Thay đổi điều khoản</h1>
          <br />
          <p className="py-2 ml-[-15px] text-[16px] font-Poppins leading-8 whitespace-pre-line ">
            Nền tảng có quyền thay đổi các điều khoản và điều kiện bất kỳ lúc
            nào. Thông báo sẽ được gửi qua email hoặc đăng tải trên nền tảng.
            Người dùng tiếp tục sử dụng dịch vụ sau khi điều khoản được thay đổi
            đồng nghĩa với việc chấp nhận các thay đổi này.
          </p>
          <br />
          <h1 className="font-Poppins text-[18px]">9. Cam kết</h1>
          <br />
          <p className="py-2 ml-[-15px] text-[16px] font-Poppins leading-8 whitespace-pre-line ">
            Người dùng cam kết đọc, hiểu và đồng ý tuân thủ tất cả các điều
            khoản và điều kiện trên khi sử dụng nền tảng.
          </p>
          <br />
        </ul>
      </div>
    </div>
  );
};

export default Policy;
