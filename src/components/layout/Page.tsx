type PageProps = {
  title?: string;
  children: React.ReactNode;
};

export default function Page({ title, children }: PageProps) {
  return (
    <div className="wrapper">
      <h2>{title}</h2>
      {children}
    </div>
  );
}
