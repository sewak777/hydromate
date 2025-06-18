import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Droplets, Home, User, Menu, LogOut } from "lucide-react";

export default function Navigation() {
  const [location] = useLocation();
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/profile", label: "Profile", icon: User },
  ];

  const handleLogout = () => {
    window.location.href = "/api/logout";
  };

  return (
    <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md shadow-sm z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 water-gradient rounded-full flex items-center justify-center">
              <Droplets className="text-white w-4 h-4" />
            </div>
            <span className="text-xl font-bold text-[hsl(var(--primary-blue))]">HydroFlow</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                    location === item.href
                      ? "bg-[hsl(var(--primary-blue))]/10 text-[hsl(var(--primary-blue))] font-medium"
                      : "text-[hsl(var(--text-light))] hover:text-[hsl(var(--primary-blue))] hover:bg-[hsl(var(--primary-blue))]/5"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* User Menu - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <Avatar className="w-8 h-8">
                <AvatarImage src={user?.profileImageUrl} alt="Profile" />
                <AvatarFallback className="bg-[hsl(var(--primary-blue))]/10 text-[hsl(var(--primary-blue))]">
                  {user?.firstName?.[0] || user?.email?.[0] || "U"}
                </AvatarFallback>
              </Avatar>
              <div className="text-sm">
                <div className="font-medium">
                  {user?.firstName || user?.email?.split("@")[0] || "User"}
                </div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="text-[hsl(var(--text-light))] hover:text-red-600"
            >
              <LogOut className="w-4 h-4" />
            </Button>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col h-full">
                  {/* User Info */}
                  <div className="flex items-center space-x-3 p-4 border-b">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={user?.profileImageUrl} alt="Profile" />
                      <AvatarFallback className="bg-[hsl(var(--primary-blue))]/10 text-[hsl(var(--primary-blue))]">
                        {user?.firstName?.[0] || user?.email?.[0] || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">
                        {user?.firstName || user?.email?.split("@")[0] || "User"}
                      </div>
                      <div className="text-sm text-[hsl(var(--text-light))]">
                        {user?.email}
                      </div>
                    </div>
                  </div>

                  {/* Navigation Items */}
                  <div className="flex-1 py-4">
                    {navItems.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          className={`flex items-center space-x-3 px-4 py-3 transition-colors ${
                            location === item.href
                              ? "bg-[hsl(var(--primary-blue))]/10 text-[hsl(var(--primary-blue))] font-medium border-r-2 border-[hsl(var(--primary-blue))]"
                              : "text-[hsl(var(--text-light))] hover:text-[hsl(var(--primary-blue))] hover:bg-[hsl(var(--primary-blue))]/5"
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                          <span>{item.label}</span>
                        </Link>
                      );
                    })}
                  </div>

                  {/* Logout Button */}
                  <div className="p-4 border-t">
                    <Button
                      variant="ghost"
                      onClick={handleLogout}
                      className="w-full justify-start text-[hsl(var(--text-light))] hover:text-red-600"
                    >
                      <LogOut className="w-4 h-4 mr-3" />
                      Sign Out
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
