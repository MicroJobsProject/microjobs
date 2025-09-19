type PageProps = {
  children: React.ReactNode;
};

export default function Page({ children }: PageProps) {
  return <div className="page">{children}</div>;
}
