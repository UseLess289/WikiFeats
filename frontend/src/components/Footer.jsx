function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="copyright">
          &copy; {currentYear} WikiFeats
        </div>
      </div>
    </footer>
  )
}

export default Footer 