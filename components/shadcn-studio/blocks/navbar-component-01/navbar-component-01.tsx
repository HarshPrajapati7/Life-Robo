import { MenuIcon, SearchIcon } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Logo from "@/components/shadcn-studio/logo";
import { cn } from "@/lib/utils";

type NavigationItem = {
  title: string;
  href: string;
  external?: boolean;
}[];

const Navbar = ({
  navigationData,
  activePath,
}: {
  navigationData: NavigationItem;
  activePath?: string;
}) => {
  const middleIndex = Math.ceil(navigationData.length / 2);
  const leftItems = navigationData.slice(0, middleIndex);
  const rightItems = navigationData.slice(middleIndex);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-4 z-50 flex justify-center px-3">
      <div className="pointer-events-auto relative w-full max-w-5xl overflow-hidden rounded-full border border-white/15 bg-black/45 shadow-[0_20px_55px_rgba(0,0,0,0.55)] backdrop-blur-2xl animate-in fade-in-0 slide-in-from-top-2 duration-500">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(255,118,176,0.28),transparent_52%),radial-gradient(circle_at_80%_100%,rgba(255,142,84,0.24),transparent_45%)]" />

        <div className="relative mx-auto flex items-center gap-3 px-4 py-2.5 sm:px-6">
          <div className="hidden flex-1 items-center justify-end gap-4 text-sm font-medium text-white/70 md:flex lg:gap-6">
            {leftItems.map((item, index) => {
              const isActive = activePath === item.href;

              if (item.external) {
                return (
                  <a
                    key={`${item.title}-${index}`}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className={cn(
                      "rounded-full px-3 py-1.5 transition-colors duration-300 hover:text-white",
                      isActive && "bg-white/10 text-white"
                    )}
                  >
                    {item.title}
                  </a>
                );
              }

              return (
                <Link
                  key={`${item.title}-${index}`}
                  href={item.href}
                  className={cn(
                    "rounded-full px-3 py-1.5 transition-colors duration-300 hover:text-white",
                    isActive && "bg-white/10 text-white"
                  )}
                >
                  {item.title}
                </Link>
              );
            })}
          </div>

          <Link href="/" className="shrink-0 rounded-full border border-white/10 bg-black/30 px-3 py-1.5">
            <Logo className="text-white" />
          </Link>

          <div className="hidden flex-1 items-center justify-start gap-4 text-sm font-medium text-white/70 md:flex lg:gap-6">
            {rightItems.map((item, index) => {
              const isActive = activePath === item.href;

              if (item.external) {
                return (
                  <a
                    key={`${item.title}-${index}`}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className={cn(
                      "rounded-full px-3 py-1.5 transition-colors duration-300 hover:text-white",
                      isActive && "bg-white/10 text-white"
                    )}
                  >
                    {item.title}
                  </a>
                );
              }

              return (
                <Link
                  key={`${item.title}-${index}`}
                  href={item.href}
                  className={cn(
                    "rounded-full px-3 py-1.5 transition-colors duration-300 hover:text-white",
                    isActive && "bg-white/10 text-white"
                  )}
                >
                  {item.title}
                </Link>
              );
            })}
          </div>

          <div className="ml-auto flex items-center gap-2 md:ml-0">
            <Button
              variant="ghost"
              size="icon"
              className="size-9 rounded-full border border-white/10 bg-black/30 text-white/80 transition-all duration-300 hover:bg-white/10 hover:text-white"
            >
              <SearchIcon className="size-4" />
              <span className="sr-only">Search</span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger className="md:hidden" asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="size-9 rounded-full border-white/20 bg-black/40 text-white hover:bg-white/10"
                >
                  <MenuIcon className="size-4" />
                  <span className="sr-only">Menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-56 rounded-xl border-white/20 bg-[#140814]/95 text-white shadow-2xl backdrop-blur-xl"
                align="end"
              >
                <DropdownMenuGroup>
                  {navigationData.map((item, index) => (
                    <DropdownMenuItem
                      key={`${item.title}-${index}`}
                      className="cursor-pointer rounded-lg text-white/85 focus:bg-white/10 focus:text-white"
                    >
                      {item.external ? (
                        <a className="w-full" href={item.href} target="_blank" rel="noreferrer">
                          {item.title}
                        </a>
                      ) : (
                        <Link className="block w-full" href={item.href}>
                          {item.title}
                        </Link>
                      )}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
