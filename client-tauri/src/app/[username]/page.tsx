interface PageProps {
  params: { username: string };
}

export default function Page({ params }: PageProps) {
  const { username } = params;
  return <div>Username: {username}</div>;
}
