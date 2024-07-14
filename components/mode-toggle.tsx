"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

export function ModeToggle() {
  const { setTheme } = useTheme();
  var theme = true;
  const onClick = () => {
    theme ? setTheme("light") : setTheme("dark");
    theme = !theme;
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="rounded-[24px]"
          variant="outline"
          size="icon"
          onClick={onClick}
        >
          <Sun className="text-black h-[1.2rem] w-[1.2rem] rotate-0 scale-100  transition-all dark:-rotate-90 dark:scale-0 border-black solid" />
          <Moon className="bg-transparent absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 border-0" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      {/* <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent> */}
    </DropdownMenu>
  );
}
