export default function UserProfilePage({ params }: { params: { username: string } }) {
  return (
    <div>
      <h1>Profile for {params.username}</h1>
    </div>
  );
}
