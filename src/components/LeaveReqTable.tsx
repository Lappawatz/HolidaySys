import { useEffect, useState } from "react";

type LeaveRequest = {
  id: number;
  fullName: string;
  department: string;
  email: string;
  phone: string;
  leaveType: string;
  reason: string;
  startDate: string;
  endDate: string;
  status?: string; // ถ้ามีสถานะ
};

export default function LeaveRequestsTable() {
  const [data, setData] = useState<LeaveRequest[]>([]);
  const [filteredData, setFilteredData] = useState<LeaveRequest[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://localhost:4000/leave") // ปรับเป็น endpoint backend ของคุณ
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch data");
        return res.json();
      })
      .then((data) => {
        setData(data);
        setFilteredData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = data.filter(
      (leave) =>
        leave.fullName.toLowerCase().includes(term) ||
        leave.startDate.includes(term)
    );
    setFilteredData(filtered);
  };

  if (loading) return <p className="text-center text-lg font-semibold">กำลังโหลดข้อมูล...</p>;
  if (error) return <p className="text-center text-red-500 font-semibold">เกิดข้อผิดพลาด: {error}</p>;

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6 text-white">รายการคำขอลาหยุด</h1>
      <div className="mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="ค้นหาโดยชื่อ-นามสกุล หรือ วันที่ขอลา..."
          className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <table className="w-full border border-gray-300 shadow-lg rounded-lg text-black">
          <thead className="bg-blue-100">
            <tr>
              <th className="border px-4 py-3 text-left text-blue-600 font-semibold">ชื่อ-นามสกุล</th>
              <th className="border px-4 py-3 text-left text-blue-600 font-semibold">สังกัด/ตำแหน่ง</th>
              <th className="border px-4 py-3 text-left text-blue-600 font-semibold">อีเมล์</th>
              <th className="border px-4 py-3 text-left text-blue-600 font-semibold">เบอร์โทรศัพท์</th>
              <th className="border px-4 py-3 text-left text-blue-600 font-semibold">ประเภทการลา</th>
              <th className="border px-4 py-3 text-left text-blue-600 font-semibold">สาเหตุการลา</th>
              <th className="border px-4 py-3 text-left text-blue-600 font-semibold">วันที่ขอลา</th>
              <th className="border px-4 py-3 text-left text-blue-600 font-semibold">ถึงวันที่</th>
              <th className="border px-4 py-3 text-left text-blue-600 font-semibold">สถานะ</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((leave, index) => (
              <tr
                key={leave.id}
                className={`${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-blue-50 transition-all`}
              >
                <td className="border px-4 py-3">{leave.fullName}</td>
                <td className="border px-4 py-3">{leave.department}</td>
                <td className="border px-4 py-3">{leave.email}</td>
                <td className="border px-4 py-3">{leave.phone}</td>
                <td className="border px-4 py-3">{leave.leaveType}</td>
                <td className="border px-4 py-3">{leave.reason}</td>
                <td className="border px-4 py-3">{leave.startDate}</td>
                <td className="border px-4 py-3">{leave.endDate}</td>
                <td
                  className={`border px-4 py-3 font-semibold ${
                    leave.status === "อนุมัติ"
                      ? "text-green-600"
                      : leave.status === "ปฏิเสธ"
                      ? "text-red-600"
                      : "text-gray-600"
                  }`}
                >
                  {leave.status || "รอดำเนินการ"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
