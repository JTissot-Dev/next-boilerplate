"use client"

import { useState } from "react";
import type { User } from "better-auth";
import clsx from "clsx";
import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Sparkles,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { ConfirmDialog } from "@/components/common/ConfirmDialog";
import useSignOut from "@/features/auth/api/use-signout";


export function NavUser({
  user,
}: {
  user: User
}) {

  const { isMobile } = useSidebar()
  const [isOpenLogoutDialog, setIsOpenLogoutDialog] = useState<boolean>(false);
  const { signOut } = useSignOut();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div
                className={clsx(
                  "aspect-square cursor-pointer",
                  "h-8 w-8 bg-primary hover:bg-primary/90",
                  "rounded-full flex justify-center items-center",
                )}
              >
                <span className="text-lg text-white mb-1">
                  {user.name?.slice(0, 1)}
                </span>
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{user.name}</span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <div
                  className={clsx(
                    "aspect-square cursor-pointer",
                    "h-8 w-8 bg-primary hover:bg-primary/90",
                    "rounded-full flex justify-center items-center",
                  )}
                >
                  <span className="text-lg text-white mb-1">
                    {user.name?.slice(0, 1)}
                  </span>
                </div>
                <div className="grid flex-1 text-left text-sm">
                  <span className="truncate font-semibold">{user.name}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Sparkles />
                Passer à la version Pro
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <BadgeCheck />
                Compte
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CreditCard />
                Facturation
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bell />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => setIsOpenLogoutDialog(true)}
            >
              <LogOut />
              Se déconnecter
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
      <ConfirmDialog
        isOpen={isOpenLogoutDialog}
        setIsOpen={setIsOpenLogoutDialog}
        title="Déconnexion"
        description="Êtes-vous sûr de vouloir vous déconnecter ?"
        onConfirm={signOut}
      />
    </SidebarMenu>
  )
}
