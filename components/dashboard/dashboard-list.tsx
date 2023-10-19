'use client';
import { formatMessageDate } from '@/lib/util';
import DashboardListItem from './dashboard-list-item';
interface DashboardListProps {
  initSnippets: {
    id: string;
    title: string;
    updatedAt: Date;
  }[];
}
export default function DashboardList({ initSnippets }: DashboardListProps) {
  return (
    <div className="flex flex-col items-center gap-y-2 lg:items-start lg:flex-row lg:gap-x-2 lg:flex-wrap w-full h-full overflow-hidden overflow-y-scroll">
      <DashboardListItem isSnippet={false} />
      {initSnippets?.map((snippet) => {
        return (
          <DashboardListItem
            key={snippet.id}
            snippetId={snippet.id}
            title={snippet.title}
            lastUpdated={formatMessageDate(snippet.updatedAt)}
            isSnippet
          />
        );
      })}
    </div>
  );
}
