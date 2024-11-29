import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-400 via-pink-500 to-purple-600">
      <div className="container mx-auto pt-4 px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 pt-4 px-8">
          {/* კომპანია */}
          <div>
            <h4 className="text-xl font-semibold mb-4">კომპანია</h4>
            <ul>
              <li><a href="#" className="hover:text-blue-500">ჩვენ შესახებ</a></li>
              <li><a href="#" className="hover:text-blue-500">კონტაქტი</a></li>
              <li><a href="#" className="hover:text-blue-500">კონფიდენციალურობა</a></li>
              <li><a href="#" className="hover:text-blue-500">მომსახურების პირობები</a></li>
            </ul>
          </div>

          {/* სწრაფი ბმულები */}
          <div>
            <h4 className="text-xl font-semibold mb-4">სწრაფი ბმულები</h4>
            <ul>
              <li><a href="#" className="hover:text-blue-500">მთავარი</a></li>
              <li><a href="#" className="hover:text-blue-500">პროდუქტები</a></li>
              <li><a href="#" className="hover:text-blue-500">მომსახურებები</a></li>
              <li><a href="#" className="hover:text-blue-500">ბლოგი</a></li>
            </ul>
          </div>

          {/* სოციალური მედია */}
          <div>
            <h4 className="text-xl font-semibold mb-4">დაგვიკავშირდით</h4>
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="hover:text-blue-500">
                <img src="/facebook.png" alt="Facebook" className="w-6 h-6" />
              </a>
              <a href="https://instagram.com" className="hover:text-pink-500">
                <img src="/instagram.png" alt="Instagram" className="w-6 h-6" />
              </a>
              <a href="https://twitter.com" className="hover:text-blue-400">
                <img src="/twitter.png" alt="Twitter" className="w-6 h-6" />
              </a>
              <a href="https://youtube.com" className="hover:text-red-600">
                <img src="/youtube.png" alt="YouTube" className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* ნიუსლეტერი */}
          <div>
            <h4 className="text-xl font-semibold mb-4">ნიუსლეტერი</h4>
            <p className="text-sm mb-4">დარეგისტრირდით, რომ მიიღოთ სიახლეები ჩვენი პროდუქციისა და მომსახურების შესახებ.</p>
            <div className="flex">
              <input
                type="email"
                placeholder="მიუთითეთ თქვენი ელ. ფოსტა"
                className="p-2 rounded-l-md border-none focus:outline-none w-full"
              />
              <button className="bg-blue-500 text-white p-2 rounded-r-md hover:bg-blue-600">გამოწერა</button>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm">© {new Date().getFullYear()} Vendoo. ყველა უფლება დაცულია.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
