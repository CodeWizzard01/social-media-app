import Link from 'next/link';
import React, { useContext } from 'react'
import { ModeToggle } from './ui/mode-toggle';
import { UserContext } from '@/types/types';
import Typography from './ui/typography';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { signoutAction } from '@/app/signin/actions';
import { useRouter } from 'next/navigation';
import AddPost from '@/app/posts/add-post';

function Header() {
  const userContext = useContext(UserContext);
  const { userDetails } = userContext;
  const router = useRouter();

  const handleLogout = async () => {
    await signoutAction();
    userContext.setUserDetails(null);
     router.push("/signin");
  };
  return (
    <header className="border-b py-3 flex flex-row justify-between">
      <nav className="flex items-center space-x-4 lg:space-x-6">
        {userDetails !== null && (
          <>
            <Link
              href="/posts"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Posts
            </Link>
            <AddPost />
          </>
        )}
      </nav>
      {userDetails === null ? (
        <nav className="flex items-center space-x-4 lg:space-x-6">
          <Link
            href="/signin"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Signup
          </Link>
          <ModeToggle />
        </nav>
      ) : (
        <div className="flex items-center space-x-4">
          <Typography element="p" as="p">
            {userDetails?.name}
          </Typography>
          <Avatar>
            <AvatarImage src={userDetails?.profilePhoto} className="w-7 h-7" />
            <AvatarFallback>{userDetails?.name}</AvatarFallback>
          </Avatar>
          <Link
            href="/"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            onClick={handleLogout}
          >
            Logout
          </Link>
          <ModeToggle />
        </div>
      )}
    </header>
  );
}

export default Header
