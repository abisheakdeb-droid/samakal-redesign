import NotificationSender from "@/components/NotificationSender";

export default function NotificationsPage() {
  return (
    <div className="p-8 max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">নোটিফিকেশন সেন্টার</h1>
        <p className="text-gray-500">আপনার সাবস্ক্রাইবারদের ব্রেকিং নিউজ এবং আপডেট পাঠান।</p>
      </div>
      
      <NotificationSender />
    </div>
  );
}
