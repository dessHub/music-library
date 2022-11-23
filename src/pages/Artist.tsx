import { useState } from "react";
import Layout from "../components/layouts/Layout";

const Artist = () => {
    return (
        <Layout>
            <div className="w-full">
                <div className="flex flex-col md:flex-row w-full p-5 md:p-0 md:h-80 md:border-b-neutral-200 md:border-2">
                    <div className="hidden md:block pl-10 md:pl-20 md:pt-12 w-3/5 bg-neutral-300 h-full">
                        <div className="text-xl md:text-3xl text-teal-600 font-bold">Bakermat</div>
                        <div className="text-lg md:text-xl font-ligth"><span className="font-semibold underline">12121</span> fans</div>
                    </div>
                    <div className="block md:hidden w-full">
                        <div className="w-full mb-5">
                            <img src="https://api.deezer.com/artist/288166/image" alt="Artist cover" className="w-full" />
                        </div>
                        <div className="text-2xl text-teal-600 font-bold">Bakermat</div>
                        <div className="text-lg font-ligth"><span className="font-semibold underline">12121</span> fans</div>

                        <div className="w-full border-b-2 border-gray-200 my-8"></div>
                    </div>
                    <div className="flex-1 h-full p-0 md:p-5 mt-5 md:mt-0">
                        <div className="text-2xl font-bold">Top Tracks</div>
                        <div className="pt-3">
                            <div className="flex py-1 font-ligth border-b-gray-200 border-b-2">
                                <div className="flex-1 text-sm">
                                    <span className="font-bold">1.</span> Test test
                                </div>
                                <div className="px-2">03:00</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full p-5">
                    <div className="text-lg font-bold py-2">Albums</div>
                    <div className="w-full grid grid-cols-1 md:grid-cols-6 lg:grid-cols-8">
                        <div className="">
                            <img src="https://e-cdns-images.dzcdn.net/images/cover/4c39d2225bf09483e7ed5c5752f4890e/250x250-000000-80-0-0.jpg" alt="" className="w-full" />
                            <div className="text-md text-teal-400 font-semibold">Under the sun</div>
                            <div className="text-sm font-ligth">2020</div>
                        </div>
                        <div className="">
                            <img src="https://e-cdns-images.dzcdn.net/images/cover/4c39d2225bf09483e7ed5c5752f4890e/250x250-000000-80-0-0.jpg" alt="" className="w-full" />
                            <div className="text-md text-teal-400 font-semibold">Under the sun</div>
                            <div className="text-sm font-ligth">2020</div>
                        </div>
                        <div className="">
                            <img src="https://e-cdns-images.dzcdn.net/images/cover/4c39d2225bf09483e7ed5c5752f4890e/250x250-000000-80-0-0.jpg" alt="" className="w-full" />
                            <div className="text-md text-teal-400 font-semibold">Under the sun</div>
                            <div className="text-sm font-ligth">2020</div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Artist;
