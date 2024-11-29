import React from 'react';
import { Link } from 'react-router-dom';

const SectionFour = () => {
    return (
        <section className="py-12">
            <div className="container mx-auto px-4 max-w-[1300px] w-[90%] mt-12 bg-gray-100 rounded-[20px]">
                <div className="py-16">
                    <h2 className="text-2xl font-bold pl-16 mb-8">აუზები და საცურაო აქსესუარები</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 px-16">
                        <div className="relative">
                        <Link to="/leibebi">
                                <img className="rounded-[20px]" src="/tile_1.jpg" alt="ლეიბები" />
                                <p className="absolute top-2 left-1/2 -translate-x-1/2 text-white bg-black/70 px-3 py-1 rounded-md text-sm font-medium whitespace-nowrap">
                                    ლეიბები
                                </p>
                            </Link>
                        </div>
                        <div className="relative">
                            <Link to="/satsmendi">
                            <img className="rounded-[20px]" src="/tile_2.jpg" />
                            <p className="absolute top-2 left-1/2 -translate-x-1/2 text-white bg-black/70 px-3 py-1 rounded-md text-sm font-medium whitespace-nowrap">
                                საწმენდი საშუალებები
                            </p>
                            </Link>
                        </div>
                        <div className="relative">
                        <Link to="/auzebi">
                            <img className="rounded-[20px]" src="/tile_3.jpg" />
                            <p className="absolute top-2 left-1/2 -translate-x-1/2 text-white bg-black/70 px-3 py-1 rounded-md text-sm font-medium whitespace-nowrap">
                                კარკასული აუზები
                            </p>
                        </Link>
                        </div>
                        <div className="relative">
                        <Link to="/accessories">
                            <img className="rounded-[20px]" src="/tile_4.jpg" />
                            <p className="absolute top-2 left-1/2 -translate-x-1/2 text-white bg-black/70 px-3 py-1 rounded-md text-sm font-medium whitespace-nowrap">
                                აქსესუარები
                            </p>
                        </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SectionFour;
