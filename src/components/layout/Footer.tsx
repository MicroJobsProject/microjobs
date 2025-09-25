function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <div className="wrapper">
        <div className="flex items-center justify-center">
          <span>{`© ${currentYear} MicroJobs Project. All rights reserved.`}</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
