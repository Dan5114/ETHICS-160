// resources/js/Pages/Dashboard.tsx

import React from 'react';
import { Head, Link } from '@inertiajs/react';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import StatsCard from '@/Components/Dashboard/StatsCard';
import RecentApplicationsList from '@/Components/Dashboard/RecentApplicationsList';
import ReviewTypeStats from '@/Components/Dashboard/ReviewTypeStats';
import { DashboardPageProps } from '@/types';
import {
  ClockRotateRight,
  FeDocument,
  MdiCalendar,
} from '@/Components/Icons';

const Dashboard: React.FC<DashboardPageProps> = ({ stats, auth }) => {
  const isStaffOrChair = ['staff', 'chairperson'].includes(auth.user.role);

  return (
    <Authenticated header="Dashboard">
      <Head title="Dashboard" />

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatsCard
            title="Total Applications"
            value={stats.totalApplications}
            icon={<FeDocument className="w-6 h-6 text-[#00582A]" />}
            color="primary"
          />
          <StatsCard
            title="In Progress"
            value={stats.applicationsByStatus.inProgress}
            icon={<ClockRotateRight className="w-6 h-6 text-[#00582A]" />}
            color="primary"
          />
          <StatsCard
            title="Upcoming Meetings"
            value={stats.upcomingMeetings.length}
            icon={<MdiCalendar className="w-6 h-6 text-[#00582A]" />}
            color="primary"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ReviewTypeStats data={stats.applicationsByReviewType} />
          <RecentApplicationsList applications={stats.recentApplications} />
        </div>

        {isStaffOrChair && (
          <div className="space-y-4">
            <h2 className="text-xl font-custom text-[#00582A]">Pending Application Statuses</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatsCard
                title="Review Application Requirements"
                value={stats.pending.pendingRequirements}
                icon={<FeDocument className="w-6 h-6 text-[#00582A]" />}
                as={Link}
                href={`${route('applications.index')}?selectedStep=1`}
                color="primary"
              />
              <StatsCard
                title="Assign Protocol Code"
                value={stats.pending.pendingProtocols}
                icon={<ClockRotateRight className="w-6 h-6 text-[#00582A]" />}
                as={Link}
                href={`${route('applications.index')}?selectedStep=2`}
                color="primary"
              />
              <StatsCard
                title="Take Initial Review"
                value={stats.pending.pendingInitialReviews}
                icon={<MdiCalendar className="w-6 h-6 text-[#00582A]" />}
                as={Link}
                href={`${route('applications.index')}?selectedStep=3`}
                color="primary"
              />
              {/* add other pending steps similarly */}
            </div>
          </div>
        )}
      </div>
    </Authenticated>
  );
};

export default Dashboard;
