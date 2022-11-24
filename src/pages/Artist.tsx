import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchArtist, artistSelector, Tracklist } from "../features/artists";
import Layout from "../components/layouts/Layout";
import Loader from "../components/atoms/Loader";

const Artist = () => {
    const params = useParams();
    const dispatch = useAppDispatch();

    const {pending, artist} = useAppSelector(artistSelector);

    useEffect(() => {
        dispatch(fetchArtist({id: params.id || ''}))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params.id]);

    function convertSeconds(seconds: number) {
      const convert = function (x: number) {
        return x < 10 ? '0' + x : x;
      };
      const d = (seconds / 60) % 60;
      const intD = parseInt(d.toString());

      return convert(intD) + ':' + convert(seconds % 60);
    }

    const getTopTracklist = (list: Tracklist[]) => {
        const topList = [...list].splice(0, 5);
        return topList;
    };

    return (
        <Layout>
            <div className="w-full">
                <div className="flex flex-col md:flex-row w-full p-5 md:p-0 md:h-80 md:border-b-neutral-200 md:border-2">
                    <div className="hidden md:block pl-10 md:pl-20 md:pt-12 w-3/5 bg-neutral-300 h-full">
                        <div className="text-xl md:text-3xl text-teal-600 font-bold">{artist?.name}</div>
                        <div className="text-lg md:text-xl font-ligth"><span className="font-semibold underline">{artist?.nb_fan}</span> fans</div>
                    </div>
                    <div className="block md:hidden w-full">
                        <div className="w-full mb-5">
                            <img src={artist?.picture_medium} alt="Artist cover" className="w-full" />
                        </div>
                        <div className="text-2xl text-teal-600 font-bold">{artist?.name}</div>
                        <div className="text-lg font-ligth"><span className="font-semibold underline">{artist?.nb_fan}</span> fans</div>

                        <div className="w-full border-b-2 border-gray-200 my-8"></div>
                    </div>
                    <div className="flex-1 h-full p-0 md:p-5 mt-5 md:mt-0">
                        <div className="text-2xl font-bold">Top Tracks</div>
                        <div className="pt-3">
                            {artist && getTopTracklist(artist?.tracklist).map((item: Tracklist, index) => (
                            <div className="flex py-1 font-ligth border-b-gray-200 border-b-2" key={item.id}>
                                <div className="flex-1 text-sm">
                                    <span className="font-bold">{index + 1}.</span> {item.title}
                                </div>
                                <div className="px-2">{convertSeconds(item.duration)}</div>
                            </div>))}
                        </div>
                    </div>
                </div>

                <div className="w-full p-5">
                    <div className="text-lg font-bold py-2">Albums</div>
                    {pending ? <Loader /> :
                     <div className="w-full grid grid-cols-1 md:grid-cols-6 lg:grid-cols-8">
                        {artist && artist.albums?.map((album) => (
                            <div className="" key={album.id}>
                                <img src={album.cover_medium} alt="" className="w-full" />
                                <div className="text-md text-teal-400 font-semibold">{album.title}</div>
                            </div>
                        ))}
                     </div>
                    }
                </div>
            </div>
        </Layout>
    )
}

export default Artist;
