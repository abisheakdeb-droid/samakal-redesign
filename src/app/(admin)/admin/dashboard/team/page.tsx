import { fetchUsers } from "@/lib/actions-team";
import TeamTable from "@/components/dashboard/team/TeamTable";
import AddMemberDialog from "@/components/dashboard/team/AddMemberDialog";
import { Users } from "lucide-react";

export const metadata = {
  title: "Team Management | Samakal CMS",
};

export const dynamic = 'force-dynamic';

export default async function TeamPage() {
  const users = await fetchUsers();

  return (
    <div className="space-y-6">
       {/* Header */}
       <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
              <Users className="text-brand-red" />
              Editorial Team
            </h1>
            <p className="text-gray-500 mt-1">Manage accounts, roles, and permissions.</p>
          </div>
          <AddMemberDialog />
       </div>

       {/* Stats Cards (Optional but nice) */}
       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
           <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
               <div>
                   <p className="text-sm font-medium text-gray-500 uppercase">Total Members</p>
                   <h3 className="text-3xl font-bold text-gray-900 mt-1">{users.length}</h3>
               </div>
               <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
                   <Users size={24} />
               </div>
           </div>
           
           <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
               <div>
                   <p className="text-sm font-medium text-gray-500 uppercase">Admins</p>
                   <h3 className="text-3xl font-bold text-gray-900 mt-1">
                      {users.filter(u => u.role === 'admin').length}
                   </h3>
               </div>
               <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center text-purple-600">
                   <Users size={24} />
               </div>
           </div>

           <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
               <div>
                   <p className="text-sm font-medium text-gray-500 uppercase">Editors</p>
                   <h3 className="text-3xl font-bold text-gray-900 mt-1">
                      {users.filter(u => u.role === 'editor').length}
                   </h3>
               </div>
               <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center text-green-600">
                   <Users size={24} />
               </div>
           </div>
       </div>

       {/* Main Table */}
       <TeamTable users={users} />
    </div>
  );
}
