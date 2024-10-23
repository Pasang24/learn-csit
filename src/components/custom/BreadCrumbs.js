import React from "react";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

function BreadCrumbs({ crumbs = [], className = "" }) {
  return (
    <Breadcrumb>
      <BreadcrumbList className={className}>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/">Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {crumbs.map((crumb, index) => (
          <React.Fragment key={index}>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              {crumb.href ? (
                <BreadcrumbLink className="capitalize" asChild>
                  <Link href={crumb.href}>{crumb.name}</Link>
                </BreadcrumbLink>
              ) : (
                <BreadcrumbPage className="capitalize">
                  {crumbs.length > 2 && index === 0 ? (
                    <BreadcrumbEllipsis />
                  ) : (
                    crumb.name
                  )}
                </BreadcrumbPage>
              )}
            </BreadcrumbItem>
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export default BreadCrumbs;
