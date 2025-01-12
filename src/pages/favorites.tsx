import { ReactElement } from "react";
import LayoutWithNavigation from "@/components/layouts/LayoutWithNavigation";
import SearchBar from "@/components/SearchBar";
import useSearch from "@/hooks/useSearch";
import { createClient } from "@/services/supabase/server-props";
import type { User } from '@supabase/supabase-js'
import type { GetServerSidePropsContext } from 'next'




export default function FavoritePage({ user }: { user: User }) {
  const { refetch, searchedVideos, setSearchQuery, isLoading, searchQuery } = useSearch();

  return (
    <div>
      <SearchBar
        isLoading={isLoading}
        onSearch={refetch}
        onChange={(e) => setTimeout(() => setSearchQuery(e.target.value), 500)}
      />
      <div className="mt-32">
        <p className="text-center text-white">No Favorites available for user {user.email}</p>
      </div>
    </div>
  );
}

FavoritePage.getLayout = function (page: ReactElement) {
  return <LayoutWithNavigation>{page}</LayoutWithNavigation>;
};



export async function getServerSideProps(context: GetServerSidePropsContext) {
  const supabase = createClient(context)

  const { data, error } = await supabase.auth.getUser()

  if (error || !data) {
    return {
      redirect: {
        destination: '/register',
        permanent: false,
      },
    }
  }

  return {
    props: {
      user: data.user,
    },
  }
}