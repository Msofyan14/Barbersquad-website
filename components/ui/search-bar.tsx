"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Input } from "./input";
import { useEffect, useState } from "react";

export function SearchBar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState("");

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const params = new URLSearchParams(searchParams);
      if (search) {
        params.set("search", search);
      } else {
        params.delete("search");
      }

      router.replace(`${pathname}?${params.toString()}`);
    }, 2000);

    return () => clearTimeout(delayDebounceFn);
  }, [search]);

  return (
    <div>
      <Input
        placeholder="Filter names..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-sm"
      />
    </div>
  );
}
