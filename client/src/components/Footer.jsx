const Footer = () => {
  return (
    <div className="w-screen bg-[#0c4724] mt-20 p-8 pb-2 grid gap-y-3 justify-center">
      <div>
        <p className="text-white text-3xl font-bold text-center">
          SportsMania
        </p>
        <p className="text-white text-base">
          Buy Sports Good in Reasonable and Better Quality
        </p>
      </div>
      <div>
        <ul className="flex gap-4 text-lg font-normal justify-center text-white py-3">
          <li>Outdoor</li>
          <li>Indoor</li>
          <li>Digital</li>
          <li>Home</li>
        </ul>
      </div>
      <p className="text-white text-center">Copyright &copy; 2023 </p>
    </div>
  );
};

export default Footer;
