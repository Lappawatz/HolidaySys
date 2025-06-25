import LeaveRequestsTable from "../components/LeaveReqTable";
import { Kanit } from "next/font/google";
const kanit = Kanit({
  subsets: ["latin", "thai"], // เพิ่ม thai เพื่อรองรับภาษาไทย
  variable: "--font-kanit",   // ตั้งชื่อ variable
  weight: ["400", "500", "700"], // เลือกน้ำหนักที่ใช้
});
export default function Home() {
  return (
    <div className={`${kanit.variable} font-sans`}>
        {/* <div className={`${geistSans.variable} ${geistMono.variable} font-sans`}> */}
          <div className="py-10 min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 ">
              <LeaveRequestsTable />
          </div>
        </div>
  );
}
