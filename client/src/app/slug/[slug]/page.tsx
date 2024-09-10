//"use client";
//// pages/user/[username].tsx
//import { useEffect } from "react";
//import { useRouter } from "next/router";

//export default function UserPage({ username, correctUrl }) {
//  const router = useRouter();

//  useEffect(() => {
//    if (typeof window !== "undefined" && window.location.href !== correctUrl) {
//      window.history.replaceState({}, "", correctUrl);
//    }
//  }, [correctUrl]);

//  return (
//    <div>
//      {/* Your user page content */}
//      <h1>Welcome, {username}!</h1>
//    </div>
//  );
//}

//export async function getServerSideProps(context) {
//  const { username } = context.params;
//  const correctUrl = context.query.correctUrl as string;

//  return {
//    props: { username, correctUrl },
//  };
//}
