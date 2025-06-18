import { useState } from "react";
import type { LeaveRequest } from "../types/leave";
import { useRouter } from "next/router";
export default function LeaveRequestForm() {
  const [formData, setFormData] = useState<LeaveRequest>({
    fullName: "",
    department: "",
    email: "",
    phone: "",
    leaveType: "",
    reason: "",
    startDate: "",
    endDate: "",
  });

  const router = useRouter();
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  const today = new Date();
  const start = new Date(formData.startDate);
  const end = new Date(formData.endDate);

  // เงื่อนไข: ห้ามลาย้อนหลัง
  if (start < today) {
    alert("ไม่สามารถลาย้อนหลังได้");
    return;
  }

  // เงื่อนไข: พักร้อนต้องลาล่วงหน้าอย่างน้อย 3 วัน
  if (formData.leaveType === "ลาพักร้อน") {
    const daysInAdvance = Math.floor(
      (start.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (daysInAdvance < 3) {
      alert("การลาพักร้อนต้องแจ้งล่วงหน้าอย่างน้อย 3 วัน");
      return;
    }

    // เงื่อนไข: ลาพักร้อนไม่เกิน 2 วันติดกัน
    const leaveDuration = Math.floor(
      (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (leaveDuration >= 2) {
      alert("การลาพักร้อนต้องไม่เกิน 2 วันติดกัน");
      return;
    }
  }

  console.log("ส่งข้อมูล:", formData);
  fetch("http://localhost:4000/leave", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(formData),
})
  .then((res) => {
    if (!res.ok) throw new Error("เกิดข้อผิดพลาดในการส่งข้อมูล");
    return res.json();
  })
  .then((data) => {
    alert("ส่งคำขอลาสำเร็จแล้ว!");
    console.log("Response:", data);
    router.push("/leaveStatus");
  })
  .catch((err) => {
    console.error("Error:", err);
    alert("เกิดข้อผิดพลาดในการส่งคำขอ");
  });

};


  return (
<div className="max-w-3xl mx-auto p-8 bg-white rounded-xl shadow-lg flex flex-col items-center justify-center text-gray-800">
  <h2 className="text-2xl font-extrabold mb-8 text-center text-blue-900">ฟอร์มขออนุญาตลาหยุด</h2>
  <form onSubmit={handleSubmit} className="space-y-6 w-full">
    <div>
      <label className="block text-lg font-medium mb-2">ชื่อ - นามสกุล</label>
      <input
        type="text"
        name="fullName"
        value={formData.fullName}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
    </div>

    <div>
      <label className="block text-lg font-medium mb-2">สังกัด/ตำแหน่ง</label>
      <input
        type="text"
        name="department"
        value={formData.department}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
    </div>

    <div>
      <label className="block text-lg font-medium mb-2">อีเมล์</label>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
    </div>

    <div>
      <label className="block text-lg font-medium mb-2">เบอร์โทรศัพท์</label>
      <input
        type="tel"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
    </div>

    <div>
      <label className="block text-lg font-medium mb-2">ประเภทการลา</label>
      <select
        name="leaveType"
        value={formData.leaveType}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      >
        <option value="" disabled>-- เลือกประเภทการลา --</option>
        <option value="ลากิจ">ลากิจ</option>
        <option value="ลาป่วย">ลาป่วย</option>
        <option value="ลาพักร้อน">ลาพักร้อน</option>
        <option value="อื่นๆ">อื่นๆ</option>
      </select>
    </div>

    <div>
      <label className="block text-lg font-medium mb-2">สาเหตุการลา</label>
      <textarea
        name="reason"
        value={formData.reason}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows={4}
        required
      />
    </div>

    <div className="grid grid-cols-2 gap-6">
      <div>
        <label className="block text-lg font-medium mb-2">วันที่ขอลา</label>
        <input
          type="date"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div>
        <label className="block text-lg font-medium mb-2">ถึงวันที่</label>
        <input
          type="date"
          name="endDate"
          value={formData.endDate}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
    </div>

    <button
      type="submit"
      className="w-full bg-green-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition duration-200"
    >
      ส่งคำขอ
    </button>
  </form>
</div>

  );
}
