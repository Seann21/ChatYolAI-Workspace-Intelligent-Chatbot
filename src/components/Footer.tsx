export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 bg-[#030712] text-gray-500 border-t border-white/10 text-xs sm:text-sm">
      <div className="container mx-auto px-4 text-center">
        <p>© {currentYear} ChatYol AI. Hak cipta dilindungi.</p>
      </div>
    </footer>
  );
};
