"use client";

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export function useRouteChange() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [route, setRoute] = useState({ pathname, searchParams });

  useEffect(() => {
    setRoute({ pathname, searchParams });
  }, [pathname, searchParams]);

  return route;
}
